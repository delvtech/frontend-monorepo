import { BaseContract, ethers } from "ethers";
import { Logger } from "ethers/lib/utils";
import { VoterWithPower, VotingVaultDataSource } from "./VotingVaultDataSource";

// TODO: implement Dataloader (https://github.com/graphql/dataloader)
export class VotingVaultContract implements VotingVaultDataSource {
  address: string;
  contract: BaseContract;

  constructor(address: string, contract: BaseContract) {
    this.address = address;
    this.contract = contract;
  }

  async getBalance(voter: string): Promise<string> {
    return "0";
  }

  async getVotingPower(voter: string, blockNumber: number): Promise<string> {
    try {
      // TODO: find a better solution for this.
      // ethers.js will spit out an error message that we can't disable without
      // turning off the logger. because the smart contract code for
      // queryVotePower returns an error if the account is not found, it can
      // flood the console with errors. this is a workaround until a better
      // solution is found.
      ethers.utils.Logger.setLogLevel(Logger.levels.OFF);
      const votePower = await this.contract.callStatic.queryVotePower(
        voter,
        blockNumber,
        "0x00",
      );
      ethers.utils.Logger.setLogLevel(Logger.levels.WARNING);
      return votePower.toString();
    } catch (error) {
      // TODO: how should dataSource errors be handled?
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    }
    return "0";
  }

  getVotingPowerView(voter: string, blockNumber: number): Promise<string> {
    return this.getVotingPower(voter, blockNumber);
  }

  async getAllVotersWithPower(): Promise<VoterWithPower[]> {
    return [];
  }
}
