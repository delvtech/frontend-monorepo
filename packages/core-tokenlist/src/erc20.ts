import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { retryAsync } from "src/util/retry";

export async function getTokenDecimals(token: ERC20): Promise<number> {
  return await retryAsync(token.decimals);
}

export async function getTokenDecimalsMulti(
  tokens: ERC20[],
): Promise<number[]> {
  return await Promise.all(tokens.map(getTokenDecimals));
}

export async function getTokenSymbol(token: ERC20): Promise<string> {
  return await retryAsync(token.symbol);
}

export async function getTokenSymbolMulti(tokens: ERC20[]): Promise<string[]> {
  return await Promise.all(tokens.map(getTokenSymbol));
}

export async function getTokenName(token: ERC20): Promise<string> {
  return await retryAsync(token.name);
}

export async function getTokenNameMulti(tokens: ERC20[]): Promise<string[]> {
  return await Promise.all(tokens.map(getTokenName));
}
