import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Airdrop, Airdrop__factory } from "@elementfi/council-typechain";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import MerkleTree from "merkletreejs";
import { syncContractWithEthernal } from "src/ethernal/syncContractWithEthernal";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export async function deployAirdrop(
  hre: HardhatRuntimeEnvironment,
  signer: SignerWithAddress,
  elementTokenAddress: string,
  coreVotingAddress: string,
  merkleTree: MerkleTree,
  lockingVaultAddress: string,
): Promise<Airdrop> {
  const airdropDeployer = new Airdrop__factory(signer);
  const nowInSeconds = Math.round(Date.now() / 1000);
  const airdropContract = await airdropDeployer.deploy(
    coreVotingAddress,
    merkleTree.getHexRoot(),
    elementTokenAddress,
    nowInSeconds + ONE_YEAR_IN_SECONDS,
    lockingVaultAddress,
  );

  await syncContractWithEthernal(hre, "Airdrop", airdropContract.address);

  return airdropContract;
}
