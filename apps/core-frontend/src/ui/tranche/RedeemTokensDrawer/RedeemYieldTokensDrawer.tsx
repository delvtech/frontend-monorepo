import { Button, Callout, Intent, Switch } from "@blueprintjs/core";
import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { Tranche } from "@elementfi/core-typechain/dist/v1";
import { YieldTokenInfo } from "@elementfi/core-tokenlist";
import { Web3Provider } from "@ethersproject/providers";
import tw from "efi-tailwindcss-classnames";
import { useNumericInput } from "ui/base/hooks/useNumericInput/useNumericInput";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { useSigner } from "ui/provider/useBlockFromTag/useSigner/useSigner";
import { useTokenBalanceOf } from "ui/token/hooks/useTokenBalanceOf";
import { RedeemForm } from "ui/tranche/RedeemForm/RedeemForm";
import { useWithdrawInterest } from "ui/tranche/RedeemTokensDrawer/useWithdrawInterest";
import { WalletApprovalCallout } from "ui/transactions/TransactionDrawer/WalletApprovalCallout";
import { useRedeemTermAssetsToEth } from "ui/userProxy/useRedeemTermAssetsToEth";
import { WalletDrawer } from "ui/wallets/WalletDrawer/WalletDrawer";
import ContractAddresses from "addresses/addresses";
import { convertEpochSecondsToDate } from "base/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { formatFullDate } from "base/dates/dates";
import { CryptoAsset, CryptoAssetType } from "elf/crypto/CryptoAsset";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { interestTokenContractsByAddress } from "elf/interestToken/interestToken";
import { trancheContractsByAddress } from "elf/tranche/tranches";
import { BigNumber, Signer } from "ethers";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { t } from "ttag";

const { userProxyContractAddress } = ContractAddresses;

interface RedeemYieldTokensDrawerProps {
  account: string | null | undefined;
  library: Web3Provider | undefined;
  baseAsset: CryptoAsset;
  yieldTokenInfo: YieldTokenInfo;
  userProxyAllowance: string;
  isOpen: boolean;
  onClose: () => void;
}

export function RedeemYieldTokensDrawer({
  library,
  account,
  baseAsset,
  yieldTokenInfo,
  userProxyAllowance,
  isOpen,
  onClose,
}: RedeemYieldTokensDrawerProps): ReactElement {
  const signer = useSigner(account, library);

  // base asset calls
  const baseAssetSymbol = getCryptoSymbol(baseAsset);

  const {
    address: yieldTokenAddress,
    decimals: yieldTokenDecimals,
    extensions: { tranche: trancheAddress, unlockTimestamp },
  } = yieldTokenInfo;
  const unlockTimestampDate = convertEpochSecondsToDate(unlockTimestamp);
  const unlockTimestampLabel = unlockTimestampDate
    ? formatFullDate(unlockTimestampDate)
    : undefined;
  const yieldTokenContract = interestTokenContractsByAddress[yieldTokenAddress];
  const trancheContract = trancheContractsByAddress[trancheAddress];

  // input
  const { stringValue: yieldTokenValue, setValue: setYieldTokenValue } =
    useNumericInput({
      min: 0,
      maxPrecision: yieldTokenDecimals,
    });

  const [enoughAllowance, setEnoughAllowance] = useState(!!+userProxyAllowance);
  const [includePermits, setIncludePermits] = useState(true);
  const showPermitCallout =
    !enoughAllowance && baseAsset.type === CryptoAssetType.ETHEREUM;
  const showApprovalCallout = showPermitCallout && !includePermits;
  useEffect(() => {
    if (
      parseUnits(userProxyAllowance || "0").lt(
        parseUnits(yieldTokenValue || "0"),
      )
    ) {
      setEnoughAllowance(false);
    }
  }, [userProxyAllowance, yieldTokenValue]);

  const { data: yieldTokenBalanceOf } = useTokenBalanceOf(
    yieldTokenContract as unknown as ERC20,
    account,
  );
  const onSetMaxAmount = useCallback(() => {
    setYieldTokenValue(
      formatUnits(yieldTokenBalanceOf ?? 0, yieldTokenDecimals),
    );
  }, [yieldTokenBalanceOf, yieldTokenDecimals, setYieldTokenValue]);

  const yieldTokenValueBN = parseUnits(
    yieldTokenValue || "0",
    yieldTokenDecimals,
  );

  const {
    withdraw: redeemYieldTokens,
    isError,
    isLoading,
    reset,
  } = useRedeemYieldTokens(
    signer,
    trancheContract,
    account,
    yieldTokenValueBN,
    baseAsset,
    onClose,
  );

  const confirmButtonLabel = getConfirmButtonLabel(
    account,
    yieldTokenValueBN,
    yieldTokenBalanceOf,
  );
  const confirmButtonDisabled = getConfirmButtonDisabled(
    account,
    yieldTokenValueBN,
    yieldTokenBalanceOf,
    enoughAllowance,
    showApprovalCallout,
  );

  let buttonIntent = isError ? Intent.DANGER : Intent.PRIMARY;
  if (yieldTokenBalanceOf && yieldTokenValueBN.gt(yieldTokenBalanceOf)) {
    buttonIntent = Intent.DANGER;
  }

  const onCloseDrawer = useCallback(() => {
    setYieldTokenValue("");
    reset();
    onClose();
  }, [onClose, reset, setYieldTokenValue]);

  return (
    <WalletDrawer
      isOpen={isOpen}
      onClose={onCloseDrawer}
      className={tw("justify-between")}
    >
      <div className={tw("flex", "flex-col", "space-y-4")}>
        {showApprovalCallout && (
          <WalletApprovalCallout
            amount={yieldTokenValue}
            spenderAddress={userProxyContractAddress}
            messageRenderer={() => `Approval needed for ${yieldTokenInfo.name}`}
            signer={signer}
            ownerAddress={account}
            cryptoAsset={getCryptoAssetForToken(yieldTokenInfo.address)}
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
          heading={t`Redeem ${baseAssetSymbol} Yield Tokens`}
          tranche={trancheContract}
          intent={buttonIntent}
          amount={yieldTokenValue}
          assetSymbol={t`${baseAssetSymbol} Yield Token`}
          onAmountChange={setYieldTokenValue}
        >
          <div className={tw("flex", "flex-col", "space-y-6", "items-center")}>
            <LabeledText
              bold
              containerClassName={tw("justify-center")}
              muted={false}
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
          disabled={isLoading || confirmButtonDisabled}
          loading={isLoading}
          intent={buttonIntent}
          className={tw("h-16")}
          large
          outlined
          onClick={redeemYieldTokens}
        >
          {confirmButtonLabel}
        </Button>
      </div>
    </WalletDrawer>
  );
}

function useRedeemYieldTokens(
  signer: Signer | undefined,
  tranche: Tranche,
  account: string | null | undefined,
  interestTokenAmountBigNumber: BigNumber,
  baseAsset: CryptoAsset,
  onClose: () => void,
): {
  withdraw: () => void;
  reset: () => void;
  isError: boolean;
  isLoading: boolean;
} {
  const redeemYield = useWithdrawInterest(
    signer,
    tranche,
    account,
    interestTokenAmountBigNumber,
    onClose,
  );

  const redeemEth = useRedeemTermAssetsToEth(
    signer,
    tranche,
    account,
    BigNumber.from(0),
    interestTokenAmountBigNumber,
    onClose,
  );

  if (baseAsset.type === CryptoAssetType.ETHEREUM) {
    return redeemEth;
  }
  return redeemYield;
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
