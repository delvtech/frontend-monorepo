import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

/* eslint-disable */
// NOTE: This is a generated file and should not be edited directly.
// To edit this file, modify the @element/graphql codegen script.

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
// Generated on 2022-07-28T13:38:46-05:00

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum Ballot {
  Abstain = 'Abstain',
  No = 'No',
  Yes = 'Yes'
}

export type Proposal = {
  __typename?: 'Proposal';
  /** Block Number */
  created: Scalars['Int'];
  /** Block Number */
  expiration: Scalars['Int'];
  id: Scalars['ID'];
  /**
   * Proposals are active during their voting period, i.e., from creation block up
   * to expiration block. This will be false if the current block is later than the
   * proposal's expiration.
   */
  isActive: Scalars['Boolean'];
  isExecuted?: Maybe<Scalars['Boolean']>;
  /** Block Number */
  lastCall?: Maybe<Scalars['Int']>;
  quorum?: Maybe<Scalars['String']>;
  /** Block Number */
  unlock: Scalars['Int'];
  vote?: Maybe<Vote>;
  voterCount?: Maybe<Scalars['Int']>;
  voters?: Maybe<Array<Maybe<Voter>>>;
  votes?: Maybe<Array<Maybe<Vote>>>;
  votingContract: VotingContract;
  votingPower?: Maybe<VotingPower>;
  votingPowers?: Maybe<Array<Maybe<VotingPower>>>;
};


export type ProposalVoteArgs = {
  voter: Scalars['ID'];
};


export type ProposalVotesArgs = {
  voters?: InputMaybe<Array<Scalars['ID']>>;
};


export type ProposalVotingPowerArgs = {
  voter: Scalars['ID'];
};


export type ProposalVotingPowersArgs = {
  voters?: InputMaybe<Array<Scalars['ID']>>;
};

export type Query = {
  __typename?: 'Query';
  voter?: Maybe<Voter>;
  voters?: Maybe<Array<Maybe<Voter>>>;
  votingContract?: Maybe<VotingContract>;
  votingContracts?: Maybe<Array<Maybe<VotingContract>>>;
  votingVault?: Maybe<VotingVault>;
  votingVaults?: Maybe<Array<Maybe<VotingVault>>>;
};


export type QueryVoterArgs = {
  address: Scalars['ID'];
};


export type QueryVotersArgs = {
  addresses?: InputMaybe<Array<Scalars['ID']>>;
};


export type QueryVotingContractArgs = {
  address: Scalars['ID'];
};


export type QueryVotingContractsArgs = {
  addresses?: InputMaybe<Array<Scalars['ID']>>;
};


export type QueryVotingVaultArgs = {
  address: Scalars['ID'];
};


export type QueryVotingVaultsArgs = {
  addresses?: InputMaybe<Array<Scalars['ID']>>;
};

export type TotalVotingPower = {
  __typename?: 'TotalVotingPower';
  blockNumber: Scalars['Int'];
  value: Scalars['String'];
  votingVaults: Array<VotingVault>;
};

export type Vote = {
  __typename?: 'Vote';
  castBallot?: Maybe<Ballot>;
  power: Scalars['String'];
  proposal: Proposal;
  voter: Voter;
};

export type Voter = {
  __typename?: 'Voter';
  address: Scalars['ID'];
  balance?: Maybe<Scalars['String']>;
  balances?: Maybe<Array<Maybe<Scalars['String']>>>;
  vote?: Maybe<Vote>;
  votes?: Maybe<Array<Maybe<Vote>>>;
  votingPower?: Maybe<VotingPower>;
  votingPowers?: Maybe<Array<Maybe<VotingPower>>>;
};


export type VoterBalanceArgs = {
  votingVault: Scalars['ID'];
};


export type VoterBalancesArgs = {
  votingVaults: Array<Scalars['ID']>;
};


export type VoterVoteArgs = {
  proposal: Scalars['ID'];
  votingContract: Scalars['ID'];
};


export type VoterVotesArgs = {
  proposals: Array<Scalars['ID']>;
  votingContract: Scalars['ID'];
};


export type VoterVotingPowerArgs = {
  blockNumber?: InputMaybe<Scalars['Int']>;
  votingVault: Scalars['ID'];
};


export type VoterVotingPowersArgs = {
  blockNumber?: InputMaybe<Scalars['Int']>;
  votingVaults: Array<Scalars['ID']>;
};

export type VotingContract = {
  __typename?: 'VotingContract';
  address: Scalars['ID'];
  balance?: Maybe<Scalars['String']>;
  proposal?: Maybe<Proposal>;
  proposalCount?: Maybe<Scalars['Int']>;
  proposals?: Maybe<Array<Maybe<Proposal>>>;
  totalVotingPower?: Maybe<TotalVotingPower>;
  voterCount?: Maybe<Scalars['Int']>;
  voters?: Maybe<Array<Maybe<Voter>>>;
  votingPower?: Maybe<VotingPower>;
  votingPowers?: Maybe<Array<Maybe<VotingPower>>>;
  votingVaults: Array<VotingVault>;
};


export type VotingContractBalanceArgs = {
  voter: Scalars['ID'];
};


export type VotingContractProposalArgs = {
  id: Scalars['ID'];
};


export type VotingContractProposalCountArgs = {
  isActive?: InputMaybe<Scalars['Boolean']>;
};


export type VotingContractProposalsArgs = {
  ids?: InputMaybe<Array<Scalars['ID']>>;
  isActive?: InputMaybe<Scalars['Boolean']>;
};


export type VotingContractTotalVotingPowerArgs = {
  blockNumber?: InputMaybe<Scalars['Int']>;
};


export type VotingContractVotingPowerArgs = {
  blockNumber?: InputMaybe<Scalars['Int']>;
  voter: Scalars['ID'];
};


export type VotingContractVotingPowersArgs = {
  blockNumber?: InputMaybe<Scalars['Int']>;
  voters?: InputMaybe<Array<Scalars['ID']>>;
};

export type VotingPower = {
  __typename?: 'VotingPower';
  blockNumber: Scalars['Int'];
  isStale?: Maybe<Scalars['Boolean']>;
  value: Scalars['String'];
  voter: Voter;
  votingVaults: Array<VotingVault>;
};

export type VotingVault = {
  __typename?: 'VotingVault';
  address: Scalars['ID'];
  balance?: Maybe<Scalars['String']>;
  totalVotingPower?: Maybe<TotalVotingPower>;
  voterCount?: Maybe<Scalars['Int']>;
  voters?: Maybe<Array<Maybe<Voter>>>;
  votingPower?: Maybe<VotingPower>;
  votingPowers?: Maybe<Array<Maybe<VotingPower>>>;
};


export type VotingVaultBalanceArgs = {
  voter: Scalars['ID'];
};


export type VotingVaultTotalVotingPowerArgs = {
  blockNumber?: InputMaybe<Scalars['Int']>;
};


export type VotingVaultVotingPowerArgs = {
  blockNumber?: InputMaybe<Scalars['Int']>;
  voter: Scalars['ID'];
};


export type VotingVaultVotingPowersArgs = {
  blockNumber?: InputMaybe<Scalars['Int']>;
  voters?: InputMaybe<Array<Scalars['ID']>>;
};

export type GetPortfolioCardDataQueryVariables = Exact<{
  coreVotingAddress: Scalars['ID'];
  account: Scalars['ID'];
}>;


export type GetPortfolioCardDataQuery = { __typename?: 'Query', votingContract?: { __typename?: 'VotingContract', balance?: string | null, votingPower?: { __typename?: 'VotingPower', value: string } | null } | null };

export type GetSummaryCardsDataQueryVariables = Exact<{
  contract: Scalars['ID'];
}>;


export type GetSummaryCardsDataQuery = { __typename?: 'Query', votingContract?: { __typename?: 'VotingContract', proposalCount?: number | null, voterCount?: number | null } | null };


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
export function useGetPortfolioCardDataQuery(baseOptions: Apollo.QueryHookOptions<GetPortfolioCardDataQuery, GetPortfolioCardDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPortfolioCardDataQuery, GetPortfolioCardDataQueryVariables>(GetPortfolioCardDataDocument, options);
      }
export function useGetPortfolioCardDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPortfolioCardDataQuery, GetPortfolioCardDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPortfolioCardDataQuery, GetPortfolioCardDataQueryVariables>(GetPortfolioCardDataDocument, options);
        }
export type GetPortfolioCardDataQueryHookResult = ReturnType<typeof useGetPortfolioCardDataQuery>;
export type GetPortfolioCardDataLazyQueryHookResult = ReturnType<typeof useGetPortfolioCardDataLazyQuery>;
export type GetPortfolioCardDataQueryResult = Apollo.QueryResult<GetPortfolioCardDataQuery, GetPortfolioCardDataQueryVariables>;
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
export function useGetSummaryCardsDataQuery(baseOptions: Apollo.QueryHookOptions<GetSummaryCardsDataQuery, GetSummaryCardsDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSummaryCardsDataQuery, GetSummaryCardsDataQueryVariables>(GetSummaryCardsDataDocument, options);
      }
export function useGetSummaryCardsDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSummaryCardsDataQuery, GetSummaryCardsDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSummaryCardsDataQuery, GetSummaryCardsDataQueryVariables>(GetSummaryCardsDataDocument, options);
        }
export type GetSummaryCardsDataQueryHookResult = ReturnType<typeof useGetSummaryCardsDataQuery>;
export type GetSummaryCardsDataLazyQueryHookResult = ReturnType<typeof useGetSummaryCardsDataLazyQuery>;
export type GetSummaryCardsDataQueryResult = Apollo.QueryResult<GetSummaryCardsDataQuery, GetSummaryCardsDataQueryVariables>;