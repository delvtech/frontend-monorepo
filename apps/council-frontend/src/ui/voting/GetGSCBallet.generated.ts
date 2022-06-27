import * as Types from 'src/graphql/generated/graphql.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

/* eslint-disable */
// NOTE: This is a generated file and should not be edited directly.
// To edit this file, modify the @element/graphql codegen script.

const defaultOptions = {} as const;
// Generated on 2022-06-16T11:56:26-07:00

export type GetGscBallotQueryVariables = Types.Exact<{
  account: Types.Scalars['ID'];
  proposalId: Types.Scalars['ID'];
}>;


export type GetGscBallotQuery = { __typename?: 'Query', proposal?: { __typename?: 'Proposal', proposalId: string, votes: Array<{ __typename?: 'Vote', votingPower?: string | null, castBallot?: Types.Ballot | null } | null> } | null };


export const GetGscBallotDocument = gql`
    query GetGSCBallot($account: ID!, $proposalId: ID!) {
  proposal(proposalId: $proposalId) {
    proposalId
    votes(walletAddress: $account) {
      votingPower
      castBallot
    }
  }
}
    `;

/**
 * __useGetGscBallotQuery__
 *
 * To run a query within a React component, call `useGetGscBallotQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGscBallotQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGscBallotQuery({
 *   variables: {
 *      account: // value for 'account'
 *      proposalId: // value for 'proposalId'
 *   },
 * });
 */
export function useGetGscBallotQuery(baseOptions: Apollo.QueryHookOptions<GetGscBallotQuery, GetGscBallotQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGscBallotQuery, GetGscBallotQueryVariables>(GetGscBallotDocument, options);
      }
export function useGetGscBallotLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGscBallotQuery, GetGscBallotQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGscBallotQuery, GetGscBallotQueryVariables>(GetGscBallotDocument, options);
        }
export type GetGscBallotQueryHookResult = ReturnType<typeof useGetGscBallotQuery>;
export type GetGscBallotLazyQueryHookResult = ReturnType<typeof useGetGscBallotLazyQuery>;
export type GetGscBallotQueryResult = Apollo.QueryResult<GetGscBallotQuery, GetGscBallotQueryVariables>;