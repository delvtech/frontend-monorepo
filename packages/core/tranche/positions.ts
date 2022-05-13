import { YVaultAssetProxy__factory } from "@elementfi/core-typechain/dist/v1";
import { AssetProxyTokenInfo, TokenInfo, TokenTag } from "@elementfi/tokenlist";
// TODO: stuff under packages/ should not have a default provider
import { defaultProvider } from "@elementfi/core/providers/providers";
import { tokenListJson } from "@elementfi/core/tokenlists/tokenlists";
import keyBy from "lodash.keyby";

export const assetProxyTokenInfos: AssetProxyTokenInfo[] =
  tokenListJson.tokens.filter((tokenInfo): tokenInfo is AssetProxyTokenInfo =>
    isAssetProxy(tokenInfo),
  );

const assetProxyContracts = assetProxyTokenInfos.map(({ address }) =>
  YVaultAssetProxy__factory.connect(address, defaultProvider),
);

export const assetProxyContractsByAddress = keyBy(
  assetProxyContracts,
  (position) => position.address,
);

function isAssetProxy(tokenInfo: TokenInfo): tokenInfo is AssetProxyTokenInfo {
  return !!tokenInfo.tags?.includes(TokenTag.ASSET_PROXY);
}
