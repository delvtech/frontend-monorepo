import React, { ReactElement } from "react";

import {
  Button,
  Callout,
  Intent,
  Spinner,
  SpinnerSize,
} from "@blueprintjs/core";
import { Signer } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useERC20Approve } from "ui/token/hooks/useERC20Approve";
import { useTokenAllowance } from "ui/token/hooks/useTokenAllowance";
import { ERC20Shim } from "elf/contracts/ERC20Shim";
import {
  CryptoAsset,
  CryptoAssetType,
  findTokenContract,
} from "elf/crypto/CryptoAsset";
import { getCryptoDecimals } from "elf/crypto/getCryptoDecimals";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";

interface WalletApprovalCalloutProps {
  signer: Signer | undefined;
  ownerAddress: string | null | undefined;
  spenderAddress: string | null | undefined;
  cryptoAsset: CryptoAsset;
  amount: string;
  messageRenderer: (assetSymbol: string) => string;
}
export function WalletApprovalCallout({
  ownerAddress,
  spenderAddress,
  signer,
  messageRenderer,
  amount,
  cryptoAsset,
}: WalletApprovalCalloutProps): ReactElement | null {
  const symbol = getCryptoSymbol(cryptoAsset);
  const decimals = getCryptoDecimals(cryptoAsset);
  const message = symbol ? messageRenderer(symbol) : undefined;

  const tokenContract = findTokenContract(cryptoAsset);

  const { data: allowance, isLoading: isAllowanceLoading } = useTokenAllowance(
    tokenContract as ERC20Shim,
    ownerAddress,
    spenderAddress,
  );
  const {
    onApproveClick,
    mutationResult: { isLoading },
  } = useERC20Approve(
    tokenContract as ERC20Shim,
    signer,
    ownerAddress,
    spenderAddress,
  );

  // Ethereum does not need approvals
  if (cryptoAsset?.type === CryptoAssetType.ETHEREUM) {
    return null;
  }

  // If the user isn't connected, there can be no approvals
  if (!ownerAddress) {
    return null;
  }

  // if the approval already exists
  const hasEnoughAllowance = allowance?.gte(parseUnits(amount, decimals));
  if (isAllowanceLoading || hasEnoughAllowance) {
    return null;
  }

  return (
    <Callout
      intent={Intent.WARNING}
      title={t`Wallet approval required`}
      icon={null}
      className={tw("p-4", "space-y-4")}
    >
      <div className={"pt-1"}>{message}</div>
      <Button
        large
        fill
        disabled={isLoading}
        outlined
        intent={Intent.WARNING}
        onClick={onApproveClick}
      >
        {isLoading ? (
          <Spinner size={SpinnerSize.SMALL} intent={Intent.WARNING} />
        ) : (
          t`Approve`
        )}
      </Button>
    </Callout>
  );
}
