import { ReactElement, useMemo } from "react";
import { QueryObserverResult, useQuery } from "react-query";

import { Provider } from "@ethersproject/providers";
import zip from "lodash.zip";
import { msgid, ngettext, t } from "ttag";

import { gscCoreVotingContract } from "src/elf/contracts";
import { useGSCMembers } from "src/ui/gsc/useGSCMembers";
import { Ballot } from "src/ui/voting/Ballot";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";
import { formatWalletAddress } from "src/base/formatWalletAddress";
import { useResolvedEnsName } from "src/ui/ethereum/useResolvedEnsName";
import { isValidAddress } from "src/base/isValidAddress";

// keeping dead code so i can test UI
// const votes = [
// ethers.Wallet.createRandom().address,
// ethers.Wallet.createRandom().address,
// ethers.Wallet.createRandom().address,
// ethers.Wallet.createRandom().address,
// ethers.Wallet.createRandom().address,
// ethers.Wallet.createRandom().address,
// ethers.Wallet.createRandom().address,
// ethers.Wallet.createRandom().address,
// ];

interface GSCVoteTallysProps {
  provider: Provider;
  proposalId: string;
}

export function GSCVoteTallys(props: GSCVoteTallysProps): ReactElement {
  const { proposalId } = props;
  const { data: members = [] } = useGSCMembers();
  const memberAddresses = members.map(({ address }) => address);
  const { data: votesByMember = {} } = useGSCVotesByMemberForProposal(
    memberAddresses,
    proposalId,
  );
  const tallys = useVoteTallys(memberAddresses, votesByMember);
  const { forList, againstList, abstainList } = tallys;
  const allVotes = [...forList, ...againstList, ...abstainList];

  const firstThreeVotes = allVotes.slice(0, 3);
  const remainingVotes = allVotes.slice(3);

  return (
    <div className="items-middle flex text-white">
      <div className="flex flex-row-reverse justify-end">
        {firstThreeVotes.map((account) => (
          <WalletJazzicon
            key={account}
            size={36}
            account={account}
            style={{ marginRight: "-.5rem" }}
            iconClassName="border-2 border-white border-inset"
            className="flex items-center"
          />
        ))}
      </div>
      {!firstThreeVotes.length && (
        <div className="mt-4 text-sm">{t`No votes for this proposal.`}</div>
      )}
      {!!firstThreeVotes.length && firstThreeVotes.length && (
        <div className="ml-4 flex items-center text-sm">
          {t`Votes by `}
          {firstThreeVotes &&
            firstThreeVotes.map((address, index) => (
              <>
                <EnsNameOrFormattedAddress key={address} address={address} />
                {index < firstThreeVotes.length - 1 ? ", " : " "}
              </>
            ))}
          {!!remainingVotes.length &&
            ngettext(
              msgid` and ${remainingVotes.length} other.`,
              ` and ${remainingVotes.length} others.`,
              remainingVotes.length,
            )}
        </div>
      )}
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

interface EnsNameProps {
  address: string;
}
function EnsNameOrFormattedAddress(props: EnsNameProps) {
  const { address } = props;
  const { data: ensName } = useResolvedEnsName(address);

  // useResolvedEnsName will return the full address if no ens found.  We use:
  // isValidAddress(ensName || address) so that we can format the address
  // without needing to wait for useResolvedEnsName to resolve.
  let formattedAddress;
  if (isValidAddress(ensName || address)) {
    formattedAddress = formatWalletAddress(address);
  }

  return <>{formattedAddress ?? ensName}</>;
}
