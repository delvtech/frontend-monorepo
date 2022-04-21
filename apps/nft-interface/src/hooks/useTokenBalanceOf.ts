import { useSmartContractReadCall } from "@elementfi/react-query-typechain";
import { ElfNFT__factory } from "contracts";
import { BigNumber } from "ethers";
import { QueryObserverResult } from "react-query";
import { getAddresses } from "src/addresses";
import { getProvider } from "src/providers";
import { NullableAddress } from "src/types";

export function useTokenBalanceOf(
  address: NullableAddress,
): QueryObserverResult<BigNumber, unknown> {
  const addresses = getAddresses();
  const provider = getProvider();

  const tokenContract = ElfNFT__factory.connect(
    addresses.tokenContract,
    provider,
  );

  return useSmartContractReadCall(tokenContract, "balanceOf", {
    callArgs: [address as string],
    enabled: !!address,
  });
}
