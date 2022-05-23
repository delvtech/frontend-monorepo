import "@typechain/hardhat";

import { HardhatUserConfig } from "hardhat/config";

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
};

export default config;
