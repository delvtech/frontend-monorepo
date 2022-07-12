import { GraphQLResolveInfo } from "graphql";
import { ResolverContext } from "@elementfi/graphql";
import { gql } from "@apollo/client";

/* eslint-disable */
// NOTE: This is a generated file and should not be edited directly.
// To edit this file, modify the @element/graphql codegen script.

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
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
// Generated on 2022-07-12T01:57:40-05:00

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
  Yes = "Yes",
}

export type Proposal = {
  __typename?: "Proposal";
  /** Block Number */
  created: Scalars["Int"];
  /** Block Number */
  expiration: Scalars["Int"];
  id: Scalars["ID"];
  isActive: Scalars["Boolean"];
  isExecuted?: Maybe<Scalars["Boolean"]>;
  /** Block Number */
  lastCall?: Maybe<Scalars["Int"]>;
  quorum?: Maybe<Scalars["String"]>;
  /** Block Number */
  unlock: Scalars["Int"];
  vote?: Maybe<Vote>;
  voters?: Maybe<Array<Maybe<Voter>>>;
  votes?: Maybe<Array<Maybe<Vote>>>;
  votingContract: VotingContract;
  votingPower?: Maybe<VotingPower>;
  votingPowers?: Maybe<Array<Maybe<VotingPower>>>;
};

export type ProposalVoteArgs = {
  voter: Scalars["ID"];
};

export type ProposalVotesArgs = {
  voters?: InputMaybe<Array<Scalars["ID"]>>;
};

export type ProposalVotingPowerArgs = {
  voter: Scalars["ID"];
};

export type ProposalVotingPowersArgs = {
  voters?: InputMaybe<Array<Scalars["ID"]>>;
};

export type Query = {
  __typename?: "Query";
  voter?: Maybe<Voter>;
  voters?: Maybe<Array<Maybe<Voter>>>;
  votingContract?: Maybe<VotingContract>;
  votingContracts?: Maybe<Array<Maybe<VotingContract>>>;
  votingVault?: Maybe<VotingVault>;
  votingVaults?: Maybe<Array<Maybe<VotingVault>>>;
};

export type QueryVoterArgs = {
  address: Scalars["ID"];
};

export type QueryVotersArgs = {
  addresses?: InputMaybe<Array<Scalars["ID"]>>;
};

export type QueryVotingContractArgs = {
  address: Scalars["ID"];
};

export type QueryVotingContractsArgs = {
  addresses?: InputMaybe<Array<Scalars["ID"]>>;
};

export type QueryVotingVaultArgs = {
  address: Scalars["ID"];
};

export type QueryVotingVaultsArgs = {
  addresses?: InputMaybe<Array<Scalars["ID"]>>;
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
  proposal: Proposal;
  voter: Voter;
};

export type Voter = {
  __typename?: "Voter";
  address: Scalars["ID"];
  vote?: Maybe<Vote>;
  votes?: Maybe<Array<Maybe<Vote>>>;
  votingPower?: Maybe<VotingPower>;
  votingPowers?: Maybe<Array<Maybe<VotingPower>>>;
};

export type VoterVoteArgs = {
  proposal: Scalars["ID"];
  votingContract: Scalars["ID"];
};

export type VoterVotesArgs = {
  proposals: Array<Scalars["ID"]>;
  votingContract: Scalars["ID"];
};

export type VoterVotingPowerArgs = {
  blockNumber?: InputMaybe<Scalars["Int"]>;
  votingVault: Scalars["ID"];
};

export type VoterVotingPowersArgs = {
  blockNumber?: InputMaybe<Scalars["Int"]>;
  votingVaults: Array<Scalars["ID"]>;
};

export type VotingContract = {
  __typename?: "VotingContract";
  address: Scalars["ID"];
  proposal?: Maybe<Proposal>;
  proposals?: Maybe<Array<Maybe<Proposal>>>;
  totalVotingPower?: Maybe<TotalVotingPower>;
  voters?: Maybe<Array<Maybe<Voter>>>;
  votingPower?: Maybe<VotingPower>;
  votingPowers?: Maybe<Array<Maybe<VotingPower>>>;
  votingVaults: Array<VotingVault>;
};

export type VotingContractProposalArgs = {
  id: Scalars["ID"];
};

export type VotingContractProposalsArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]>>;
};

export type VotingContractTotalVotingPowerArgs = {
  blockNumber?: InputMaybe<Scalars["Int"]>;
};

export type VotingContractVotingPowerArgs = {
  blockNumber?: InputMaybe<Scalars["Int"]>;
  voter: Scalars["ID"];
};

export type VotingContractVotingPowersArgs = {
  blockNumber?: InputMaybe<Scalars["Int"]>;
  voters?: InputMaybe<Array<Scalars["ID"]>>;
};

export type VotingPower = {
  __typename?: "VotingPower";
  blockNumber: Scalars["Int"];
  isStale?: Maybe<Scalars["Boolean"]>;
  value: Scalars["String"];
  voter: Voter;
  votingVaults: Array<VotingVault>;
};

export type VotingVault = {
  __typename?: "VotingVault";
  address: Scalars["ID"];
  totalVotingPower?: Maybe<TotalVotingPower>;
  voters?: Maybe<Array<Maybe<Voter>>>;
  votingPower?: Maybe<VotingPower>;
  votingPowers?: Maybe<Array<Maybe<VotingPower>>>;
};

export type VotingVaultTotalVotingPowerArgs = {
  blockNumber?: InputMaybe<Scalars["Int"]>;
};

export type VotingVaultVotingPowerArgs = {
  blockNumber?: InputMaybe<Scalars["Int"]>;
  voter: Scalars["ID"];
};

export type VotingVaultVotingPowersArgs = {
  blockNumber?: InputMaybe<Scalars["Int"]>;
  voters?: InputMaybe<Array<Scalars["ID"]>>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

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
  Voter: ResolverTypeWrapper<Voter>;
  VotingContract: ResolverTypeWrapper<VotingContract>;
  VotingPower: ResolverTypeWrapper<VotingPower>;
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
  Voter: Voter;
  VotingContract: VotingContract;
  VotingPower: VotingPower;
  VotingVault: VotingVault;
};

export type ProposalResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Proposal"] = ResolversParentTypes["Proposal"],
> = {
  created?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  expiration?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  isActive?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  isExecuted?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  lastCall?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  quorum?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  unlock?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  vote?: Resolver<
    Maybe<ResolversTypes["Vote"]>,
    ParentType,
    ContextType,
    RequireFields<ProposalVoteArgs, "voter">
  >;
  voters?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Voter"]>>>,
    ParentType,
    ContextType
  >;
  votes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Vote"]>>>,
    ParentType,
    ContextType,
    Partial<ProposalVotesArgs>
  >;
  votingContract?: Resolver<
    ResolversTypes["VotingContract"],
    ParentType,
    ContextType
  >;
  votingPower?: Resolver<
    Maybe<ResolversTypes["VotingPower"]>,
    ParentType,
    ContextType,
    RequireFields<ProposalVotingPowerArgs, "voter">
  >;
  votingPowers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VotingPower"]>>>,
    ParentType,
    ContextType,
    Partial<ProposalVotingPowersArgs>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  voter?: Resolver<
    Maybe<ResolversTypes["Voter"]>,
    ParentType,
    ContextType,
    RequireFields<QueryVoterArgs, "address">
  >;
  voters?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Voter"]>>>,
    ParentType,
    ContextType,
    Partial<QueryVotersArgs>
  >;
  votingContract?: Resolver<
    Maybe<ResolversTypes["VotingContract"]>,
    ParentType,
    ContextType,
    RequireFields<QueryVotingContractArgs, "address">
  >;
  votingContracts?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VotingContract"]>>>,
    ParentType,
    ContextType,
    Partial<QueryVotingContractsArgs>
  >;
  votingVault?: Resolver<
    Maybe<ResolversTypes["VotingVault"]>,
    ParentType,
    ContextType,
    RequireFields<QueryVotingVaultArgs, "address">
  >;
  votingVaults?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VotingVault"]>>>,
    ParentType,
    ContextType,
    Partial<QueryVotingVaultsArgs>
  >;
};

export type TotalVotingPowerResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["TotalVotingPower"] = ResolversParentTypes["TotalVotingPower"],
> = {
  blockNumber?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  value?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  votingVaults?: Resolver<
    Array<ResolversTypes["VotingVault"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoteResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Vote"] = ResolversParentTypes["Vote"],
> = {
  castBallot?: Resolver<
    Maybe<ResolversTypes["Ballot"]>,
    ParentType,
    ContextType
  >;
  power?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  proposal?: Resolver<ResolversTypes["Proposal"], ParentType, ContextType>;
  voter?: Resolver<ResolversTypes["Voter"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VoterResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Voter"] = ResolversParentTypes["Voter"],
> = {
  address?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  vote?: Resolver<
    Maybe<ResolversTypes["Vote"]>,
    ParentType,
    ContextType,
    RequireFields<VoterVoteArgs, "proposal" | "votingContract">
  >;
  votes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Vote"]>>>,
    ParentType,
    ContextType,
    RequireFields<VoterVotesArgs, "proposals" | "votingContract">
  >;
  votingPower?: Resolver<
    Maybe<ResolversTypes["VotingPower"]>,
    ParentType,
    ContextType,
    RequireFields<VoterVotingPowerArgs, "votingVault">
  >;
  votingPowers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VotingPower"]>>>,
    ParentType,
    ContextType,
    RequireFields<VoterVotingPowersArgs, "votingVaults">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VotingContractResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["VotingContract"] = ResolversParentTypes["VotingContract"],
> = {
  address?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  proposal?: Resolver<
    Maybe<ResolversTypes["Proposal"]>,
    ParentType,
    ContextType,
    RequireFields<VotingContractProposalArgs, "id">
  >;
  proposals?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Proposal"]>>>,
    ParentType,
    ContextType,
    Partial<VotingContractProposalsArgs>
  >;
  totalVotingPower?: Resolver<
    Maybe<ResolversTypes["TotalVotingPower"]>,
    ParentType,
    ContextType,
    Partial<VotingContractTotalVotingPowerArgs>
  >;
  voters?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Voter"]>>>,
    ParentType,
    ContextType
  >;
  votingPower?: Resolver<
    Maybe<ResolversTypes["VotingPower"]>,
    ParentType,
    ContextType,
    RequireFields<VotingContractVotingPowerArgs, "voter">
  >;
  votingPowers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VotingPower"]>>>,
    ParentType,
    ContextType,
    Partial<VotingContractVotingPowersArgs>
  >;
  votingVaults?: Resolver<
    Array<ResolversTypes["VotingVault"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VotingPowerResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["VotingPower"] = ResolversParentTypes["VotingPower"],
> = {
  blockNumber?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  isStale?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  voter?: Resolver<ResolversTypes["Voter"], ParentType, ContextType>;
  votingVaults?: Resolver<
    Array<ResolversTypes["VotingVault"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VotingVaultResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["VotingVault"] = ResolversParentTypes["VotingVault"],
> = {
  address?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  totalVotingPower?: Resolver<
    Maybe<ResolversTypes["TotalVotingPower"]>,
    ParentType,
    ContextType,
    Partial<VotingVaultTotalVotingPowerArgs>
  >;
  voters?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Voter"]>>>,
    ParentType,
    ContextType
  >;
  votingPower?: Resolver<
    Maybe<ResolversTypes["VotingPower"]>,
    ParentType,
    ContextType,
    RequireFields<VotingVaultVotingPowerArgs, "voter">
  >;
  votingPowers?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VotingPower"]>>>,
    ParentType,
    ContextType,
    Partial<VotingVaultVotingPowersArgs>
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ResolverContext> = {
  Proposal?: ProposalResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  TotalVotingPower?: TotalVotingPowerResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
  Voter?: VoterResolvers<ContextType>;
  VotingContract?: VotingContractResolvers<ContextType>;
  VotingPower?: VotingPowerResolvers<ContextType>;
  VotingVault?: VotingVaultResolvers<ContextType>;
};
