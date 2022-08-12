import testnetDelegatesJson from "src/json/testnet.delegates.json";
import mainnetDelegatesJson from "src/json/mainnet.delegates.json";
import goerliDelegatesJson from "src/json/goerli.delegates.json";
import { Delegate } from "src/types";
import { mainnetDelegateExceptions } from "src/delegateExceptions";

export type { Delegate } from "src/types";

export const mainnetDelegates: Delegate[] = [
  ...mainnetDelegatesJson.delegates,
  // extra delegates that weren't scrape-able by our current script, these had to be hardcoded :(
  ...mainnetDelegateExceptions,
];

export const goerliDelegates: Delegate[] = goerliDelegatesJson.delegates;
export const testnetDelegates: Delegate[] = testnetDelegatesJson.delegates;
