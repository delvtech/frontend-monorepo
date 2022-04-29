import { QueryObserverResult } from "react-query";

import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";

import { SwapKind } from "integrations/balancer/SwapKind";
import { makeQueryBatchSwapCallArgs } from "ui/balancer/useQueryBatchSwap/makeQueryBatchSwapCallArgs";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { clipStringValueToDecimals } from "base/math/fixedPoint";
import {
  calcSwapInGivenOutWeightedPoolUNSAFE,
  calcSwapOutGivenInWeightedPoolUNSAFE,
} from "elf/pools/calcPoolSwap";
import { isPrincipalPool } from "elf/pools/ccpool";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { PoolContract } from "elf/pools/PoolContract";
import { PoolInfo } from "elf/pools/PoolInfo";
import { isYieldPool } from "elf/pools/weightedPool";
import { getTokenInfo } from "tokenlists/tokenlists";
import { BALANCER_ETH_SENTINEL } from "integrations/balancer/ethSentinel";
import { balancerVaultContract } from "elf/balancer/vault";
import { QueryBatchSwapCalcResults } from "elf/pools/QueryBatchSwapCalcResults";
import { calcSwapPrincipalPoolOld } from "elf/pools/calcSwapPrincipalPool";

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
