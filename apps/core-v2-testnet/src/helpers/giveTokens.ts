import { MockERC20, MockERC20Permit } from "@elementfi/core-v2-typechain";

export async function giveTokens(
  accounts: string[],
  token: MockERC20 | MockERC20Permit,
  amount: number,
): Promise<void[]> {
  const scalar = 10 ^ (await token.decimals());
  return await Promise.all(
    accounts.map(async (account) => {
      await token.mint(account, amount * scalar);
    }),
  );
}
