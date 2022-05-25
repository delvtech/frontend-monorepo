import { TokenInfo } from "@uniswap/token-lists";
import hre from "hardhat";
import zip from "lodash.zip";

import { ERC20 } from "src/types/ERC20";

import {
  AssetProxyTokenInfo,
  TokenListTag,
  VaultTokenInfo,
} from "src/tokenlist/types";
import { TestYVault__factory } from "src/types/factories/TestYVault__factory";
import {
  getTokenNameMulti,
  getTokenSymbolMulti,
  getTokenDecimalsMulti,
} from "./erc20";

export const provider = hre.ethers.provider;

const GOERLI_CHAIN_ID = 5;

const VaultSymbolOverrides: Record<number, Record<string, string>> = {
  [GOERLI_CHAIN_ID]: {
    // these contracts have v1 vault symbols, but we want the v2 vaults on testnet
    "0xdD82595F5eB0e7477D7432B24E44be7c0252bbf1": "yvCurve-stETH",
    "0x23c3C6C06d7684207fB09076914A15B16aba02c5": "yvUSDC",
    "0x851A97B6520c582dAB33F722Bd9C5939Ea349546": "yvDAI",
    "0xf92DD556f826779826b709F5E8f8e261b29e7E30": "yvCurve-alUSD",
  },
};
export async function getVaultTokenInfos(
  chainId: number,
  assetProxyTokenInfos: AssetProxyTokenInfo[],
): Promise<VaultTokenInfo[]> {
  const vaultAddresses = assetProxyTokenInfos.map(
    ({ extensions: { vault } }) => vault,
  );
  const vaults = vaultAddresses.map((vaultAddress) =>
    TestYVault__factory.connect(vaultAddress, provider),
  );
  const vaultNames = await getTokenNameMulti(vaults as unknown as ERC20[]);

  const vaultSymbols = await getTokenSymbolMulti(vaults as unknown as ERC20[]);

  const symbols = getVaultSymbolMulti(chainId, vaultAddresses, vaultSymbols);

  const decimals = await getTokenDecimalsMulti(vaults as unknown as ERC20[]);

  const vaultTokensList: TokenInfo[] = zip(
    vaultAddresses,
    symbols,
    vaultNames,
    decimals,
  ).map(([address, symbol, name, decimal]): VaultTokenInfo => {
    return {
      chainId,
      address: address as string,
      symbol: symbol as string,
      decimals: decimal as number,
      name: name as string,
      tags: [TokenListTag.VAULT],
      // TODO: What logo do we want to show for base assets?
      // logoURI: ""
    };
  });

  return vaultTokensList;
}

function getVaultSymbolMulti(
  chainId: number,
  vaultAddresses: string[],
  vaultSymbols: string[],
) {
  const symbolOverrides = VaultSymbolOverrides[chainId] || {};
  const symbols = zip(vaultAddresses, vaultSymbols).map((zipped) => {
    const [vaultAddress, vaultSymbol] = zipped as [string, string];
    if (symbolOverrides[vaultAddress]) {
      return symbolOverrides[vaultAddress];
    }
    return vaultSymbol;
  });
  return symbols;
}
