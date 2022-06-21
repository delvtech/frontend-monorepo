import { Provider } from "@ethersproject/abstract-provider";
import { CoreVoting__factory } from "@elementfi/council-typechain";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { CoreVotingContractInfo } from "src/types";

export async function getCoreVotingInfo(
  provider: Provider,
  chainId: number,
  tokenAddress: string,
  name: string,
): Promise<CoreVotingContractInfo | undefined> {
  if (!tokenAddress || tokenAddress === ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for ", name, tokenAddress);
    return;
  }

  const coreVotingContract = CoreVoting__factory.connect(
    tokenAddress,
    provider,
  );

  const baseQuorum = await coreVotingContract.baseQuorum();
  const lockDuration = await coreVotingContract.lockDuration();
  const minProposalPower = await coreVotingContract.minProposalPower();
  const extraVoteTime = await coreVotingContract.extraVoteTime();
  const dayInBlocks = await coreVotingContract.DAY_IN_BLOCKS();

  return {
    chainId,
    address: tokenAddress,
    name,
    decimals: 0,
    symbol: "",
    extensions: {
      dayInBlocks: dayInBlocks.toNumber(),
      baseQuorum: formatEther(baseQuorum),
      lockDuration: lockDuration.toNumber(),
      minProposalPower: formatEther(minProposalPower),
      extraVoteTime: extraVoteTime.toNumber(),
    },
  };
}
