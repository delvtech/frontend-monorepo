import { ERC20__factory } from "@elementfi/core-typechain/dist/libraries";
import { Provider } from "@ethersproject/providers";
import { constants } from "ethers";

import { ValueChange } from "src/ValueChange";

/**
 * Fetches all transactions for an ERC20 and convets them to value changes over a block period.  A
 * single transaction between accounts will create two value changes, a negative one for the sender
 * and a positive one for the receiver.  Note that the zero address and the token address itself are
 * ignored.
 * @param balancesAtStartBlock An addressed keyed object of all holders of a token at the beginning
 * of the period.
 * @param tokenAddress Address of the token to fetch values for.
 * @param startBlock Starting block (inclusive) to fetch value changes for.
 * @param endBlock Ending block (inclusive) to fetch value changes for.  'latest' will fetch until
 * the latest block.
 * @param provider An ethereum node provider.
 * @returns {Promise<Record<string, ValueChange[]>>} Returns an address keyed record of value
 * changes of the block period.
 */
export async function fetchValueChangesForERC20(
  tokenAddress: string,
  startBlock: number,
  endBlock: number | "latest",
  provider: Provider,
): Promise<Record<string, ValueChange[]>> {
  const tokenContract = ERC20__factory.connect(tokenAddress, provider);
  const transfersQueryFilter = tokenContract.filters.Transfer();

  const results = await tokenContract.queryFilter(
    transfersQueryFilter,
    startBlock,
    endBlock,
  );

  const resultsByAddress: Record<string, ValueChange[]> = {};

  results.forEach((result) => {
    const { args, blockNumber } = result;
    if (!args) {
      return;
    }
    const [from, to, value] = args;
    const amount = BigInt(value.toString());
    const valueChangeTo: ValueChange = { valueChange: amount, at: blockNumber };
    const valueChangeFrom: ValueChange = {
      // if an accounts transfer from, that subtracts from their balance.
      valueChange: amount * BigInt("-1"),
      at: blockNumber,
    };

    if (resultsByAddress[to]) {
      resultsByAddress[to].push(valueChangeTo);
    } else {
      resultsByAddress[to] = [valueChangeTo];
    }

    if (resultsByAddress[from]) {
      resultsByAddress[from].push(valueChangeFrom);
    } else {
      resultsByAddress[from] = [valueChangeFrom];
    }

    // we don't want to tally the zero address balance
    if (resultsByAddress[constants.AddressZero]) {
      delete resultsByAddress[constants.AddressZero];
    }

    // we also don't want to tally the token's own balance
    if (resultsByAddress[tokenAddress]) {
      delete resultsByAddress[tokenAddress];
    }
  });

  return resultsByAddress;
}
