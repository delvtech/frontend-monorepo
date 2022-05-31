import { TokenInfo } from "@uniswap/token-lists";
import hre from "hardhat";
import uniq from "lodash.uniq";
import zip from "lodash.zip";

import { ERC20 } from "src/types/ERC20";
import { YVaultAssetProxy__factory } from "src/types/factories/YVaultAssetProxy__factory";
import { Tranche } from "src/types/Tranche";

import {
  AssetProxyTokenInfo,
  PrincipalTokenInfo,
  TokenListTag,
} from "src/tokenlist/types";
import {
  getTokenNameMulti,
  getTokenSymbolMulti,
  getTokenDecimalsMulti,
} from "src/tokenlist/erc20";
import { Tranche__factory } from "src/types";

export const provider = hre.ethers.provider;

const GOERLI_CHAIN_ID = 5;
const symbolOverrides: Record<number, Record<string, string>> = {
  [GOERLI_CHAIN_ID]: {
    // these asset proxies have symbols that reflect v1 yearn vaults, but we
    // want the v2 vaults on testnet
    "0x6F643Ba6894D8C50c476A3539e1D1690B2194018": "eyvCurve-stETH",
    "0x814C447a9F58A2b823504Fe2775bA48c843925B6": "eyvUSDC",
    "0x8dc82c95B8901Db35390Aa4096B643d7724F278D": "eyvDAI",
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
    tranches.map((tranche) => tranche.position()),
  );
  // uniq b/c different tranches can have the same positionj
  const uniqPositionAddresses = uniq(allPositions);
  const positions = uniqPositionAddresses.map((address) =>
    YVaultAssetProxy__factory.connect(address, provider),
  );

  const vaults = await Promise.all(
    positions.map((position) => position.vault()),
  );
  const names = await getTokenNameMulti(positions as unknown as ERC20[]);

  const symbols = await getTokenSymbolMulti(positions as unknown as ERC20[]);
  const assetProxySymbols = getAssetProxySymbolMulti(
    chainId,
    uniqPositionAddresses,
    symbols,
  );

  const decimals = await getTokenDecimalsMulti(positions as unknown as ERC20[]);

  const assetProxyTokensList = zip(
    uniqPositionAddresses,
    assetProxySymbols,
    names,
    decimals,
    vaults,
  ).map(([address, symbol, name, decimal, vault]): AssetProxyTokenInfo => {
    return {
      chainId,
      address: address as string,
      symbol: symbol as string,
      decimals: decimal as number,
      name: name as string,
      tags: [TokenListTag.ASSET_PROXY],
      extensions: { vault: vault as string },
      // TODO: What logo do we want to show for base assets?
      // logoURI: ""
    };
  });

  return assetProxyTokensList;
}

function getAssetProxySymbolMulti(
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
