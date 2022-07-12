import { BaseContract } from "ethers";

export interface VoterWithPower {
  voter: string;
  power: string;
}

export interface VotingVaultDataSource {
  address: string;
  contract: BaseContract;
  getVotingPower: (voter: string, blockNumber: number) => Promise<string>;
  getVotingPowerView: (voter: string, blockNumber: number) => Promise<string>;
  getAllVotersWithPower: (
    fromBlock?: string | number,
    toBlock?: string | number,
  ) => Promise<VoterWithPower[]>;
}
