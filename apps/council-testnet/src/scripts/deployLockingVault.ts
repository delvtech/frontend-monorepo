import {
  LockingVault__factory,
  SimpleProxy,
  SimpleProxy__factory,
} from "@elementfi/elf-council-typechain";
import { BigNumberish, Signer } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { syncContractWithEthernal } from "src/ethernal/syncContractWithEthernal";

export async function deployLockingVault(
  hre: HardhatRuntimeEnvironment,
  signer: Signer,
  tokenAddress: string,
  timeLockAddress: string,
  staleBlockLag: BigNumberish,
): Promise<SimpleProxy> {
  const lockingVaultDeployer = new LockingVault__factory(signer);
  const lockingVaultBaseContract = await lockingVaultDeployer.deploy(
    tokenAddress,
    staleBlockLag,
  );
  console.log("deployed locking vault base");

  const proxyDeployer = new SimpleProxy__factory(signer);
  console.log("deployed proxy vault");
  const lockingVaultProxy = await proxyDeployer.deploy(
    timeLockAddress,
    lockingVaultBaseContract.address,
  );

  console.log("deployed locking vault proxy");
  const lockingVaultContract = lockingVaultProxy.attach(
    lockingVaultProxy.address,
  );

  await syncContractWithEthernal(
    hre,
    "LockingVault",
    lockingVaultContract.address,
  );

  return lockingVaultContract;
}
