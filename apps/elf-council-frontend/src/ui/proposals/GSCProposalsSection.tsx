import {
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Proposal, ProposalsJson } from "@elementfi/council-proposals";
import { Dialog, Transition } from "@headlessui/react";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import { useWeb3React } from "@web3-react/core";
import { t } from "ttag";

import { ELEMENT_FINANCE_SNAPSHOT_URL } from "src/elf-snapshot/endpoints";
import AnchorButton from "src/ui/base/Button/AnchorButton";
import { ButtonVariant } from "src/ui/base/Button/styles";
import H1 from "src/ui/base/H1/H1";
import Tabs, { Tab } from "src/ui/base/Tabs/Tabs";
import {
  useIsTailwindLargeScreen,
  useIsTailwindSmallScreen,
} from "src/ui/base/tailwindBreakpoints";
import { useSigner } from "src/ui/signer/useSigner";

import { ProposalList } from "src/ui/proposals/ProposalList/ProposalList";
import {
  NoProposalsDetail,
  NoProposalsList,
} from "src/ui/proposals/NoProposals";
import { GSCProposalDetailsCard } from "src/ui/proposals/ProposalsDetailsCard/GSCProposalsDetailsCard";
import { useGSCUnverifiedProposals } from "src/ui/proposals/useUnverifiedProposals";

type TabId = "active" | "past";

interface ProposalsSectionProps {
  proposalsJson: ProposalsJson;
  currentBlockNumber: number;
}

export default function GSCProposalsSection({
  proposalsJson,
  currentBlockNumber,
}: ProposalsSectionProps): ReactElement {
  const { account, library } = useWeb3React();
  const signer = useSigner(account, library);

  const [activeTabId, setActiveTabId] = useState<TabId>("active");

  const isTailwindSmallScreen = useIsTailwindSmallScreen();
  const isTailwindLargeScreen = useIsTailwindLargeScreen();

  const unverifiedProposals = useGSCUnverifiedProposals(
    proposalsJson.proposals,
  );
  const allProposals = proposalsJson.proposals.concat(unverifiedProposals);

  const activeProposals = useFilteredProposals(
    "active",
    allProposals,
    currentBlockNumber,
  );
  const pastProposals = useFilteredProposals(
    "past",
    allProposals,
    currentBlockNumber,
  );

  const setDefaultActiveProposal = useCallback(() => {
    setSelectedProposalId(activeProposals?.[0]?.proposalId);
    setSelectedProposal(activeProposals?.[0]);
    activeProposals.length ? setIsModalOpen(true) : setIsModalOpen(false);
  }, [activeProposals]);

  const setDefaultPastProposal = useCallback(() => {
    setSelectedProposalId(pastProposals?.[0]?.proposalId);
    setSelectedProposal(pastProposals?.[0]);
    pastProposals.length ? setIsModalOpen(true) : setIsModalOpen(false);
  }, [pastProposals]);

  const calculateModalOpenState = () => {
    if (!isTailwindLargeScreen) {
      return false;
    }

    if (activeTabId === "active") {
      return !!activeProposals.length;
    }

    if (activeTabId === "past") {
      return !!pastProposals.length;
    }

    // Will not reach this
    return false;
  };

  const [isModalOpen, setIsModalOpen] = useState(calculateModalOpenState());

  // set the default to the first active proposal, since that's what filter is
  // on by default
  const [selectedProposalId, setSelectedProposalId] = useState<
    string | undefined
  >(isTailwindSmallScreen ? undefined : activeProposals?.[0]?.proposalId);

  const [selectedProposal, setSelectedProposal] = useState<
    Proposal | undefined
  >(isTailwindSmallScreen ? undefined : activeProposals?.[0]);

  const handleSelectProposal = useCallback(
    (proposalId: string | undefined) => {
      const proposal = allProposals.find((p) => p.proposalId === proposalId);
      setSelectedProposal(proposal);
      setSelectedProposalId(proposalId);
      setIsModalOpen(true);
    },
    [allProposals],
  );

  const handleActiveTabClick = () => {
    if (activeTabId !== "active") {
      setActiveTabId("active");
      // select the first proposal when the user clicks to view the
      // active tab
      if (isTailwindSmallScreen) {
        setSelectedProposalId(undefined);
        setSelectedProposal(undefined);
      } else {
        setDefaultActiveProposal();
      }
    }
  };

  const handlePastTabClick = () => {
    if (activeTabId !== "past") {
      setActiveTabId("past");
      if (isTailwindSmallScreen) {
        setSelectedProposalId(undefined);
        setSelectedProposal(undefined);
      } else {
        // select the first proposal when the user clicks to view the
        // past tab
        setDefaultPastProposal();
      }
    }
  };

  const handleOnClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Populates the default past/active proposal when moving from small -> big screen size
  useEffect(() => {
    if (isTailwindLargeScreen && !isModalOpen) {
      if (activeTabId === "past") {
        setDefaultPastProposal();
      } else {
        setDefaultActiveProposal();
      }
    }
  }, [
    activeTabId,
    isModalOpen,
    isTailwindLargeScreen,
    pastProposals,
    selectedProposal,
    setDefaultActiveProposal,
    setDefaultPastProposal,
  ]);

  const proposalDetail = !!selectedProposal ? (
    <GSCProposalDetailsCard
      key={selectedProposalId}
      onClose={handleOnClose}
      account={account}
      signer={signer}
      proposal={selectedProposal}
      unverified={!selectedProposal.createdTimestamp}
    />
  ) : null;

  const showNoProposalsState =
    (activeTabId === "active" && !activeProposals.length) ||
    (activeTabId === "past" && !pastProposals.length);

  return (
    <div className="flex h-full w-full lg:justify-center">
      <div className="h-full w-full flex-1 space-y-8 pt-8 lg:max-w-lg lg:pr-8">
        <H1 className="text-principalRoyalBlue flex-1 text-center">{t`GSC On-chain Proposals`}</H1>
        <div className="flex justify-between">
          <Tabs aria-label={t`Filter proposals`}>
            <Tab
              first
              current={activeTabId === "active"}
              onClick={handleActiveTabClick}
              name={t`Active`}
            />
            <Tab
              last
              current={activeTabId === "past"}
              onClick={handlePastTabClick}
              name={t`Past`}
            />
          </Tabs>
          <OffChainProposalsLink />
        </div>
        <div className="flex space-x-12">
          {showNoProposalsState ? (
            <NoProposalsList activeTabId={activeTabId} />
          ) : (
            <ProposalList
              isGSCProposal
              account={account}
              signer={signer}
              proposals={
                activeTabId === "active" ? activeProposals : pastProposals
              }
              selectedProposalId={selectedProposalId}
              onClickItem={handleSelectProposal}
              isModalOpen={isModalOpen}
            />
          )}
        </div>
      </div>

      {showNoProposalsState ? <NoProposalsDetail /> : null}

      {isTailwindLargeScreen ? (
        proposalDetail
      ) : (
        <Transition.Root show={isModalOpen} as={Fragment}>
          <Dialog
            // Using z-50 so that the dialog appears above the Sidebar, which is currently set to z-10
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={handleOnClose}
          >
            <div className="fixed top-1/2 left-1/2">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <Transition.Child
                as="div"
                enter="ease-out duration-300"
                enterFrom="opacity-0 sm:scale-95"
                enterTo="opacity-100 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 sm:scale-100"
                leaveTo="opacity-0 sm:scale-95"
              >
                {proposalDetail}
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </div>
  );
}

function OffChainProposalsLink() {
  return (
    <AnchorButton
      target="_blank"
      href={ELEMENT_FINANCE_SNAPSHOT_URL}
      variant={ButtonVariant.SECONDARY}
    >
      <div className="flex h-full items-center">
        <span className="mr-1">{t`Off-chain`}</span>
        <ExternalLinkIcon height={24} />
      </div>
    </AnchorButton>
  );
}

/**
 * To make sure we are only showing proposals that are deemed safe to vote on, we keep a curated
 * list of proposals hardcoded in the frontend.  The client grabs the snapshot information and we
 * link the on-chain proposal with the snapshot information.
 *
 * @param activeTabId current proposal selected
 * @param proposals list of proposals
 * @param currentBlockNumber
 * @returns filtered proposals based on activeTabId
 */
function useFilteredProposals(
  activeTabId: TabId,
  proposals: Proposal[],
  currentBlockNumber: number,
): Proposal[] {
  return useMemo(() => {
    if (activeTabId === "active") {
      return proposals?.filter(
        (proposal) => proposal.expiration > currentBlockNumber,
      );
    }

    if (activeTabId === "past") {
      return proposals?.filter(
        (proposal) => proposal.expiration <= currentBlockNumber,
      );
    }

    return [];
  }, [activeTabId, currentBlockNumber, proposals]);
}
