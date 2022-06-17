import { PrincipalTokenInfo, TokenInfo } from "@elementfi/core-tokenlist";
import { Web3Provider } from "@ethersproject/providers";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { ZapSwapCurveAddress } from "elf/zaps/zapSwapCurve/addresses";
import React, { ReactElement, useCallback } from "react";
import { t } from "ttag";
import { useSigner } from "ui/provider/useBlockFromTag/useSigner/useSigner";
import { SwapDetailsForm } from "ui/swaps/SwapDetailsPreview/SwapDetailsForm";
import { useWalletApprovalInfos } from "ui/swaps/SwapTokensTransactionConfirmationDrawer/SwapTokensTransactionConfirmationDrawer";
import { TransactionDrawer } from "ui/transactions/TransactionDrawer/TransactionDrawer";
import { useZapIn } from "./useZapSwapCurve";

interface ZapTokensTransactionConfirmationDrawerProps {
  account: string | null | undefined;
  library: Web3Provider | undefined;
  buttonLabel?: string;
  amountIn: string;
  principalToken: PrincipalTokenInfo;
  inputToken: TokenInfo;
  isOpen: boolean;
  onClose: () => void;
}

export function ZapTokensTransactionConfirmationDrawer({
  library,
  account,
  buttonLabel = t`Trade`,
  amountIn,
  principalToken,
  inputToken,
  isOpen,
  onClose,
}: ZapTokensTransactionConfirmationDrawerProps): ReactElement {
  const signer = useSigner(account, library);
  const {
    zap: onConfirmZapTokens,
    mutationResult: zapResult,
    canZap,
    amountOut,
  } = useZapIn(account, signer, principalToken, inputToken, amountIn);

  const { isLoading, isError, isSuccess, reset, error } = zapResult;

  const inputAsset = getCryptoAssetForToken(inputToken.address);

  const walletApprovalInfos = useWalletApprovalInfos(
    inputAsset,
    account,
    amountIn,
    ZapSwapCurveAddress,
  );

  const resetSwap = useCallback(() => {
    reset();
    onClose();
  }, [onClose, reset]);

  return (
    <TransactionDrawer
      isOpen={isOpen}
      onClose={resetSwap}
      account={account}
      library={library}
      onConfirmTransaction={onConfirmZapTokens}
      confirmButtonDisabled={!canZap}
      buttonLabel={buttonLabel}
      walletApprovalInfos={walletApprovalInfos}
      transactionPending={isLoading}
      transactionFailed={isError}
      transactionError={error as Error | undefined}
      transactionSuccess={isSuccess}
      transactionDetails={
        <SwapDetailsForm
          amountIn={amountIn}
          amountOut={amountOut ?? "--"}
          amountOutLabel={t`To`}
          assetInSymbol={inputToken.symbol}
          assetOutSymbol={principalToken.symbol}
        ></SwapDetailsForm>
      }
    />
  );
}
