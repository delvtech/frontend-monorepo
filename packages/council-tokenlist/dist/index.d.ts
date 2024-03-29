import { Provider } from "@ethersproject/abstract-provider";
import { TokenList, TokenInfo } from "@uniswap/token-lists";
export interface AddressesJsonFile {
    chainId: number;
    addresses: {
        airdrop: string;
        coreVoting: string;
        discordTier1Airdrop: string;
        discordTier2Airdrop: string;
        discordTier3Airdrop: string;
        elementToken: string;
        githubTier1Airdrop: string;
        githubTier2Airdrop: string;
        githubTier3Airdrop: string;
        gscCoreVoting: string;
        gscVault: string;
        lockingVault: string;
        optimisticGrants: string;
        optimisticRewardsVault: string;
        spender: string;
        timeLock: string;
        treasury: string;
        vestingVault: string;
    };
}
export function getTokenList(provider: Provider, addressesJson: AddressesJsonFile, name: string): Promise<TokenList>;
export const goerliTokenList: TokenList;
export const goerliAddressList: AddressesJsonFile;
export const mainnetTokenList: TokenList;
export const mainnetAddressList: AddressesJsonFile;
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
export type AnyTokenListInfo = TokenInfo | ElementGovernanceTokenInfo | AirdropContractInfo | CoreVotingContractInfo | LockingVaultInfo | OptimisticRewardsVaultInfo | OptimisticsGrantsContractInfo | VestingVaultInfo | GSCVaultInfo | TimelockInfo | TreasuryInfo;

//# sourceMappingURL=index.d.ts.map
