import { InterestToken, Tranche } from "@elementfi/core-typechain/dist/v1";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { useSmartContractReadCalls } from "ui/contracts/useSmartContractReadCalls/useSmartContractReadCalls";
import { ContractMethodArgs } from "elf/contracts/types";
import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import zip from "lodash.zip";
import { QueryObserverResult } from "react-query";
import { ERC20, ERC20Permit } from "@elementfi/core-typechain/dist/libraries";

export function useTokenAllowance(
  contract: ERC20 | ERC20Permit | undefined,
  owner: string | null | undefined,
  spender: string | null | undefined,
): QueryObserverResult<BigNumber> {
  return useSmartContractReadCall(contract, "allowance", {
    enabled: !!owner && !!spender,
    callArgs: [owner as string, spender as string],
  });
}
export function useTokenAllowanceMulti(
  contracts: (ERC20 | undefined)[],
  owners: (string | null | undefined)[],
  spenders: (string | null | undefined)[],
): QueryObserverResult<BigNumber>[] {
  const callArgs = zip(owners, spenders).map(([owner, spender]) => {
    return {
      enabled: !!owner && !!spender,
      callArgs: [owner as string, spender as string] as ContractMethodArgs<
        ERC20,
        "allowance"
      >,
    };
  });

  return useSmartContractReadCalls(contracts, "allowance", callArgs);
}

export function useTokenApprovedForAmount(
  ownerAddress: string | null | undefined,
  spenderAddress: string,
  tokenContract: ERC20 | ERC20Permit | Tranche | InterestToken | undefined,
  tokenDecimals: number,
  amount: string,
): boolean {
  // safe to cast callArgs since we don't enable the call unless they are defnied
  const callArgs: ContractMethodArgs<ERC20, "allowance"> = [
    ownerAddress as string,
    spenderAddress as string,
  ];

  const { data: allowance } = useSmartContractReadCall(
    tokenContract,
    "allowance",
    {
      callArgs,
      enabled: !!ownerAddress,
    },
  );

  const approved =
    amount && allowance
      ? allowance.gte(parseUnits(amount || "0", tokenDecimals))
      : false;
  return approved;
}
