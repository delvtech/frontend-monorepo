import { ReactElement, useMemo, useState } from "react";
import { Provider } from "@ethersproject/providers";
import { msgid, ngettext, t } from "ttag";

import { useGSCMembers } from "src/ui/gsc/useGSCMembers";
import { Ballot } from "src/ui/voting/Ballot";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";
import { formatWalletAddress } from "src/base/formatWalletAddress";
import { useResolvedEnsName } from "src/ui/ethereum/useResolvedEnsName";
import { isValidAddress } from "src/base/isValidAddress";
import { useGSCVotes } from "src/ui/gsc/useGSCVotes";
import Button from "src/ui/base/Button/Button";
import { GSCVoteTallyDialog } from "src/ui/proposals/GSCVoteTallyDialog";
import { ButtonVariant } from "src/ui/base/Button/styles";

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
  const { data: votesByMember = {} } = useGSCVotes(memberAddresses, proposalId);
  const tallys = useVoteTallys(memberAddresses, votesByMember);

  const { forList, againstList, abstainList } = tallys;
  const allVotes = [...forList, ...againstList, ...abstainList];
  const firstThreeVotes = allVotes.slice(0, 3);
  const remainingVotes = allVotes.slice(3);

  const [isOpen, setIsOpen] = useState(false);
  const onDialogClose = () => setIsOpen(false);

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
              <EnsNameOrFormattedAddress
                key={address}
                address={address}
                includeComma={index < firstThreeVotes.length - 1}
              />
            ))}
          {!!remainingVotes.length &&
            ngettext(
              msgid` and ${remainingVotes.length} other.`,
              ` and ${remainingVotes.length} others.`,
              remainingVotes.length,
            )}
        </div>
      )}
      <Button
        className="ml-4"
        disabled={!allVotes.length}
        onClick={() => setIsOpen(true)}
        variant={ButtonVariant.OUTLINE_WHITE}
      >{t`View Votes`}</Button>
      <GSCVoteTallyDialog
        isOpen={isOpen}
        onClose={onDialogClose}
        tallys={{
          All: allVotes,
          For: forList,
          Against: againstList,
          Abstained: abstainList,
        }}
      />
    </div>
  );
}

export default GSCVoteTallys;

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
  includeComma: boolean;
}
function EnsNameOrFormattedAddress(props: EnsNameProps) {
  const { address, includeComma } = props;
  const { data: ensName } = useResolvedEnsName(address);

  // useResolvedEnsName will return the full address if no ens found.  We use:
  // isValidAddress(ensName || address) so that we can format the address
  // without needing to wait for useResolvedEnsName to resolve.
  let formattedAddress;
  if (isValidAddress(ensName || address)) {
    formattedAddress = formatWalletAddress(address);
  }

  return (
    <>
      {formattedAddress ?? ensName} {includeComma ? ", " : " "}
    </>
  );
}
