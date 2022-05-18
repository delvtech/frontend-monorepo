import React, { ReactElement } from "react";

import { Signer } from "@ethersproject/abstract-signer";
import { Proposal } from "@elementfi/council-proposals";
import { ProposalListItem } from "./ProposalListItem";

interface ProposalListProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  proposals: Proposal[];
  selectedProposalId: string | undefined;
  onClickItem: (proposalId: string | undefined) => void;
  isModalOpen?: boolean;
  isGSCProposal?: boolean;
}
export function ProposalList({
  account,
  proposals,
  signer,
  selectedProposalId,
  onClickItem,
  isModalOpen,
  isGSCProposal,
}: ProposalListProps): ReactElement {
  return (
    <div className="flex w-full flex-col space-y-4 pb-8">
      {proposals.map((proposal) => {
        const activeModal =
          isModalOpen !== undefined
            ? isModalOpen && proposal.proposalId === selectedProposalId
            : proposal.proposalId === selectedProposalId;

        return (
          <ProposalListItem
            isGSCProposal={isGSCProposal}
            key={proposal.proposalId}
            active={activeModal}
            proposal={proposal}
            onClick={onClickItem}
            account={account}
            signer={signer}
          />
        );
      })}
    </div>
  );
}
