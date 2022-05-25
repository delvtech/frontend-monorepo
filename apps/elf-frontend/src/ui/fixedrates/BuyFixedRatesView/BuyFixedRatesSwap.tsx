import { Button, Classes, Intent } from "@blueprintjs/core";
import {
  PrincipalPoolTokenInfo,
  PrincipalTokenInfo,
} from "@elementfi/core-tokenlist";
import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { formatBalance } from "base/formatBalance/formatBalance";
import classNames from "classnames";
import tw from "efi-tailwindcss-classnames";
import { getTokenAddressForBalancer } from "elf/balancer/getTokenAddressForBalancer";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoDecimals } from "elf/crypto/getCryptoDecimals";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { commify } from "ethers/lib/utils";
import { SwapKind } from "integrations/balancer/SwapKind";
import { ReactElement, useCallback, useState } from "react";
import { getTokenInfo } from "tokenlists/tokenlists";
import { t } from "ttag";
import { useNumericInput } from "ui/base/hooks/useNumericInput/useNumericInput";
import { useCalculatePrincipalTokenAmountOut } from "ui/ccpools/useCalculatePrincipalTokenAmountOut";
import { useMarketPrice } from "ui/ccpools/useMarketPrice";
import { findAssetIcon } from "ui/crypto/CryptoIcon";
import { useCryptoBalanceOf } from "ui/crypto/hooks/useCryptoBalance/useCryptoBalance";
import { useValidateBuyPrincipalTokenInput } from "ui/pools/hooks/useValidateBuyPrincipalTokenInput";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { SwapTokensTransactionConfirmationDrawer } from "ui/swaps/SwapTokensTransactionConfirmationDrawer/SwapTokensTransactionConfirmationDrawer";
import { TokenAmountInput2 } from "ui/token/TokenAmountInput/TokenAmountInput2";
import { getMarketRateLabel } from "ui/tranche/getMarketRateLabel";
import { FixedRatePreviewCallout } from "./FixedRatePreviewCallout";

interface BuyFixedRatesSwapProps {
  principalToken: PrincipalTokenInfo;
  principalTokenPoolInfo: PrincipalPoolTokenInfo;
}

export function BuyFixedRatesSwap({
  principalToken,
  principalTokenPoolInfo,
}: BuyFixedRatesSwapProps): ReactElement {
  const { account, library } = useWeb3React<Web3Provider>();
  const {
    extensions: { underlying },
  } = principalToken;

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  const { isDarkMode } = useDarkMode();

  const baseAsset = getCryptoAssetForToken(underlying);
  const baseAssetUnderlyingAddress = getTokenAddressForBalancer(baseAsset);
  const baseAssetSymbol = getCryptoSymbol(baseAsset);
  const baseAssetDecimals = getCryptoDecimals(baseAsset);
  const baseAssetBalanceOf = useCryptoBalanceOf(library, account, baseAsset);
  const baseAssetDisplayBalance = formatBalance(
    baseAssetBalanceOf,
    baseAssetDecimals,
  );

  const AssetIcon = findAssetIcon(baseAsset);
  const principalPrice = useMarketPrice(principalToken);
  const roundedPrincipalPrice = commify((+principalPrice)?.toFixed(4));
  const marketRateLabel = getMarketRateLabel(
    baseAssetSymbol,
    roundedPrincipalPrice,
    baseAssetSymbol,
  );

  // Deposit Amount stuff
  const { stringValue: baseAssetInputValue, setValue: onBaseAssetInputChange } =
    useNumericInput();
  const { tokenOutError, tokenInError } = useValidateBuyPrincipalTokenInput(
    library,
    account,
    principalTokenPoolInfo,
    baseAssetInputValue,
  );
  const { amountOut: principalTokensOut, error: previewError } =
    useCalculatePrincipalTokenAmountOut(
      principalTokenPoolInfo,
      baseAssetInputValue,
    );

  const inputErrorMessage = tokenInError || tokenOutError;
  const hasInputError = !!inputErrorMessage || !!previewError;

  const isBuyButtonDisabled = hasInputError || !+baseAssetInputValue;
  const buttonErrorMessage = previewError
    ? t`Insufficient liquidity in pool`
    : inputErrorMessage;
  const buyButtonIntent = hasInputError ? Intent.DANGER : Intent.PRIMARY;

  return (
    <>
      {/* Deposit Amount */}
      <div className={tw("flex", "flex-col")}>
        <span className={tw("text-base", "text-left")}>{t`You Spend`}</span>
        {!!account && (
          <span
            className={classNames(Classes.TEXT_MUTED, tw("text-right", "mb-2"))}
          >{t`Balance: ${baseAssetDisplayBalance} ${baseAssetSymbol}`}</span>
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
            value={baseAssetInputValue}
            maxAmount={baseAssetBalanceOf}
            tokenDecimals={baseAssetDecimals}
            onValueChange={onBaseAssetInputChange}
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
          {marketRateLabel}
        </span>
      </div>

      <div className={tw("flex", "flex-col", "space-y-3")}>
        <span className={tw("text-base", "text-left")}>{t`Review Order`}</span>

        <FixedRatePreviewCallout
          baseAssetSymbol={baseAssetSymbol}
          principalTokensOut={principalTokensOut}
          baseAssetIn={baseAssetInputValue}
          baseAssetDecimals={baseAssetDecimals}
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

      <SwapTokensTransactionConfirmationDrawer
        buttonLabel={t`Buy`}
        tokenInAddress={baseAssetUnderlyingAddress}
        tokenInSymbol={baseAssetSymbol}
        tokenInDecimals={baseAssetDecimals}
        tokenInAsset={baseAsset}
        tokenInIcon={AssetIcon}
        tokenOutAddress={principalToken.address}
        tokenOutSymbol={principalToken.symbol}
        tokenOutDecimals={baseAssetDecimals}
        tokenOutIcon={undefined}
        account={account}
        library={library}
        poolInfo={principalTokenPoolInfo}
        amountIn={baseAssetInputValue}
        amountOut={principalTokensOut}
        swapKind={SwapKind.GIVEN_IN}
        spotPrice={+principalPrice}
        isOpen={isDrawerOpen}
        onClose={closeDrawer}
      />
    </>
  );
}
