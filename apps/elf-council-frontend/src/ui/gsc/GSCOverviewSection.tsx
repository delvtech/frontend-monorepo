import React, { ReactElement, useRef, useState } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { t } from "ttag";

import { defaultProvider } from "src/elf/providers/providers";
import Button from "src/ui/base/Button/Button";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H1 from "src/ui/base/H1/H1";
import DelegateProfileRow from "src/ui/delegate/DelegatesList/DelegateProfileRow";
import { GSCMemberProfileRow } from "src/ui/gsc/GSCMemberProfileRow";
import { useGSCMembers } from "./useGSCMembers";
import { useGSCCandidates } from "./useCandidates";
import Card from "src/ui/base/Card/Card";
import Tabs, { Tab } from "src/ui/base/Tabs/Tabs";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import classNames from "classnames";
import { GSCPortfolioCard } from "src/ui/gsc/GSCPortfolioCard";
import { ChangeDelegateButton } from "src/ui/gsc/ChangeDelegationButton";
import { useChangeDelegation } from "src/ui/contracts/useChangeDelegation";
import { useDelegate } from "src/ui/delegate/useDelegate";
import { Delegate } from "src/elf-council-delegates/delegates";
import { BigNumber } from "ethers";
import { useGSCVotePowerThreshold } from "src/ui/gsc/useGSCVotePowerThreshold";
import { useLeaveGSC } from "src/ui/gsc/useLeaveGSC";
import { buildToastTransactionConfig } from "src/ui/notifications/buildToastTransactionConfig";
import {
  useVotingPowerByDelegates,
  VotePowerByDelegate,
} from "src/ui/gsc/useVotingPowerByDelegates";

const provider = defaultProvider;
const NUM_CANDIDATES_TO_SHOW = 20;

enum TabOption {
  Overview,
  Current,
  Rising,
}

export function GSCOverviewSection(): ReactElement {
  const { account, library } = useWeb3React<Web3Provider>();
  const signer = library?.getSigner();

  const currentDelegate = useDelegate(account);

  // Fetch and sort current GSC members
  const { data: members = [] } = useGSCMembers();
  const votingPowerByDelegate = useVotingPowerByDelegates();
  const sortedMembers = sortMembersByVotingPower(
    members,
    votingPowerByDelegate,
  );

  // Fetch current GSC candidates
  const candidates = useGSCCandidates();
  const topTwentyCandidates = candidates.slice(0, NUM_CANDIDATES_TO_SHOW);

  // Find GSC members that are kickable
  const { data: thresholdValue } = useGSCVotePowerThreshold();
  const kickableMembers = getKickableMembers(
    [...members],
    votingPowerByDelegate,
    thresholdValue ?? BigNumber.from(0),
  );

  // Tab state
  const [currentTab, setCurrentTab] = useState<TabOption>(TabOption.Overview);
  const handleChangeTab = (opt: TabOption) => setCurrentTab(opt);

  const toastIdRef = useRef<string>();

  // Change Delegation logic
  const { mutate: changeDelegation, isLoading: changeDelegationLoading } =
    useChangeDelegation(account, signer);
  const handleDelegation = (address: string) => changeDelegation([address]);
  const handleLeave = useLeaveGSC(
    account,
    signer,
    buildToastTransactionConfig(toastIdRef),
  );

  return (
    <div className="w-full space-y-6">
      <H1 className="text-center text-principalRoyalBlue">
        {t`Governance GSC Overview`}
      </H1>

      <GSCPortfolioCard account={account} signer={signer} />

      <Card className="">
        <div className="flex-col justify-center w-full space-y-6 ">
          {/* Nav buttons */}
          <div className="flex justify-center">
            <Tabs aria-label={t`Filter proposals`}>
              <Tab
                first
                current={currentTab === TabOption.Overview}
                onClick={() => handleChangeTab(TabOption.Overview)}
                name={t`Overview`}
              />
              <Tab
                current={currentTab === TabOption.Current}
                onClick={() => handleChangeTab(TabOption.Current)}
                name={t`Current Members`}
              />
              <Tab
                last
                current={currentTab === TabOption.Rising}
                onClick={() => handleChangeTab(TabOption.Rising)}
                name={t`Rising Members`}
              />
            </Tabs>
          </div>

          {currentTab === TabOption.Overview && (
            <div className="flex flex-col mt-4 space-y-10 overflow-y-scroll">
              <Disclosure as="div">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-4 text-sm font-medium text-left rounded-lg bg-hackerSky text-principalRoyalBlue hover:bg-hackerSky-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span>{t`What makes someone eligible to join the GSC?`}</span>

                      <ChevronDownIcon
                        className={classNames(
                          open ? classNames("rotate-180 transform") : "",
                          "ml-2 h-5 w-5 transition duration-150 ease-in-out",
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex flex-col gap-3 px-4 pt-4 pb-2 text-sm text-gray-500 max-w-fit">
                      <p>{t`Council is an on-chain decentralized governance system through which a community can manage a DAO. It gives the community total flexibility over how to distribute Voting Power and allows it to adapt its governance system to the continuously evolving needs of the DAO.`}</p>
                      <p>{t`The system also includes the optional structure of a Governance Steering Council (GSC) with added governance powers and responsibilities, all to be decided upon by the community.`}</p>
                      <p>{t`This flexibility is possible thanks to the use of Voting Vaults. Learn more in `}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-4 text-sm font-medium text-left rounded-lg bg-hackerSky text-principalRoyalBlue hover:bg-hackerSky-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span>{t`What are the day-to-day responsibilities of a GSC member?`}</span>

                      <ChevronDownIcon
                        className={classNames(
                          open ? classNames("rotate-180 transform") : "",
                          "ml-2 h-5 w-5 transition duration-150 ease-in-out",
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex flex-col gap-3 px-4 pt-4 pb-2 text-sm text-gray-500 max-w-fit">
                      <p>{t`Council is an on-chain decentralized governance system through which a community can manage a DAO. It gives the community total flexibility over how to distribute Voting Power and allows it to adapt its governance system to the continuously evolving needs of the DAO.`}</p>
                      <p>{t`The system also includes the optional structure of a Governance Steering Council (GSC) with added governance powers and responsibilities, all to be decided upon by the community.`}</p>
                      <p>{t`This flexibility is possible thanks to the use of Voting Vaults. Learn more in `}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-4 text-sm font-medium text-left rounded-lg bg-hackerSky text-principalRoyalBlue hover:bg-hackerSky-dark focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span>{t`How are GSC members removed and/or added?`}</span>

                      <ChevronDownIcon
                        className={classNames(
                          open ? classNames("rotate-180 transform") : "",
                          "ml-2 h-5 w-5 transition duration-150 ease-in-out",
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex flex-col gap-3 px-4 pt-4 pb-2 text-sm text-gray-500 max-w-fit">
                      <p>{t`Council is an on-chain decentralized governance system through which a community can manage a DAO. It gives the community total flexibility over how to distribute Voting Power and allows it to adapt its governance system to the continuously evolving needs of the DAO.`}</p>
                      <p>{t`The system also includes the optional structure of a Governance Steering Council (GSC) with added governance powers and responsibilities, all to be decided upon by the community.`}</p>
                      <p>{t`This flexibility is possible thanks to the use of Voting Vaults. Learn more in `}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          )}

          {currentTab === TabOption.Current &&
            (sortedMembers.length ? (
              <div>
                <ul className="space-y-2">
                  {members.map((member) => {
                    const currentlyDelegated =
                      currentDelegate === member.address;

                    const kickButton = kickableMembers.has(member.address) ? (
                      <Button
                        variant={ButtonVariant.DANGER}
                        className="w-full text-center"
                        onClick={handleLeave}
                      >
                        <div className="flex justify-center w-full">{t`Kick`}</div>
                      </Button>
                    ) : undefined;

                    return (
                      <li key={member.address}>
                        <GSCMemberProfileRow
                          selected={false}
                          delegate={member}
                          kickButton={kickButton}
                          delegateButton={
                            <ChangeDelegateButton
                              onDelegationClick={() =>
                                handleDelegation(member.address)
                              }
                              account={account}
                              isLoading={changeDelegationLoading}
                              isCurrentDelegate={currentlyDelegated}
                            />
                          }
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className="font-bold text-center text-principalRoyalBlue">{t`No current GSC members.`}</div>
            ))}

          {currentTab === TabOption.Rising && (
            <div className="overflow-y-scroll h-96">
              <ul className="space-y-2">
                {topTwentyCandidates.map((delegate) => {
                  const currentlyDelegated =
                    currentDelegate === delegate.address;

                  const delegationButton = (
                    <ChangeDelegateButton
                      onDelegationClick={() =>
                        handleDelegation(delegate.address)
                      }
                      account={account}
                      isLoading={changeDelegationLoading}
                      isCurrentDelegate={currentlyDelegated}
                    />
                  );

                  return (
                    <li key={`${delegate.address}`}>
                      <DelegateProfileRow
                        provider={provider}
                        selected={false}
                        delegate={delegate}
                        actionButton={delegationButton}
                        profileActionButton={delegationButton}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function sortMembersByVotingPower(
  members: Delegate[],
  votingPowerByDelegate: VotePowerByDelegate,
) {
  return members.sort((memberA, memberB) => {
    const votingPowerA: BigNumber = votingPowerByDelegate[memberA.address];
    const votingPowerB: BigNumber = votingPowerByDelegate[memberB.address];
    return +votingPowerB?.sub(votingPowerA).toString();
  });
}

function getKickableMembers(
  members: Delegate[],
  votePowerByDelegate: VotePowerByDelegate,
  threshold: BigNumber,
): Set<string> {
  const validMembers: Set<string> = new Set();

  members.forEach((member) => {
    const address = member.address;
    const votingPower = votePowerByDelegate[address];

    if (votingPower && votingPower.lt(threshold)) {
      validMembers.add(address);
    }
  });

  return validMembers;
}

export default GSCOverviewSection;
