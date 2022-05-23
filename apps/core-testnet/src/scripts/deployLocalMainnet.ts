import "module-alias/register";

import { Signer } from "ethers";
import { parseEther } from "ethers/lib/utils";
import fs from "fs";
import hre, { ethers } from "hardhat";

import {
  ConvergentPoolFactory__factory,
  ERC20__factory,
  InterestTokenFactory__factory,
  TrancheFactory__factory,
  USDC__factory,
  UserProxy__factory,
  Vault__factory,
  WeightedPoolFactory__factory,
  WETH__factory,
} from "src/types";

import { AddressesJsonFile } from "src/addresses/AddressesJsonFile";
import { deployTrancheAndMarket } from "src/scripts/deployTrancheAndMarket";
import { deployVaultsAndProxys } from "src/scripts/deployVaultsAndProxys";
import { getSigner, SIGNER } from "src/scripts/getSigner";

const ETH_WHALE_ADDRESS = "0x73bceb1cd57c711feac4224d062b0f6ff338501e";
const WETH_WHALE_ADDRESS = "0x0f4ee9631f4be0a63756515141281a3e2b293bbe";
const USDC_WHALE_ADDRESS = "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503";
const DAI_WHALE_ADDRESS = "0x4f868c1aa37fcf307ab38d215382e88fca6275e2";

const json: AddressesJsonFile = {
  chainId: 1,
  addresses: {
    balancerVaultAddress: "0xBA12222222228d8Ba445958a75a0704d566BF2C8",
    convergentPoolFactoryAddress: "0xb7561f547F3207eDb42A6AfA42170Cd47ADD17BD",
    daiAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
    interestTokenFactoryAddress: "0x17cb1f74119DFE718f786A05bEa7D71bF438678c",
    trancheFactoryAddress: "0x62F161BF3692E4015BefB05A03a94A40f520d1c0",
    usdcAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    userProxyContractAddress: "0xEe4e158c03A10CBc8242350d74510779A364581C",
    weightedPoolFactoryAddress: "0x8E9aa87E45e92bad84D5F8DD1bff34Fb92637dE9",
    wethAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
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
    "0x94BE72dc46fe8f7e9f40FBD2c31826f472F4036E",
    "0x0a9E96988E21c9A03B8DC011826A00259e02C46e",
    "0x6De69beB66317557E65168BD7D3fff22a89dBb11",
  ],
};

async function main() {
  const {
    balancerSigner,
    userSigner,
    wethWhaleSigner: elementSigner,
    ethWhaleSigner,
  } = await getSigners();

  const elementAddress = await elementSigner.getAddress();
  const balancerAddress = await balancerSigner.getAddress();
  const userAddress = await userSigner.getAddress();

  // give elementSigner a good amount of ETH too
  ethWhaleSigner.sendTransaction({
    to: elementAddress,
    value: parseEther("10000"),
  });

  const { wethContract, usdcContract, daiContract } =
    getBaseAssetContracts(elementSigner);

  // get balancer vault
  const balancerVaultContract = Vault__factory.connect(
    json.addresses.balancerVaultAddress,
    elementSigner,
  );

  // register element with balancer so we can deploy pools
  await balancerVaultContract.setRelayerApproval(
    elementAddress,
    elementAddress,
    true,
  );

  // get factories
  const {
    trancheFactory,
    interestTokenFactory,
    convergentPoolFactory,
    weightedPoolFactory,
  } = getFactoryContracts(elementSigner);

  // get user proxy
  const userProxyContract = UserProxy__factory.connect(
    json.addresses.userProxyContractAddress,
    elementSigner,
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
      mintAmount: "200",
      baseAssetIn: "200",
      yieldAssetIn: "100",
      ytBaseAssetIn: "10",
      ytYieldAssetIn: "200",
    },
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
      // usdcTrancheAddress: usdcTrancheContract.address,

      // market addresses and ids
      weightedPoolFactoryAddress: weightedPoolFactory.address,
      convergentPoolFactoryAddress: convergentPoolFactory.address,
      marketFyWethAddress: firstWethFytPoolContract.address,
      marketFyWethId: wethFytPoolId,
      marketYcWethAddress: firstWethYcPoolContract.address,
      marketYcWethId: wethYcPoolId,

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
      wbtcAddress: "0x0000000000000000000000000000000000000000",
      "alusd3crv-fAddress": "0x0000000000000000000000000000000000000000",
      "lusd3crv-fAddress": "0x0000000000000000000000000000000000000000",
      "mim-3lp3crv-fAddress": "0x0000000000000000000000000000000000000000",
      crv3cryptoAddress: "0x0000000000000000000000000000000000000000",
      eurscrvAddress: "0x0000000000000000000000000000000000000000",
      wethAddress: wethContract.address,
      usdcAddress: usdcContract.address,
      daiAddress: daiContract.address,
      crvtricryptoAddress: "0x0000000000000000000000000000000000000000",
      stecrvAddress: "0x0000000000000000000000000000000000000000",
    },
    safelist: [
      firstWethTrancheContract.address,
      firstWethFytPoolContract.address,
      firstWethYcPoolContract.address,
    ],
  };
  const schemaAddresses = JSON.stringify(addressesJson, null, 2);

  console.log("testnet.addresses.json", schemaAddresses);
  fs.writeFileSync("./src/addresses/testnet.addresses.json", schemaAddresses);

  const firstWethInterestTokenAddress =
    await firstWethTrancheContract.interestToken();

  const symbolOverrides = {
    [firstWethTrancheContract.address]: "ePyvCurve-stETH",
    [firstWethInterestTokenAddress]: "eYyvCurve-stETH",
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

function getBaseAssetContracts(elementSigner: Signer) {
  const wethContract = WETH__factory.connect(
    json.addresses.wethAddress,
    elementSigner,
  );

  const usdcContract = USDC__factory.connect(
    json.addresses.usdcAddress,
    elementSigner,
  );

  const daiContract = ERC20__factory.connect(
    json.addresses.daiAddress,
    elementSigner,
  );
  return { wethContract, usdcContract, daiContract };
}

function getFactoryContracts(elementSigner: Signer) {
  const weightedPoolFactory = WeightedPoolFactory__factory.connect(
    json.addresses.weightedPoolFactoryAddress,
    elementSigner,
  );
  const convergentPoolFactory = ConvergentPoolFactory__factory.connect(
    json.addresses.convergentPoolFactoryAddress,
    elementSigner,
  );
  const interestTokenFactory = InterestTokenFactory__factory.connect(
    json.addresses.interestTokenFactoryAddress,
    elementSigner,
  );

  const trancheFactory = TrancheFactory__factory.connect(
    json.addresses.trancheFactoryAddress,
    elementSigner,
  );

  return {
    weightedPoolFactory,
    convergentPoolFactory,
    interestTokenFactory,
    trancheFactory,
  };
}

async function getSigners() {
  const elementSigner = await getSigner(SIGNER.ELEMENT, hre);
  const balancerSigner = await getSigner(SIGNER.ELEMENT, hre);
  const userSigner = await getSigner(SIGNER.USER, hre);

  // get some whale accounts
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [ETH_WHALE_ADDRESS],
  });
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [WETH_WHALE_ADDRESS],
  });
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [USDC_WHALE_ADDRESS],
  });
  await hre.network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [DAI_WHALE_ADDRESS],
  });

  const ethWhaleSigner = await ethers.provider.getSigner(ETH_WHALE_ADDRESS);
  const wethWhaleSigner = await ethers.provider.getSigner(WETH_WHALE_ADDRESS);
  const usdcWhaleSigner = await ethers.provider.getSigner(USDC_WHALE_ADDRESS);
  const daiWhaleSigner = await ethers.provider.getSigner(DAI_WHALE_ADDRESS);
  return {
    elementSigner,
    balancerSigner,
    userSigner,
    ethWhaleSigner,
    wethWhaleSigner,
    usdcWhaleSigner,
    daiWhaleSigner,
  };
}
