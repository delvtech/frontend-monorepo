import fs from "fs";
import {
  TokenList,
  mainnetTokenList,
  TokenTag,
  goerliTokenList,
} from "@elementfi/tokenlist";
import { assertNever } from "@elementfi/base/utils/assertNever";

const mainnet = generateTypesFile(mainnetTokenList);
const goerli = generateTypesFile(goerliTokenList);

fs.writeFileSync("./addressTypes.ts", mainnet);

function generateTypesFile(tokenList: TokenList) {
  return Object.values(TokenTag)
    .map((tag) => {
      const tokenAddresses = tokenList.tokens
        .filter((tokenInfo) => !!tokenInfo.tags?.includes(tag))
        .map(({ address }) => address);

      switch (tag) {
        case TokenTag.PRINCIPAL: {
          return generateUnionType("PrincipalTokenV1Address", tokenAddresses);
        }
        case TokenTag.ASSET_PROXY: {
          return generateUnionType("AssetProxyAddress", tokenAddresses);
        }
        case TokenTag.CCPOOL: {
          return generateUnionType("CCPoolV1Address", tokenAddresses);
        }
        case TokenTag.CURVE: {
          return generateUnionType("CurveAddress", tokenAddresses);
        }
        case TokenTag.WPOOL: {
          return generateUnionType("WPoolAddress", tokenAddresses);
        }
        case TokenTag.YIELD: {
          return generateUnionType("YieldTokenAddress", tokenAddresses);
        }
        case TokenTag.VAULT: {
          return generateUnionType("VaultAddress", tokenAddresses);
        }
        default:
          assertNever(tag);
          // should never happen because assertNever is exhaustive
          return "";
      }
    })
    .join("\n");
}

function generateUnionType(name: string, arr: string[]): string {
  const str = `
    export const ${name}List = ${JSON.stringify(arr)} as const;
    export type ${name} = typeof ${name}List[number];
  `;
  return str;
}
