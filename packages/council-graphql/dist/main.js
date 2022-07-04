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



function $44e679129a722ae9$export$6f26dcf52cd87c41(chainId) {
    switch(chainId){
        case (0, $1RIJT$elementficounciltokenlist.mainnetAddressList).chainId:
            return 14496292;
        default:
            return 0;
    }
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
        case (0, $1RIJT$elementficounciltokenlist.mainnetAddressList).chainId:
            return "mainnet.proposals.json";
        case (0, $1RIJT$elementficounciltokenlist.goerliAddressList).chainId:
            return "goerli.proposals.json";
        default:
            "testnet.proposals.json";
    }
}
function $e35651dc583d7dca$var$getGSCInfoFileName(chainId) {
    switch(chainId){
        case (0, $1RIJT$elementficounciltokenlist.mainnetAddressList).chainId:
            return "mainnet-gsc.proposals.json";
        case (0, $1RIJT$elementficounciltokenlist.goerliAddressList).chainId:
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
    async getByVoter (voter, { id: id , votingContract: votingContract  }, { dataSources: dataSources  }) {
        let dataSource = $d10dcacbcc0ff0c7$var$getDataSourceByName(votingContract.name, dataSources);
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
    },
    getByVoters (voters, proposal, context) {
        return Promise.all(voters.map((voter)=>this.getByVoter(voter, proposal, context)));
    }
};
function $d10dcacbcc0ff0c7$var$getDataSourceByName(name, dataSources) {
    switch(name){
        case "gscCoreVoting":
            return dataSources.gscVoting;
        case "coreVoting":
        default:
            return dataSources.coreVoting;
    }
}



const $f4abb89e06fb39b8$export$dccbaf402067d026 = 31337;


const $8ea3b6651c03c85e$export$122d5d4b482edf52 = "0xFEaDB1F18386d0225a38E9c4bD1E9Ac52243dE99";
const $8ea3b6651c03c85e$export$f0bc18d92a8ff06c = "0xcC46775f1dB1d697c176ed66698BA3C15394C3D4";
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
function $8ea3b6651c03c85e$export$17d5f00cfd692b8a(chainId) {
    switch(chainId){
        case (0, $1RIJT$elementficounciltokenlist.mainnetAddressList).chainId:
            return (0, $1RIJT$elementficounciltokenlist.mainnetAddressList).addresses;
        case (0, $1RIJT$elementficounciltokenlist.goerliAddressList).chainId:
            return (0, $1RIJT$elementficounciltokenlist.goerliAddressList).addresses;
        default:
            // TODO: When and how should mainnetForkAddressList be used?
            return $8ea3b6651c03c85e$export$578de1f6b0e6a3e9.addresses;
    }
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
        return {
            address: addresses[name1],
            name: name1,
            votingVaults: $1f368d119f63f485$var$vaultNamesByVotingContract[name1]?.map((name)=>(0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByName(name, context)) || []
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
    async getVoteChangeEventArgs(fromBlock, toBlock) {
        const voteChangeEvents = await this.contract.queryFilter(this.contract.filters.VoteChange(), fromBlock, toBlock);
        return voteChangeEvents.map(({ args: { from: from , to: to , amount: amount  }  })=>{
            return {
                from: from,
                to: to,
                amount: amount.toString()
            };
        });
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
    async getVoteChangeEventArgs(fromBlock, toBlock) {
        const voteChangeEvents = await this.contract.queryFilter(this.contract.filters.VoteChange(), fromBlock, toBlock);
        return voteChangeEvents.map(({ args: { from: from , to: to , amount: amount  }  })=>{
            return {
                from: from,
                to: to,
                amount: amount.toString()
            };
        });
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


const $889645ffb5e37d8c$export$a0cbbdeeb12308cd = {
    async getByVotingVault (votingVault, blockNumber, { chainId: chainId , dataSources: dataSources , provider: provider  }) {
        blockNumber = blockNumber || await (0, $44e679129a722ae9$export$d17caeb873b227b2)(provider);
        let value = BigInt(0);
        const dataSource = $889645ffb5e37d8c$var$getDataSourceByName(votingVault.name, dataSources);
        const hasVoteChangeEvents = dataSource instanceof (0, $a1c706d406f5708a$export$2e2bcd8739ae039) || dataSource instanceof (0, $e0e2802e459d88e3$export$2e2bcd8739ae039);
        if (hasVoteChangeEvents) {
            const powerChanges = await dataSource.getVoteChangeEventArgs((0, $44e679129a722ae9$export$6f26dcf52cd87c41)(chainId), blockNumber);
            for (const { to: to , amount: amount  } of powerChanges){
                // The foundation an team deposits are delegated to the 0x0000...0001
                // address so they can't vote.
                const isVoter = to !== (0, $8ea3b6651c03c85e$export$f0bc18d92a8ff06c) && to !== (0, $8ea3b6651c03c85e$export$122d5d4b482edf52);
                if (isVoter) value += BigInt(amount);
            }
        }
        return {
            blockNumber: blockNumber,
            value: value.toString(),
            votingVaults: [
                votingVault
            ]
        };
    },
    async getByVotingVaults (votingVaults, blockNumber, context) {
        blockNumber = blockNumber || await (0, $44e679129a722ae9$export$d17caeb873b227b2)(context.provider);
        let aggregateValue = BigInt(0);
        await Promise.all(votingVaults.map(async (votingVault)=>{
            const vaultVotingPower = await this.getByVotingVault(votingVault, blockNumber, context);
            aggregateValue += BigInt(vaultVotingPower.value);
        }));
        return {
            blockNumber: blockNumber,
            value: aggregateValue.toString(),
            votingVaults: votingVaults
        };
    },
    async getByVoter (voter, votingVaults, blockNumber, { dataSources: dataSources , provider: provider  }) {
        blockNumber = blockNumber || await (0, $44e679129a722ae9$export$d17caeb873b227b2)(provider);
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
        return {
            value: (0, $1RIJT$etherslibutils.formatEther)(aggregateValue),
            voter: voter,
            votingVaults: votingVaults,
            blockNumber: blockNumber
        };
    },
    getByVoters (voters, votingVaults, blockNumber, context) {
        return Promise.all(voters.map((voter)=>this.getByVoter(voter, votingVaults, blockNumber, context)));
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
        totalVotingPower: ({ votingVaults: votingVaults  }, { blockNumber: blockNumber  }, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVotingVaults(votingVaults, blockNumber, context);
        },
        voterPower: ({ votingVaults: votingVaults  }, { voter: voter , blockNumber: blockNumber  }, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoter(voter, votingVaults, blockNumber, context);
        },
        voterPowers: ({ votingVaults: votingVaults  }, { voters: voters , blockNumber: blockNumber  }, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoters(voters, votingVaults, blockNumber, context);
        }
    },
    VotingVault: {
        totalVotingPower: (votingVault, { blockNumber: blockNumber  }, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVotingVault(votingVault, blockNumber, context);
        },
        voterPower: (votingVault, { voter: voter , blockNumber: blockNumber  }, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoter(voter, [
                votingVault
            ], blockNumber, context);
        },
        voterPowers: (votingVault, { voters: voters , blockNumber: blockNumber  }, context)=>{
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
        voterPower: ({ votingContract: votingContract , created: created  }, { voter: voter  }, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoter(voter, votingContract.votingVaults, created, context);
        },
        voterPowers: ({ votingContract: votingContract , created: created  }, { voters: voters  }, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoters(voters, votingContract.votingVaults, created, context);
        }
    },
    VoterPower: {
        isStale: (voterPower, _, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getIsStale(voterPower, context);
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
        return proposalCreatedEvents.map(({ args: { proposalId: proposalId , created: created , execution: execution , expiration: expiration  }  })=>{
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
            "name": {
                "kind": "Name",
                "value": "Query",
                "loc": {
                    "start": 5,
                    "end": 10
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
                            "start": 16,
                            "end": 26
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingContract",
                            "loc": {
                                "start": 28,
                                "end": 42
                            }
                        },
                        "loc": {
                            "start": 28,
                            "end": 42
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 16,
                        "end": 42
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "gscVoting",
                        "loc": {
                            "start": 46,
                            "end": 55
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingContract",
                            "loc": {
                                "start": 57,
                                "end": 71
                            }
                        },
                        "loc": {
                            "start": 57,
                            "end": 71
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 46,
                        "end": 71
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "lockingVault",
                        "loc": {
                            "start": 75,
                            "end": 87
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingVault",
                            "loc": {
                                "start": 89,
                                "end": 100
                            }
                        },
                        "loc": {
                            "start": 89,
                            "end": 100
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 75,
                        "end": 100
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vestingVault",
                        "loc": {
                            "start": 104,
                            "end": 116
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingVault",
                            "loc": {
                                "start": 118,
                                "end": 129
                            }
                        },
                        "loc": {
                            "start": 118,
                            "end": 129
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 104,
                        "end": 129
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "gscVault",
                        "loc": {
                            "start": 133,
                            "end": 141
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingVault",
                            "loc": {
                                "start": 143,
                                "end": 154
                            }
                        },
                        "loc": {
                            "start": 143,
                            "end": 154
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 133,
                        "end": 154
                    }
                }
            ],
            "loc": {
                "start": 0,
                "end": 157
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingContract",
                "loc": {
                    "start": 166,
                    "end": 180
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
                            "start": 186,
                            "end": 193
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
                                    "start": 195,
                                    "end": 197
                                }
                            },
                            "loc": {
                                "start": 195,
                                "end": 197
                            }
                        },
                        "loc": {
                            "start": 195,
                            "end": 198
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 186,
                        "end": 198
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "name",
                        "loc": {
                            "start": 202,
                            "end": 206
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
                                    "start": 208,
                                    "end": 214
                                }
                            },
                            "loc": {
                                "start": 208,
                                "end": 214
                            }
                        },
                        "loc": {
                            "start": 208,
                            "end": 215
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 202,
                        "end": 215
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 219,
                            "end": 231
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
                                            "start": 234,
                                            "end": 245
                                        }
                                    },
                                    "loc": {
                                        "start": 234,
                                        "end": 245
                                    }
                                },
                                "loc": {
                                    "start": 234,
                                    "end": 246
                                }
                            },
                            "loc": {
                                "start": 233,
                                "end": 247
                            }
                        },
                        "loc": {
                            "start": 233,
                            "end": 248
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 219,
                        "end": 248
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 252,
                            "end": 260
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "id",
                                "loc": {
                                    "start": 261,
                                    "end": 263
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
                                            "start": 265,
                                            "end": 267
                                        }
                                    },
                                    "loc": {
                                        "start": 265,
                                        "end": 267
                                    }
                                },
                                "loc": {
                                    "start": 265,
                                    "end": 268
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 261,
                                "end": 268
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Proposal",
                            "loc": {
                                "start": 271,
                                "end": 279
                            }
                        },
                        "loc": {
                            "start": 271,
                            "end": 279
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 252,
                        "end": 279
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposals",
                        "loc": {
                            "start": 283,
                            "end": 292
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "ids",
                                "loc": {
                                    "start": 293,
                                    "end": 296
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
                                                "start": 299,
                                                "end": 301
                                            }
                                        },
                                        "loc": {
                                            "start": 299,
                                            "end": 301
                                        }
                                    },
                                    "loc": {
                                        "start": 299,
                                        "end": 302
                                    }
                                },
                                "loc": {
                                    "start": 298,
                                    "end": 303
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 293,
                                "end": 303
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "isVerified",
                                "loc": {
                                    "start": 305,
                                    "end": 315
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Boolean",
                                    "loc": {
                                        "start": 317,
                                        "end": 324
                                    }
                                },
                                "loc": {
                                    "start": 317,
                                    "end": 324
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 305,
                                "end": 324
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
                                    "start": 328,
                                    "end": 336
                                }
                            },
                            "loc": {
                                "start": 328,
                                "end": 336
                            }
                        },
                        "loc": {
                            "start": 327,
                            "end": 337
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 283,
                        "end": 337
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 341,
                            "end": 357
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 358,
                                    "end": 369
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 371,
                                        "end": 374
                                    }
                                },
                                "loc": {
                                    "start": 371,
                                    "end": 374
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 358,
                                "end": 374
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 377,
                                "end": 393
                            }
                        },
                        "loc": {
                            "start": 377,
                            "end": 393
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 341,
                        "end": 393
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterPower",
                        "loc": {
                            "start": 397,
                            "end": 407
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 408,
                                    "end": 413
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
                                            "start": 415,
                                            "end": 417
                                        }
                                    },
                                    "loc": {
                                        "start": 415,
                                        "end": 417
                                    }
                                },
                                "loc": {
                                    "start": 415,
                                    "end": 418
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 408,
                                "end": 418
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 420,
                                    "end": 431
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 433,
                                        "end": 436
                                    }
                                },
                                "loc": {
                                    "start": 433,
                                    "end": 436
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 420,
                                "end": 436
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VoterPower",
                            "loc": {
                                "start": 439,
                                "end": 449
                            }
                        },
                        "loc": {
                            "start": 439,
                            "end": 449
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 397,
                        "end": 449
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterPowers",
                        "loc": {
                            "start": 453,
                            "end": 464
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 465,
                                    "end": 471
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
                                                    "start": 474,
                                                    "end": 476
                                                }
                                            },
                                            "loc": {
                                                "start": 474,
                                                "end": 476
                                            }
                                        },
                                        "loc": {
                                            "start": 474,
                                            "end": 477
                                        }
                                    },
                                    "loc": {
                                        "start": 473,
                                        "end": 478
                                    }
                                },
                                "loc": {
                                    "start": 473,
                                    "end": 479
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 465,
                                "end": 479
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 481,
                                    "end": 492
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 494,
                                        "end": 497
                                    }
                                },
                                "loc": {
                                    "start": 494,
                                    "end": 497
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 481,
                                "end": 497
                            }
                        }
                    ],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "VoterPower",
                                "loc": {
                                    "start": 501,
                                    "end": 511
                                }
                            },
                            "loc": {
                                "start": 501,
                                "end": 511
                            }
                        },
                        "loc": {
                            "start": 500,
                            "end": 512
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 453,
                        "end": 512
                    }
                }
            ],
            "loc": {
                "start": 161,
                "end": 515
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingVault",
                "loc": {
                    "start": 524,
                    "end": 535
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
                            "start": 541,
                            "end": 548
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
                                    "start": 550,
                                    "end": 552
                                }
                            },
                            "loc": {
                                "start": 550,
                                "end": 552
                            }
                        },
                        "loc": {
                            "start": 550,
                            "end": 553
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 541,
                        "end": 553
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "name",
                        "loc": {
                            "start": 557,
                            "end": 561
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
                                    "start": 563,
                                    "end": 569
                                }
                            },
                            "loc": {
                                "start": 563,
                                "end": 569
                            }
                        },
                        "loc": {
                            "start": 563,
                            "end": 570
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 557,
                        "end": 570
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 574,
                            "end": 590
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 591,
                                    "end": 602
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 604,
                                        "end": 607
                                    }
                                },
                                "loc": {
                                    "start": 604,
                                    "end": 607
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 591,
                                "end": 607
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 610,
                                "end": 626
                            }
                        },
                        "loc": {
                            "start": 610,
                            "end": 626
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 574,
                        "end": 626
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterPower",
                        "loc": {
                            "start": 630,
                            "end": 640
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 641,
                                    "end": 646
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
                                            "start": 648,
                                            "end": 650
                                        }
                                    },
                                    "loc": {
                                        "start": 648,
                                        "end": 650
                                    }
                                },
                                "loc": {
                                    "start": 648,
                                    "end": 651
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 641,
                                "end": 651
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 653,
                                    "end": 664
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 666,
                                        "end": 669
                                    }
                                },
                                "loc": {
                                    "start": 666,
                                    "end": 669
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 653,
                                "end": 669
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VoterPower",
                            "loc": {
                                "start": 672,
                                "end": 682
                            }
                        },
                        "loc": {
                            "start": 672,
                            "end": 682
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 630,
                        "end": 682
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterPowers",
                        "loc": {
                            "start": 686,
                            "end": 697
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 698,
                                    "end": 704
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
                                                    "start": 707,
                                                    "end": 709
                                                }
                                            },
                                            "loc": {
                                                "start": 707,
                                                "end": 709
                                            }
                                        },
                                        "loc": {
                                            "start": 707,
                                            "end": 710
                                        }
                                    },
                                    "loc": {
                                        "start": 706,
                                        "end": 711
                                    }
                                },
                                "loc": {
                                    "start": 706,
                                    "end": 712
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 698,
                                "end": 712
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 714,
                                    "end": 725
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 727,
                                        "end": 730
                                    }
                                },
                                "loc": {
                                    "start": 727,
                                    "end": 730
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 714,
                                "end": 730
                            }
                        }
                    ],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "VoterPower",
                                "loc": {
                                    "start": 734,
                                    "end": 744
                                }
                            },
                            "loc": {
                                "start": 734,
                                "end": 744
                            }
                        },
                        "loc": {
                            "start": 733,
                            "end": 745
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 686,
                        "end": 745
                    }
                }
            ],
            "loc": {
                "start": 519,
                "end": 748
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Proposal",
                "loc": {
                    "start": 757,
                    "end": 765
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
                            "start": 771,
                            "end": 773
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
                                    "start": 775,
                                    "end": 777
                                }
                            },
                            "loc": {
                                "start": 775,
                                "end": 777
                            }
                        },
                        "loc": {
                            "start": 775,
                            "end": 778
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 771,
                        "end": 778
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingContract",
                        "loc": {
                            "start": 782,
                            "end": 796
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
                                    "start": 798,
                                    "end": 812
                                }
                            },
                            "loc": {
                                "start": 798,
                                "end": 812
                            }
                        },
                        "loc": {
                            "start": 798,
                            "end": 813
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 782,
                        "end": 813
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 817,
                            "end": 831
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "created",
                        "loc": {
                            "start": 835,
                            "end": 842
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 844,
                                "end": 847
                            }
                        },
                        "loc": {
                            "start": 844,
                            "end": 847
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 817,
                        "end": 847
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "description",
                        "loc": {
                            "start": 851,
                            "end": 862
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 864,
                                "end": 870
                            }
                        },
                        "loc": {
                            "start": 864,
                            "end": 870
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 851,
                        "end": 870
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 874,
                            "end": 888
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "expiration",
                        "loc": {
                            "start": 892,
                            "end": 902
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 904,
                                "end": 907
                            }
                        },
                        "loc": {
                            "start": 904,
                            "end": 907
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 874,
                        "end": 907
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isVerified",
                        "loc": {
                            "start": 911,
                            "end": 921
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 923,
                                "end": 930
                            }
                        },
                        "loc": {
                            "start": 923,
                            "end": 930
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 911,
                        "end": 930
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 934,
                            "end": 948
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "lastCall",
                        "loc": {
                            "start": 952,
                            "end": 960
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 962,
                                "end": 965
                            }
                        },
                        "loc": {
                            "start": 962,
                            "end": 965
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 934,
                        "end": 965
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "quorum",
                        "loc": {
                            "start": 969,
                            "end": 975
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 977,
                                "end": 983
                            }
                        },
                        "loc": {
                            "start": 977,
                            "end": 983
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 969,
                        "end": 983
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "title",
                        "loc": {
                            "start": 987,
                            "end": 992
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 994,
                                "end": 1000
                            }
                        },
                        "loc": {
                            "start": 994,
                            "end": 1000
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 987,
                        "end": 1000
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1004,
                            "end": 1018
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "unlock",
                        "loc": {
                            "start": 1022,
                            "end": 1028
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1030,
                                "end": 1033
                            }
                        },
                        "loc": {
                            "start": 1030,
                            "end": 1033
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1004,
                        "end": 1033
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1037,
                            "end": 1041
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1042,
                                    "end": 1047
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
                                            "start": 1049,
                                            "end": 1051
                                        }
                                    },
                                    "loc": {
                                        "start": 1049,
                                        "end": 1051
                                    }
                                },
                                "loc": {
                                    "start": 1049,
                                    "end": 1052
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1042,
                                "end": 1052
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1055,
                                "end": 1059
                            }
                        },
                        "loc": {
                            "start": 1055,
                            "end": 1059
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1037,
                        "end": 1059
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1063,
                            "end": 1068
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1069,
                                    "end": 1075
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
                                                    "start": 1078,
                                                    "end": 1080
                                                }
                                            },
                                            "loc": {
                                                "start": 1078,
                                                "end": 1080
                                            }
                                        },
                                        "loc": {
                                            "start": 1078,
                                            "end": 1081
                                        }
                                    },
                                    "loc": {
                                        "start": 1077,
                                        "end": 1082
                                    }
                                },
                                "loc": {
                                    "start": 1077,
                                    "end": 1083
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1069,
                                "end": 1083
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
                                    "start": 1087,
                                    "end": 1091
                                }
                            },
                            "loc": {
                                "start": 1087,
                                "end": 1091
                            }
                        },
                        "loc": {
                            "start": 1086,
                            "end": 1092
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1063,
                        "end": 1092
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterPower",
                        "loc": {
                            "start": 1096,
                            "end": 1106
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1107,
                                    "end": 1112
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
                                            "start": 1114,
                                            "end": 1116
                                        }
                                    },
                                    "loc": {
                                        "start": 1114,
                                        "end": 1116
                                    }
                                },
                                "loc": {
                                    "start": 1114,
                                    "end": 1117
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1107,
                                "end": 1117
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VoterPower",
                            "loc": {
                                "start": 1120,
                                "end": 1130
                            }
                        },
                        "loc": {
                            "start": 1120,
                            "end": 1130
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1096,
                        "end": 1130
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterPowers",
                        "loc": {
                            "start": 1134,
                            "end": 1145
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1146,
                                    "end": 1152
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
                                                    "start": 1155,
                                                    "end": 1157
                                                }
                                            },
                                            "loc": {
                                                "start": 1155,
                                                "end": 1157
                                            }
                                        },
                                        "loc": {
                                            "start": 1155,
                                            "end": 1158
                                        }
                                    },
                                    "loc": {
                                        "start": 1154,
                                        "end": 1159
                                    }
                                },
                                "loc": {
                                    "start": 1154,
                                    "end": 1160
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1146,
                                "end": 1160
                            }
                        }
                    ],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "VoterPower",
                                "loc": {
                                    "start": 1164,
                                    "end": 1174
                                }
                            },
                            "loc": {
                                "start": 1164,
                                "end": 1174
                            }
                        },
                        "loc": {
                            "start": 1163,
                            "end": 1175
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1134,
                        "end": 1175
                    }
                }
            ],
            "loc": {
                "start": 752,
                "end": 1178
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Vote",
                "loc": {
                    "start": 1187,
                    "end": 1191
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
                            "start": 1197,
                            "end": 1202
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
                                    "start": 1204,
                                    "end": 1206
                                }
                            },
                            "loc": {
                                "start": 1204,
                                "end": 1206
                            }
                        },
                        "loc": {
                            "start": 1204,
                            "end": 1207
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1197,
                        "end": 1207
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "power",
                        "loc": {
                            "start": 1211,
                            "end": 1216
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
                                    "start": 1218,
                                    "end": 1224
                                }
                            },
                            "loc": {
                                "start": 1218,
                                "end": 1224
                            }
                        },
                        "loc": {
                            "start": 1218,
                            "end": 1225
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1211,
                        "end": 1225
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "castBallot",
                        "loc": {
                            "start": 1229,
                            "end": 1239
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Ballot",
                            "loc": {
                                "start": 1241,
                                "end": 1247
                            }
                        },
                        "loc": {
                            "start": 1241,
                            "end": 1247
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1229,
                        "end": 1247
                    }
                }
            ],
            "loc": {
                "start": 1182,
                "end": 1250
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VoterPower",
                "loc": {
                    "start": 1259,
                    "end": 1269
                }
            },
            "interfaces": [],
            "directives": [],
            "fields": [
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "blockNumber",
                        "loc": {
                            "start": 1275,
                            "end": 1286
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
                                    "start": 1288,
                                    "end": 1291
                                }
                            },
                            "loc": {
                                "start": 1288,
                                "end": 1291
                            }
                        },
                        "loc": {
                            "start": 1288,
                            "end": 1292
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1275,
                        "end": 1292
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1296,
                            "end": 1301
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
                                    "start": 1303,
                                    "end": 1309
                                }
                            },
                            "loc": {
                                "start": 1303,
                                "end": 1309
                            }
                        },
                        "loc": {
                            "start": 1303,
                            "end": 1310
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1296,
                        "end": 1310
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 1314,
                            "end": 1319
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
                                    "start": 1321,
                                    "end": 1323
                                }
                            },
                            "loc": {
                                "start": 1321,
                                "end": 1323
                            }
                        },
                        "loc": {
                            "start": 1321,
                            "end": 1324
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1314,
                        "end": 1324
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1328,
                            "end": 1340
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
                                            "start": 1343,
                                            "end": 1354
                                        }
                                    },
                                    "loc": {
                                        "start": 1343,
                                        "end": 1354
                                    }
                                },
                                "loc": {
                                    "start": 1343,
                                    "end": 1355
                                }
                            },
                            "loc": {
                                "start": 1342,
                                "end": 1356
                            }
                        },
                        "loc": {
                            "start": 1342,
                            "end": 1357
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1328,
                        "end": 1357
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isStale",
                        "loc": {
                            "start": 1361,
                            "end": 1368
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1370,
                                "end": 1377
                            }
                        },
                        "loc": {
                            "start": 1370,
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
            "loc": {
                "start": 1254,
                "end": 1380
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "TotalVotingPower",
                "loc": {
                    "start": 1389,
                    "end": 1405
                }
            },
            "interfaces": [],
            "directives": [],
            "fields": [
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "blockNumber",
                        "loc": {
                            "start": 1411,
                            "end": 1422
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
                                    "start": 1424,
                                    "end": 1427
                                }
                            },
                            "loc": {
                                "start": 1424,
                                "end": 1427
                            }
                        },
                        "loc": {
                            "start": 1424,
                            "end": 1428
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1411,
                        "end": 1428
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1432,
                            "end": 1437
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
                                    "start": 1439,
                                    "end": 1445
                                }
                            },
                            "loc": {
                                "start": 1439,
                                "end": 1445
                            }
                        },
                        "loc": {
                            "start": 1439,
                            "end": 1446
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1432,
                        "end": 1446
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1450,
                            "end": 1462
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
                                            "start": 1465,
                                            "end": 1476
                                        }
                                    },
                                    "loc": {
                                        "start": 1465,
                                        "end": 1476
                                    }
                                },
                                "loc": {
                                    "start": 1465,
                                    "end": 1477
                                }
                            },
                            "loc": {
                                "start": 1464,
                                "end": 1478
                            }
                        },
                        "loc": {
                            "start": 1464,
                            "end": 1479
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1450,
                        "end": 1479
                    }
                }
            ],
            "loc": {
                "start": 1384,
                "end": 1482
            }
        },
        {
            "kind": "EnumTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Ballot",
                "loc": {
                    "start": 1491,
                    "end": 1497
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
                            "start": 1503,
                            "end": 1506
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1503,
                        "end": 1506
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "No",
                        "loc": {
                            "start": 1510,
                            "end": 1512
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1510,
                        "end": 1512
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "Abstain",
                        "loc": {
                            "start": 1516,
                            "end": 1523
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1516,
                        "end": 1523
                    }
                }
            ],
            "loc": {
                "start": 1486,
                "end": 1526
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 1526
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
