import { Proposal } from "@elementfi/council-proposals";
import { addressesJson } from "src/addresses";
import { ChainId } from "@elementfi/base";

export const PROPOSALS_JSON_URL = getProposalsJsonUrl();
export const GSC_PROPOSALS_JSON_URL = getGscProposalsJsonUrl();

function getProposalsJsonUrl() {
  switch (addressesJson.chainId) {
    case ChainId.MAINNET:
      return "https://example.s3.us-east-2.amazonaws.com/mainnet.proposals.json";

    case ChainId.GOERLI:
      return "https://example.s3.us-east-2.amazonaws.com/goerli.proposals.json";

    case ChainId.LOCAL:
    default:
      return "https://example.s3.us-east-2.amazonaws.com/testnet.proposals.json";
  }
}

function getGscProposalsJsonUrl() {
  switch (addressesJson.chainId) {
    case ChainId.MAINNET:
      return "https://example.s3.us-east-2.amazonaws.com/mainnet-gsc.proposals.json";

    case ChainId.GOERLI:
      return "https://example.s3.us-east-2.amazonaws.com/goerli-gsc.proposals.json";

    case ChainId.LOCAL:
    default:
      return "https://example.s3.us-east-2.amazonaws.com/testnet-gsc.proposals.json";
  }
}

export function getIsVotingOpen(
  proposal: Proposal,
  blockNumber: number,
): boolean {
  return proposal.expiration > blockNumber;
}

export function getIsExecutable(
  proposal: Proposal,
  blockNumber: number,
): boolean {
  return proposal.unlock < blockNumber;
}
