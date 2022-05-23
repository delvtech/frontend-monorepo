import { TokenList } from "@uniswap/token-lists";
import fs from "fs";
import hre from "hardhat";

import { TrancheFactory__factory } from "src/types/factories/TrancheFactory__factory";

import { AddressesJsonFile } from "src/addresses/AddressesJsonFile";
import { getAssetProxyTokenInfos } from "src/tokenlist/assetProxies";
import { getPrincipalPoolTokenInfos } from "src/tokenlist/ccpools";
import { getUnderlyingTokenInfos } from "src/tokenlist/underlying";
import { getVaultTokenInfos } from "src/tokenlist/vaults";
import { getYieldPoolTokenInfos } from "src/tokenlist/weightedPools";

import { getYieldTokenInfos } from "./yieldTokens";
import { getPrincipalTokenInfos } from "./principalTokens";
import { tags } from "./tags";
import {
  ConvergentPoolFactory__factory,
  Vault__factory,
  WeightedPoolFactory__factory,
} from "src/types";

const provider = hre.ethers.provider;

export async function getTokenList(
  addressesJson: AddressesJsonFile,
  name: string,
  outputPath: string,
): Promise<void> {
  const {
    chainId,
    addresses: {
      balancerVaultAddress,
      trancheFactoryAddress,
      wethAddress,
      usdcAddress,
      daiAddress,
      crv3cryptoAddress,
      // crvlusdAddress,
      convergentPoolFactoryAddress,
      weightedPoolFactoryAddress,
      // crvalusdAddress,
      crvtricryptoAddress,
      stecrvAddress,

      wbtcAddress,
      "alusd3crv-fAddress": crvalusdAddress,
      "lusd3crv-fAddress": crvlusdAddress,
      // "mim-3lp3crv-fAddress": string;
      // eurscrvAddress: string;
    },
    safelist,
  } = addressesJson;

  const trancheFactory = TrancheFactory__factory.connect(
    trancheFactoryAddress,
    provider,
  );
  const convergentPoolFactory = ConvergentPoolFactory__factory.connect(
    convergentPoolFactoryAddress,
    provider,
  );
  const balancerVault = Vault__factory.connect(balancerVaultAddress, provider);
  const weightedPoolFactory = WeightedPoolFactory__factory.connect(
    weightedPoolFactoryAddress,
    provider,
  );

  // Skip addresses that are "0x0", which can happen if you know the underlying
  // token isn't available on the given chain.
  const underlyingTokenAddresses = [
    wethAddress,
    usdcAddress,
    daiAddress,
    crvlusdAddress,
    crvalusdAddress,
    crvtricryptoAddress,
    crv3cryptoAddress,
    stecrvAddress,
  ].filter(
    (address) => address !== "0x0000000000000000000000000000000000000000",
  );

  const underlyingTokenInfos = await getUnderlyingTokenInfos(
    chainId,
    underlyingTokenAddresses,
  );

  const principalTokenInfos = await getPrincipalTokenInfos(
    chainId,
    trancheFactory,
    safelist,
  );

  const assetProxyTokenInfos = await getAssetProxyTokenInfos(
    chainId,
    principalTokenInfos,
  );

  const vaultTokenInfos = await getVaultTokenInfos(
    chainId,
    assetProxyTokenInfos,
  );

  const yieldTokenInfos = await getYieldTokenInfos(
    chainId,
    principalTokenInfos,
  );

  const principalPoolTokenInfos = await getPrincipalPoolTokenInfos(
    chainId,
    convergentPoolFactory,
    safelist,
  );
  const yieldPoolTokenInfos = await getYieldPoolTokenInfos(
    chainId,
    underlyingTokenInfos,
    yieldTokenInfos,
    balancerVault,
    weightedPoolFactory,
    safelist,
  );

  const tokenList: TokenList = {
    name,
    logoURI: "https://element.fi/logo.svg",
    tags,
    timestamp: new Date().toISOString(),
    version: {
      // TODO: implement this
      major: 0,
      minor: 0,
      patch: 0,
    },
    tokens: [
      ...underlyingTokenInfos,
      ...assetProxyTokenInfos,
      ...vaultTokenInfos,
      ...principalTokenInfos,
      ...yieldTokenInfos,
      ...principalPoolTokenInfos,
      ...yieldPoolTokenInfos,
    ],
  };

  const tokenListString = JSON.stringify(tokenList, null, 2);
  console.log(tokenListString);

  // TODO: We have to validate this json schema ourselves before it can be
  // published to the uniswap directory.  For now, just look at this file in
  // vscode and make sure there are no squiggles.
  fs.writeFileSync(outputPath, tokenListString);
}
