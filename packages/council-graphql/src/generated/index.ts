import { GraphQLResolveInfo } from "graphql";
import { ResolverContext } from "@elementfi/graphql";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

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
const defaultOptions = {} as const;
// Generated on 2022-06-17T16:06:29-07:00

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
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  quorum?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  verified?: Maybe<Scalars["Boolean"]>;
  vote?: Maybe<Vote>;
  votingContract: Scalars["ID"];
};

export type ProposalVoteArgs = {
  voter: Scalars["ID"];
};

/**
 * CoreVoting
 * - holds the proposals
 * - allows you to create a proposal
 * - maintains a whitelist of approved voting vaults
 * - Has events for seeing the list of votes (voting power + ballot) that have been cast)
 * - has vote(votingVaults[], proposalId) method
 *
 * GSCVoting
 * - holds the proposals that gsc votes on
 * - allows you to create a proposal
 * - has a single approved voting vault, aka LockingVault
 * - Has events for seeing the list of votes (voting power + ballot) that have been cast)
 * - has vote(votingVaults[], proposalId) method
 *
 *
 * VotingVault
 * (ie: LockingVault, VestingVault)
 * - allows you to deposit your ELFI token, giving you voting power in the vault
 * - can define the behavior for calculating how much voting power the depositer into the vault receives
 *     - eg, LockingVault defines delegation capabilities, where 1 ELFI = 1 Vote power
 *     - eg, VestingVault defines delegation too, but 1 ELFI = 0.25 VP
 */
export type Query = {
  __typename?: "Query";
  coreVoting?: Maybe<VotingContract>;
  gscVoting?: Maybe<VotingContract>;
  ping?: Maybe<Scalars["String"]>;
};

export type Vote = {
  __typename?: "Vote";
  castBallot?: Maybe<Ballot>;
  votingPower?: Maybe<Scalars["String"]>;
};

export type VotingContract = {
  __typename?: "VotingContract";
  address: Scalars["ID"];
  proposal?: Maybe<Proposal>;
  proposals?: Maybe<Array<Maybe<Proposal>>>;
  votingVaults?: Maybe<Array<Maybe<VotingVault>>>;
};

export type VotingContractProposalArgs = {
  id: Scalars["ID"];
};

export type VotingContractProposalsArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]>>;
  verified?: InputMaybe<Scalars["Boolean"]>;
};

export type VotingVault = {
  __typename?: "VotingVault";
  address: Scalars["ID"];
  votePower?: Maybe<Scalars["String"]>;
};

export type VotingVaultVotePowerArgs = {
  blockNumber?: InputMaybe<Scalars["Int"]>;
  voter: Scalars["ID"];
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
  Vote: ResolverTypeWrapper<Vote>;
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
  Vote: Vote;
  VotingContract: VotingContract;
  VotingVault: VotingVault;
};

export type ProposalResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Proposal"] = ResolversParentTypes["Proposal"],
> = {
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  quorum?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  verified?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType
  >;
  vote?: Resolver<
    Maybe<ResolversTypes["Vote"]>,
    ParentType,
    ContextType,
    RequireFields<ProposalVoteArgs, "voter">
  >;
  votingContract?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  coreVoting?: Resolver<
    Maybe<ResolversTypes["VotingContract"]>,
    ParentType,
    ContextType
  >;
  gscVoting?: Resolver<
    Maybe<ResolversTypes["VotingContract"]>,
    ParentType,
    ContextType
  >;
  ping?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
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
  votingPower?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
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
  votingVaults?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["VotingVault"]>>>,
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
  votePower?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<VotingVaultVotePowerArgs, "voter">
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ResolverContext> = {
  Proposal?: ProposalResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Vote?: VoteResolvers<ContextType>;
  VotingContract?: VotingContractResolvers<ContextType>;
  VotingVault?: VotingVaultResolvers<ContextType>;
};

export type PingQueryVariables = Exact<{ [key: string]: never }>;

export type PingQuery = { __typename?: "Query"; ping?: string | null };

export const PingDocument = gql`
  query Ping {
    ping
  }
`;

/**
 * __usePingQuery__
 *
 * To run a query within a React component, call `usePingQuery` and pass it any options that fit your needs.
 * When your component renders, `usePingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePingQuery({
 *   variables: {
 *   },
 * });
 */
export function usePingQuery(
  baseOptions?: Apollo.QueryHookOptions<PingQuery, PingQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PingQuery, PingQueryVariables>(PingDocument, options);
}
export function usePingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PingQuery, PingQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PingQuery, PingQueryVariables>(
    PingDocument,
    options,
  );
}
export type PingQueryHookResult = ReturnType<typeof usePingQuery>;
export type PingLazyQueryHookResult = ReturnType<typeof usePingLazyQuery>;
export type PingQueryResult = Apollo.QueryResult<PingQuery, PingQueryVariables>;
