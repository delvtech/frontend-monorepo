import { useMemo } from "react";

import { formatUnits } from "ethers/lib/utils";

import { BALANCER_POOL_LP_TOKEN_DECIMALS } from "integrations/balancer/pools";
import {
  getCalcSwap,
  getTokenReserves,
} from "integrations/balancer/hooks/useQueryBatchSwap/useQueryBatchSwap";
import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { usePoolTokens } from "core/pools/hooks/usePoolTokens/usePoolTokens";
import { SwapKind } from "integrations/balancer/SwapKind";
import { getPoolTokenInfoFromContract } from "core/pools/getPoolInfo";
import { getPoolTokens } from "core/pools/getPoolTokens";
import { PoolContract } from "core/pools/PoolContract";

/**
 * Lazy spot price technique until we get a better method.  Right now just calculates how much out
 * asset for '0.01' of the in asset.  A future optimisation might be to do '$1' worth of the in asset
 * to minimize slippage in the value.
 *
 */
const SPOT_PRICE_AMOUNT = "0.01";

export function usePoolSpotPrice(
  poolContract: PoolContract | undefined,
  tokenIn: string,
): number | undefined {
  const { data } = usePoolTokens(poolContract);
  const [tokens, balances] = data ?? [[], []];
  const poolInfo = getPoolTokenInfoFromContract(poolContract);
  const { data: totalSupplyBN } = useSmartContractReadCall(
    poolContract,
    "totalSupply",
  );
  const totalSupply = formatUnits(
    totalSupplyBN ?? 0,
    BALANCER_POOL_LP_TOKEN_DECIMALS,
  );

  const { result: [, amountOut = 0] = [] } = useMemo(() => {
    if (!poolInfo) {
      return { result: undefined, status: "idle" };
    }
    const { baseAssetInfo, termAssetInfo } = getPoolTokens(poolInfo);
    const tokenInAddress =
      baseAssetInfo.address === tokenIn
        ? baseAssetInfo.address
        : termAssetInfo.address;
    const tokenOutAddress =
      baseAssetInfo.address === tokenIn
        ? termAssetInfo.address
        : baseAssetInfo.address;

    const { tokenInReserves, tokenOutReserves } = getTokenReserves(
      tokens,
      balances,
      tokenInAddress,
      tokenOutAddress,
      baseAssetInfo.decimals,
    );
    const result = getCalcSwap(
      SPOT_PRICE_AMOUNT,
      SwapKind.GIVEN_IN,
      poolInfo,
      tokenInAddress,
      tokenOutAddress,
      tokenInReserves,
      tokenOutReserves,
      totalSupply,
    );
    return result;
  }, [balances, poolInfo, tokenIn, tokens, totalSupply]);

  // can't give a meaningful spot price until we have the decimals.  The protects against NaN or
  // Infinity
  if (!Number.isFinite(+amountOut)) {
    return undefined;
  }

  const spotPrice = +amountOut / +SPOT_PRICE_AMOUNT;

  return Math.abs(spotPrice);
}
