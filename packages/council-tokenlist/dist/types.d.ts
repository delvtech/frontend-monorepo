/**
 * Elf Council tokenlist type definitions.
 */
import { TokenInfo } from "@uniswap/token-lists";
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
        baseQuorum: string;
        lockDuration: number;
        minProposalPower: string;
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
        votingPowerBound: string;
        idleDuration: string;
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
