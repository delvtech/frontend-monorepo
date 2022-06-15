import { ValueChange } from "src/ValueChange";
import { calculateTimeWeightedValue } from "src/calculateTimeWeightedValue";
import { convertValueChangesToBalancesForAllAccounts } from "src/convertValueChangesToBalances";

export function calculateRewards(
  balancesAtStartBlock: Record<string, bigint>,
  valueChanges: Record<string, ValueChange[]>,
  startBlock: number,
  endBlock: number,
  rewardsForPeriod: bigint,
): Record<string, bigint> {
  const balancesByAddress = convertValueChangesToBalancesForAllAccounts(
    balancesAtStartBlock,
    valueChanges,
    startBlock,
    endBlock,
  );

  const balanceAveragesByAddress: Record<string, bigint> = {};
  let total = BigInt(0);

  for (const address in balancesByAddress) {
    const balances = balancesByAddress[address];
    const timeWeightedAverage = calculateTimeWeightedValue(
      balances,
      startBlock,
      endBlock,
    );

    balanceAveragesByAddress[address] = timeWeightedAverage;
    total += timeWeightedAverage;
  }

  const rewardsPerAddress: Record<string, bigint> = {};
  for (const address in balanceAveragesByAddress) {
    rewardsPerAddress[address] =
      (balanceAveragesByAddress[address] * rewardsForPeriod) / total;
  }

  return rewardsPerAddress;
}
