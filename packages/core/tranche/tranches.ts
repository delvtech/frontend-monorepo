import {
  TestYVault,
  Tranche__factory,
} from "@elementfi/core-typechain/dist/v1";
import {
  AssetProxyTokenInfo,
  PrincipalTokenInfo,
  TokenInfo,
  VaultTokenInfo,
  YieldTokenInfo,
  TokenTag,
} from "@elementfi/tokenlist";
import { EMPTY_ARRAY } from "base/constants/emptyArray";
// TODO: stuff under packages/ should not have a default provider
import { defaultProvider } from "core/providers/providers";
import { getTokenInfo, tokenListJson } from "core/tokenlists/tokenlists";
import { getIsMature } from "core/tranche/getIsMature";
import { vaultContractsByAddress } from "core/tranche/vaults";
import keyBy from "lodash.keyby";

export function isPrincipalToken(
  tokenInfo: TokenInfo,
): tokenInfo is PrincipalTokenInfo {
  return !!tokenInfo?.tags?.includes(TokenTag.PRINCIPAL);
}

export const principalTokenInfos: PrincipalTokenInfo[] =
  tokenListJson.tokens.filter((tokenInfo): tokenInfo is PrincipalTokenInfo =>
    isPrincipalToken(tokenInfo),
  );

export const getAllPrincipalTokenAddresses = (): string[] =>
  principalTokenInfos.map(({ address }) => address);

export const trancheContracts = principalTokenInfos.map(({ address }) =>
  Tranche__factory.connect(address, defaultProvider),
);

export const trancheContractsByAddress = keyBy(
  trancheContracts,
  (tranche) => tranche.address,
);

export function getVaultContractForTranche(trancheAddress: string): TestYVault {
  const {
    extensions: { position },
  } = getTokenInfo<PrincipalTokenInfo>(trancheAddress);

  const {
    extensions: { vault },
  } = getTokenInfo<AssetProxyTokenInfo>(position);

  const vaultContract = vaultContractsByAddress[vault];

  return vaultContract;
}

export function getVaultTokenInfoForTranche(
  trancheAddress: string,
): VaultTokenInfo {
  const {
    extensions: { position },
  } = getTokenInfo<PrincipalTokenInfo>(trancheAddress);

  const {
    extensions: { vault },
  } = getTokenInfo<AssetProxyTokenInfo>(position);

  const vaultTokenInfo = getTokenInfo<TokenInfo>(vault);

  return vaultTokenInfo;
}

export function getYieldTokenForPrincipalToken(
  principalTokenAddress: string,
): YieldTokenInfo {
  const {
    extensions: { interestToken },
  } = getTokenInfo<PrincipalTokenInfo>(principalTokenAddress);

  return getTokenInfo<YieldTokenInfo>(interestToken);
}

export function getOpenPrincipalTokensWithSameBaseAsset(
  principalTokenAddress: string | undefined,
): PrincipalTokenInfo[] {
  if (!principalTokenAddress) {
    return EMPTY_ARRAY as PrincipalTokenInfo[];
  }

  const {
    extensions: { underlying },
  } = getTokenInfo<PrincipalTokenInfo>(principalTokenAddress);

  return principalTokenInfos.filter((principalToken) => {
    const isSameUnderlying =
      principalToken.extensions.underlying === underlying;
    const isMature = getIsMature(principalToken.extensions.unlockTimestamp);
    return !isMature && isSameUnderlying;
  });
}
