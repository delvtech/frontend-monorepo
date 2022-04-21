/*
 * See https://chainid.network/
 */
export enum ChainId {
  MAINNET = 1,
  GOERLI = 5,
  LOCAL = 31337,
}
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

const targetChain = !!process.env.NEXT_PUBLIC_TARGET_CHAIN
  ? +(process.env.NEXT_PUBLIC_TARGET_CHAIN as string)
  : undefined;

// Util function to guard possible env misconfiguration
export const getTargetChain = (): ChainId => {
  if (targetChain === ChainId.MAINNET) {
    return ChainId.MAINNET;
  }

  if (targetChain === ChainId.GOERLI) {
    return ChainId.GOERLI;
  }
  // defaulting to local
  return ChainId.LOCAL;
};

export const chainName = ChainNames[getTargetChain()];
