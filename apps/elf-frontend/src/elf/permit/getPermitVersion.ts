import ContractAddresses, { AddressesJson } from "addresses/addresses";
import { ChainId } from "base/ethereum/ethereum";

// USDC is normally uses version '2'.  In development and goerli we are using a simple ERC20 for our USDC
// contract so we keep it at verion '1'.
export function getPermitVersion(tokenAddress: string): string {
  const { usdcAddress } = ContractAddresses;
  const { chainId } = AddressesJson;
  if (chainId !== ChainId.MAINNET) {
    return "1";
  }

  const version = tokenAddress === usdcAddress ? "2" : "1";
  return version;
}
