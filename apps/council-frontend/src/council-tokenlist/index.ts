import { TokenInfo, TokenList } from "@uniswap/token-lists";
import keyBy from "lodash.keyby";
import {
  AnyTokenListInfo,
  goerliTokenList,
  mainnetTokenList,
} from "@elementfi/council-tokenlist";
import testnetTokenList from "src/council-tokenlist/testnet.tokenlist.json";

// Default to the testnet in this repo so `npm start` Just Works without having
// to specify it on the command line.
const chainName = process.env.NEXT_PUBLIC_CHAIN_NAME || "testnet";

export const tokenListJson = getTokenList();

function getTokenList(): TokenList {
  if (chainName === "goerli") {
    return goerliTokenList;
  }

  if (chainName === "mainnet") {
    return mainnetTokenList;
  }

  // default to local testnet
  return testnetTokenList as TokenList;
}

// Do not export this, use getTokenInfo<T> instead
const tokenMetadata: Record<string, AnyTokenListInfo> = keyBy(
  tokenListJson.tokens,
  "address",
);

export function getTokenInfo<T extends TokenInfo>(address: string): T {
  return tokenMetadata[address] as T;
}
