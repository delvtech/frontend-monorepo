/* eslint-disable */
// NOTE: This is a generated file and should not be edited directly.
// To edit this file, modify /.graphqlrc and run the build:graphql npm script.
import { GraphQLResolveInfo } from "graphql";
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
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
// Generated on 2022-05-24T11:46:56-05:00

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
  token?: Maybe<Token>;
};

export type Query = {
  __typename?: "Query";
  ping?: Maybe<Scalars["String"]>;
  pool: Pool;
  pools: Array<Pool>;
  token: Token;
  tokens: Array<Token>;
};

export type QueryPoolArgs = {
  address: Scalars["ID"];
};

export type QueryPoolsArgs = {
  addresses: Array<Scalars["ID"]>;
};

export type QueryTokenArgs = {
  address: Scalars["ID"];
};

export type QueryTokensArgs = {
  addresses: Array<Scalars["ID"]>;
};

export type Token = {
  __typename?: "Token";
  address: Scalars["ID"];
  chainId?: Maybe<Scalars["Int"]>;
  decimals?: Maybe<Scalars["Int"]>;
  logoURI?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  symbol?: Maybe<Scalars["String"]>;
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
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
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Token: ResolverTypeWrapper<Token>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars["Boolean"];
  ID: Scalars["ID"];
  Int: Scalars["Int"];
  Pool: Pool;
  Query: {};
  String: Scalars["String"];
  Token: Token;
};

export type PoolResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Pool"] = ResolversParentTypes["Pool"],
> = {
  address?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes["Token"]>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  ping?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  pool?: Resolver<
    ResolversTypes["Pool"],
    ParentType,
    ContextType,
    RequireFields<QueryPoolArgs, "address">
  >;
  pools?: Resolver<
    Array<ResolversTypes["Pool"]>,
    ParentType,
    ContextType,
    RequireFields<QueryPoolsArgs, "addresses">
  >;
  token?: Resolver<
    ResolversTypes["Token"],
    ParentType,
    ContextType,
    RequireFields<QueryTokenArgs, "address">
  >;
  tokens?: Resolver<
    Array<ResolversTypes["Token"]>,
    ParentType,
    ContextType,
    RequireFields<QueryTokensArgs, "addresses">
  >;
};

export type TokenResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Token"] = ResolversParentTypes["Token"],
> = {
  address?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  chainId?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  decimals?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  logoURI?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  symbol?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  tags?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Pool?: PoolResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
};

export type AllTokenFieldsFragment = {
  __typename?: "Token";
  address: string;
  symbol?: string | null;
  chainId?: number | null;
  name?: string | null;
  decimals?: number | null;
  logoURI?: string | null;
  tags?: Array<string | null> | null;
};

export type GetTokenQueryVariables = Exact<{
  address: Scalars["ID"];
}>;

export type GetTokenQuery = {
  __typename?: "Query";
  token: {
    __typename?: "Token";
    address: string;
    symbol?: string | null;
    chainId?: number | null;
    name?: string | null;
    decimals?: number | null;
    logoURI?: string | null;
    tags?: Array<string | null> | null;
  };
};

export type GetTokensQueryVariables = Exact<{
  addresses: Array<Scalars["ID"]> | Scalars["ID"];
}>;

export type GetTokensQuery = {
  __typename?: "Query";
  tokens: Array<{
    __typename?: "Token";
    address: string;
    symbol?: string | null;
    chainId?: number | null;
    name?: string | null;
    decimals?: number | null;
    logoURI?: string | null;
    tags?: Array<string | null> | null;
  }>;
};

export const AllTokenFieldsFragmentDoc = gql`
  fragment allTokenFields on Token {
    address
    symbol
    chainId
    name
    decimals
    logoURI
    tags
  }
`;
export const GetTokenDocument = gql`
  query GetToken($address: ID!) {
    token(address: $address) {
      ...allTokenFields
    }
  }
  ${AllTokenFieldsFragmentDoc}
`;

/**
 * __useGetTokenQuery__
 *
 * To run a query within a React component, call `useGetTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokenQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useGetTokenQuery(
  baseOptions: Apollo.QueryHookOptions<GetTokenQuery, GetTokenQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTokenQuery, GetTokenQueryVariables>(
    GetTokenDocument,
    options,
  );
}
export function useGetTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTokenQuery,
    GetTokenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTokenQuery, GetTokenQueryVariables>(
    GetTokenDocument,
    options,
  );
}
export type GetTokenQueryHookResult = ReturnType<typeof useGetTokenQuery>;
export type GetTokenLazyQueryHookResult = ReturnType<
  typeof useGetTokenLazyQuery
>;
export type GetTokenQueryResult = Apollo.QueryResult<
  GetTokenQuery,
  GetTokenQueryVariables
>;
export const GetTokensDocument = gql`
  query GetTokens($addresses: [ID!]!) {
    tokens(addresses: $addresses) {
      ...allTokenFields
    }
  }
  ${AllTokenFieldsFragmentDoc}
`;

/**
 * __useGetTokensQuery__
 *
 * To run a query within a React component, call `useGetTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTokensQuery({
 *   variables: {
 *      addresses: // value for 'addresses'
 *   },
 * });
 */
export function useGetTokensQuery(
  baseOptions: Apollo.QueryHookOptions<GetTokensQuery, GetTokensQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetTokensQuery, GetTokensQueryVariables>(
    GetTokensDocument,
    options,
  );
}
export function useGetTokensLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetTokensQuery,
    GetTokensQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetTokensQuery, GetTokensQueryVariables>(
    GetTokensDocument,
    options,
  );
}
export type GetTokensQueryHookResult = ReturnType<typeof useGetTokensQuery>;
export type GetTokensLazyQueryHookResult = ReturnType<
  typeof useGetTokensLazyQuery
>;
export type GetTokensQueryResult = Apollo.QueryResult<
  GetTokensQuery,
  GetTokensQueryVariables
>;
