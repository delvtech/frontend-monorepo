import React, { ReactElement } from "react";

// import { ProposalsJson } from "@elementfi/council-proposals";
import { t } from "ttag";

import { abbreviateLargeValue } from "src/base/numbers";
import SummaryCard from "src/ui/overview/SummaryCard";
import { useVotingPowerForProtocol } from "src/ui/voting/useVotingPowerForProtocol";
import Link from "next/link";
import { useGetSummaryCardsDataQuery } from "./SummaryCards.generated";
import { addressesJson } from "src/addresses";

export function SummaryCards(): ReactElement {
  const { data } = useGetSummaryCardsDataQuery({
    variables: {
      contract: addressesJson.addresses.coreVoting,
    },
  });

  const numActiveProposals = data?.votingContract?.proposalCount || 0;
  const numDelegates = data?.votingContract?.voterCount || 0;
  const votingPower = useVotingPowerForProtocol();

  const formattedTotalVotingPower = abbreviateLargeValue(
    Math.round(votingPower),
  );

  return (
    <div className="flex flex-col justify-around space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6">
      <SummaryCard
        title={
          <Link href="/proposals">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="underline hover:no-underline">
              {t`Active Proposals`}
            </a>
          </Link>
        }
        balance={numActiveProposals}
      />
      <SummaryCard
        title={t`Total Participants`}
        balance={numDelegates}
        tooltipContent={t`The number of unique delegates (including self-delegates) with voting power in the system.`}
      />
      <SummaryCard
        title={t`Circulating Voting Power`}
        balance={`${formattedTotalVotingPower}`}
        tooltipContent={t`The total amount of voting power in the system.`}
      />
    </div>
  );
}
