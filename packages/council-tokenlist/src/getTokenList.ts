import { TreasuryInfo } from "./types";
import { Provider } from "@ethersproject/abstract-provider";
import { TokenInfo, TokenList } from "@uniswap/token-lists";
import { AddressesJsonFile } from "src/addresses/AddressesJsonFile";
import { getAirdropInfo } from "src/getAirdropInfo";
import { getCoreVotingInfo } from "src/getCoreVotingInfo";
import { getGscVaultInfo } from "src/getGscVaultInfo";
import { getLockingVaultInfo } from "src/getLockingVaultInfo";
import { getOptimisticGrantsInfo } from "src/getOptimisticGrantsInfo";
import { getOptimisticRewardsVaultInfo } from "src/getOptimisticRewardsVaultInfo";
import { getTimelockInfo } from "src/getTimelock";
import { getTreasuryInfo } from "src/getTreasuryInfo";
import { getVotingTokenInfo } from "src/getVotingTokenInfo";
import { OptimisticsGrantsContractInfo } from "src/types";

export async function getTokenList(
  provider: Provider,
  addressesJson: AddressesJsonFile,
  name: string,
): Promise<TokenList> {
  const {
    chainId,
    addresses: {
      elementToken,
      coreVoting,
      gscCoreVoting,
      timeLock,
      lockingVault,
      vestingVault,
      optimisticRewardsVault,
      airdrop,
      optimisticGrants,
      treasury,
      gscVault,
    },
  } = addressesJson;

  const elementTokenInfo = await getVotingTokenInfo(
    provider,
    chainId,
    elementToken,
  );

  const coreVotingInfo = await getCoreVotingInfo(
    provider,
    chainId,
    coreVoting,
    "Element Core Voting Contract",
  );

  const gscCoreVotingInfo = await getCoreVotingInfo(
    provider,
    chainId,
    gscCoreVoting,
    "Element GSC Core Voting Contract",
  );

  const lockingVaultInfo = await getLockingVaultInfo(
    provider,
    chainId,
    lockingVault,
    "Element Locking Vault",
  );

  const vestingVaultInfo = await getLockingVaultInfo(
    provider,
    chainId,
    vestingVault,
    "Element Vesting Vault",
  );

  const gscVaultInfo = await getGscVaultInfo(
    provider,
    chainId,
    gscVault,
    "Element Governance Steering Committee Vault",
  );

  const optimisticRewardsVaultInfo = await getOptimisticRewardsVaultInfo(
    provider,
    chainId,
    optimisticRewardsVault,
    "Element Optimistic Rewards Vault",
  );

  let optimisticGrantsInfo: OptimisticsGrantsContractInfo | undefined;
  try {
    optimisticGrantsInfo = await getOptimisticGrantsInfo(
      provider,
      chainId,
      optimisticGrants,
      "Element Optimistic Grants Vault",
    );
  } catch (error) {
    console.log("error fetching optimistic grants info", error);
  }

  const airdropInfo = await getAirdropInfo(
    provider,
    chainId,
    airdrop,
    "Element Airdrop Contract",
  );

  let treasuryInfo: TreasuryInfo | undefined;
  try {
    treasuryInfo = await getTreasuryInfo(
      provider,
      chainId,
      treasury,
      "Element Treasury",
    );
  } catch (error) {
    console.log("error fetching treasury info", error);
  }

  const timelockInfo = await getTimelockInfo(
    provider,
    chainId,
    timeLock,
    "Element Timelock",
  );

  const tokenList: TokenList = {
    name,
    logoURI: "https://element.fi/logo.svg",
    timestamp: new Date().toISOString(),
    version: {
      major: 0,
      minor: 1,
      patch: 0,
    },
    tokens: [
      elementTokenInfo,
      coreVotingInfo,
      gscCoreVotingInfo,
      lockingVaultInfo,
      vestingVaultInfo,
      gscVaultInfo,
      optimisticRewardsVaultInfo,
      optimisticGrantsInfo,
      airdropInfo,
      treasuryInfo,
      timelockInfo,
    ].filter((t): t is TokenInfo => !!t),
  };

  return tokenList;
}
