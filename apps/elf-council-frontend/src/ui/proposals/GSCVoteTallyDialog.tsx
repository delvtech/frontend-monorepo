import { t } from "ttag";

import { ButtonVariant } from "src/ui/base/Button/styles";
import Button from "src/ui/base/Button/Button";
import Dialog from "src/ui/base/Dialog/Dialog";
import { GSCMemberProfileRow } from "src/ui/gsc/GSCMemberProfileRow";
import { ReactElement, useState } from "react";
import { useGSCMembers } from "src/ui/gsc/useGSCMembers";
import { useGSCVotes } from "src/ui/voting/useGSCVotes";

const listOptions = ["All", "For", "Against", "Abstained"] as const;

type Option = typeof listOptions[number];

interface Props {
  proposalId?: string;
}

export const GSCVoteTallyDialog = ({ proposalId }: Props): ReactElement => {
  const { data: members = [] } = useGSCMembers();
  const [isVoteTallyModalOpen, setIsVoteTallyModalOpen] = useState(false);
  const [votingListOption, setVotingListOption] = useState<Option>("All");

  const { data: gscVotes } = useGSCVotes(
    members.map((member) => member.address),
    proposalId,
  );

  const changeTab = (option: Option) => setVotingListOption(option);

  return (
    <Dialog
      onClose={() => setIsVoteTallyModalOpen(false)}
      isOpen={isVoteTallyModalOpen}
      className="min-w-fit"
    >
      <div className="flex min-w-full flex-col items-center space-y-4 p-4">
        <div className="text-principalRoyalBlue mb-4 text-xl font-bold">
          {t`Voting List`}
        </div>
        <div className="flex space-x-4">
          {listOptions.map((o) => (
            <Button
              className="w-24"
              variant={
                votingListOption === o
                  ? ButtonVariant.PRIMARY
                  : ButtonVariant.OUTLINE_BLUE
              }
              onClick={() => changeTab(o)}
              round
              key={o}
            >
              <div className="w-full text-center">{t`${o}`}</div>
            </Button>
          ))}
        </div>
        <div className="max-h-80 overflow-y-scroll">
          <ul className="space-y-2">
            {members
              .filter((member) => {
                if (votingListOption === "All") {
                  return true;
                }

                if (votingListOption === "For") {
                  return gscVotes?.[0].includes(member.address);
                }

                if (votingListOption === "Against") {
                  return gscVotes?.[1].includes(member.address);
                }

                return gscVotes?.[3].includes(member.address);
              })
              .map((member) => {
                return (
                  <li key={member.address}>
                    <GSCMemberProfileRow
                      selected={false}
                      delegate={member}
                      kickButton={undefined}
                      delegateButton={undefined}
                    />
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </Dialog>
  );
};
