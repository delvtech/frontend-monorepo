import { Button, Classes, Intent } from "@blueprintjs/core";
import { PrincipalTokenInfo, TokenInfo } from "@elementfi/tokenlist";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { formatBalance } from "base/formatBalance/formatBalance";
import classNames from "classnames";
import tw from "efi-tailwindcss-classnames";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getPoolInfoForPrincipalToken } from "elf/pools/ccpool";
import { commify } from "ethers/lib/utils";
import { ReactElement, useCallback, useState } from "react";
import { getTokenInfo } from "tokenlists/tokenlists";
import { t } from "ttag";
import { useNumericInput } from "ui/base/hooks/useNumericInput/useNumericInput";
import { useCalculatePrincipalTokenAmountOut } from "ui/ccpools/useCalculatePrincipalTokenAmountOut";
import { useMarketPrice } from "ui/ccpools/useMarketPrice";
import { useCryptoBalanceOf } from "ui/crypto/hooks/useCryptoBalance/useCryptoBalance";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { TokenAmountInput2 } from "ui/token/TokenAmountInput/TokenAmountInput2";
import { getMarketRateLabel } from "ui/tranche/getMarketRateLabel";
import { useEstimateBaseTokensByZap } from "ui/zaps/zapSwapCurve/useEstimateBaseTokensByZap";
import { usePrincipalTokenZapPrice } from "ui/zaps/zapSwapCurve/usePrincipalTokenZapPrice";
import { useValidateBuyPrincipalTokenInputByZap } from "ui/zaps/zapSwapCurve/useValidateBuyPrincipalTokenInputByZap";
import { ZapTokensTransactionConfirmationDrawer } from "ui/zaps/zapSwapCurve/ZapTokensTransactionConfirmationDrawer";
import { FixedRateZapPreviewCallout } from "./FixedRateZapPreviewCallout";

interface BuyFixedRatesZapProps {
  principalToken: PrincipalTokenInfo;
  inputToken: TokenInfo;
  inputTokens: TokenInfo[];
}

export function BuyFixedRatesZap({
  principalToken,
  inputToken,
  inputTokens,
}: BuyFixedRatesZapProps): ReactElement {
  const { account, library } = useWeb3React<Web3Provider>();

  const inputAsset = getCryptoAssetForToken(inputToken.address);
  const inputAssetBalanceOf = useCryptoBalanceOf(library, account, inputAsset);
  const inputAssetDisplayBalance = formatBalance(
    inputAssetBalanceOf,
    inputToken.decimals,
  );
  const { stringValue: inputTokenValue, setValue: onInputChange } =
    useNumericInput();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const { isDarkMode } = useDarkMode();

  const principalPriceSwap = useMarketPrice(principalToken);
  const roundedPrincipalPriceSwap = commify((+principalPriceSwap)?.toFixed(4));

  const marketRateLabelSwap = getMarketRateLabel(
    inputTokens[0].symbol,
    roundedPrincipalPriceSwap,
    inputTokens[0].symbol,
  );

  const baseToken = getTokenInfo(principalToken.extensions.underlying);

  const principalPriceZap = usePrincipalTokenZapPrice(
    principalToken,
    inputToken,
  );

  const roundedPrincipalPriceZap = commify((+principalPriceZap)?.toFixed(4));
  const marketRateLabelZap = getMarketRateLabel(
    baseToken.symbol,
    roundedPrincipalPriceZap,
    inputToken.symbol,
  );

  const { tokenOutError, tokenInError } =
    useValidateBuyPrincipalTokenInputByZap(
      library,
      account,
      principalToken,
      inputToken,
      inputTokenValue,
    );

  const poolInfo = getPoolInfoForPrincipalToken(principalToken.address);

  const baseAmountIn = useEstimateBaseTokensByZap(
    principalToken,
    inputToken,
    inputTokenValue,
  );

  const { amountOut: principalTokensOut, error: previewError } =
    useCalculatePrincipalTokenAmountOut(poolInfo, baseAmountIn);

  const inputErrorMessage = tokenInError || tokenOutError;
  const hasInputError = !!inputErrorMessage || !!previewError;

  const isBuyButtonDisabled = hasInputError || !+inputTokenValue;
  const buttonErrorMessage = previewError
    ? t`Insufficient liquidity in pool`
    : inputErrorMessage;
  const buyButtonIntent = hasInputError ? Intent.DANGER : Intent.PRIMARY;

  return (
    <>
      <div className={tw("flex", "flex-col")}>
        <span className={tw("text-base", "text-left")}>{t`You Spend`}</span>
        {!!account && (
          <span
            className={classNames(Classes.TEXT_MUTED, tw("text-right", "mb-2"))}
          >{t`Balance: ${inputAssetDisplayBalance} ${inputToken.symbol}`}</span>
        )}
        <div
          style={{
            background: isDarkMode ? "var(--bp3-dark-bg-color)" : "",
          }}
          className={classNames(tw("flex", "rounded", "mb-2"))}
        >
          <TokenAmountInput2
            showMaxButton
            placeholder="0.00"
            inputGroupStyle={{
              height: "72px",
              width: "100%",
              fontSize: "1.125rem",
            }}
            intent={hasInputError ? Intent.DANGER : Intent.NONE}
            value={inputTokenValue}
            maxAmount={inputAssetBalanceOf}
            tokenDecimals={inputToken.decimals}
            onValueChange={onInputChange}
          />
        </div>
        {hasInputError && (
          <span
            className={classNames(
              tw(
                "text-xs",
                "text-right",
                "mb-2",
                isDarkMode ? "text-red-500" : "text-red-700",
              ),
            )}
          >
            {inputErrorMessage}
          </span>
        )}
        <span
          className={classNames(
            Classes.TEXT_MUTED,
            tw("text-xs", "text-right"),
          )}
        >
          {marketRateLabelSwap}
        </span>
        <span
          className={classNames(
            Classes.TEXT_MUTED,
            tw("text-xs", "text-right"),
          )}
        >
          {marketRateLabelZap}
        </span>
      </div>
      <div className={tw("flex", "flex-col", "space-y-3")}>
        <span className={tw("text-base", "text-left")}>{t`Review Order`}</span>
        <FixedRateZapPreviewCallout
          principalToken={principalToken}
          inputToken={inputToken}
          baseToken={baseToken}
          principalTokenAmountOut={principalTokensOut}
          inputTokenAmountIn={inputTokenValue}
          baseTokenAmountIn={baseAmountIn}
        />
      </div>

      <Button
        disabled={isBuyButtonDisabled}
        onClick={openDrawer}
        outlined
        large
        intent={buyButtonIntent}
      >
        {hasInputError ? buttonErrorMessage : t`Buy`}
      </Button>

      <ZapTokensTransactionConfirmationDrawer
        account={account}
        library={library}
        buttonLabel={t`Buy`}
        amountIn={inputTokenValue}
        estimatedAmountOut={principalTokensOut}
        principalToken={principalToken}
        inputToken={inputToken}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
    </>
  );
}
