import "@typechain/hardhat";

import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  paths: {
    sources: process.env.SOURCE_CONTRACTS_PATH,
  },
  solidity: {
    compilers: [
      {
        version: "0.4.24",
      },
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
    outDir: process.env.TYPECHAIN_OUTDIR,
    target: "ethers-v5",
  },
};

export default config;
