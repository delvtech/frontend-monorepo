import { ExternalProvider, Web3Provider } from "@ethersproject/providers";

export function getEthereumProviderLibrary(
  provider?: ExternalProvider,
): Web3Provider | null {
  if (!provider) {
    console.warn(
      `Could not instantiate web3 context at the root. Missing provider?`,
    );
    return null;
  }

  return new Web3Provider(provider);
}
