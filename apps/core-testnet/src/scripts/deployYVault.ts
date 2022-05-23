import { Signer } from "ethers";
import { TestYVault } from "src/types";

import { TestYVault__factory } from "src/types/factories/TestYVault__factory";

// TODO: update TestYVault to accept name/symbol
export async function deployYearnVault(
  signer: Signer,
  baseAssetAddress: string,
  decimals: number,
  name: string,
  symbol: string,
): Promise<TestYVault> {
  const deployer = new TestYVault__factory(signer);
  return deployer.deploy(baseAssetAddress, decimals);
}
