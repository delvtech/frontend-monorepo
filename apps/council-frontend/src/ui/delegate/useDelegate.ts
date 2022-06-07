import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { ethers } from "ethers";
import { lockingVaultContract } from "src/contracts";

export function useDelegate(
  address: string | undefined | null,
): string | undefined {
  const { data: depositInfo } = useSmartContractReadCall(
    lockingVaultContract,
    "deposits",
    {
      callArgs: [address as string],
      enabled: !!address,
    },
  );

  const [delegate] = depositInfo || [];

  return delegate === ethers.constants.AddressZero ? undefined : delegate;
}
