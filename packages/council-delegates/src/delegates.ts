import { addressesJson } from "src/addresses";
import { ChainId } from "@elementfi/base/ethereum/ethereum";

import testnetDelegatesJson from "src/elf-council-delegates/testnet.delegates.json";
import mainnetDelegatesJson from "src/elf-council-delegates/mainnet.delegates.json";
// extra delegates that weren't scrape-able by our current script, these had to be hardcoded :(
import mainnetExtrasDelegatesJson from "src/elf-council-delegates/mainnet-extras.delegates.json";
import goerliDelegatesJson from "src/elf-council-delegates/goerli.delegates.json";

export interface DelegatesJson {
  chainId: number;
  version: string;
  delegates: Delegate[];
}

export interface Delegate {
  address: string;
  commonwealthPostedFromAddress?: string;
  commonwealthCommentId?: number;
  commonwealthName?: string | null;
  name?: string;
  description?: string;

  /**
   * Twitter handle w/out the @ symbol, eg: "CharlieStLouis" (not "@CharlieStLouis")
   */
  twitterHandle?: string;
}

export const delegates = getDelegates();

function getDelegates(): Delegate[] {
  if (addressesJson.chainId === ChainId.GOERLI) {
    return goerliDelegatesJson.delegates;
  }

  if (addressesJson.chainId === ChainId.MAINNET) {
    return [
      ...mainnetDelegatesJson.delegates,
      ...mainnetExtrasDelegatesJson.delegates,
    ];
  }

  if (addressesJson.chainId === ChainId.LOCAL) {
    return testnetDelegatesJson.delegates;
  }

  // Should never happen, but for type safety we default to hardhat testnet delegates
  return testnetDelegatesJson.delegates;
}
