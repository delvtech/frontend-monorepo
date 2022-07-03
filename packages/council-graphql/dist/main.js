var $1RIJT$graphqltoolsschema = require("@graphql-tools/schema");
var $1RIJT$elementficounciltokenlist = require("@elementfi/council-tokenlist");
var $1RIJT$etherslibutils = require("ethers/lib/utils");
var $1RIJT$elementficounciltypechain = require("@elementfi/council-typechain");
var $1RIJT$ethers = require("ethers");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}

$parcel$export(module.exports, "councilSchema", () => $efcd12aae16f0d3a$export$824f3a4901d93da0);
$parcel$export(module.exports, "councilGraph", () => $efcd12aae16f0d3a$export$e7bdfe02b30499c1);


const $f4abb89e06fb39b8$export$dccbaf402067d026 = 31337;


const $44e679129a722ae9$var$fromBlockNumbersByChainId = {
    [(0, $f4abb89e06fb39b8$export$dccbaf402067d026)]: 0,
    [(0, $1RIJT$elementficounciltokenlist.goerliAddressList).chainId]: 0,
    [(0, $1RIJT$elementficounciltokenlist.mainnetAddressList).chainId]: 14496292
};
function $44e679129a722ae9$export$6f26dcf52cd87c41(chainId) {
    return $44e679129a722ae9$var$fromBlockNumbersByChainId[chainId];
}
const $44e679129a722ae9$export$d17caeb873b227b2 = function() {
    let savedResult;
    const TIME_TO_LIVE = 10000; // 10 seconds
    return async function(provider) {
        if (!savedResult) {
            savedResult = await provider.getBlockNumber();
            setTimeout(()=>{
                savedResult = undefined;
            }, TIME_TO_LIVE);
        }
        return savedResult;
    };
}();


const $e35651dc583d7dca$export$b327309c2fad1272 = {
    async getByIds (ids, votingContract, context) {
        const infos = await $e35651dc583d7dca$var$getInfos(votingContract, context);
        const infosById = {};
        for (const info1 of infos)infosById[info1.proposalId] = info1;
        const idsWithMissingInfo = ids.filter((id)=>!infosById[id]);
        if (idsWithMissingInfo.length) {
            const dataSource = $e35651dc583d7dca$var$getDataSourceByName(votingContract.name, context.dataSources);
            for (const id of idsWithMissingInfo){
                const { created: created , expiration: expiration , lastCall: lastCall , quorum: quorum , unlock: unlock  } = await dataSource.getProposalById(id);
                infosById[id] = {
                    proposalId: id,
                    created: created,
                    expiration: expiration,
                    lastCall: lastCall,
                    quorum: quorum,
                    unlock: unlock
                };
            }
        }
        return ids.map((id)=>{
            const info = infosById[id];
            return {
                id: id,
                votingContract: votingContract,
                created: info?.created,
                description: info?.description,
                expiration: info?.expiration,
                isVerified: !!info?.snapshotId,
                lastCall: info?.lastCall,
                quorum: info?.quorum,
                title: info?.title,
                unlock: info?.unlock
            };
        });
    },
    async getById (id, votingContract, context) {
        const proposals = await this.getByIds([
            id
        ], votingContract, context);
        return proposals[0];
    },
    async getByVotingContract (votingContract, context) {
        const dataSource = $e35651dc583d7dca$var$getDataSourceByName(votingContract.name, context.dataSources);
        if (!dataSource) return [];
        const args = await dataSource.getProposalCreatedEventArgs((0, $44e679129a722ae9$export$6f26dcf52cd87c41)(context.chainId));
        const ids = args.map(({ proposalId: proposalId  })=>proposalId);
        return this.getByIds(ids, votingContract, context);
    }
};
async function $e35651dc583d7dca$var$getInfos({ name: name  }, { chainId: chainId , dataSources: dataSources  }) {
    let fileName;
    if (name === "coreVoting") fileName = $e35651dc583d7dca$var$getInfoFileName(chainId);
    else if (name === "gscCoreVoting") fileName = $e35651dc583d7dca$var$getGSCInfoFileName(chainId);
    if (!fileName) return [];
    const json = await dataSources.elementS3.getFile(fileName, "json");
    return json.proposals;
}
function $e35651dc583d7dca$var$getInfoFileName(chainId) {
    switch(chainId){
        case 1:
            return "mainnet.proposals.json";
        case 5:
            return "goerli.proposals.json";
        default:
            "testnet.proposals.json";
    }
}
function $e35651dc583d7dca$var$getGSCInfoFileName(chainId) {
    switch(chainId){
        case 1:
            return "mainnet-gsc.proposals.json";
        case 5:
            return "goerli-gsc.proposals.json";
        default:
            "testnet-gsc.proposals.json";
    }
}
function $e35651dc583d7dca$var$getDataSourceByName(name, dataSources) {
    switch(name){
        case "gscCoreVoting":
            return dataSources.gscVoting;
        case "coreVoting":
        default:
            return dataSources.coreVoting;
    }
}



const $d10dcacbcc0ff0c7$export$81fb29a3b5045c76 = {
    async getByVoters (voters, { id: id , votingContract: votingContract  }, { dataSources: dataSources  }) {
        let dataSource;
        if (votingContract.name === "coreVoting") dataSource = dataSources.coreVoting;
        else if (votingContract.name === "gscCoreVoting") dataSource = dataSources.gscVoting;
        if (!dataSource) return [];
        return await Promise.all(voters.map(async (voter)=>{
            const { votingPower: votingPower , castBallot: castBallot  } = await dataSource.getVote(voter, id);
            return {
                voter: voter,
                power: (0, $1RIJT$etherslibutils.formatEther)(votingPower),
                castBallot: votingPower.toBigInt() > 0 ? [
                    "Yes",
                    "No",
                    "Abstain"
                ][castBallot] : null
            };
        }));
    },
    async getByVoter (voter, proposal, context) {
        const votes = await this.getByVoters([
            voter
        ], proposal, context);
        return votes[0];
    }
};




const $8ea3b6651c03c85e$export$a8fd08e8b7cfacd3 = {
    ...(0, $1RIJT$elementficounciltokenlist.mainnetAddressList),
    chainId: (0, $f4abb89e06fb39b8$export$dccbaf402067d026)
};
const $8ea3b6651c03c85e$export$578de1f6b0e6a3e9 = {
    chainId: (0, $f4abb89e06fb39b8$export$dccbaf402067d026),
    addresses: {
        elementToken: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        coreVoting: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        gscCoreVoting: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
        gscVault: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
        timeLock: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
        lockingVault: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
        vestingVault: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e",
        optimisticRewardsVault: "0x0000000000000000000000000000000000000000",
        airdrop: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",
        optimisticGrants: "0x0000000000000000000000000000000000000000",
        treasury: "0x9A676e781A523b5d0C0e43731313A708CB607508",
        spender: "0x0B306BF915C4d645ff596e518fAf3F9669b97016"
    }
};
const $8ea3b6651c03c85e$export$c9b69c213f456a9c = {
    addresses: {
        airdrop: "0x0BDb999cFA9c47d6d62323a1905F8Eb7B3c9B119",
        coreVoting: "0xFDFEF9D10d929cB3905C71400ce6be1990EA0F34",
        elementToken: "0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA",
        gscCoreVoting: "0xFf807885934003A35b1284d7445fc83Fd23417e5",
        gscVault: "0x84e924C5E04438D2c1Df1A981f7E7104952e6de1",
        lockingVault: "0x4E0597863fA1AA7B6b95a887AD9fEee038815642",
        optimisticGrants: "0x0000000000000000000000000000000000000000",
        optimisticRewardsVault: "0x0000000000000000000000000000000000000000",
        timeLock: "0xdCCc660F92826649754E357b11bd41C31C0609B9",
        treasury: "0x6f2fa37EBfaf089C4Fd7e6124C1028306943D11d",
        vestingVault: "0x2061701b22095418514C0D4a28366C54B1464C17",
        spender: "0x0000000000000000000000000000000000000000"
    },
    chainId: (0, $f4abb89e06fb39b8$export$dccbaf402067d026)
};
const $8ea3b6651c03c85e$export$9436df4cfba9682 = {
    // TODO: When and how should mainnetForkAddressList be used?
    [(0, $f4abb89e06fb39b8$export$dccbaf402067d026)]: $8ea3b6651c03c85e$export$578de1f6b0e6a3e9,
    [(0, $1RIJT$elementficounciltokenlist.goerliAddressList).chainId]: (0, $1RIJT$elementficounciltokenlist.goerliAddressList),
    [(0, $1RIJT$elementficounciltokenlist.mainnetAddressList).chainId]: (0, $1RIJT$elementficounciltokenlist.mainnetAddressList)
};
function $8ea3b6651c03c85e$export$17d5f00cfd692b8a(chainId) {
    return $8ea3b6651c03c85e$export$9436df4cfba9682[chainId]?.addresses || $8ea3b6651c03c85e$export$578de1f6b0e6a3e9.addresses;
}
function $8ea3b6651c03c85e$export$1135c229e41c145c(address, chainId) {
    const addresses = $8ea3b6651c03c85e$export$17d5f00cfd692b8a(chainId);
    for (const [type, typeAddress] of Object.entries(addresses)){
        if (address === typeAddress) return type;
    }
}



const $7818ae0a8b433afc$export$1dbe110119cb4dd2 = {
    getByName (name, { chainId: chainId  }) {
        const addresses = (0, $8ea3b6651c03c85e$export$17d5f00cfd692b8a)(chainId);
        return {
            address: addresses[name],
            name: name
        };
    }
};


const $1f368d119f63f485$export$4c0b87851cbe4e3f = {
    getByName (name1, context) {
        const addresses = (0, $8ea3b6651c03c85e$export$17d5f00cfd692b8a)(context.chainId);
        const vaultNames = $1f368d119f63f485$var$vaultNamesByVotingContract[name1];
        return {
            address: addresses[name1],
            name: name1,
            votingVaults: vaultNames?.map((name)=>(0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByName(name, context)) || []
        };
    }
};
const $1f368d119f63f485$var$vaultNamesByVotingContract = {
    coreVoting: [
        "lockingVault",
        "vestingVault"
    ],
    gscCoreVoting: [
        "gscVault"
    ]
};




const $889645ffb5e37d8c$export$a0cbbdeeb12308cd = {
    async getByVoters (voters, votingVaults, blockNumber, { dataSources: dataSources , provider: provider  }) {
        blockNumber = blockNumber || await (0, $44e679129a722ae9$export$d17caeb873b227b2)(provider);
        const votingPowers = [];
        for (const voter of voters){
            let aggregateValue = BigInt(0);
            for (const { name: name  } of votingVaults){
                let value;
                switch(name){
                    case "lockingVault":
                        value = await dataSources.lockingVault.getVotingPowerView(voter, blockNumber);
                        break;
                    case "vestingVault":
                        value = await dataSources.vestingVault.getVotingPowerView(voter, blockNumber);
                        break;
                    case "gscVault":
                        value = await dataSources.gscVault.getVotingPower(voter, blockNumber);
                        break;
                }
                aggregateValue += BigInt(value || 0);
            }
            votingPowers.push({
                value: (0, $1RIJT$etherslibutils.formatEther)(aggregateValue),
                voter: voter,
                votingVaults: votingVaults,
                blockNumber: blockNumber
            });
        }
        return votingPowers;
    },
    async getByVoter (voter, votingVaults, blockNumber, context) {
        const votingPowers = await this.getByVoters([
            voter
        ], votingVaults, blockNumber, context);
        return votingPowers[0];
    },
    async getIsStale ({ value: value , voter: voter , votingVaults: votingVaults , blockNumber: blockNumber  }, { dataSources: dataSources , provider: provider  }) {
        const latestBlock = await (0, $44e679129a722ae9$export$d17caeb873b227b2)(provider);
        if (blockNumber === latestBlock) return false;
        else {
            for (const { name: name  } of votingVaults){
                const dataSource = $889645ffb5e37d8c$var$getDataSourceByName(name, dataSources);
                const valueAtBlock = await dataSource?.getVotingPower(voter, blockNumber);
                if (Number(valueAtBlock) === 0 && Number(value) > 0) return true;
                return false;
            }
            return null;
        }
    }
};
function $889645ffb5e37d8c$var$getDataSourceByName(name, dataSources) {
    switch(name){
        case "lockingVault":
            return dataSources.lockingVault;
        case "vestingVault":
            return dataSources.vestingVault;
        case "gscVault":
            return dataSources.gscVault;
    }
}



const $76cfde035e4f639b$export$f62412552be5daf2 = {
    Query: {
        coreVoting: (_, __, context)=>{
            return (0, $1f368d119f63f485$export$4c0b87851cbe4e3f).getByName("coreVoting", context);
        },
        gscVoting: (_, __, context)=>{
            return (0, $1f368d119f63f485$export$4c0b87851cbe4e3f).getByName("gscCoreVoting", context);
        },
        lockingVault: (_, __, context)=>{
            return (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByName("lockingVault", context);
        },
        vestingVault: (_, __, context)=>{
            return (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByName("vestingVault", context);
        },
        gscVault: (_, __, context)=>{
            return (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByName("gscVault", context);
        }
    },
    VotingContract: {
        proposal: (votingContract, { id: id  }, context)=>{
            return (0, $e35651dc583d7dca$export$b327309c2fad1272).getById(id, votingContract, context);
        },
        proposals: async (votingContract, { ids: ids , isVerified: isVerified  }, context)=>{
            let unfiltered = [];
            if (ids) unfiltered = await (0, $e35651dc583d7dca$export$b327309c2fad1272).getByIds(ids, votingContract, context);
            else unfiltered = await (0, $e35651dc583d7dca$export$b327309c2fad1272).getByVotingContract(votingContract, context);
            if (typeof isVerified === "undefined") return unfiltered;
            return unfiltered.filter((proposal)=>proposal.isVerified === isVerified);
        },
        votingPower: ({ votingVaults: votingVaults  }, { voter: voter , blockNumber: blockNumber  }, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoter(voter, votingVaults, blockNumber, context);
        },
        votingPowers: ({ votingVaults: votingVaults  }, { voters: voters , blockNumber: blockNumber  }, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoters(voters, votingVaults, blockNumber, context);
        }
    },
    VotingVault: {
        votingPower: (votingVault, { voter: voter , blockNumber: blockNumber  }, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoter(voter, [
                votingVault
            ], blockNumber, context);
        },
        votingPowers: (votingVault, { voters: voters , blockNumber: blockNumber  }, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoters(voters, [
                votingVault
            ], blockNumber, context);
        }
    },
    Proposal: {
        vote: (proposal, { voter: voter  }, context)=>{
            return (0, $d10dcacbcc0ff0c7$export$81fb29a3b5045c76).getByVoter(voter, proposal, context);
        },
        votes: (proposal, { voters: voters  }, context)=>{
            return (0, $d10dcacbcc0ff0c7$export$81fb29a3b5045c76).getByVoters(voters, proposal, context);
        },
        votingPower: ({ votingContract: votingContract , created: created  }, { voter: voter  }, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoter(voter, votingContract.votingVaults, created, context);
        },
        votingPowers: ({ votingContract: votingContract , created: created  }, { voters: voters  }, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoters(voters, votingContract.votingVaults, created, context);
        }
    },
    VotingPower: {
        isStale: (votingPower, _, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getIsStale(votingPower, context);
        }
    }
};



class $41844f56d22dc55e$export$2e2bcd8739ae039 {
    constructor(address, provider){
        this.address = address;
        this.contract = (0, $1RIJT$elementficounciltypechain.CoreVoting__factory).connect(address, provider);
    }
    async getProposalCreatedEventArgs(fromBlock, toBlock) {
        const proposalCreatedEvents = await this.contract.queryFilter(this.contract.filters.ProposalCreated(), fromBlock, toBlock);
        return proposalCreatedEvents.map(({ args: { proposalId: proposalId , created: created , execution: execution , expiration: expiration  } , ...rest })=>{
            return {
                proposalId: proposalId.toString(),
                created: created.toNumber(),
                execution: execution.toNumber(),
                expiration: expiration.toNumber()
            };
        });
    }
    async getProposalById(id) {
        const { proposalHash: proposalHash , created: created , unlock: unlock , expiration: expiration , quorum: quorum , lastCall: lastCall  } = await this.contract.functions.proposals(id);
        return {
            proposalHash: proposalHash,
            created: created.toNumber(),
            unlock: unlock.toNumber(),
            expiration: expiration.toNumber(),
            lastCall: lastCall.toNumber(),
            quorum: quorum.toString()
        };
    }
    async getVote(voter, proposalId) {
        return this.contract.functions.votes(voter, proposalId);
    }
}


class $1372f0480bdde47b$export$2e2bcd8739ae039 {
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }
    getFile(fileName, transformation) {
        return fetch(`${this.baseUrl}${fileName}`).then((res)=>res[transformation || "text"]());
    }
}








class $a0cf45371a696709$export$2e2bcd8739ae039 {
    constructor(address, contract){
        this.address = address;
        this.contract = contract;
    }
    async getVotingPower(voter, blockNumber) {
        try {
            // TODO: find a better solution for this.
            // ethers.js will spit out an error message that we can't disable without
            // turning off the logger. because the smart contract code for
            // queryVotePower returns an error if the account is not found, it can
            // flood the console with errors. this is a workaround until a better
            // solution is found.
            (0, $1RIJT$ethers.ethers).utils.Logger.setLogLevel((0, $1RIJT$etherslibutils.Logger).levels.OFF);
            const votePower = await this.contract.callStatic.queryVotePower(voter, blockNumber, "0x00");
            (0, $1RIJT$ethers.ethers).utils.Logger.setLogLevel((0, $1RIJT$etherslibutils.Logger).levels.WARNING);
            return votePower.toString();
        } catch (error) {
            return "0";
        }
    }
}


class $a1c706d406f5708a$export$2e2bcd8739ae039 extends (0, $a0cf45371a696709$export$2e2bcd8739ae039) {
    constructor(address, provider){
        const contract = (0, $1RIJT$elementficounciltypechain.LockingVault__factory).connect(address, provider);
        super(address, contract);
        this.contract = contract;
    }
    async getVotingPowerView(voter, blockNumber) {
        try {
            // TODO: find a better solution for this.
            // ethers.js will spit out an error message that we can't disable without turning off the
            // logger.  because the smart contract code for queryVotePower returns an error if the
            // account is not found, it can flood the console with errors.  this is a workaround until a
            // better solution is found.
            (0, $1RIJT$ethers.ethers).utils.Logger.setLogLevel((0, $1RIJT$etherslibutils.Logger).levels.OFF);
            const votePower = await this.contract.callStatic.queryVotePowerView(voter, blockNumber);
            (0, $1RIJT$ethers.ethers).utils.Logger.setLogLevel((0, $1RIJT$etherslibutils.Logger).levels.WARNING);
            return votePower.toString();
        } catch (error) {}
    }
}






class $e0e2802e459d88e3$export$2e2bcd8739ae039 extends (0, $a0cf45371a696709$export$2e2bcd8739ae039) {
    constructor(address, provider){
        const contract = (0, $1RIJT$elementficounciltypechain.VestingVault__factory).connect(address, provider);
        super(address, contract);
        this.contract = contract;
    }
    async getVotingPowerView(voter, blockNumber) {
        try {
            // TODO: find a better solution for this.
            // ethers.js will spit out an error message that we can't disable without turning off the
            // logger.  because the smart contract code for queryVotePower returns an error if the
            // account is not found, it can flood the console with errors.  this is a workaround until a
            // better solution is found.
            (0, $1RIJT$ethers.ethers).utils.Logger.setLogLevel((0, $1RIJT$etherslibutils.Logger).levels.OFF);
            const votePower = await this.contract.callStatic.queryVotePowerView(voter, blockNumber);
            (0, $1RIJT$ethers.ethers).utils.Logger.setLogLevel((0, $1RIJT$etherslibutils.Logger).levels.WARNING);
            return votePower.toString();
        } catch (error) {}
    }
}




class $492df70f1218e6f0$export$2e2bcd8739ae039 extends (0, $a0cf45371a696709$export$2e2bcd8739ae039) {
    constructor(address, provider){
        const contract = (0, $1RIJT$elementficounciltypechain.GSCVault__factory).connect(address, provider);
        super(address, contract);
        this.contract = contract;
    }
}


async function $362c94e84882e5ac$export$54fae1269cb9a9e0(context) {
    const { chainId: chainId , dataSources: dataSources , provider: provider  } = context;
    const addresses = (0, $8ea3b6651c03c85e$export$17d5f00cfd692b8a)(chainId);
    return {
        ...context,
        dataSources: {
            ...dataSources,
            coreVoting: new (0, $41844f56d22dc55e$export$2e2bcd8739ae039)(addresses.coreVoting, provider),
            gscVoting: new (0, $41844f56d22dc55e$export$2e2bcd8739ae039)(addresses.gscCoreVoting, provider),
            lockingVault: new (0, $a1c706d406f5708a$export$2e2bcd8739ae039)(addresses.lockingVault, provider),
            vestingVault: new (0, $e0e2802e459d88e3$export$2e2bcd8739ae039)(addresses.vestingVault, provider),
            gscVault: new (0, $492df70f1218e6f0$export$2e2bcd8739ae039)(addresses.gscVault, provider),
            elementS3: new (0, $1372f0480bdde47b$export$2e2bcd8739ae039)("https://elementfi.s3.us-east-2.amazonaws.com/")
        }
    };
}


var $430a85f9dbbc5964$exports = {};
$430a85f9dbbc5964$exports = {
    "kind": "Document",
    "definitions": [
        {
            "kind": "ObjectTypeDefinition",
            "description": {
                "kind": "StringValue",
                "value": "CoreVoting\n- holds the proposals\n- allows you to create a proposal\n- maintains a whitelist of approved voting vaults\n- Has events for seeing the list of votes (voting power + ballot) that have been cast)\n- has vote(votingVaults[], proposalId) method\n\nGSCVoting\n- holds the proposals that gsc votes on\n- allows you to create a proposal\n- has a single approved voting vault, aka LockingVault\n- Has events for seeing the list of votes (voting power + ballot) that have been cast)\n- has vote(votingVaults[], proposalId) method\n\n\nVotingVault\n(ie: LockingVault, VestingVault)\n- allows you to deposit your ELFI token, giving you voting power in the vault\n- can define the behavior for calculating how much voting power the depositer into the vault receives\n    - eg, LockingVault defines delegation capabilities, where 1 ELFI = 1 Vote power\n    - eg, VestingVault defines delegation too, but 1 ELFI = 0.25 VP",
                "block": true,
                "loc": {
                    "start": 0,
                    "end": 931
                }
            },
            "name": {
                "kind": "Name",
                "value": "Query",
                "loc": {
                    "start": 938,
                    "end": 943
                }
            },
            "interfaces": [],
            "directives": [],
            "fields": [
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "coreVoting",
                        "loc": {
                            "start": 949,
                            "end": 959
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingContract",
                            "loc": {
                                "start": 961,
                                "end": 975
                            }
                        },
                        "loc": {
                            "start": 961,
                            "end": 975
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 949,
                        "end": 975
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "gscVoting",
                        "loc": {
                            "start": 979,
                            "end": 988
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingContract",
                            "loc": {
                                "start": 990,
                                "end": 1004
                            }
                        },
                        "loc": {
                            "start": 990,
                            "end": 1004
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 979,
                        "end": 1004
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "lockingVault",
                        "loc": {
                            "start": 1008,
                            "end": 1020
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingVault",
                            "loc": {
                                "start": 1022,
                                "end": 1033
                            }
                        },
                        "loc": {
                            "start": 1022,
                            "end": 1033
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1008,
                        "end": 1033
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vestingVault",
                        "loc": {
                            "start": 1037,
                            "end": 1049
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingVault",
                            "loc": {
                                "start": 1051,
                                "end": 1062
                            }
                        },
                        "loc": {
                            "start": 1051,
                            "end": 1062
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1037,
                        "end": 1062
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "gscVault",
                        "loc": {
                            "start": 1066,
                            "end": 1074
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingVault",
                            "loc": {
                                "start": 1076,
                                "end": 1087
                            }
                        },
                        "loc": {
                            "start": 1076,
                            "end": 1087
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1066,
                        "end": 1087
                    }
                }
            ],
            "loc": {
                "start": 0,
                "end": 1090
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingContract",
                "loc": {
                    "start": 1099,
                    "end": 1113
                }
            },
            "interfaces": [],
            "directives": [],
            "fields": [
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "address",
                        "loc": {
                            "start": 1119,
                            "end": 1126
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID",
                                "loc": {
                                    "start": 1128,
                                    "end": 1130
                                }
                            },
                            "loc": {
                                "start": 1128,
                                "end": 1130
                            }
                        },
                        "loc": {
                            "start": 1128,
                            "end": 1131
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1119,
                        "end": 1131
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "name",
                        "loc": {
                            "start": 1135,
                            "end": 1139
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String",
                                "loc": {
                                    "start": 1141,
                                    "end": 1147
                                }
                            },
                            "loc": {
                                "start": 1141,
                                "end": 1147
                            }
                        },
                        "loc": {
                            "start": 1141,
                            "end": 1148
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1135,
                        "end": 1148
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1152,
                            "end": 1164
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "ListType",
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "VotingVault",
                                        "loc": {
                                            "start": 1167,
                                            "end": 1178
                                        }
                                    },
                                    "loc": {
                                        "start": 1167,
                                        "end": 1178
                                    }
                                },
                                "loc": {
                                    "start": 1167,
                                    "end": 1179
                                }
                            },
                            "loc": {
                                "start": 1166,
                                "end": 1180
                            }
                        },
                        "loc": {
                            "start": 1166,
                            "end": 1181
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1152,
                        "end": 1181
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 1185,
                            "end": 1193
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "id",
                                "loc": {
                                    "start": 1194,
                                    "end": 1196
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "ID",
                                        "loc": {
                                            "start": 1198,
                                            "end": 1200
                                        }
                                    },
                                    "loc": {
                                        "start": 1198,
                                        "end": 1200
                                    }
                                },
                                "loc": {
                                    "start": 1198,
                                    "end": 1201
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1194,
                                "end": 1201
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Proposal",
                            "loc": {
                                "start": 1204,
                                "end": 1212
                            }
                        },
                        "loc": {
                            "start": 1204,
                            "end": 1212
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1185,
                        "end": 1212
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposals",
                        "loc": {
                            "start": 1216,
                            "end": 1225
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "ids",
                                "loc": {
                                    "start": 1226,
                                    "end": 1229
                                }
                            },
                            "type": {
                                "kind": "ListType",
                                "type": {
                                    "kind": "NonNullType",
                                    "type": {
                                        "kind": "NamedType",
                                        "name": {
                                            "kind": "Name",
                                            "value": "ID",
                                            "loc": {
                                                "start": 1232,
                                                "end": 1234
                                            }
                                        },
                                        "loc": {
                                            "start": 1232,
                                            "end": 1234
                                        }
                                    },
                                    "loc": {
                                        "start": 1232,
                                        "end": 1235
                                    }
                                },
                                "loc": {
                                    "start": 1231,
                                    "end": 1236
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1226,
                                "end": 1236
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "isVerified",
                                "loc": {
                                    "start": 1238,
                                    "end": 1248
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Boolean",
                                    "loc": {
                                        "start": 1250,
                                        "end": 1257
                                    }
                                },
                                "loc": {
                                    "start": 1250,
                                    "end": 1257
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1238,
                                "end": 1257
                            }
                        }
                    ],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "Proposal",
                                "loc": {
                                    "start": 1261,
                                    "end": 1269
                                }
                            },
                            "loc": {
                                "start": 1261,
                                "end": 1269
                            }
                        },
                        "loc": {
                            "start": 1260,
                            "end": 1270
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1216,
                        "end": 1270
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1274,
                            "end": 1285
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1286,
                                    "end": 1291
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "ID",
                                        "loc": {
                                            "start": 1293,
                                            "end": 1295
                                        }
                                    },
                                    "loc": {
                                        "start": 1293,
                                        "end": 1295
                                    }
                                },
                                "loc": {
                                    "start": 1293,
                                    "end": 1296
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1286,
                                "end": 1296
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 1298,
                                    "end": 1309
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1311,
                                        "end": 1314
                                    }
                                },
                                "loc": {
                                    "start": 1311,
                                    "end": 1314
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1298,
                                "end": 1314
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1317,
                                "end": 1328
                            }
                        },
                        "loc": {
                            "start": 1317,
                            "end": 1328
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1274,
                        "end": 1328
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1332,
                            "end": 1344
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1345,
                                    "end": 1351
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "ListType",
                                    "type": {
                                        "kind": "NonNullType",
                                        "type": {
                                            "kind": "NamedType",
                                            "name": {
                                                "kind": "Name",
                                                "value": "ID",
                                                "loc": {
                                                    "start": 1354,
                                                    "end": 1356
                                                }
                                            },
                                            "loc": {
                                                "start": 1354,
                                                "end": 1356
                                            }
                                        },
                                        "loc": {
                                            "start": 1354,
                                            "end": 1357
                                        }
                                    },
                                    "loc": {
                                        "start": 1353,
                                        "end": 1358
                                    }
                                },
                                "loc": {
                                    "start": 1353,
                                    "end": 1359
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1345,
                                "end": 1359
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 1361,
                                    "end": 1372
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1374,
                                        "end": 1377
                                    }
                                },
                                "loc": {
                                    "start": 1374,
                                    "end": 1377
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1361,
                                "end": 1377
                            }
                        }
                    ],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "VotingPower",
                                "loc": {
                                    "start": 1381,
                                    "end": 1392
                                }
                            },
                            "loc": {
                                "start": 1381,
                                "end": 1392
                            }
                        },
                        "loc": {
                            "start": 1380,
                            "end": 1393
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1332,
                        "end": 1393
                    }
                }
            ],
            "loc": {
                "start": 1094,
                "end": 1396
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingVault",
                "loc": {
                    "start": 1405,
                    "end": 1416
                }
            },
            "interfaces": [],
            "directives": [],
            "fields": [
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "address",
                        "loc": {
                            "start": 1422,
                            "end": 1429
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID",
                                "loc": {
                                    "start": 1431,
                                    "end": 1433
                                }
                            },
                            "loc": {
                                "start": 1431,
                                "end": 1433
                            }
                        },
                        "loc": {
                            "start": 1431,
                            "end": 1434
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1422,
                        "end": 1434
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "name",
                        "loc": {
                            "start": 1438,
                            "end": 1442
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String",
                                "loc": {
                                    "start": 1444,
                                    "end": 1450
                                }
                            },
                            "loc": {
                                "start": 1444,
                                "end": 1450
                            }
                        },
                        "loc": {
                            "start": 1444,
                            "end": 1451
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1438,
                        "end": 1451
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1455,
                            "end": 1466
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1467,
                                    "end": 1472
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "ID",
                                        "loc": {
                                            "start": 1474,
                                            "end": 1476
                                        }
                                    },
                                    "loc": {
                                        "start": 1474,
                                        "end": 1476
                                    }
                                },
                                "loc": {
                                    "start": 1474,
                                    "end": 1477
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1467,
                                "end": 1477
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 1479,
                                    "end": 1490
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1492,
                                        "end": 1495
                                    }
                                },
                                "loc": {
                                    "start": 1492,
                                    "end": 1495
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1479,
                                "end": 1495
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1498,
                                "end": 1509
                            }
                        },
                        "loc": {
                            "start": 1498,
                            "end": 1509
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1455,
                        "end": 1509
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1513,
                            "end": 1525
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1526,
                                    "end": 1532
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "ListType",
                                    "type": {
                                        "kind": "NonNullType",
                                        "type": {
                                            "kind": "NamedType",
                                            "name": {
                                                "kind": "Name",
                                                "value": "ID",
                                                "loc": {
                                                    "start": 1535,
                                                    "end": 1537
                                                }
                                            },
                                            "loc": {
                                                "start": 1535,
                                                "end": 1537
                                            }
                                        },
                                        "loc": {
                                            "start": 1535,
                                            "end": 1538
                                        }
                                    },
                                    "loc": {
                                        "start": 1534,
                                        "end": 1539
                                    }
                                },
                                "loc": {
                                    "start": 1534,
                                    "end": 1540
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1526,
                                "end": 1540
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 1542,
                                    "end": 1553
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1555,
                                        "end": 1558
                                    }
                                },
                                "loc": {
                                    "start": 1555,
                                    "end": 1558
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1542,
                                "end": 1558
                            }
                        }
                    ],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "VotingPower",
                                "loc": {
                                    "start": 1562,
                                    "end": 1573
                                }
                            },
                            "loc": {
                                "start": 1562,
                                "end": 1573
                            }
                        },
                        "loc": {
                            "start": 1561,
                            "end": 1574
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1513,
                        "end": 1574
                    }
                }
            ],
            "loc": {
                "start": 1400,
                "end": 1577
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Proposal",
                "loc": {
                    "start": 1586,
                    "end": 1594
                }
            },
            "interfaces": [],
            "directives": [],
            "fields": [
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "id",
                        "loc": {
                            "start": 1600,
                            "end": 1602
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID",
                                "loc": {
                                    "start": 1604,
                                    "end": 1606
                                }
                            },
                            "loc": {
                                "start": 1604,
                                "end": 1606
                            }
                        },
                        "loc": {
                            "start": 1604,
                            "end": 1607
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1600,
                        "end": 1607
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingContract",
                        "loc": {
                            "start": 1611,
                            "end": 1625
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "VotingContract",
                                "loc": {
                                    "start": 1627,
                                    "end": 1641
                                }
                            },
                            "loc": {
                                "start": 1627,
                                "end": 1641
                            }
                        },
                        "loc": {
                            "start": 1627,
                            "end": 1642
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1611,
                        "end": 1642
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "created",
                        "loc": {
                            "start": 1664,
                            "end": 1671
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1673,
                                "end": 1676
                            }
                        },
                        "loc": {
                            "start": 1673,
                            "end": 1676
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1664,
                        "end": 1676
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "description",
                        "loc": {
                            "start": 1680,
                            "end": 1691
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1693,
                                "end": 1699
                            }
                        },
                        "loc": {
                            "start": 1693,
                            "end": 1699
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1680,
                        "end": 1699
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "expiration",
                        "loc": {
                            "start": 1721,
                            "end": 1731
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1733,
                                "end": 1736
                            }
                        },
                        "loc": {
                            "start": 1733,
                            "end": 1736
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1721,
                        "end": 1736
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isVerified",
                        "loc": {
                            "start": 1740,
                            "end": 1750
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1752,
                                "end": 1759
                            }
                        },
                        "loc": {
                            "start": 1752,
                            "end": 1759
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1740,
                        "end": 1759
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "lastCall",
                        "loc": {
                            "start": 1781,
                            "end": 1789
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1791,
                                "end": 1794
                            }
                        },
                        "loc": {
                            "start": 1791,
                            "end": 1794
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1781,
                        "end": 1794
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "quorum",
                        "loc": {
                            "start": 1798,
                            "end": 1804
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1806,
                                "end": 1812
                            }
                        },
                        "loc": {
                            "start": 1806,
                            "end": 1812
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1798,
                        "end": 1812
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "title",
                        "loc": {
                            "start": 1816,
                            "end": 1821
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1823,
                                "end": 1829
                            }
                        },
                        "loc": {
                            "start": 1823,
                            "end": 1829
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1816,
                        "end": 1829
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "unlock",
                        "loc": {
                            "start": 1851,
                            "end": 1857
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1859,
                                "end": 1862
                            }
                        },
                        "loc": {
                            "start": 1859,
                            "end": 1862
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1851,
                        "end": 1862
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1866,
                            "end": 1870
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1871,
                                    "end": 1876
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "ID",
                                        "loc": {
                                            "start": 1878,
                                            "end": 1880
                                        }
                                    },
                                    "loc": {
                                        "start": 1878,
                                        "end": 1880
                                    }
                                },
                                "loc": {
                                    "start": 1878,
                                    "end": 1881
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1871,
                                "end": 1881
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1884,
                                "end": 1888
                            }
                        },
                        "loc": {
                            "start": 1884,
                            "end": 1888
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1866,
                        "end": 1888
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1892,
                            "end": 1897
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1898,
                                    "end": 1904
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "ListType",
                                    "type": {
                                        "kind": "NonNullType",
                                        "type": {
                                            "kind": "NamedType",
                                            "name": {
                                                "kind": "Name",
                                                "value": "ID",
                                                "loc": {
                                                    "start": 1907,
                                                    "end": 1909
                                                }
                                            },
                                            "loc": {
                                                "start": 1907,
                                                "end": 1909
                                            }
                                        },
                                        "loc": {
                                            "start": 1907,
                                            "end": 1910
                                        }
                                    },
                                    "loc": {
                                        "start": 1906,
                                        "end": 1911
                                    }
                                },
                                "loc": {
                                    "start": 1906,
                                    "end": 1912
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1898,
                                "end": 1912
                            }
                        }
                    ],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "Vote",
                                "loc": {
                                    "start": 1916,
                                    "end": 1920
                                }
                            },
                            "loc": {
                                "start": 1916,
                                "end": 1920
                            }
                        },
                        "loc": {
                            "start": 1915,
                            "end": 1921
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1892,
                        "end": 1921
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1925,
                            "end": 1936
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1937,
                                    "end": 1942
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "ID",
                                        "loc": {
                                            "start": 1944,
                                            "end": 1946
                                        }
                                    },
                                    "loc": {
                                        "start": 1944,
                                        "end": 1946
                                    }
                                },
                                "loc": {
                                    "start": 1944,
                                    "end": 1947
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1937,
                                "end": 1947
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1950,
                                "end": 1961
                            }
                        },
                        "loc": {
                            "start": 1950,
                            "end": 1961
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1925,
                        "end": 1961
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1965,
                            "end": 1977
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1978,
                                    "end": 1984
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "ListType",
                                    "type": {
                                        "kind": "NonNullType",
                                        "type": {
                                            "kind": "NamedType",
                                            "name": {
                                                "kind": "Name",
                                                "value": "ID",
                                                "loc": {
                                                    "start": 1987,
                                                    "end": 1989
                                                }
                                            },
                                            "loc": {
                                                "start": 1987,
                                                "end": 1989
                                            }
                                        },
                                        "loc": {
                                            "start": 1987,
                                            "end": 1990
                                        }
                                    },
                                    "loc": {
                                        "start": 1986,
                                        "end": 1991
                                    }
                                },
                                "loc": {
                                    "start": 1986,
                                    "end": 1992
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1978,
                                "end": 1992
                            }
                        }
                    ],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "VotingPower",
                                "loc": {
                                    "start": 1996,
                                    "end": 2007
                                }
                            },
                            "loc": {
                                "start": 1996,
                                "end": 2007
                            }
                        },
                        "loc": {
                            "start": 1995,
                            "end": 2008
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1965,
                        "end": 2008
                    }
                }
            ],
            "loc": {
                "start": 1581,
                "end": 2011
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Vote",
                "loc": {
                    "start": 2020,
                    "end": 2024
                }
            },
            "interfaces": [],
            "directives": [],
            "fields": [
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 2030,
                            "end": 2035
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID",
                                "loc": {
                                    "start": 2037,
                                    "end": 2039
                                }
                            },
                            "loc": {
                                "start": 2037,
                                "end": 2039
                            }
                        },
                        "loc": {
                            "start": 2037,
                            "end": 2040
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2030,
                        "end": 2040
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "power",
                        "loc": {
                            "start": 2044,
                            "end": 2049
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String",
                                "loc": {
                                    "start": 2051,
                                    "end": 2057
                                }
                            },
                            "loc": {
                                "start": 2051,
                                "end": 2057
                            }
                        },
                        "loc": {
                            "start": 2051,
                            "end": 2058
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2044,
                        "end": 2058
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "castBallot",
                        "loc": {
                            "start": 2062,
                            "end": 2072
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Ballot",
                            "loc": {
                                "start": 2074,
                                "end": 2080
                            }
                        },
                        "loc": {
                            "start": 2074,
                            "end": 2080
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2062,
                        "end": 2080
                    }
                }
            ],
            "loc": {
                "start": 2015,
                "end": 2083
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingPower",
                "loc": {
                    "start": 2092,
                    "end": 2103
                }
            },
            "interfaces": [],
            "directives": [],
            "fields": [
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 2109,
                            "end": 2114
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String",
                                "loc": {
                                    "start": 2116,
                                    "end": 2122
                                }
                            },
                            "loc": {
                                "start": 2116,
                                "end": 2122
                            }
                        },
                        "loc": {
                            "start": 2116,
                            "end": 2123
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2109,
                        "end": 2123
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 2127,
                            "end": 2132
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "ID",
                                "loc": {
                                    "start": 2134,
                                    "end": 2136
                                }
                            },
                            "loc": {
                                "start": 2134,
                                "end": 2136
                            }
                        },
                        "loc": {
                            "start": 2134,
                            "end": 2137
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2127,
                        "end": 2137
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 2141,
                            "end": 2153
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "ListType",
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "VotingVault",
                                        "loc": {
                                            "start": 2156,
                                            "end": 2167
                                        }
                                    },
                                    "loc": {
                                        "start": 2156,
                                        "end": 2167
                                    }
                                },
                                "loc": {
                                    "start": 2156,
                                    "end": 2168
                                }
                            },
                            "loc": {
                                "start": 2155,
                                "end": 2169
                            }
                        },
                        "loc": {
                            "start": 2155,
                            "end": 2170
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2141,
                        "end": 2170
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "blockNumber",
                        "loc": {
                            "start": 2174,
                            "end": 2185
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "Int",
                                "loc": {
                                    "start": 2187,
                                    "end": 2190
                                }
                            },
                            "loc": {
                                "start": 2187,
                                "end": 2190
                            }
                        },
                        "loc": {
                            "start": 2187,
                            "end": 2191
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2174,
                        "end": 2191
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isStale",
                        "loc": {
                            "start": 2195,
                            "end": 2202
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 2204,
                                "end": 2211
                            }
                        },
                        "loc": {
                            "start": 2204,
                            "end": 2211
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2195,
                        "end": 2211
                    }
                }
            ],
            "loc": {
                "start": 2087,
                "end": 2214
            }
        },
        {
            "kind": "EnumTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Ballot",
                "loc": {
                    "start": 2223,
                    "end": 2229
                }
            },
            "directives": [],
            "values": [
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "Yes",
                        "loc": {
                            "start": 2235,
                            "end": 2238
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2235,
                        "end": 2238
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "No",
                        "loc": {
                            "start": 2242,
                            "end": 2244
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2242,
                        "end": 2244
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "Abstain",
                        "loc": {
                            "start": 2248,
                            "end": 2255
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2248,
                        "end": 2255
                    }
                }
            ],
            "loc": {
                "start": 2218,
                "end": 2258
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 2260
    }
};


var $c3b13ec6d9e5ad30$exports = {};

$parcel$export($c3b13ec6d9e5ad30$exports, "Ballot", () => $c3b13ec6d9e5ad30$export$7d641b7d097c9cd3);
let $c3b13ec6d9e5ad30$export$7d641b7d097c9cd3;
(function(Ballot1) {
    Ballot1["Abstain"] = "Abstain";
    Ballot1["No"] = "No";
    Ballot1["Yes"] = "Yes";
})($c3b13ec6d9e5ad30$export$7d641b7d097c9cd3 || ($c3b13ec6d9e5ad30$export$7d641b7d097c9cd3 = {}));


const $efcd12aae16f0d3a$export$824f3a4901d93da0 = (0, $1RIJT$graphqltoolsschema.makeExecutableSchema)({
    resolvers: $76cfde035e4f639b$export$f62412552be5daf2,
    typeDefs: (/*@__PURE__*/$parcel$interopDefault($430a85f9dbbc5964$exports))
});
const $efcd12aae16f0d3a$export$e7bdfe02b30499c1 = {
    schema: $efcd12aae16f0d3a$export$824f3a4901d93da0,
    initContext: $362c94e84882e5ac$export$54fae1269cb9a9e0
};
$parcel$exportWildcard(module.exports, $c3b13ec6d9e5ad30$exports);


//# sourceMappingURL=main.js.map
