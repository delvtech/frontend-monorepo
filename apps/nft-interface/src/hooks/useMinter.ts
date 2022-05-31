/* eslint-disable */
import {
  useSmartContractTransaction,
  UseSmartContractTransactionOptions,
} from "@elementfi/react-query-typechain/src/hooks/useSmartContractTransaction/useSmartContractTransaction";
import { Minter, Minter__factory } from "contracts";
import { Signer } from "ethers";
import { getAddresses } from "src/addresses";
import { getProvider } from "src/providers";

export function useMinter(
  signer?: Signer,
  options?: UseSmartContractTransactionOptions<Minter, "mint">,
) {
  const addresses = getAddresses();
  const provider = getProvider();

  const minter = Minter__factory.connect(addresses.minter, provider);

  return useSmartContractTransaction(minter, "mint", signer, options);
}
