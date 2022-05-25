import { ERC20__factory } from "@elementfi/core-typechain/dist/libraries";
import { TokenInfo } from "@uniswap/token-lists/src";
import hre from "hardhat";
import { getTokenDecimals, getTokenName, getTokenSymbol } from "src/erc20";
import { getCurveTokenInfo } from "./curveToken";
import { TokenTag } from "./tags";
import { CurveLpTokenInfo } from "./types";

export const provider = hre.ethers.provider;

export const ETH_CONSTANT = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

type ExternalTokenInfo = TokenInfo | CurveLpTokenInfo;

async function getExternalTokenInfo(
  chainId: number,
  address: string,
): Promise<ExternalTokenInfo> {
  await provider.ready;
  if (address === ETH_CONSTANT) {
    return {
      chainId,
      address,
      name: "Ether",
      decimals: 18,
      symbol: "ETH",
    };
  }

  const erc20 = ERC20__factory.connect(address, provider);

  const [name, symbol, decimals] = (await Promise.all(
    [getTokenName, getTokenSymbol, getTokenDecimals].map((fn) => fn(erc20)),
  )) as [string, string, number];

  const basicTokenInfo = { chainId, address, symbol, name, decimals };

  /* In the case we are building the token list for a non-mainnet network we
   * should default to returning the simple tokens already specified. The reason
   * for this is that the Curve.fi ecosystem of contracts is not refletive of
   * the one on mainnet and in their place we stub with mocked versions. In the
   * future we could support it on other networks if we wish to build a stubbed
   * LP system of tokens */
  if (!name.startsWith("Curve.fi") || chainId !== 1) {return basicTokenInfo;}

  return await getCurveTokenInfo(basicTokenInfo);
}

function isCurveLpTokenInfo(
  tokenInfo: TokenInfo,
): tokenInfo is CurveLpTokenInfo {
  return !!(tokenInfo.tags && tokenInfo.tags.includes(TokenTag.CURVE));
}

export async function getExternalTokenInfos(
  chainId: number,
  baseTokenAddresses: string[],
): Promise<ExternalTokenInfo[]> {
  const baseTokenInfos = await Promise.all(
    baseTokenAddresses.map((address) => getExternalTokenInfo(chainId, address)),
  );

  const baseSimpleTokenInfos = baseTokenInfos.filter(
    (info) => !isCurveLpTokenInfo(info),
  );
  const baseCurveLpTokenInfos = baseTokenInfos.filter(isCurveLpTokenInfo);

  let externalTokenInfos: ExternalTokenInfo[] = [...baseSimpleTokenInfos];
  const existsInExternalTokenInfos = (address: string) =>
    externalTokenInfos.some((elem) => elem.address === address);

  for (const {
    extensions: { poolAssets },
  } of baseCurveLpTokenInfos) {
    let poolAssetTokenInfos: ExternalTokenInfo[] = [];
    for (const poolAssetAddress of poolAssets) {
      if (existsInExternalTokenInfos(poolAssetAddress)) {
        continue;
      }
      const poolAssetTokenInfo = await getExternalTokenInfo(
        chainId,
        poolAssetAddress,
      );

      if (!isCurveLpTokenInfo(poolAssetTokenInfo)) {
        poolAssetTokenInfos = [...poolAssetTokenInfos, poolAssetTokenInfo];
        continue;
      }

      const underlyingCurveLpPoolAssetTokenInfos = await Promise.all(
        poolAssetTokenInfo.extensions.poolAssets
          .filter((address) => !existsInExternalTokenInfos(address))
          .map(async (address) => await getExternalTokenInfo(chainId, address)),
      );

      poolAssetTokenInfos = [
        ...poolAssetTokenInfos,
        poolAssetTokenInfo,
        ...underlyingCurveLpPoolAssetTokenInfos,
      ];
    }

    externalTokenInfos = [...externalTokenInfos, ...poolAssetTokenInfos];
  }

  return [...externalTokenInfos, ...baseCurveLpTokenInfos];
}
