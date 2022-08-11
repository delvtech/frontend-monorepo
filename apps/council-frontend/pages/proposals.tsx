import React, { ReactElement } from "react";

import { ProposalsJson } from "@elementfi/council-proposals";

import { PROPOSALS_JSON_URL } from "src/proposals";
import PageView from "src/ui/app/PageView";
import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import ProposalsPage from "src/ui/proposals/ProposalsPage";

// in development we want to read directly from the package instead of going
// to s3. This way we can test out locally how a new proposal looks in the UI
// without having to update production s3 buckets.
import mainnetProposals from "@elementfi/council-proposals/dist/json/mainnet.proposals.json";

interface ProposalsProps {
  proposalsJson: ProposalsJson;
}
export default function Proposals({
  proposalsJson,
}: ProposalsProps): ReactElement | null {
  const { data: currentBlockNumber } = useLatestBlockNumber();
  if (!currentBlockNumber) {
    return null;
  }
  return (
    <PageView>
      <ProposalsPage
        proposalsJson={proposalsJson}
        currentBlockNumber={currentBlockNumber}
      />
    </PageView>
  );
}

export async function getStaticProps(): Promise<{
  props: { proposalsJson: ProposalsJson };
  revalidate: number;
}> {
  // in development we want to read directly from the package instead of going
  // to s3. This way we can test out locally how a new proposal looks in the UI
  // without having to update production s3 buckets.
  if (process.env.NODE_ENV === "development") {
    return {
      props: { proposalsJson: mainnetProposals as ProposalsJson },
      revalidate: 60, // seconds
    };
  }

  // Fetch the proposals.json server side so that it's immediately available on
  // the client. This makes it easy to update the proposals.json as needed
  // without having to do a deploy.
  try {
    const res = await fetch(PROPOSALS_JSON_URL);
    const proposalsJson = await res.json();
    return {
      props: { proposalsJson },
      revalidate: 60, // seconds
    };
  } catch (error) {
    console.error("error", error);
  }

  return { props: { proposalsJson: emptyProposals }, revalidate: 60 };
}

const emptyProposals: ProposalsJson = {
  version: "0.0.0",
  snapshotSpace: "",
  proposals: [],
};
