import * as Types from "../../graphql/generated/graphql.d";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

/* eslint-disable */
// NOTE: This is a generated file and should not be edited directly.
// To edit this file, modify the @element/graphql codegen script.

const defaultOptions = {} as const;
// Generated on 2022-07-14T13:31:03-05:00

export type GetSummaryCardsDataQueryVariables = Types.Exact<{
  contract: Types.Scalars["ID"];
}>;

export type GetSummaryCardsDataQuery = {
  __typename?: "Query";
  votingContract?: {
    __typename?: "VotingContract";
    proposalCount?: number | null;
    voterCount?: number | null;
  } | null;
};

export const GetSummaryCardsDataDocument = gql`
  query GetSummaryCardsData($contract: ID!) {
    votingContract(address: $contract) {
      proposalCount(isActive: true)
      voterCount
    }
  }
`;

/**
 * __useGetSummaryCardsDataQuery__
 *
 * To run a query within a React component, call `useGetSummaryCardsDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSummaryCardsDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSummaryCardsDataQuery({
 *   variables: {
 *      contract: // value for 'contract'
 *   },
 * });
 */
export function useGetSummaryCardsDataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSummaryCardsDataQuery,
    GetSummaryCardsDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSummaryCardsDataQuery,
    GetSummaryCardsDataQueryVariables
  >(GetSummaryCardsDataDocument, options);
}
export function useGetSummaryCardsDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSummaryCardsDataQuery,
    GetSummaryCardsDataQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSummaryCardsDataQuery,
    GetSummaryCardsDataQueryVariables
  >(GetSummaryCardsDataDocument, options);
}
export type GetSummaryCardsDataQueryHookResult = ReturnType<
  typeof useGetSummaryCardsDataQuery
>;
export type GetSummaryCardsDataLazyQueryHookResult = ReturnType<
  typeof useGetSummaryCardsDataLazyQuery
>;
export type GetSummaryCardsDataQueryResult = Apollo.QueryResult<
  GetSummaryCardsDataQuery,
  GetSummaryCardsDataQueryVariables
>;
