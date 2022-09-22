import { HardhatNetworkAccountsUserConfig } from "hardhat/types";
import { HardhatUserConfig } from "hardhat/config";
import { existsSync, readFileSync } from "fs";

// This adds support for typescript paths
import "tsconfig-paths/register";

import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "src/tasks";
import getAccounts from "src/utils/getAccounts";

const { GOERLI_RPC, PRIVATE_KEY } = process.env;
console.log(GOERLI_RPC, PRIVATE_KEY);

// Go to https://hardhat.org/config/ to learn more
const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      accounts: getAccounts(),
    },
    goerli: {
      url: GOERLI_RPC,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
