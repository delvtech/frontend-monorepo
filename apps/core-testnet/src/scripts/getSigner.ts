import { Signer } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";

export enum SIGNER {
  ELEMENT,
  USER,
  BALANCER,

  TRADER1,
  TRADER2,

  WETH,
  USDC,
  DAI,
  CRVLUSD,
  TRADER3 = 19,
}

export async function getSigner(
  signer: SIGNER,
  hre: HardhatRuntimeEnvironment,
): Promise<Signer> {
  const signers = await hre.ethers.getSigners();
  return signers[signer];
}
