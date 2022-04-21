import { ElfNFT__factory } from "contracts";
import { ethers } from "ethers";
import { getAddresses } from "src/addresses";
import { getBlockFrom } from "src/blocks";
import { getProvider } from "src/providers";

// This function should be used within NextJs getStaticProps with a TTL to cache this result
export async function getCurrentMintCount(): Promise<number> {
  const provider = getProvider();
  const address = getAddresses();

  const NFT = ElfNFT__factory.connect(address.tokenContract, provider);

  const transferFilter = NFT.filters.Transfer(
    ethers.constants.AddressZero,
    null,
    null,
  );

  const transferEvents = await NFT.queryFilter(transferFilter, getBlockFrom());

  return transferEvents.length;
}
