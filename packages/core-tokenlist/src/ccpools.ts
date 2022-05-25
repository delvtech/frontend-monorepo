import {
  ConvergentCurvePool__factory as ConvergentCurvePool__factoryV1_1,
  ConvergentPoolFactory as ConvergentPoolFactoryV1_1,
} from "@elementfi/core-typechain/dist/v1.1";
import {
  ConvergentCurvePool__factory as ConvergentCurvePool__factoryV1,
  ConvergentPoolFactory as ConvergentPoolFactoryV1,
} from "@elementfi/core-typechain/dist/v1";
import hre from "hardhat";
import zip from "lodash.zip";
import { TokenTag } from "src/tags";
import { PrincipalPoolTokenInfo } from "src/types";
import { retry, retryAsync } from "src/util/retry";

export const provider = hre.ethers.provider;
export async function getPrincipalPoolTokenInfos(
  chainId: number,
  ccPoolFactory: ConvergentPoolFactoryV1 | ConvergentPoolFactoryV1_1,
  safelist: string[],
): Promise<PrincipalPoolTokenInfo[]> {
  const filter = ccPoolFactory.filters.CCPoolCreated(null, null);
  const events = await retry(() => ccPoolFactory.queryFilter(filter));
  const poolCreatedEvents = events.map((event) => {
    const [poolAddress, bondTokenAddress] = event.args || [];
    const { blockNumber } = event;
    return { poolAddress, bondTokenAddress, blockNumber };
  });

  const safePoolEvents = poolCreatedEvents.filter(({ poolAddress }) =>
    safelist.includes(poolAddress),
  );
  const safePoolAddresses = safePoolEvents.map(
    ({ poolAddress }) => poolAddress,
  );
  const safePools = safePoolAddresses.map((poolAddress) =>
    ConvergentCurvePool__factoryV1.connect(poolAddress, provider),
  );

  const poolBondAddresses = safePoolEvents.map(
    ({ bondTokenAddress }) => bondTokenAddress,
  );

  const poolCreatedAts = await Promise.all(
    safePoolEvents.map(async ({ blockNumber }) => {
      const block = await retry(() => provider.getBlock(blockNumber as number));
      return +block.timestamp;
    }),
  );

  const poolIds = await Promise.all(
    safePools.map((pool) => retryAsync(pool.getPoolId)),
  );
  const poolUnderlyingAddresses = await Promise.all(
    safePools.map((pool) => retryAsync(pool.underlying)),
  );
  const poolNames = await Promise.all(
    safePools.map((pool) => retryAsync(pool.name)),
  );
  const poolSymbols = await Promise.all(
    safePools.map((pool) => retryAsync(pool.symbol)),
  );
  const poolDecimals = await Promise.all(
    safePools.map((pool) => retryAsync(pool.decimals)),
  );
  const poolUnitSeconds = await Promise.all(
    safePools.map((pool) => retryAsync(pool.unitSeconds)),
  );
  const poolExpirations = await Promise.all(
    safePools.map((pool) => retryAsync(pool.expiration)),
  );

  const ccPoolTokensList: PrincipalPoolTokenInfo[] = zip<any>(
    safePoolAddresses,
    poolSymbols,
    poolNames,
    poolDecimals,
    poolBondAddresses,
    poolUnderlyingAddresses,
    poolIds,
    poolUnitSeconds,
    poolExpirations,
    poolCreatedAts,
  ).map(
    ([
      address,
      symbol,
      name,
      decimal,
      bondAddress,
      underlyingAddress,
      poolId,
      unitSeconds,
      expiration,
      poolCreatedAt,
    ]): PrincipalPoolTokenInfo => {
      return {
        chainId,
        address: address as string,
        symbol: symbol as string,
        decimals: decimal as number,
        extensions: {
          convergentPoolFactory: ccPoolFactory.address,
          bond: bondAddress as string,
          underlying: underlyingAddress as string,
          poolId: poolId as string,
          unitSeconds: unitSeconds.toNumber() as number,
          expiration: expiration.toNumber() as number,
          createdAtTimestamp: poolCreatedAt as number,
        },
        name: name as string,
        tags: [TokenTag.CCPOOL],
        // TODO: What logo do we want to show for ccpool tokens?
        // logoURI: ""
      };
    },
  );

  return ccPoolTokensList;
}
