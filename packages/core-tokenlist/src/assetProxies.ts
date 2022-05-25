import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import {
  Tranche__factory,
  YVaultAssetProxy__factory,
} from "@elementfi/core-typechain/dist/v1";
import hre from "hardhat";
import uniq from "lodash.uniq";
import zip from "lodash.zip";
import { TokenTag } from "src/tags";
import { retryAsync } from "src/util/retry";
import {
  getTokenDecimalsMulti,
  getTokenNameMulti,
  getTokenSymbolMulti,
} from "./erc20";
import { AssetProxyTokenInfo, PrincipalTokenInfo } from "./types";

export const provider = hre.ethers.provider;

const GOERLI_CHAIN_ID = 5;
const MAINNET_CHAIN_ID = 1;
const symbolOverrides: Record<number, Record<string, string>> = {
  [GOERLI_CHAIN_ID]: {
    // these asset proxies have symbols that reflect v1 yearn vaults, but we
    // want the v2 vaults on testnet
    "0x6F643Ba6894D8C50c476A3539e1D1690B2194018": "eyvCurve-stETH",
    "0x814C447a9F58A2b823504Fe2775bA48c843925B6": "eyvUSDC",
    "0x8dc82c95B8901Db35390Aa4096B643d7724F278D": "eyvDAI",
  },
};
const nameOverrides: Record<number, Record<string, string>> = {
  [MAINNET_CHAIN_ID]: {
    // There was a mistake made when deploying the USDC asset proxy where the
    // name was set to "element yvDAI". This shims in the correct name.
    "0xdEa04Ffc66ECD7bf35782C70255852B34102C3b0": "element yvUSDC",
  },
};
export async function getAssetProxyTokenInfos(
  chainId: number,
  principalTokenInfos: PrincipalTokenInfo[],
): Promise<AssetProxyTokenInfo[]> {
  const tranches = principalTokenInfos.map(({ address }) =>
    Tranche__factory.connect(address, provider),
  );

  const allPositions = await Promise.all(
    tranches.map((tranche) => retryAsync(tranche.position)),
  );
  // uniq b/c different tranches can have the same positionj
  const uniqPositionAddresses = uniq(allPositions);
  const positions = uniqPositionAddresses.map((address) =>
    YVaultAssetProxy__factory.connect(address, provider),
  );

  const vaults = await Promise.all(
    positions.map((position) => retryAsync(position.vault)),
  );

  // We need to shim the names since some have mistakes deployed
  const names = await getTokenNameMulti(positions as unknown as ERC20[]);
  const assetProxyNames = shimAssetProxyNames(
    chainId,
    uniqPositionAddresses,
    names,
  );

  // We need to shim the symbols since some have mistakes deployed
  const symbols = await getTokenSymbolMulti(positions as unknown as ERC20[]);
  const assetProxySymbols = shimAssetProxySymbols(
    chainId,
    uniqPositionAddresses,
    symbols,
  );

  const decimals = await getTokenDecimalsMulti(positions as unknown as ERC20[]);

  const assetProxyTokensList = zip(
    uniqPositionAddresses,
    assetProxySymbols,
    assetProxyNames,
    decimals,
    vaults,
  ).map(([address, symbol, name, decimal, vault]): AssetProxyTokenInfo => {
    return {
      chainId,
      address: address as string,
      symbol: symbol as string,
      decimals: decimal as number,
      name: name as string,
      tags: [TokenTag.ASSET_PROXY],
      extensions: { vault: vault as string },
      // TODO: What logo do we want to show for base assets?
      // logoURI: ""
    };
  });

  return assetProxyTokensList;
}

function shimAssetProxyNames(
  chainId: number,
  assetProxyAddresses: string[],
  assetProxyNames: string[],
) {
  const overrides = nameOverrides[chainId] || {};
  const names = zip(assetProxyAddresses, assetProxyNames).map((zipped) => {
    const [vaultAddress, name] = zipped as [string, string];
    if (overrides[vaultAddress]) {
      return overrides[vaultAddress];
    }
    return name;
  });
  return names;
}

function shimAssetProxySymbols(
  chainId: number,
  assetProxyAddresses: string[],
  assetProxySymbols: string[],
) {
  const overrides = symbolOverrides[chainId] || {};
  const symbols = zip(assetProxyAddresses, assetProxySymbols).map((zipped) => {
    const [vaultAddress, vaultSymbol] = zipped as [string, string];
    if (overrides[vaultAddress]) {
      return overrides[vaultAddress];
    }
    return vaultSymbol;
  });
  return symbols;
}
