"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

var elfCouncilTypechain = require("elf-council-typechain");
var ethers = require("ethers");
var utils = require("ethers/lib/utils");

var addresses$1 = {
  airdrop: "0xb7920477F7A39c3DffA925076857eB1585503e1B",
  coreVoting: "0x0CB8aa45068EE31e97B717b0B35e26A43884c84c",
  elementToken: "0x2b1a91De5B9C3Ad6439eeAeD0E481F8cf6E22601",
  gscCoreVoting: "0x600c4926c9F88beCE3533ceaAA36804d6E23F1c1",
  gscVault: "0x0A575bFA79454112c37B9Af2a6362c9c68f7d2e3",
  lockingVault: "0xb5E8AF575Ee302A24c6C7746a99D895BeF67cb5D",
  optimisticGrants: "0x092B49777CB45dc4939FBc4029ce7a116D63D29D",
  optimisticRewardsVault: "0x0000000000000000000000000000000000000000",
  spender: "0x722289C399e6f4AbCE80FaFbABC9a9876432834C",
  timeLock: "0x36687bdD319a78AB4b4347f3A7459Da235AFc4f4",
  treasury: "0xd46dDb33A33FD3D352d08cc7022Ce1f5c6ccFF1a",
  vestingVault: "0xe69D2F8DeD2924e0845118E7E467Fc97F7994ef6",
};
var chainId$1 = 5;
var goerliAddressListJson = {
  addresses: addresses$1,
  chainId: chainId$1,
};

var name$1 = "Council goerli token list";
var logoURI$1 = "https://element.fi/logo.svg";
var timestamp$1 = "2022-02-08T21:51:54.132Z";
var version$1 = {
  major: 0,
  minor: 1,
  patch: 0,
};
var tokens$1 = [
  {
    chainId: 5,
    address: "0x2b1a91De5B9C3Ad6439eeAeD0E481F8cf6E22601",
    symbol: "🧝",
    decimals: 18,
    name: "Definitely Not Element Token",
  },
  {
    chainId: 5,
    address: "0x0CB8aa45068EE31e97B717b0B35e26A43884c84c",
    name: "Element Core Voting Contract",
    decimals: 0,
    symbol: "",
    extensions: {
      dayInBlocks: 6496,
      baseQuorum: "1000000.0",
      lockDuration: 19488,
      minProposalPower: "0.000000000000000001",
      extraVoteTime: 32480,
    },
  },
  {
    chainId: 5,
    address: "0x600c4926c9F88beCE3533ceaAA36804d6E23F1c1",
    name: "Element GSC Core Voting Contract",
    decimals: 0,
    symbol: "",
    extensions: {
      dayInBlocks: 6496,
      baseQuorum: "0.000000000000000001",
      lockDuration: 19488,
      minProposalPower: "0.000000000000000001",
      extraVoteTime: 32480,
    },
  },
  {
    chainId: 5,
    address: "0xb5E8AF575Ee302A24c6C7746a99D895BeF67cb5D",
    name: "Element Locking Vault",
    decimals: 0,
    symbol: "",
    extensions: {
      token: "0x2b1a91De5B9C3Ad6439eeAeD0E481F8cf6E22601",
      staleBlockLag: 30000,
    },
  },
  {
    chainId: 5,
    address: "0xe69D2F8DeD2924e0845118E7E467Fc97F7994ef6",
    name: "Element Vesting Vault",
    decimals: 0,
    symbol: "",
    extensions: {
      token: "0x2b1a91De5B9C3Ad6439eeAeD0E481F8cf6E22601",
      staleBlockLag: 20000,
    },
  },
  {
    chainId: 5,
    address: "0x0A575bFA79454112c37B9Af2a6362c9c68f7d2e3",
    name: "Element Governance Steering Committee Vault",
    decimals: 0,
    symbol: "",
    extensions: {
      coreVoting: "0x0CB8aa45068EE31e97B717b0B35e26A43884c84c",
      votingPowerBound: "100000000000000000000000",
      idleDuration: "345600",
    },
  },
  {
    chainId: 5,
    address: "0xb7920477F7A39c3DffA925076857eB1585503e1B",
    name: "Element Airdrop Contract",
    decimals: 0,
    symbol: "",
    extensions: {
      rewardsRoot:
        "0x9aafc9b1d8798b80c68d556519e69c64fbe5a4b205bbdccec12375353a1bf784",
      lockingVault: "0xb5E8AF575Ee302A24c6C7746a99D895BeF67cb5D",
      expiration: "9999999999",
      token: "0x2b1a91De5B9C3Ad6439eeAeD0E481F8cf6E22601",
    },
  },
  {
    chainId: 5,
    address: "0xd46dDb33A33FD3D352d08cc7022Ce1f5c6ccFF1a",
    name: "Element Treasury",
    decimals: 0,
    symbol: "",
    extensions: {
      owner: "0xcF3b7bcBbcEFF836F81f6EAd914706E699267bca",
    },
  },
  {
    chainId: 5,
    address: "0x36687bdD319a78AB4b4347f3A7459Da235AFc4f4",
    name: "Element Timelock",
    decimals: 0,
    symbol: "",
    extensions: {
      waitTime: "1",
    },
  },
];
var goerliTokenListJson = {
  name: name$1,
  logoURI: logoURI$1,
  timestamp: timestamp$1,
  version: version$1,
  tokens: tokens$1,
};

var addresses = {
  airdrop: "0xd04a459FFD3A5E3C93d5cD8BB13d26a9845716c2",
  coreVoting: "0xEaCD577C3F6c44C3ffA398baaD97aE12CDCFed4a",
  elementToken: "0x5c6D51ecBA4D8E4F20373e3ce96a62342B125D6d",
  gscCoreVoting: "0x40309f197e7f94B555904DF0f788a3F48cF326aB",
  gscVault: "0xcA870E8aa4FCEa85b5f0c6F4209C8CBA9265B940",
  lockingVault: "0x02Bd4A3b1b95b01F2Aa61655415A5d3EAAcaafdD",
  optimisticGrants: "0x0000000000000000000000000000000000000000",
  optimisticRewardsVault: "0x0000000000000000000000000000000000000000",
  spender: "0xDa2Baf34B5717b257e52039f78d02B9C58751781",
  timeLock: "0x81758f3361A769016eae4844072FA6d7f828a651",
  treasury: "0x82eF450FB7f06E3294F2f19ed1713b255Af0f541",
  vestingVault: "0x6De73946eab234F1EE61256F10067D713aF0e37A",
};
var chainId = 1;
var mainnetAddressListJson = {
  addresses: addresses,
  chainId: chainId,
};

var name = "Council mainnet token list";
var logoURI = "https://element.fi/logo.svg";
var timestamp = "2022-03-28T21:52:58.572Z";
var version = {
  major: 0,
  minor: 1,
  patch: 0,
};
var tokens = [
  {
    chainId: 1,
    address: "0x5c6D51ecBA4D8E4F20373e3ce96a62342B125D6d",
    symbol: "ELFI",
    decimals: 18,
    name: "Element Finance",
  },
  {
    chainId: 1,
    address: "0xEaCD577C3F6c44C3ffA398baaD97aE12CDCFed4a",
    name: "Element Core Voting Contract",
    decimals: 0,
    symbol: "",
    extensions: {
      dayInBlocks: 6496,
      baseQuorum: "1100000.0",
      lockDuration: 19488,
      minProposalPower: "55000.0",
      extraVoteTime: 32480,
    },
  },
  {
    chainId: 1,
    address: "0x40309f197e7f94B555904DF0f788a3F48cF326aB",
    name: "Element GSC Core Voting Contract",
    decimals: 0,
    symbol: "",
    extensions: {
      dayInBlocks: 6496,
      baseQuorum: "0.000000000000000001",
      lockDuration: 19488,
      minProposalPower: "0.000000000000000001",
      extraVoteTime: 32480,
    },
  },
  {
    chainId: 1,
    address: "0x02Bd4A3b1b95b01F2Aa61655415A5d3EAAcaafdD",
    name: "Element Locking Vault",
    decimals: 0,
    symbol: "",
    extensions: {
      token: "0x5c6D51ecBA4D8E4F20373e3ce96a62342B125D6d",
      staleBlockLag: 200000,
    },
  },
  {
    chainId: 1,
    address: "0x6De73946eab234F1EE61256F10067D713aF0e37A",
    name: "Element Vesting Vault",
    decimals: 0,
    symbol: "",
    extensions: {
      token: "0x5c6D51ecBA4D8E4F20373e3ce96a62342B125D6d",
      staleBlockLag: 200000,
    },
  },
  {
    chainId: 1,
    address: "0xcA870E8aa4FCEa85b5f0c6F4209C8CBA9265B940",
    name: "Element Governance Steering Committee Vault",
    decimals: 0,
    symbol: "",
    extensions: {
      coreVoting: "0xEaCD577C3F6c44C3ffA398baaD97aE12CDCFed4a",
      votingPowerBound: "1000000000000000000000000",
      idleDuration: "345600",
    },
  },
  {
    chainId: 1,
    address: "0xd04a459FFD3A5E3C93d5cD8BB13d26a9845716c2",
    name: "Element Airdrop Contract",
    decimals: 0,
    symbol: "",
    extensions: {
      rewardsRoot:
        "0x5868b38fb60678b88b07721f03bc9bfd5be6b4f17829f5703e3556b31f4073c6",
      lockingVault: "0x02Bd4A3b1b95b01F2Aa61655415A5d3EAAcaafdD",
      expiration: "1680220799",
      token: "0x5c6D51ecBA4D8E4F20373e3ce96a62342B125D6d",
    },
  },
  {
    chainId: 1,
    address: "0x82eF450FB7f06E3294F2f19ed1713b255Af0f541",
    name: "Element Treasury",
    decimals: 0,
    symbol: "",
    extensions: {
      owner: "0x422494292e7a9Dda8778Bb4EA05C2779a3d60f5D",
    },
  },
  {
    chainId: 1,
    address: "0x81758f3361A769016eae4844072FA6d7f828a651",
    name: "Element Timelock",
    decimals: 0,
    symbol: "",
    extensions: {
      waitTime: "10",
    },
  },
];
var mainnetTokenListJson = {
  name: name,
  logoURI: logoURI,
  timestamp: timestamp,
  version: version,
  tokens: tokens,
};

async function getAirdropInfo(provider, chainId, tokenAddress, name) {
  if (!tokenAddress || tokenAddress === ethers.ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for ", name, tokenAddress);
    return;
  }
  const airdropContract = elfCouncilTypechain.Airdrop__factory.connect(
    tokenAddress,
    provider,
  );
  const rewardsRootPromise = airdropContract.rewardsRoot();
  const lockingVaultPromise = airdropContract.lockingVault();
  const expirationPromise = airdropContract.expiration();
  const tokenPromise = airdropContract.token();
  const [rewardsRoot, lockingVault, expiration, token] = await Promise.all([
    rewardsRootPromise,
    lockingVaultPromise,
    expirationPromise,
    tokenPromise,
  ]);
  return {
    chainId,
    address: tokenAddress,
    name,
    decimals: 0,
    symbol: "",
    extensions: {
      rewardsRoot,
      lockingVault,
      expiration: expiration.toString(),
      token,
    },
  };
}

async function getCoreVotingInfo(provider, chainId, tokenAddress, name) {
  if (!tokenAddress || tokenAddress === ethers.ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for ", name, tokenAddress);
    return;
  }
  const coreVotingContract = elfCouncilTypechain.CoreVoting__factory.connect(
    tokenAddress,
    provider,
  );
  const baseQuorum = await coreVotingContract.baseQuorum();
  const lockDuration = await coreVotingContract.lockDuration();
  const minProposalPower = await coreVotingContract.minProposalPower();
  const extraVoteTime = await coreVotingContract.extraVoteTime();
  const dayInBlocks = await coreVotingContract.DAY_IN_BLOCKS();
  return {
    chainId,
    address: tokenAddress,
    name,
    decimals: 0,
    symbol: "",
    extensions: {
      dayInBlocks: dayInBlocks.toNumber(),
      baseQuorum: utils.formatEther(baseQuorum),
      lockDuration: lockDuration.toNumber(),
      minProposalPower: utils.formatEther(minProposalPower),
      extraVoteTime: extraVoteTime.toNumber(),
    },
  };
}

async function getGscVaultInfo(provider, chainId, tokenAddress, name) {
  if (!tokenAddress || tokenAddress === ethers.ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for ", name, tokenAddress);
    return;
  }
  const gscVaultContract = elfCouncilTypechain.GSCVault__factory.connect(
    tokenAddress,
    provider,
  );
  const coreVotingPromise = gscVaultContract.coreVoting();
  const votingPowerBoundPromise = gscVaultContract.votingPowerBound();
  const idleDurationPromise = gscVaultContract.idleDuration();
  const [coreVoting, votingPowerBound, idleDuration] = await Promise.all([
    coreVotingPromise,
    votingPowerBoundPromise,
    idleDurationPromise,
  ]);
  return {
    chainId,
    address: tokenAddress,
    name,
    decimals: 0,
    symbol: "",
    extensions: {
      coreVoting,
      votingPowerBound: votingPowerBound.toString(),
      idleDuration: idleDuration.toString(),
    },
  };
}

async function getLockingVaultInfo(provider, chainId, tokenAddress, name) {
  if (!tokenAddress || tokenAddress === ethers.ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for ", name, tokenAddress);
    return;
  }
  const lockingVaultContract =
    elfCouncilTypechain.LockingVault__factory.connect(tokenAddress, provider);
  const tokenPromise = lockingVaultContract.token();
  const staleBlockLagPromise = lockingVaultContract.staleBlockLag();
  const [token, staleBlockLag] = await Promise.all([
    tokenPromise,
    staleBlockLagPromise,
  ]);
  return {
    chainId,
    address: tokenAddress,
    name,
    decimals: 0,
    symbol: "",
    extensions: {
      token,
      staleBlockLag: staleBlockLag.toNumber(),
    },
  };
}

async function getOptimisticGrantsInfo(provider, chainId, tokenAddress, name) {
  if (!tokenAddress || tokenAddress === ethers.ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for ", name, tokenAddress);
    return;
  }
  const optimisticGrantsContract =
    elfCouncilTypechain.OptimisticGrants__factory.connect(
      tokenAddress,
      provider,
    );
  const tokenPromise = optimisticGrantsContract.token();
  const solvencyPromise = optimisticGrantsContract.solvency();
  const [token, solvency] = await Promise.all([tokenPromise, solvencyPromise]);
  const tokenContract = elfCouncilTypechain.ERC20Permit__factory.connect(
    tokenAddress,
    provider,
  );
  const tokenDecimals = await tokenContract.decimals();
  return {
    chainId,
    address: tokenAddress,
    name,
    decimals: 0,
    symbol: "",
    extensions: {
      token,
      solvency: utils.formatUnits(solvency, tokenDecimals),
    },
  };
}

async function getOptimisticRewardsVaultInfo(
  provider,
  chainId,
  tokenAddress,
  name,
) {
  if (!tokenAddress || tokenAddress === ethers.ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for ", name, tokenAddress);
    return;
  }
  const optimisticRewardsVaultContract =
    elfCouncilTypechain.OptimisticRewards__factory.connect(
      tokenAddress,
      provider,
    );
  const pendingRootPromise = optimisticRewardsVaultContract.pendingRoot();
  const proposalTimePromise = optimisticRewardsVaultContract.proposalTime();
  const proposerPromise = optimisticRewardsVaultContract.proposer();
  const challengePeriodPromise =
    optimisticRewardsVaultContract.challengePeriod();
  const rewardsRootPromise = optimisticRewardsVaultContract.rewardsRoot();
  const lockingVaultPromise = optimisticRewardsVaultContract.lockingVault();
  const tokenPromise = optimisticRewardsVaultContract.token();
  const [
    pendingRoot,
    proposalTime,
    proposer,
    challengePeriod,
    rewardsRoot,
    lockingVault,
    token,
  ] = await Promise.all([
    pendingRootPromise,
    proposalTimePromise,
    proposerPromise,
    challengePeriodPromise,
    rewardsRootPromise,
    lockingVaultPromise,
    tokenPromise,
  ]);
  return {
    chainId,
    address: tokenAddress,
    name,
    decimals: 0,
    symbol: "",
    extensions: {
      pendingRoot,
      proposalTime: proposalTime.toNumber(),
      proposer,
      challengePeriod: challengePeriod.toNumber(),
      rewardsRoot,
      lockingVault,
      token,
    },
  };
}

async function getTimelockInfo(provider, chainId, tokenAddress, name) {
  if (!tokenAddress || tokenAddress === ethers.ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for ", name, tokenAddress);
    return;
  }
  const timelockContract = elfCouncilTypechain.Timelock__factory.connect(
    tokenAddress,
    provider,
  );
  const waitTime = await timelockContract.waitTime();
  return {
    chainId,
    address: tokenAddress,
    name,
    decimals: 0,
    symbol: "",
    extensions: {
      waitTime: waitTime.toString(),
    },
  };
}

async function getTreasuryInfo(provider, chainId, tokenAddress, name) {
  if (!tokenAddress || tokenAddress === ethers.ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for ", name, tokenAddress);
    return;
  }
  const treasuryContract = elfCouncilTypechain.Treasury__factory.connect(
    tokenAddress,
    provider,
  );
  const owner = await treasuryContract.owner();
  return {
    chainId,
    address: tokenAddress,
    name,
    decimals: 0,
    symbol: "",
    extensions: {
      owner,
    },
  };
}

async function getVotingTokenInfo(provider, chainId, tokenAddress) {
  if (!tokenAddress || tokenAddress === ethers.ethers.constants.AddressZero) {
    console.error("Invavlid Token Address for Voting Token", tokenAddress);
    return;
  }
  const tokenContract = elfCouncilTypechain.ERC20Permit__factory.connect(
    tokenAddress,
    provider,
  );
  const name = await tokenContract.name();
  const symbol = await tokenContract.symbol();
  const decimals = await tokenContract.decimals();
  return {
    chainId,
    address: tokenAddress,
    symbol,
    decimals,
    name,
  };
}

async function getTokenList(provider, addressesJson, name) {
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
  let optimisticGrantsInfo;
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
  let treasuryInfo;
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
  const tokenList = {
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
    ].filter((t) => !!t),
  };
  return tokenList;
}

// export goerli jsons
const goerliTokenList = goerliTokenListJson;
const goerliAddressList = goerliAddressListJson;
// export mainnet jsons
const mainnetTokenList = mainnetTokenListJson;
const mainnetAddressList = mainnetAddressListJson;

exports.getTokenList = getTokenList;
exports.goerliAddressList = goerliAddressList;
exports.goerliTokenList = goerliTokenList;
exports.mainnetAddressList = mainnetAddressList;
exports.mainnetTokenList = mainnetTokenList;
