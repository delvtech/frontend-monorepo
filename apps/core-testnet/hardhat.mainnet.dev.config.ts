import "@nomiclabs/hardhat-waffle";
import "hardhat-tracer";
import "module-alias/register";
import "@typechain/hardhat";

import {
  HardhatUserConfig,
  task,
  types,
  extendEnvironment,
} from "hardhat/config";

import manipulateTokenBalances from "./src/scripts/manipulateTokenBalances";

task("intervalMining", "Mine blocks on an interval")
  .addOptionalParam(
    "interval",
    "ms interval to mine blocks at. default is 10s",
    10000,
    types.int,
  )
  .setAction(async (taskArgs, hre) => {
    const { interval = 10000 } = taskArgs;
    console.log("Disabling automine");
    await hre.ethers.provider.send("evm_setAutomine", [false]);
    console.log("Setting mining interval to", interval);
    await hre.ethers.provider.send("evm_setIntervalMining", [interval]);
  });

task("autoMine", "Mine blocks on every transaction automatically").setAction(
  async (taskArgs, hre) => {
    console.log("Enabling automine");
    await hre.ethers.provider.send("evm_setAutomine", [true]);
    console.log("Disabling interval");
    await hre.ethers.provider.send("evm_setIntervalMining", [0]);
  },
);

task(
  "manipulateTokenBalances",
  "Sets storage slots on an array of ERC20 functions",
).setAction(async (_, hre) => {
  const [, { address }] = await hre.ethers.getSigners();
  await manipulateTokenBalances(address, hre.ethers.provider);
});

extendEnvironment((hre) => {
  hre.run("manipulateTokenBalances");
});

const config: HardhatUserConfig = {
  paths: {
    sources: "src",
  },
  solidity: {
    compilers: [
      {
        version: "0.5.12",
      },
      {
        version: "0.7.1",
      },
      {
        version: "0.8.0",
      },
    ],
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`,
        blockNumber: 13880010, // update liberally to CURRENT_BLOCK - 1 DAY
      },
      accounts: { count: 5 },
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`,
    },
  },
};

export default config;
