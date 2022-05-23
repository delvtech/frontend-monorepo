import { BigNumber } from "ethers";

// copied from balancer v2: contracts/vault/interfaces/IVault.sol.  Would be nice to get these from
// typechain once they include enums
export const PoolSpecialization = {
  GENERAL: BigNumber.from(0),
  MINIMAL_SWAP_INFO: BigNumber.from(1),
  TWO_TOKEN: BigNumber.from(2),
} as const;
