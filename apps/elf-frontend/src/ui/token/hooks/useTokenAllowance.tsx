import { ERC20, ERC20Permit } from "@elementfi/core-typechain/dist/libraries";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { useSmartContractReadCalls } from "ui/contracts/useSmartContractReadCalls/useSmartContractReadCalls";
import { ContractMethodArgs } from "elf/contracts/types";
import { BigNumber } from "ethers";
import zip from "lodash.zip";
import { QueryObserverResult } from "react-query";

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
