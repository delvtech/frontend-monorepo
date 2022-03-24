import { goerliTokenList, PrincipalPoolTokenInfo } from "@elementfi/tokenlist";

export const GOERLI_ELIGIBLE_POOLS: PrincipalPoolTokenInfo[] = [
  // The safelist of goerli pools that are eligible for Liquidity Mining
  "0xEA4058419730bc53Cce50950D458E41c22F94452",
  "0x4294005520c453EB8Fa66F53042cfC79707855c4",
].map(
  (address) =>
    // safe to cast because they are hand-selected from the tokenlist itself
    goerliTokenList.tokens.find(
      (token) => token.address === address,
    ) as PrincipalPoolTokenInfo,
);
