import { formatEther } from "ethers/lib/utils";
import { Proposal } from "src/types";
import { fetchSnapshotProposalTitleAndBody } from "src/snapshot";
import { providers } from "ethers";
import { CoreVoting } from "@elementfi/elf-council-typechain";

export async function getProposals(
  provider: providers.JsonRpcProvider,
  coreVotingContract: CoreVoting,
  snapshotIdsByProposalId: Record<string, string>,
  targetsByProposalId: Record<string, string[]>,
  callDatasByProposalId: Record<string, string[]>,
  proposalIdsToSkip: string[] = [],
): Promise<Proposal[]> {
  // Source all on-chain proposals from events
  const onChainProposalCreatedEvents = await coreVotingContract.queryFilter(
    coreVotingContract.filters.ProposalCreated(),
  );

  /* NOTE: 🚨 Forever Hack!
   * Because of how the smart contracts work, proposals have their memory slots
   * cleared once they've been executed. This means we can't guarantee a
   * proposal's state will exist forever. To handle this, once you've scraped a
   * proposal, you can add it to the list of proposals to skip for future runs.
   */
  const newOnChainProposalsEvents = onChainProposalCreatedEvents.filter(
    (event) => {
      const proposalId = event.args.proposalId.toString();
      const isNewProposal = !proposalIdsToSkip.find((p) => p === proposalId);
      return isNewProposal;
    },
  );

  // Contains proposals with AND without a complimentary snapshot
  const newProposalPromises = newOnChainProposalsEvents.map(
    async ({ args: { proposalId: proposalIdBN } }): Promise<Proposal> => {
      const { proposalHash, lastCall, quorum, unlock, created, expiration } =
        await coreVotingContract.functions.proposals(proposalIdBN);

      const createdBlock = await provider.getBlock(created.toNumber());
      const proposalId = proposalIdBN.toString();

      const snapshotId =
        snapshotIdsByProposalId[proposalId] ||
        // Temporary: default to the first one if more proposals exist
        // on-chain than are in the snapshot space,
        "-1";

      // NOTE: this WILL break if the snapshot id is not found.  this is good though, we don't want
      // to add it if the snapshot id is wrong
      let description: string;
      let title: string;
      let targets: string[];
      let calldatas: string[];

      if (snapshotId !== "-1") {
        const { body: snapshotDescription, title: snapshotTitle } =
          await fetchSnapshotProposalTitleAndBody(snapshotId);

        description = snapshotDescription;
        title = snapshotTitle;
        targets = targetsByProposalId[proposalId];
        calldatas = callDatasByProposalId[proposalId];
      } else {
        // Proposals with no snapshot
        description =
          "WARNING: This proposal has not been verified!  It may contain malicious code, please check the forums or Discord for guidance on how to vote on this proposal.";
        title = "UNKNOWN PROPOSAL";
        targets = [""];
        calldatas = [""];
      }

      return {
        proposalId,
        description,
        title,
        proposalHash: proposalHash,
        unlock: unlock.toNumber(),
        lastCall: lastCall.toNumber(),
        created: created.toNumber(),
        createdTimestamp: createdBlock.timestamp,
        expiration: expiration.toNumber(),
        quorum: formatEther(quorum),
        targets,
        calldatas,
        snapshotId,
      };
    },
  );

  return Promise.all(newProposalPromises);
}
