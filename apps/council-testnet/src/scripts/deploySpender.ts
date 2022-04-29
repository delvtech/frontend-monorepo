import { BigNumberish } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Spender, Spender__factory } from "@elementfi/elf-council-typechain";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { syncContractWithEthernal } from "src/ethernal/syncContractWithEthernal";

export async function deploySpender(
  hre: HardhatRuntimeEnvironment,
  signer: SignerWithAddress,
  ownerAddress: string,
  spenderAddress: string,
  tokenAddress: string,
  smallSpendLimit: BigNumberish,
  mediumSpendLimit: BigNumberish,
  highSpendLimit: BigNumberish,
): Promise<Spender> {
  const spenderDeployer = new Spender__factory(signer);
  const spenderContract = await spenderDeployer.deploy(
    ownerAddress,
    spenderAddress,
    tokenAddress,
    smallSpendLimit,
    mediumSpendLimit,
    highSpendLimit,
  );

  await syncContractWithEthernal(hre, "Spender", spenderContract.address);

  return spenderContract;
}
