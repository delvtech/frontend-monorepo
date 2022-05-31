import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  VestingVault,
  VestingVault__factory,
} from "@elementfi/council-typechain";
import { BigNumberish } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { syncContractWithEthernal } from "src/ethernal/syncContractWithEthernal";

export async function deployVestingVault(
  hre: HardhatRuntimeEnvironment,
  signer: SignerWithAddress,
  tokenAddress: string,
  timelockAddress: string,
  staleBlockLag: BigNumberish,
): Promise<VestingVault> {
  const vestingVaultDeployer = new VestingVault__factory(signer);
  const vestingVaultContract = await vestingVaultDeployer.deploy(
    tokenAddress,
    staleBlockLag,
  );

  await syncContractWithEthernal(
    hre,
    "VestingVault",
    vestingVaultContract.address,
  );

  await vestingVaultContract.initialize(signer.address, signer.address);

  return vestingVaultContract;
}
