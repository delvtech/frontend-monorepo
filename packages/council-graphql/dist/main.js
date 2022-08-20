var $1RIJT$graphqltoolsschema = require("@graphql-tools/schema");
var $1RIJT$fuzzaldrin = require("fuzzaldrin");
var $1RIJT$elementficounciltokenlist = require("@elementfi/council-tokenlist");
var $1RIJT$etherslibutils = require("ethers/lib/utils");
var $1RIJT$lrucache = require("lru-cache");
var $1RIJT$elementfibase = require("@elementfi/base");
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
    getEnsName ({ voter: voter , context: context  }) {
        return (0, $1RIJT$elementfibase.cached)({
            cache: $ececcc37bb5e5066$var$cache,
            cacheKey: (0, $1RIJT$elementfibase.getCacheKey)("getEnsName", [
                voter.address
            ]),
            callback: ()=>context.provider.lookupAddress(voter.address)
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
        voters: async (_, { addresses: addresses , search: search , votingPowerMin: votingPowerMin , votingPowerMax: votingPowerMax  }, context)=>{
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
                    if (!voter) return;
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
            if (votingPowerMin || votingPowerMax) {
                voters = await Promise.all(voters.map(async (voter)=>{
                    if (!voter) return;
                    const votingPower = await (0, $7f716b31368ced62$export$a0cbbdeeb12308cd).getByVoter({
                        voter: voter,
                        // TODO: Resolve:
                        // Adding votingPowerMin/Max will now require the need to pass in a vault address?
                        // Maybe set up a type like ...
                        /**
               *
               * voter(
               *    addresses: [ID!]
               *    search: String
               *    votingPowerFilter: VotingPowerFilter
               * )
               *
               * type VotingPowerFilter {
               *    votingPowerMin: String // Way to express having at the very least one (votingPowerMin or votingPowerMax)
               *    votingPowerMax: String
               *    vaultAddress: String!
               * }
               */ votingVaults: [
                            {
                                address: "0x02Bd4A3b1b95b01F2Aa61655415A5d3EAAcaafdD"
                            }, 
                        ],
                        context: context
                    });
                    return {
                        ...voter,
                        votingPower: votingPower
                    };
                }));
                voters = voters.filter((voter)=>{
                    if (!voter || !voter.votingPower) return false;
                    // TODO: Resolve:
                    // decimal accuracy? Conversion to number would potentitally remove decimal places 
                    const votingPower = Number(voter.votingPower.value);
                    const minimum = Number(votingPowerMin) || 0;
                    const maximum = Number(votingPowerMax) || Number.MAX_VALUE;
                    return minimum < votingPower && maximum > votingPower;
                });
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
                } catch (error) {
                    console.error(error);
                }
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
                    console.error(error);
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
                    console.error(error);
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
                                    "start": 246,
                                    "end": 255
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
                                                "start": 258,
                                                "end": 260
                                            }
                                        },
                                        "loc": {
                                            "start": 258,
                                            "end": 260
                                        }
                                    },
                                    "loc": {
                                        "start": 258,
                                        "end": 261
                                    }
                                },
                                "loc": {
                                    "start": 257,
                                    "end": 262
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 246,
                                "end": 262
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "search",
                                "loc": {
                                    "start": 267,
                                    "end": 273
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "String",
                                    "loc": {
                                        "start": 275,
                                        "end": 281
                                    }
                                },
                                "loc": {
                                    "start": 275,
                                    "end": 281
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 267,
                                "end": 281
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingPowerMin",
                                "loc": {
                                    "start": 286,
                                    "end": 300
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "String",
                                    "loc": {
                                        "start": 302,
                                        "end": 308
                                    }
                                },
                                "loc": {
                                    "start": 302,
                                    "end": 308
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 286,
                                "end": 308
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingPowerMax",
                                "loc": {
                                    "start": 313,
                                    "end": 327
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "String",
                                    "loc": {
                                        "start": 329,
                                        "end": 335
                                    }
                                },
                                "loc": {
                                    "start": 329,
                                    "end": 335
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 313,
                                "end": 335
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
                                        "start": 342,
                                        "end": 347
                                    }
                                },
                                "loc": {
                                    "start": 342,
                                    "end": 347
                                }
                            },
                            "loc": {
                                "start": 341,
                                "end": 348
                            }
                        },
                        "loc": {
                            "start": 341,
                            "end": 349
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 234,
                        "end": 349
                    }
                }
            ],
            "loc": {
                "start": 0,
                "end": 351
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingContract",
                "loc": {
                    "start": 358,
                    "end": 372
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
                            "start": 377,
                            "end": 384
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
                                    "start": 386,
                                    "end": 388
                                }
                            },
                            "loc": {
                                "start": 386,
                                "end": 388
                            }
                        },
                        "loc": {
                            "start": 386,
                            "end": 389
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 377,
                        "end": 389
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 392,
                            "end": 404
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
                                            "start": 407,
                                            "end": 418
                                        }
                                    },
                                    "loc": {
                                        "start": 407,
                                        "end": 418
                                    }
                                },
                                "loc": {
                                    "start": 407,
                                    "end": 419
                                }
                            },
                            "loc": {
                                "start": 406,
                                "end": 420
                            }
                        },
                        "loc": {
                            "start": 406,
                            "end": 421
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 392,
                        "end": 421
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balance",
                        "loc": {
                            "start": 424,
                            "end": 431
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 432,
                                    "end": 437
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
                                            "start": 439,
                                            "end": 441
                                        }
                                    },
                                    "loc": {
                                        "start": 439,
                                        "end": 441
                                    }
                                },
                                "loc": {
                                    "start": 439,
                                    "end": 442
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 432,
                                "end": 442
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 445,
                                "end": 451
                            }
                        },
                        "loc": {
                            "start": 445,
                            "end": 451
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 424,
                        "end": 451
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 454,
                            "end": 462
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "id",
                                "loc": {
                                    "start": 463,
                                    "end": 465
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
                                            "start": 467,
                                            "end": 469
                                        }
                                    },
                                    "loc": {
                                        "start": 467,
                                        "end": 469
                                    }
                                },
                                "loc": {
                                    "start": 467,
                                    "end": 470
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 463,
                                "end": 470
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Proposal",
                            "loc": {
                                "start": 473,
                                "end": 481
                            }
                        },
                        "loc": {
                            "start": 473,
                            "end": 481
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 454,
                        "end": 481
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposals",
                        "loc": {
                            "start": 484,
                            "end": 493
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "ids",
                                "loc": {
                                    "start": 494,
                                    "end": 497
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
                                                "start": 500,
                                                "end": 502
                                            }
                                        },
                                        "loc": {
                                            "start": 500,
                                            "end": 502
                                        }
                                    },
                                    "loc": {
                                        "start": 500,
                                        "end": 503
                                    }
                                },
                                "loc": {
                                    "start": 499,
                                    "end": 504
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 494,
                                "end": 504
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "isActive",
                                "loc": {
                                    "start": 506,
                                    "end": 514
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Boolean",
                                    "loc": {
                                        "start": 516,
                                        "end": 523
                                    }
                                },
                                "loc": {
                                    "start": 516,
                                    "end": 523
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 506,
                                "end": 523
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
                                    "start": 527,
                                    "end": 535
                                }
                            },
                            "loc": {
                                "start": 527,
                                "end": 535
                            }
                        },
                        "loc": {
                            "start": 526,
                            "end": 536
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 484,
                        "end": 536
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposalCount",
                        "loc": {
                            "start": 539,
                            "end": 552
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "isActive",
                                "loc": {
                                    "start": 553,
                                    "end": 561
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Boolean",
                                    "loc": {
                                        "start": 563,
                                        "end": 570
                                    }
                                },
                                "loc": {
                                    "start": 563,
                                    "end": 570
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 553,
                                "end": 570
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 573,
                                "end": 576
                            }
                        },
                        "loc": {
                            "start": 573,
                            "end": 576
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 539,
                        "end": 576
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 579,
                            "end": 595
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 596,
                                    "end": 607
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 609,
                                        "end": 612
                                    }
                                },
                                "loc": {
                                    "start": 609,
                                    "end": 612
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 596,
                                "end": 612
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 615,
                                "end": 631
                            }
                        },
                        "loc": {
                            "start": 615,
                            "end": 631
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 579,
                        "end": 631
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 634,
                            "end": 640
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
                                    "start": 643,
                                    "end": 648
                                }
                            },
                            "loc": {
                                "start": 643,
                                "end": 648
                            }
                        },
                        "loc": {
                            "start": 642,
                            "end": 649
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 634,
                        "end": 649
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 652,
                            "end": 662
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 664,
                                "end": 667
                            }
                        },
                        "loc": {
                            "start": 664,
                            "end": 667
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 652,
                        "end": 667
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 670,
                            "end": 681
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 682,
                                    "end": 687
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
                                            "start": 689,
                                            "end": 691
                                        }
                                    },
                                    "loc": {
                                        "start": 689,
                                        "end": 691
                                    }
                                },
                                "loc": {
                                    "start": 689,
                                    "end": 692
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 682,
                                "end": 692
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 694,
                                    "end": 705
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 707,
                                        "end": 710
                                    }
                                },
                                "loc": {
                                    "start": 707,
                                    "end": 710
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 694,
                                "end": 710
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 713,
                                "end": 724
                            }
                        },
                        "loc": {
                            "start": 713,
                            "end": 724
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 670,
                        "end": 724
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 727,
                            "end": 739
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 740,
                                    "end": 746
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
                                                "start": 749,
                                                "end": 751
                                            }
                                        },
                                        "loc": {
                                            "start": 749,
                                            "end": 751
                                        }
                                    },
                                    "loc": {
                                        "start": 749,
                                        "end": 752
                                    }
                                },
                                "loc": {
                                    "start": 748,
                                    "end": 753
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 740,
                                "end": 753
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 755,
                                    "end": 766
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 768,
                                        "end": 771
                                    }
                                },
                                "loc": {
                                    "start": 768,
                                    "end": 771
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 755,
                                "end": 771
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
                                    "start": 775,
                                    "end": 786
                                }
                            },
                            "loc": {
                                "start": 775,
                                "end": 786
                            }
                        },
                        "loc": {
                            "start": 774,
                            "end": 787
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 727,
                        "end": 787
                    }
                }
            ],
            "loc": {
                "start": 353,
                "end": 789
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingVault",
                "loc": {
                    "start": 796,
                    "end": 807
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
                            "start": 812,
                            "end": 819
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
                                    "start": 821,
                                    "end": 823
                                }
                            },
                            "loc": {
                                "start": 821,
                                "end": 823
                            }
                        },
                        "loc": {
                            "start": 821,
                            "end": 824
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 812,
                        "end": 824
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balance",
                        "loc": {
                            "start": 827,
                            "end": 834
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 835,
                                    "end": 840
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
                                            "start": 842,
                                            "end": 844
                                        }
                                    },
                                    "loc": {
                                        "start": 842,
                                        "end": 844
                                    }
                                },
                                "loc": {
                                    "start": 842,
                                    "end": 845
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 835,
                                "end": 845
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 848,
                                "end": 854
                            }
                        },
                        "loc": {
                            "start": 848,
                            "end": 854
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 827,
                        "end": 854
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 857,
                            "end": 873
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 874,
                                    "end": 885
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 887,
                                        "end": 890
                                    }
                                },
                                "loc": {
                                    "start": 887,
                                    "end": 890
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 874,
                                "end": 890
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 893,
                                "end": 909
                            }
                        },
                        "loc": {
                            "start": 893,
                            "end": 909
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 857,
                        "end": 909
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 912,
                            "end": 918
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
                                    "start": 921,
                                    "end": 926
                                }
                            },
                            "loc": {
                                "start": 921,
                                "end": 926
                            }
                        },
                        "loc": {
                            "start": 920,
                            "end": 927
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 912,
                        "end": 927
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 930,
                            "end": 940
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 942,
                                "end": 945
                            }
                        },
                        "loc": {
                            "start": 942,
                            "end": 945
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 930,
                        "end": 945
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 948,
                            "end": 959
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 960,
                                    "end": 965
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
                                            "start": 967,
                                            "end": 969
                                        }
                                    },
                                    "loc": {
                                        "start": 967,
                                        "end": 969
                                    }
                                },
                                "loc": {
                                    "start": 967,
                                    "end": 970
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 960,
                                "end": 970
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 972,
                                    "end": 983
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 985,
                                        "end": 988
                                    }
                                },
                                "loc": {
                                    "start": 985,
                                    "end": 988
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 972,
                                "end": 988
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 991,
                                "end": 1002
                            }
                        },
                        "loc": {
                            "start": 991,
                            "end": 1002
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 948,
                        "end": 1002
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1005,
                            "end": 1017
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1018,
                                    "end": 1024
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
                                                "start": 1027,
                                                "end": 1029
                                            }
                                        },
                                        "loc": {
                                            "start": 1027,
                                            "end": 1029
                                        }
                                    },
                                    "loc": {
                                        "start": 1027,
                                        "end": 1030
                                    }
                                },
                                "loc": {
                                    "start": 1026,
                                    "end": 1031
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1018,
                                "end": 1031
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 1033,
                                    "end": 1044
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1046,
                                        "end": 1049
                                    }
                                },
                                "loc": {
                                    "start": 1046,
                                    "end": 1049
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1033,
                                "end": 1049
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
                                    "start": 1053,
                                    "end": 1064
                                }
                            },
                            "loc": {
                                "start": 1053,
                                "end": 1064
                            }
                        },
                        "loc": {
                            "start": 1052,
                            "end": 1065
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1005,
                        "end": 1065
                    }
                }
            ],
            "loc": {
                "start": 791,
                "end": 1067
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Proposal",
                "loc": {
                    "start": 1074,
                    "end": 1082
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
                            "start": 1087,
                            "end": 1089
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
                                    "start": 1091,
                                    "end": 1093
                                }
                            },
                            "loc": {
                                "start": 1091,
                                "end": 1093
                            }
                        },
                        "loc": {
                            "start": 1091,
                            "end": 1094
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1087,
                        "end": 1094
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingContract",
                        "loc": {
                            "start": 1097,
                            "end": 1111
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
                                    "start": 1113,
                                    "end": 1127
                                }
                            },
                            "loc": {
                                "start": 1113,
                                "end": 1127
                            }
                        },
                        "loc": {
                            "start": 1113,
                            "end": 1128
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1097,
                        "end": 1128
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1131,
                            "end": 1145
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "created",
                        "loc": {
                            "start": 1148,
                            "end": 1155
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
                                    "start": 1157,
                                    "end": 1160
                                }
                            },
                            "loc": {
                                "start": 1157,
                                "end": 1160
                            }
                        },
                        "loc": {
                            "start": 1157,
                            "end": 1161
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1131,
                        "end": 1161
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1164,
                            "end": 1178
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "expiration",
                        "loc": {
                            "start": 1181,
                            "end": 1191
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
                                    "start": 1193,
                                    "end": 1196
                                }
                            },
                            "loc": {
                                "start": 1193,
                                "end": 1196
                            }
                        },
                        "loc": {
                            "start": 1193,
                            "end": 1197
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1164,
                        "end": 1197
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1200,
                            "end": 1214
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "unlock",
                        "loc": {
                            "start": 1217,
                            "end": 1223
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
                                    "start": 1225,
                                    "end": 1228
                                }
                            },
                            "loc": {
                                "start": 1225,
                                "end": 1228
                            }
                        },
                        "loc": {
                            "start": 1225,
                            "end": 1229
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1200,
                        "end": 1229
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Proposals are active during their voting period, i.e., from creation block up\nto expiration block. This will be false if the current block is later than the\nproposal's expiration.",
                        "block": true,
                        "loc": {
                            "start": 1232,
                            "end": 1427
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "isActive",
                        "loc": {
                            "start": 1430,
                            "end": 1438
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
                                    "start": 1440,
                                    "end": 1447
                                }
                            },
                            "loc": {
                                "start": 1440,
                                "end": 1447
                            }
                        },
                        "loc": {
                            "start": 1440,
                            "end": 1448
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1232,
                        "end": 1448
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isExecuted",
                        "loc": {
                            "start": 1451,
                            "end": 1461
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1463,
                                "end": 1470
                            }
                        },
                        "loc": {
                            "start": 1463,
                            "end": 1470
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1451,
                        "end": 1470
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1473,
                            "end": 1487
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "lastCall",
                        "loc": {
                            "start": 1490,
                            "end": 1498
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1500,
                                "end": 1503
                            }
                        },
                        "loc": {
                            "start": 1500,
                            "end": 1503
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1473,
                        "end": 1503
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "quorum",
                        "loc": {
                            "start": 1506,
                            "end": 1512
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1514,
                                "end": 1520
                            }
                        },
                        "loc": {
                            "start": 1514,
                            "end": 1520
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1506,
                        "end": 1520
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1523,
                            "end": 1527
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1528,
                                    "end": 1533
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
                            "directives": [],
                            "loc": {
                                "start": 1528,
                                "end": 1538
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1541,
                                "end": 1545
                            }
                        },
                        "loc": {
                            "start": 1541,
                            "end": 1545
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1523,
                        "end": 1545
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 1548,
                            "end": 1554
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
                                    "start": 1557,
                                    "end": 1562
                                }
                            },
                            "loc": {
                                "start": 1557,
                                "end": 1562
                            }
                        },
                        "loc": {
                            "start": 1556,
                            "end": 1563
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1548,
                        "end": 1563
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 1566,
                            "end": 1576
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1578,
                                "end": 1581
                            }
                        },
                        "loc": {
                            "start": 1578,
                            "end": 1581
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1566,
                        "end": 1581
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1584,
                            "end": 1589
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1590,
                                    "end": 1596
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
                                                "start": 1599,
                                                "end": 1601
                                            }
                                        },
                                        "loc": {
                                            "start": 1599,
                                            "end": 1601
                                        }
                                    },
                                    "loc": {
                                        "start": 1599,
                                        "end": 1602
                                    }
                                },
                                "loc": {
                                    "start": 1598,
                                    "end": 1603
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1590,
                                "end": 1603
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
                                    "start": 1607,
                                    "end": 1611
                                }
                            },
                            "loc": {
                                "start": 1607,
                                "end": 1611
                            }
                        },
                        "loc": {
                            "start": 1606,
                            "end": 1612
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1584,
                        "end": 1612
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1615,
                            "end": 1626
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1627,
                                    "end": 1632
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
                                            "start": 1634,
                                            "end": 1636
                                        }
                                    },
                                    "loc": {
                                        "start": 1634,
                                        "end": 1636
                                    }
                                },
                                "loc": {
                                    "start": 1634,
                                    "end": 1637
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1627,
                                "end": 1637
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1640,
                                "end": 1651
                            }
                        },
                        "loc": {
                            "start": 1640,
                            "end": 1651
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1615,
                        "end": 1651
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1654,
                            "end": 1666
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1667,
                                    "end": 1673
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
                                                "start": 1676,
                                                "end": 1678
                                            }
                                        },
                                        "loc": {
                                            "start": 1676,
                                            "end": 1678
                                        }
                                    },
                                    "loc": {
                                        "start": 1676,
                                        "end": 1679
                                    }
                                },
                                "loc": {
                                    "start": 1675,
                                    "end": 1680
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1667,
                                "end": 1680
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
                                    "start": 1684,
                                    "end": 1695
                                }
                            },
                            "loc": {
                                "start": 1684,
                                "end": 1695
                            }
                        },
                        "loc": {
                            "start": 1683,
                            "end": 1696
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1654,
                        "end": 1696
                    }
                }
            ],
            "loc": {
                "start": 1069,
                "end": 1698
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Vote",
                "loc": {
                    "start": 1705,
                    "end": 1709
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
                            "start": 1714,
                            "end": 1719
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
                                    "start": 1721,
                                    "end": 1726
                                }
                            },
                            "loc": {
                                "start": 1721,
                                "end": 1726
                            }
                        },
                        "loc": {
                            "start": 1721,
                            "end": 1727
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1714,
                        "end": 1727
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "power",
                        "loc": {
                            "start": 1730,
                            "end": 1735
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
                                    "start": 1737,
                                    "end": 1743
                                }
                            },
                            "loc": {
                                "start": 1737,
                                "end": 1743
                            }
                        },
                        "loc": {
                            "start": 1737,
                            "end": 1744
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1730,
                        "end": 1744
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 1747,
                            "end": 1755
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
                                    "start": 1757,
                                    "end": 1765
                                }
                            },
                            "loc": {
                                "start": 1757,
                                "end": 1765
                            }
                        },
                        "loc": {
                            "start": 1757,
                            "end": 1766
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1747,
                        "end": 1766
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "castBallot",
                        "loc": {
                            "start": 1769,
                            "end": 1779
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Ballot",
                            "loc": {
                                "start": 1781,
                                "end": 1787
                            }
                        },
                        "loc": {
                            "start": 1781,
                            "end": 1787
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1769,
                        "end": 1787
                    }
                }
            ],
            "loc": {
                "start": 1700,
                "end": 1789
            }
        },
        {
            "kind": "EnumTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Ballot",
                "loc": {
                    "start": 1796,
                    "end": 1802
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
                            "start": 1807,
                            "end": 1810
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1807,
                        "end": 1810
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "No",
                        "loc": {
                            "start": 1813,
                            "end": 1815
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1813,
                        "end": 1815
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "Abstain",
                        "loc": {
                            "start": 1818,
                            "end": 1825
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1818,
                        "end": 1825
                    }
                }
            ],
            "loc": {
                "start": 1791,
                "end": 1827
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingPower",
                "loc": {
                    "start": 1834,
                    "end": 1845
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
                            "start": 1850,
                            "end": 1861
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
                                    "start": 1863,
                                    "end": 1866
                                }
                            },
                            "loc": {
                                "start": 1863,
                                "end": 1866
                            }
                        },
                        "loc": {
                            "start": 1863,
                            "end": 1867
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1850,
                        "end": 1867
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1870,
                            "end": 1875
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
                                    "start": 1877,
                                    "end": 1883
                                }
                            },
                            "loc": {
                                "start": 1877,
                                "end": 1883
                            }
                        },
                        "loc": {
                            "start": 1877,
                            "end": 1884
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1870,
                        "end": 1884
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 1887,
                            "end": 1892
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
                                    "start": 1894,
                                    "end": 1899
                                }
                            },
                            "loc": {
                                "start": 1894,
                                "end": 1899
                            }
                        },
                        "loc": {
                            "start": 1894,
                            "end": 1900
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1887,
                        "end": 1900
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1903,
                            "end": 1915
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
                                            "start": 1918,
                                            "end": 1929
                                        }
                                    },
                                    "loc": {
                                        "start": 1918,
                                        "end": 1929
                                    }
                                },
                                "loc": {
                                    "start": 1918,
                                    "end": 1930
                                }
                            },
                            "loc": {
                                "start": 1917,
                                "end": 1931
                            }
                        },
                        "loc": {
                            "start": 1917,
                            "end": 1932
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1903,
                        "end": 1932
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isStale",
                        "loc": {
                            "start": 1935,
                            "end": 1942
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1944,
                                "end": 1951
                            }
                        },
                        "loc": {
                            "start": 1944,
                            "end": 1951
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1935,
                        "end": 1951
                    }
                }
            ],
            "loc": {
                "start": 1829,
                "end": 1953
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "TotalVotingPower",
                "loc": {
                    "start": 1960,
                    "end": 1976
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
                            "start": 1981,
                            "end": 1992
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
                                    "start": 1994,
                                    "end": 1997
                                }
                            },
                            "loc": {
                                "start": 1994,
                                "end": 1997
                            }
                        },
                        "loc": {
                            "start": 1994,
                            "end": 1998
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1981,
                        "end": 1998
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 2001,
                            "end": 2006
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
                                    "start": 2008,
                                    "end": 2014
                                }
                            },
                            "loc": {
                                "start": 2008,
                                "end": 2014
                            }
                        },
                        "loc": {
                            "start": 2008,
                            "end": 2015
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2001,
                        "end": 2015
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 2018,
                            "end": 2030
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
                                            "start": 2033,
                                            "end": 2044
                                        }
                                    },
                                    "loc": {
                                        "start": 2033,
                                        "end": 2044
                                    }
                                },
                                "loc": {
                                    "start": 2033,
                                    "end": 2045
                                }
                            },
                            "loc": {
                                "start": 2032,
                                "end": 2046
                            }
                        },
                        "loc": {
                            "start": 2032,
                            "end": 2047
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2018,
                        "end": 2047
                    }
                }
            ],
            "loc": {
                "start": 1955,
                "end": 2049
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Voter",
                "loc": {
                    "start": 2056,
                    "end": 2061
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
                            "start": 2066,
                            "end": 2073
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
                                    "start": 2075,
                                    "end": 2077
                                }
                            },
                            "loc": {
                                "start": 2075,
                                "end": 2077
                            }
                        },
                        "loc": {
                            "start": 2075,
                            "end": 2078
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2066,
                        "end": 2078
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balance",
                        "loc": {
                            "start": 2081,
                            "end": 2088
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVault",
                                "loc": {
                                    "start": 2089,
                                    "end": 2100
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
                                            "start": 2102,
                                            "end": 2104
                                        }
                                    },
                                    "loc": {
                                        "start": 2102,
                                        "end": 2104
                                    }
                                },
                                "loc": {
                                    "start": 2102,
                                    "end": 2105
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2089,
                                "end": 2105
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2108,
                                "end": 2114
                            }
                        },
                        "loc": {
                            "start": 2108,
                            "end": 2114
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2081,
                        "end": 2114
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balances",
                        "loc": {
                            "start": 2117,
                            "end": 2125
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 2126,
                                    "end": 2138
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
                                                    "start": 2141,
                                                    "end": 2143
                                                }
                                            },
                                            "loc": {
                                                "start": 2141,
                                                "end": 2143
                                            }
                                        },
                                        "loc": {
                                            "start": 2141,
                                            "end": 2144
                                        }
                                    },
                                    "loc": {
                                        "start": 2140,
                                        "end": 2145
                                    }
                                },
                                "loc": {
                                    "start": 2140,
                                    "end": 2146
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2126,
                                "end": 2146
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
                                    "start": 2150,
                                    "end": 2156
                                }
                            },
                            "loc": {
                                "start": 2150,
                                "end": 2156
                            }
                        },
                        "loc": {
                            "start": 2149,
                            "end": 2157
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2117,
                        "end": 2157
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "ensName",
                        "loc": {
                            "start": 2160,
                            "end": 2167
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2169,
                                "end": 2175
                            }
                        },
                        "loc": {
                            "start": 2169,
                            "end": 2175
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2160,
                        "end": 2175
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 2178,
                            "end": 2182
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposal",
                                "loc": {
                                    "start": 2183,
                                    "end": 2191
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
                                            "start": 2193,
                                            "end": 2195
                                        }
                                    },
                                    "loc": {
                                        "start": 2193,
                                        "end": 2195
                                    }
                                },
                                "loc": {
                                    "start": 2193,
                                    "end": 2196
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2183,
                                "end": 2196
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 2198,
                                    "end": 2212
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
                                            "start": 2214,
                                            "end": 2216
                                        }
                                    },
                                    "loc": {
                                        "start": 2214,
                                        "end": 2216
                                    }
                                },
                                "loc": {
                                    "start": 2214,
                                    "end": 2217
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2198,
                                "end": 2217
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 2220,
                                "end": 2224
                            }
                        },
                        "loc": {
                            "start": 2220,
                            "end": 2224
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2178,
                        "end": 2224
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 2227,
                            "end": 2232
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposals",
                                "loc": {
                                    "start": 2233,
                                    "end": 2242
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
                                                    "start": 2245,
                                                    "end": 2247
                                                }
                                            },
                                            "loc": {
                                                "start": 2245,
                                                "end": 2247
                                            }
                                        },
                                        "loc": {
                                            "start": 2245,
                                            "end": 2248
                                        }
                                    },
                                    "loc": {
                                        "start": 2244,
                                        "end": 2249
                                    }
                                },
                                "loc": {
                                    "start": 2244,
                                    "end": 2250
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2233,
                                "end": 2250
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 2252,
                                    "end": 2266
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
                                            "start": 2268,
                                            "end": 2270
                                        }
                                    },
                                    "loc": {
                                        "start": 2268,
                                        "end": 2270
                                    }
                                },
                                "loc": {
                                    "start": 2268,
                                    "end": 2271
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2252,
                                "end": 2271
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
                                    "start": 2275,
                                    "end": 2279
                                }
                            },
                            "loc": {
                                "start": 2275,
                                "end": 2279
                            }
                        },
                        "loc": {
                            "start": 2274,
                            "end": 2280
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2227,
                        "end": 2280
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 2283,
                            "end": 2294
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVault",
                                "loc": {
                                    "start": 2295,
                                    "end": 2306
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
                                            "start": 2308,
                                            "end": 2310
                                        }
                                    },
                                    "loc": {
                                        "start": 2308,
                                        "end": 2310
                                    }
                                },
                                "loc": {
                                    "start": 2308,
                                    "end": 2311
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2295,
                                "end": 2311
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 2313,
                                    "end": 2324
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 2326,
                                        "end": 2329
                                    }
                                },
                                "loc": {
                                    "start": 2326,
                                    "end": 2329
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2313,
                                "end": 2329
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 2332,
                                "end": 2343
                            }
                        },
                        "loc": {
                            "start": 2332,
                            "end": 2343
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2283,
                        "end": 2343
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 2346,
                            "end": 2358
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 2359,
                                    "end": 2371
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
                                                    "start": 2374,
                                                    "end": 2376
                                                }
                                            },
                                            "loc": {
                                                "start": 2374,
                                                "end": 2376
                                            }
                                        },
                                        "loc": {
                                            "start": 2374,
                                            "end": 2377
                                        }
                                    },
                                    "loc": {
                                        "start": 2373,
                                        "end": 2378
                                    }
                                },
                                "loc": {
                                    "start": 2373,
                                    "end": 2379
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2359,
                                "end": 2379
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 2381,
                                    "end": 2392
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 2394,
                                        "end": 2397
                                    }
                                },
                                "loc": {
                                    "start": 2394,
                                    "end": 2397
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2381,
                                "end": 2397
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
                                    "start": 2401,
                                    "end": 2412
                                }
                            },
                            "loc": {
                                "start": 2401,
                                "end": 2412
                            }
                        },
                        "loc": {
                            "start": 2400,
                            "end": 2413
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2346,
                        "end": 2413
                    }
                }
            ],
            "loc": {
                "start": 2051,
                "end": 2415
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 2416
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
