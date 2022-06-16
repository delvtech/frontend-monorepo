import { ReactElement, useState } from "react";
import { t } from "ttag";

import Button from "src/ui/base/Button/Button";
import Dialog from "src/ui/base/Dialog/Dialog";
import { ButtonVariant } from "src/ui/base/Button/styles";
import { Delegate } from "src/delegates/delegates";
import { NumDelegatedVotes } from "src/ui/gsc/NumDelegatedVotes";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";
import { formatWalletAddress } from "src/base/formatWalletAddress";
import { getGSCCandidateUrl } from "src/integrations/commonwealth";
import { useENSName } from "src/ui/ethereum/useEnsName";

const listOptions = [t`All`, t`For`, t`Against`, t`Abstained`] as const;
type Option = typeof listOptions[number];

interface GSCVoteTallyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  tallys: Record<Option, string[]>;
}

export const GSCVoteTallyDialog = ({
  isOpen,
  onClose,
  tallys,
}: GSCVoteTallyDialogProps): ReactElement => {
  const [votingListOption, setVotingListOption] = useState<Option>("All");
  const filteredMembers = tallys[votingListOption];
  const changeTab = (option: Option) => setVotingListOption(option);

  return (
    <Dialog onClose={onClose} isOpen={isOpen} className="min-w-fit">
      <div className="flex min-w-full flex-col items-center space-y-4 p-4">
        <div className="text-principalRoyalBlue text-xl font-bold">
          {t`Voting List`}
        </div>
        {/* Button List */}
        <div className="flex flex-wrap justify-center">
          {listOptions.map((option) => (
            <Button
              className="m-2 w-28"
              disabled={!tallys[option].length}
              onClick={() => changeTab(option)}
              key={option}
              round
              variant={
                votingListOption === option
                  ? ButtonVariant.PRIMARY
                  : ButtonVariant.OUTLINE_BLUE
              }
            >
              <div className="w-full text-center">{option}</div>
            </Button>
          ))}
        </div>
        {/* Tally List */}
        <div className="max-h-80 w-full overflow-y-scroll">
          <ul className="space-y-2">
            {filteredMembers.map((address) => (
              <li key={address}>
                <VoterRow delegate={{ address }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Dialog>
  );
};

interface GSCMemberProfileRowProps {
  delegate: Delegate;
}

export function VoterRow(props: GSCMemberProfileRowProps): ReactElement {
  const { delegate } = props;
  const { data: ensName } = useENSName(delegate.address);
  const formattedDelegateName =
    ensName ||
    delegate.commonwealthName ||
    delegate.name ||
    formatWalletAddress(delegate.address);

  const delegateNameElement = (
    <span className="truncate">{formattedDelegateName}</span>
  );

  return (
    <div className="bg-hackerSky flex w-full rounded-xl p-6">
      {/* Name */}
      <div className="mr-4 items-start ">
        <div className="text-principalRoyalBlue flex items-center font-bold">
          <WalletJazzicon
            account={delegate.address}
            size={20}
            className="bg-principalRoyalBlue mr-2 h-5 w-5 rounded-xl"
          />
          {delegate.commonwealthPostedFromAddress ? (
            <a
              className="hover:underline"
              target="_blank"
              href={getGSCCandidateUrl(delegate.commonwealthPostedFromAddress)}
              rel="noreferrer"
            >
              {delegateNameElement}
            </a>
          ) : (
            delegateNameElement
          )}
        </div>
        <div className="lg:hidden">
          <NumDelegatedVotes
            selected={false}
            highlightSelected={false}
            account={delegate.address}
          />
        </div>
      </div>

      {/* Voting Power */}
      <div className="col-span-2 ml-auto mr-10 hidden lg:block">
        <NumDelegatedVotes
          selected={false}
          highlightSelected={false}
          account={delegate.address}
        />
      </div>
    </div>
  );
}
