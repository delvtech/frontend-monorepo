import { Provider } from "@ethersproject/abstract-provider";
import { Airdrop__factory } from "@elementfi/council-typechain";
import { ethers } from "ethers";
import { AirdropContractInfo } from "src/types";

export async function getAirdropInfo(
  provider: Provider,
  chainId: number,
  tokenAddress: string,
  name: string,
): Promise<AirdropContractInfo | undefined> {
  if (!tokenAddress || tokenAddress === ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for ", name, tokenAddress);
    return;
  }
  const airdropContract = Airdrop__factory.connect(tokenAddress, provider);

  const rewardsRootPromise = airdropContract.rewardsRoot();
  const lockingVaultPromise = airdropContract.lockingVault();
  const expirationPromise = airdropContract.expiration();
  const tokenPromise = airdropContract.token();

  const [rewardsRoot, lockingVault, expiration, token] = await Promise.all([
    rewardsRootPromise,
    lockingVaultPromise,
    expirationPromise,
    tokenPromise,
  ]);

  return {
    chainId,
    address: tokenAddress,
    name,
    decimals: 0,
    symbol: "",
    extensions: {
      rewardsRoot,
      lockingVault,
      expiration: expiration.toString(),
      token,
    },
  };
}
