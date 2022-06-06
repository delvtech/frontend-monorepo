import { ZapSwapCurve } from "@elementfi/core-typechain/dist/v1.1/ZapSwapCurve";
import { PrincipalTokenInfo, TokenInfo } from "@elementfi/core-tokenlist";
import { zapSwapCurveContract } from "elf/zaps/zapSwapCurve/contracts";
import { createZapSwapCurveBuyInputs } from "elf/zaps/zapSwapCurve/createZapSwapCurveInputs";
import { serializeError } from "eth-rpc-errors";
import { ContractReceipt, Signer } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { useCallback } from "react";
import { UseMutationResult } from "react-query";
import { AppToaster, makeErrorToast } from "ui/toaster/AppToaster/AppToaster";
import { useSmartContractTransactionPersisted } from "ui/transactions/useSmartContractTransactionPersisted/useSmartContractTransactionPersisted";
import { useSimulateZapSwapCurveBuy } from "ui/zaps/zapSwapCurve/useSimulateZapSwapCurveBuy";

export function useZapIn(
  account: string | null | undefined,
  signer: Signer | undefined,
  principalToken: PrincipalTokenInfo,
  inputToken: TokenInfo,
  amountIn: string,
  onTransactionSubmitted?: () => void,
): {
  amountOut: string | undefined;
  canZap: boolean;
  zap: () => void;
  mutationResult: UseMutationResult<
    ContractReceipt | undefined,
    unknown,
    Parameters<ZapSwapCurve["zapIn"]>
  >;
} {
  const amountOut = useSimulateZapSwapCurveBuy(
    principalToken,
    inputToken,
    account,
    amountIn,
  );

  const mutationResult = useSmartContractTransactionPersisted(
    zapSwapCurveContract,
    "zapIn",
    signer,
    {
      onTransactionSubmitted: () => {
        onTransactionSubmitted?.();
      },
      onError: (error) => {
        const serializedError = serializeError(error);
        AppToaster?.show(makeErrorToast(serializedError.message));
      },
    },
  );

  const { mutate: zap } = mutationResult;

  const canZap = !!amountOut && !!account;

  const minAmountOut = parseUnits(
    (+(amountOut ?? "0") - +(amountOut ?? "0") * 0.01).toString(),
  );

  const onZap = useCallback(() => {
    if (canZap) {
      const { info, baseZap, metaZap, value } = createZapSwapCurveBuyInputs(
        principalToken,
        inputToken,
        amountIn,
        account!,
        minAmountOut.toString(),
      );
      zap([
        info,
        baseZap,
        metaZap,
        [],
        {
          value,
        },
      ]);
    }
  }, [
    zap,
    amountIn,
    account,
    canZap,
    inputToken,
    principalToken,
    minAmountOut,
  ]);

  return {
    zap: onZap,
    mutationResult,
    canZap,
    amountOut,
  };
}
