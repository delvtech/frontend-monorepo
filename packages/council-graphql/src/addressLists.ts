import { ChainId } from "@elementfi/base";
import {
  AddressesJsonFile,
  goerliAddressList,
  mainnetAddressList,
} from "@elementfi/council-tokenlist";

export const mainnetForkAddressList = {
  ...mainnetAddressList,
  chainId: ChainId.LOCAL,
};

// For local hardhat only, this is inlined as an object to preserve type safety
export const testnetAddressList: AddressesJsonFile = {
  chainId: ChainId.LOCAL,
  addresses: {
    airdrop: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",
    coreVoting: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    discordTier1Airdrop: "0x0000000000000000000000000000000000000000",
    discordTier2Airdrop: "0x0000000000000000000000000000000000000000",
    discordTier3Airdrop: "0x0000000000000000000000000000000000000000",
    elementToken: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    githubTier1Airdrop: "0x0000000000000000000000000000000000000000",
    githubTier2Airdrop: "0x0000000000000000000000000000000000000000",
    githubTier3Airdrop: "0x0000000000000000000000000000000000000000",
    gscCoreVoting: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
    gscVault: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
    lockingVault: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
    optimisticGrants: "0x0000000000000000000000000000000000000000",
    optimisticRewardsVault: "0x0000000000000000000000000000000000000000",
    spender: "0x0B306BF915C4d645ff596e518fAf3F9669b97016",
    timeLock: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
    treasury: "0x9A676e781A523b5d0C0e43731313A708CB607508",
    vestingVault: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
  },
};

// For testing only, this is inlined as an object to preserve type safety
export const waffleAddressList: AddressesJsonFile = {
  addresses: {
    airdrop: "0x0BDb999cFA9c47d6d62323a1905F8Eb7B3c9B119",
    coreVoting: "0xFDFEF9D10d929cB3905C71400ce6be1990EA0F34",
    discordTier1Airdrop: "0x0000000000000000000000000000000000000000",
    discordTier2Airdrop: "0x0000000000000000000000000000000000000000",
    discordTier3Airdrop: "0x0000000000000000000000000000000000000000",
    elementToken: "0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA",
    githubTier1Airdrop: "0x0000000000000000000000000000000000000000",
    githubTier2Airdrop: "0x0000000000000000000000000000000000000000",
    githubTier3Airdrop: "0x0000000000000000000000000000000000000000",
    gscCoreVoting: "0xFf807885934003A35b1284d7445fc83Fd23417e5",
    gscVault: "0x84e924C5E04438D2c1Df1A981f7E7104952e6de1",
    lockingVault: "0x4E0597863fA1AA7B6b95a887AD9fEee038815642",
    optimisticGrants: "0x0000000000000000000000000000000000000000",
    optimisticRewardsVault: "0x0000000000000000000000000000000000000000",
    spender: "0x0000000000000000000000000000000000000000",
    timeLock: "0xdCCc660F92826649754E357b11bd41C31C0609B9",
    treasury: "0x6f2fa37EBfaf089C4Fd7e6124C1028306943D11d",
    vestingVault: "0x2061701b22095418514C0D4a28366C54B1464C17",
  },
  chainId: ChainId.LOCAL,
};

export function getAddressList(chainId?: number): AddressesJsonFile {
  switch (chainId) {
    case mainnetAddressList.chainId:
      return mainnetAddressList;
    case goerliAddressList.chainId:
      return goerliAddressList;
    case ChainId.LOCAL:
      return getLocalhostAddressList();
    default:
      return getEnvAddressList();
  }
}

function getEnvAddressList(): AddressesJsonFile {
  if (process.env.NODE_ENV === "test") {
    return waffleAddressList;
  }
  switch (process.env.CHAIN_NAME) {
    case "goerli":
      return goerliAddressList;
    case "mainnet":
      return mainnetAddressList;
    default:
      return getLocalhostAddressList();
  }
}

function getLocalhostAddressList() {
  if (process.env.NODE_ENV === "test") {
    return waffleAddressList;
  }
  switch (process.env.CHAIN_NAME) {
    case "mainnet-fork":
      return mainnetForkAddressList;
    case "testnet":
    default:
      return testnetAddressList;
  }
}
