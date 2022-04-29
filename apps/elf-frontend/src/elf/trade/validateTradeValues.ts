import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { t } from "ttag";

export interface TradeValuesValidationResult {
  isValidTokenInValue: boolean;
  isValidTokenOutValue: boolean;
  tokenInError?: string;
  tokenOutError?: string;
}

export function validateTradeValues(
  amountIn: string | undefined,
  amountOut: string | undefined,
  tokenInPoolBalance: BigNumber | undefined,
  tokenOutPoolBalance: BigNumber | undefined,
  tokenInBalanceOf: BigNumber | undefined,
  tokenInDecimals: number | undefined,
  baseAssetInDecimals?: number | undefined,
): TradeValuesValidationResult {
  // input value must be lower than the user's balance
  let isValidTokenInValue = true;
  let isValidTokenOutValue = true;
  let tokenInError;
  let tokenOutError;

  if (
    !amountIn ||
    // Check the amount as a number because the user my input "0" or "0.0" etc...
    !+amountIn ||
    !tokenInBalanceOf ||
    !tokenInPoolBalance
  ) {
    return {
      isValidTokenInValue,
      isValidTokenOutValue,
      tokenInError,
      tokenOutError,
    };
  }

  if (parseUnits(amountIn, tokenInDecimals).gt(tokenInBalanceOf)) {
    isValidTokenInValue = false;
    tokenInError = t`Insufficient balance`;
  }

  if (
    parseUnits(amountOut || "0", baseAssetInDecimals ?? tokenInDecimals).gt(
      tokenOutPoolBalance ?? 0,
    )
  ) {
    isValidTokenOutValue = false;
    tokenOutError = t`Insufficient pool balance`;
  }

  return {
    isValidTokenInValue,
    isValidTokenOutValue,
    tokenInError,
    tokenOutError,
  };
}
