import { t } from "ttag";
import { ReactElement, useState } from "react";

import { formatWalletAddress } from "src/base/formatWalletAddress";
import { getGSCCandidateUrl } from "src/commonwealth";
import { Delegate } from "src/elf-council-delegates/delegates";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";
import { useENSName } from "src/ui/ethereum/useEnsName";
import { ButtonVariant } from "src/ui/base/Button/styles";
import Button from "src/ui/base/Button/Button";
import Dialog from "src/ui/base/Dialog/Dialog";
import { NumDelegatedVotes } from "src/ui/gsc/NumDelegatedVotes";

const listOptions = ["All", "For", "Against", "Abstained"] as const;

type Option = typeof listOptions[number];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tallys: Record<Option, string[]>;
}

export const GSCVoteTallyDialog = ({
  isOpen,
  onClose,
  tallys,
}: Props): ReactElement => {
  const [votingListOption, setVotingListOption] = useState<Option>("All");
  const filteredMembers = tallys[votingListOption];
  const changeTab = (option: Option) => setVotingListOption(option);

  return (
    <Dialog onClose={() => onClose()} isOpen={isOpen} className="min-w-fit">
      <div className="flex min-w-full flex-col items-center space-y-4 p-4">
        <div className="text-principalRoyalBlue text-xl font-bold">
          {t`Voting List`}
        </div>
        <div className="flex flex-wrap justify-center">
          {listOptions.map((o) => (
            <Button
              className="m-2 w-28"
              variant={
                votingListOption === o
                  ? ButtonVariant.PRIMARY
                  : ButtonVariant.OUTLINE_BLUE
              }
              disabled={tallys[o].length === 0}
              onClick={() => changeTab(o)}
              key={o}
              round
            >
              <div className="w-full text-center">{t`${o}`}</div>
            </Button>
          ))}
        </div>
        <div className="max-h-80 w-full overflow-y-scroll">
          <ul className="space-y-2">
            {filteredMembers.map((address) => {
              return (
                <li key={address}>
                  <VoterRow delegate={{ address }} />
                </li>
              );
            })}
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
      <div className=" mr-4 items-start ">
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
