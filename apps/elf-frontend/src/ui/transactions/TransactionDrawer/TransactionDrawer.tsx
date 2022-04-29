import { ReactElement } from "react";

import { Button, Intent, Tag } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Web3Provider } from "@ethersproject/providers";
import { errorCodes, serializeError } from "eth-rpc-errors";
import { BigNumber, Signer } from "ethers";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { getQueriesData } from "ui/base/queryResults";
import { useTokenAllowanceMulti } from "ui/token/hooks/useTokenAllowance";
import { WalletDrawer } from "ui/wallets/WalletDrawer/WalletDrawer";
import { ERC20Shim } from "elf/contracts/ERC20Shim";
import { findTokenContract } from "elf/crypto/CryptoAsset";
import { WalletApprovalInfo } from "elf/wallets/WalletApprovalInfo";

import { WalletApprovalCallout } from "./WalletApprovalCallout";
import { parseUnits } from "ethers/lib/utils";
import { getCryptoDecimals } from "elf/crypto/getCryptoDecimals";

interface TransactionDrawerProps {
  account: string | null | undefined;
  confirmButtonDisabled?: boolean;
  isOpen: boolean;
  library: Web3Provider | undefined;
  onClose: () => void;
  onConfirmTransaction: () => void;
  transactionDetails?: ReactElement | null;
  buttonLabel: string;
  walletApprovalInfos?: WalletApprovalInfo[];
  transactionPending?: boolean;
  transactionError?: Error;
  transactionSuccess?: boolean;
  transactionFailed?: boolean;
}

export function TransactionDrawer({
  account,
  isOpen,
  library,
  onClose,
  onConfirmTransaction,
  transactionDetails,
  confirmButtonDisabled: confirmButtonDisabledFromProps,
  walletApprovalInfos = [],
  buttonLabel,
  transactionPending = false,
  transactionSuccess = false,
  transactionFailed = false,
  transactionError,
}: TransactionDrawerProps): ReactElement {
  const signer = account ? (library?.getSigner(account) as Signer) : undefined;

  const owners = walletApprovalInfos?.map(({ ownerAddress }) => ownerAddress);
  const spenders = walletApprovalInfos?.map(
    ({ spenderAddress }) => spenderAddress,
  );
  const walletApprovalContracts = walletApprovalInfos?.map(({ cryptoAsset }) =>
    findTokenContract(cryptoAsset),
  );
  const approvalAllowances = useTokenAllowanceMulti(
    walletApprovalContracts as ERC20Shim[],
    owners,
    spenders,
  );

  const confirmButtonLabel = getConfirmButtonLabel(
    buttonLabel,
    account,
    transactionFailed,
  );

  const confirmButtonDisabled =
    confirmButtonDisabledFromProps ||
    getConfirmButtonDisabled(
      account,
      walletApprovalInfos,
      getQueriesData(approvalAllowances),
      transactionPending,
    );

  const buttonIntent = getConfirmButtonIntent(
    transactionSuccess,
    transactionFailed,
  );

  const helperText = getHelperText(transactionSuccess, transactionError);

  return (
    <WalletDrawer isOpen={isOpen} onClose={onClose}>
      <div
        className={tw(
          "flex",
          "flex-col",
          "flex-1",
          "space-y-10",
          "justify-end",
        )}
      >
        {transactionDetails}

        {walletApprovalInfos?.map(
          ({
            cryptoAsset,
            messageRenderer,
            ownerAddress,
            spenderAddress,
            amount,
          }) => {
            return (
              <WalletApprovalCallout
                key={cryptoAsset?.id ?? null}
                spenderAddress={spenderAddress}
                messageRenderer={messageRenderer}
                signer={signer}
                amount={amount}
                ownerAddress={ownerAddress}
                cryptoAsset={cryptoAsset}
              />
            );
          },
        )}

        <div className={tw("flex", "flex-col", "space-y-2")}>
          <Button
            loading={transactionPending}
            fill
            disabled={confirmButtonDisabled}
            intent={buttonIntent}
            className={tw("h-16")}
            large
            outlined
            onClick={onConfirmTransaction}
          >
            {confirmButtonLabel}
          </Button>
          {helperText && (
            <Tag
              intent={buttonIntent}
              minimal
              large
              fill
              icon={
                transactionSuccess
                  ? IconNames.TICK_CIRCLE
                  : IconNames.WARNING_SIGN
              }
            >
              {helperText}
            </Tag>
          )}
        </div>
      </div>
    </WalletDrawer>
  );
}

function getConfirmButtonIntent(
  transactionSuccess: boolean,
  transactionError: boolean,
) {
  let buttonIntent: Intent = Intent.PRIMARY;
  if (transactionSuccess) {
    buttonIntent = Intent.SUCCESS;
  }
  if (transactionError) {
    buttonIntent = Intent.DANGER;
  }
  return buttonIntent;
}

function getHelperText(
  transactionSuccess: boolean,
  transactionError: Error | undefined,
) {
  if (transactionSuccess) {
    return `Transaction succeeded`;
  }
  if (transactionError) {
    const serializedError = serializeError(transactionError);
    // 'data' here can take any number of shapes and may not exist at all.  We cast to 'any' and
    // just check if there is an actual rpc error code that we recognize to handle the error.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((serializedError?.data as any)?.code === errorCodes.rpc.internal) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const message = ((serializedError.data as any).message as string).split(
        ":",
      );
      return t`Transaction failed: (${message[message.length - 1].trim()})`;
    }

    return transactionError.message;
  }
}

function getConfirmButtonLabel(
  label: string,
  account: string | null | undefined,
  transactionError: boolean,
) {
  if (!account) {
    return t`Connect your wallet to continue`;
  }
  if (transactionError) {
    return `Retry ${label}`;
  }

  return label;
}

function getConfirmButtonDisabled(
  account: string | null | undefined,
  walletApprovalInfos: WalletApprovalInfo[],
  allowances: (BigNumber | undefined)[],
  transactionPending: boolean,
) {
  if (transactionPending) {
    return true;
  }

  // can't confirm anything w/out base assets
  if (!walletApprovalInfos.every(({ cryptoAsset }) => !!cryptoAsset)) {
    return true;
  }

  // must be connected to click this button
  if (!account) {
    return true;
  }

  const hasEnoughAllowance = allowances.every((allowance, i) => {
    const amount = parseUnits(
      // since amounts are passed as strings, this could be an empty string
      walletApprovalInfos[i].amount || "0",
      getCryptoDecimals(walletApprovalInfos[i].cryptoAsset),
    );
    return allowance?.gte(amount);
  });
  if (!hasEnoughAllowance) {
    return true;
  }

  // otherwise the button should not be disabled
  return false;
}
