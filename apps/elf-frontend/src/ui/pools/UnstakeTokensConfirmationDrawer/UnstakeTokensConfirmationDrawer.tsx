import {
  PrincipalTokenInfo,
  TokenInfo,
  YieldTokenInfo,
} from "@elementfi/tokenlist";
import { Web3Provider } from "@ethersproject/providers";
import { UnstakeConfirmationForm } from "ui/pools/UnstakeTokensConfirmationDrawer/UnstakeConfirmationForm";
import { TransactionDrawer } from "ui/transactions/TransactionDrawer/TransactionDrawer";
import { EMPTY_ARRAY } from "base/emptyArray";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { formatTermAssetShortSymbol } from "elf/tranche/format";
import { WalletApprovalInfo } from "elf/wallets/WalletApprovalInfo";
import { ReactElement } from "react";
import { t } from "ttag";

interface UnstakeConfirmationDrawerProps {
  account: string | null | undefined;
  library: Web3Provider | undefined;
  baseAssetInfo: TokenInfo;
  termAssetInfo: PrincipalTokenInfo | YieldTokenInfo;
  baseAssetValue: string;
  termAssetValue: string;
  lpTokensIn: string;
  isOpen: boolean;
  onClose: () => void;
  onUnstake: () => void;
  isUnstakeLoading: boolean;
  isUnstakeError: boolean;
  isUnstakeSuccess: boolean;
  unstakeError: Error | undefined;
}

export function UnstakeConfirmationDrawer({
  library,
  account,
  baseAssetInfo,
  termAssetInfo,
  baseAssetValue,
  termAssetValue,
  lpTokensIn,
  isOpen,
  onClose,
  isUnstakeError,
  unstakeError,
  isUnstakeLoading,
  isUnstakeSuccess,
  onUnstake,
}: UnstakeConfirmationDrawerProps): ReactElement {
  const baseAsset = getCryptoAssetForToken(baseAssetInfo.address);
  const baseAssetSymbol = getCryptoSymbol(baseAsset);

  const termAssetSymbol = formatTermAssetShortSymbol(
    termAssetInfo as PrincipalTokenInfo | YieldTokenInfo,
  );

  return (
    <TransactionDrawer
      library={library}
      account={account}
      transactionPending={isUnstakeLoading}
      transactionSuccess={isUnstakeSuccess}
      transactionError={unstakeError}
      transactionFailed={isUnstakeError}
      confirmButtonDisabled={false}
      buttonLabel={t`Remove liquidity`}
      isOpen={isOpen}
      onClose={onClose}
      onConfirmTransaction={onUnstake}
      walletApprovalInfos={EMPTY_ARRAY as WalletApprovalInfo[]}
      transactionDetails={
        <UnstakeConfirmationForm
          amountIn={lpTokensIn}
          assetOneSymbol={baseAssetSymbol}
          assetTwoSymbol={termAssetSymbol}
          heading={t`Confirm removing liquidity`}
          assetOneValueLabel={baseAssetValue}
          assetTwoValueLabel={termAssetValue}
        />
      }
    />
  );
}
