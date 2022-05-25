import { ReactElement, useCallback } from "react";

import { Button, Intent } from "@blueprintjs/core";
import { Web3Provider } from "@ethersproject/providers";
import { BigNumber, Signer } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { RedeemForm } from "ui/tranche/RedeemForm/RedeemForm";
import { WalletDrawer } from "ui/wallets/WalletDrawer/WalletDrawer";
import { convertEpochSecondsToDate } from "base/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { formatFullDate } from "base/dates/dates";
import { CryptoAssetType } from "elf/crypto/CryptoAsset";

import { useRedeemTermAssetsToEth } from "ui/userProxy/useRedeemTermAssetsToEth";
import { useWithdrawPrincipal } from "ui/tranche/RedeemTokensDrawer/useWithdrawPrincipal";
import { PrincipalTokenInfo } from "@elementfi/core-tokenlist";
import { trancheContractsByAddress } from "elf/tranche/tranches";
import { getBaseAssetForTranche } from "elf/tranche/baseAssets";

interface RedeemPrincipalTokensConfirmationDrawerProps {
  account: string | null | undefined;
  library: Web3Provider | undefined;
  principalTokenInfo: PrincipalTokenInfo;
  amountIn: string;
  isOpen: boolean;
  onClose: () => void;
}

export function RedeemPrincipalTokensConfirmationDrawer({
  library,
  account,
  amountIn,
  principalTokenInfo,
  isOpen,
  onClose,
}: RedeemPrincipalTokensConfirmationDrawerProps): ReactElement {
  const signer = account ? (library?.getSigner(account) as Signer) : undefined;

  // tranche
  const {
    address: trancheAddress,
    decimals: trancheDecimals,
    extensions: { unlockTimestamp: trancheUnlockTimestamp },
  } = principalTokenInfo;

  const tranche = trancheContractsByAddress[trancheAddress];
  const unlockTimestampDate = convertEpochSecondsToDate(trancheUnlockTimestamp);
  const unlockTimestampLabel = unlockTimestampDate
    ? formatFullDate(unlockTimestampDate)
    : undefined;
  const trancheAmountBigNumber =
    amountIn && trancheDecimals
      ? parseUnits(amountIn, trancheDecimals)
      : undefined;

  // base asset
  const baseAsset = getBaseAssetForTranche(trancheAddress);
  const baseAssetSymbol = getCryptoSymbol(baseAsset);

  const confirmButtonLabel = getConfirmButtonLabel(account);
  const confirmButtonDisabled = getConfirmButtonDisabled(
    account,
    trancheAmountBigNumber,
  );

  const { withdraw: withdrawPrincipal } = useWithdrawPrincipal(
    signer,
    tranche,
    account,
    trancheAmountBigNumber,
  );

  const { withdraw: withdrawToEth } = useRedeemTermAssetsToEth(
    signer,
    tranche,
    account,
    trancheAmountBigNumber || BigNumber.from(0),
    BigNumber.from(0),
  );

  const redeemPrincipalTokens = useCallback(() => {
    if (baseAsset.type === CryptoAssetType.ETHEREUM) {
      withdrawToEth();
    } else {
      withdrawPrincipal();
    }
  }, [baseAsset.type, withdrawPrincipal, withdrawToEth]);

  return (
    <WalletDrawer
      isOpen={isOpen}
      onClose={onClose}
      className={tw("justify-between")}
    >
      <div className={tw("flex", "flex-col", "space-y-4")}>
        <RedeemForm
          heading={t`Redeem ${baseAssetSymbol} Principal Tokens`}
          tranche={tranche}
          amount={amountIn}
          assetSymbol={t`${baseAssetSymbol} Principal Token`}
        >
          <div className={tw("flex", "flex-col", "space-y-6", "items-center")}>
            <LabeledText
              bold
              muted={false}
              containerClassName={tw("justify-center")}
              className={tw("items-center")}
              text={<span>{t`Term date`}</span>}
              label={
                <span className={tw("text-base")}>{unlockTimestampLabel}</span>
              }
            />
          </div>
        </RedeemForm>
        <Button
          fill
          disabled={confirmButtonDisabled}
          intent={Intent.PRIMARY}
          className={tw("h-16")}
          large
          outlined
          onClick={redeemPrincipalTokens}
        >
          {confirmButtonLabel}
        </Button>
      </div>
    </WalletDrawer>
  );
}

function getConfirmButtonLabel(account: string | null | undefined) {
  if (!account) {
    return t`Connect your wallet to continue`;
  }

  return t`Confirm transaction`;
}

function getConfirmButtonDisabled(
  account: string | null | undefined,
  amountIn: BigNumber | undefined,
) {
  // must be connected to click this button
  if (!account) {
    return true;
  }

  // disabled when no amount is entered
  if (!amountIn) {
    return true;
  }

  // otherwise the button should not be disabled
  return false;
}
