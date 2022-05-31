import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "tsconfig-paths/register";

import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
dotenv.config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  mocha: { timeout: 0 },
  paths: {
    tests: "./src",
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
    },
  },
};

export default config;
