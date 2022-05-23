import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { clipStringValueToDecimals } from "@elementfi/base/math/fixedPoint";
import { isPrincipalPool } from "@elementfi/core/pools/ccpool";
import { getPoolTokens } from "@elementfi/core/pools/getPoolTokens";
import { PoolContract } from "@elementfi/core/pools/PoolContract";
import { PoolInfo } from "@elementfi/core/pools/PoolInfo";
import { isYieldPool } from "@elementfi/core/pools/weightedPool";
import { getTokenInfo } from "@elementfi/core/tokenlists/tokenlists";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import {
  calcSwapInGivenOutWeightedPoolUNSAFE,
  calcSwapOutGivenInWeightedPoolUNSAFE,
} from "@elementfi/integrations/balancer/calcPoolSwap";
import { calcSwapPrincipalPoolOld } from "@elementfi/integrations/balancer/calcSwapPrincipalPool";
import { BALANCER_ETH_SENTINEL } from "@elementfi/integrations/balancer/ethSentinel";
import { makeQueryBatchSwapCallArgs } from "@elementfi/integrations/balancer/hooks/useQueryBatchSwap/makeQueryBatchSwapCallArgs";
import { QueryBatchSwapCalcResults } from "@elementfi/integrations/balancer/QueryBatchSwapCalcResults";
import { SwapKind } from "@elementfi/integrations/balancer/SwapKind";
import { balancerVaultContract } from "@elementfi/integrations/balancer/vault";
import { QueryObserverResult } from "react-query";

/**
 * Useful for previewing a swap in the balancer V2 vault.
 *
 * NOTE: This should *not* be used to check spot price since batch swaps can
 * incur additional fees and costs. To check spot price, use usePoolSpotPrice
 * instead.
 */
/**
 * Useful for previewing a swap in the balancer V2 vault.
 *
 * NOTE: This should *not* be used to check spot price since batch swaps can
 * incur additional fees and costs. To check spot price, use usePoolSpotPrice
 * instead.
 */
export function useQueryBatchSwap(
  kind: SwapKind,
  pool: PoolContract,
  tokenInAddress: string,
  tokenOutAddress: string,
  amount: BigNumber,
  wethAddress: string,
): QueryObserverResult<BigNumber[]> {
  const poolId = getTokenInfo<PoolInfo>(pool.address).extensions.poolId;

  const queryBatchSwapResults = useSmartContractReadCall(
    balancerVaultContract,
    "queryBatchSwap",
    {
      enabled: [poolId, tokenInAddress, amount?.gt(0), tokenOutAddress].every(
        (v) => !!v,
      ),
      callArgs: makeQueryBatchSwapCallArgs(
        kind,
        poolId,
        tokenInAddress,
        amount,
        tokenOutAddress,
        wethAddress,
      ),
    },
  );

  return queryBatchSwapResults;
}

export function getCalcSwap(
  amount: string,
  kind: SwapKind,
  poolInfo: PoolInfo,
  tokenInAddress: string,
  tokenOutAddress: string,
  tokenInReserves: string,
  tokenOutReserves: string,
  totalSupply: string,
): QueryBatchSwapCalcResults {
  const { baseAssetInfo } = getPoolTokens(poolInfo);
  const { decimals, address: baseAssetAddress } = baseAssetInfo;
  // do weighted pools first since they don't need as many variables
  if (!amount || !tokenInAddress || !tokenOutAddress || !decimals) {
    return { result: undefined, status: "loading" };
  }

  if (isYieldPool(poolInfo as PoolInfo)) {
    return calcSwapYieldPool(
      amount,
      kind,
      decimals,
      tokenInReserves,
      tokenOutReserves,
    );
  }

  if (!amount || !decimals) {
    return { result: undefined, status: "loading" };
  }

  let isBaseAssetIn = tokenInAddress === baseAssetAddress;
  if (tokenInAddress === BALANCER_ETH_SENTINEL) {
    isBaseAssetIn = true;
  }

  if (isPrincipalPool(poolInfo)) {
    return calcSwapPrincipalPoolOld(
      amount,
      kind,
      poolInfo,
      decimals,
      tokenInReserves,
      tokenOutReserves,
      totalSupply,
      // TODO: figure out why this is flipped
      !isBaseAssetIn,
    );
  }

  return { result: undefined, status: "error" };
}

export function getTokenReserves(
  tokens: string[] | never[],
  balances: BigNumber[] | never[],
  tokenInAddress: string,
  tokenOutAddress: string,
  decimals: number,
): { tokenInReserves: string; tokenOutReserves: string } {
  const balancesByAddress: Record<string, BigNumber | undefined> = {};
  tokens
    .filter((address): address is string => !!address)
    .forEach(
      (address, index) => (balancesByAddress[address] = balances[index]),
    );
  const tokenInReserves = formatUnits(
    balancesByAddress[tokenInAddress ?? ""] ?? 0,
    decimals,
  );

  const tokenOutReserves = formatUnits(
    balancesByAddress[tokenOutAddress ?? ""] ?? 0,
    decimals,
  );
  return { tokenInReserves, tokenOutReserves };
}

function calcSwapYieldPool(
  amount: string,
  kind: SwapKind,
  decimals: number,
  tokenInReserves: string,
  tokenOutReserves: string,
): QueryBatchSwapCalcResults {
  if (kind === SwapKind.GIVEN_IN) {
    const calcOutNumber = calcSwapOutGivenInWeightedPoolUNSAFE(
      amount,
      tokenOutReserves,
      tokenInReserves,
    );

    const calcOut =
      clipStringValueToDecimals(calcOutNumber.toString(), decimals) ?? "0";

    return { result: [amount, calcOut], status: "success" };
  }

  // SwapKind.GIVEN_OUT
  const calcInNumber = calcSwapInGivenOutWeightedPoolUNSAFE(
    amount,
    tokenOutReserves,
    tokenInReserves,
  );
  const calcIn =
    clipStringValueToDecimals(calcInNumber.toString(), decimals) ?? "0";

  return { result: [calcIn, amount], status: "success" };
}
