
/* eslint-disable */
// NOTE: This is a generated file and should not be edited directly.
// To edit this file, modify the @element/graphql codegen script.

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
// Generated on 2022-06-16T11:56:26-07:00

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export enum Ballot {
  Abstain = 'ABSTAIN',
  No = 'NO',
  Yes = 'YES'
}

export type Proposal = {
  __typename?: 'Proposal';
  proposalId: Scalars['ID'];
  votes: Array<Maybe<Vote>>;
};


export type ProposalVotesArgs = {
  walletAddress: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  ping?: Maybe<Scalars['String']>;
  proposal?: Maybe<Proposal>;
};


export type QueryProposalArgs = {
  proposalId: Scalars['ID'];
};

export type Vote = {
  __typename?: 'Vote';
  castBallot?: Maybe<Ballot>;
  votingPower?: Maybe<Scalars['String']>;
};
