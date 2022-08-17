var $1RIJT$graphqltoolsschema = require("@graphql-tools/schema");
var $1RIJT$fuzzaldrin = require("fuzzaldrin");
var $1RIJT$elementficounciltokenlist = require("@elementfi/council-tokenlist");
var $1RIJT$etherslibutils = require("ethers/lib/utils");
var $1RIJT$elementfibase = require("@elementfi/base");
var $1RIJT$lrucache = require("lru-cache");
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


function $047baa0fb4e3b4e7$export$472b2ff001c2cfbf(chainId) {
    switch(chainId){
        case (0, $1RIJT$elementficounciltokenlist.mainnetAddressList).chainId:
            return 14496292;
        default:
            return 0;
    }
}


const $4a8cd08cd2c1b1e3$export$24d97b9dae72698 = function() {
    let savedResult;
    const TIME_TO_LIVE = 12000; // 12 seconds
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


function $9f0462f0c4e483f9$export$2c8942c776a655d1(address, dataSources) {
    return dataSources.votingVaults.find((votingVault)=>votingVault.address === address);
}
function $9f0462f0c4e483f9$export$8f465fcd5ae4b18c(address, dataSources) {
    return dataSources.votingContracts.find((votingContract)=>votingContract.address === address);
}


const $f4cc89849402d44b$var$EXECUTED_PROPOSAL_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
const $f4cc89849402d44b$export$b327309c2fad1272 = {
    async getByIds ({ ids: ids , votingContract: votingContract , context: context  }) {
        const allProposals = await this.getByVotingContract({
            votingContract: votingContract,
            context: context
        });
        return ids.map((id)=>allProposals.find((proposal)=>proposal.id === id));
    },
    async getById ({ id: id , votingContract: votingContract , context: context  }) {
        const proposals = await this.getByIds({
            ids: [
                id
            ],
            votingContract: votingContract,
            context: context
        });
        return proposals[0];
    },
    async getByVotingContract ({ votingContract: votingContract , context: context  }) {
        const dataSource = (0, $9f0462f0c4e483f9$export$8f465fcd5ae4b18c)(votingContract.address, context.councilDataSources);
        if (!dataSource) return [];
        const latestBlock = await (0, $4a8cd08cd2c1b1e3$export$24d97b9dae72698)(context.provider);
        const args = await dataSource.getProposalCreatedEventArgs((0, $047baa0fb4e3b4e7$export$472b2ff001c2cfbf)(context.chainId));
        return args.map(({ created: created , execution: execution , expiration: expiration , proposalId: proposalId  })=>{
            return {
                id: proposalId,
                votingContract: votingContract,
                created: created,
                expiration: expiration,
                unlock: execution,
                isActive: expiration >= latestBlock
            };
        });
    },
    async getIsExecuted ({ proposal: proposal , context: context  }) {
        const { proposalHash: proposalHash  } = await $f4cc89849402d44b$var$getByIdFromDataSource(proposal, context);
        return proposalHash === $f4cc89849402d44b$var$EXECUTED_PROPOSAL_HASH;
    },
    async getLastCall ({ proposal: proposal , context: context  }) {
        const { proposalHash: proposalHash , lastCall: lastCall  } = await $f4cc89849402d44b$var$getByIdFromDataSource(proposal, context);
        if (proposalHash !== $f4cc89849402d44b$var$EXECUTED_PROPOSAL_HASH) return lastCall;
    },
    async getQuorum ({ proposal: proposal , context: context  }) {
        const { proposalHash: proposalHash , quorum: quorum  } = await $f4cc89849402d44b$var$getByIdFromDataSource(proposal, context);
        if (proposalHash !== $f4cc89849402d44b$var$EXECUTED_PROPOSAL_HASH) return quorum;
    }
};
// TODO: Remove type casting
function $f4cc89849402d44b$var$getByIdFromDataSource(proposal, context) {
    const dataSource = (0, $9f0462f0c4e483f9$export$8f465fcd5ae4b18c)(proposal.votingContract.address, context.councilDataSources);
    return dataSource.getProposalById(proposal.id);
}






// TODO: Should this come from method arguments as `excludeAddresses`?
const $fd6ceb4db45efc28$var$nonVoters = [
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000001", 
];
const $fd6ceb4db45efc28$export$40a03fbff71f56d3 = {
    async getByVotingVault ({ votingVault: votingVault , blockNumber: blockNumber , context: context  }) {
        const { chainId: chainId , councilDataSources: councilDataSources , provider: provider  } = context;
        let total = BigInt(0);
        blockNumber = blockNumber || await (0, $4a8cd08cd2c1b1e3$export$24d97b9dae72698)(provider);
        const dataSource = (0, $9f0462f0c4e483f9$export$2c8942c776a655d1)(votingVault.address, councilDataSources);
        if (dataSource) {
            const allVotersWithPower = await dataSource.getAllVotersWithPower((0, $047baa0fb4e3b4e7$export$472b2ff001c2cfbf)(chainId), blockNumber);
            for (const { voter: voter , power: power  } of allVotersWithPower)if (!$fd6ceb4db45efc28$var$nonVoters.includes(voter)) total += BigInt(power);
        }
        return {
            blockNumber: blockNumber,
            value: (0, $1RIJT$etherslibutils.formatEther)(total),
            votingVaults: [
                votingVault
            ]
        };
    },
    async getByVotingVaults ({ votingVaults: votingVaults , blockNumber: blockNumber , context: context  }) {
        blockNumber = blockNumber || await (0, $4a8cd08cd2c1b1e3$export$24d97b9dae72698)(context.provider);
        let aggregateValue = BigInt(0);
        await Promise.all(votingVaults.map(async (votingVault)=>{
            const { value: value  } = await this.getByVotingVault({
                votingVault: votingVault,
                blockNumber: blockNumber,
                context: context
            });
            aggregateValue += (0, $1RIJT$etherslibutils.parseEther)(value).toBigInt();
        }));
        return {
            blockNumber: blockNumber,
            value: (0, $1RIJT$etherslibutils.formatEther)(aggregateValue),
            votingVaults: votingVaults
        };
    }
};






const $6e80fa9dbf1dc463$export$1dbe110119cb4dd2 = {
    getAll ({ context: context  }) {
        return context.councilDataSources.votingVaults.map(({ address: address  })=>this.getByAddress({
                address: address,
                context: context
            }));
    },
    getByAddress ({ address: address  }) {
        return {
            address: address
        };
    },
    getByAddresses ({ addresses: addresses  }) {
        return addresses.map((address)=>({
                address: address
            }));
    }
};




const $ececcc37bb5e5066$var$cache = new (0, ($parcel$interopDefault($1RIJT$lrucache)))({
    max: 500
});
const $ececcc37bb5e5066$export$e424928527fab42f = {
    getAll ({ context: context  }) {
        const votingVaults = (0, $6e80fa9dbf1dc463$export$1dbe110119cb4dd2).getAll({
            context: context
        });
        return this.getByVotingVaults({
            votingVaults: votingVaults,
            context: context
        });
    },
    async getBalance ({ voter: voter , votingVaults: votingVaults , context: context  }) {
        let balance = BigInt(0);
        for (const votingVault of votingVaults){
            const dataSource = (0, $9f0462f0c4e483f9$export$2c8942c776a655d1)(votingVault.address, context.councilDataSources);
            if (dataSource) {
                const vaultBalance = await dataSource.getBalance(voter.address);
                balance += BigInt(vaultBalance);
            }
        }
        return (0, $1RIJT$etherslibutils.formatEther)(balance);
    },
    getByAddress ({ address: address  }) {
        return {
            address: address
        };
    },
    getByAddresses ({ addresses: addresses  }) {
        return addresses.map((address)=>this.getByAddress({
                address: address
            }));
    },
    getByVotingVault ({ votingVault: votingVault , blockNumber: blockNumber , context: context  }) {
        return this.getByVotingVaults({
            votingVaults: [
                votingVault
            ],
            blockNumber: blockNumber,
            context: context
        });
    },
    async getByVotingVaults ({ votingVaults: votingVaults , blockNumber: blockNumber , context: { councilDataSources: councilDataSources  } ,  }) {
        const addresses = new Set();
        for (const votingVault of votingVaults){
            const dataSource = (0, $9f0462f0c4e483f9$export$2c8942c776a655d1)(votingVault.address, councilDataSources);
            if (dataSource) {
                const allVotersWithPower = await dataSource.getAllVotersWithPower(undefined, blockNumber);
                for (const { voter: voter  } of allVotersWithPower)addresses.add(voter);
            }
        }
        return this.getByAddresses({
            addresses: Array.from(addresses)
        });
    },
    async getEnsName ({ voter: voter , context: context  }) {
        console.log("getting ens name: ", voter.address);
        return (0, $1RIJT$elementfibase.cached)({
            cache: $ececcc37bb5e5066$var$cache,
            cacheKey: (0, $1RIJT$elementfibase.getCacheKey)("getEnsName", [
                voter.address
            ]),
            callback: ()=>{
                console.log("cache missed");
                return context.provider.lookupAddress(voter.address);
            }
        });
    }
};


const $595d620d278c7376$export$81fb29a3b5045c76 = {
    async getByVoter ({ voter: voter , proposal: proposal , context: { councilDataSources: councilDataSources  }  }) {
        const { id: id , votingContract: votingContract  } = proposal;
        const dataSource = (0, $9f0462f0c4e483f9$export$8f465fcd5ae4b18c)(votingContract.address, councilDataSources);
        if (!dataSource) return;
        const { votingPower: votingPower , castBallot: castBallot  } = await dataSource.getVote(voter.address, id);
        return {
            voter: voter,
            proposal: proposal,
            power: (0, $1RIJT$etherslibutils.formatEther)(votingPower),
            castBallot: BigInt(votingPower) > 0 ? [
                "Yes",
                "No",
                "Abstain"
            ][castBallot] : null
        };
    },
    getByVoters ({ voters: voters , proposal: proposal , context: context  }) {
        return Promise.all(voters.map((voter)=>this.getByVoter({
                voter: voter,
                proposal: proposal,
                context: context
            })));
    },
    async getByProposal ({ proposal: proposal , context: context  }) {
        const voters = await (0, $ececcc37bb5e5066$export$e424928527fab42f).getByVotingVaults({
            votingVaults: proposal.votingContract.votingVaults,
            context: context
        });
        return this.getByVoters({
            voters: voters,
            proposal: proposal,
            context: context
        });
    }
};




const $3fe308f3d3007ea8$export$4c0b87851cbe4e3f = {
    getAll ({ context: context  }) {
        return context.councilDataSources.votingContracts.map(({ address: address  })=>this.getByAddress({
                address: address,
                context: context
            }));
    },
    getByAddress ({ address: address1 , context: context  }) {
        const dataSource = (0, $9f0462f0c4e483f9$export$8f465fcd5ae4b18c)(address1, context.councilDataSources);
        if (dataSource) return {
            address: dataSource.address,
            votingVaults: dataSource.votingVaults.map(({ address: address  })=>({
                    address: address
                }))
        };
    }
};





const $7f716b31368ced62$export$a0cbbdeeb12308cd = {
    async getByVoter ({ voter: voter , blockNumber: blockNumber , votingVaults: votingVaults , context: { councilDataSources: councilDataSources , provider: provider  } ,  }) {
        blockNumber = blockNumber || await (0, $4a8cd08cd2c1b1e3$export$24d97b9dae72698)(provider);
        let aggregateValue = BigInt(0);
        for (const { address: address  } of votingVaults){
            const dataSource = (0, $9f0462f0c4e483f9$export$2c8942c776a655d1)(address, councilDataSources);
            if (dataSource) {
                const vaultPower = await dataSource.getVotingPowerView(voter.address, blockNumber);
                aggregateValue += BigInt(vaultPower);
            }
        }
        return {
            value: (0, $1RIJT$etherslibutils.formatEther)(aggregateValue),
            voter: voter,
            votingVaults: votingVaults,
            blockNumber: blockNumber
        };
    },
    getByVoters ({ voters: voters , votingVaults: votingVaults , blockNumber: blockNumber , context: context  }) {
        return Promise.all(voters.map((voter)=>this.getByVoter({
                voter: voter,
                votingVaults: votingVaults,
                blockNumber: blockNumber,
                context: context
            })));
    },
    async getIsStale ({ votingPower: { value: value , voter: voter , votingVaults: votingVaults , blockNumber: blockNumber  } , context: { councilDataSources: councilDataSources , provider: provider  } ,  }) {
        const latestBlock = await (0, $4a8cd08cd2c1b1e3$export$24d97b9dae72698)(provider);
        if (blockNumber === latestBlock) return false;
        else {
            let isStale;
            for (const { address: address  } of votingVaults){
                const dataSource = (0, $9f0462f0c4e483f9$export$2c8942c776a655d1)(address, councilDataSources);
                if (dataSource) {
                    const valueAtBlock = await dataSource?.getVotingPower(voter.address, blockNumber);
                    if (!Number(valueAtBlock) && Number(value) > 0) return true;
                    else isStale = false;
                }
            }
            return isStale;
        }
    }
};




const $76cfde035e4f639b$export$f62412552be5daf2 = {
    Query: {
        votingContract: (_, { address: address  }, context)=>{
            return (0, $3fe308f3d3007ea8$export$4c0b87851cbe4e3f).getByAddress({
                address: address,
                context: context
            }) || null;
        },
        votingContracts: (_, { addresses: addresses  }, context)=>{
            // Get all the votingContracts by default if no addresses arg is provided
            if (!addresses) return (0, $3fe308f3d3007ea8$export$4c0b87851cbe4e3f).getAll({
                context: context
            }).map((votingContract)=>votingContract || null);
            // TODO: VotingContractModel.getByAddresses
            return addresses.map((address)=>(0, $3fe308f3d3007ea8$export$4c0b87851cbe4e3f).getByAddress({
                    address: address,
                    context: context
                }) || null);
        },
        votingVaults: (_, { addresses: addresses  }, context)=>{
            // Get all the votingVaults by default if no addresses arg is provided
            if (!addresses) return (0, $6e80fa9dbf1dc463$export$1dbe110119cb4dd2).getAll({
                context: context
            }).map((votingVault)=>votingVault || null);
            // TODO: VotingVaultModel.getByAddresses
            return addresses.map((address)=>(0, $6e80fa9dbf1dc463$export$1dbe110119cb4dd2).getByAddress({
                    address: address,
                    context: context
                }) || null);
        },
        votingVault: (_, { address: address  }, context)=>{
            const result = (0, $6e80fa9dbf1dc463$export$1dbe110119cb4dd2).getByAddress({
                address: address,
                context: context
            }) || null;
            return result;
        },
        voter: (_, { address: address  })=>{
            return (0, $ececcc37bb5e5066$export$e424928527fab42f).getByAddress({
                address: address
            });
        },
        voters: async (_, { addresses: addresses , search: search  }, context)=>{
            let voters = [];
            if (addresses) voters = await (0, $ececcc37bb5e5066$export$e424928527fab42f).getByAddresses({
                addresses: addresses
            });
            else voters = await (0, $ececcc37bb5e5066$export$e424928527fab42f).getAll({
                context: context
            });
            if (search) {
                const candidates = [];
                voters = await Promise.all(voters.map(async (voter)=>{
                    if (!voter) return null;
                    candidates.push(voter.address);
                    const ensName = await (0, $ececcc37bb5e5066$export$e424928527fab42f).getEnsName({
                        voter: voter,
                        context: context
                    });
                    if (ensName) candidates.push(ensName);
                    return {
                        ...voter,
                        ensName: ensName
                    };
                }));
                const matches = (0, $1RIJT$fuzzaldrin.filter)(candidates, search);
                voters = voters.filter((voter)=>voter ? matches.includes(voter.address) || matches.includes(voter.ensName || "") : false);
            }
            return voters.map((voter)=>voter || null);
        }
    },
    VotingContract: {
        balance: async (votingContract, { voter: voterAddress  }, context)=>{
            const voter = (0, $ececcc37bb5e5066$export$e424928527fab42f).getByAddress({
                address: voterAddress
            });
            const balance = await (0, $ececcc37bb5e5066$export$e424928527fab42f).getBalance({
                voter: voter,
                votingVaults: votingContract.votingVaults,
                context: context
            });
            return balance || null;
        },
        proposal: async (votingContract, { id: id  }, context)=>{
            const proposal = await (0, $f4cc89849402d44b$export$b327309c2fad1272).getById({
                id: id,
                votingContract: votingContract,
                context: context
            });
            return proposal || null;
        },
        proposals: async (votingContract, { ids: ids , isActive: isActive  }, context)=>{
            let proposals = [];
            if (ids) proposals = await (0, $f4cc89849402d44b$export$b327309c2fad1272).getByIds({
                ids: ids,
                votingContract: votingContract,
                context: context
            });
            else proposals = await (0, $f4cc89849402d44b$export$b327309c2fad1272).getByVotingContract({
                votingContract: votingContract,
                context: context
            });
            if (typeof isActive !== "undefined") proposals = proposals.filter((proposal)=>proposal?.isActive === isActive);
            return proposals.map((proposal)=>proposal || null);
        },
        proposalCount: async (votingContract, { isActive: isActive  }, context)=>{
            const allProposals = await (0, $f4cc89849402d44b$export$b327309c2fad1272).getByVotingContract({
                votingContract: votingContract,
                context: context
            });
            if (typeof isActive !== "undefined") return allProposals.filter((proposal)=>proposal.isActive === isActive).length;
            return allProposals.length;
        },
        totalVotingPower: ({ votingVaults: votingVaults  }, { blockNumber: blockNumber  }, context)=>{
            return (0, $fd6ceb4db45efc28$export$40a03fbff71f56d3).getByVotingVaults({
                votingVaults: votingVaults,
                blockNumber: blockNumber,
                context: context
            });
        },
        voters: ({ votingVaults: votingVaults  }, _, context)=>{
            return (0, $ececcc37bb5e5066$export$e424928527fab42f).getByVotingVaults({
                votingVaults: votingVaults,
                context: context
            });
        },
        voterCount: async ({ votingVaults: votingVaults  }, _, context)=>{
            const allVoters = await (0, $ececcc37bb5e5066$export$e424928527fab42f).getByVotingVaults({
                votingVaults: votingVaults,
                context: context
            });
            return allVoters.length;
        },
        votingPower: ({ votingVaults: votingVaults  }, { voter: voter , blockNumber: blockNumber  }, context)=>{
            return (0, $7f716b31368ced62$export$a0cbbdeeb12308cd).getByVoter({
                voter: (0, $ececcc37bb5e5066$export$e424928527fab42f).getByAddress({
                    address: voter
                }),
                votingVaults: votingVaults,
                blockNumber: blockNumber,
                context: context
            });
        },
        votingPowers: async ({ votingVaults: votingVaults  }, { voters: addresses , blockNumber: blockNumber  }, context)=>{
            const voters = addresses ? (0, $ececcc37bb5e5066$export$e424928527fab42f).getByAddresses({
                addresses: addresses
            }) : await (0, $ececcc37bb5e5066$export$e424928527fab42f).getByVotingVaults({
                votingVaults: votingVaults,
                context: context
            });
            return (0, $7f716b31368ced62$export$a0cbbdeeb12308cd).getByVoters({
                voters: voters,
                votingVaults: votingVaults,
                blockNumber: blockNumber,
                context: context
            });
        }
    },
    VotingVault: {
        balance: async (votingVault, { voter: voterAddress  }, context)=>{
            const voter = (0, $ececcc37bb5e5066$export$e424928527fab42f).getByAddress({
                address: voterAddress
            });
            const balance = await (0, $ececcc37bb5e5066$export$e424928527fab42f).getBalance({
                voter: voter,
                votingVaults: [
                    votingVault
                ],
                context: context
            });
            return balance || null;
        },
        totalVotingPower: (votingVault, { blockNumber: blockNumber  }, context)=>{
            return (0, $fd6ceb4db45efc28$export$40a03fbff71f56d3).getByVotingVault({
                votingVault: votingVault,
                blockNumber: blockNumber,
                context: context
            });
        },
        voters: (votingVault, _, context)=>{
            return (0, $ececcc37bb5e5066$export$e424928527fab42f).getByVotingVault({
                votingVault: votingVault,
                context: context
            });
        },
        voterCount: async (votingVault, _, context)=>{
            const allVoters = await (0, $ececcc37bb5e5066$export$e424928527fab42f).getByVotingVault({
                votingVault: votingVault,
                context: context
            });
            return allVoters.length;
        },
        votingPower: (votingVault, { voter: address , blockNumber: blockNumber  }, context)=>{
            const voter = (0, $ececcc37bb5e5066$export$e424928527fab42f).getByAddress({
                address: address
            });
            return (0, $7f716b31368ced62$export$a0cbbdeeb12308cd).getByVoter({
                voter: voter,
                votingVaults: [
                    votingVault
                ],
                blockNumber: blockNumber,
                context: context
            });
        },
        votingPowers: async (votingVault, { voters: addresses , blockNumber: blockNumber  }, context)=>{
            const voters = addresses ? (0, $ececcc37bb5e5066$export$e424928527fab42f).getByAddresses({
                addresses: addresses
            }) : await (0, $ececcc37bb5e5066$export$e424928527fab42f).getByVotingVault({
                votingVault: votingVault,
                context: context
            });
            return (0, $7f716b31368ced62$export$a0cbbdeeb12308cd).getByVoters({
                voters: voters,
                votingVaults: [
                    votingVault
                ],
                blockNumber: blockNumber,
                context: context
            });
        }
    },
    Proposal: {
        isExecuted: (proposal, _, context)=>{
            return (0, $f4cc89849402d44b$export$b327309c2fad1272).getIsExecuted({
                proposal: proposal,
                context: context
            });
        },
        lastCall: async (proposal, _, context)=>{
            return await (0, $f4cc89849402d44b$export$b327309c2fad1272).getLastCall({
                proposal: proposal,
                context: context
            }) || null;
        },
        quorum: async (proposal, _, context)=>{
            return await (0, $f4cc89849402d44b$export$b327309c2fad1272).getQuorum({
                proposal: proposal,
                context: context
            }) || null;
        },
        vote: async (proposal, { voter: address  }, context)=>{
            const voter = (0, $ececcc37bb5e5066$export$e424928527fab42f).getByAddress({
                address: address
            });
            const vote = await (0, $595d620d278c7376$export$81fb29a3b5045c76).getByVoter({
                voter: voter,
                proposal: proposal,
                context: context
            });
            return vote || null;
        },
        voters: ({ created: created , votingContract: votingContract  }, _, context)=>{
            return (0, $ececcc37bb5e5066$export$e424928527fab42f).getByVotingVaults({
                votingVaults: votingContract.votingVaults,
                blockNumber: created,
                context: context
            });
        },
        voterCount: async ({ votingContract: votingContract  }, _, context)=>{
            const allVoters = await (0, $ececcc37bb5e5066$export$e424928527fab42f).getByVotingVaults({
                votingVaults: votingContract.votingVaults,
                context: context
            });
            return allVoters.length;
        },
        votes: async (proposal, { voters: addresses  }, context)=>{
            let votes;
            if (addresses) {
                const voters = (0, $ececcc37bb5e5066$export$e424928527fab42f).getByAddresses({
                    addresses: addresses
                });
                votes = await (0, $595d620d278c7376$export$81fb29a3b5045c76).getByVoters({
                    voters: voters,
                    proposal: proposal,
                    context: context
                });
            } else votes = await (0, $595d620d278c7376$export$81fb29a3b5045c76).getByProposal({
                proposal: proposal,
                context: context
            });
            return votes.map((vote)=>vote || null);
        },
        votingPower: ({ votingContract: votingContract , created: created  }, { voter: address  }, context)=>{
            const voter = (0, $ececcc37bb5e5066$export$e424928527fab42f).getByAddress({
                address: address
            });
            return (0, $7f716b31368ced62$export$a0cbbdeeb12308cd).getByVoter({
                voter: voter,
                votingVaults: votingContract.votingVaults,
                blockNumber: created,
                context: context
            });
        },
        votingPowers: async ({ votingContract: votingContract , created: created  }, { voters: addresses  }, context)=>{
            const { votingVaults: votingVaults  } = votingContract;
            const voters = addresses ? (0, $ececcc37bb5e5066$export$e424928527fab42f).getByAddresses({
                addresses: addresses
            }) : await (0, $ececcc37bb5e5066$export$e424928527fab42f).getByVotingVaults({
                votingVaults: votingVaults,
                context: context
            });
            return (0, $7f716b31368ced62$export$a0cbbdeeb12308cd).getByVoters({
                voters: voters,
                votingVaults: votingVaults,
                blockNumber: created,
                context: context
            });
        }
    },
    VotingPower: {
        isStale: async (votingPower, _, context)=>{
            return await (0, $7f716b31368ced62$export$a0cbbdeeb12308cd).getIsStale({
                votingPower: votingPower,
                context: context
            }) || null;
        }
    },
    Voter: {
        balance: async (voter, { votingVault: votingVaultAddress  }, context)=>{
            const votingVault = (0, $6e80fa9dbf1dc463$export$1dbe110119cb4dd2).getByAddress({
                address: votingVaultAddress,
                context: context
            });
            if (!votingVault) return null;
            const balance = await (0, $ececcc37bb5e5066$export$e424928527fab42f).getBalance({
                voter: voter,
                votingVaults: [
                    votingVault
                ],
                context: context
            });
            return balance || null;
        },
        balances: async (voter, { votingVaults: votingVaultAddresses  }, context)=>{
            const votingVaults = (0, $6e80fa9dbf1dc463$export$1dbe110119cb4dd2).getByAddresses({
                addresses: votingVaultAddresses,
                context: context
            });
            const balances = [];
            for (const votingVault of votingVaults){
                let balance = null;
                if (votingVault) balance = await (0, $ececcc37bb5e5066$export$e424928527fab42f).getBalance({
                    voter: voter,
                    votingVaults: [
                        votingVault
                    ],
                    context: context
                });
                balances.push(balance || null);
            }
            return balances;
        },
        ensName: (voter, _, context)=>{
            return (0, $ececcc37bb5e5066$export$e424928527fab42f).getEnsName({
                voter: voter,
                context: context
            });
        },
        vote: async (voter, { proposal: id , votingContract: address  }, context)=>{
            const votingContract = (0, $3fe308f3d3007ea8$export$4c0b87851cbe4e3f).getByAddress({
                address: address,
                context: context
            });
            if (!votingContract) return null;
            const proposal = await (0, $f4cc89849402d44b$export$b327309c2fad1272).getById({
                id: id,
                votingContract: votingContract,
                context: context
            });
            if (!proposal) return null;
            const vote = await (0, $595d620d278c7376$export$81fb29a3b5045c76).getByVoter({
                voter: voter,
                proposal: proposal,
                context: context
            });
            return vote || null;
        },
        votes: async (voter, { proposals: ids , votingContract: address  }, context)=>{
            const votingContract = (0, $3fe308f3d3007ea8$export$4c0b87851cbe4e3f).getByAddress({
                address: address,
                context: context
            });
            if (!votingContract) return null;
            const proposals = await (0, $f4cc89849402d44b$export$b327309c2fad1272).getByIds({
                ids: ids,
                votingContract: votingContract,
                context: context
            });
            const votes = proposals.map(async (proposal)=>{
                if (!proposal) return null;
                const vote = await (0, $595d620d278c7376$export$81fb29a3b5045c76).getByVoter({
                    voter: voter,
                    proposal: proposal,
                    context: context
                });
                return vote || null;
            });
            return Promise.all(votes);
        },
        votingPower: (voter, { votingVault: votingVaultAddress , blockNumber: blockNumber  }, context)=>{
            const votingVault = (0, $6e80fa9dbf1dc463$export$1dbe110119cb4dd2).getByAddress({
                address: votingVaultAddress,
                context: context
            });
            if (!votingVault) return null;
            return (0, $7f716b31368ced62$export$a0cbbdeeb12308cd).getByVoter({
                voter: voter,
                votingVaults: [
                    votingVault
                ],
                blockNumber: blockNumber,
                context: context
            });
        },
        votingPowers: (voter, { votingVaults: votingVaultAddresses , blockNumber: blockNumber  }, context)=>{
            const votingVaults = (0, $6e80fa9dbf1dc463$export$1dbe110119cb4dd2).getByAddresses({
                addresses: votingVaultAddresses,
                context: context
            });
            return votingVaults.map((votingVault)=>{
                return votingVault ? (0, $7f716b31368ced62$export$a0cbbdeeb12308cd).getByVoter({
                    voter: voter,
                    votingVaults: [
                        votingVault
                    ],
                    blockNumber: blockNumber,
                    context: context
                }) : null;
            });
        }
    }
};




const $a40966fa5fbf0fb2$export$a8fd08e8b7cfacd3 = {
    ...(0, $1RIJT$elementficounciltokenlist.mainnetAddressList),
    chainId: (0, $1RIJT$elementfibase.ChainId).LOCAL
};
const $a40966fa5fbf0fb2$export$578de1f6b0e6a3e9 = {
    chainId: (0, $1RIJT$elementfibase.ChainId).LOCAL,
    addresses: {
        airdrop: "0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",
        coreVoting: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        discordTier1Airdrop: "0x0000000000000000000000000000000000000000",
        discordTier2Airdrop: "0x0000000000000000000000000000000000000000",
        discordTier3Airdrop: "0x0000000000000000000000000000000000000000",
        elementToken: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        githubTier1Airdrop: "0x0000000000000000000000000000000000000000",
        githubTier2Airdrop: "0x0000000000000000000000000000000000000000",
        githubTier3Airdrop: "0x0000000000000000000000000000000000000000",
        gscCoreVoting: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
        gscVault: "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6",
        lockingVault: "0x610178dA211FEF7D417bC0e6FeD39F05609AD788",
        optimisticGrants: "0x0000000000000000000000000000000000000000",
        optimisticRewardsVault: "0x0000000000000000000000000000000000000000",
        spender: "0x0B306BF915C4d645ff596e518fAf3F9669b97016",
        timeLock: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
        treasury: "0x9A676e781A523b5d0C0e43731313A708CB607508",
        vestingVault: "0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e"
    }
};
const $a40966fa5fbf0fb2$export$c9b69c213f456a9c = {
    addresses: {
        airdrop: "0x0BDb999cFA9c47d6d62323a1905F8Eb7B3c9B119",
        coreVoting: "0xFDFEF9D10d929cB3905C71400ce6be1990EA0F34",
        discordTier1Airdrop: "0x0000000000000000000000000000000000000000",
        discordTier2Airdrop: "0x0000000000000000000000000000000000000000",
        discordTier3Airdrop: "0x0000000000000000000000000000000000000000",
        elementToken: "0xA193E42526F1FEA8C99AF609dcEabf30C1c29fAA",
        githubTier1Airdrop: "0x0000000000000000000000000000000000000000",
        githubTier2Airdrop: "0x0000000000000000000000000000000000000000",
        githubTier3Airdrop: "0x0000000000000000000000000000000000000000",
        gscCoreVoting: "0xFf807885934003A35b1284d7445fc83Fd23417e5",
        gscVault: "0x84e924C5E04438D2c1Df1A981f7E7104952e6de1",
        lockingVault: "0x4E0597863fA1AA7B6b95a887AD9fEee038815642",
        optimisticGrants: "0x0000000000000000000000000000000000000000",
        optimisticRewardsVault: "0x0000000000000000000000000000000000000000",
        spender: "0x0000000000000000000000000000000000000000",
        timeLock: "0xdCCc660F92826649754E357b11bd41C31C0609B9",
        treasury: "0x6f2fa37EBfaf089C4Fd7e6124C1028306943D11d",
        vestingVault: "0x2061701b22095418514C0D4a28366C54B1464C17"
    },
    chainId: (0, $1RIJT$elementfibase.ChainId).LOCAL
};
function $a40966fa5fbf0fb2$export$735f3e625be6eff7(chainId) {
    switch(chainId){
        case (0, $1RIJT$elementficounciltokenlist.mainnetAddressList).chainId:
            return 0, $1RIJT$elementficounciltokenlist.mainnetAddressList;
        case (0, $1RIJT$elementficounciltokenlist.goerliAddressList).chainId:
            return 0, $1RIJT$elementficounciltokenlist.goerliAddressList;
        case (0, $1RIJT$elementfibase.ChainId).LOCAL:
            return $a40966fa5fbf0fb2$var$getLocalhostAddressList();
        default:
            return $a40966fa5fbf0fb2$var$getEnvAddressList();
    }
}
function $a40966fa5fbf0fb2$var$getEnvAddressList() {
    switch(undefined){
        case "goerli":
            return 0, $1RIJT$elementficounciltokenlist.goerliAddressList;
        case "mainnet":
            return 0, $1RIJT$elementficounciltokenlist.mainnetAddressList;
        default:
            return $a40966fa5fbf0fb2$var$getLocalhostAddressList();
    }
}
function $a40966fa5fbf0fb2$var$getLocalhostAddressList() {
    switch(undefined){
        case "mainnet-fork":
            return $a40966fa5fbf0fb2$export$a8fd08e8b7cfacd3;
        case "testnet":
        default:
            return $a40966fa5fbf0fb2$export$578de1f6b0e6a3e9;
    }
}





class $41844f56d22dc55e$export$ca33481ae8bfff02 {
    constructor(address, provider, votingVaults){
        this.address = address;
        this.contract = (0, $1RIJT$elementficounciltypechain.CoreVoting__factory).connect(address, provider);
        this.votingVaults = votingVaults || [];
        this.cache = new (0, ($parcel$interopDefault($1RIJT$lrucache)))({
            max: 500
        });
    }
    async getProposalCreatedEventArgs(fromBlock, toBlock) {
        return (0, $1RIJT$elementfibase.cached)({
            cache: this.cache,
            cacheKey: (0, $1RIJT$elementfibase.getCacheKey)("getProposalCreatedEventArgs", [
                fromBlock,
                toBlock, 
            ]),
            callback: async ()=>{
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
        });
    }
    async getProposalById(id) {
        return (0, $1RIJT$elementfibase.cached)({
            cache: this.cache,
            cacheKey: (0, $1RIJT$elementfibase.getCacheKey)("getProposalById", [
                id
            ]),
            callback: async ()=>{
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
        });
    }
    async getVote(voter, proposalId) {
        return (0, $1RIJT$elementfibase.cached)({
            cache: this.cache,
            cacheKey: (0, $1RIJT$elementfibase.getCacheKey)("getVote", [
                voter,
                proposalId
            ]),
            callback: async ()=>{
                const { votingPower: votingPower , castBallot: castBallot  } = await this.contract.functions.votes(voter, proposalId);
                return {
                    votingPower: votingPower.toString(),
                    castBallot: castBallot
                };
            }
        });
    }
}








class $a0cf45371a696709$export$2b7e06d96cf7f075 {
    constructor(address, contract, cache){
        this.address = address;
        this.contract = contract;
        this.cache = cache;
    }
    async getBalance(voter) {
        return "0";
    }
    async getVotingPower(voter, blockNumber) {
        return (0, $1RIJT$elementfibase.cached)({
            cache: this.cache,
            cacheKey: (0, $1RIJT$elementfibase.getCacheKey)("getVotingPower", [
                voter,
                blockNumber
            ]),
            callback: async ()=>{
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
                } catch (error) {}
                return "0";
            }
        });
    }
    getVotingPowerView(voter, blockNumber) {
        return this.getVotingPower(voter, blockNumber);
    }
    async getAllVotersWithPower() {
        return [];
    }
}


class $492df70f1218e6f0$export$e2e4dee807f6af7a extends (0, $a0cf45371a696709$export$2b7e06d96cf7f075) {
    constructor(address, provider){
        const contract = (0, $1RIJT$elementficounciltypechain.GSCVault__factory).connect(address, provider);
        const cache = new (0, ($parcel$interopDefault($1RIJT$lrucache)))({
            max: 500
        });
        super(address, contract, cache);
        this.contract = contract;
        this.cache = cache;
    }
    async getAllVotersWithPower(fromBlock, toBlock) {
        return (0, $1RIJT$elementfibase.cached)({
            cache: this.cache,
            cacheKey: (0, $1RIJT$elementfibase.getCacheKey)("getAllVotersWithPower", [
                fromBlock,
                toBlock
            ]),
            callback: async ()=>{
                const latestJoinTimestampByMember = {};
                const joinEvents = await this.contract.queryFilter(this.contract.filters.MembershipProved(), fromBlock, toBlock);
                for (const { args: args  } of joinEvents){
                    const { who: who , when: when  } = args;
                    if (!latestJoinTimestampByMember[who] || when.gt(latestJoinTimestampByMember[who])) latestJoinTimestampByMember[who] = when;
                }
                const kickEvents = await this.contract.queryFilter(this.contract.filters.Kicked(), fromBlock, toBlock);
                for (const { args: args1  } of kickEvents){
                    const { who: who , when: when  } = args1;
                    if (latestJoinTimestampByMember[who] && when.gt(latestJoinTimestampByMember[who])) // if they were kicked after their latest join timestamp, remove them
                    // from the record.
                    delete latestJoinTimestampByMember[who];
                }
                return Object.keys(latestJoinTimestampByMember).map((voter)=>({
                        voter: voter,
                        power: "1"
                    }));
            }
        });
    }
}








class $a1c706d406f5708a$export$93f46c2abf3fc254 extends (0, $a0cf45371a696709$export$2b7e06d96cf7f075) {
    constructor(address, provider){
        const contract = (0, $1RIJT$elementficounciltypechain.LockingVault__factory).connect(address, provider);
        const cache = new (0, ($parcel$interopDefault($1RIJT$lrucache)))({
            max: 500
        });
        super(address, contract, cache);
        this.contract = contract;
        this.cache = cache;
    }
    async getBalance(voter) {
        return (0, $1RIJT$elementfibase.cached)({
            cache: this.cache,
            cacheKey: (0, $1RIJT$elementfibase.getCacheKey)("getBalance", [
                voter
            ]),
            callback: async ()=>{
                const [, balance] = await this.contract.functions.deposits(voter);
                return balance.toString();
            }
        });
    }
    async getVotingPowerView(voter, blockNumber) {
        return (0, $1RIJT$elementfibase.cached)({
            cache: this.cache,
            cacheKey: (0, $1RIJT$elementfibase.getCacheKey)("getVotingPowerView", [
                voter,
                blockNumber
            ]),
            callback: async ()=>{
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
                } catch (error) {
                    return "0";
                }
            }
        });
    }
    async getAllVotersWithPower(fromBlock, toBlock) {
        return (0, $1RIJT$elementfibase.cached)({
            cache: this.cache,
            cacheKey: (0, $1RIJT$elementfibase.getCacheKey)("getAllVotersWithPower", [
                fromBlock,
                toBlock
            ]),
            callback: async ()=>{
                const powersByVoter = {};
                const voteChangeEvents = await this.contract.queryFilter(this.contract.filters.VoteChange(), fromBlock, toBlock);
                for (const { args: args  } of voteChangeEvents){
                    const { to: to , amount: amount  } = args;
                    powersByVoter[to] = powersByVoter[to] || BigInt(0);
                    powersByVoter[to] += amount.toBigInt();
                }
                return Object.entries(powersByVoter).filter(([, power])=>power > 0).map(([voter, power])=>({
                        voter: voter,
                        power: power.toString()
                    }));
            }
        });
    }
}








class $e0e2802e459d88e3$export$a37e73beca8c1698 extends (0, $a0cf45371a696709$export$2b7e06d96cf7f075) {
    constructor(address, provider){
        const contract = (0, $1RIJT$elementficounciltypechain.VestingVault__factory).connect(address, provider);
        const cache = new (0, ($parcel$interopDefault($1RIJT$lrucache)))({
            max: 500
        });
        super(address, contract, cache);
        this.contract = contract;
        this.cache = cache;
    }
    async getBalance(voter) {
        return (0, $1RIJT$elementfibase.cached)({
            cache: this.cache,
            cacheKey: (0, $1RIJT$elementfibase.getCacheKey)("getBalance", [
                voter
            ]),
            callback: async ()=>{
                try {
                    const grants = await this.contract.functions.getGrant(voter);
                    return grants[0].toString();
                } catch (err) {
                    // TODO: Handle error
                    return "0";
                }
            }
        });
    }
    async getVotingPowerView(voter, blockNumber) {
        return (0, $1RIJT$elementfibase.cached)({
            cache: this.cache,
            cacheKey: (0, $1RIJT$elementfibase.getCacheKey)("getVotingPowerView", [
                voter,
                blockNumber
            ]),
            callback: async ()=>{
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
                } catch (error) {
                    return "0";
                }
            }
        });
    }
    async getAllVotersWithPower(fromBlock, toBlock) {
        return (0, $1RIJT$elementfibase.cached)({
            cache: this.cache,
            cacheKey: (0, $1RIJT$elementfibase.getCacheKey)("getAllVotersWithPower", [
                fromBlock,
                toBlock
            ]),
            callback: async ()=>{
                const powersByVoter = {};
                const voteChangeEvents = await this.contract.queryFilter(this.contract.filters.VoteChange(), fromBlock, toBlock);
                for (const { args: args  } of voteChangeEvents){
                    const { to: to , amount: amount  } = args;
                    powersByVoter[to] = powersByVoter[to] || BigInt(0);
                    powersByVoter[to] += amount.toBigInt();
                }
                return Object.entries(powersByVoter).filter(([, power])=>power > 0).map(([voter, power])=>({
                        voter: voter,
                        power: power.toString()
                    }));
            }
        });
    }
}


async function $6cd3539ecaa63655$export$54fae1269cb9a9e0({ chainId: chainId , provider: provider  }) {
    const { addresses: addresses  } = (0, $a40966fa5fbf0fb2$export$735f3e625be6eff7)(chainId);
    const lockingVault = new (0, $a1c706d406f5708a$export$93f46c2abf3fc254)(addresses.lockingVault, provider);
    const vestingVault = new (0, $e0e2802e459d88e3$export$a37e73beca8c1698)(addresses.vestingVault, provider);
    const gscVault = new (0, $492df70f1218e6f0$export$e2e4dee807f6af7a)(addresses.gscVault, provider);
    const coreVoting = new (0, $41844f56d22dc55e$export$ca33481ae8bfff02)(addresses.coreVoting, provider, [
        lockingVault,
        vestingVault, 
    ]);
    const gscCoreVoting = new (0, $41844f56d22dc55e$export$ca33481ae8bfff02)(addresses.gscCoreVoting, provider, [
        gscVault
    ]);
    return {
        chainId: chainId,
        provider: provider,
        councilDataSources: {
            votingContracts: [
                coreVoting,
                gscCoreVoting
            ],
            votingVaults: [
                lockingVault,
                vestingVault,
                gscVault
            ]
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
                        "value": "votingContract",
                        "loc": {
                            "start": 15,
                            "end": 29
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 30,
                                    "end": 37
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
                                            "start": 39,
                                            "end": 41
                                        }
                                    },
                                    "loc": {
                                        "start": 39,
                                        "end": 41
                                    }
                                },
                                "loc": {
                                    "start": 39,
                                    "end": 42
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 30,
                                "end": 42
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingContract",
                            "loc": {
                                "start": 45,
                                "end": 59
                            }
                        },
                        "loc": {
                            "start": 45,
                            "end": 59
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 15,
                        "end": 59
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingContracts",
                        "loc": {
                            "start": 62,
                            "end": 77
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "addresses",
                                "loc": {
                                    "start": 78,
                                    "end": 87
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
                                                "start": 90,
                                                "end": 92
                                            }
                                        },
                                        "loc": {
                                            "start": 90,
                                            "end": 92
                                        }
                                    },
                                    "loc": {
                                        "start": 90,
                                        "end": 93
                                    }
                                },
                                "loc": {
                                    "start": 89,
                                    "end": 94
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 78,
                                "end": 94
                            }
                        }
                    ],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "VotingContract",
                                "loc": {
                                    "start": 98,
                                    "end": 112
                                }
                            },
                            "loc": {
                                "start": 98,
                                "end": 112
                            }
                        },
                        "loc": {
                            "start": 97,
                            "end": 113
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 62,
                        "end": 113
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVault",
                        "loc": {
                            "start": 116,
                            "end": 127
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 128,
                                    "end": 135
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
                                            "start": 137,
                                            "end": 139
                                        }
                                    },
                                    "loc": {
                                        "start": 137,
                                        "end": 139
                                    }
                                },
                                "loc": {
                                    "start": 137,
                                    "end": 140
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 128,
                                "end": 140
                            }
                        }
                    ],
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
                        "start": 116,
                        "end": 154
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 157,
                            "end": 169
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "addresses",
                                "loc": {
                                    "start": 170,
                                    "end": 179
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
                                                "start": 182,
                                                "end": 184
                                            }
                                        },
                                        "loc": {
                                            "start": 182,
                                            "end": 184
                                        }
                                    },
                                    "loc": {
                                        "start": 182,
                                        "end": 185
                                    }
                                },
                                "loc": {
                                    "start": 181,
                                    "end": 186
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 170,
                                "end": 186
                            }
                        }
                    ],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "VotingVault",
                                "loc": {
                                    "start": 190,
                                    "end": 201
                                }
                            },
                            "loc": {
                                "start": 190,
                                "end": 201
                            }
                        },
                        "loc": {
                            "start": 189,
                            "end": 202
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 157,
                        "end": 202
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 205,
                            "end": 210
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 211,
                                    "end": 218
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
                                            "start": 220,
                                            "end": 222
                                        }
                                    },
                                    "loc": {
                                        "start": 220,
                                        "end": 222
                                    }
                                },
                                "loc": {
                                    "start": 220,
                                    "end": 223
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 211,
                                "end": 223
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Voter",
                            "loc": {
                                "start": 226,
                                "end": 231
                            }
                        },
                        "loc": {
                            "start": 226,
                            "end": 231
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 205,
                        "end": 231
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 234,
                            "end": 240
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "addresses",
                                "loc": {
                                    "start": 241,
                                    "end": 250
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
                                                "start": 253,
                                                "end": 255
                                            }
                                        },
                                        "loc": {
                                            "start": 253,
                                            "end": 255
                                        }
                                    },
                                    "loc": {
                                        "start": 253,
                                        "end": 256
                                    }
                                },
                                "loc": {
                                    "start": 252,
                                    "end": 257
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 241,
                                "end": 257
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "search",
                                "loc": {
                                    "start": 259,
                                    "end": 265
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "String",
                                    "loc": {
                                        "start": 267,
                                        "end": 273
                                    }
                                },
                                "loc": {
                                    "start": 267,
                                    "end": 273
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 259,
                                "end": 273
                            }
                        }
                    ],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "ListType",
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Voter",
                                    "loc": {
                                        "start": 277,
                                        "end": 282
                                    }
                                },
                                "loc": {
                                    "start": 277,
                                    "end": 282
                                }
                            },
                            "loc": {
                                "start": 276,
                                "end": 283
                            }
                        },
                        "loc": {
                            "start": 276,
                            "end": 284
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 234,
                        "end": 284
                    }
                }
            ],
            "loc": {
                "start": 0,
                "end": 286
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingContract",
                "loc": {
                    "start": 293,
                    "end": 307
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
                            "start": 312,
                            "end": 319
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
                                    "start": 321,
                                    "end": 323
                                }
                            },
                            "loc": {
                                "start": 321,
                                "end": 323
                            }
                        },
                        "loc": {
                            "start": 321,
                            "end": 324
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 312,
                        "end": 324
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 327,
                            "end": 339
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
                                            "start": 342,
                                            "end": 353
                                        }
                                    },
                                    "loc": {
                                        "start": 342,
                                        "end": 353
                                    }
                                },
                                "loc": {
                                    "start": 342,
                                    "end": 354
                                }
                            },
                            "loc": {
                                "start": 341,
                                "end": 355
                            }
                        },
                        "loc": {
                            "start": 341,
                            "end": 356
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 327,
                        "end": 356
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balance",
                        "loc": {
                            "start": 359,
                            "end": 366
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 367,
                                    "end": 372
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
                                            "start": 374,
                                            "end": 376
                                        }
                                    },
                                    "loc": {
                                        "start": 374,
                                        "end": 376
                                    }
                                },
                                "loc": {
                                    "start": 374,
                                    "end": 377
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 367,
                                "end": 377
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 380,
                                "end": 386
                            }
                        },
                        "loc": {
                            "start": 380,
                            "end": 386
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 359,
                        "end": 386
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 389,
                            "end": 397
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "id",
                                "loc": {
                                    "start": 398,
                                    "end": 400
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
                                            "start": 402,
                                            "end": 404
                                        }
                                    },
                                    "loc": {
                                        "start": 402,
                                        "end": 404
                                    }
                                },
                                "loc": {
                                    "start": 402,
                                    "end": 405
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 398,
                                "end": 405
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Proposal",
                            "loc": {
                                "start": 408,
                                "end": 416
                            }
                        },
                        "loc": {
                            "start": 408,
                            "end": 416
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 389,
                        "end": 416
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposals",
                        "loc": {
                            "start": 419,
                            "end": 428
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "ids",
                                "loc": {
                                    "start": 429,
                                    "end": 432
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
                                                "start": 435,
                                                "end": 437
                                            }
                                        },
                                        "loc": {
                                            "start": 435,
                                            "end": 437
                                        }
                                    },
                                    "loc": {
                                        "start": 435,
                                        "end": 438
                                    }
                                },
                                "loc": {
                                    "start": 434,
                                    "end": 439
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 429,
                                "end": 439
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "isActive",
                                "loc": {
                                    "start": 441,
                                    "end": 449
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Boolean",
                                    "loc": {
                                        "start": 451,
                                        "end": 458
                                    }
                                },
                                "loc": {
                                    "start": 451,
                                    "end": 458
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 441,
                                "end": 458
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
                                    "start": 462,
                                    "end": 470
                                }
                            },
                            "loc": {
                                "start": 462,
                                "end": 470
                            }
                        },
                        "loc": {
                            "start": 461,
                            "end": 471
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 419,
                        "end": 471
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposalCount",
                        "loc": {
                            "start": 474,
                            "end": 487
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "isActive",
                                "loc": {
                                    "start": 488,
                                    "end": 496
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Boolean",
                                    "loc": {
                                        "start": 498,
                                        "end": 505
                                    }
                                },
                                "loc": {
                                    "start": 498,
                                    "end": 505
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 488,
                                "end": 505
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 508,
                                "end": 511
                            }
                        },
                        "loc": {
                            "start": 508,
                            "end": 511
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 474,
                        "end": 511
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 514,
                            "end": 530
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 531,
                                    "end": 542
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 544,
                                        "end": 547
                                    }
                                },
                                "loc": {
                                    "start": 544,
                                    "end": 547
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 531,
                                "end": 547
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 550,
                                "end": 566
                            }
                        },
                        "loc": {
                            "start": 550,
                            "end": 566
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 514,
                        "end": 566
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 569,
                            "end": 575
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "Voter",
                                "loc": {
                                    "start": 578,
                                    "end": 583
                                }
                            },
                            "loc": {
                                "start": 578,
                                "end": 583
                            }
                        },
                        "loc": {
                            "start": 577,
                            "end": 584
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 569,
                        "end": 584
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 587,
                            "end": 597
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 599,
                                "end": 602
                            }
                        },
                        "loc": {
                            "start": 599,
                            "end": 602
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 587,
                        "end": 602
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 605,
                            "end": 616
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 617,
                                    "end": 622
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
                                            "start": 624,
                                            "end": 626
                                        }
                                    },
                                    "loc": {
                                        "start": 624,
                                        "end": 626
                                    }
                                },
                                "loc": {
                                    "start": 624,
                                    "end": 627
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 617,
                                "end": 627
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 629,
                                    "end": 640
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 642,
                                        "end": 645
                                    }
                                },
                                "loc": {
                                    "start": 642,
                                    "end": 645
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 629,
                                "end": 645
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 648,
                                "end": 659
                            }
                        },
                        "loc": {
                            "start": 648,
                            "end": 659
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 605,
                        "end": 659
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 662,
                            "end": 674
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 675,
                                    "end": 681
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
                                                "start": 684,
                                                "end": 686
                                            }
                                        },
                                        "loc": {
                                            "start": 684,
                                            "end": 686
                                        }
                                    },
                                    "loc": {
                                        "start": 684,
                                        "end": 687
                                    }
                                },
                                "loc": {
                                    "start": 683,
                                    "end": 688
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 675,
                                "end": 688
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 690,
                                    "end": 701
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 703,
                                        "end": 706
                                    }
                                },
                                "loc": {
                                    "start": 703,
                                    "end": 706
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 690,
                                "end": 706
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
                                    "start": 710,
                                    "end": 721
                                }
                            },
                            "loc": {
                                "start": 710,
                                "end": 721
                            }
                        },
                        "loc": {
                            "start": 709,
                            "end": 722
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 662,
                        "end": 722
                    }
                }
            ],
            "loc": {
                "start": 288,
                "end": 724
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingVault",
                "loc": {
                    "start": 731,
                    "end": 742
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
                            "start": 747,
                            "end": 754
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
                                    "start": 756,
                                    "end": 758
                                }
                            },
                            "loc": {
                                "start": 756,
                                "end": 758
                            }
                        },
                        "loc": {
                            "start": 756,
                            "end": 759
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 747,
                        "end": 759
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balance",
                        "loc": {
                            "start": 762,
                            "end": 769
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 770,
                                    "end": 775
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
                                            "start": 777,
                                            "end": 779
                                        }
                                    },
                                    "loc": {
                                        "start": 777,
                                        "end": 779
                                    }
                                },
                                "loc": {
                                    "start": 777,
                                    "end": 780
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 770,
                                "end": 780
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 783,
                                "end": 789
                            }
                        },
                        "loc": {
                            "start": 783,
                            "end": 789
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 762,
                        "end": 789
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 792,
                            "end": 808
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 809,
                                    "end": 820
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 822,
                                        "end": 825
                                    }
                                },
                                "loc": {
                                    "start": 822,
                                    "end": 825
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 809,
                                "end": 825
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 828,
                                "end": 844
                            }
                        },
                        "loc": {
                            "start": 828,
                            "end": 844
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 792,
                        "end": 844
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 847,
                            "end": 853
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "Voter",
                                "loc": {
                                    "start": 856,
                                    "end": 861
                                }
                            },
                            "loc": {
                                "start": 856,
                                "end": 861
                            }
                        },
                        "loc": {
                            "start": 855,
                            "end": 862
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 847,
                        "end": 862
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 865,
                            "end": 875
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 877,
                                "end": 880
                            }
                        },
                        "loc": {
                            "start": 877,
                            "end": 880
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 865,
                        "end": 880
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 883,
                            "end": 894
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 895,
                                    "end": 900
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
                                            "start": 902,
                                            "end": 904
                                        }
                                    },
                                    "loc": {
                                        "start": 902,
                                        "end": 904
                                    }
                                },
                                "loc": {
                                    "start": 902,
                                    "end": 905
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 895,
                                "end": 905
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 907,
                                    "end": 918
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 920,
                                        "end": 923
                                    }
                                },
                                "loc": {
                                    "start": 920,
                                    "end": 923
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 907,
                                "end": 923
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 926,
                                "end": 937
                            }
                        },
                        "loc": {
                            "start": 926,
                            "end": 937
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 883,
                        "end": 937
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 940,
                            "end": 952
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 953,
                                    "end": 959
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
                                                "start": 962,
                                                "end": 964
                                            }
                                        },
                                        "loc": {
                                            "start": 962,
                                            "end": 964
                                        }
                                    },
                                    "loc": {
                                        "start": 962,
                                        "end": 965
                                    }
                                },
                                "loc": {
                                    "start": 961,
                                    "end": 966
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 953,
                                "end": 966
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 968,
                                    "end": 979
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 981,
                                        "end": 984
                                    }
                                },
                                "loc": {
                                    "start": 981,
                                    "end": 984
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 968,
                                "end": 984
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
                                    "start": 988,
                                    "end": 999
                                }
                            },
                            "loc": {
                                "start": 988,
                                "end": 999
                            }
                        },
                        "loc": {
                            "start": 987,
                            "end": 1000
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 940,
                        "end": 1000
                    }
                }
            ],
            "loc": {
                "start": 726,
                "end": 1002
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Proposal",
                "loc": {
                    "start": 1009,
                    "end": 1017
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
                            "start": 1022,
                            "end": 1024
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
                                    "start": 1026,
                                    "end": 1028
                                }
                            },
                            "loc": {
                                "start": 1026,
                                "end": 1028
                            }
                        },
                        "loc": {
                            "start": 1026,
                            "end": 1029
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1022,
                        "end": 1029
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingContract",
                        "loc": {
                            "start": 1032,
                            "end": 1046
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
                                    "start": 1048,
                                    "end": 1062
                                }
                            },
                            "loc": {
                                "start": 1048,
                                "end": 1062
                            }
                        },
                        "loc": {
                            "start": 1048,
                            "end": 1063
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1032,
                        "end": 1063
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1066,
                            "end": 1080
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "created",
                        "loc": {
                            "start": 1083,
                            "end": 1090
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
                                    "start": 1092,
                                    "end": 1095
                                }
                            },
                            "loc": {
                                "start": 1092,
                                "end": 1095
                            }
                        },
                        "loc": {
                            "start": 1092,
                            "end": 1096
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1066,
                        "end": 1096
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1099,
                            "end": 1113
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "expiration",
                        "loc": {
                            "start": 1116,
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
                                "value": "Int",
                                "loc": {
                                    "start": 1128,
                                    "end": 1131
                                }
                            },
                            "loc": {
                                "start": 1128,
                                "end": 1131
                            }
                        },
                        "loc": {
                            "start": 1128,
                            "end": 1132
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1099,
                        "end": 1132
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1135,
                            "end": 1149
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "unlock",
                        "loc": {
                            "start": 1152,
                            "end": 1158
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
                                    "start": 1160,
                                    "end": 1163
                                }
                            },
                            "loc": {
                                "start": 1160,
                                "end": 1163
                            }
                        },
                        "loc": {
                            "start": 1160,
                            "end": 1164
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1135,
                        "end": 1164
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Proposals are active during their voting period, i.e., from creation block up\nto expiration block. This will be false if the current block is later than the\nproposal's expiration.",
                        "block": true,
                        "loc": {
                            "start": 1167,
                            "end": 1362
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "isActive",
                        "loc": {
                            "start": 1365,
                            "end": 1373
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "Boolean",
                                "loc": {
                                    "start": 1375,
                                    "end": 1382
                                }
                            },
                            "loc": {
                                "start": 1375,
                                "end": 1382
                            }
                        },
                        "loc": {
                            "start": 1375,
                            "end": 1383
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1167,
                        "end": 1383
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isExecuted",
                        "loc": {
                            "start": 1386,
                            "end": 1396
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1398,
                                "end": 1405
                            }
                        },
                        "loc": {
                            "start": 1398,
                            "end": 1405
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1386,
                        "end": 1405
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1408,
                            "end": 1422
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "lastCall",
                        "loc": {
                            "start": 1425,
                            "end": 1433
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1435,
                                "end": 1438
                            }
                        },
                        "loc": {
                            "start": 1435,
                            "end": 1438
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1408,
                        "end": 1438
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "quorum",
                        "loc": {
                            "start": 1441,
                            "end": 1447
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1449,
                                "end": 1455
                            }
                        },
                        "loc": {
                            "start": 1449,
                            "end": 1455
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1441,
                        "end": 1455
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1458,
                            "end": 1462
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1463,
                                    "end": 1468
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
                                            "start": 1470,
                                            "end": 1472
                                        }
                                    },
                                    "loc": {
                                        "start": 1470,
                                        "end": 1472
                                    }
                                },
                                "loc": {
                                    "start": 1470,
                                    "end": 1473
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1463,
                                "end": 1473
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1476,
                                "end": 1480
                            }
                        },
                        "loc": {
                            "start": 1476,
                            "end": 1480
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1458,
                        "end": 1480
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 1483,
                            "end": 1489
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "Voter",
                                "loc": {
                                    "start": 1492,
                                    "end": 1497
                                }
                            },
                            "loc": {
                                "start": 1492,
                                "end": 1497
                            }
                        },
                        "loc": {
                            "start": 1491,
                            "end": 1498
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1483,
                        "end": 1498
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 1501,
                            "end": 1511
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1513,
                                "end": 1516
                            }
                        },
                        "loc": {
                            "start": 1513,
                            "end": 1516
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1501,
                        "end": 1516
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1519,
                            "end": 1524
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1525,
                                    "end": 1531
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
                                                "start": 1534,
                                                "end": 1536
                                            }
                                        },
                                        "loc": {
                                            "start": 1534,
                                            "end": 1536
                                        }
                                    },
                                    "loc": {
                                        "start": 1534,
                                        "end": 1537
                                    }
                                },
                                "loc": {
                                    "start": 1533,
                                    "end": 1538
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1525,
                                "end": 1538
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
                                    "start": 1542,
                                    "end": 1546
                                }
                            },
                            "loc": {
                                "start": 1542,
                                "end": 1546
                            }
                        },
                        "loc": {
                            "start": 1541,
                            "end": 1547
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1519,
                        "end": 1547
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1550,
                            "end": 1561
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1562,
                                    "end": 1567
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
                                            "start": 1569,
                                            "end": 1571
                                        }
                                    },
                                    "loc": {
                                        "start": 1569,
                                        "end": 1571
                                    }
                                },
                                "loc": {
                                    "start": 1569,
                                    "end": 1572
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1562,
                                "end": 1572
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1575,
                                "end": 1586
                            }
                        },
                        "loc": {
                            "start": 1575,
                            "end": 1586
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1550,
                        "end": 1586
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1589,
                            "end": 1601
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1602,
                                    "end": 1608
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
                                                "start": 1611,
                                                "end": 1613
                                            }
                                        },
                                        "loc": {
                                            "start": 1611,
                                            "end": 1613
                                        }
                                    },
                                    "loc": {
                                        "start": 1611,
                                        "end": 1614
                                    }
                                },
                                "loc": {
                                    "start": 1610,
                                    "end": 1615
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1602,
                                "end": 1615
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
                                    "start": 1619,
                                    "end": 1630
                                }
                            },
                            "loc": {
                                "start": 1619,
                                "end": 1630
                            }
                        },
                        "loc": {
                            "start": 1618,
                            "end": 1631
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1589,
                        "end": 1631
                    }
                }
            ],
            "loc": {
                "start": 1004,
                "end": 1633
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Vote",
                "loc": {
                    "start": 1640,
                    "end": 1644
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
                            "start": 1649,
                            "end": 1654
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "Voter",
                                "loc": {
                                    "start": 1656,
                                    "end": 1661
                                }
                            },
                            "loc": {
                                "start": 1656,
                                "end": 1661
                            }
                        },
                        "loc": {
                            "start": 1656,
                            "end": 1662
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1649,
                        "end": 1662
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "power",
                        "loc": {
                            "start": 1665,
                            "end": 1670
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
                                    "start": 1672,
                                    "end": 1678
                                }
                            },
                            "loc": {
                                "start": 1672,
                                "end": 1678
                            }
                        },
                        "loc": {
                            "start": 1672,
                            "end": 1679
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1665,
                        "end": 1679
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 1682,
                            "end": 1690
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "Proposal",
                                "loc": {
                                    "start": 1692,
                                    "end": 1700
                                }
                            },
                            "loc": {
                                "start": 1692,
                                "end": 1700
                            }
                        },
                        "loc": {
                            "start": 1692,
                            "end": 1701
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1682,
                        "end": 1701
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "castBallot",
                        "loc": {
                            "start": 1704,
                            "end": 1714
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Ballot",
                            "loc": {
                                "start": 1716,
                                "end": 1722
                            }
                        },
                        "loc": {
                            "start": 1716,
                            "end": 1722
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1704,
                        "end": 1722
                    }
                }
            ],
            "loc": {
                "start": 1635,
                "end": 1724
            }
        },
        {
            "kind": "EnumTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Ballot",
                "loc": {
                    "start": 1731,
                    "end": 1737
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
                            "start": 1742,
                            "end": 1745
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1742,
                        "end": 1745
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "No",
                        "loc": {
                            "start": 1748,
                            "end": 1750
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1748,
                        "end": 1750
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "Abstain",
                        "loc": {
                            "start": 1753,
                            "end": 1760
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1753,
                        "end": 1760
                    }
                }
            ],
            "loc": {
                "start": 1726,
                "end": 1762
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingPower",
                "loc": {
                    "start": 1769,
                    "end": 1780
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
                            "start": 1785,
                            "end": 1796
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
                                    "start": 1798,
                                    "end": 1801
                                }
                            },
                            "loc": {
                                "start": 1798,
                                "end": 1801
                            }
                        },
                        "loc": {
                            "start": 1798,
                            "end": 1802
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1785,
                        "end": 1802
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1805,
                            "end": 1810
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
                                    "start": 1812,
                                    "end": 1818
                                }
                            },
                            "loc": {
                                "start": 1812,
                                "end": 1818
                            }
                        },
                        "loc": {
                            "start": 1812,
                            "end": 1819
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1805,
                        "end": 1819
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 1822,
                            "end": 1827
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "Voter",
                                "loc": {
                                    "start": 1829,
                                    "end": 1834
                                }
                            },
                            "loc": {
                                "start": 1829,
                                "end": 1834
                            }
                        },
                        "loc": {
                            "start": 1829,
                            "end": 1835
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1822,
                        "end": 1835
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1838,
                            "end": 1850
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
                                            "start": 1853,
                                            "end": 1864
                                        }
                                    },
                                    "loc": {
                                        "start": 1853,
                                        "end": 1864
                                    }
                                },
                                "loc": {
                                    "start": 1853,
                                    "end": 1865
                                }
                            },
                            "loc": {
                                "start": 1852,
                                "end": 1866
                            }
                        },
                        "loc": {
                            "start": 1852,
                            "end": 1867
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1838,
                        "end": 1867
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isStale",
                        "loc": {
                            "start": 1870,
                            "end": 1877
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1879,
                                "end": 1886
                            }
                        },
                        "loc": {
                            "start": 1879,
                            "end": 1886
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1870,
                        "end": 1886
                    }
                }
            ],
            "loc": {
                "start": 1764,
                "end": 1888
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "TotalVotingPower",
                "loc": {
                    "start": 1895,
                    "end": 1911
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
                            "start": 1916,
                            "end": 1927
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
                                    "start": 1929,
                                    "end": 1932
                                }
                            },
                            "loc": {
                                "start": 1929,
                                "end": 1932
                            }
                        },
                        "loc": {
                            "start": 1929,
                            "end": 1933
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1916,
                        "end": 1933
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1936,
                            "end": 1941
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
                                    "start": 1943,
                                    "end": 1949
                                }
                            },
                            "loc": {
                                "start": 1943,
                                "end": 1949
                            }
                        },
                        "loc": {
                            "start": 1943,
                            "end": 1950
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1936,
                        "end": 1950
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1953,
                            "end": 1965
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
                                            "start": 1968,
                                            "end": 1979
                                        }
                                    },
                                    "loc": {
                                        "start": 1968,
                                        "end": 1979
                                    }
                                },
                                "loc": {
                                    "start": 1968,
                                    "end": 1980
                                }
                            },
                            "loc": {
                                "start": 1967,
                                "end": 1981
                            }
                        },
                        "loc": {
                            "start": 1967,
                            "end": 1982
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1953,
                        "end": 1982
                    }
                }
            ],
            "loc": {
                "start": 1890,
                "end": 1984
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Voter",
                "loc": {
                    "start": 1991,
                    "end": 1996
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
                            "start": 2001,
                            "end": 2008
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
                                    "start": 2010,
                                    "end": 2012
                                }
                            },
                            "loc": {
                                "start": 2010,
                                "end": 2012
                            }
                        },
                        "loc": {
                            "start": 2010,
                            "end": 2013
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2001,
                        "end": 2013
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balance",
                        "loc": {
                            "start": 2016,
                            "end": 2023
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVault",
                                "loc": {
                                    "start": 2024,
                                    "end": 2035
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
                                "start": 2024,
                                "end": 2040
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2043,
                                "end": 2049
                            }
                        },
                        "loc": {
                            "start": 2043,
                            "end": 2049
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2016,
                        "end": 2049
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balances",
                        "loc": {
                            "start": 2052,
                            "end": 2060
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 2061,
                                    "end": 2073
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
                                                    "start": 2076,
                                                    "end": 2078
                                                }
                                            },
                                            "loc": {
                                                "start": 2076,
                                                "end": 2078
                                            }
                                        },
                                        "loc": {
                                            "start": 2076,
                                            "end": 2079
                                        }
                                    },
                                    "loc": {
                                        "start": 2075,
                                        "end": 2080
                                    }
                                },
                                "loc": {
                                    "start": 2075,
                                    "end": 2081
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2061,
                                "end": 2081
                            }
                        }
                    ],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String",
                                "loc": {
                                    "start": 2085,
                                    "end": 2091
                                }
                            },
                            "loc": {
                                "start": 2085,
                                "end": 2091
                            }
                        },
                        "loc": {
                            "start": 2084,
                            "end": 2092
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2052,
                        "end": 2092
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "ensName",
                        "loc": {
                            "start": 2095,
                            "end": 2102
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2104,
                                "end": 2110
                            }
                        },
                        "loc": {
                            "start": 2104,
                            "end": 2110
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2095,
                        "end": 2110
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 2113,
                            "end": 2117
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposal",
                                "loc": {
                                    "start": 2118,
                                    "end": 2126
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
                                            "start": 2128,
                                            "end": 2130
                                        }
                                    },
                                    "loc": {
                                        "start": 2128,
                                        "end": 2130
                                    }
                                },
                                "loc": {
                                    "start": 2128,
                                    "end": 2131
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2118,
                                "end": 2131
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 2133,
                                    "end": 2147
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
                                            "start": 2149,
                                            "end": 2151
                                        }
                                    },
                                    "loc": {
                                        "start": 2149,
                                        "end": 2151
                                    }
                                },
                                "loc": {
                                    "start": 2149,
                                    "end": 2152
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2133,
                                "end": 2152
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 2155,
                                "end": 2159
                            }
                        },
                        "loc": {
                            "start": 2155,
                            "end": 2159
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2113,
                        "end": 2159
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 2162,
                            "end": 2167
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposals",
                                "loc": {
                                    "start": 2168,
                                    "end": 2177
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
                                                    "start": 2180,
                                                    "end": 2182
                                                }
                                            },
                                            "loc": {
                                                "start": 2180,
                                                "end": 2182
                                            }
                                        },
                                        "loc": {
                                            "start": 2180,
                                            "end": 2183
                                        }
                                    },
                                    "loc": {
                                        "start": 2179,
                                        "end": 2184
                                    }
                                },
                                "loc": {
                                    "start": 2179,
                                    "end": 2185
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2168,
                                "end": 2185
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 2187,
                                    "end": 2201
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
                                            "start": 2203,
                                            "end": 2205
                                        }
                                    },
                                    "loc": {
                                        "start": 2203,
                                        "end": 2205
                                    }
                                },
                                "loc": {
                                    "start": 2203,
                                    "end": 2206
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2187,
                                "end": 2206
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
                                    "start": 2210,
                                    "end": 2214
                                }
                            },
                            "loc": {
                                "start": 2210,
                                "end": 2214
                            }
                        },
                        "loc": {
                            "start": 2209,
                            "end": 2215
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2162,
                        "end": 2215
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 2218,
                            "end": 2229
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVault",
                                "loc": {
                                    "start": 2230,
                                    "end": 2241
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
                                            "start": 2243,
                                            "end": 2245
                                        }
                                    },
                                    "loc": {
                                        "start": 2243,
                                        "end": 2245
                                    }
                                },
                                "loc": {
                                    "start": 2243,
                                    "end": 2246
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2230,
                                "end": 2246
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 2248,
                                    "end": 2259
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 2261,
                                        "end": 2264
                                    }
                                },
                                "loc": {
                                    "start": 2261,
                                    "end": 2264
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2248,
                                "end": 2264
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 2267,
                                "end": 2278
                            }
                        },
                        "loc": {
                            "start": 2267,
                            "end": 2278
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2218,
                        "end": 2278
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 2281,
                            "end": 2293
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 2294,
                                    "end": 2306
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
                                                    "start": 2309,
                                                    "end": 2311
                                                }
                                            },
                                            "loc": {
                                                "start": 2309,
                                                "end": 2311
                                            }
                                        },
                                        "loc": {
                                            "start": 2309,
                                            "end": 2312
                                        }
                                    },
                                    "loc": {
                                        "start": 2308,
                                        "end": 2313
                                    }
                                },
                                "loc": {
                                    "start": 2308,
                                    "end": 2314
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2294,
                                "end": 2314
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 2316,
                                    "end": 2327
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 2329,
                                        "end": 2332
                                    }
                                },
                                "loc": {
                                    "start": 2329,
                                    "end": 2332
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2316,
                                "end": 2332
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
                                    "start": 2336,
                                    "end": 2347
                                }
                            },
                            "loc": {
                                "start": 2336,
                                "end": 2347
                            }
                        },
                        "loc": {
                            "start": 2335,
                            "end": 2348
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2281,
                        "end": 2348
                    }
                }
            ],
            "loc": {
                "start": 1986,
                "end": 2350
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 2351
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
    initContext: $6cd3539ecaa63655$export$54fae1269cb9a9e0
};
$parcel$exportWildcard(module.exports, $c3b13ec6d9e5ad30$exports);


//# sourceMappingURL=main.js.map
