import { goerliTokenList, PrincipalPoolTokenInfo } from "@elementfi/tokenlist";
import {
  ConvergentCurvePool,
  ConvergentCurvePool__factory,
} from "@elementfi/core-typechain/dist/v1.1";
import { defaultProvider } from "src/elf/providers/providers";

const eligibleGoerliPoolTokenInfos: Record<string, PrincipalPoolTokenInfo> = {};
const eligibleGoerliPoolContracts: Record<string, ConvergentCurvePool> = {};
[
  // The safelist of goerli pools that are eligible for Liquidity Mining
  "0xEA4058419730bc53Cce50950D458E41c22F94452",
  "0x4294005520c453EB8Fa66F53042cfC79707855c4",
].forEach((address) => {
  // safe to cast because they are hand-selected from the tokenlist itself
  const tokenInfo = goerliTokenList.tokens.find(
    (token) => token.address === address,
  ) as PrincipalPoolTokenInfo;

  const contract = ConvergentCurvePool__factory.connect(
    address,
    defaultProvider,
  );

  eligibleGoerliPoolTokenInfos[address] = tokenInfo;
  eligibleGoerliPoolContracts[address] = contract;
});
