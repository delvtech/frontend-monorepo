import { goerliTokenList, PrincipalPoolTokenInfo } from "@elementfi/tokenlist";
// We aren't deploying v1 terms anymore, so we only need to support v1.1 for LM
import { ConvergentCurvePool__factory } from "@elementfi/core-typechain/dist/v1.1";
import { defaultProvider } from "src/elf/providers/providers";
import mapValues from "lodash.mapvalues";

// Copied ccpool addresses from goerli.tokenlist.json and matched up manually
// against the poolIds from the masterchef contract
export const poolIdsByPoolAddress: Record<string, number> = {
  "0xEA4058419730bc53Cce50950D458E41c22F94452": 1,
  "0x4294005520c453EB8Fa66F53042cfC79707855c4": 2,
};

export const eligibleGoerliPoolContracts = mapValues(
  poolIdsByPoolAddress,
  (v, address) =>
    ConvergentCurvePool__factory.connect(address, defaultProvider),
);
export const eligibleGoerliPoolTokenInfos = mapValues(
  poolIdsByPoolAddress,
  (v, address) =>
    // safe to cast because they are hand-selected from the tokenlist itself
    goerliTokenList.tokens.find(
      (token) => token.address === address,
    ) as PrincipalPoolTokenInfo,
);
