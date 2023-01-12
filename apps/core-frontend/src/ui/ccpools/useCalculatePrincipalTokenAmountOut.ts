import { formatUnits, parseUnits } from "ethers/lib/utils";

import { BALANCER_POOL_LP_TOKEN_DECIMALS } from "integrations/balancer/pools";
import { SwapKind } from "integrations/balancer/SwapKind";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { usePoolTotalSupply } from "ui/pools/hooks/usePoolTotalSupply";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { getTokenInfo } from "tokenlists/tokenlists";
import {
  calcSwapPrincipalPool,
  PrincipalPoolCalcSwapError,
  PrincipalPoolCalcSwapResult,
  SwapAsset,
} from "elf/pools/calcSwapPrincipalPool";
import { PrincipalPoolTokenInfo } from "@elementfi/core-tokenlist";

export function useCalculatePrincipalTokenAmountOut(
  poolInfo: PrincipalPoolTokenInfo,
  amountIn: string,
): PrincipalPoolCalcSwapResult {
  const {
    address: poolAddress,
    extensions: { underlying: baseAssetAddress },
  } = poolInfo;

  const { baseAssetIndex, termAssetIndex: principalTokenIndex } =
    getPoolTokens(poolInfo);

  const poolContract = getPoolContract(poolAddress);

  const { data: totalSupplyBN } = usePoolTotalSupply(poolContract);
  const totalSupply = formatUnits(
    totalSupplyBN ?? 0,
    BALANCER_POOL_LP_TOKEN_DECIMALS,
  );

  const { data: [, balances] = [] } = usePoolTokens(poolContract);
  const underlyingReservesBalanceOf = balances?.[baseAssetIndex];
  const principalReservesBalanceOf = balances?.[principalTokenIndex];

  const { decimals: baseAssetDecimals } = getTokenInfo(baseAssetAddress);
  const underlyingReserves = formatUnits(
    underlyingReservesBalanceOf ?? 0,
    baseAssetDecimals,
  );
  const principalReserves = formatUnits(
    principalReservesBalanceOf ?? 0,
    baseAssetDecimals,
  );

  // Before attempting to calculate the amount of PTs you'd get from a trade, we
  // can bail early if the user hasn't entered an amount in or the number of PTs
  // in the pool doesn't support the amount the user wants to purchase. This
  // avoids the more complicated work performed in calcSwapPrincipalPool.
  const amountInBN = parseUnits(amountIn || "0", baseAssetDecimals);
  if (amountInBN.isZero()) {
    return { amountIn: "0", amountOut: "0" };
  }
  if (principalReservesBalanceOf?.lt(amountInBN)) {
    return {
      amountIn,
      amountOut: "0",
      error: PrincipalPoolCalcSwapError.INSUFFICENT_RESERVES,
    };
  }

  const calcSwapResult = calcSwapPrincipalPool(
    amountIn,
    SwapKind.GIVEN_IN,
    SwapAsset.BASE_ASSET,
    poolInfo,
    baseAssetDecimals,
    underlyingReserves,
    principalReserves,
    totalSupply,
  );

  return calcSwapResult;
}
