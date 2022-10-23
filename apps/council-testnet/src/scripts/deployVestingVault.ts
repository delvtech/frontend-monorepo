import { SimpleProxy__factory } from "./../../../../packages/peripherals/typechain/factories/SimpleProxy__factory";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {
  SimpleProxy,
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

  const simpleProxyDeployer = new SimpleProxy__factory(signer);
  const simpleProxy = (await simpleProxyDeployer.deploy(
    timelockAddress, // governance
    vestingVaultContract.address,
  )) as unknown as SimpleProxy & VestingVault;

  await syncContractWithEthernal(hre, "SimpleProxy", simpleProxy.address);

  const vestingVault = VestingVault__factory.connect(
    simpleProxy.address,
    signer,
  );
  await vestingVault.initialize(signer.address, signer.address);
  console.log("vestingVault", vestingVault.address);

  return vestingVault;
}
