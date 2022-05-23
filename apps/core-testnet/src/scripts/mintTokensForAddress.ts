import { parseUnits } from "ethers/lib/utils";

import { USDC } from "src/types/USDC";
import { WETH } from "src/types/WETH";

const defaultOptions = {
  tokens: [],
  amounts: "1000000",
};

export async function mintTokensForAddress(
  elementAddress: string,
  options: {
    tokens: (WETH | USDC)[];
    amounts?: string | string[];
  },
): Promise<void[]> {
  const finalOptions = { ...defaultOptions, ...options };
  const { tokens } = finalOptions;
  let { amounts } = finalOptions;
  if (!Array.isArray(amounts)) {
    amounts = tokens.map(() => amounts) as string[];
  }

  const transactions = await Promise.all(
    tokens.map(async (tokenContract, i) => {
      const decimals = await tokenContract.decimals();
      const txReceipt = await tokenContract.mint(
        elementAddress,
        parseUnits(amounts[i], decimals),
      );
      await txReceipt.wait(1);
    }),
  );

  return transactions;
}
