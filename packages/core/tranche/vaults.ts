import { TestYVault__factory } from "@elementfi/core-typechain/dist/v1";
import { TokenInfo, VaultTokenInfo } from "@elementfi/core-tokenlist";
import { TokenTag } from "@elementfi/core-tokenlist/dist/tags";
// TODO: stuff under packages/ should not have a default provider
import { defaultProvider } from "@elementfi/core/providers/providers";
import { tokenListJson } from "@elementfi/core/tokenlists/tokenlists";
import { assetProxyTokenInfos } from "@elementfi/core/tranche/positions";
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
