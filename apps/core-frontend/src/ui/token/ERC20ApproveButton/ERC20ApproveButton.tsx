import { Button, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { useERC20Approve } from "ui/token/hooks/useERC20Approve";
import { useTokenAllowance } from "ui/token/hooks/useTokenAllowance";
import { BigNumber, Signer } from "ethers";
import React, { FC } from "react";
import { t } from "ttag";

interface ERC20ApproveButtonProps {
  owner: string | null | undefined;
  spender: string | null | undefined;
  contract: ERC20 | undefined;
  approvalAmount: BigNumber | undefined;

  /**
   * If provided this will be used as the token symbol. This is useful for
   * avoiding large tranche symbols from breaking layout.
   */
  tokenSymbol?: string;
  signer: Signer | undefined;
  className?: string;
}
export const ERC20ApproveButton: FC<ERC20ApproveButtonProps> = ({
  owner,
  spender,
  contract,
  approvalAmount,
  tokenSymbol: tokenSymbolFromProps,
  signer,
  className,
}) => {
  const { data: symbol } = useSmartContractReadCall(contract, "symbol");
  const assetSymbol = tokenSymbolFromProps || symbol;
  const { data: allowance } = useTokenAllowance(contract, owner, spender);

  const { onApproveClick } = useERC20Approve(contract, signer, owner, spender);

  const hasApproval = !!approvalAmount && allowance?.gte(approvalAmount);

  return (
    <Button
      fill
      large
      outlined
      className={className}
      icon={hasApproval ? IconNames.TICK : null}
      disabled={hasApproval}
      intent={hasApproval ? Intent.SUCCESS : Intent.WARNING}
      onClick={onApproveClick}
    >
      {hasApproval ? t`${assetSymbol} approved` : t`Approve ${assetSymbol}`}
    </Button>
  );
};
