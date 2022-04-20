import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { ElfNFT__factory } from "contracts";
import { BigNumber } from "ethers";
import { QueryObserverResult } from "react-query";
import { getAddresses } from "src/addresses";
import { getProvider } from "src/providers";

export function useOwnerOf(
  tokenId: BigNumber | undefined,
): QueryObserverResult<string, unknown> {
  const addresses = getAddresses();
  const provider = getProvider();

  const tokenContract = ElfNFT__factory.connect(
    addresses.tokenContract,
    provider,
  );

  return useSmartContractReadCall(tokenContract, "ownerOf", {
    callArgs: [tokenId as BigNumber],
    enabled: !!tokenId,
  });
}
