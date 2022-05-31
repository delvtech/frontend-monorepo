import "module-alias/register";

import { parseUnits } from "ethers/lib/utils";
import fs from "fs";
import hre, { ethers } from "hardhat";

import { TestDate } from "src/types/TestDate";

import { MAX_ALLOWANCE } from "src/maxAllowance";
import { deployConvergentPoolFactory } from "src/scripts/deployConvergentPoolFactory";
import { deployInterestTokenFactory } from "src/scripts/deployInterestTokenFactory";
import { deployTrancheFactory } from "src/scripts/deployTrancheFactory";
import { getSigner, SIGNER } from "src/scripts/getSigner";
import { THIRTY_DAYS_IN_SECONDS } from "src/time";

import { AddressesJsonFile } from "src/addresses/AddressesJsonFile";
import { deployBalancerVault } from "./balancerV2Vault";
import { deployBaseAssets } from "./baseAssets";
import { deployTrancheAndMarket } from "./deployTrancheAndMarket";
import { deployVaultsAndProxys } from "./deployVaultsAndProxys";
import { deployWeightedPoolFactory } from "./deployWeightedPoolFactory";
import { mintTokensForAddress } from "./mintTokensForAddress";
import { deployUserProxy } from "./userProxy";
import { Tranche } from "src/types/Tranche";
import { Signer } from "ethers";
import { Vault } from "src/types/Vault";
import { UserProxy } from "src/types/UserProxy";
import { USDC, WETH } from "src/types";

async function main() {
  const elementSigner = await getSigner(SIGNER.ELEMENT, hre);
  const balancerSigner = await getSigner(SIGNER.ELEMENT, hre);
  const userSigner = await getSigner(SIGNER.USER, hre);
  const wethSigner = await getSigner(SIGNER.WETH, hre);
  const usdcSigner = await getSigner(SIGNER.USDC, hre);
  const daiSigner = await getSigner(SIGNER.DAI, hre);
  const lusdSigner = await getSigner(SIGNER.CRVLUSD, hre);
  const elementAddress = await elementSigner.getAddress();
  const balancerAddress = await balancerSigner.getAddress();
  const userAddress = await userSigner.getAddress();

  // deploy base assets
  const [wethContract, usdcContract, daiContract] = await deployBaseAssets(
    wethSigner,
    usdcSigner,
    daiSigner,
    lusdSigner,
  );

  // supply element with WETH and USDC
  await mintTokensForAddress(elementAddress, {
    tokens: [wethContract, usdcContract],
    amounts: "100000000000",
  });

  // supply user with WETH and USDC
  await mintTokensForAddress(userAddress, {
    tokens: [wethContract, usdcContract],
    amounts: "100000000000",
  });

  // deploy main balancer vault
  const balancerVaultContract = await deployBalancerVault(
    balancerSigner,
    wethContract,
  );
  // register element with balancer so we can deploy pools
  await balancerVaultContract.setRelayerApproval(
    elementAddress,
    elementAddress,
    true,
  );

  // deploy factories
  const weightedPoolFactory = await deployWeightedPoolFactory(
    elementSigner,
    balancerVaultContract,
  );
  const convergentPoolFactory = await deployConvergentPoolFactory(
    elementSigner,
    balancerVaultContract,
  );
  const interestTokenFactory = await deployInterestTokenFactory(elementSigner);

  const dateLibraryDeployer = await ethers.getContractFactory(
    "DateString",
    elementSigner,
  );
  const testDate = (await dateLibraryDeployer.deploy()) as unknown as TestDate;

  const trancheFactory = await deployTrancheFactory(
    elementSigner,
    interestTokenFactory,
    testDate,
  );
  // deploy user proxy
  const userProxyContract = await deployUserProxy(
    elementSigner,
    wethContract,
    trancheFactory,
  );

  const { yWeth, wethYearnVaultAssetProxy, yUsdc, usdcYearnVaultAssetProxy } =
    await deployVaultsAndProxys(elementSigner, wethContract, usdcContract);

  console.log("deploy first WETH tranche");
  const {
    trancheContract: firstWethTrancheContract,
    fytPoolContract: firstWethFytPoolContract,
    ycPoolContract: firstWethYcPoolContract,
    fytPoolId: wethFytPoolId,
    ycPoolId: wethYcPoolId,
  } = await deployTrancheAndMarket(
    elementSigner,
    trancheFactory,
    wethYearnVaultAssetProxy,
    wethContract,
    balancerVaultContract,
    convergentPoolFactory,
    weightedPoolFactory,
    {
      mintAmount: "20000",
      baseAssetIn: "20000",
      yieldAssetIn: "10000",
      ytBaseAssetIn: "1000",
      ytYieldAssetIn: "20000",
    },
  );

  console.log("deploy second WETH tranche");
  // second WETH tranche
  const {
    trancheContract: secondWethTrancheContract,
    fytPoolContract: secondWethFytPoolContract,
    ycPoolContract: secondWethYcPoolContract,
  } = await deployTrancheAndMarket(
    elementSigner,
    trancheFactory,
    wethYearnVaultAssetProxy,
    wethContract,
    balancerVaultContract,
    convergentPoolFactory,
    weightedPoolFactory,
    {
      mintAmount: "20000",
      baseAssetIn: "20000",
      yieldAssetIn: "10000",
      ytBaseAssetIn: "1000",
      ytYieldAssetIn: "20000",
      // ~ 3 months
      durationInSeconds: THIRTY_DAYS_IN_SECONDS * 3,
    },
  );

  console.log("deploy expired WETH tranche");
  // expired WETH tranche
  const {
    trancheContract: expiredWethTrancheContract,
    fytPoolContract: expiredWethFytPoolContract,
    ycPoolContract: expiredWethYcPoolContract,
  } = await deployTrancheAndMarket(
    elementSigner,
    trancheFactory,
    wethYearnVaultAssetProxy,
    wethContract,
    balancerVaultContract,
    convergentPoolFactory,
    weightedPoolFactory,
    {
      mintAmount: "2000",
      baseAssetIn: "20",
      yieldAssetIn: "13",
      ytBaseAssetIn: "100", // ratio must be 1:20
      ytYieldAssetIn: "2000",
      durationInSeconds: 120,
    },
  );

  await mintTrancheTokensForSigner(
    userSigner,
    wethContract,
    expiredWethTrancheContract,
    balancerVaultContract,
    userProxyContract,
  );
  await yWeth.updateShares();

  console.log("deploy USDC tranche");
  // usdc tranche
  const {
    trancheContract: usdcTrancheContract,
    fytPoolContract: usdcFytPoolContract,
    ycPoolContract: usdcYcPoolContract,
    fytPoolId: usdcFytPoolId,
    ycPoolId: usdcYcPoolId,
  } = await deployTrancheAndMarket(
    elementSigner,
    trancheFactory,
    usdcYearnVaultAssetProxy,
    usdcContract,
    balancerVaultContract,
    convergentPoolFactory,
    weightedPoolFactory,
    {
      mintAmount: "20000000",
      baseAssetIn: "20000000",
      yieldAssetIn: "10000000",
      ytBaseAssetIn: "100000",
      ytYieldAssetIn: "2000000",
    },
  );

  console.log("deploy expired USDC tranche");
  // expired usdc tranche
  const {
    trancheContract: expiredUsdcTrancheContract,
    fytPoolContract: expiredUsdcFytPoolContract,
    ycPoolContract: expiredYcPoolContract,
  } = await deployTrancheAndMarket(
    elementSigner,
    trancheFactory,
    usdcYearnVaultAssetProxy,
    usdcContract,
    balancerVaultContract,
    convergentPoolFactory,
    weightedPoolFactory,
    {
      mintAmount: "200000",
      baseAssetIn: "200000",
      yieldAssetIn: "100000",
      ytBaseAssetIn: "1000",
      ytYieldAssetIn: "20000",
      durationInSeconds: 120,
    },
  );

  console.log("mintTrancheTokensForSigner USDC");
  await mintTrancheTokensForSigner(
    userSigner,
    usdcContract,
    expiredUsdcTrancheContract,
    balancerVaultContract,
    userProxyContract,
  );

  // add some interest to yUsdc
  await yUsdc.updateShares();

  console.log("Disabling automine");
  await hre.ethers.provider.send("evm_setAutomine", [false]);
  console.log("Setting mining interval to 10s");
  await hre.ethers.provider.send("evm_setIntervalMining", [10_000]);

  // Produce a full list of all addresses deployed in the mian.ts script.
  const allAddresses = JSON.stringify(
    {
      // signer addresses
      elementAddress,
      balancerAddress,
      userAddress,

      // balancer
      balancerVaultAddress: balancerVaultContract.address,
      marketYcFactory: weightedPoolFactory.address,

      // yearn vaults
      wethYearnVaultAddress: yWeth.address,
      usdcYearnVaultAddress: yUsdc.address,

      // asset proxys
      wethYearnVaultAssetProxyAddress: wethYearnVaultAssetProxy.address,
      usdcYearnVaultAssetProxyAddress: usdcYearnVaultAssetProxy.address,

      // tranche contracts
      trancheFactoryAddress: trancheFactory.address,
      interestTokenFactoryAddress: interestTokenFactory.address,
      wethTrancheAddress: firstWethTrancheContract.address,
      usdcTrancheAddress: usdcTrancheContract.address,

      // market addresses and ids
      weightedPoolFactoryAddress: weightedPoolFactory.address,
      convergentPoolFactoryAddress: convergentPoolFactory.address,
      marketFyWethAddress: firstWethFytPoolContract.address,
      marketFyWethId: wethFytPoolId,
      marketYcWethAddress: firstWethYcPoolContract.address,
      marketYcWethId: wethYcPoolId,

      marketFyUsdcAddress: usdcFytPoolContract.address,
      marketFyUsdcId: usdcFytPoolId,
      marketYcUsdcAddress: usdcYcPoolContract.address,
      marketYcUsdcId: usdcYcPoolId,

      // user proxy
      userProxyContractAddress: userProxyContract.address,

      // weth addresses
      wethAddress: wethContract.address,

      //usdc addresses
      usdcAddress: usdcContract.address,
    },
    null,
    2,
  );

  console.log("all-addresses.json", allAddresses);
  fs.writeFileSync("./src/all-addresses.json", allAddresses);

  // Produce a schema-compliant testnet.addresses.json file
  const addressesJson: AddressesJsonFile = {
    chainId: 31337,
    addresses: {
      balancerVaultAddress: balancerVaultContract.address,
      trancheFactoryAddress: trancheFactory.address,
      interestTokenFactoryAddress: interestTokenFactory.address,
      weightedPoolFactoryAddress: weightedPoolFactory.address,
      convergentPoolFactoryAddress: convergentPoolFactory.address,
      userProxyContractAddress: userProxyContract.address,
      wethAddress: wethContract.address,
      usdcAddress: usdcContract.address,
      daiAddress: daiContract.address,
      wbtcAddress: "0x0000000000000000000000000000000000000000",
      "alusd3crv-fAddress": "0x0000000000000000000000000000000000000000",
      "lusd3crv-fAddress": "0x0000000000000000000000000000000000000000",
      "mim-3lp3crv-fAddress": "0x0000000000000000000000000000000000000000",
      eurscrvAddress: "0x0000000000000000000000000000000000000000",
      crv3cryptoAddress: "0x0000000000000000000000000000000000000000",
      crvtricryptoAddress: "0x0000000000000000000000000000000000000000",
      stecrvAddress: "0x0000000000000000000000000000000000000000",
    },
    safelist: [
      firstWethTrancheContract.address,
      firstWethFytPoolContract.address,
      firstWethYcPoolContract.address,

      secondWethTrancheContract.address,
      secondWethFytPoolContract.address,
      // don't add this yieldpool to the safelist so we can test hiding UI when the pool doesn't exist
      // secondWethYcPoolContract.address,

      expiredWethTrancheContract.address,
      expiredWethFytPoolContract.address,
      expiredWethYcPoolContract.address,

      usdcTrancheContract.address,
      usdcFytPoolContract.address,
      usdcYcPoolContract.address,

      expiredUsdcTrancheContract.address,
      expiredUsdcFytPoolContract.address,
      expiredYcPoolContract.address,
    ],
  };
  const schemaAddresses = JSON.stringify(addressesJson, null, 2);

  console.log("testnet.addresses.json", schemaAddresses);
  fs.writeFileSync("./src/addresses/testnet.addresses.json", schemaAddresses);

  const firstWethInterestTokenAddress =
    await firstWethTrancheContract.interestToken();
  const secondWethInterestTokenAddress =
    await secondWethTrancheContract.interestToken();
  const expiredWethInterestTokenAddress =
    await expiredWethTrancheContract.interestToken();
  const usdcInterestTokenAddress = await usdcTrancheContract.interestToken();

  const symbolOverrides = {
    [firstWethTrancheContract.address]: "ePyvCurve-stETH",
    [secondWethTrancheContract.address]: "ePyvCurve-stETH",
    [expiredWethTrancheContract.address]: "ePyvCurve-stETH",
    [usdcTrancheContract.address]: "ePyvUSDC",

    [firstWethInterestTokenAddress]: "eYyvCurve-stETH",
    [secondWethInterestTokenAddress]: "eYyvCurve-stETH",
    [expiredWethInterestTokenAddress]: "eYyvCurve-stETH",
    [usdcInterestTokenAddress]: "eYyvUSDC",
  };

  fs.writeFileSync(
    "./src/addresses/testnet.symbolOverrides.json",
    JSON.stringify(symbolOverrides),
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

async function mintTrancheTokensForSigner(
  signer: Signer,
  // WETH for now since ERC20 doesn't have a mint method
  baseAssetContractUnsigned: WETH | USDC,
  trancheContractUnsigend: Tranche,
  balancerVaultContract: Vault,
  userProxyContractUnsigend: UserProxy,
  amount = "100",
) {
  const signerAddress = await signer.getAddress();
  const baseAssetContract = baseAssetContractUnsigned.connect(signer);
  const trancheContract = trancheContractUnsigend.connect(signer);
  const userProxyContract = userProxyContractUnsigend.connect(signer);

  await baseAssetContract.approve(balancerVaultContract.address, MAX_ALLOWANCE);
  await trancheContract.approve(balancerVaultContract.address, MAX_ALLOWANCE);
  const baseAssetDecimals = await baseAssetContract.decimals();
  await baseAssetContract.mint(
    signerAddress,
    parseUnits(amount, baseAssetDecimals),
  );

  await baseAssetContract.approve(userProxyContract.address, MAX_ALLOWANCE);
  const expiration = await trancheContract.unlockTimestamp();
  const position = await trancheContract.position();

  const mintTx = await userProxyContract.mint(
    parseUnits(amount, baseAssetDecimals),
    baseAssetContract.address,
    expiration,
    position,
    [],
  );
  await mintTx.wait(1);
}
