import { Button, Callout, Intent, Switch } from "@blueprintjs/core";
import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { Tranche } from "@elementfi/core-typechain/dist/v1";
import { PrincipalTokenInfo } from "@elementfi/core-tokenlist";
import { Web3Provider } from "@ethersproject/providers";
import tw from "efi-tailwindcss-classnames";
import { useNumericInput } from "ui/base/hooks/useNumericInput/useNumericInput";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { findAssetIcon } from "ui/crypto/CryptoIcon";
import { useSigner } from "ui/provider/useBlockFromTag/useSigner/useSigner";
import { useTokenBalanceOf } from "ui/token/hooks/useTokenBalanceOf";
import { RedeemForm } from "ui/tranche/RedeemForm/RedeemForm";
import { WalletApprovalCallout } from "ui/transactions/TransactionDrawer/WalletApprovalCallout";
import { useRedeemTermAssetsToEth } from "ui/userProxy/useRedeemTermAssetsToEth";
import { WalletDrawer } from "ui/wallets/WalletDrawer/WalletDrawer";
import ContractAddresses from "addresses/addresses";
import { convertEpochSecondsToDate } from "base/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { formatFullDate } from "base/dates/dates";
import { CryptoAsset, CryptoAssetType } from "elf/crypto/CryptoAsset";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { trancheContractsByAddress } from "elf/tranche/tranches";
import { BigNumber, Signer } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { t } from "ttag";
import { useWithdrawPrincipal } from "./useWithdrawPrincipal";

const { userProxyContractAddress } = ContractAddresses;
interface RedeemPrincipalTokensDrawerProps {
  account: string | null | undefined;
  library: Web3Provider | undefined;
  baseAsset: CryptoAsset;
  principalTokenInfo: PrincipalTokenInfo;
  userProxyAllowance: string;
  isOpen: boolean;
  onClose: () => void;
}

export function RedeemPrincipalTokensDrawer({
  library,
  account,
  baseAsset,
  principalTokenInfo,
  userProxyAllowance,
  isOpen,
  onClose,
}: RedeemPrincipalTokensDrawerProps): ReactElement {
  const signer = useSigner(account, library);

  // base asset calls
  const baseAssetSymbol = getCryptoSymbol(baseAsset);
  const baseAssetIcon = findAssetIcon(baseAsset);

  // tranche calls
  const { decimals: principalTokenDecimals } = principalTokenInfo;
  const { unlockTimestamp } = principalTokenInfo.extensions;
  const unlockTimestampDate = convertEpochSecondsToDate(unlockTimestamp);
  const unlockTimestampLabel = unlockTimestampDate
    ? formatFullDate(unlockTimestampDate)
    : undefined;

  const { stringValue: principalTokenValue, setValue: setPrincipalTokenValue } =
    useNumericInput({
      min: 0,
      maxPrecision: principalTokenDecimals ?? 18,
    });

  const tranche = trancheContractsByAddress[principalTokenInfo.address];
  const [enoughAllowance, setEnoughAllowance] = useState(!!+userProxyAllowance);
  const [includePermits, setIncludePermits] = useState(true);
  const showPermitCallout =
    !enoughAllowance && baseAsset.type === CryptoAssetType.ETHEREUM;
  const showApprovalCallout = showPermitCallout && !includePermits;
  useEffect(() => {
    if (
      parseUnits(userProxyAllowance || "0").lt(
        parseUnits(principalTokenValue || "0"),
      )
    ) {
      setEnoughAllowance(false);
    }
  }, [userProxyAllowance, principalTokenValue]);
  const { data: principalTokenBalanceOf } = useTokenBalanceOf(
    tranche as unknown as ERC20,
    account,
  );
  const onSetMaxAmount = useCallback(() => {
    setPrincipalTokenValue(
      formatUnits(principalTokenBalanceOf ?? 0, principalTokenDecimals),
    );
  }, [principalTokenBalanceOf, setPrincipalTokenValue, principalTokenDecimals]);

  const principalTokenValueBN = parseUnits(
    principalTokenValue || "0",
    principalTokenDecimals,
  );

  const {
    withdraw: redeemPrincipalTokens,
    isError,
    isLoading,
    reset,
  } = useRedeemPrincipalTokens(
    signer,
    tranche,
    account,
    principalTokenValueBN,
    baseAsset,
    onClose,
  );

  const confirmButtonLabel = getConfirmButtonLabel(
    account,
    principalTokenValueBN,
    principalTokenBalanceOf,
  );

  const confirmButtonDisabled = getConfirmButtonDisabled(
    account,
    principalTokenValueBN,
    principalTokenBalanceOf,
    enoughAllowance,
    showApprovalCallout,
  );

  let buttonIntent = isError ? Intent.DANGER : Intent.PRIMARY;
  if (
    principalTokenBalanceOf &&
    principalTokenValueBN.gt(principalTokenBalanceOf)
  ) {
    buttonIntent = Intent.DANGER;
  }

  const onCloseDrawer = useCallback(() => {
    setPrincipalTokenValue("");
    reset();
    onClose();
  }, [onClose, reset, setPrincipalTokenValue]);

  return (
    <WalletDrawer
      isOpen={isOpen}
      onClose={onCloseDrawer}
      className={tw("justify-between")}
    >
      <div className={tw("flex", "flex-col", "space-y-4")}>
        {showApprovalCallout && (
          <WalletApprovalCallout
            spenderAddress={userProxyContractAddress}
            amount={principalTokenValue || "0"}
            messageRenderer={() =>
              `Approval needed for ${principalTokenInfo.name}`
            }
            signer={signer}
            ownerAddress={account}
            cryptoAsset={getCryptoAssetForToken(principalTokenInfo.address)}
          />
        )}
        {showPermitCallout && (
          <Callout>
            <div>
              <Switch
                label={t`Include pre-approvals with permit data. (Turn this off for ledger)`}
                checked={includePermits}
                onChange={() => setIncludePermits(!includePermits)}
              />
            </div>
          </Callout>
        )}
        <RedeemForm
          onSetMaxAmount={onSetMaxAmount}
          heading={t`Redeem ${baseAssetSymbol} Principal Tokens`}
          tranche={tranche}
          amount={principalTokenValue}
          intent={buttonIntent}
          assetSymbol={t`${baseAssetSymbol} Principal Token`}
          assetIcon={baseAssetIcon}
          onAmountChange={setPrincipalTokenValue}
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
          intent={buttonIntent}
          loading={isLoading}
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

function useRedeemPrincipalTokens(
  signer: Signer | undefined,
  tranche: Tranche,
  account: string | null | undefined,
  trancheAmountBigNumber: BigNumber | undefined,
  baseAsset: CryptoAsset,
  onTransactionSubmitted: () => void,
): {
  withdraw: () => void;
  reset: () => void;
  isError: boolean;
  isLoading: boolean;
} {
  const withdrawPrincipal = useWithdrawPrincipal(
    signer,
    tranche,
    account,
    trancheAmountBigNumber,
    onTransactionSubmitted,
  );

  const withdrawEth = useRedeemTermAssetsToEth(
    signer,
    tranche,
    account,
    trancheAmountBigNumber || BigNumber.from(0),
    BigNumber.from(0),
    onTransactionSubmitted,
  );

  if (baseAsset.type === CryptoAssetType.ETHEREUM) {
    return withdrawEth;
  }

  return withdrawPrincipal;
}

function getConfirmButtonLabel(
  account: string | null | undefined,
  amountIn: BigNumber | undefined,
  balanceOf: BigNumber | undefined,
) {
  if (!account) {
    return t`Connect your wallet to continue`;
  }

  if (amountIn && balanceOf && amountIn.gt(balanceOf)) {
    return t`Insufficient balance`;
  }

  return t`Confirm transaction`;
}

function getConfirmButtonDisabled(
  account: string | null | undefined,
  amountIn: BigNumber | undefined,
  balanceOf: BigNumber | undefined,
  enoughAllowance: boolean,
  useApprovals: boolean,
) {
  // must be connected to click this button
  if (!account) {
    return true;
  }

  // disabled when no amount is entered
  if (!amountIn || !balanceOf) {
    return true;
  }

  if (amountIn.gt(balanceOf)) {
    return true;
  }

  if (!enoughAllowance && useApprovals) {
    return true;
  }

  // otherwise the button should not be disabled
  return false;
}
