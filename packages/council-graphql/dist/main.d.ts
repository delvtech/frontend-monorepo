import { GraphQLResolveInfo } from "graphql";
import { ResolverContext, Graph } from "@elementfi/graphql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export enum Ballot {
    Abstain = "Abstain",
    No = "No",
    Yes = "Yes"
}
export type Proposal = {
    __typename?: "Proposal";
    /** Block Number */
    created?: Maybe<Scalars["Int"]>;
    description?: Maybe<Scalars["String"]>;
    /** Block Number */
    expiration?: Maybe<Scalars["Int"]>;
    id: Scalars["ID"];
    isVerified?: Maybe<Scalars["Boolean"]>;
    /** Block Number */
    lastCall?: Maybe<Scalars["Int"]>;
    quorum?: Maybe<Scalars["String"]>;
    title?: Maybe<Scalars["String"]>;
    /** Block Number */
    unlock?: Maybe<Scalars["Int"]>;
    vote?: Maybe<Vote>;
    voterPower?: Maybe<VoterPower>;
    voterPowers?: Maybe<Array<Maybe<VoterPower>>>;
    votes?: Maybe<Array<Maybe<Vote>>>;
    votingContract: VotingContract;
};
export type ProposalVoteArgs = {
    voter: Scalars["ID"];
};
export type ProposalVoterPowerArgs = {
    voter: Scalars["ID"];
};
export type ProposalVoterPowersArgs = {
    voters: Array<Scalars["ID"]>;
};
export type ProposalVotesArgs = {
    voters: Array<Scalars["ID"]>;
};
export type Query = {
    __typename?: "Query";
    coreVoting?: Maybe<VotingContract>;
    gscVault?: Maybe<VotingVault>;
    gscVoting?: Maybe<VotingContract>;
    lockingVault?: Maybe<VotingVault>;
    vestingVault?: Maybe<VotingVault>;
};
export type TotalVotingPower = {
    __typename?: "TotalVotingPower";
    blockNumber: Scalars["Int"];
    value: Scalars["String"];
    votingVaults: Array<VotingVault>;
};
export type Vote = {
    __typename?: "Vote";
    castBallot?: Maybe<Ballot>;
    power: Scalars["String"];
    voter: Scalars["ID"];
};
export type VoterPower = {
    __typename?: "VoterPower";
    blockNumber: Scalars["Int"];
    isStale?: Maybe<Scalars["Boolean"]>;
    value: Scalars["String"];
    voter: Scalars["ID"];
    votingVaults: Array<VotingVault>;
};
export type VotingContract = {
    __typename?: "VotingContract";
    address: Scalars["ID"];
    name: Scalars["String"];
    proposal?: Maybe<Proposal>;
    proposals?: Maybe<Array<Maybe<Proposal>>>;
    totalVotingPower?: Maybe<TotalVotingPower>;
    voterPower?: Maybe<VoterPower>;
    voterPowers?: Maybe<Array<Maybe<VoterPower>>>;
    votingVaults: Array<VotingVault>;
};
export type VotingContractProposalArgs = {
    id: Scalars["ID"];
};
export type VotingContractProposalsArgs = {
    ids?: InputMaybe<Array<Scalars["ID"]>>;
    isVerified?: InputMaybe<Scalars["Boolean"]>;
};
export type VotingContractTotalVotingPowerArgs = {
    blockNumber?: InputMaybe<Scalars["Int"]>;
};
export type VotingContractVoterPowerArgs = {
    blockNumber?: InputMaybe<Scalars["Int"]>;
    voter: Scalars["ID"];
};
export type VotingContractVoterPowersArgs = {
    blockNumber?: InputMaybe<Scalars["Int"]>;
    voters: Array<Scalars["ID"]>;
};
export type VotingVault = {
    __typename?: "VotingVault";
    address: Scalars["ID"];
    name: Scalars["String"];
    totalVotingPower?: Maybe<TotalVotingPower>;
    voterPower?: Maybe<VoterPower>;
    voterPowers?: Maybe<Array<Maybe<VoterPower>>>;
};
export type VotingVaultTotalVotingPowerArgs = {
    blockNumber?: InputMaybe<Scalars["Int"]>;
};
export type VotingVaultVoterPowerArgs = {
    blockNumber?: InputMaybe<Scalars["Int"]>;
    voter: Scalars["ID"];
};
export type VotingVaultVoterPowersArgs = {
    blockNumber?: InputMaybe<Scalars["Int"]>;
    voters: Array<Scalars["ID"]>;
};
export type ResolverTypeWrapper<T> = Promise<T> | T;
export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;
export type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export type NextResolverFn<T> = () => Promise<T>;
export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    Ballot: Ballot;
    Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
    ID: ResolverTypeWrapper<Scalars["ID"]>;
    Int: ResolverTypeWrapper<Scalars["Int"]>;
    Proposal: ResolverTypeWrapper<Proposal>;
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars["String"]>;
    TotalVotingPower: ResolverTypeWrapper<TotalVotingPower>;
    Vote: ResolverTypeWrapper<Vote>;
    VoterPower: ResolverTypeWrapper<VoterPower>;
    VotingContract: ResolverTypeWrapper<VotingContract>;
    VotingVault: ResolverTypeWrapper<VotingVault>;
};
/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    Boolean: Scalars["Boolean"];
    ID: Scalars["ID"];
    Int: Scalars["Int"];
    Proposal: Proposal;
    Query: {};
    String: Scalars["String"];
    TotalVotingPower: TotalVotingPower;
    Vote: Vote;
    VoterPower: VoterPower;
    VotingContract: VotingContract;
    VotingVault: VotingVault;
};
export type ProposalResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes["Proposal"] = ResolversParentTypes["Proposal"]> = {
    created?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    description?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    expiration?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
    isVerified?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
    lastCall?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    quorum?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    unlock?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    vote?: Resolver<Maybe<ResolversTypes["Vote"]>, ParentType, ContextType, RequireFields<ProposalVoteArgs, "voter">>;
    voterPower?: Resolver<Maybe<ResolversTypes["VoterPower"]>, ParentType, ContextType, RequireFields<ProposalVoterPowerArgs, "voter">>;
    voterPowers?: Resolver<Maybe<Array<Maybe<ResolversTypes["VoterPower"]>>>, ParentType, ContextType, RequireFields<ProposalVoterPowersArgs, "voters">>;
    votes?: Resolver<Maybe<Array<Maybe<ResolversTypes["Vote"]>>>, ParentType, ContextType, RequireFields<ProposalVotesArgs, "voters">>;
    votingContract?: Resolver<ResolversTypes["VotingContract"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export type QueryResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]> = {
    coreVoting?: Resolver<Maybe<ResolversTypes["VotingContract"]>, ParentType, ContextType>;
    gscVault?: Resolver<Maybe<ResolversTypes["VotingVault"]>, ParentType, ContextType>;
    gscVoting?: Resolver<Maybe<ResolversTypes["VotingContract"]>, ParentType, ContextType>;
    lockingVault?: Resolver<Maybe<ResolversTypes["VotingVault"]>, ParentType, ContextType>;
    vestingVault?: Resolver<Maybe<ResolversTypes["VotingVault"]>, ParentType, ContextType>;
};
export type TotalVotingPowerResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes["TotalVotingPower"] = ResolversParentTypes["TotalVotingPower"]> = {
    blockNumber?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    value?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    votingVaults?: Resolver<Array<ResolversTypes["VotingVault"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export type VoteResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes["Vote"] = ResolversParentTypes["Vote"]> = {
    castBallot?: Resolver<Maybe<ResolversTypes["Ballot"]>, ParentType, ContextType>;
    power?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    voter?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export type VoterPowerResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes["VoterPower"] = ResolversParentTypes["VoterPower"]> = {
    blockNumber?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    isStale?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
    value?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    voter?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
    votingVaults?: Resolver<Array<ResolversTypes["VotingVault"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export type VotingContractResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes["VotingContract"] = ResolversParentTypes["VotingContract"]> = {
    address?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    proposal?: Resolver<Maybe<ResolversTypes["Proposal"]>, ParentType, ContextType, RequireFields<VotingContractProposalArgs, "id">>;
    proposals?: Resolver<Maybe<Array<Maybe<ResolversTypes["Proposal"]>>>, ParentType, ContextType, Partial<VotingContractProposalsArgs>>;
    totalVotingPower?: Resolver<Maybe<ResolversTypes["TotalVotingPower"]>, ParentType, ContextType, Partial<VotingContractTotalVotingPowerArgs>>;
    voterPower?: Resolver<Maybe<ResolversTypes["VoterPower"]>, ParentType, ContextType, RequireFields<VotingContractVoterPowerArgs, "voter">>;
    voterPowers?: Resolver<Maybe<Array<Maybe<ResolversTypes["VoterPower"]>>>, ParentType, ContextType, RequireFields<VotingContractVoterPowersArgs, "voters">>;
    votingVaults?: Resolver<Array<ResolversTypes["VotingVault"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export type VotingVaultResolvers<ContextType = ResolverContext, ParentType extends ResolversParentTypes["VotingVault"] = ResolversParentTypes["VotingVault"]> = {
    address?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    totalVotingPower?: Resolver<Maybe<ResolversTypes["TotalVotingPower"]>, ParentType, ContextType, Partial<VotingVaultTotalVotingPowerArgs>>;
    voterPower?: Resolver<Maybe<ResolversTypes["VoterPower"]>, ParentType, ContextType, RequireFields<VotingVaultVoterPowerArgs, "voter">>;
    voterPowers?: Resolver<Maybe<Array<Maybe<ResolversTypes["VoterPower"]>>>, ParentType, ContextType, RequireFields<VotingVaultVoterPowersArgs, "voters">>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};
export type Resolvers<ContextType = ResolverContext> = {
    Proposal?: ProposalResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    TotalVotingPower?: TotalVotingPowerResolvers<ContextType>;
    Vote?: VoteResolvers<ContextType>;
    VoterPower?: VoterPowerResolvers<ContextType>;
    VotingContract?: VotingContractResolvers<ContextType>;
    VotingVault?: VotingVaultResolvers<ContextType>;
};
export const councilSchema: import("graphql").GraphQLSchema;
export const councilGraph: Graph;

//# sourceMappingURL=main.d.ts.map
