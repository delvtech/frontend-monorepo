import { TestYVault__factory } from "@elementfi/core-typechain/dist/v1";
import { TokenInfo, VaultTokenInfo } from "@elementfi/tokenlist";
import { TokenTag } from "@elementfi/tokenlist/dist/tags";
// TODO: stuff under packages/ should not have a default provider
import { defaultProvider } from "core/providers/providers";
import { tokenListJson } from "core/tokenlists/tokenlists";
import { assetProxyTokenInfos } from "core/tranche/positions";
import keyBy from "lodash.keyby";

export const vaultTokenInfos: VaultTokenInfo[] = tokenListJson.tokens.filter(
  (tokenInfo) => isVaultToken(tokenInfo),
);
const vaultContracts = assetProxyTokenInfos.map(({ extensions: { vault } }) =>
  TestYVault__factory.connect(vault, defaultProvider),
);

export const vaultContractsByAddress = keyBy(
  vaultContracts,
  (vault) => vault.address,
);

export function isVaultToken(
  tokenInfo: TokenInfo,
): tokenInfo is VaultTokenInfo {
  return !!tokenInfo?.tags?.includes(TokenTag.VAULT);
}
