import { ERC20 } from "src/types/ERC20";

export async function getTokenDecimalsMulti(
  tokens: ERC20[],
): Promise<number[]> {
  const tokenNames = await Promise.all(tokens.map((token) => token.decimals()));
  return tokenNames;
}
export async function getTokenSymbolMulti(tokens: ERC20[]): Promise<string[]> {
  const tokenNames = await Promise.all(tokens.map((token) => token.symbol()));
  return tokenNames;
}
export async function getTokenNameMulti(tokens: ERC20[]): Promise<string[]> {
  const tokenNames = await Promise.all(tokens.map((token) => token.name()));
  return tokenNames;
}
