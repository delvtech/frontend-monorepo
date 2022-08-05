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
// Generated on 2022-07-14T15:15:30-05:00

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Pool = {
  __typename?: "Pool";
  address: Scalars["ID"];
  /** Num of principal or umbrella tokens */
  bondReserves: Scalars["Int"];
  currentPricePerShare: Scalars["String"];
  /** Dollar amount in fees accumulated on trades */
  fees?: Maybe<Scalars["String"]>;
  initialPricePerShare: Scalars["String"];
  /** Num of base asset tokens */
  shareReserves: Scalars["Int"];
  /** Price of bond asset in terms of share asset, eg: 0.95 USDC for 1 ptUSDC */
  spotPrice?: Maybe<Scalars["String"]>;
  timeStretch: Scalars["String"];
  /** num milliseconds until term maturity */
  timeUntilMaturity: Scalars["Int"];
  totalSupply: Scalars["String"];
  /** Dollar amount traded in the pool */
  tradingVolume?: Maybe<Scalars["String"]>;
  yieldSource: YieldSource;
};

export type PoolFeesArgs = {
  fromBlock?: InputMaybe<Scalars["Int"]>;
  toBlock?: InputMaybe<Scalars["Int"]>;
};

export type PoolSpotPriceArgs = {
  atBlock?: InputMaybe<Scalars["Int"]>;
};

export type PoolTradingVolumeArgs = {
  fromBlock?: InputMaybe<Scalars["Int"]>;
  toBlock?: InputMaybe<Scalars["Int"]>;
};

export type Protocol = {
  __typename?: "Protocol";
  /** Yearn */
  name: Scalars["ID"];
  yieldSources?: Maybe<Array<Maybe<YieldSource>>>;
};

export type Query = {
  __typename?: "Query";
  pool?: Maybe<Pool>;
  pools?: Maybe<Array<Maybe<Pool>>>;
  protocols?: Maybe<Protocol>;
  term?: Maybe<Term>;
  terms?: Maybe<Array<Maybe<Term>>>;
  umbrella?: Maybe<UmbrellaTerm>;
  umbrellas?: Maybe<Array<Maybe<UmbrellaTerm>>>;
  yieldSource?: Maybe<YieldSource>;
  yieldSources?: Maybe<Array<Maybe<YieldSource>>>;
};

export type QueryPoolArgs = {
  address: Scalars["ID"];
};

export type QueryPoolsArgs = {
  addresses?: InputMaybe<Array<Scalars["ID"]>>;
};

export type QueryProtocolsArgs = {
  names?: InputMaybe<Array<Scalars["ID"]>>;
};

export type QueryTermArgs = {
  address: Scalars["String"];
};

export type QueryTermsArgs = {
  addresses?: InputMaybe<Array<Scalars["String"]>>;
  created?: InputMaybe<Scalars["Int"]>;
  maturity?: InputMaybe<Scalars["Int"]>;
};

export type QueryUmbrellaArgs = {
  address: Scalars["ID"];
};

export type QueryUmbrellasArgs = {
  addresses?: InputMaybe<Array<Scalars["ID"]>>;
};

export type QueryYieldSourceArgs = {
  address: Scalars["ID"];
};

export type QueryYieldSourcesArgs = {
  addresses?: InputMaybe<Array<Scalars["ID"]>>;
};

export type Term = {
  __typename?: "Term";
  address: Scalars["ID"];
  baseAsset?: Maybe<Token>;
  /** Block Int the term was created at */
  createdAtBlock?: Maybe<Scalars["Int"]>;
  /** Timestamp in milliseconds since unix epoch */
  createdTimestamp?: Maybe<Scalars["Int"]>;
  /** Timestamp in milliseconds since unix epoch */
  maturity?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  pool?: Maybe<Pool>;
  principalToken?: Maybe<Token>;
  /** Dollar amount of deposits into the term */
  tvl?: Maybe<Scalars["String"]>;
  yieldSource?: Maybe<YieldSource>;
  yieldToken?: Maybe<Token>;
};

export type Token = {
  __typename?: "Token";
  address: Scalars["ID"];
  decimals?: Maybe<Scalars["Int"]>;
  price?: Maybe<Scalars["String"]>;
  symbol: Scalars["String"];
};

export type UmbrellaTerm = {
  __typename?: "UmbrellaTerm";
  address: Scalars["ID"];
  baseAsset?: Maybe<Token>;
  name: Scalars["String"];
  terms?: Maybe<Array<Maybe<Term>>>;
  /** Dollar amount of deposits into all terms */
  tvl?: Maybe<Scalars["String"]>;
};

/** TODO: Review 4626 standard */
export type YieldSource = {
  __typename?: "YieldSource";
  address: Scalars["ID"];
  /** APY of the underlying yield source */
  apy?: Maybe<Scalars["Int"]>;
  baseAssets?: Maybe<Array<Maybe<Token>>>;
  /** Name of the yield source, eg: Yearn Vault Dai v2 */
  name: Scalars["String"];
  /** Get the price of a vault token in terms of any of the base assets */
  pricePerShare?: Maybe<Scalars["String"]>;
  pricePerShares?: Maybe<Array<Maybe<Scalars["String"]>>>;
  protocol?: Maybe<Protocol>;
  terms?: Maybe<Array<Maybe<Term>>>;
  /** TVL of the yield source (in dollars) */
  tvl?: Maybe<Scalars["Int"]>;
};

/** TODO: Review 4626 standard */
export type YieldSourcePricePerShareArgs = {
  tokenOut: Scalars["String"];
};

/** TODO: Review 4626 standard */
export type YieldSourcePricePerSharesArgs = {
  tokensOut?: InputMaybe<Array<Scalars["String"]>>;
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
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Pool: ResolverTypeWrapper<Pool>;
  Protocol: ResolverTypeWrapper<Protocol>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Term: ResolverTypeWrapper<Term>;
  Token: ResolverTypeWrapper<Token>;
  UmbrellaTerm: ResolverTypeWrapper<UmbrellaTerm>;
  YieldSource: ResolverTypeWrapper<YieldSource>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  Pool: Pool;
  Protocol: Protocol;
  Query: {};
  String: Scalars["String"];
  Term: Term;
  Token: Token;
  UmbrellaTerm: UmbrellaTerm;
  YieldSource: YieldSource;
};

export type PoolResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Pool"] = ResolversParentTypes["Pool"],
> = {
  address?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  bondReserves?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  currentPricePerShare?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  fees?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    Partial<PoolFeesArgs>
  >;
  initialPricePerShare?: Resolver<
    ResolversTypes["String"],
    ParentType,
    ContextType
  >;
  shareReserves?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  spotPrice?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    Partial<PoolSpotPriceArgs>
  >;
  timeStretch?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  timeUntilMaturity?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  totalSupply?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tradingVolume?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    Partial<PoolTradingVolumeArgs>
  >;
  yieldSource?: Resolver<
    ResolversTypes["YieldSource"],
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProtocolResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Protocol"] = ResolversParentTypes["Protocol"],
> = {
  name?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  yieldSources?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["YieldSource"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  pool?: Resolver<
    Maybe<ResolversTypes["Pool"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPoolArgs, "address">
  >;
  pools?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Pool"]>>>,
    ParentType,
    ContextType,
    Partial<QueryPoolsArgs>
  >;
  protocols?: Resolver<
    Maybe<ResolversTypes["Protocol"]>,
    ParentType,
    ContextType,
    Partial<QueryProtocolsArgs>
  >;
  term?: Resolver<
    Maybe<ResolversTypes["Term"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTermArgs, "address">
  >;
  terms?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Term"]>>>,
    ParentType,
    ContextType,
    Partial<QueryTermsArgs>
  >;
  umbrella?: Resolver<
    Maybe<ResolversTypes["UmbrellaTerm"]>,
    ParentType,
    ContextType,
    RequireFields<QueryUmbrellaArgs, "address">
  >;
  umbrellas?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["UmbrellaTerm"]>>>,
    ParentType,
    ContextType,
    Partial<QueryUmbrellasArgs>
  >;
  yieldSource?: Resolver<
    Maybe<ResolversTypes["YieldSource"]>,
    ParentType,
    ContextType,
    RequireFields<QueryYieldSourceArgs, "address">
  >;
  yieldSources?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["YieldSource"]>>>,
    ParentType,
    ContextType,
    Partial<QueryYieldSourcesArgs>
  >;
};

export type TermResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Term"] = ResolversParentTypes["Term"],
> = {
  address?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  baseAsset?: Resolver<Maybe<ResolversTypes["Token"]>, ParentType, ContextType>;
  createdAtBlock?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  createdTimestamp?: Resolver<
    Maybe<ResolversTypes["Int"]>,
    ParentType,
    ContextType
  >;
  maturity?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  pool?: Resolver<Maybe<ResolversTypes["Pool"]>, ParentType, ContextType>;
  principalToken?: Resolver<
    Maybe<ResolversTypes["Token"]>,
    ParentType,
    ContextType
  >;
  tvl?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  yieldSource?: Resolver<
    Maybe<ResolversTypes["YieldSource"]>,
    ParentType,
    ContextType
  >;
  yieldToken?: Resolver<
    Maybe<ResolversTypes["Token"]>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["Token"] = ResolversParentTypes["Token"],
> = {
  address?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  decimals?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  symbol?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UmbrellaTermResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["UmbrellaTerm"] = ResolversParentTypes["UmbrellaTerm"],
> = {
  address?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  baseAsset?: Resolver<Maybe<ResolversTypes["Token"]>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  terms?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Term"]>>>,
    ParentType,
    ContextType
  >;
  tvl?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type YieldSourceResolvers<
  ContextType = ResolverContext,
  ParentType extends ResolversParentTypes["YieldSource"] = ResolversParentTypes["YieldSource"],
> = {
  address?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  apy?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  baseAssets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Token"]>>>,
    ParentType,
    ContextType
  >;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  pricePerShare?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType,
    RequireFields<YieldSourcePricePerShareArgs, "tokenOut">
  >;
  pricePerShares?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType,
    Partial<YieldSourcePricePerSharesArgs>
  >;
  protocol?: Resolver<
    Maybe<ResolversTypes["Protocol"]>,
    ParentType,
    ContextType
  >;
  terms?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Term"]>>>,
    ParentType,
    ContextType
  >;
  tvl?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = ResolverContext> = {
  Pool?: PoolResolvers<ContextType>;
  Protocol?: ProtocolResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Term?: TermResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
  UmbrellaTerm?: UmbrellaTermResolvers<ContextType>;
  YieldSource?: YieldSourceResolvers<ContextType>;
};
