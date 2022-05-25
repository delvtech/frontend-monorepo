import { ERC20__factory } from "@elementfi/core-typechain/dist/libraries";
import {
  InterestToken,
  InterestToken__factory,
  Tranche__factory,
} from "@elementfi/core-typechain/dist/v1";
import hre from "hardhat";
import zip from "lodash.zip";
import { ELEMENT_LOGO_URI } from "src/logo";
import { TokenTag } from "src/tags";
import { PrincipalTokenInfo, YieldTokenInfo } from "src/types";
import { retryAsync } from "src/util/retry";

let hardhatSymbolOverrides = {};
if (process.env.NODE_ENV === "development") {
  hardhatSymbolOverrides = require("src/addresses/testnet.symbolOverrides.json");
}
export const provider = hre.ethers.provider;

const GOERLI_CHAIN_ID = 5;
const HARDHAT_CHAIN_ID = 31337;
const symbolOverrides: Record<number, Record<string, string>> = {
  [GOERLI_CHAIN_ID]: {
    // these contracts have v1 vault symbols, but we want the v2 vaults on testnet
    "0x91dDF92af38Afac1B59F450dDb94ddab10a11490": "eYyvCurve-stETH",
    "0xBf4B5cB5ca49B1eF6B02615a94980723f6484899": "eYyvCurve-stETH",
    "0x2c637c5142eE4F31A1a78Ad3DF012fc242F6CAe6": "eYyvUSDC",
    "0x8F28E7085882Ef6010a74Fa092C4eC519A0583B5": "eYyvUSDC",
    "0x51E7DF22DF4A391A5702D6a99a350cE3c55c02Ce": "eYyvUSDC",
    "0x649b9a57cb8fbd01bE019bDBBed9768d2a457173": "eYyvDAI",
  },
  [HARDHAT_CHAIN_ID]: hardhatSymbolOverrides,
};

export async function getYieldTokenInfos(
  chainId: number,
  principalTokenInfos: PrincipalTokenInfo[],
): Promise<YieldTokenInfo[]> {
  const tranches = principalTokenInfos.map(({ address }) =>
    Tranche__factory.connect(address, provider),
  );

  const interestTokenAddresses = await Promise.all(
    tranches.map((tranche) => retryAsync(tranche.interestToken)),
  );
  const interestTokens = interestTokenAddresses.map((address) =>
    InterestToken__factory.connect(address, provider),
  );

  const trancheAddresses = principalTokenInfos.map(({ address }) => address);
  const unlockTimestamps = principalTokenInfos.map(
    ({ extensions: { unlockTimestamp } }) => unlockTimestamp,
  );
  const underlyingSymbols = await getUnderlyingSymbols(interestTokens);
  const yieldTokenNames = formatYieldTokenNames(underlyingSymbols);
  const yieldTokenSymbols = await getYieldTokenSymbols(chainId, interestTokens);

  // It's generally useful to include the base asset yts even though it isn't
  // directly available on the InterestToken
  const underlyingAddresses = await Promise.all(
    tranches.map((tranche) => retryAsync(tranche.underlying)),
  );

  const decimals = await Promise.all(
    interestTokens.map((interestToken) => retryAsync(interestToken.decimals)),
  );

  const yieldTokensList: YieldTokenInfo[] = zip<any>(
    interestTokenAddresses,
    yieldTokenSymbols,
    yieldTokenNames,
    decimals,
    underlyingAddresses,
    trancheAddresses,
    unlockTimestamps,
  ).map(
    ([
      address,
      symbol,
      name,
      decimal,
      underlying,
      trancheAddress,
      unlockTimestamp,
    ]): YieldTokenInfo => {
      return {
        chainId,
        address: address as string,
        symbol: symbol as string,
        decimals: decimal as number,
        name: name as string,
        extensions: {
          tranche: trancheAddress as string,
          underlying: underlying as string,
          unlockTimestamp: unlockTimestamp as number,
        },
        tags: [TokenTag.YIELD],
        logoURI: ELEMENT_LOGO_URI,
      };
    },
  );

  return yieldTokensList;
}

async function getYieldTokenSymbols(
  chainId: number,
  interestTokens: InterestToken[],
) {
  const addresses = interestTokens.map(
    (interestToken) => interestToken.address,
  );
  const interestTokenSymbols = await Promise.all(
    interestTokens.map((token) => token.symbol()),
  );
  const overrides = symbolOverrides[chainId] || {};
  const symbols = zip(addresses, interestTokenSymbols).map((zipped) => {
    const [address, symbol] = zipped as [string, string];
    if (overrides[address]) {
      return overrides[address];
    }
    return symbol;
  });
  return symbols;
}

function formatYieldTokenNames(underlyingSymbols: string[]) {
  const yieldTokenNames = underlyingSymbols.map((symbol) => {
    const name =
      symbol === "WETH" ? "ETH Yield Token" : `${symbol} Yield Token`;
    return name;
  });
  return yieldTokenNames;
}

async function getUnderlyingSymbols(interestTokens: InterestToken[]) {
  const trancheAddresses = await Promise.all(
    interestTokens.map((interestToken) => retryAsync(interestToken.tranche)),
  );
  const tranches = trancheAddresses.map((address) =>
    Tranche__factory.connect(address, provider),
  );
  const underlyingAddresses = await Promise.all(
    tranches.map((tranche) => retryAsync(tranche.underlying)),
  );
  const underlyingContracts = underlyingAddresses.map((address) =>
    ERC20__factory.connect(address, provider),
  );
  const underlyingSymbols = await Promise.all(
    underlyingContracts.map((underlying) => retryAsync(underlying.symbol)),
  );
  return underlyingSymbols;
}
