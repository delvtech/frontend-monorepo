import "@nomiclabs/hardhat-waffle";
// uncomment this to compile vyper contracts
// import "@nomiclabs/hardhat-vyper";
import "@typechain/hardhat";
import { HardhatUserConfig, task, types } from "hardhat/config";
import "module-alias/register";

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

const config: HardhatUserConfig = {
  paths: {
    sources: "src",
    tests: "src/tests",
  },
  // uncomment this to compile vyper contracts.  the version in the file must match.
  // vyper: {
  // CRVPool
  // version: "0.2.12",
  // CRVToken
  //   version: "0.2.8",
  // },
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
      gas: 1000000000000000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
    },
  },
};

export default config;
