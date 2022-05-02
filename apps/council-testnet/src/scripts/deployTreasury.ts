import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Treasury, Treasury__factory } from "@elementfi/elf-council-typechain";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { syncContractWithEthernal } from "src/ethernal/syncContractWithEthernal";

export async function deployTreasury(
  hre: HardhatRuntimeEnvironment,
  signer: SignerWithAddress,
  timeLockAddress: string,
): Promise<Treasury> {
  const treasuryDeployer = new Treasury__factory(signer);
  const treasuryContract = await treasuryDeployer.deploy(timeLockAddress);

  await syncContractWithEthernal(hre, "Treasury", treasuryContract.address);

  return treasuryContract;
}
