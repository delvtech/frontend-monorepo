import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { formatEther } from "ethers/lib/utils";
import { lockingVaultContract } from "src/elf/contracts";

export function useDeposited(
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

  const [, depositBN] = depositInfo || [];

  return depositBN && formatEther(depositBN || 0);
}
