// This adds support for typescript paths mappings
import "@nomiclabs/hardhat-ethers";
import "tsconfig-paths/register";

// This adds ethers to the hre which has dev utilities for local testnet like 'getSigners()'
import fs from "fs";
import { HardhatUserConfig, task } from "hardhat/config";
import { getTokenList } from "src/getTokenList";

interface BuildTaskArgs {
  chain: "mainnet" | "goerli";
}

task("build-tokenlist", "Builds a council tokenlist for a single chain")
  .addParam(
    "chain",
    "The chain name, i.e. goerli, mainnet",
    undefined,
    undefined,
    false,
  )
  .setAction(async (taskArgs, hre) => {
    const { provider } = hre.ethers;
    const { chain } = taskArgs as BuildTaskArgs;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const addressesJson = require(`src/addresses/${chain}.addresses.json`);
    const tokenList = await getTokenList(
      provider,
      addressesJson,
      `Council ${chain} token list`,
    );

    const tokenListString = JSON.stringify(tokenList, null, 2);

    // TODO: We have to validate this json schema ourselves before it can be
    // published to the uniswap directory.  For now, just look at this file in
    // vscode and make sure there are no squiggles.
    fs.writeFileSync(`src/tokenlists/${chain}.tokenlist.json`, tokenListString);
  });

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  paths: {
    sources: "src",
  },
  solidity: {
    compilers: [
      {
        version: "0.7.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000,
          },
        },
      },
      {
        version: "0.8.3",
        settings: {
          optimizer: {
            enabled: true,
            runs: 7500,
          },
        },
      },
    ],
  },
  mocha: { timeout: 0 },
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_MAINNET_API_KEY}`,
        blockNumber: 11853372,
      },
      accounts: {
        accountsBalance: "100000000000000000000000", // 100000 ETH
        count: 5,
      },
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
