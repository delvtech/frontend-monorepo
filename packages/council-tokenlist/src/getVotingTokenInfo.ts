import { Provider } from "@ethersproject/abstract-provider";
import { TokenInfo } from "@uniswap/token-lists";
import { ERC20Permit__factory } from "@elementfi/council-typechain";
import { ethers } from "ethers";

export async function getVotingTokenInfo(
  provider: Provider,
  chainId: number,
  tokenAddress: string,
): Promise<TokenInfo | undefined> {
  if (!tokenAddress || tokenAddress === ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for Voting Token", tokenAddress);
    return;
  }

  const tokenContract = ERC20Permit__factory.connect(tokenAddress, provider);

  const name = await tokenContract.name();
  const symbol = await tokenContract.symbol();
  const decimals = await tokenContract.decimals();

  return {
    chainId,
    address: tokenAddress,
    symbol,
    decimals,
    name,
  };
}
