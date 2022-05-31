import { ERC20__factory } from "@elementfi/core-typechain/dist/libraries";
import {
  Tranche,
  TrancheFactory,
  Tranche__factory,
} from "@elementfi/core-typechain/dist/v1";
import { Event } from "@ethersproject/contracts";
import hre from "hardhat";
import zip from "lodash.zip";
import { ELEMENT_LOGO_URI } from "src/logo";
import { TokenTag } from "src/tags";
import { PrincipalTokenInfo } from "src/types";
import { retry, retryAsync } from "src/util/retry";

let hardhatSymbolOverrides = {};
if (process.env.NODE_ENV === "development") {
  hardhatSymbolOverrides = require("src/addresses/testnet.symbolOverrides.json");
}

const MAINNET_CHAIN_ID = 1;
const GOERLI_CHAIN_ID = 5;
const HARDHAT_CHAIN_ID = 31337;
const trancheSymbolOverrides: Record<
  number,
  Record<string, PrincipalTokenInfo["symbol"]>
> = {
  [GOERLI_CHAIN_ID]: {
    // these contracts have v1 vault symbols, but we want the v2 vaults on testnet
    "0x44eecA004b2612d131EDA7dA2b9d986E7fED562e": "ePyvCurve-stETH",
    "0x89d66Ad25F3A723D606B78170366d8da9870A879": "ePyvCurve-stETH",
    "0x80272c960b862B4d6542CDB7338Ad1f727E0D18d": "ePyvUSDC",
    "0x8Bd721BB84a30c0078aF4a5a732c7169C5BE6eDB": "ePyvUSDC",
    "0x7D64aD2b83a62C0d02514a43E5B4582C671E5F72": "ePyvUSDC",
    "0x6866dFc9A60e9dba922668b9b27931DCaCDF645A": "ePyvDAI",
  },
  [HARDHAT_CHAIN_ID]: hardhatSymbolOverrides,
};

const trancheUnderlyingOverrides: Record<
  number,
  Record<string, PrincipalTokenInfo["extensions"]["underlying"]>
> = {
  // TODO: Put the lusd tranche address in here and map it to the lusd base asset address for now
  [MAINNET_CHAIN_ID]: {},
};

const provider = hre.ethers.provider;
export async function getPrincipalTokenInfos(
  chainId: number,
  trancheFactory: TrancheFactory,
  safelist: string[],
): Promise<PrincipalTokenInfo[]> {
  const filter = trancheFactory.filters.TrancheCreated(null, null, null);
  const trancheCreatedEvents = await retry(() =>
    trancheFactory.queryFilter(filter),
  );
  const trancheAddresses = trancheCreatedEvents.map(
    (event) =>
      // The first arg is the trancheAddress
      event.args?.[0],
  ) as string[];
  const safeTrancheAddresses = trancheAddresses.filter((address) =>
    safelist.includes(address),
  );
  const createdAtTimestamps = await getTrancheCreatedEvents(
    trancheCreatedEvents,
    safeTrancheAddresses,
  );

  const safeTranches = safeTrancheAddresses.map((address) =>
    Tranche__factory.connect(address, provider),
  );

  const principalTokenNames = await getPrincipalTokenName(safeTranches);
  const principalTokenSymbols = await getPrincipalTokenSymbols(
    chainId,
    safeTranches,
  );

  const decimals = await Promise.all(
    safeTranches.map((tranche) => retryAsync(tranche.decimals)),
  );
  const underlyingAddresses = await getPrincipalTokenUnderlyings(
    chainId,
    safeTranches,
  );
  const unlockTimestamps = await Promise.all(
    safeTranches.map((tranche) => retryAsync(tranche.unlockTimestamp)),
  );
  const interestTokens = await Promise.all(
    safeTranches.map((tranche) => retryAsync(tranche.interestToken)),
  );
  const positions = await Promise.all(
    safeTranches.map((tranche) => retryAsync(tranche.position)),
  );

  const principalTokensList: PrincipalTokenInfo[] = zip<any>(
    safeTrancheAddresses,
    principalTokenSymbols,
    principalTokenNames,
    decimals,
    underlyingAddresses,
    unlockTimestamps,
    interestTokens,
    positions,
    createdAtTimestamps,
  ).map(
    ([
      address,
      symbol,
      name,
      decimal,
      underlying,
      unlockTimestamp,
      interestToken,
      position,
      createdAtTimestamp,
    ]): PrincipalTokenInfo => {
      return {
        chainId,
        address: address as string,
        symbol: symbol as string,
        decimals: decimal as number,
        extensions: {
          underlying: underlying as string,
          position: position as string,
          interestToken: interestToken as string,
          unlockTimestamp: unlockTimestamp?.toNumber() as number,
          createdAtTimestamp: createdAtTimestamp as number,
        },
        name: name as string,
        tags: [TokenTag.PRINCIPAL],
        logoURI: ELEMENT_LOGO_URI,
      };
    },
  );

  return principalTokensList;
}

async function getPrincipalTokenUnderlyings(
  chainId: number,
  tranches: Tranche[],
) {
  const trancheAddresses = tranches.map((tranche) => tranche.address);
  const underlyingAddresses = await Promise.all(
    tranches.map((tranche) => retryAsync(tranche.underlying)),
  );
  const overrides = trancheUnderlyingOverrides[chainId] || {};
  const underlyings = zip(trancheAddresses, underlyingAddresses).map(
    (zipped) => {
      const [trancheAddress, underlyingAddress] = zipped as [string, string];
      if (overrides[trancheAddress]) {
        return overrides[trancheAddress];
      }
      return underlyingAddress;
    },
  );
  return underlyings;
}
async function getPrincipalTokenSymbols(chainId: number, tranches: Tranche[]) {
  const trancheAddresses = tranches.map((tranche) => tranche.address);
  const trancheSymbols = await Promise.all(
    tranches.map((tranche) => tranche.symbol()),
  );
  const overrides = trancheSymbolOverrides[chainId] || {};
  const symbols = zip(trancheAddresses, trancheSymbols).map((zipped) => {
    const [address, symbol] = zipped as [string, string];
    if (overrides[address]) {
      return overrides[address];
    }
    return symbol;
  });
  return symbols;
}

async function getPrincipalTokenName(tranches: Tranche[]) {
  const underlyingAddresses = await Promise.all(
    tranches.map((tranche) => retryAsync(tranche.underlying)),
  );
  const underlyingContracts = underlyingAddresses.map((address) =>
    ERC20__factory.connect(address, provider),
  );
  const underlyingSymbols = await Promise.all(
    underlyingContracts.map((underlying) => underlying.symbol()),
  );
  const principalTokenNames = underlyingSymbols.map((symbol) => {
    const name =
      symbol === "WETH" ? "ETH Principal Token" : `${symbol} Principal Token`;
    return name;
  });
  return principalTokenNames;
}

async function getTrancheCreatedEvents(
  trancheCreatedEvents: Event[],
  trancheAddresses: string[],
) {
  // The events that the given tranches were created in
  const filteredTranches = trancheCreatedEvents.filter((event) =>
    trancheAddresses.includes(event.args?.[0]),
  );

  // the blocks the tranches were created in
  const blocks = await Promise.all(
    filteredTranches.map((event) => {
      const blockNumber = event.blockNumber;
      return retryAsync(() => provider.getBlock(blockNumber));
    }),
  );

  return blocks.map((block) => +block.timestamp);
}
