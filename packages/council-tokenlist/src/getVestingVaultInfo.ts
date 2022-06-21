import { Provider } from "@ethersproject/abstract-provider";
import { VestingVault__factory } from "@elementfi/council-typechain";

import { VestingVaultInfo } from "./types";

export async function getVestingVaultInfo(
  provider: Provider,
  chainId: number,
  tokenAddress: string,
  name: string,
): Promise<VestingVaultInfo> {
  const vestingVaultContract = VestingVault__factory.connect(
    tokenAddress,
    provider,
  );

  const tokenPromise = vestingVaultContract.token();
  const staleBlockLagPromise = vestingVaultContract.staleBlockLag();

  const [token, staleBlockLag] = await Promise.all([
    tokenPromise,
    staleBlockLagPromise,
  ]);

  return {
    chainId,
    address: tokenAddress,
    name,
    decimals: 0,
    symbol: "",
    extensions: {
      token,
      staleBlockLag: staleBlockLag.toNumber(),
    },
  };
}
