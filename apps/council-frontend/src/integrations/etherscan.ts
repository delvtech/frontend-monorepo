import { addressesJson } from "src/addresses";
import { ChainId } from "@elementfi/base/ethereum/ethereum";

export const ETHERSCAN_DOMAIN = getDomain();

function getDomain() {
  if (addressesJson.chainId === ChainId.LOCAL) {
    return "https://app.tryethernal.com";
  }
  if (addressesJson.chainId === ChainId.GOERLI) {
    return "https://goerli.etherscan.io";
  }
  return "https://etherscan.io";
}

export function getEtherscanAddress(account: string): string {
  return `${ETHERSCAN_DOMAIN}/address/${account}`;
}

export const ETHERSCAN_TRANSACTION_DOMAIN =
  addressesJson.chainId === ChainId.LOCAL
    ? `${ETHERSCAN_DOMAIN}/transaction`
    : `${ETHERSCAN_DOMAIN}/tx`;
