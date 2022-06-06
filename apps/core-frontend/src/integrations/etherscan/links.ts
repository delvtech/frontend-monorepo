import { ChainId } from "base/ethereum/ethereum";

const ETHERSCAN_GOERLI_DOMAIN = "https://goerli.etherscan.io";
const ETHERSCAN_MAINNET_DOMAIN = "https://etherscan.io";

export function getEtherscanDomain(chainId: ChainId): string {
  return chainId === ChainId.GOERLI
    ? ETHERSCAN_GOERLI_DOMAIN
    : ETHERSCAN_MAINNET_DOMAIN;
}

export function makeEtherscanWalletAddressUrl(
  chainId: ChainId,
  account: string,
): string {
  const ETHERSCAN_DOMAIN = getEtherscanDomain(chainId);
  return `${ETHERSCAN_DOMAIN}/address/${account}`;
}

export function makeEtherscanTokenUrl(
  chainId: ChainId,
  tokenAddress: string,
): string {
  const ETHERSCAN_DOMAIN = getEtherscanDomain(chainId);
  return `${ETHERSCAN_DOMAIN}/token/${tokenAddress}`;
}
