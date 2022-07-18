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
// Generated on 2022-07-18T11:18:53-05:00

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
  /**
   * Proposals are active during their voting period, i.e., from creation block up
   * to expiration block. This will be false if the current block is later than the
   * proposal's expiration.
   */
  isActive: Scalars["Boolean"];
  isExecuted?: Maybe<Scalars["Boolean"]>;
  /** Block Number */
  lastCall?: Maybe<Scalars["Int"]>;
  quorum?: Maybe<Scalars["String"]>;
  /** Block Number */
  unlock: Scalars["Int"];
  vote?: Maybe<Vote>;
  voterCount?: Maybe<Scalars["Int"]>;
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
  balance?: Maybe<Scalars["String"]>;
  balances?: Maybe<Array<Maybe<Scalars["String"]>>>;
  vote?: Maybe<Vote>;
  votes?: Maybe<Array<Maybe<Vote>>>;
  votingPower?: Maybe<VotingPower>;
  votingPowers?: Maybe<Array<Maybe<VotingPower>>>;
};

export type VoterBalanceArgs = {
  votingVault: Scalars["ID"];
};

export type VoterBalancesArgs = {
  votingVaults: Array<Scalars["ID"]>;
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
  balance?: Maybe<Scalars["String"]>;
  proposal?: Maybe<Proposal>;
  proposalCount?: Maybe<Scalars["Int"]>;
  proposals?: Maybe<Array<Maybe<Proposal>>>;
  totalVotingPower?: Maybe<TotalVotingPower>;
  voterCount?: Maybe<Scalars["Int"]>;
  voters?: Maybe<Array<Maybe<Voter>>>;
  votingPower?: Maybe<VotingPower>;
  votingPowers?: Maybe<Array<Maybe<VotingPower>>>;
  votingVaults: Array<VotingVault>;
};

export type VotingContractBalanceArgs = {
  voter: Scalars["ID"];
};

export type VotingContractProposalArgs = {
  id: Scalars["ID"];
};

export type VotingContractProposalCountArgs = {
  isActive?: InputMaybe<Scalars["Boolean"]>;
};

export type VotingContractProposalsArgs = {
  ids?: InputMaybe<Array<Scalars["ID"]>>;
  isActive?: InputMaybe<Scalars["Boolean"]>;
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
  balance?: Maybe<Scalars["String"]>;
  totalVotingPower?: Maybe<TotalVotingPower>;
  voterCount?: Maybe<Scalars["Int"]>;
  voters?: Maybe<Array<Maybe<Voter>>>;
  votingPower?: Maybe<VotingPower>;
  votingPowers?: Maybe<Array<Maybe<VotingPower>>>;
};

export type VotingVaultBalanceArgs = {
  voter: Scalars["ID"];
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
