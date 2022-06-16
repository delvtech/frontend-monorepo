import React, { ReactElement, useCallback, useRef, useState } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { jt, t } from "ttag";

import { defaultProvider } from "src/providers/providers";
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
import { Delegate } from "src/delegates/delegates";
import { BigNumber } from "ethers";
import { useGSCVotePowerThreshold } from "src/ui/gsc/useGSCVotePowerThreshold";
import { useKick } from "src/ui/gsc/useKickGSC";
import { buildToastTransactionConfig } from "src/ui/notifications/buildToastTransactionConfig";
import {
  useVotingPowerByDelegates,
  VotePowerByDelegate,
} from "src/ui/gsc/useVotingPowerByDelegates";
import { useGSCStatus, EligibilityState } from "src/ui/gsc/useGSCStatus";
import { getUserVaultsExtraData } from "./getUserVaultsExtraData.ts";
import { commify, formatEther } from "ethers/lib/utils";
import { Spinner } from "src/ui/base/Spinner/Spinner";

const provider = defaultProvider;

enum TabOption {
  Overview,
  Current,
  Rising,
}

export function GSCOverviewSection(): ReactElement {
  const { account, library } = useWeb3React<Web3Provider>();
  const signer = library?.getSigner();

  const currentDelegate = useDelegate(account);
  const { status } = useGSCStatus(account);
  const isGSC = status === EligibilityState.Current;

  // Fetch and sort current GSC members
  const { data: members = [], refetch: refetchMembers } = useGSCMembers();
  const { data: votePowerByDelegates = {}, isLoading } =
    useVotingPowerByDelegates();
  const sortedMembers = sortMembersByVotingPower(members, votePowerByDelegates);

  // Fetch current GSC candidates
  const candidates = useGSCCandidates();
  const { data: thresholdValue } = useGSCVotePowerThreshold();
  const formattedThreshold =
    thresholdValue && commify(Math.round(+formatEther(thresholdValue)));

  // Tab state
  const [currentTab, setCurrentTab] = useState<TabOption>(TabOption.Overview);
  const handleChangeTab = (opt: TabOption) => setCurrentTab(opt);

  const toastIdRef = useRef<string>();

  // Change Delegation logic
  const { mutate: changeDelegation, isLoading: changeDelegationLoading } =
    useChangeDelegation(account, signer);
  const handleDelegation = (address: string) => changeDelegation([address]);
  const { mutate: kick, isLoading: isLeaveTxnLoading } = useKick(
    signer,
    buildToastTransactionConfig(toastIdRef),
  );

  const handleKick = useCallback(
    async (account: string) => {
      const extraData = await getUserVaultsExtraData(account);
      kick([account, extraData], {
        onSuccess: () => {
          refetchMembers();
        },
      });
    },
    [kick, refetchMembers],
  );

  return (
    <div className="w-full space-y-6">
      <H1 className="text-principalRoyalBlue text-center">
        {t`Governance GSC Overview`}
      </H1>

      <GSCPortfolioCard account={account} signer={signer} />

      <Card className="">
        <div className="w-full flex-col justify-center space-y-6 ">
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
                name={t`Rising Delegates`}
              />
            </Tabs>
          </div>

          {currentTab === TabOption.Overview && (
            <div className="mt-4 flex flex-col overflow-y-auto">
              <Disclosure as="div">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="bg-hackerSky text-principalRoyalBlue hover:bg-hackerSky-dark flex w-full justify-between rounded-lg p-4 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span>{t`What makes someone eligible to join the GSC?`}</span>

                      <ChevronDownIcon
                        className={classNames(
                          open ? classNames("rotate-180 transform") : "",
                          "ml-2 h-5 w-5 transition duration-150 ease-in-out",
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex max-w-fit flex-col gap-3 px-4 pt-4 pb-2 text-sm text-gray-500">
                      <p>{t`Any delegate who has accumulated more delegated voting
                      power than the current GSC Eligibility Threshold (${formattedThreshold}
                      ELFI) is eligible to join the GSC. `}</p>
                      <p>
                        {jt`To help reach this
                      threshold, delegates can post their vision, mission and
                      other relevant information in the ${forumsLink}, to make
                      themselves known to the community and rally other members
                      from which to gather more delegated voting power.`}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="bg-hackerSky text-principalRoyalBlue hover:bg-hackerSky-dark flex w-full justify-between rounded-lg p-4 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span>{t`What are the day-to-day responsibilities of a GSC member?`}</span>

                      <ChevronDownIcon
                        className={classNames(
                          open ? classNames("rotate-180 transform") : "",
                          "ml-2 h-5 w-5 transition duration-150 ease-in-out",
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex max-w-fit flex-col gap-3 px-4 pt-4 pb-2 text-sm text-gray-500">
                      <p>
                        {jt`The formal responsibilities of the GSC are being ${gscResponibilitiesLink}, but they could include some of the following:`}
                      </p>
                      <ul className="ml-8 list-disc">
                        <li>{t`On-chain voting`}</li>
                        <li>{t`Continued discussion about protocol improvements,
                        partnerships, DAO structures`}</li>
                        <li>{t`Security Management`}</li>
                        <li>{t`Optimistic Grants distribution`}</li>
                        <li>{t`Governance experimentation and incentives management`}</li>
                      </ul>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
              <Disclosure as="div" className="mt-4">
                {({ open }) => (
                  <>
                    <Disclosure.Button className="bg-hackerSky text-principalRoyalBlue hover:bg-hackerSky-dark flex w-full justify-between rounded-lg p-4 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <span>{t`How are GSC members removed and/or added?`}</span>

                      <ChevronDownIcon
                        className={classNames(
                          open ? classNames("rotate-180 transform") : "",
                          "ml-2 h-5 w-5 transition duration-150 ease-in-out",
                        )}
                        aria-hidden="true"
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="flex max-w-fit flex-col gap-3 px-4 pt-4 pb-2 text-sm text-gray-500">
                      <p>{t`Joining and leaving the GSC are individual on-chain transactions.`}</p>
                      <ul className="ml-8 list-disc">
                        <li>
                          <span className="font-bold">{t`Joining: `}</span>
                          {t`If a delegate who isn’t part of the GSC
                          acquires more delegated Voting Power than the GSC
                          Eligibility Threshold (${formattedThreshold}
                            ELFI), they can join
                          the GSC by using the “Join” button that will become
                          enabled in the GSC’s Overview page.`}
                        </li>
                        <li>
                          <span className="font-bold">{t`Leaving: `}</span>
                          {t`If a GSC member falls below the GSC Eligibility
                          Threshold (${formattedThreshold}
                            ELFI), anyone can execute the
                          necessary on-chain transaction to formally remove them
                          from the GSC by using the “Kick” button that will
                          become enabled in the GSC’s Overview page.`}
                        </li>
                      </ul>
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
                  {sortedMembers.map((member) => {
                    const currentlyDelegated =
                      currentDelegate === member.address;

                    return (
                      <li key={member.address}>
                        <GSCMemberProfileRow
                          selected={false}
                          delegate={member}
                          kickButton={
                            <Button
                              variant={ButtonVariant.DANGER}
                              className="w-full text-center"
                              onClick={() => handleKick(member.address)}
                              loading={isLeaveTxnLoading}
                            >
                              <div className="flex w-full justify-center">{t`Kick`}</div>
                            </Button>
                          }
                          delegateButton={
                            <ChangeDelegateButton
                              onDelegationClick={() =>
                                handleDelegation(member.address)
                              }
                              disabled={isGSC}
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
              <div className="text-principalRoyalBlue text-center font-bold">{t`No current GSC members.`}</div>
            ))}

          {currentTab === TabOption.Rising &&
            (isLoading ? (
              <div>
                <Spinner />
              </div>
            ) : (
              <div className="h-96 overflow-y-auto">
                <ul className="space-y-2">
                  {candidates.map((delegate) => {
                    const currentlyDelegated =
                      currentDelegate === delegate.address;

                    const delegationButton = (
                      <ChangeDelegateButton
                        onDelegationClick={() =>
                          handleDelegation(delegate.address)
                        }
                        account={account}
                        disabled={isGSC}
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
            ))}
        </div>
      </Card>
    </div>
  );
}

const forumsLink = (
  <a
    className="underline"
    target="_blank"
    rel="noopener noreferrer"
    href="https://forum.element.fi/discussion/4146-introducing-the-call-for-delegates-members-of-the-governance-steering-council"
  >
    {t`forums`}
  </a>
);

const gscResponibilitiesLink = (
  <a
    className="underline"
    target="_blank"
    rel="noopener noreferrer"
    href="https://forum.element.fi/discussion/4146-introducing-the-call-for-delegates-members-of-the-governance-steering-council"
  >
    {t`actively discussed at this time`}
  </a>
);

function sortMembersByVotingPower(
  members: Delegate[],
  votingPowerByDelegate: VotePowerByDelegate,
) {
  return [...members].sort((memberA, memberB) => {
    const votingPowerA: BigNumber = votingPowerByDelegate[memberA.address];
    const votingPowerB: BigNumber = votingPowerByDelegate[memberB.address];
    if (!votingPowerA || !votingPowerB) {
      return 0;
    }
    return +votingPowerB?.sub(votingPowerA).toString();
  });
}

export default GSCOverviewSection;
