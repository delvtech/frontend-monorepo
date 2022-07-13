import { TokenList } from "@uniswap/token-lists";
import { AddressesJsonFile } from "src/addresses/AddressesJsonFile";
import goerliAddressListJson from "src/addresses/goerli.addresses.json";
import goerliTokenListJson from "src/tokenlists/goerli.tokenlist.json";
import mainnetAddressListJson from "src/addresses/mainnet.addresses.json";
import mainnetTokenListJson from "src/tokenlists/mainnet.tokenlist.json";

/**
 * Elf Council tokenlist type definitions.
 */
import { TokenInfo } from "@uniswap/token-lists";

// export addresses json file definition
export type { AddressesJsonFile } from "src/addresses/AddressesJsonFile";

// export goerli jsons
export const goerliTokenList: TokenList = goerliTokenListJson as TokenList;
export const goerliAddressList: AddressesJsonFile = goerliAddressListJson;

// export mainnet jsons
export const mainnetTokenList: TokenList = mainnetTokenListJson as TokenList;
export const mainnetAddressList: AddressesJsonFile = mainnetAddressListJson;

export { getTokenList } from "src/getTokenList";

export type ElementGovernanceTokenInfo = TokenInfo;

export interface AirdropContractInfo extends TokenInfo {
  extensions: {
    rewardsRoot: string;
    lockingVault: string;
    expiration: string;
    token: string;
  };
}

export interface CoreVotingContractInfo extends TokenInfo {
  extensions: {
    dayInBlocks: number;
    baseQuorum: number;
    lockDuration: number;
    minProposalPower: number;
    extraVoteTime: number;
  };
}

export interface LockingVaultInfo extends TokenInfo {
  extensions: {
    token: string;
    staleBlockLag: number;
  };
}

export interface OptimisticRewardsVaultInfo extends TokenInfo {
  extensions: {
    pendingRoot: string;
    proposalTime: number;
    proposer: string;
    challengePeriod: number;
    rewardsRoot: string;
    lockingVault: string;
    token: string;
  };
}

export interface OptimisticsGrantsContractInfo extends TokenInfo {
  extensions: {
    token: string;
    solvency: string;
  };
}

export interface VestingVaultInfo extends TokenInfo {
  extensions: {
    token: string;
    staleBlockLag: number;
  };
}

export interface GSCVaultInfo extends TokenInfo {
  extensions: {
    coreVoting: string;
    votingPowerBound: number;
    idleDuration: number;
  };
}

export interface TimelockInfo extends TokenInfo {
  extensions: {
    waitTime: string;
  };
}

export interface TreasuryInfo extends TokenInfo {
  extensions: {
    owner: string;
  };
}

export type AnyTokenListInfo =
  | TokenInfo
  | ElementGovernanceTokenInfo
  | AirdropContractInfo
  | CoreVotingContractInfo
  | LockingVaultInfo
  | OptimisticRewardsVaultInfo
  | OptimisticsGrantsContractInfo
  | VestingVaultInfo
  | GSCVaultInfo
  | TimelockInfo
  | TreasuryInfo;
