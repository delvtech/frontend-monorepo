import { TokenList } from "@uniswap/token-lists";
import { AddressesJsonFile } from "./addresses/AddressesJsonFile";
/**
 * Elf Council tokenlist type definitions.
 */
import { TokenInfo } from "@uniswap/token-lists";
export { AddressesJsonFile } from "./addresses/AddressesJsonFile";
export declare const goerliTokenList: TokenList;
export declare const goerliAddressList: AddressesJsonFile;
export declare const mainnetTokenList: TokenList;
export declare const mainnetAddressList: AddressesJsonFile;
export { getTokenList } from "./getTokenList";
export declare type ElementGovernanceTokenInfo = TokenInfo;
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
export declare type AnyTokenListInfo = TokenInfo | ElementGovernanceTokenInfo | AirdropContractInfo | CoreVotingContractInfo | LockingVaultInfo | OptimisticRewardsVaultInfo | OptimisticsGrantsContractInfo | VestingVaultInfo | GSCVaultInfo | TimelockInfo | TreasuryInfo;
