import { AddressesJsonFile } from "@elementfi/council-tokenlist";
import { CoreVoting__factory } from "@elementfi/council-typechain";
import fs from "fs";
import hre from "hardhat";

import { ProposalsJson } from "src/proposals/types";

import { SNAPSHOT_SPACE_ID_GOERLI } from "src/snapshot";
import { getProposals } from "src/getProposals";

const provider = hre.ethers.provider;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const addressesJson: AddressesJsonFile = require(`src/addresses/testnet.addresses.json`);

const coreVotingContract = CoreVoting__factory.connect(
  addressesJson.addresses.coreVoting,
  provider,
);

const gscCoreVotingContract = CoreVoting__factory.connect(
  addressesJson.addresses.gscCoreVoting,
  provider,
);

/**
 * A mapping of localhost GSC CoreVoting Proposal IDs -> random Snapshot proposal
 * ids from Element Finance.  This is how we show titles/descriptions for
 * testnet proposals in dev.
 *
 * Note: Sometimes the snapshot proposal ids are IPFS strings or hex strings 🤷
 */
const snapshotIdsByProposalId: Record<string, string> = {
  // EIP-000
  "0": "0x91a739c399ba1b95d9b38013bf5c42b4cb83b56272b322d86587193859371f12",
  // EFP-001
  "1": "0xbe329d38a1465fa6c6a4bc8aa6c39346818b2a5600414fb44f85230145120611",
  // Example Proposal
  "2": "0x5d556f0edb608697a426bdf0951e63139db7f8c7d5a7761b1fb5b5a969a69343",
  // EIP-001
  "3": "0x71df6710e26894685f985ae303b4bd64eeaa080f3e91703dac6ae539f66b5dd0",
  // EIP-002
  "4": "0xa924bf8887e96f64eabf30a5026eb432bd03b6f055df017061a1e480cf477c9a",
};

const targetsByProposalId: Record<string, string[]> = {
  "0": ["0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1"],
  "1": ["0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1"],
  "2": ["0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1"],
  "3": ["0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1"],
  "4": ["0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1"],
};

const callDatasByProposalId: Record<string, string[]> = {
  "0": [
    "0x88b49b834dbdd3e053743c5483a6f5f453200c2c9201e1330e5e5f99997aafcbe4389a2a",
  ],
  "1": [
    "0x88b49b834dbdd3e053743c5483a6f5f453200c2c9201e1330e5e5f99997aafcbe4389a2a",
  ],
  "2": [
    "0x88b49b834dbdd3e053743c5483a6f5f453200c2c9201e1330e5e5f99997aafcbe4389a2a",
  ],
  "3": [
    "0x88b49b834dbdd3e053743c5483a6f5f453200c2c9201e1330e5e5f99997aafcbe4389a2a",
  ],
  "4": [
    "0x88b49b834dbdd3e053743c5483a6f5f453200c2c9201e1330e5e5f99997aafcbe4389a2a",
  ],
};

const forumLinksByProposalId: Record<string, string> = {};

/**
 * A mapping of localhost CoreVoting Proposal IDs -> random Snapshot proposal
 * ids from Element Finance.  This is how we show titles/descriptions for
 * testnet proposals in dev.
 *
 * Note: Sometimes the snapshot proposal ids are IPFS strings or hex strings 🤷
 */
const gscSnapshotIdsByProposalId: Record<string, string> = {
  "0": "0x91a739c399ba1b95d9b38013bf5c42b4cb83b56272b322d86587193859371f12",
  "1": "0x71df6710e26894685f985ae303b4bd64eeaa080f3e91703dac6ae539f66b5dd0",
  "2": "0xa924bf8887e96f64eabf30a5026eb432bd03b6f055df017061a1e480cf477c9a",
};

const gscTargetsByProposalId: Record<string, string[]> = {
  "0": ["0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"],
  "1": ["0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"],
  "2": ["0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"],
};

const gscCallDatasByProposalId: Record<string, string[]> = {
  "0": [
    "0x3eba045b000000000000000000000000000000000000000000000005f68e8131ecf80000",
  ],
  "1": [
    "0x3eba045b000000000000000000000000000000000000000000000005f68e8131ecf80000",
  ],
  "2": [
    "0x3eba045b000000000000000000000000000000000000000000000005f68e8131ecf80000",
  ],
};
const gscForumLinksByProposalId: Record<string, string> = {};

(async function () {
  try {
    // NOTE: this WILL break if the snapshot id is not found
    const newProposals = await getProposals(
      provider,
      coreVotingContract,
      snapshotIdsByProposalId,
      targetsByProposalId,
      callDatasByProposalId,
      forumLinksByProposalId,
    );

    // NOTE: this WILL break if the snapshot id is not found
    const newGscProposals = await getProposals(
      provider,
      gscCoreVotingContract,
      gscSnapshotIdsByProposalId,
      gscTargetsByProposalId,
      gscCallDatasByProposalId,
      gscForumLinksByProposalId,
    );

    const proposalsJson: ProposalsJson = {
      version: "0.0.0",
      // hardhat should use the goerli snapshot
      snapshotSpace: SNAPSHOT_SPACE_ID_GOERLI,
      proposals: newProposals,
    };
    const proposalsJsonString = JSON.stringify(proposalsJson, null, 2);
    console.log(proposalsJsonString);
    console.log("");

    fs.writeFileSync(
      "src/proposals/json/testnet.proposals.json",
      proposalsJsonString,
    );

    const gscProposalsJson: ProposalsJson = {
      version: "0.0.0",
      // hardhat should use the goerli snapshot
      snapshotSpace: SNAPSHOT_SPACE_ID_GOERLI,
      proposals: newGscProposals,
    };
    const gscProposalsJsonString = JSON.stringify(gscProposalsJson, null, 2);
    console.log(gscProposalsJsonString);

    fs.writeFileSync(
      "src/proposals/json/testnet-gsc.proposals.json",
      gscProposalsJsonString,
    );

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
