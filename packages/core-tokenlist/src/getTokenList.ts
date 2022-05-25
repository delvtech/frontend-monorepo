import {
  ConvergentPoolFactory__factory,
  TrancheFactory__factory,
  Vault__factory,
  WeightedPoolFactory__factory,
} from "@elementfi/core-typechain/dist/v1";
import { TokenList } from "@uniswap/token-lists/src";
import fs from "fs";
import hre from "hardhat";
import { AddressesJsonFile } from "src/addresses/AddressesJsonFile";
import { getAssetProxyTokenInfos } from "src/assetProxies";
import { getPrincipalPoolTokenInfos } from "src/ccpools";
import { getExternalTokenInfos } from "src/external";
import { ELEMENT_LOGO_URI } from "src/logo";
import { tags } from "src/tags";
import { getVaultTokenInfos } from "src/vaults";
import { getYieldPoolTokenInfos } from "src/weightedPools";
import { getPrincipalTokenInfos } from "./principalTokens";
import { getYieldTokenInfos } from "./yieldTokens";

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
      wbtcAddress,
      usdcAddress,
      daiAddress,
      "lusd3crv-fAddress": crvlusdAddress,
      "alusd3crv-fAddress": crvalusdAddress,
      "mim-3lp3crv-fAddress": crvMimAddress,
      convergentPoolFactoryAddress,
      weightedPoolFactoryAddress,
      crvtricryptoAddress,
      crv3cryptoAddress,
      stecrvAddress,
      eurscrvAddress,
    },
    safelist,
  } = addressesJson;

  const underlyingAddresses = [
    wethAddress,
    wbtcAddress,
    usdcAddress,
    daiAddress,
    crvlusdAddress,
    crvalusdAddress,
    crvMimAddress,
    crv3cryptoAddress,
    crvtricryptoAddress,
    stecrvAddress,
    eurscrvAddress,
  ];
  console.log("underlyingAddresses", underlyingAddresses);
  if (underlyingAddresses.find((a) => a === undefined)) {
    console.warn(
      "Found at least one undefined underlying token address",
      underlyingAddresses,
    );
  }

  const trancheFactory = TrancheFactory__factory.connect(
    trancheFactoryAddress,
    provider,
  );

  const convergentPoolFactoryV1 = ConvergentPoolFactory__factory.connect(
    convergentPoolFactoryAddress.v1,
    provider,
  );
  const convergentPoolFactoryV1_1 = ConvergentPoolFactory__factory.connect(
    convergentPoolFactoryAddress.v1_1,
    provider,
  );

  const balancerVault = Vault__factory.connect(balancerVaultAddress, provider);
  const weightedPoolFactory = WeightedPoolFactory__factory.connect(
    weightedPoolFactoryAddress,
    provider,
  );

  const underlyingTokenAddresses = underlyingAddresses
    // Addresses that aren't available on the given chain (ie: we dont have
    // mainnet weth terms!) should be filled in w/ the zero address to be
    // compliant with the addresses.schema.json
    .filter(
      (address) => address !== "0x0000000000000000000000000000000000000000",
    )
    // if an address is actually missing, (shouldn't happen, there's a json schema that should prevent this!)
    .filter((address) => {
      if (!address) {
        return false;
      }
      return true;
    });

  console.log("externalTokenInfos");
  const externalTokenInfos = await getExternalTokenInfos(
    chainId,
    underlyingTokenAddresses,
  );

  console.log("principalTokenInfos");
  const principalTokenInfos = await getPrincipalTokenInfos(
    chainId,
    trancheFactory,
    safelist,
  );

  console.log("assetProxyTokenInfos");
  const assetProxyTokenInfos = await getAssetProxyTokenInfos(
    chainId,
    principalTokenInfos,
  );

  console.log("vaultTokenInfos");
  const vaultTokenInfos = await getVaultTokenInfos(
    chainId,
    assetProxyTokenInfos,
  );

  console.log("yieldTokenInfos");
  const yieldTokenInfos = await getYieldTokenInfos(
    chainId,
    principalTokenInfos,
  );

  console.log("principalPoolTokenInfos");
  const principalPoolV1TokenInfos = await getPrincipalPoolTokenInfos(
    chainId,
    convergentPoolFactoryV1,
    safelist,
  );
  const principalPoolV1_1TokenInfos = await getPrincipalPoolTokenInfos(
    chainId,
    convergentPoolFactoryV1_1,
    safelist,
  );
  const principalPoolTokenInfos = [
    ...principalPoolV1TokenInfos,
    ...principalPoolV1_1TokenInfos,
  ];

  console.log("yieldPoolTokenInfos");
  const yieldPoolTokenInfos = await getYieldPoolTokenInfos(
    chainId,
    externalTokenInfos,
    yieldTokenInfos,
    balancerVault,
    weightedPoolFactory,
    safelist,
  );

  const tokenList: TokenList = {
    name,
    logoURI: ELEMENT_LOGO_URI,
    tags,
    timestamp: new Date().toISOString(),
    version: {
      // TODO: implement this
      major: 0,
      minor: 0,
      patch: 0,
    },
    tokens: [
      ...externalTokenInfos,
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
