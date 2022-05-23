import { Query } from "react-query";

import { Contract } from "ethers";
import isEqual from "lodash.isequal";

import { makeSmartContractReadCallQueryKey } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { ContractMethodName } from "elf/contracts/types";

/**
 * Utility for matching smart contract read call queries when busting the cache.
 */
export function matchSmartContractReadCallQuery<
  TContract extends Contract,
  TMethodName extends ContractMethodName<TContract>,
>(
  query: Query,
  contractAddress: string | undefined,
  methodName: TMethodName,
  callArgs: Parameters<TContract["functions"][TMethodName]> | undefined,
): boolean {
  const match = isEqual(
    query.queryKey,
    makeSmartContractReadCallQueryKey(contractAddress, methodName, callArgs),
  );
  return match;
}
