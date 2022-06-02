import { Fragment, ReactElement } from "react";
import { formatBalance } from "src/formatBalance";
import { Delegate } from "src/elf-council-delegates/delegates";
import { WalletJazzicon } from "src/ui/wallet/WalletJazzicon";
import classNames from "classnames";
import { Popover, Transition } from "@headlessui/react";
import DetailedDelegateProfile from "src/ui/delegate/DelegatesList/DetailedDelegateProfile";
import dynamic from "next/dynamic";
import { useVotingPowerForAccountAtLatestBlock } from "src/ui/voting/useVotingPowerForAccount";
import {
  ElementIconCircle,
  IconSize,
} from "src/ui/base/ElementIconCircle/ElementIconCircle";
import { Provider } from "@ethersproject/providers";
import { formatWalletAddress } from "src/base/formatWalletAddress";
import { getGSCCandidateUrl } from "src/commonwealth";
import { useENSName } from "src/ui/ethereum/useEnsName";

interface DelegateProfileRowProps {
  provider?: Provider;
  selected: boolean;
  highlightSelected?: boolean;
  delegate: Delegate;
  actionButton: ReactElement;
  profileActionButton: ReactElement;
}

function DelegateProfileRow(props: DelegateProfileRowProps): ReactElement {
  const {
    provider,
    selected = false,
    highlightSelected = false,
    delegate,
    actionButton,
    profileActionButton,
  } = props;

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
    <Popover>
      <div
        className={classNames(
          "grid grid-cols-10 items-center justify-between rounded-xl bg-white py-3 sm:px-4",
          {
            "!bg-votingGreen": highlightSelected && selected,
          },
        )}
      >
        {/* Name */}
        <div className="col-span-6 mr-4 items-start truncate text-left lg:col-span-4">
          <div className="flex flex-col">
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
                  href={getGSCCandidateUrl(
                    delegate.commonwealthPostedFromAddress,
                  )}
                  rel="noreferrer"
                >
                  {delegateNameElement}
                </a>
              ) : (
                delegateNameElement
              )}
            </div>
            <div className="lg:hidden">
              <span
                className={
                  highlightSelected && selected
                    ? "text-gray-400"
                    : "text-blueGrey"
                }
              >
                <NumDelegatedVotes account={delegate.address} />
              </span>
            </div>
          </div>
        </div>

        {/* Voting Power */}
        <div className="col-span-2 ml-auto mr-10 hidden lg:block">
          <span
            className={
              highlightSelected && selected ? "text-gray-400" : "text-blueGrey"
            }
          >
            <NumDelegatedVotes account={delegate.address} />
          </span>
        </div>

        {/* Buttons */}
        <div className="col-span-4 flex justify-end gap-x-2 sm:gap-x-4">
          {/* Button to expand a detailed view of delegate  */}

          {/* 
              Added a placeholder for future buttons. This placeholder div
              helps scale the button width to match the GSCMemberProfileRow 
              button width within the 'CurrentMembers' tab
          */}
          <div className="w-4/12 sm:w-1/2 lg:pl-2"></div>

          {/* Unique action event button */}
          <div className="w-8/12 sm:w-1/2 lg:pl-2">{actionButton}</div>
        </div>
      </div>

      <Transition>
        {/* Greyed out background overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* z-30 in order to overlap sidebar z-index */}
          <Popover.Overlay className="fixed inset-0 z-10 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        {/* Detailed delegate profile */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 sm:scale-95"
          enterTo="opacity-100 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 sm:scale-100"
          leaveTo="opacity-0 sm:scale-95"
        >
          <Popover.Panel
            className="bg-hackerSky fixed inset-0 z-20 box-content sm:inset-[initial] sm:top-[50%] sm:left-[50%] sm:w-[400px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:transform sm:rounded-xl
          md:w-[700px] lg:absolute lg:top-0 lg:right-0 lg:left-0 lg:h-full lg:w-full lg:translate-x-0 lg:translate-y-0"
          >
            {({ close }) => (
              <DetailedDelegateProfile
                provider={provider}
                delegate={delegate}
                onCloseProfileClick={close}
                selected={selected}
                actionButton={profileActionButton}
              />
            )}
          </Popover.Panel>
        </Transition.Child>
      </Transition>
    </Popover>
  );
}

interface NumDelegatedVotesProps {
  account: string | undefined | null;
}
function NumDelegatedVotes(props: NumDelegatedVotesProps): ReactElement {
  const { account } = props;
  const votePower = useVotingPowerForAccountAtLatestBlock(account);

  return (
    <div className="flex items-center">
      <ElementIconCircle size={IconSize.SMALL} className="mr-1" />
      <span>{formatBalance(votePower)}</span>
    </div>
  );
}

export default dynamic(() => Promise.resolve(DelegateProfileRow), {
  // we cant server side render the Popover component, so we turn this off for DelegateProfile
  ssr: false,
});
