import { Fragment, ReactElement } from "react";
import { Button, Callout, Intent } from "@blueprintjs/core";
import { Web3Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { t } from "ttag";
import { StakingForm } from "ui/pools/StakingForm/StakingForm";
import { useCanPerformPool } from "ui/pools/hooks/usePoolCanPerform/usePoolCanPerform";
import { PoolInfo } from "elf/pools/PoolInfo";
import { EarnStakingInput } from "./EarnStakingInput";
import tw from "efi-tailwindcss-classnames";

interface StakePrincipalTokenFormProps {
  library: Web3Provider | undefined;
  signer: Signer | undefined;
  account: string | null | undefined;
  poolInfo: PoolInfo;
  formDisabled?: boolean;
  submitDisabled?: boolean;
}
export function StakePrincipalTokenForm(
  props: StakePrincipalTokenFormProps,
): ReactElement {
  const { library, signer, account, poolInfo, formDisabled, submitDisabled } =
    props;
  const canPerformAddLiquidity = useCanPerformPool(
    poolInfo.address,
    "addLiquidity",
  );
  return (
    <StakingForm
      library={library}
      signer={signer}
      account={account}
      poolInfo={poolInfo}
      buttonLabel={t`Add liquidity`}
      formDisabled={formDisabled}
      submitDisabled={submitDisabled}
      buttonIntent={Intent.PRIMARY}
    >
      {(inputProps) => {
        const { termAssetInputProps, baseAssetInputProps, submitButtonProps } =
          inputProps;
        return (
          <Fragment>
            <div className={tw("flex", "flex-col", "space-y-1")}>
              <EarnStakingInput
                cryptoSymbol={termAssetInputProps.cryptoSymbol}
                cryptoDecimals={termAssetInputProps.cryptoDecimals}
                cryptoAssetIcon={termAssetInputProps.cryptoAssetIcon}
                cryptoBalanceOf={termAssetInputProps.cryptoBalanceOf}
                onChange={termAssetInputProps.onChange}
                onPreviewUpdate={termAssetInputProps.onPreviewUpdate}
                labelTopLeft={termAssetInputProps.labelTopLeft}
                value={termAssetInputProps.value}
                tokenPoolReserves={termAssetInputProps.tokenPoolReserves}
                otherTokenPoolReserves={
                  termAssetInputProps.otherTokenPoolReserves
                }
                totalSupply={termAssetInputProps.totalSupply}
              />
              <span
                className={tw("text-right")}
              >{t`Available balance: ${termAssetInputProps.cryptoDisplayBalance}`}</span>
            </div>
            <div className={tw("flex", "flex-col", "space-y-1")}>
              <EarnStakingInput
                cryptoSymbol={baseAssetInputProps.cryptoSymbol}
                cryptoDecimals={baseAssetInputProps.cryptoDecimals}
                cryptoAssetIcon={baseAssetInputProps.cryptoAssetIcon}
                cryptoBalanceOf={baseAssetInputProps.cryptoBalanceOf}
                onChange={baseAssetInputProps.onChange}
                onPreviewUpdate={baseAssetInputProps.onPreviewUpdate}
                labelTopLeft={baseAssetInputProps.labelTopLeft}
                value={baseAssetInputProps.value}
                tokenPoolReserves={baseAssetInputProps.tokenPoolReserves}
                otherTokenPoolReserves={
                  baseAssetInputProps.otherTokenPoolReserves
                }
                totalSupply={baseAssetInputProps.totalSupply}
              />
              <span
                className={tw("text-right")}
              >{t`Available balance: ${baseAssetInputProps.cryptoDisplayBalance}`}</span>
            </div>
            <Button
              disabled={submitButtonProps.disabled || !canPerformAddLiquidity}
              onClick={submitButtonProps.onClick}
              minimal
              outlined
              large
              intent={
                submitButtonProps.error || !canPerformAddLiquidity
                  ? Intent.DANGER
                  : Intent.PRIMARY
              }
            >
              {submitButtonProps.label}
            </Button>
            {!canPerformAddLiquidity ? (
              <Callout intent={Intent.DANGER}>
                {t`Adding liquidity for this pool has been temporarily disabled, please refer to our Discord or Twitter for further updates.`}
              </Callout>
            ) : null}
          </Fragment>
        );
      }}
    </StakingForm>
  );
}
