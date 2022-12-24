/* eslint-disable @typescript-eslint/no-var-requires */
import { mainnetAddressList } from "@elementfi/council-tokenlist";
import { CoreVoting__factory } from "@elementfi/council-typechain";
import fs from "fs";

import { ProposalsJson } from "src/proposals/types";

import { providers } from "ethers";
import { getProposals } from "src/getProposals";
import {
  SNAPSHOT_SPACE_ID_MAINNET,
  SNAPSHOT_GSC_SPACE_ID_MAINNET,
} from "src/snapshot";

const ALCHEMY_MAINNET_RPC_HOST = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`;

const provider = new providers.JsonRpcProvider(ALCHEMY_MAINNET_RPC_HOST);

const currentProposalsJson: ProposalsJson = require(`src/proposals/json/mainnet.proposals.json`);
const currentGscProposalsJson: ProposalsJson = require(`src/proposals/json/mainnet-gsc.proposals.json`);

const coreVotingContract = CoreVoting__factory.connect(
  mainnetAddressList.addresses.coreVoting,
  provider,
);

const gscCoreVotingContract = CoreVoting__factory.connect(
  mainnetAddressList.addresses.gscCoreVoting,
  provider,
);

/**
 * The mapping of on-chain proposal ids to their corresponding snapshot proposal
 * id (off-chain).
 */
const snapshotIdsByProposalId: Record<string, string> = {
  "1": "0x46785a4b78a9d03aeb5cdeb1c3ca4ae02cf9e5aca508e59bef405d16a7c8b4a6",
  "2": "0x132d4d3e0580349d938d22c844ce088ba2e5f394fc28b41f2927856746b125d7",
};

const targetsByProposalId: Record<string, string[]> = {
  "1": ["0x81758f3361A769016eae4844072FA6d7f828a651"],
  "2": ["0x81758f3361A769016eae4844072FA6d7f828a651"],
};

const callDatasByProposalId: Record<string, string[]> = {
  "1": [
    "0x88b49b8332b3be434fca12a37af693421116ab7c7682da00e7283c2530502de382b0464b",
  ],
  "2": [
    "0x88b49b83757c3f7dc43dd8d093cac4e51a40fd716858a29ec3d616a89eceb3acf87922d5",
  ],
};

const forumLinksByProposalId: Record<string, string> = {
  "1": "https://forum.element.fi/discussion/4631-egp2-increase-gsc-quorum-threshold",
  "2": "https://forum.element.fi/discussion/6504-egp15-element-fixed-borrow-protocol-grant-proposal-by-component",
};

const gscSnapshotIdsByProposalId: Record<string, string> = {};

const gscTargetsByProposalId: Record<string, string[]> = {};

const gscCallDatasByProposalId: Record<string, string[]> = {};
const gscForumLinksByProposalId: Record<string, string> = {};

// Proposals might be deleted from snapshot, so we need to store them
// indefinitely once they are scraped. We can skip them once they exist in the
// final json, hence these lists.
const proposalsToSkip = currentProposalsJson.proposals.map(
  (proposal) => proposal.proposalId,
);
const gscProposalsToSkip = currentGscProposalsJson.proposals.map(
  (proposal) => proposal.proposalId,
);

(async function () {
  try {
    const newProposals = await getProposals(
      provider,
      coreVotingContract,
      snapshotIdsByProposalId,
      targetsByProposalId,
      callDatasByProposalId,
      forumLinksByProposalId,
      proposalsToSkip,
    );

    const newGscProposals = await getProposals(
      provider,
      gscCoreVotingContract,
      gscSnapshotIdsByProposalId,
      gscTargetsByProposalId,
      gscCallDatasByProposalId,
      gscForumLinksByProposalId,
      gscProposalsToSkip,
    );

    const proposalsJson: ProposalsJson = {
      version: "0.0.0",
      snapshotSpace: SNAPSHOT_SPACE_ID_MAINNET,
      proposals: [...currentProposalsJson.proposals, ...newProposals],
    };
    const proposalsJsonString = JSON.stringify(proposalsJson, null, 2);

    fs.writeFileSync(
      "src/proposals/json/mainnet.proposals.json",
      proposalsJsonString,
    );

    const gscProposalsJson: ProposalsJson = {
      version: "0.0.0",
      snapshotSpace: SNAPSHOT_GSC_SPACE_ID_MAINNET,
      proposals: [...currentGscProposalsJson.proposals, ...newGscProposals],
    };
    const gscProposalsJsonString = JSON.stringify(gscProposalsJson, null, 2);

    fs.writeFileSync(
      "src/proposals/json/mainnet-gsc.proposals.json",
      gscProposalsJsonString,
    );
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
