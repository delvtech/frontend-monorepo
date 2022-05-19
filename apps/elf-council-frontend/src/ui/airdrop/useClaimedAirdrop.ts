import { Airdrop } from "@elementfi/elf-council-typechain";
import { useSmartContractReadCall } from "@elementfi/react-query-typechain/src/hooks/useSmartContractReadCall/useSmartContractReadCall";
import { ContractMethodName } from "@elementfi/react-query-typechain/src/types";

import { formatEther } from "@ethersproject/units";
import { BigNumber } from "ethers";
import { airdropContract } from "src/elf/contracts";

export function useClaimedAirdrop(address: string | undefined | null): string {
  const { data: claimedBN } = useSmartContractReadCall(
    airdropContract,
    "claimed",
    {
      callArgs: [address as string],
      enabled: !!address,
    },
  );

  return formatEther(claimedBN || 0);
}
