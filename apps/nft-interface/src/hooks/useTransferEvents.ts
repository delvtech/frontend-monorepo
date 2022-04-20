import {
  useSmartContractEvents,
  UseSmartContractEventsCallOptions,
} from "@elementfi/react-query-typechain";
import { ElfNFT, ElfNFT__factory } from "contracts";
import { BigNumber, Event } from "ethers";
import { QueryObserverResult } from "react-query";
import { getAddresses } from "src/addresses";
import { getBlockFrom } from "src/blocks";
import { getProvider } from "src/providers";
import { NullableAddress } from "src/types";

export function useTransferEvents(
  from?: NullableAddress,
  to?: NullableAddress,
  tokenId?: BigNumber,
  options?: UseSmartContractEventsCallOptions<ElfNFT, "Transfer">,
): QueryObserverResult<Event[], unknown> {
  const address = getAddresses();
  const provider = getProvider();

  const NFT = ElfNFT__factory.connect(address.tokenContract, provider);

  return useSmartContractEvents(NFT, "Transfer", {
    callArgs: [from, to, tokenId],
    enabled: !!from || !!to || !!tokenId,
    fromBlock: getBlockFrom(),
    ...options,
  });
}
