import { ethers } from "ethers";
import { Logger } from "ethers/lib/utils";
import {
  GSCVault,
  IVotingVault,
  LockingVault,
  VestingVault,
} from "@elementfi/council-typechain";

type VotingVault = IVotingVault | VestingVault | LockingVault | GSCVault;

// TODO: implement Dataloader (https://github.com/graphql/dataloader)
export class VotingVaultContract {
  address: string;
  contract: VotingVault;

  constructor(address: string, contract: VotingVault) {
    this.address = address;
    this.contract = contract;
  }

  async getKickedEventArgs(
    fromBlock?: string | number,
    toBlock?: string | number,
  ): Promise<
    | {
        when: number;
        who: string;
      }[]
    | undefined
  > {
    if ("Kicked" in this.contract.filters) {
      const membershipProvedEvents = await this.contract.queryFilter(
        this.contract.filters.Kicked(),
        fromBlock,
        toBlock,
      );
      return membershipProvedEvents.map(({ args: { when, who } }) => {
        return {
          who,
          when: when.toNumber(),
        };
      });
    }
  }

  async getMembershipProvedEventArgs(
    fromBlock?: string | number,
    toBlock?: string | number,
  ): Promise<
    | {
        when: number;
        who: string;
      }[]
    | undefined
  > {
    if ("MembershipProved" in this.contract.filters) {
      const membershipProvedEvents = await this.contract.queryFilter(
        this.contract.filters.MembershipProved(),
        fromBlock,
        toBlock,
      );
      return membershipProvedEvents.map(({ args: { when, who } }) => {
        return {
          who,
          when: when.toNumber(),
        };
      });
    }
  }

  async getVoteChangeEventArgs(
    fromBlock?: string | number,
    toBlock?: string | number,
  ): Promise<
    | {
        from: string;
        to: string;
        amount: string;
      }[]
    | undefined
  > {
    if ("VoteChange" in this.contract.filters) {
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

  async getVotingPowerView(
    voter: string,
    blockNumber: number,
  ): Promise<string> {
    if ("queryVotePowerView" in this.contract.callStatic) {
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
        return "0";
      }
    }
    return this.getVotingPower(voter, blockNumber);
  }
}
