import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MockERC20, MockERC20__factory } from "@elementfi/council-typechain";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { syncContractWithEthernal } from "src/ethernal/syncContractWithEthernal";

export async function deployVotingToken(
  hre: HardhatRuntimeEnvironment,
  signer: SignerWithAddress,
): Promise<MockERC20> {
  const tokenDeployer = new MockERC20__factory(signer);
  const tokenContract = await tokenDeployer.deploy(
    "Element Governance Token",
    "ELFI",
    signer.address,
  );
  await syncContractWithEthernal(hre, "MockERC20", tokenContract.address);

  return tokenContract;
}
