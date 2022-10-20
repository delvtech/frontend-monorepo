// This adds ethers to the hre which has dev utilities for local testnet like 'getSigners()'
import "@nomiclabs/hardhat-waffle";
// Typechain support for hardhat
import "@typechain/hardhat";
import "dotenv/config";
// Ethernal plugin - a blockchain / contract explorer for private testnets
import "hardhat-ethernal";
// This adds support for typescript paths mappings
import "tsconfig-paths/register";
import "src/tasks.ts";

import { extendEnvironment, HardhatUserConfig } from "hardhat/config";

const syncEthernal = Boolean(process.env.SYNC_ETHERNAL);
extendEnvironment((hre) => {
  hre.ethernalSync = syncEthernal;
  hre.ethernalWorkspace = "Hardhat Network";
  // paid feature, disable for now
  hre.ethernalTrace = false;
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
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
  mocha: { timeout: 0 },
  networks: {
    hardhat: {
      accounts: {
        accountsBalance: "100000000000000000000000", // 100000 ETH
        count: 10,
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

// const { USE_MAINNET_FORK } = process.env;

// if (USE_MAINNET_FORK) {
//   config.networks = {
//     ...config.networks,
//     hardhat: {
//       forking: {
//         url: process.env.MAINNET_URI || "",
//         blockNumber: 14688407,
//       },
//       accounts: {
//         accountsBalance: "100000000000000000000000", // 100000 ETH
//         count: 10,
//       },
//     },
//   };
// }

export default config;
