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
const defaultOptions = {} as const;
// Generated on 2022-08-18T15:00:53-07:00

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BuySwapPreview = {
  __typename?: "BuySwapPreview";
  baseAssetAmountIn: Scalars["String"];
  principalTokenAmountOut: Scalars["String"];
  slippage?: Maybe<Scalars["Int"]>;
};

export type MultiPool = {
  __typename?: "MultiPool";
  address: Scalars["ID"];
  pool?: Maybe<Pool>;
  pools?: Maybe<Array<Maybe<Pool>>>;
  /** Possibly fetched from a registry */
  yieldSource?: Maybe<YieldSource>;
};

export type MultiPoolPoolArgs = {
  maturity: Scalars["String"];
};

export type MultiTerm = {
  __typename?: "MultiTerm";
  /** general lookup across terms for arbitrary helper functions, to be expanded */
  address: Scalars["ID"];
  /** The underlying token, sometimes referred to as base asset */
  baseAsset?: Maybe<Token>;
  perDayVolume?: Maybe<Scalars["String"]>;
  terms?: Maybe<Array<Maybe<Term>>>;
  /** scratch space: are these useful? */
  totalVolume?: Maybe<Scalars["String"]>;
  /** pretty sure this is useful */
  tvl?: Maybe<Scalars["String"]>;
  /** Possibly fetched from a registry */
  yieldSource?: Maybe<YieldSource>;
  yields?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type MultiTermTvlArgs = {
  atBlock?: InputMaybe<Scalars["Int"]>;
};

export type Pool = {
  __typename?: "Pool";
  baseAsset?: Maybe<Token>;
  baseAssetReserves?: Maybe<Scalars["String"]>;
  buyPreview?: Maybe<BuySwapPreview>;
  id: Scalars["ID"];
  lpToken?: Maybe<Token>;
  maturity: Scalars["String"];
  multiPool: MultiPool;
  price?: Maybe<Scalars["String"]>;
  priceFiat?: Maybe<Scalars["String"]>;
  principalToken?: Maybe<PrincipalToken>;
  principalTokenReserves?: Maybe<Scalars["String"]>;
  sellPreview?: Maybe<SellSwapPreview>;
  shareAsset?: Maybe<Token>;
  shareAssetReserves?: Maybe<Scalars["String"]>;
  term?: Maybe<Term>;
  tvl?: Maybe<Scalars["String"]>;
  yieldSource?: Maybe<YieldSource>;
};

export type PoolBuyPreviewArgs = {
  baseAssetAmountIn: Scalars["String"];
};

export type PoolSellPreviewArgs = {
  principalAmountTokenIn: Scalars["String"];
};

export type PrincipalToken = {
  __typename?: "PrincipalToken";
  address: Scalars["ID"];
  /**  the token this principal token will resolve 1 to 1 to. */
  baseAsset?: Maybe<Token>;
  maturity: Scalars["String"];
  /** price in terms of base asset or fiat */
  pool?: Maybe<Pool>;
  tokenId: Scalars["ID"];
};

export type Query = {
  __typename?: "Query";
  multiPool?: Maybe<MultiPool>;
  /** Look up the multi term contract for a given yield source, eg: Yearn USDC Vault */
  multiTerm?: Maybe<MultiTerm>;
  multiTerms: Array<Maybe<MultiTerm>>;
  /** Look up the pool for a given maturity date */
  pool?: Maybe<Pool>;
  pools?: Maybe<Array<Maybe<Pool>>>;
  term?: Maybe<Term>;
  terms?: Maybe<Array<Maybe<Term>>>;
};

export type QueryMultiPoolArgs = {
  yieldSource: Scalars["ID"];
};

export type QueryMultiTermArgs = {
  address?: InputMaybe<Scalars["ID"]>;
  yieldSource?: InputMaybe<Scalars["ID"]>;
};

export type QueryMultiTermsArgs = {
  addresses?: InputMaybe<Array<Scalars["ID"]>>;
  baseAsset?: InputMaybe<Array<Scalars["ID"]>>;
  yieldSources?: InputMaybe<Array<Scalars["ID"]>>;
};

export type QueryPoolArgs = {
  maturity: Scalars["String"];
  multiPool: Scalars["ID"];
};

export type QueryPoolsArgs = {
  multiPool: Scalars["ID"];
};

export type QueryTermArgs = {
  maturity: Scalars["String"];
  multiTerm: Scalars["ID"];
};

export type QueryTermsArgs = {
  baseAssets?: InputMaybe<Array<Scalars["ID"]>>;
  holders?: InputMaybe<Array<Scalars["ID"]>>;
  multiTerms?: InputMaybe<Array<Scalars["ID"]>>;
  timeRemaining?: InputMaybe<Scalars["String"]>;
  yieldSources?: InputMaybe<Array<Scalars["ID"]>>;
};

export type SellSwapPreview = {
  __typename?: "SellSwapPreview";
  baseAssetAmountOut: Scalars["String"];
  principalTokenAmountIn: Scalars["String"];
  slippage?: Maybe<Scalars["Int"]>;
};

export type Term = {
  __typename?: "Term";
  baseAsset?: Maybe<Token>;
  /** Block Int the term was created at */
  createdAtBlock?: Maybe<Scalars["Int"]>;
  /** Timestamp in milliseconds since unix epoch */
  createdTimestamp?: Maybe<Scalars["Int"]>;
  fixedAPR?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  /** Timestamp in milliseconds since unix epoch */
  maturity: Scalars["String"];
  multiTerm: MultiTerm;
  name: Scalars["String"];
  pool?: Maybe<Pool>;
  principalToken?: Maybe<PrincipalToken>;
  /** Dollar amount of deposits into the term: union(mint,LP) */
  tvl?: Maybe<Scalars["String"]>;
  variableAPY?: Maybe<Scalars["Int"]>;
  /** Possibly fetched from a registry */
  yieldSource?: Maybe<YieldSource>;
  /** startDate must be between created and maturity */
  yieldToken?: Maybe<YieldToken>;
};

export type TermTvlArgs = {
  atBlock?: InputMaybe<Scalars["Int"]>;
};

export type TermYieldTokenArgs = {
  startDate: Scalars["String"];
};

export type Token = {
  __typename?: "Token";
  address: Scalars["ID"];
  decimals: Scalars["Int"];
  price?: Maybe<Scalars["String"]>;
  symbol: Scalars["String"];
};

export type YieldSource = {
  __typename?: "YieldSource";
  address: Scalars["ID"];
  name: Scalars["String"];
  /** placeholder for more yield source specific data */
  pricePerShare?: Maybe<Scalars["String"]>;
  protocol: Scalars["String"];
};

export type YieldToken = {
  __typename?: "YieldToken";
  accruedInterest?: Maybe<Scalars["String"]>;
  address: Scalars["ID"];
  maturity: Scalars["String"];
  startDate: Scalars["String"];
  tokenId: Scalars["ID"];
};

export type FilteredTermsQueryVariables = Exact<{
  multiTermAddresses?: InputMaybe<Array<Scalars["ID"]> | Scalars["ID"]>;
  baseAssetAddresses?: InputMaybe<Array<Scalars["ID"]> | Scalars["ID"]>;
  yieldSourceAddresses?: InputMaybe<Array<Scalars["ID"]> | Scalars["ID"]>;
  timeRemaining?: InputMaybe<Scalars["String"]>;
  holders?: InputMaybe<Array<Scalars["ID"]> | Scalars["ID"]>;
}>;

export type FilteredTermsQuery = {
  __typename?: "Query";
  terms?: Array<{
    __typename?: "Term";
    id: string;
    maturity: string;
    variableAPY?: number | null;
    fixedAPR?: number | null;
    tvl?: string | null;
    yieldSource?: {
      __typename?: "YieldSource";
      address: string;
      protocol: string;
    } | null;
    baseAsset?: { __typename?: "Token"; symbol: string } | null;
  } | null> | null;
};

export const FilteredTermsDocument = gql`
  query FilteredTerms(
    $multiTermAddresses: [ID!]
    $baseAssetAddresses: [ID!]
    $yieldSourceAddresses: [ID!]
    $timeRemaining: String
    $holders: [ID!]
  ) {
    terms(
      multiTerms: $multiTermAddresses
      baseAssets: $baseAssetAddresses
      yieldSources: $yieldSourceAddresses
      timeRemaining: $timeRemaining
      holders: $holders
    ) {
      id
      yieldSource {
        address
        protocol
      }
      baseAsset {
        symbol
      }
      maturity
      variableAPY
      fixedAPR
      tvl
    }
  }
`;

/**
 * __useFilteredTermsQuery__
 *
 * To run a query within a React component, call `useFilteredTermsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilteredTermsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilteredTermsQuery({
 *   variables: {
 *      multiTermAddresses: // value for 'multiTermAddresses'
 *      baseAssetAddresses: // value for 'baseAssetAddresses'
 *      yieldSourceAddresses: // value for 'yieldSourceAddresses'
 *      timeRemaining: // value for 'timeRemaining'
 *      holders: // value for 'holders'
 *   },
 * });
 */
export function useFilteredTermsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    FilteredTermsQuery,
    FilteredTermsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FilteredTermsQuery, FilteredTermsQueryVariables>(
    FilteredTermsDocument,
    options,
  );
}
export function useFilteredTermsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FilteredTermsQuery,
    FilteredTermsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FilteredTermsQuery, FilteredTermsQueryVariables>(
    FilteredTermsDocument,
    options,
  );
}
export type FilteredTermsQueryHookResult = ReturnType<
  typeof useFilteredTermsQuery
>;
export type FilteredTermsLazyQueryHookResult = ReturnType<
  typeof useFilteredTermsLazyQuery
>;
export type FilteredTermsQueryResult = Apollo.QueryResult<
  FilteredTermsQuery,
  FilteredTermsQueryVariables
>;
