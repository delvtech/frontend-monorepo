import {
  Airdrop__factory,
  PrivateAirdrop__factory,
  CoreVoting__factory,
  ERC20Permit__factory,
  LockingVault__factory,
  OptimisticRewards__factory,
  VestingVault__factory,
  GSCVault__factory,
} from "@elementfi/council-typechain";
import { addressesJson } from "src/addresses";
import { defaultProvider } from "src/providers/providers";

export const elementTokenContract = ERC20Permit__factory.connect(
  addressesJson.addresses.elementToken,
  defaultProvider,
);

export const lockingVaultContract = LockingVault__factory.connect(
  addressesJson.addresses.lockingVault,
  defaultProvider,
);

export const rewardsContract = OptimisticRewards__factory.connect(
  addressesJson.addresses.optimisticRewardsVault,
  defaultProvider,
);

export const coreVotingContract = CoreVoting__factory.connect(
  addressesJson.addresses.coreVoting,
  defaultProvider,
);

export const vestingContract = VestingVault__factory.connect(
  addressesJson.addresses.vestingVault,
  defaultProvider,
);

export const airdropContract = Airdrop__factory.connect(
  addressesJson.addresses.airdrop,
  defaultProvider,
);

export const gscVaultContract = GSCVault__factory.connect(
  addressesJson.addresses.gscVault,
  defaultProvider,
);

export const gscCoreVotingContract = CoreVoting__factory.connect(
  addressesJson.addresses.gscCoreVoting,
  defaultProvider,
);

export const githubTier1PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    addressesJson.addresses.githubTier1Airdrop,
    defaultProvider,
  );

export const githubTier2PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    addressesJson.addresses.githubTier2Airdrop,
    defaultProvider,
  );

export const githubTier3PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    addressesJson.addresses.githubTier3Airdrop,
    defaultProvider,
  );

export const discordTier1PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    addressesJson.addresses.discordTier1Airdrop,
    defaultProvider,
  );

export const discordTier2PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    addressesJson.addresses.discordTier2Airdrop,
    defaultProvider,
  );

export const discordTier3PrivateAirdropContract =
  PrivateAirdrop__factory.connect(
    addressesJson.addresses.discordTier3Airdrop,
    defaultProvider,
  );
