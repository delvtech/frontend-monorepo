import { ChainId } from "@elementfi/base";
import { addressesJson } from "src/addresses";
import { Chain, chain } from "wagmi";

const { chainId } = addressesJson;

export const defaultChain = getChain();

function getChain(): Chain {
  if (chainId === ChainId.MAINNET) {
    return chain.mainnet;
  } else if (chainId === ChainId.GOERLI) {
    return chain.goerli;
  } else if (chainId === ChainId.LOCAL) {
    return chain.hardhat;
  }

  return chain.hardhat;
}
