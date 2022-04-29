import { Callout } from "@blueprintjs/core";
import { PrincipalTokenInfo, TokenInfo } from "@elementfi/tokenlist";
import { getSafeFixedNumber } from "base/math/fixedPoint";
import tw, { classnames } from "efi-tailwindcss-classnames";
import { BigNumber } from "ethers";
import { commify, formatUnits, parseUnits } from "ethers/lib/utils";
import { ReactElement } from "react";
import { t } from "ttag";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { useBaseTokenZapPrice } from "ui/zaps/zapSwapCurve/useBaseTokenZapPrice";

interface FixedRatePreviewCalloutProps {
  principalToken: PrincipalTokenInfo;
  baseToken: TokenInfo;
  inputToken: TokenInfo;
  principalTokenAmountOut: string;
  inputTokenAmountIn: string;
  baseTokenAmountIn: string;
}

const reviewOrderGridRowClassName = tw(
  "w-full",
  "grid",
  "grid-cols-3",
  "text-left",
);

export function FixedRateZapPreviewCallout(
  props: FixedRatePreviewCalloutProps,
): ReactElement {
  const {
    principalToken,
    baseToken,
    inputToken,
    principalTokenAmountOut,
    inputTokenAmountIn,
    baseTokenAmountIn,
  } = props;
  const { isDarkMode } = useDarkMode();

  const roundedPrincipalTokens = commify(
    (+principalTokenAmountOut)?.toFixed(4),
  );

  const basePricePerInputToken = useBaseTokenZapPrice(
    principalToken,
    inputToken,
  );

  const totalBaseTokensEarned = calculateTotalYield(
    principalTokenAmountOut,
    baseTokenAmountIn,
    baseToken.decimals,
  );

  const totalInputTokensEarned =
    +totalBaseTokensEarned * +basePricePerInputToken;

  const roundedTotalBaseTokensEarned = commify(
    (+totalBaseTokensEarned)?.toFixed(4),
  );

  const roundedTotalInputTokensEarned = commify(
    (+totalInputTokensEarned)?.toFixed(4),
  );

  const percentYield = calculatePercentYield(
    inputTokenAmountIn,
    totalInputTokensEarned.toString(),
    inputToken.decimals,
  );

  const roundedPercentYield = commify((+percentYield)?.toFixed(2));
  return (
    <Callout
      className={tw(
        "flex",
        "flex-col",
        "items-center",
        "px-4",
        "space-y-1",
        "text-sm",
      )}
    >
      <div
        className={classnames(
          reviewOrderGridRowClassName,
          tw(isDarkMode ? "text-green-400" : "text-green-600"),
        )}
      >
        <div className={tw("col-span-2")}>{t`Total Rate Earned`}</div>
        <div className={tw("text-right")}>{`${roundedPercentYield}%`}</div>
      </div>

      <div className={reviewOrderGridRowClassName}>
        <div className={tw("col-span-2")}>{t`Total Tokens Receiving`}</div>
        <div className={tw("text-right")}>{`${roundedPrincipalTokens}`}</div>
      </div>
      <div className={reviewOrderGridRowClassName}>
        <div
          className={tw("col-span-2")}
        >{t`Total ${baseToken.symbol.toUpperCase()} Earned`}</div>
        <div
          className={tw("text-right")}
        >{`${roundedTotalBaseTokensEarned}`}</div>
      </div>

      <div className={reviewOrderGridRowClassName}>
        <div
          className={tw("col-span-2")}
        >{t`Total ${inputToken.symbol.toUpperCase()} Earned`}</div>
        <div
          className={tw("text-right")}
        >{`≈ ${roundedTotalInputTokensEarned}`}</div>
      </div>
    </Callout>
  );
}

/**
 * Because Principal tokens converges to the full value of the base asset,
 * calculating total yield is simply the difference between what you got out
 * for what you put in.
 */
function calculateTotalYield(
  amountOut: string,
  amountIn: string,
  decimals: number,
): string {
  // check for bad inputs, ie: 0 (including "0.0", et al) and empty strings
  if (!+amountOut || !+amountIn) {
    return "0";
  }
  const amountInBN = BigNumber.from(parseUnits(amountIn, decimals));
  const amountOutBN = BigNumber.from(parseUnits(amountOut, decimals));

  // value comparisons are safe to do in BigNumber's, because they are just
  // integers under the hood
  if (amountOutBN.lt(amountInBN)) {
    return "0";
  }

  const totalYieldBN = amountOutBN.sub(amountInBN);
  return formatUnits(totalYieldBN, decimals);
}

function calculatePercentYield(
  amountIn: string,
  totalYield: string,
  decimals: number,
): string {
  // check for bad inputs, ie: 0 (including "0.0", et al) and empty strings
  if (!+amountIn || !+totalYield) {
    return "0";
  }

  // Math should be be done using fixed point arithmetic with FixedNumber
  const totalYieldFN = getSafeFixedNumber(totalYield, { decimals });
  const amountInFN = getSafeFixedNumber(amountIn, { decimals });
  const yieldRatioFN = totalYieldFN.divUnsafe(amountInFN);

  const oneHundredFN = getSafeFixedNumber("100", { decimals });
  const percentYieldFN = yieldRatioFN.mulUnsafe(oneHundredFN);

  return percentYieldFN.toString();
}
