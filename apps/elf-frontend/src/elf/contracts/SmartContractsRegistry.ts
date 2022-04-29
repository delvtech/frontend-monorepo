import { Provider } from "@ethersproject/providers";
import { Contract, Signer } from "ethers";

import { FactoryConnectFn } from "elf/contracts/FactoryConnectFn";
import { defaultProvider } from "elf/providers/providers";

// Do not export this from this file
const SMART_CONTRACTS_REGISTRY: Record<string, unknown> = {};

/**
 * @deprecated use a contract lookup object instead, eg:
 * trancheContractsByAddress or interestTokenContractsByAddress.
 */
export function getSmartContractFromRegistry<TReturnContract extends Contract>(
  address: string | undefined,
  factoryConnect: FactoryConnectFn<TReturnContract>,
  signerOrProvider?: Signer | Provider,
): TReturnContract | undefined {
  if (!address) {
    return undefined;
  }

  // Pull from cache if we have the instance already
  const cachedContract = SMART_CONTRACTS_REGISTRY[address];
  if (cachedContract) {
    return cachedContract as TReturnContract;
  }

  // Otherwise populate cache and return it
  SMART_CONTRACTS_REGISTRY[address] = factoryConnect(
    address,
    signerOrProvider ?? defaultProvider,
  );

  return SMART_CONTRACTS_REGISTRY[address] as TReturnContract;
}
