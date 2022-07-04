import { ethers } from "ethers";
import { Logger } from "ethers/lib/utils";
import { Provider } from "@ethersproject/providers";
import {
  LockingVault,
  LockingVault__factory,
} from "@elementfi/council-typechain";
import VotingVaultContract from "./VotingVaultContract";

// TODO: implement Dataloader (https://github.com/graphql/dataloader)
export default class LockingVaultContract extends VotingVaultContract {
  contract: LockingVault;

  constructor(address: string, provider: Provider) {
    const contract = LockingVault__factory.connect(address, provider);
    super(address, contract);
    this.contract = contract;
  }

  async getVoteChangeEventArgs(
    fromBlock?: string | number,
    toBlock?: string | number,
  ) {
    const voteChangeEvents = await this.contract.queryFilter(
      this.contract.filters.VoteChange(),
      fromBlock,
      toBlock,
    );
    return voteChangeEvents.map(({ args: { from, to, amount } }) => {
      return {
        from,
        to,
        amount: amount.toString(),
      };
    });
  }

  async getVotingPowerView(voter: string, blockNumber: number) {
    try {
      // TODO: find a better solution for this.
      // ethers.js will spit out an error message that we can't disable without turning off the
      // logger.  because the smart contract code for queryVotePower returns an error if the
      // account is not found, it can flood the console with errors.  this is a workaround until a
      // better solution is found.
      ethers.utils.Logger.setLogLevel(Logger.levels.OFF);
      const votePower = await this.contract.callStatic.queryVotePowerView(
        voter,
        blockNumber,
      );
      ethers.utils.Logger.setLogLevel(Logger.levels.WARNING);
      return votePower.toString();
    } catch (error) {
      // TODO: how should dataSource errors be handled?
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    }
  }
}
