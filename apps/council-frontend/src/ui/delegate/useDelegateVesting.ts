import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { ethers } from "ethers";
import { vestingContract } from "src/contracts";

export function useDelegateVesting(
  address: string | undefined | null,
): string | undefined {
  const { data: grantInfo } = useSmartContractReadCall(
    vestingContract,
    "getGrant",
    {
      callArgs: [address as string],
      enabled: !!address,
    },
  );

  const delegate = grantInfo?.delegatee;
  return delegate === ethers.constants.AddressZero ? undefined : delegate;
}
