import { PrincipalTokenInfo, TokenInfo } from "@elementfi/tokenlist";
import { ONE_MINUTE_IN_MILLISECONDS } from "base/time";
import { zapSwapCurveContract } from "elf/zaps/zapSwapCurve/contracts";
import { createZapSwapCurveBuyInputs } from "elf/zaps/zapSwapCurve/createZapSwapCurveInputs";
import { formatUnits } from "ethers/lib/utils";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { useHasZapAllowance } from "./useHasZapAllowance";

export function useSimulateZapSwapCurveBuy(
  principalToken: PrincipalTokenInfo,
  inputToken: TokenInfo,
  account: string | null | undefined,
  amountIn: string,
): string | undefined {
  const hasAllowance = useHasZapAllowance(account, inputToken, amountIn);

  const { info, baseZap, metaZap, value } = createZapSwapCurveBuyInputs(
    principalToken,
    inputToken,
    amountIn,
    account,
  );

  const result = useSmartContractReadCall(zapSwapCurveContract, "zapIn", {
    callArgs: [
      info,
      baseZap,
      metaZap,
      [],
      {
        from: account ? account : undefined,
        value,
      },
    ],
    enabled: hasAllowance && amountIn !== "0" && amountIn !== "",
    staleTime: ONE_MINUTE_IN_MILLISECONDS,
    select: formatUnits,
  });

  return result.data;
}
