import { HardhatUserConfig } from "hardhat/config";

import "@nomiclabs/hardhat-ethers";

// This adds support for typescript paths mappings
import "tsconfig-paths/register";
import "dotenv/config";

console.log("aaaaaaaaaaaaaaaaaaaaaaaaaa");

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

  networks: {
    hardhat: {
      gas: 1000000000000000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`,
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_GOERLI_API_KEY}`,
    },
  },
};

export default config;
