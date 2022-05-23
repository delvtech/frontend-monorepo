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
var timestamp$1 = "2022-05-23T20:24:51.949Z";
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
      extraVoteTime: 2371040,
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
      idleDuration: "120",
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
var timestamp = "2022-05-23T20:25:03.972Z";
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
      votingPowerBound: "110000000000000000000000",
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
      owner: "0x81758f3361A769016eae4844072FA6d7f828a651",
    },
  },
  {
    chainId: 1,
    address: "0x81758f3361A769016eae4844072FA6d7f828a651",
    name: "Element Timelock",
    decimals: 0,
    symbol: "",
    extensions: {
      waitTime: "604800",
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

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P
      ? value
      : new P(function (resolve) {
          resolve(value);
        });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done
        ? resolve(result.value)
        : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: [],
    },
    f,
    y,
    t,
    g;
  return (
    (g = { next: verb(0), throw: verb(1), return: verb(2) }),
    typeof Symbol === "function" &&
      (g[Symbol.iterator] = function () {
        return this;
      }),
    g
  );
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (
          ((f = 1),
          y &&
            (t =
              op[0] & 2
                ? y["return"]
                : op[0]
                ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                : y.next) &&
            !(t = t.call(y, op[1])).done)
        )
          return t;
        if (((y = 0), t)) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (
              !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
              (op[0] === 6 || op[0] === 2)
            ) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}

function getAirdropInfo(provider, chainId, tokenAddress, name) {
  return __awaiter(this, void 0, void 0, function () {
    var airdropContract,
      rewardsRootPromise,
      lockingVaultPromise,
      expirationPromise,
      tokenPromise,
      _a,
      rewardsRoot,
      lockingVault,
      expiration,
      token;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          if (
            !tokenAddress ||
            tokenAddress === ethers.ethers.constants.AddressZero
          ) {
            console.error("Invavlid Token Address for ", name, tokenAddress);
            return [2 /*return*/];
          }
          airdropContract = elfCouncilTypechain.Airdrop__factory.connect(
            tokenAddress,
            provider,
          );
          rewardsRootPromise = airdropContract.rewardsRoot();
          lockingVaultPromise = airdropContract.lockingVault();
          expirationPromise = airdropContract.expiration();
          tokenPromise = airdropContract.token();
          return [
            4 /*yield*/,
            Promise.all([
              rewardsRootPromise,
              lockingVaultPromise,
              expirationPromise,
              tokenPromise,
            ]),
          ];
        case 1:
          (_a = _b.sent()),
            (rewardsRoot = _a[0]),
            (lockingVault = _a[1]),
            (expiration = _a[2]),
            (token = _a[3]);
          return [
            2 /*return*/,
            {
              chainId: chainId,
              address: tokenAddress,
              name: name,
              decimals: 0,
              symbol: "",
              extensions: {
                rewardsRoot: rewardsRoot,
                lockingVault: lockingVault,
                expiration: expiration.toString(),
                token: token,
              },
            },
          ];
      }
    });
  });
}

function getCoreVotingInfo(provider, chainId, tokenAddress, name) {
  return __awaiter(this, void 0, void 0, function () {
    var coreVotingContract,
      baseQuorum,
      lockDuration,
      minProposalPower,
      extraVoteTime,
      dayInBlocks;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (
            !tokenAddress ||
            tokenAddress === ethers.ethers.constants.AddressZero
          ) {
            console.error("Invavlid Token Address for ", name, tokenAddress);
            return [2 /*return*/];
          }
          coreVotingContract = elfCouncilTypechain.CoreVoting__factory.connect(
            tokenAddress,
            provider,
          );
          return [4 /*yield*/, coreVotingContract.baseQuorum()];
        case 1:
          baseQuorum = _a.sent();
          return [4 /*yield*/, coreVotingContract.lockDuration()];
        case 2:
          lockDuration = _a.sent();
          return [4 /*yield*/, coreVotingContract.minProposalPower()];
        case 3:
          minProposalPower = _a.sent();
          return [4 /*yield*/, coreVotingContract.extraVoteTime()];
        case 4:
          extraVoteTime = _a.sent();
          return [4 /*yield*/, coreVotingContract.DAY_IN_BLOCKS()];
        case 5:
          dayInBlocks = _a.sent();
          return [
            2 /*return*/,
            {
              chainId: chainId,
              address: tokenAddress,
              name: name,
              decimals: 0,
              symbol: "",
              extensions: {
                dayInBlocks: dayInBlocks.toNumber(),
                baseQuorum: utils.formatEther(baseQuorum),
                lockDuration: lockDuration.toNumber(),
                minProposalPower: utils.formatEther(minProposalPower),
                extraVoteTime: extraVoteTime.toNumber(),
              },
            },
          ];
      }
    });
  });
}

function getGscVaultInfo(provider, chainId, tokenAddress, name) {
  return __awaiter(this, void 0, void 0, function () {
    var gscVaultContract,
      coreVotingPromise,
      votingPowerBoundPromise,
      idleDurationPromise,
      _a,
      coreVoting,
      votingPowerBound,
      idleDuration;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          if (
            !tokenAddress ||
            tokenAddress === ethers.ethers.constants.AddressZero
          ) {
            console.error("Invavlid Token Address for ", name, tokenAddress);
            return [2 /*return*/];
          }
          gscVaultContract = elfCouncilTypechain.GSCVault__factory.connect(
            tokenAddress,
            provider,
          );
          coreVotingPromise = gscVaultContract.coreVoting();
          votingPowerBoundPromise = gscVaultContract.votingPowerBound();
          idleDurationPromise = gscVaultContract.idleDuration();
          return [
            4 /*yield*/,
            Promise.all([
              coreVotingPromise,
              votingPowerBoundPromise,
              idleDurationPromise,
            ]),
          ];
        case 1:
          (_a = _b.sent()),
            (coreVoting = _a[0]),
            (votingPowerBound = _a[1]),
            (idleDuration = _a[2]);
          return [
            2 /*return*/,
            {
              chainId: chainId,
              address: tokenAddress,
              name: name,
              decimals: 0,
              symbol: "",
              extensions: {
                coreVoting: coreVoting,
                votingPowerBound: votingPowerBound.toString(),
                idleDuration: idleDuration.toString(),
              },
            },
          ];
      }
    });
  });
}

function getLockingVaultInfo(provider, chainId, tokenAddress, name) {
  return __awaiter(this, void 0, void 0, function () {
    var lockingVaultContract,
      tokenPromise,
      staleBlockLagPromise,
      _a,
      token,
      staleBlockLag;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          if (
            !tokenAddress ||
            tokenAddress === ethers.ethers.constants.AddressZero
          ) {
            console.error("Invavlid Token Address for ", name, tokenAddress);
            return [2 /*return*/];
          }
          lockingVaultContract =
            elfCouncilTypechain.LockingVault__factory.connect(
              tokenAddress,
              provider,
            );
          tokenPromise = lockingVaultContract.token();
          staleBlockLagPromise = lockingVaultContract.staleBlockLag();
          return [
            4 /*yield*/,
            Promise.all([tokenPromise, staleBlockLagPromise]),
          ];
        case 1:
          (_a = _b.sent()), (token = _a[0]), (staleBlockLag = _a[1]);
          return [
            2 /*return*/,
            {
              chainId: chainId,
              address: tokenAddress,
              name: name,
              decimals: 0,
              symbol: "",
              extensions: {
                token: token,
                staleBlockLag: staleBlockLag.toNumber(),
              },
            },
          ];
      }
    });
  });
}

function getOptimisticGrantsInfo(provider, chainId, tokenAddress, name) {
  return __awaiter(this, void 0, void 0, function () {
    var optimisticGrantsContract,
      tokenPromise,
      solvencyPromise,
      _a,
      token,
      solvency,
      tokenContract,
      tokenDecimals;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          if (
            !tokenAddress ||
            tokenAddress === ethers.ethers.constants.AddressZero
          ) {
            console.error("Invavlid Token Address for ", name, tokenAddress);
            return [2 /*return*/];
          }
          optimisticGrantsContract =
            elfCouncilTypechain.OptimisticGrants__factory.connect(
              tokenAddress,
              provider,
            );
          tokenPromise = optimisticGrantsContract.token();
          solvencyPromise = optimisticGrantsContract.solvency();
          return [4 /*yield*/, Promise.all([tokenPromise, solvencyPromise])];
        case 1:
          (_a = _b.sent()), (token = _a[0]), (solvency = _a[1]);
          tokenContract = elfCouncilTypechain.ERC20Permit__factory.connect(
            tokenAddress,
            provider,
          );
          return [4 /*yield*/, tokenContract.decimals()];
        case 2:
          tokenDecimals = _b.sent();
          return [
            2 /*return*/,
            {
              chainId: chainId,
              address: tokenAddress,
              name: name,
              decimals: 0,
              symbol: "",
              extensions: {
                token: token,
                solvency: utils.formatUnits(solvency, tokenDecimals),
              },
            },
          ];
      }
    });
  });
}

function getOptimisticRewardsVaultInfo(provider, chainId, tokenAddress, name) {
  return __awaiter(this, void 0, void 0, function () {
    var optimisticRewardsVaultContract,
      pendingRootPromise,
      proposalTimePromise,
      proposerPromise,
      challengePeriodPromise,
      rewardsRootPromise,
      lockingVaultPromise,
      tokenPromise,
      _a,
      pendingRoot,
      proposalTime,
      proposer,
      challengePeriod,
      rewardsRoot,
      lockingVault,
      token;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          if (
            !tokenAddress ||
            tokenAddress === ethers.ethers.constants.AddressZero
          ) {
            console.error("Invavlid Token Address for ", name, tokenAddress);
            return [2 /*return*/];
          }
          optimisticRewardsVaultContract =
            elfCouncilTypechain.OptimisticRewards__factory.connect(
              tokenAddress,
              provider,
            );
          pendingRootPromise = optimisticRewardsVaultContract.pendingRoot();
          proposalTimePromise = optimisticRewardsVaultContract.proposalTime();
          proposerPromise = optimisticRewardsVaultContract.proposer();
          challengePeriodPromise =
            optimisticRewardsVaultContract.challengePeriod();
          rewardsRootPromise = optimisticRewardsVaultContract.rewardsRoot();
          lockingVaultPromise = optimisticRewardsVaultContract.lockingVault();
          tokenPromise = optimisticRewardsVaultContract.token();
          return [
            4 /*yield*/,
            Promise.all([
              pendingRootPromise,
              proposalTimePromise,
              proposerPromise,
              challengePeriodPromise,
              rewardsRootPromise,
              lockingVaultPromise,
              tokenPromise,
            ]),
          ];
        case 1:
          (_a = _b.sent()),
            (pendingRoot = _a[0]),
            (proposalTime = _a[1]),
            (proposer = _a[2]),
            (challengePeriod = _a[3]),
            (rewardsRoot = _a[4]),
            (lockingVault = _a[5]),
            (token = _a[6]);
          return [
            2 /*return*/,
            {
              chainId: chainId,
              address: tokenAddress,
              name: name,
              decimals: 0,
              symbol: "",
              extensions: {
                pendingRoot: pendingRoot,
                proposalTime: proposalTime.toNumber(),
                proposer: proposer,
                challengePeriod: challengePeriod.toNumber(),
                rewardsRoot: rewardsRoot,
                lockingVault: lockingVault,
                token: token,
              },
            },
          ];
      }
    });
  });
}

function getTimelockInfo(provider, chainId, tokenAddress, name) {
  return __awaiter(this, void 0, void 0, function () {
    var timelockContract, waitTime;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (
            !tokenAddress ||
            tokenAddress === ethers.ethers.constants.AddressZero
          ) {
            console.error("Invavlid Token Address for ", name, tokenAddress);
            return [2 /*return*/];
          }
          timelockContract = elfCouncilTypechain.Timelock__factory.connect(
            tokenAddress,
            provider,
          );
          return [4 /*yield*/, timelockContract.waitTime()];
        case 1:
          waitTime = _a.sent();
          return [
            2 /*return*/,
            {
              chainId: chainId,
              address: tokenAddress,
              name: name,
              decimals: 0,
              symbol: "",
              extensions: {
                waitTime: waitTime.toString(),
              },
            },
          ];
      }
    });
  });
}

function getTreasuryInfo(provider, chainId, tokenAddress, name) {
  return __awaiter(this, void 0, void 0, function () {
    var treasuryContract, owner;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (
            !tokenAddress ||
            tokenAddress === ethers.ethers.constants.AddressZero
          ) {
            console.error("Invavlid Token Address for ", name, tokenAddress);
            return [2 /*return*/];
          }
          treasuryContract = elfCouncilTypechain.Treasury__factory.connect(
            tokenAddress,
            provider,
          );
          return [4 /*yield*/, treasuryContract.owner()];
        case 1:
          owner = _a.sent();
          return [
            2 /*return*/,
            {
              chainId: chainId,
              address: tokenAddress,
              name: name,
              decimals: 0,
              symbol: "",
              extensions: {
                owner: owner,
              },
            },
          ];
      }
    });
  });
}

function getVotingTokenInfo(provider, chainId, tokenAddress) {
  return __awaiter(this, void 0, void 0, function () {
    var tokenContract, name, symbol, decimals;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (
            !tokenAddress ||
            tokenAddress === ethers.ethers.constants.AddressZero
          ) {
            console.error(
              "Invavlid Token Address for Voting Token",
              tokenAddress,
            );
            return [2 /*return*/];
          }
          tokenContract = elfCouncilTypechain.ERC20Permit__factory.connect(
            tokenAddress,
            provider,
          );
          return [4 /*yield*/, tokenContract.name()];
        case 1:
          name = _a.sent();
          return [4 /*yield*/, tokenContract.symbol()];
        case 2:
          symbol = _a.sent();
          return [4 /*yield*/, tokenContract.decimals()];
        case 3:
          decimals = _a.sent();
          return [
            2 /*return*/,
            {
              chainId: chainId,
              address: tokenAddress,
              symbol: symbol,
              decimals: decimals,
              name: name,
            },
          ];
      }
    });
  });
}

function getTokenList(provider, addressesJson, name) {
  return __awaiter(this, void 0, void 0, function () {
    var chainId,
      _a,
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
      elementTokenInfo,
      coreVotingInfo,
      gscCoreVotingInfo,
      lockingVaultInfo,
      vestingVaultInfo,
      gscVaultInfo,
      optimisticRewardsVaultInfo,
      optimisticGrantsInfo,
      error_1,
      airdropInfo,
      treasuryInfo,
      error_2,
      timelockInfo,
      tokenList;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          (chainId = addressesJson.chainId),
            (_a = addressesJson.addresses),
            (elementToken = _a.elementToken),
            (coreVoting = _a.coreVoting),
            (gscCoreVoting = _a.gscCoreVoting),
            (timeLock = _a.timeLock),
            (lockingVault = _a.lockingVault),
            (vestingVault = _a.vestingVault),
            (optimisticRewardsVault = _a.optimisticRewardsVault),
            (airdrop = _a.airdrop),
            (optimisticGrants = _a.optimisticGrants),
            (treasury = _a.treasury),
            (gscVault = _a.gscVault);
          return [
            4 /*yield*/,
            getVotingTokenInfo(provider, chainId, elementToken),
          ];
        case 1:
          elementTokenInfo = _b.sent();
          return [
            4 /*yield*/,
            getCoreVotingInfo(
              provider,
              chainId,
              coreVoting,
              "Element Core Voting Contract",
            ),
          ];
        case 2:
          coreVotingInfo = _b.sent();
          return [
            4 /*yield*/,
            getCoreVotingInfo(
              provider,
              chainId,
              gscCoreVoting,
              "Element GSC Core Voting Contract",
            ),
          ];
        case 3:
          gscCoreVotingInfo = _b.sent();
          return [
            4 /*yield*/,
            getLockingVaultInfo(
              provider,
              chainId,
              lockingVault,
              "Element Locking Vault",
            ),
          ];
        case 4:
          lockingVaultInfo = _b.sent();
          return [
            4 /*yield*/,
            getLockingVaultInfo(
              provider,
              chainId,
              vestingVault,
              "Element Vesting Vault",
            ),
          ];
        case 5:
          vestingVaultInfo = _b.sent();
          return [
            4 /*yield*/,
            getGscVaultInfo(
              provider,
              chainId,
              gscVault,
              "Element Governance Steering Committee Vault",
            ),
          ];
        case 6:
          gscVaultInfo = _b.sent();
          return [
            4 /*yield*/,
            getOptimisticRewardsVaultInfo(
              provider,
              chainId,
              optimisticRewardsVault,
              "Element Optimistic Rewards Vault",
            ),
          ];
        case 7:
          optimisticRewardsVaultInfo = _b.sent();
          _b.label = 8;
        case 8:
          _b.trys.push([8, 10, , 11]);
          return [
            4 /*yield*/,
            getOptimisticGrantsInfo(
              provider,
              chainId,
              optimisticGrants,
              "Element Optimistic Grants Vault",
            ),
          ];
        case 9:
          optimisticGrantsInfo = _b.sent();
          return [3 /*break*/, 11];
        case 10:
          error_1 = _b.sent();
          console.log("error fetching optimistic grants info", error_1);
          return [3 /*break*/, 11];
        case 11:
          return [
            4 /*yield*/,
            getAirdropInfo(
              provider,
              chainId,
              airdrop,
              "Element Airdrop Contract",
            ),
          ];
        case 12:
          airdropInfo = _b.sent();
          _b.label = 13;
        case 13:
          _b.trys.push([13, 15, , 16]);
          return [
            4 /*yield*/,
            getTreasuryInfo(provider, chainId, treasury, "Element Treasury"),
          ];
        case 14:
          treasuryInfo = _b.sent();
          return [3 /*break*/, 16];
        case 15:
          error_2 = _b.sent();
          console.log("error fetching treasury info", error_2);
          return [3 /*break*/, 16];
        case 16:
          return [
            4 /*yield*/,
            getTimelockInfo(provider, chainId, timeLock, "Element Timelock"),
          ];
        case 17:
          timelockInfo = _b.sent();
          tokenList = {
            name: name,
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
            ].filter(function (t) {
              return !!t;
            }),
          };
          return [2 /*return*/, tokenList];
      }
    });
  });
}

// export goerli jsons
var goerliTokenList = goerliTokenListJson;
var goerliAddressList = goerliAddressListJson;
// export mainnet jsons
var mainnetTokenList = mainnetTokenListJson;
var mainnetAddressList = mainnetAddressListJson;

exports.getTokenList = getTokenList;
exports.goerliAddressList = goerliAddressList;
exports.goerliTokenList = goerliTokenList;
exports.mainnetAddressList = mainnetAddressList;
exports.mainnetTokenList = mainnetTokenList;
