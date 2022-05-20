/* eslint-disable @typescript-eslint/no-var-requires */
import { mainnetAddressList } from "@elementfi/elf-council-tokenlist";
import { CoreVoting__factory } from "@elementfi/council-typechain";
import fs from "fs";

import { ProposalsJson } from "src/types";

import { providers } from "ethers";
import { getProposals } from "src/getProposals";
import {
  SNAPSHOT_SPACE_ID_MAINNET,
  SNAPSHOT_GSC_SPACE_ID_MAINNET,
} from "src/snapshot";

const ALCHEMY_MAINNET_RPC_HOST = `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`;

const provider = new providers.JsonRpcProvider(ALCHEMY_MAINNET_RPC_HOST);

const currentProposalsJson: ProposalsJson = require(`src/proposals/mainnet.proposals.json`);
const currentGscProposalsJson: ProposalsJson = require(`src/proposals/mainnet-gsc.proposals.json`);

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
const snapshotIdsByProposalId: Record<string, string> = {};

const targetsByProposalId: Record<string, string[]> = {};

const callDatasByProposalId: Record<string, string[]> = {};

const gscSnapshotIdsByProposalId: Record<string, string> = {};

const gscTargetsByProposalId: Record<string, string[]> = {};

const gscCallDatasByProposalId: Record<string, string[]> = {};

(async function () {
  try {
    const newProposals = await getProposals(
      provider,
      coreVotingContract,
      snapshotIdsByProposalId,
      targetsByProposalId,
      callDatasByProposalId,
      currentProposalsJson.proposals.map((proposal) => proposal.proposalId),
    );

    const newGscProposals = await getProposals(
      provider,
      gscCoreVotingContract,
      gscSnapshotIdsByProposalId,
      gscTargetsByProposalId,
      gscCallDatasByProposalId,
      currentGscProposalsJson.proposals.map((proposal) => proposal.proposalId),
    );

    const proposalsJson: ProposalsJson = {
      version: "0.0.0",
      snapshotSpace: SNAPSHOT_SPACE_ID_MAINNET,
      proposals: [...currentProposalsJson.proposals, ...newProposals],
    };
    const proposalsJsonString = JSON.stringify(proposalsJson, null, 2);
    console.log(proposalsJsonString);

    fs.writeFileSync(
      "src/proposals/mainnet.proposals.json",
      proposalsJsonString,
    );

    const gscProposalsJson: ProposalsJson = {
      version: "0.0.0",
      snapshotSpace: SNAPSHOT_GSC_SPACE_ID_MAINNET,
      proposals: [...currentGscProposalsJson.proposals, ...newGscProposals],
    };
    const gscProposalsJsonString = JSON.stringify(gscProposalsJson, null, 2);
    console.log(gscProposalsJsonString);

    fs.writeFileSync(
      "src/proposals/mainnet-gsc.proposals.json",
      gscProposalsJsonString,
    );
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
