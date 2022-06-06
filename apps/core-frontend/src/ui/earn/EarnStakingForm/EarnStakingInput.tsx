import { ReactElement, useCallback } from "react";

import { BigNumber } from "ethers";

import tw from "efi-tailwindcss-classnames";
import { validateInput } from "ui/base/hooks/useNumericInput/useNumericInput";
import { CryptoSymbol } from "elf/crypto/CryptoSymbol";
import { clipStringValueToDecimals } from "base/math/fixedPoint";
import { calculateLPOutGivenIn } from "elf/pools/calculateLPOutGivenIn";

import { TokenAmountInput } from "ui/token/TokenAmountInput/TokenAmountInput";
import { IconProps } from "ui/token/TokenIcon";

interface EarnStakingInputProps {
  cryptoSymbol: CryptoSymbol;
  cryptoDecimals: number | undefined;
  cryptoAssetIcon: React.FC<IconProps>;
  cryptoBalanceOf: BigNumber | undefined;
  onPreviewUpdate: (otherNeeded: string, lpOut: string | undefined) => void;
  onChange: (inputValue: string) => void;
  labelTopLeft: string | undefined;
  value: string | undefined;
  tokenPoolReserves: string | undefined;
  otherTokenPoolReserves: string | undefined;
  totalSupply: string | undefined;
}

export function EarnStakingInput(props: EarnStakingInputProps): ReactElement {
  const {
    cryptoDecimals,
    cryptoAssetIcon: CryptoAssetIcon,
    cryptoBalanceOf,
    onChange: onChangeFromProps,
    onPreviewUpdate,
    value = "",
    tokenPoolReserves,
    otherTokenPoolReserves,
    totalSupply,
  } = props;

  const onChange = useOnInputChange(
    onChangeFromProps,
    onPreviewUpdate,
    cryptoDecimals,
    tokenPoolReserves,
    otherTokenPoolReserves,
    totalSupply,
  );

  return (
    <TokenAmountInput
      tokenDecimals={cryptoDecimals}
      placeholder={"0.00"}
      maxAmount={cryptoBalanceOf}
      showMaxButton
      onValueChange={onChange}
      value={value}
      leftIcon={
        <CryptoAssetIcon height={20} width={20} className={tw("ml-2")} />
      }
    />
  );
}

function useOnInputChange(
  onChangeFromProps: (inputValue: string) => void,
  onPreviewUpdate: (otherNeeded: string, lpOut: string | undefined) => void,
  cryptoDecimals: number | undefined,
  tokenPoolReserves: string | undefined,
  otherTokenPoolReserves: string | undefined,
  totalSupply: string | undefined,
) {
  return useCallback(
    (value: string) => {
      // allow user to clear input
      if (value === undefined || value === "") {
        onChangeFromProps("");
        onPreviewUpdate("", undefined);
        return;
      }

      // try to get safe value by handling edge cases and clipping decimals
      const safeValue = clipStringValueToDecimals(value, cryptoDecimals || 18);

      // if value is not undefiend, then check if it is valid.  if not, we want to ignore the user's
      // input
      if (!validateInput(safeValue) || safeValue === undefined) {
        return;
      }

      // valid value so ok to set
      onChangeFromProps(safeValue);

      // values may be undefined while loading, prevent calling calcLPOutGivenInFixed
      if (
        !tokenPoolReserves ||
        !otherTokenPoolReserves ||
        !totalSupply ||
        !cryptoDecimals
      ) {
        return;
      }

      const { otherNeeded, lpOut } = calculateLPOutGivenIn(
        safeValue,
        tokenPoolReserves,
        otherTokenPoolReserves,
        totalSupply,
        cryptoDecimals,
      );

      onPreviewUpdate(otherNeeded, lpOut);
    },
    [
      cryptoDecimals,
      onChangeFromProps,
      tokenPoolReserves,
      otherTokenPoolReserves,
      totalSupply,
      onPreviewUpdate,
    ],
  );
}
