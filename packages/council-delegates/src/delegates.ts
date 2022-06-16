import testnetDelegatesJson from "src/testnet.delegates.json";
import mainnetDelegatesJson from "src/mainnet.delegates.json";
// extra delegates that weren't scrape-able by our current script, these had to be hardcoded :(
import mainnetExtrasDelegatesJson from "src/mainnet-extras.delegates.json";
import goerliDelegatesJson from "src/goerli.delegates.json";
import { Delegate } from "./types";

export interface DelegatesJson {
  chainId: number;
  version: string;
  delegates: Delegate[];
}

export const mainnetDelegates: Delegate[] = [
  ...mainnetDelegatesJson.delegates,
  ...mainnetExtrasDelegatesJson.delegates,
];
export const goerliDelegates: Delegate[] = goerliDelegatesJson.delegates;
export const testnetDelegates: Delegate[] = testnetDelegatesJson.delegates;
