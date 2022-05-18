import "@typechain/hardhat";
import "@typechain/ethers-v5";

import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  typechain: {
    outDir: "typechain/",
    target: "ethers-v5",
    alwaysGenerateOverloads: true,
    externalArtifacts: ["externalArtifacts/*.json"],
  },
  solidity: {
    compilers: [
      {
        version: "0.7.1",
      },
      {
        version: "0.8.0",
      },
    ],
    overrides: {
      "contracts/balancer-core-v2/vault/Vault.sol": {
        version: "0.7.1",
      },
      "contracts/balancer-core-v2/pools/weighted/WeightedPoolFactory.sol": {
        version: "0.7.1",
      },
      "contracts/balancer-core-v2/pools/weighted/WeightedPool2TokensFactory.sol":
        {
          version: "0.7.1",
        },
    },
  },
};

export default config;
