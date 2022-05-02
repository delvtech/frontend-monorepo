import { Provider } from "@ethersproject/providers";
import zip from "lodash.zip";
import { ReactElement, useMemo } from "react";
import { QueryObserverResult, useQuery } from "react-query";
import { gscCoreVotingContract, gscVaultContract } from "src/elf/contracts";
import { useGSCMembers } from "src/ui/gsc/useGSCMembers";
import { Ballot } from "src/ui/voting/Ballot";
import { t } from "ttag";
import { GSCMember } from "./GSCMember";

// keeping dead code so i can test UI
// const forList = [
//   ethers.Wallet.createRandom().address,
//   ethers.Wallet.createRandom().address,
//   ethers.Wallet.createRandom().address,
//   ethers.Wallet.createRandom().address,
// ];
// const againstList = [ethers.Wallet.createRandom().address];
// const abstainList = [ethers.Wallet.createRandom().address];
// const noVoteList = [
//   ethers.Wallet.createRandom().address,
//   ethers.Wallet.createRandom().address,
//   ethers.Wallet.createRandom().address,
//   ethers.Wallet.createRandom().address,
//   ethers.Wallet.createRandom().address,
//   ethers.Wallet.createRandom().address,
//   ethers.Wallet.createRandom().address,
//   ethers.Wallet.createRandom().address,
//   ethers.Wallet.createRandom().address,
//   ethers.Wallet.createRandom().address,
// ];

interface GSCVoteTallysProps {
  provider: Provider;
  proposalId: string;
}

export function GSCVoteTallys(props: GSCVoteTallysProps): ReactElement {
  const { provider, proposalId } = props;
  const { data: members = [] } = useGSCMembers();
  const memberAddresses = members.map(({ address }) => address);
  const { data: votesByMember = {} } = useGSCVotesByMemberForProposal(
    memberAddresses,
    proposalId,
  );
  const tallys = useVoteTallys(memberAddresses, votesByMember);
  const { forList, againstList, abstainList, noVoteList } = tallys;
  return (
    <div className="text-white">
      <h3 className="mt-4 mb-2">{t`For (4):`}</h3>
      <div className="grid w-full grid-cols-2 justify-between gap-1 lg:grid-cols-3">
        {forList.map((address) => (
          <GSCMember account={address} provider={provider} key={address} />
        ))}
      </div>
      <h3 className="mt-4 mb-2">{t`Against (1):`}</h3>
      <div className="grid w-full grid-cols-2 justify-between gap-1 lg:grid-cols-3">
        {againstList.map((address) => (
          <GSCMember account={address} provider={provider} key={address} />
        ))}
      </div>
      <h3 className="mt-4 mb-2">{t`Abstain (1):`}</h3>
      <div className="grid w-full grid-cols-2 justify-between gap-1 lg:grid-cols-3">
        {abstainList.map((address) => (
          <GSCMember account={address} provider={provider} key={address} />
        ))}
      </div>
      <h3 className="mt-4 mb-2">{t`No vote (10):`}</h3>
      <div className="grid w-full grid-cols-2 justify-between gap-1 lg:grid-cols-3">
        {noVoteList.map((address) => (
          <GSCMember account={address} provider={provider} key={address} />
        ))}
      </div>
    </div>
  );
}

export default GSCVoteTallys;

function useGSCVotesByMemberForProposal(
  members: string[],
  proposalId: string,
): QueryObserverResult<Record<string, Ballot>> {
  return useQuery({
    queryFn: async () => {
      const results = await Promise.all(
        members.map((member) =>
          gscCoreVotingContract.votes(member, proposalId),
        ),
      );

      // if there is no entry found, the smart contract will return:
      // {
      //   votePower: 0, ballot: 0,
      // }
      // for the gsc, the vote power for each member is either 0 or 1, so setting the ballot to
      // undefined indicates there was no ballot found, i.e. the member didn't vote on this
      // proposal.
      // voting power can also be zero if the member is still in idle mode.  need to make sure they
      // have voting power before we allow them to vote!
      const ballots = results.map(([votingPower, ballot]) =>
        votingPower.isZero() ? undefined : ballot,
      );
      const entries = zip(members, ballots) as [string, Ballot | undefined][];
      const ballotsByMember = Object.fromEntries(entries);
      return ballotsByMember;
    },
    queryKey: ["gsc-member-votes", proposalId, members],
  });
}

function useVoteTallys(
  members: string[],
  votesByMember: Record<string, Ballot | undefined>,
) {
  return useMemo(() => {
    const forList: string[] = [];
    const againstList: string[] = [];
    const abstainList: string[] = [];
    const noVoteList: string[] = [];

    members.forEach((member) => {
      const ballot = votesByMember[member];
      if (ballot === undefined) {
        noVoteList.push(member);
      }
      if (ballot === Ballot.YES) {
        forList.push(member);
      }
      if (ballot === Ballot.NO) {
        againstList.push(member);
      }
      if (ballot === Ballot.MAYBE) {
        abstainList.push(member);
      }
    });

    return { forList, againstList, abstainList, noVoteList };
  }, [members, votesByMember]);
}
