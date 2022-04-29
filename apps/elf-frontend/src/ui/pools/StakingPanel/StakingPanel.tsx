import { Fragment, ReactElement } from "react";

import { Button, Callout, Intent } from "@blueprintjs/core";
import { Web3Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { StakingForm } from "ui/pools/StakingForm/StakingForm";
import { StakingInput } from "ui/pools/StakingInput/StakingInput";
import { useCanPerformPool } from "ui/pools/hooks/usePoolCanPerform/usePoolCanPerform";
import { PoolInfo } from "elf/pools/PoolInfo";

interface StakingPanelProps {
  library: Web3Provider | undefined;
  signer: Signer | undefined;
  account: string | null | undefined;
  poolInfo: PoolInfo;
  formDisabled?: boolean;
  submitDisabled?: boolean;
  buttonLabel: string;
  buttonIntent?: Intent;
}

export function StakingPanel(props: StakingPanelProps): ReactElement {
  const {
    account,
    library,
    signer,
    buttonLabel,
    formDisabled = false,
    submitDisabled = false,
    poolInfo,
  } = props;
  const { address: poolAddress } = poolInfo;
  const canPerformAddLiquidity = useCanPerformPool(poolAddress, "addLiquidity");
  return (
    <div
      className={tw(
        "flex",
        "flex-col",
        "justify-between",
        "py-2",
        "h-full",
        "space-y-2",
      )}
    >
      <StakingForm
        library={library}
        signer={signer}
        account={account}
        poolInfo={poolInfo}
        buttonLabel={buttonLabel}
        formDisabled={formDisabled}
        submitDisabled={submitDisabled}
        buttonIntent={Intent.PRIMARY}
      >
        {(inputProps) => {
          const {
            termAssetInputProps,
            baseAssetInputProps,
            submitButtonProps,
          } = inputProps;

          return (
            <Fragment>
              <StakingInput
                cryptoSymbol={termAssetInputProps.cryptoSymbol}
                cryptoDecimals={termAssetInputProps.cryptoDecimals}
                cryptoAssetIcon={undefined}
                cryptoBalanceOf={termAssetInputProps.cryptoBalanceOf}
                cryptoDisplayBalance={termAssetInputProps.cryptoDisplayBalance}
                disabled={termAssetInputProps.disabled}
                onChange={termAssetInputProps.onChange}
                onPreviewUpdate={termAssetInputProps.onPreviewUpdate}
                labelTopLeft={termAssetInputProps.labelTopLeft}
                value={termAssetInputProps.value}
                validValue={termAssetInputProps.validValue}
                tokenPoolReserves={termAssetInputProps.tokenPoolReserves}
                otherTokenPoolReserves={
                  termAssetInputProps.otherTokenPoolReserves
                }
                totalSupply={termAssetInputProps.totalSupply}
              />
              <StakingInput
                cryptoSymbol={baseAssetInputProps.cryptoSymbol}
                cryptoDecimals={baseAssetInputProps.cryptoDecimals}
                cryptoAssetIcon={baseAssetInputProps.cryptoAssetIcon}
                cryptoBalanceOf={baseAssetInputProps.cryptoBalanceOf}
                cryptoDisplayBalance={baseAssetInputProps.cryptoDisplayBalance}
                disabled={baseAssetInputProps.disabled}
                onChange={baseAssetInputProps.onChange}
                onPreviewUpdate={baseAssetInputProps.onPreviewUpdate}
                labelTopLeft={baseAssetInputProps.labelTopLeft}
                value={baseAssetInputProps.value}
                validValue={baseAssetInputProps.validValue}
                tokenPoolReserves={baseAssetInputProps.tokenPoolReserves}
                otherTokenPoolReserves={
                  baseAssetInputProps.otherTokenPoolReserves
                }
                totalSupply={baseAssetInputProps.totalSupply}
              />
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
    </div>
  );
}
