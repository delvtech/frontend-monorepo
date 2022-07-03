import {
  GSCVault,
  IVotingVault,
  LockingVault,
  VestingVault,
} from "@elementfi/council-typechain";
import { ethers } from "ethers";
import { Logger } from "ethers/lib/utils";

type VotingVault = IVotingVault | VestingVault | LockingVault | GSCVault;

// TODO: implement Dataloader (https://github.com/graphql/dataloader)
export default class VotingVaultContract {
  address: string;
  contract: VotingVault;

  constructor(address: string, contract: VotingVault) {
    this.address = address;
    this.contract = contract;
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
      return "0";
    }
  }
}
