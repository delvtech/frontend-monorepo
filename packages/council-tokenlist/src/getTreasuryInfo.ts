import { Provider } from "@ethersproject/abstract-provider";
import { Treasury__factory } from "elf-council-typechain";
import { ethers } from "ethers";
import { TreasuryInfo } from "src/types";

export async function getTreasuryInfo(
  provider: Provider,
  chainId: number,
  tokenAddress: string,
  name: string,
): Promise<TreasuryInfo | undefined> {
  if (!tokenAddress || tokenAddress === ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for ", name, tokenAddress);
    return;
  }

  const treasuryContract = Treasury__factory.connect(tokenAddress, provider);

  const owner = await treasuryContract.owner();

  return {
    chainId,
    address: tokenAddress,
    name,
    decimals: 0,
    symbol: "",
    extensions: {
      owner,
    },
  };
}
