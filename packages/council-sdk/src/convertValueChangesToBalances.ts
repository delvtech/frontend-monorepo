import { ValueChange } from "src/ValueChange";
import { ValueOverPeriod } from "src/ValueOverPeriod";

/**
 * Converts from value changes to balances for all accounts for a given block period.
 * @param balancesAtStartBlockByAddress starting balances keyed by address
 * @param valueChangesByAddress value changes keyed by address
 * @param startBlock starting block of the period
 * @param endBlock ending block of the period
 * @returns an object of arrays of ValueOverPeriod's keyed by address
 */
export function convertValueChangesToBalancesForAllAccounts(
  balancesAtStartBlockByAddress: Record<string, bigint>,
  valueChangesByAddress: Record<string, ValueChange[]>,
  startBlock: number,
  endBlock: number,
): Record<string, ValueOverPeriod[]> {
  const balancesOverPeriod: Record<string, ValueOverPeriod[]> = {};

  for (const address in balancesAtStartBlockByAddress) {
    const valueChanges = valueChangesByAddress[address];

    // if there are no value changes, then obviously we just return the balance over the whole period
    if (!valueChanges) {
      balancesOverPeriod[address] = [
        {
          start: startBlock,
          end: endBlock,
          value: balancesAtStartBlockByAddress[address],
        },
      ];
      // otherwise, we need to convert value changes to balances
    } else {
      const startingBalance = balancesAtStartBlockByAddress[address];
      const balancesOverPeriodForUser = convertValueChangesToBalances(
        valueChanges,
        startingBalance,
        startBlock,
        endBlock,
      );
      balancesOverPeriod[address] = balancesOverPeriodForUser;
    }
  }

  return balancesOverPeriod;
}

/**
 * Converts from value changes (either increments or decrements) to values over time.  For example,
 * if there were 4 values changes +1, +1, -1, 1 with starting value of zero, we'd get back values
 * like 0, 1, 2, 1, 0.
 * @param valueChanges an array of incremental changes at blockstamps
 * @param startingBalance the starting value
 * @param startBlock
 * @param endBlock
 * @returns {ValueOverPeriod[]} An array of values and their block periods
 */
function convertValueChangesToBalances(
  valueChanges: ValueChange[],
  startingBalance: bigint,
  startBlock: number,
  endBlock: number,
): ValueOverPeriod[] {
  const balanceTimeBlocks: ValueOverPeriod[] = [];

  let balance = startingBalance;
  let start = startBlock;

  valueChanges.forEach(({ at, valueChange }) => {
    balanceTimeBlocks.push({
      value: balance,
      start,
      end: at,
    });

    balance = valueChange + balance;
    start = at;
  });

  balanceTimeBlocks.push({
    value: balance,
    start,
    end: endBlock,
  });

  return balanceTimeBlocks;
}
