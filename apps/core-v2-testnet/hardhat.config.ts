import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

// This adds support for typescript paths
import "tsconfig-paths/register";
import { existsSync, readFileSync } from "fs";
import { HardhatNetworkAccountsUserConfig } from "hardhat/types";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

const EXPECTED_ACCOUNT_FILE = "accounts.json";

// Expects a json file with a list of private keys
const getAccounts = (): string[] | undefined => {
  if (existsSync(EXPECTED_ACCOUNT_FILE)) {
    console.log("External list of accounts loaded. \n");
    const externalAccounts = readFileSync(EXPECTED_ACCOUNT_FILE);
    return JSON.parse(externalAccounts.toString());
  }

  console.warn("Could not find external account list.");
};

const externalAccounts = getAccounts();

const accounts: HardhatNetworkAccountsUserConfig = externalAccounts
  ? externalAccounts.map((address) => ({
      privateKey: address,
      balance: "100000000000000000000000", // 100000 ETH
    }))
  : {
      accountsBalance: "100000000000000000000000",
      count: 5,
    };

// Go to https://hardhat.org/config/ to learn more
const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      accounts,
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
