import { balancerVaultContract } from "elf/balancer/vault";
import { useNowMs } from "ui/base/hooks/useNowMs/useNowMs";
import { useLatestBlockNumber } from "ui/ethereum/hooks/useLatestBlockNumber";
import { usePreviousBlockNumber } from "ui/ethereum/usePreviousBlockNumber/usePreviousBlockNumber";
import { usePoolSpotPrice } from "ui/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";
import { useTotalFiatLiquidity } from "ui/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";
import { useTokenPrice } from "ui/token/hooks/useTokenPrice";
import { ONE_DAY_IN_SECONDS } from "base/time";
import { TimeData } from "elf/charts/TimeData";
import { AVG_MINE_RATE_SECONDS } from "elf/miningRate";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { PoolInfo } from "elf/pools/PoolInfo";
import { getTokenInfo } from "tokenlists/tokenlists";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { useQuery } from "react-query";

type PoolBalanceChangedArguments = [
  poolId: string,
  sender: string,
  assets: string[],
  amounts: BigNumber[],
  dueProtocolFeeAmounts: BigNumber[],
];
/**
 * Returns the amount of liquidity added or removed for each token in a time
 * period.
 * @param pool contract of the pool to query.
 * @param fromTime time in seconds to query back to from now.
 * @returns {Array<BigNumber>} an array of deltas for each token in the pool
 * over the time period. values in ascending token address order.
 */

export function useLiquidityHistoryForPool(
  poolInfo: PoolInfo,
  fromTime: number = ONE_DAY_IN_SECONDS,
): TimeData[] | undefined {
  const nowInMs = useNowMs();
  const poolContract = getPoolContract(poolInfo.address);
  const { poolId, underlying: baseAssetAddress } = poolInfo.extensions;
  const { decimals: baseAssetDecimals } = getTokenInfo(baseAssetAddress);
  const totalLiquidity = useTotalFiatLiquidity(poolInfo);
  const { data: fromBlockNumber } = usePreviousBlockNumber(fromTime, {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const {
    baseAssetContract,
    baseAssetIndex,
    termAssetIndex: yieldAssetIndex,
    termAssetInfo: { address: termAssetAddress },
  } = getPoolTokens(poolInfo);
  const spotPrice = usePoolSpotPrice(poolContract, termAssetAddress);
  const { currency } = useCurrencyPref();
  const { data: baseAssetPrice } = useTokenPrice(baseAssetContract, currency);

  const { data: lastestBlockNumber } = useLatestBlockNumber();

  // TODO: break this up into a query to grab the PoolBalanceChanged events, and another query to
  // get the timestamps
  const { data: liquidityEvents = [] } = useQuery({
    staleTime: Infinity,
    keepPreviousData: true,
    cacheTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    queryKey: [
      ["balancerVault", "queryFilter", "PoolBalanceChanged", "liquidityEvents"],
      { poolId, fromBlockNumber, spotPrice },
    ],
    queryFn: async () => {
      if (
        !poolId ||
        !spotPrice ||
        !baseAssetPrice ||
        !totalLiquidity ||
        !lastestBlockNumber
      ) {
        return;
      }

      const filterQuery = balancerVaultContract.filters.PoolBalanceChanged(
        poolId,
        null,
        null,
        null,
        null,
      );

      // these are all the events that have liquidity changes when people stake/unstake from the
      // pool.
      const events = await balancerVaultContract.queryFilter(
        filterQuery,
        fromBlockNumber,
      );

      // here we take those events, and combine the base and yield asset into a single delta value.
      // we combine that with the timestamp to get a time series of data: [baseAssetDelta,
      // timestamp]. however, to see changes in total liquidity over time. to do this we get the
      // current total liquidity, and working backwards, we subtract the delta to see how the total
      // liquidity has changed over time. i.e.:
      //
      // deltaEvents = [ [+5, 0001], [-3, 0002], [+6, 003] ];
      // currentLiquidity = 100;
      // liquidityOvertime = [ [92, 001], [97, 002], [94, 003] ];
      //                                              ^
      // start here ---------------------------------/
      // take 100 - 6 = 94 and work backwards
      const deltaEvents = events.map((event) => {
        const changeEvent = event?.args as PoolBalanceChangedArguments;
        const { blockNumber } = event;
        const [, , , amounts] = changeEvent;
        const baseDelta = +formatUnits(
          amounts[baseAssetIndex],
          baseAssetDecimals,
        );
        const yieldDelta = +formatUnits(
          amounts[yieldAssetIndex],
          baseAssetDecimals,
        );

        // liquidity delta in base asset units
        const totalDelta = baseDelta + yieldDelta * spotPrice;

        // estimating timestamp here by taking the current time and subtracting the mining rate
        // multiplied by the number blocks mined:
        const timeStamp =
          nowInMs -
          (lastestBlockNumber - blockNumber) * AVG_MINE_RATE_SECONDS * 1000;

        return [totalDelta, timeStamp];
      });

      // reverse events so we start at now and work our way back in time
      deltaEvents.reverse();

      // the actual liquidity in the pool right now (in base asset units)
      const currentLiquidity =
        totalLiquidity.toDecimal() / baseAssetPrice.toDecimal();

      const liquidityOverTime: number[][] = [];

      deltaEvents.forEach((event, index) => {
        const [delta, timestamp] = event;

        // if we are at index 0, we'll use the currentLiquidity to start
        if (index === 0) {
          liquidityOverTime.push([currentLiquidity, timestamp]);
          return;
        }

        const previousLiquidity = liquidityOverTime[index - 1]?.[0];

        // get total liquidity at each timestamp
        const liquidity = previousLiquidity - delta;
        liquidityOverTime.push([liquidity, timestamp]);
      });

      // now put back into correct order
      liquidityOverTime.reverse();

      return liquidityOverTime.map(([liquidity, timestampInSeconds]) => ({
        value: liquidity,
        timeMs: timestampInSeconds,
      }));
    },
    enabled:
      !!poolId &&
      !!fromBlockNumber &&
      !!spotPrice &&
      !!totalLiquidity &&
      !!baseAssetPrice &&
      !!lastestBlockNumber,
  });

  return liquidityEvents;
}
