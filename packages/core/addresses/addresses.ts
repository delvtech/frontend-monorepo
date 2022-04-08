import { AddressesJsonFile } from "@elementfi/tokenlist/dist/AddressesJsonFile";
import AddressesJsonFileGoerli from "@elementfi/tokenlist/dist/goerli.addresses.json";
import AddressesJsonFileMainnet from "@elementfi/tokenlist/dist/mainnet.addresses.json";
import AddressesJsonFileMock from "core/addresses/mock.addresses.json";
import AddressesJsonFileTestnet from "core/addresses/testnet.addresses.json";

// Default to the testnet in this repo so `npm start` Just Works without having
// to specify it on the command line.
const addressesJsonId = getAddressesJsonId();
function getAddressesJsonId() {
  if (process.env.NODE_ENV === "test") {
    return "mock";
  }

  if (process.env.NEXT_PUBLIC_CHAIN_NAME === "mainnet_fork") {
    return "mainnet";
  }

  return process.env.NEXT_PUBLIC_CHAIN_NAME || "testnet";
}

function getAddressesJson(): AddressesJsonFile {
  if (addressesJsonId === "testnet") {
    return {
      ...AddressesJsonFileMainnet,
      chainId: AddressesJsonFileTestnet.chainId,
    };
  }

  if (addressesJsonId === "mock") {
    return AddressesJsonFileMock;
  }

  if (addressesJsonId === "mainnet") {
    return {
      ...AddressesJsonFileMainnet,
      chainId:
        process.env.NEXT_PUBLIC_CHAIN_NAME === "mainnet_fork"
          ? AddressesJsonFileTestnet.chainId
          : AddressesJsonFileMainnet.chainId,
    };
  }

  if (addressesJsonId === "goerli") {
    return AddressesJsonFileGoerli;
  }

  return AddressesJsonFileMock;
}

export const AddressesJson: AddressesJsonFile = getAddressesJson();

const ContractAddresses = AddressesJson.addresses;

export default ContractAddresses;

/**
 * Helpful debugging tool for making sure a contract is from our contracts json
 */
export function lookupAddressKey(
  address: string | undefined,
): string | undefined {
  const [addressesJsonKey] =
    Object.entries(AddressesJson.addresses).find(
      ([unusedKey, value]) => value === address,
    ) || [];

  const safeListedAddress = !!AddressesJson.safelist.find(
    (safeListedAddress) => address === safeListedAddress,
  )
    ? "safelisted address"
    : undefined;
  return addressesJsonKey || safeListedAddress;
}
