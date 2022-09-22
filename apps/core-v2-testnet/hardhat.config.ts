// This adds support for typescript paths
import "tsconfig-paths/register";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";
import "src/tasks";
import getAccounts from "src/utils/getAccounts";
import { HardhatUserConfig } from "hardhat/config";

const { GOERLI_RPC, PRIVATE_KEY, REPORT_GAS, ETHERSCAN_API } = process.env;

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
    enabled: REPORT_GAS !== undefined,
    currency: "USD",
  },

  etherscan: {
    apiKey: ETHERSCAN_API,
  },
};

export default config;
