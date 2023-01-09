import { useQuery } from "react-query";

import {
  LockingVault,
  OptimisticRewards,
  VestingVault,
} from "@elementfi/council-typechain";
import { formatEther } from "@ethersproject/units";
import { BytesLike, ethers } from "ethers";
import { Logger } from "ethers/lib/utils";

import { useLatestBlockNumber } from "src/ui/ethereum/useLatestBlockNumber";
import { defaultProvider } from "src/providers/providers";

/**
 * Use this to get the current vote power.
 *
 * Voting power can go stale if the current block is beyond the staleBlockLag +
 * atBlockNumber. In the case of stale voting power, this will return "0".
 */
export function useQueryVotePower(
  account: string | undefined | null,
  vaultContract: LockingVault | VestingVault | OptimisticRewards,
  atBlockNumber?: number,
  extraData?: BytesLike,
): string {
  // TODO: use useSmartContractReadCall when onError is overridable and when we can disable ethers
  // logging
  const { data: votePower } = useQuery({
    queryKey: ["queryVotePower", account, vaultContract.address, atBlockNumber],
    queryFn: async () => {
      try {
        let blockNumber = atBlockNumber;
        if (atBlockNumber === undefined) {
          blockNumber = await defaultProvider.getBlockNumber();
        }
        // TODO: find a better solution for this.
        // ethers.js will spit out an error message that we can't disable without turning off the
        // logger.  because the smart contract code for queryVotePower returns an error if the
        // account is not found, it can flood the console with errors.  this is a workaround until a
        // better solution is found.
        ethers.utils.Logger.setLogLevel(Logger.levels.OFF);
        const votePower = await vaultContract.callStatic.queryVotePower(
          account as string,
          blockNumber as number,
          extraData as BytesLike,
        );
        ethers.utils.Logger.setLogLevel(Logger.levels.WARNING);
        return votePower;
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error(error);
        }
      }
    },
    /* We want to cache the previous stale data until a refresh.
      This boolean prevents data from being kept when account is disconnected */
    keepPreviousData: !!account,
    enabled: !!account && !!extraData,
    staleTime: Infinity,
  });

  return formatEther(votePower || 0);
}

/**
 * Use this to get the historical voting power.
 *
 * This does not take into account whether or not the voting power is stale.
 */
export function useQueryVotePowerView(
  account: string | undefined | null,
  vaultContract: LockingVault | VestingVault,
  atBlockNumber?: number,
): string {
  // TODO: use useSmartContractReadCall when onError is overridable and when we can disable ethers
  // logging
  const { data: votePower } = useQuery({
    queryKey: ["queryVotePower", account, vaultContract.address, atBlockNumber],
    queryFn: async () => {
      try {
        let blockNumber = atBlockNumber;
        if (atBlockNumber === undefined) {
          blockNumber = await defaultProvider.getBlockNumber();
        }

        // TODO: find a better solution for this.
        // ethers.js will spit out an error message that we can't disable without turning off the
        // logger.  because the smart contract code for queryVotePower returns an error if the
        // account is not found, it can flood the console with errors.  this is a workaround until a
        // better solution is found.
        ethers.utils.Logger.setLogLevel(Logger.levels.OFF);
        const votePower = await vaultContract.callStatic.queryVotePowerView(
          account as string,
          blockNumber as number,
        );
        ethers.utils.Logger.setLogLevel(Logger.levels.WARNING);
        return votePower;
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error(error);
        }
      }
    },
    /* We want to cache the previous stale data until a refresh.
      This boolean prevents data from being kept when account is disconnected */
    keepPreviousData: !!account,
    enabled: !!account,
    staleTime: Infinity,
  });

  return formatEther(votePower || 0);
}
