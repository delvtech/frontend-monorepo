import { parseUnits } from "ethers/lib/utils";

/*
 * See https://chainid.network/
 */
export enum ChainId {
  MAINNET = 1,
  GOERLI = 5,
  LOCAL = 31337,
}

export const ETHEREUM_BLOCK_PER_DAY = 5760;
export const ETHEREUM_BLOCKS_PER_WEEK = ETHEREUM_BLOCK_PER_DAY * 7;

export const ChainNames: Record<ChainId, string> = {
  [ChainId.MAINNET]: "Ethereum Mainnet",
  [ChainId.GOERLI]: "Goerli Testnet",
  [ChainId.LOCAL]: "Local development",
};

export const DEFAULT_CHAIN_IDS: ChainId[] = [
  ChainId.MAINNET,
  ChainId.GOERLI,
  ChainId.LOCAL,
];

export function isLocalnet(chainId: number): boolean {
  return chainId === ChainId.LOCAL;
}
export function isGoerli(chainId: number): boolean {
  return chainId === ChainId.GOERLI;
}
export function isMainnet(chainId: number): boolean {
  return (
    chainId === ChainId.MAINNET ||
    (chainId === ChainId.LOCAL &&
      process.env.NEXT_PUBLIC_CHAIN_NAME === "mainnet_fork")
  );
}
export const NUM_ETH_DECIMALS = 18;
export const ONE_ETHER = parseUnits("1", NUM_ETH_DECIMALS);

export const ETH_ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
