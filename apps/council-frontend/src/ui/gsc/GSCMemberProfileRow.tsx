import { ReactElement } from "react";

import classNames from "classnames";

import { formatWalletAddress } from "src/base/formatWalletAddress";
import { getGSCCandidateUrl } from "src/integrations/commonwealth";
import { Delegate } from "src/delegates/delegates";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";
import { useENSName } from "src/ui/ethereum/useEnsName";
import { useGSCVotePowerThreshold } from "./useGSCVotePowerThreshold";
import { formatEther } from "ethers/lib/utils";
import { NumDelegatedVotes } from "src/ui/gsc/NumDelegatedVotes";

interface GSCMemberProfileRowProps {
  selected: boolean;
  highlightSelected?: boolean;
  delegate: Delegate;
  delegateButton?: ReactElement;
  kickButton?: ReactElement;
}

export function GSCMemberProfileRow(
  props: GSCMemberProfileRowProps,
): ReactElement {
  const {
    selected = false,
    highlightSelected = false,
    delegate,
    delegateButton,
    kickButton,
  } = props;
  const votePower = useVotingPowerForAccountAtLatestBlock(delegate.address);
  const { data: thresholdValue } = useGSCVotePowerThreshold();
  const formattedThreshold = thresholdValue && +formatEther(thresholdValue);
  const formattedVotingPower: number = +votePower;
  const isKickable =
    formattedThreshold &&
    !!formattedVotingPower &&
    formattedThreshold > formattedVotingPower;

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
    <div
      className={classNames(
        "grid grid-cols-10 items-center justify-between rounded-xl bg-white py-3 sm:px-4",
        {
          "!bg-votingGreen": highlightSelected && selected,
        },
      )}
    >
      {/* Name */}
      <div className="col-span-6 mr-4 items-start truncate lg:col-span-4">
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
            selected={selected}
            highlightSelected={highlightSelected}
            account={delegate.address}
          />
        </div>
      </div>

      {/* Voting Power */}
      <div className="col-span-2 ml-auto mr-10 hidden lg:block">
        <NumDelegatedVotes
          selected={selected}
          highlightSelected={highlightSelected}
          account={delegate.address}
        />
      </div>

      {/* Buttons */}
      <div className="col-span-4 flex justify-end gap-x-2 sm:gap-x-4">
        {/* Unique action event button */}
        <div className="w-4/12 sm:w-1/2 lg:pl-2">
          {isKickable ? kickButton : undefined}
        </div>
        <div className="w-8/12 sm:w-1/2 lg:pl-2">{delegateButton}</div>
      </div>
    </div>
  );
}
