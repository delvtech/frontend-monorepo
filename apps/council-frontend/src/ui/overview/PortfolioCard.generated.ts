import * as Types from "../../graphql/generated/graphql.d";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

/* eslint-disable */
// NOTE: This is a generated file and should not be edited directly.
// To edit this file, modify the @element/graphql codegen script.

const defaultOptions = {} as const;
// Generated on 2022-07-18T11:18:53-05:00

export type GetPortfolioCardDataQueryVariables = Types.Exact<{
  coreVotingAddress: Types.Scalars["ID"];
  account: Types.Scalars["ID"];
}>;

export type GetPortfolioCardDataQuery = {
  __typename?: "Query";
  votingContract?: {
    __typename?: "VotingContract";
    balance?: string | null;
    votingPower?: { __typename?: "VotingPower"; value: string } | null;
  } | null;
};

export const GetPortfolioCardDataDocument = gql`
  query GetPortfolioCardData($coreVotingAddress: ID!, $account: ID!) {
    votingContract(address: $coreVotingAddress) {
      balance(voter: $account)
      votingPower(voter: $account) {
        value
      }
    }
  }
`;

/**
 * __useGetPortfolioCardDataQuery__
 *
 * To run a query within a React component, call `useGetPortfolioCardDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPortfolioCardDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPortfolioCardDataQuery({
 *   variables: {
 *      coreVotingAddress: // value for 'coreVotingAddress'
 *      account: // value for 'account'
 *   },
 * });
 */
export function useGetPortfolioCardDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPortfolioCardDataQuery,
    GetPortfolioCardDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetPortfolioCardDataQuery,
    GetPortfolioCardDataQueryVariables
  >(GetPortfolioCardDataDocument, options);
}
export function useGetPortfolioCardDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPortfolioCardDataQuery,
    GetPortfolioCardDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetPortfolioCardDataQuery,
    GetPortfolioCardDataQueryVariables
  >(GetPortfolioCardDataDocument, options);
}
export type GetPortfolioCardDataQueryHookResult = ReturnType<
  typeof useGetPortfolioCardDataQuery
>;
export type GetPortfolioCardDataLazyQueryHookResult = ReturnType<
  typeof useGetPortfolioCardDataLazyQuery
>;
export type GetPortfolioCardDataQueryResult = Apollo.QueryResult<
  GetPortfolioCardDataQuery,
  GetPortfolioCardDataQueryVariables
>;
