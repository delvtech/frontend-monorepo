import {Airdrop__factory as $leNae$Airdrop__factory, CoreVoting__factory as $leNae$CoreVoting__factory, GSCVault__factory as $leNae$GSCVault__factory, LockingVault__factory as $leNae$LockingVault__factory, OptimisticGrants__factory as $leNae$OptimisticGrants__factory, ERC20Permit__factory as $leNae$ERC20Permit__factory, OptimisticRewards__factory as $leNae$OptimisticRewards__factory, Timelock__factory as $leNae$Timelock__factory, Treasury__factory as $leNae$Treasury__factory} from "@elementfi/council-typechain";
import {ethers as $leNae$ethers} from "ethers";
import {formatEther as $leNae$formatEther, formatUnits as $leNae$formatUnits} from "ethers/lib/utils";

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $e4ae1ea1cb34fb21$exports = {};
$e4ae1ea1cb34fb21$exports = JSON.parse('{"addresses":{"airdrop":"0xb7920477F7A39c3DffA925076857eB1585503e1B","coreVoting":"0x0CB8aa45068EE31e97B717b0B35e26A43884c84c","elementToken":"0x2b1a91De5B9C3Ad6439eeAeD0E481F8cf6E22601","gscCoreVoting":"0x600c4926c9F88beCE3533ceaAA36804d6E23F1c1","gscVault":"0x0A575bFA79454112c37B9Af2a6362c9c68f7d2e3","lockingVault":"0xb5E8AF575Ee302A24c6C7746a99D895BeF67cb5D","optimisticGrants":"0x092B49777CB45dc4939FBc4029ce7a116D63D29D","optimisticRewardsVault":"0x0000000000000000000000000000000000000000","spender":"0x722289C399e6f4AbCE80FaFbABC9a9876432834C","timeLock":"0x36687bdD319a78AB4b4347f3A7459Da235AFc4f4","treasury":"0xd46dDb33A33FD3D352d08cc7022Ce1f5c6ccFF1a","vestingVault":"0xe69D2F8DeD2924e0845118E7E467Fc97F7994ef6"},"chainId":5}');


var $86683490d1e4d5fe$exports = {};
$86683490d1e4d5fe$exports = JSON.parse('{"name":"Council goerli token list","logoURI":"https://element.fi/logo.svg","timestamp":"2022-07-13T01:34:59.250Z","version":{"major":0,"minor":1,"patch":0},"tokens":[{"chainId":5,"address":"0x2b1a91De5B9C3Ad6439eeAeD0E481F8cf6E22601","symbol":"\uD83E\uDDDD","decimals":18,"name":"Definitely Not Element Token"},{"chainId":5,"address":"0x0CB8aa45068EE31e97B717b0B35e26A43884c84c","name":"Element Core Voting Contract","decimals":0,"symbol":"","extensions":{"dayInBlocks":6496,"baseQuorum":"1000000.0","lockDuration":19488,"minProposalPower":"0.000000000000000001","extraVoteTime":2371040}},{"chainId":5,"address":"0x600c4926c9F88beCE3533ceaAA36804d6E23F1c1","name":"Element GSC Core Voting Contract","decimals":0,"symbol":"","extensions":{"dayInBlocks":6496,"baseQuorum":"0.000000000000000001","lockDuration":19488,"minProposalPower":"0.000000000000000001","extraVoteTime":32480}},{"chainId":5,"address":"0xb5E8AF575Ee302A24c6C7746a99D895BeF67cb5D","name":"Element Locking Vault","decimals":0,"symbol":"","extensions":{"token":"0x2b1a91De5B9C3Ad6439eeAeD0E481F8cf6E22601","staleBlockLag":30000}},{"chainId":5,"address":"0xe69D2F8DeD2924e0845118E7E467Fc97F7994ef6","name":"Element Vesting Vault","decimals":0,"symbol":"","extensions":{"token":"0x2b1a91De5B9C3Ad6439eeAeD0E481F8cf6E22601","staleBlockLag":20000}},{"chainId":5,"address":"0x0A575bFA79454112c37B9Af2a6362c9c68f7d2e3","name":"Element Governance Steering Committee Vault","decimals":0,"symbol":"","extensions":{"coreVoting":"0x0CB8aa45068EE31e97B717b0B35e26A43884c84c","votingPowerBound":"100000000000000000000000","idleDuration":"120"}},{"chainId":5,"address":"0x092B49777CB45dc4939FBc4029ce7a116D63D29D","name":"Element Optimistic Grants Vault","decimals":0,"symbol":"","extensions":{"token":"0x2b1a91De5B9C3Ad6439eeAeD0E481F8cf6E22601","solvency":"0.0"}},{"chainId":5,"address":"0xb7920477F7A39c3DffA925076857eB1585503e1B","name":"Element Airdrop Contract","decimals":0,"symbol":"","extensions":{"rewardsRoot":"0x9aafc9b1d8798b80c68d556519e69c64fbe5a4b205bbdccec12375353a1bf784","lockingVault":"0xb5E8AF575Ee302A24c6C7746a99D895BeF67cb5D","expiration":"9999999999","token":"0x2b1a91De5B9C3Ad6439eeAeD0E481F8cf6E22601"}},{"chainId":5,"address":"0xd46dDb33A33FD3D352d08cc7022Ce1f5c6ccFF1a","name":"Element Treasury","decimals":0,"symbol":"","extensions":{"owner":"0xcF3b7bcBbcEFF836F81f6EAd914706E699267bca"}},{"chainId":5,"address":"0x36687bdD319a78AB4b4347f3A7459Da235AFc4f4","name":"Element Timelock","decimals":0,"symbol":"","extensions":{"waitTime":"1"}}]}');


var $c649f2b5ffdbe160$exports = {};
$c649f2b5ffdbe160$exports = JSON.parse('{"addresses":{"airdrop":"0xd04a459FFD3A5E3C93d5cD8BB13d26a9845716c2","coreVoting":"0xEaCD577C3F6c44C3ffA398baaD97aE12CDCFed4a","elementToken":"0x5c6D51ecBA4D8E4F20373e3ce96a62342B125D6d","gscCoreVoting":"0x40309f197e7f94B555904DF0f788a3F48cF326aB","gscVault":"0xcA870E8aa4FCEa85b5f0c6F4209C8CBA9265B940","lockingVault":"0x02Bd4A3b1b95b01F2Aa61655415A5d3EAAcaafdD","optimisticGrants":"0x0000000000000000000000000000000000000000","optimisticRewardsVault":"0x0000000000000000000000000000000000000000","spender":"0xDa2Baf34B5717b257e52039f78d02B9C58751781","timeLock":"0x81758f3361A769016eae4844072FA6d7f828a651","treasury":"0x82eF450FB7f06E3294F2f19ed1713b255Af0f541","vestingVault":"0x6De73946eab234F1EE61256F10067D713aF0e37A"},"chainId":1}');


var $b1ad45c1aad663eb$exports = {};
$b1ad45c1aad663eb$exports = JSON.parse('{"name":"Council mainnet token list","logoURI":"https://element.fi/logo.svg","timestamp":"2022-07-13T01:35:08.473Z","version":{"major":0,"minor":1,"patch":0},"tokens":[{"chainId":1,"address":"0x5c6D51ecBA4D8E4F20373e3ce96a62342B125D6d","symbol":"ELFI","decimals":18,"name":"Element Finance"},{"chainId":1,"address":"0xEaCD577C3F6c44C3ffA398baaD97aE12CDCFed4a","name":"Element Core Voting Contract","decimals":0,"symbol":"","extensions":{"dayInBlocks":6496,"baseQuorum":"1100000.0","lockDuration":19488,"minProposalPower":"55000.0","extraVoteTime":32480}},{"chainId":1,"address":"0x40309f197e7f94B555904DF0f788a3F48cF326aB","name":"Element GSC Core Voting Contract","decimals":0,"symbol":"","extensions":{"dayInBlocks":6496,"baseQuorum":"0.000000000000000001","lockDuration":19488,"minProposalPower":"0.000000000000000001","extraVoteTime":32480}},{"chainId":1,"address":"0x02Bd4A3b1b95b01F2Aa61655415A5d3EAAcaafdD","name":"Element Locking Vault","decimals":0,"symbol":"","extensions":{"token":"0x5c6D51ecBA4D8E4F20373e3ce96a62342B125D6d","staleBlockLag":200000}},{"chainId":1,"address":"0x6De73946eab234F1EE61256F10067D713aF0e37A","name":"Element Vesting Vault","decimals":0,"symbol":"","extensions":{"token":"0x5c6D51ecBA4D8E4F20373e3ce96a62342B125D6d","staleBlockLag":200000}},{"chainId":1,"address":"0xcA870E8aa4FCEa85b5f0c6F4209C8CBA9265B940","name":"Element Governance Steering Committee Vault","decimals":0,"symbol":"","extensions":{"coreVoting":"0xEaCD577C3F6c44C3ffA398baaD97aE12CDCFed4a","votingPowerBound":"110000000000000000000000","idleDuration":"345600"}},{"chainId":1,"address":"0xd04a459FFD3A5E3C93d5cD8BB13d26a9845716c2","name":"Element Airdrop Contract","decimals":0,"symbol":"","extensions":{"rewardsRoot":"0x5868b38fb60678b88b07721f03bc9bfd5be6b4f17829f5703e3556b31f4073c6","lockingVault":"0x02Bd4A3b1b95b01F2Aa61655415A5d3EAAcaafdD","expiration":"1680220799","token":"0x5c6D51ecBA4D8E4F20373e3ce96a62342B125D6d"}},{"chainId":1,"address":"0x82eF450FB7f06E3294F2f19ed1713b255Af0f541","name":"Element Treasury","decimals":0,"symbol":"","extensions":{"owner":"0x81758f3361A769016eae4844072FA6d7f828a651"}},{"chainId":1,"address":"0x81758f3361A769016eae4844072FA6d7f828a651","name":"Element Timelock","decimals":0,"symbol":"","extensions":{"waitTime":"604800"}}]}');




async function $ff01ca756ce20520$export$365b04c0669f75e2(provider, chainId, tokenAddress, name) {
    if (!tokenAddress || tokenAddress === (0, $leNae$ethers).constants.AddressZero) {
        console.error("Invavlid Token Address for ", name, tokenAddress);
        return;
    }
    const airdropContract = (0, $leNae$Airdrop__factory).connect(tokenAddress, provider);
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
        chainId: chainId,
        address: tokenAddress,
        name: name,
        decimals: 0,
        symbol: "",
        extensions: {
            rewardsRoot: rewardsRoot,
            lockingVault: lockingVault,
            expiration: expiration.toString(),
            token: token
        }
    };
}





async function $f1dc52e17f76a3ff$export$ad3472e493936806(provider, chainId, tokenAddress, name) {
    if (!tokenAddress || tokenAddress === (0, $leNae$ethers).constants.AddressZero) {
        console.error("Invavlid Token Address for ", name, tokenAddress);
        return;
    }
    const coreVotingContract = (0, $leNae$CoreVoting__factory).connect(tokenAddress, provider);
    const baseQuorum = await coreVotingContract.baseQuorum();
    const lockDuration = await coreVotingContract.lockDuration();
    const minProposalPower = await coreVotingContract.minProposalPower();
    const extraVoteTime = await coreVotingContract.extraVoteTime();
    const dayInBlocks = await coreVotingContract.DAY_IN_BLOCKS();
    return {
        chainId: chainId,
        address: tokenAddress,
        name: name,
        decimals: 0,
        symbol: "",
        extensions: {
            dayInBlocks: dayInBlocks.toNumber(),
            baseQuorum: (0, $leNae$formatEther)(baseQuorum),
            lockDuration: lockDuration.toNumber(),
            minProposalPower: (0, $leNae$formatEther)(minProposalPower),
            extraVoteTime: extraVoteTime.toNumber()
        }
    };
}




async function $ff2867140b4f0abc$export$19b2322d146c7e41(provider, chainId, tokenAddress, name) {
    if (!tokenAddress || tokenAddress === (0, $leNae$ethers).constants.AddressZero) {
        console.error("Invavlid Token Address for ", name, tokenAddress);
        return;
    }
    const gscVaultContract = (0, $leNae$GSCVault__factory).connect(tokenAddress, provider);
    const coreVotingPromise = gscVaultContract.coreVoting();
    const votingPowerBoundPromise = gscVaultContract.votingPowerBound();
    const idleDurationPromise = gscVaultContract.idleDuration();
    const [coreVoting, votingPowerBound, idleDuration] = await Promise.all([
        coreVotingPromise,
        votingPowerBoundPromise,
        idleDurationPromise, 
    ]);
    return {
        chainId: chainId,
        address: tokenAddress,
        name: name,
        decimals: 0,
        symbol: "",
        extensions: {
            coreVoting: coreVoting,
            votingPowerBound: votingPowerBound.toString(),
            idleDuration: idleDuration.toString()
        }
    };
}




async function $a4eb82b90f297a38$export$39588e8ca56dde8c(provider, chainId, tokenAddress, name) {
    if (!tokenAddress || tokenAddress === (0, $leNae$ethers).constants.AddressZero) {
        console.error("Invavlid Token Address for ", name, tokenAddress);
        return;
    }
    const lockingVaultContract = (0, $leNae$LockingVault__factory).connect(tokenAddress, provider);
    const tokenPromise = lockingVaultContract.token();
    const staleBlockLagPromise = lockingVaultContract.staleBlockLag();
    const [token, staleBlockLag] = await Promise.all([
        tokenPromise,
        staleBlockLagPromise, 
    ]);
    return {
        chainId: chainId,
        address: tokenAddress,
        name: name,
        decimals: 0,
        symbol: "",
        extensions: {
            token: token,
            staleBlockLag: staleBlockLag.toNumber()
        }
    };
}





async function $ea983bd59f91584b$export$2102456b9534a08d(provider, chainId, tokenAddress, name) {
    if (!tokenAddress || tokenAddress === (0, $leNae$ethers).constants.AddressZero) {
        console.error("Invavlid Token Address for ", name, tokenAddress);
        return;
    }
    const optimisticGrantsContract = (0, $leNae$OptimisticGrants__factory).connect(tokenAddress, provider);
    const tokenPromise = optimisticGrantsContract.token();
    const solvencyPromise = optimisticGrantsContract.solvency();
    const [token, solvency] = await Promise.all([
        tokenPromise,
        solvencyPromise
    ]);
    const tokenContract = (0, $leNae$ERC20Permit__factory).connect(token, provider);
    const tokenDecimals = await tokenContract.decimals();
    return {
        chainId: chainId,
        address: tokenAddress,
        name: name,
        decimals: 0,
        symbol: "",
        extensions: {
            token: token,
            solvency: (0, $leNae$formatUnits)(solvency, tokenDecimals)
        }
    };
}




async function $078825f55a8bbb45$export$af8a7538a092c0ba(provider, chainId, tokenAddress, name) {
    if (!tokenAddress || tokenAddress === (0, $leNae$ethers).constants.AddressZero) {
        console.error("Invavlid Token Address for ", name, tokenAddress);
        return;
    }
    const optimisticRewardsVaultContract = (0, $leNae$OptimisticRewards__factory).connect(tokenAddress, provider);
    const pendingRootPromise = optimisticRewardsVaultContract.pendingRoot();
    const proposalTimePromise = optimisticRewardsVaultContract.proposalTime();
    const proposerPromise = optimisticRewardsVaultContract.proposer();
    const challengePeriodPromise = optimisticRewardsVaultContract.challengePeriod();
    const rewardsRootPromise = optimisticRewardsVaultContract.rewardsRoot();
    const lockingVaultPromise = optimisticRewardsVaultContract.lockingVault();
    const tokenPromise = optimisticRewardsVaultContract.token();
    const [pendingRoot, proposalTime, proposer, challengePeriod, rewardsRoot, lockingVault, token, ] = await Promise.all([
        pendingRootPromise,
        proposalTimePromise,
        proposerPromise,
        challengePeriodPromise,
        rewardsRootPromise,
        lockingVaultPromise,
        tokenPromise, 
    ]);
    return {
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
            token: token
        }
    };
}




async function $a593c6575dd9337e$export$ac1a17c2da84e5d(provider, chainId, tokenAddress, name) {
    if (!tokenAddress || tokenAddress === (0, $leNae$ethers).constants.AddressZero) {
        console.error("Invavlid Token Address for ", name, tokenAddress);
        return;
    }
    const timelockContract = (0, $leNae$Timelock__factory).connect(tokenAddress, provider);
    const waitTime = await timelockContract.waitTime();
    return {
        chainId: chainId,
        address: tokenAddress,
        name: name,
        decimals: 0,
        symbol: "",
        extensions: {
            waitTime: waitTime.toString()
        }
    };
}




async function $1b278125e9b21379$export$fb5a25d1912ee407(provider, chainId, tokenAddress, name) {
    if (!tokenAddress || tokenAddress === (0, $leNae$ethers).constants.AddressZero) {
        console.error("Invavlid Token Address for ", name, tokenAddress);
        return;
    }
    const treasuryContract = (0, $leNae$Treasury__factory).connect(tokenAddress, provider);
    const owner = await treasuryContract.owner();
    return {
        chainId: chainId,
        address: tokenAddress,
        name: name,
        decimals: 0,
        symbol: "",
        extensions: {
            owner: owner
        }
    };
}




async function $75f546503e78da91$export$a9349a1873830f3a(provider, chainId, tokenAddress) {
    if (!tokenAddress || tokenAddress === (0, $leNae$ethers).constants.AddressZero) {
        console.error("Invavlid Token Address for Voting Token", tokenAddress);
        return;
    }
    const tokenContract = (0, $leNae$ERC20Permit__factory).connect(tokenAddress, provider);
    const name = await tokenContract.name();
    const symbol = await tokenContract.symbol();
    const decimals = await tokenContract.decimals();
    return {
        chainId: chainId,
        address: tokenAddress,
        symbol: symbol,
        decimals: decimals,
        name: name
    };
}


async function $0ebd5d33c059685e$export$4aec0e9d20ba276(provider, addressesJson, name) {
    const { chainId: chainId , addresses: { elementToken: elementToken , coreVoting: coreVoting , gscCoreVoting: gscCoreVoting , timeLock: timeLock , lockingVault: lockingVault , vestingVault: vestingVault , optimisticRewardsVault: optimisticRewardsVault , airdrop: airdrop , optimisticGrants: optimisticGrants , treasury: treasury , gscVault: gscVault ,  } ,  } = addressesJson;
    console.log(`${name} - ${chainId}`);
    console.log("fetching voting token...");
    const elementTokenInfo = await (0, $75f546503e78da91$export$a9349a1873830f3a)(provider, chainId, elementToken);
    console.log("fetching core voting...");
    const coreVotingInfo = await (0, $f1dc52e17f76a3ff$export$ad3472e493936806)(provider, chainId, coreVoting, "Element Core Voting Contract");
    console.log("fetching GSC core voting...");
    const gscCoreVotingInfo = await (0, $f1dc52e17f76a3ff$export$ad3472e493936806)(provider, chainId, gscCoreVoting, "Element GSC Core Voting Contract");
    console.log("fetching locking vault...");
    const lockingVaultInfo = await (0, $a4eb82b90f297a38$export$39588e8ca56dde8c)(provider, chainId, lockingVault, "Element Locking Vault");
    console.log("fetching vesting vault...");
    const vestingVaultInfo = await (0, $a4eb82b90f297a38$export$39588e8ca56dde8c)(provider, chainId, vestingVault, "Element Vesting Vault");
    console.log("fetching gsc vault...");
    const gscVaultInfo = await (0, $ff2867140b4f0abc$export$19b2322d146c7e41)(provider, chainId, gscVault, "Element Governance Steering Committee Vault");
    console.log("fetching optimistic rewards vault...");
    const optimisticRewardsVaultInfo = await (0, $078825f55a8bbb45$export$af8a7538a092c0ba)(provider, chainId, optimisticRewardsVault, "Element Optimistic Rewards Vault");
    console.log("fetching optimistic grants...");
    let optimisticGrantsInfo;
    try {
        optimisticGrantsInfo = await (0, $ea983bd59f91584b$export$2102456b9534a08d)(provider, chainId, optimisticGrants, "Element Optimistic Grants Vault");
    } catch (error) {
        console.log("error fetching optimistic grants info", error);
    }
    console.log("fetching airdrop...");
    const airdropInfo = await (0, $ff01ca756ce20520$export$365b04c0669f75e2)(provider, chainId, airdrop, "Element Airdrop Contract");
    console.log("fetching treasury...");
    let treasuryInfo;
    try {
        treasuryInfo = await (0, $1b278125e9b21379$export$fb5a25d1912ee407)(provider, chainId, treasury, "Element Treasury");
    } catch (error1) {
        console.log("error fetching treasury info", error1);
    }
    console.log("fetching timelock...");
    const timelockInfo = await (0, $a593c6575dd9337e$export$ac1a17c2da84e5d)(provider, chainId, timeLock, "Element Timelock");
    console.log("done!");
    const tokenList = {
        name: name,
        logoURI: "https://element.fi/logo.svg",
        timestamp: new Date().toISOString(),
        version: {
            major: 0,
            minor: 1,
            patch: 0
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
        ].filter((t)=>!!t)
    };
    return tokenList;
}


const $09825a8db0a1b50d$export$e9611bc3ed413e87 = (0, (/*@__PURE__*/$parcel$interopDefault($86683490d1e4d5fe$exports)));
const $09825a8db0a1b50d$export$5cb61d802df8179b = (0, (/*@__PURE__*/$parcel$interopDefault($e4ae1ea1cb34fb21$exports)));
const $09825a8db0a1b50d$export$8872fc0a9db0e8b = (0, (/*@__PURE__*/$parcel$interopDefault($b1ad45c1aad663eb$exports)));
const $09825a8db0a1b50d$export$bf1e9dcca16b49bd = (0, (/*@__PURE__*/$parcel$interopDefault($c649f2b5ffdbe160$exports)));


export {$09825a8db0a1b50d$export$e9611bc3ed413e87 as goerliTokenList, $09825a8db0a1b50d$export$5cb61d802df8179b as goerliAddressList, $09825a8db0a1b50d$export$8872fc0a9db0e8b as mainnetTokenList, $09825a8db0a1b50d$export$bf1e9dcca16b49bd as mainnetAddressList, $0ebd5d33c059685e$export$4aec0e9d20ba276 as getTokenList};
//# sourceMappingURL=index.esm.js.map
