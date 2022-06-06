import { Card, Classes } from "@blueprintjs/core";
import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { PrincipalTokenInfo, YieldTokenInfo } from "@elementfi/core-tokenlist";
import classNames from "classnames";
import tw from "efi-tailwindcss-classnames";
import { useAccumulatedFiatInterestForTranche } from "ui/pools/hooks/useAccumulatedFiatInterestForTranche";
import { useAccumulatedInterestForTranche } from "ui/pools/hooks/useAccumulatedInterestForTranche";
import { usePoolSpotPrice } from "ui/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { useSwaps } from "ui/pools/hooks/useSwaps/useSwaps";
import { useTokenYield } from "ui/pools/hooks/useTokenYield";
import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";
import { useTokenHistoricalPrice } from "ui/token/hooks/useTokenHistoricalPrice";
import { useTokenPrice } from "ui/token/hooks/useTokenPrice";
import { formatPercent } from "base/formatPercent/formatPercent";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { formatMoney } from "elf/money/formatMoney";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { isConvergentCurvePool } from "elf/pools/PoolContract";
import { PoolInfo } from "elf/pools/PoolInfo";
import { formatTermAssetShortSymbol } from "elf/tranche/format";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import { ReactElement } from "react";
import { Money } from "ts-money";
import { t } from "ttag";

interface TokenSummaryProps {
  poolInfo: PoolInfo;
  interestSupply: number | undefined;
}

export function TokenSummary({
  poolInfo,
  interestSupply,
}: TokenSummaryProps): ReactElement {
  const pool = getPoolContract(poolInfo.address);
  const {
    baseAssetSymbol,
    termAssetSymbol,
    termAssetPrice,
    fixedYield,
    fiatInterestPerToken,
    interestPerToken,
    spotPrice,
  } = useTokensSummary(poolInfo, interestSupply || 0);

  const isPrincipalPool = isConvergentCurvePool(pool);

  return (
    <div>
      <div className="mb-2">{t`Token Summary`}</div>
      <Card className={tw("lg:h-200", "flex", "space-x-8")}>
        <TokenInfo
          baseAssetSymbol={baseAssetSymbol}
          assetSymbol={termAssetSymbol}
          assetPrice={termAssetPrice}
          spotPrice={spotPrice}
        />
        <div
          className={tw("space-y-6", "flex-1", "overflow-hidden", "xl:ml-4")}
        >
          {isPrincipalPool ? (
            <div
              className={tw(
                "flex",
                "flex-col",
                "justify-center",
                "space-y-1",
                "overflow-hidden",
              )}
            >
              <span className={classNames(Classes.TEXT_MUTED, tw("text-sm"))}>
                {t`Fixed Rate APR`}
              </span>
              <div className={tw("flex", "justify-between")}>
                <span className={classNames("h5", tw("space-x-4"))}>
                  {formatPercent(fixedYield || 0)}
                </span>
              </div>
            </div>
          ) : null}
          {pool && !isPrincipalPool ? (
            <div
              className={tw(
                "flex",
                "flex-col",
                "justify-center",
                "space-y-1",
                "overflow-hidden",
                "lg:truncate",
              )}
            >
              <span className={classNames(Classes.TEXT_MUTED, tw("text-sm"))}>
                {t`Acc. Interest`}
              </span>
              <div className={tw("flex", "justify-between")}>
                <span
                  className={classNames("h5", tw("space-x-4", "lg:truncate"))}
                >
                  {interestPerToken ? +interestPerToken.toFixed(4) : 0}{" "}
                  {t` ${baseAssetSymbol}`}
                </span>
              </div>
            </div>
          ) : null}
          {pool && !isPrincipalPool ? (
            <div
              className={tw(
                "flex",
                "flex-col",
                "justify-center",
                "space-y-1",
                "overflow-hidden",
                "lg:truncate",
              )}
            >
              <span
                className={classNames(
                  Classes.TEXT_MUTED,
                  tw("text-sm", "lg:truncate"),
                )}
              >
                {t`Acc. Interest (USD)`}
              </span>
              <div className={tw("flex", "justify-between")}>
                <span className={classNames("h5", tw("space-x-4"))}>
                  {fiatInterestPerToken ? formatMoney(fiatInterestPerToken) : 0}
                </span>
              </div>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

interface TokenInfoProps {
  baseAssetSymbol: string | undefined;
  assetSymbol: string | undefined;
  assetPrice: Money | undefined;
  spotPrice: number | undefined;
}
function TokenInfo({
  baseAssetSymbol,
  assetSymbol,
  assetPrice,
  spotPrice,
}: TokenInfoProps): ReactElement {
  return (
    <div className={tw("space-y-4", "flex-1", "overflow-hidden")}>
      <div
        className={tw(
          "flex",
          "flex-col",
          "justify-center",
          "space-y-1",
          "overflow-hidden",
          "lg:truncate",
        )}
      >
        <span className={classNames(Classes.TEXT_MUTED, tw("text-sm"))}>
          {t`Token`}
        </span>
        <span className={classNames("h5", tw("space-x-4"))}>
          {assetSymbol ? assetSymbol : ""}
        </span>
      </div>
      <div className={tw("flex", "flex-col", "justify-center", "space-y-1")}>
        <span className={classNames(Classes.TEXT_MUTED, tw("text-sm"))}>
          {t`Price`}
        </span>
        <div className={tw("flex", "justify-between")}>
          <span className={classNames("h5", tw("space-x-4"))}>
            {assetPrice ? formatMoney(assetPrice) : "$0.00"}
          </span>
        </div>
      </div>
      <div className={tw("flex", "flex-col", "justify-center", "space-y-1")}>
        <span
          className={classNames(
            Classes.TEXT_MUTED,
            tw("text-sm", "lg:truncate"),
          )}
        >
          {baseAssetSymbol ? t`Price (${baseAssetSymbol})` : "Price"}
        </span>
        <span className={classNames("h5")}>
          {spotPrice ? spotPrice.toFixed(4) : "0.0000"}
        </span>
      </div>
    </div>
  );
}

interface TokensSummary {
  baseAssetSymbol: string;
  termAssetContract: ERC20;
  termAssetSymbol: string | undefined;
  termAssetBalance: BigNumber | undefined;
  termAssetBalanceTrend: number | undefined;
  termAssetDecimals: number | undefined;
  termAssetPriceTrend: number | undefined;
  fixedYield: number | undefined;
  fiatInterestPerToken: Money | undefined;
  interestPerToken: number | undefined;
  termAssetPrice: Money | undefined;
  spotPrice: number | undefined;
}

function useTokensSummary(
  poolInfo: PoolInfo,
  interestSupply: number,
): TokensSummary {
  const pool = getPoolContract(poolInfo.address);
  const { currency } = useCurrencyPref();
  const { data: [, balances] = [undefined, undefined] } = usePoolTokens(pool);

  const {
    termAssetIndex,
    baseAssetContract,
    termAssetContract,
    termAssetInfo,
    baseAssetInfo,
  } = getPoolTokens(poolInfo);

  const baseAsset = getCryptoAssetForToken(baseAssetContract?.address);

  // Base Asset Info
  const baseAssetSymbol = getCryptoSymbol(baseAsset);
  const { data: baseAssetPrice } = useTokenPrice(baseAssetContract, currency);
  const { data: baseAssetPriceYesterday } = useTokenHistoricalPrice(
    baseAssetContract,
    currency,
    1,
  );

  const fixedYield = useTokenYield(poolInfo, "principal");
  const { decimals: baseAssetDecimals } = baseAssetInfo;

  // Term Asset Info
  const termAssetBalance = balances?.[termAssetIndex];

  const termAssetSymbol = formatTermAssetShortSymbol(
    termAssetInfo as PrincipalTokenInfo | YieldTokenInfo,
  );
  const { decimals: termAssetDecimals } = termAssetInfo;

  const termSpotPrice = usePoolSpotPrice(pool, termAssetContract.address);

  const swaps = useSwaps(poolInfo);

  const termAssetPrice =
    baseAssetPrice && termSpotPrice
      ? Money.fromDecimal(
          baseAssetPrice.toDecimal() * termSpotPrice,
          currency,
          Math.round,
        )
      : undefined;

  let termAssetPriceTrend;
  if (
    swaps?.length &&
    termSpotPrice &&
    baseAssetPriceYesterday &&
    baseAssetPrice
  ) {
    const swapOneDayAgo = swaps[0];
    const [, tokenIn, , amountIn, amountOut] = swapOneDayAgo;
    const baseAmount =
      tokenIn === baseAssetContract?.address ? amountIn : amountOut;
    const termAmount =
      tokenIn === termAssetContract?.address ? amountIn : amountOut;
    const oldSpotPrice = Math.abs(
      +formatUnits(termAmount, baseAssetDecimals) /
        +formatUnits(baseAmount, baseAssetDecimals),
    );
    // this calculation is pretty iffy.  baseAssetPriceYesterday probably does not line up with
    // oldSpotPrice very well.
    // TOOD: find better historical data for ETH and other base assets.
    const oldTermAssetPrice =
      oldSpotPrice * baseAssetPriceYesterday.toDecimal();
    const newTermAssetPrice = termSpotPrice * baseAssetPrice.toDecimal();
    termAssetPriceTrend =
      (newTermAssetPrice - oldTermAssetPrice) / oldTermAssetPrice;
  }

  let termAssetBalanceTrend;

  const accumulatedFiatInterest =
    useAccumulatedFiatInterestForTranche(poolInfo);

  const accumulatedInterest = useAccumulatedInterestForTranche(poolInfo);

  const fiatInterestPerToken = interestSupply
    ? accumulatedFiatInterest?.divide(interestSupply, Math.round)
    : undefined;

  const interestPerToken = interestSupply
    ? +formatUnits(accumulatedInterest || 0, termAssetDecimals) / interestSupply
    : undefined;

  return {
    baseAssetSymbol,
    termAssetContract,
    termAssetSymbol,
    termAssetBalance,
    termAssetBalanceTrend,
    termAssetDecimals,
    termAssetPrice,
    spotPrice: termSpotPrice,
    termAssetPriceTrend,
    fixedYield,
    fiatInterestPerToken,
    interestPerToken,
  };
}
