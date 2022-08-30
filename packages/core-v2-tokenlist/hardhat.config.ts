// This adds support for typescript paths mappings
import "@nomiclabs/hardhat-ethers";
import "tsconfig-paths/register";
import "dotenv/config";

// This adds ethers to the hre which has dev utilities for local testnet like 'getSigners()'
import fs from "fs";
import { HardhatUserConfig, task } from "hardhat/config";
import { getTokenList } from "src/getTokenList";

task("build-tokenlist", "Builds a the tokenlist for a single chain").setAction(
  async (_, hre) => {
    const { provider } = hre.ethers;
    const chain = hre.network.name;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const addressesJson = require(`src/addresses/${chain}.addresses.json`);
    const tokenList = await getTokenList(
      provider,
      addressesJson,
      `Core V2 ${chain} token list`,
    );
    const tokenListString = JSON.stringify(tokenList, null, 2);

    // // TODO: We have to validate this json schema ourselves before it can be
    // // published to the uniswap directory.  For now, just look at this file in
    // // vscode and make sure there are no squiggles.
    fs.writeFileSync(`src/tokenlists/${chain}.tokenlist.json`, tokenListString);
  },
);

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  paths: {
    sources: "src",
    // root: "src",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.15",
        settings: {
          optimizer: {
            enabled: true,
            runs: 7500,
          },
          viaIR: true,
        },
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: process.env.MAINNET_URI as string,
        blockNumber: 11853372,
      },
      accounts: {
        accountsBalance: "100000000000000000000000", // 100000 ETH
        count: 5,
      },
    },
    mainnet: {
      url: process.env.MAINNET_URI,
    },
    goerli: {
      url: process.env.GOERLI_URI,
    },
  },
};

export default config;
