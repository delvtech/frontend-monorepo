import * as typechain from "@elementfi/core-v2-typechain";
import { Provider } from "@ethersproject/providers";
import { TokenInfo, TokenList } from "@uniswap/token-lists";
import { AddressesJsonFile } from "./addresses/AddressesJsonFile";
import { tags } from "./tags";
import { getERC20Info } from "./erc20";

export async function getTokenList(
  provider: Provider,
  addressesJson: AddressesJsonFile,
  name: string,
): Promise<TokenList> {
  const {
    chainId,
    addresses: {
      forwarderFactory,
      usdcToken,
      daiToken,
      wethToken,
      yvUSDCToken,
      yvDAI,
      yvWETH,
      USDCTerm,
      DAITerm,
      WETHTerm,
      usdcPool,
      daiPool,
      wethPool,
      pUSDC_30Token,
      pUSDC_60Token,
      pUSDC_90Token,
      pDAI_30Token,
      pDAI_60Token,
      pDAI_90Token,
      pWETH_30Token,
      pWETH_60Token,
      pWETH_90Token,
      lpUSDC_30Token,
      lpUSDC_60Token,
      lpUSDC_90Token,
      lpDAI_30Token,
      lpDAI_60Token,
      lpDAI_90Token,
      lpWETH_30Token,
      lpWETH_60Token,
      lpWETH_90Token,
    },
  } = addressesJson;

  const tokenList: TokenList = {
    name,
    logoURI: "https://elementfi.s3.us-east-2.amazonaws.com/logo.svg",
    tags,
    timestamp: new Date().toISOString(),
    version: {
      major: 0,
      minor: 0,
      patch: 0,
    },
    tokens: [],
  };

  console.log(`Building: ${name}`);

  const baseAssets = [usdcToken, daiToken, wethToken];
  const yieldSourceAssets = [yvUSDCToken, yvDAI, yvWETH];
  const terms = [USDCTerm, DAITerm, WETHTerm];

  console.log(typechain.ERC20__factory.name);

  const principalTokens = [
    pUSDC_30Token,
    pUSDC_60Token,
    pUSDC_90Token,
    pDAI_30Token,
    pDAI_60Token,
    pDAI_90Token,
    pWETH_30Token,
    pWETH_60Token,
    pWETH_90Token,
  ];
  const lpTokens = [
    lpUSDC_30Token,
    lpUSDC_60Token,
    lpUSDC_90Token,
    lpDAI_30Token,
    lpDAI_60Token,
    lpDAI_90Token,
    lpWETH_30Token,
    lpWETH_60Token,
    lpWETH_90Token,
  ];
  const pools = [usdcPool, daiPool, wethPool];

  console.log("fetching base assets...");
  for (const address of baseAssets) {
    const tokenInfo: TokenInfo = await getERC20Info(provider, chainId, address);
    tokenList.tokens.push(tokenInfo);
  }

  console.log("fetching yield source assets...");
  for (const address of yieldSourceAssets) {
    const tokenInfo: TokenInfo = await getERC20Info(provider, chainId, address);
    tokenList.tokens.push(tokenInfo);
  }

  console.log("done!");

  return tokenList;
}
