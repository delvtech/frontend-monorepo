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
        const validVaults = [];
        for (const vault of votingVaults){
            const { address: address  } = vault;
            const dataSource = (0, $9f0462f0c4e483f9$export$2c8942c776a655d1)(address, councilDataSources);
            if (dataSource) {
                const vaultPower = await dataSource.getVotingPowerView(voter.address, blockNumber);
                aggregateValue += BigInt(vaultPower);
                validVaults.push(vault);
            }
        }
        return {
            value: (0, $1RIJT$etherslibutils.formatEther)(aggregateValue),
            voter: voter,
            votingVaults: validVaults,
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
        voters: async (_, { addresses: addresses , search: search , votingPowerMin: votingPowerMin , votingPowerMax: votingPowerMax , votingVaults: votingVaults  }, context)=>{
            const filteredVoters = [];
            let voters = [];
            if (addresses) voters = await (0, $ececcc37bb5e5066$export$e424928527fab42f).getByAddresses({
                addresses: addresses
            });
            else voters = await (0, $ececcc37bb5e5066$export$e424928527fab42f).getAll({
                context: context
            });
            if (search || votingPowerMin || votingPowerMax) {
                let vaults;
                for (let voter of voters){
                    if (!voter) continue;
                    // Get ensName of voter
                    if (search) {
                        const ensName = await (0, $ececcc37bb5e5066$export$e424928527fab42f).getEnsName({
                            voter: voter,
                            context: context
                        });
                        voter = {
                            ...voter,
                            ensName: ensName
                        };
                    }
                    // Get votingPower of voter
                    if (votingPowerMin || votingPowerMax) {
                        if (votingVaults) vaults = (0, $6e80fa9dbf1dc463$export$1dbe110119cb4dd2).getByAddresses({
                            addresses: votingVaults,
                            context: context
                        }).filter((vault)=>vault !== undefined);
                        else vaults = (0, $6e80fa9dbf1dc463$export$1dbe110119cb4dd2).getAll({
                            context: context
                        });
                        const votingPower = await (0, $7f716b31368ced62$export$a0cbbdeeb12308cd).getByVoter({
                            voter: voter,
                            votingVaults: vaults,
                            context: context
                        });
                        voter = {
                            ...voter,
                            votingPower: votingPower
                        };
                    }
                    let searchCondition = true;
                    let votingPowerCondition = true;
                    if (search) // Check whether current voter passes search filter
                    searchCondition = !!(0, $1RIJT$fuzzaldrin.filter)([
                        voter.ensName || "",
                        voter.address
                    ], search).length;
                    if (votingPowerMin || votingPowerMax) {
                        // Check whether current voter passes votingPower filter(s)
                        const votingPower = Number(voter.votingPower?.value || 0);
                        const minimum = Number(votingPowerMin || 0);
                        const maximum = Number(votingPowerMax || Infinity);
                        votingPowerCondition = minimum < votingPower && maximum > votingPower;
                    }
                    if (searchCondition && votingPowerCondition) filteredVoters.push(voter);
                }
            } else return voters.map((voter)=>voter || null);
            return filteredVoters;
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
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 340,
                                    "end": 352
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
                                                "start": 355,
                                                "end": 357
                                            }
                                        },
                                        "loc": {
                                            "start": 355,
                                            "end": 357
                                        }
                                    },
                                    "loc": {
                                        "start": 355,
                                        "end": 358
                                    }
                                },
                                "loc": {
                                    "start": 354,
                                    "end": 359
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 340,
                                "end": 359
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
                                        "start": 366,
                                        "end": 371
                                    }
                                },
                                "loc": {
                                    "start": 366,
                                    "end": 371
                                }
                            },
                            "loc": {
                                "start": 365,
                                "end": 372
                            }
                        },
                        "loc": {
                            "start": 365,
                            "end": 373
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 234,
                        "end": 373
                    }
                }
            ],
            "loc": {
                "start": 0,
                "end": 375
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingContract",
                "loc": {
                    "start": 382,
                    "end": 396
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
                            "start": 401,
                            "end": 408
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
                                    "start": 410,
                                    "end": 412
                                }
                            },
                            "loc": {
                                "start": 410,
                                "end": 412
                            }
                        },
                        "loc": {
                            "start": 410,
                            "end": 413
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 401,
                        "end": 413
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 416,
                            "end": 428
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
                                            "start": 431,
                                            "end": 442
                                        }
                                    },
                                    "loc": {
                                        "start": 431,
                                        "end": 442
                                    }
                                },
                                "loc": {
                                    "start": 431,
                                    "end": 443
                                }
                            },
                            "loc": {
                                "start": 430,
                                "end": 444
                            }
                        },
                        "loc": {
                            "start": 430,
                            "end": 445
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 416,
                        "end": 445
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balance",
                        "loc": {
                            "start": 448,
                            "end": 455
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 456,
                                    "end": 461
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
                                            "start": 463,
                                            "end": 465
                                        }
                                    },
                                    "loc": {
                                        "start": 463,
                                        "end": 465
                                    }
                                },
                                "loc": {
                                    "start": 463,
                                    "end": 466
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 456,
                                "end": 466
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 469,
                                "end": 475
                            }
                        },
                        "loc": {
                            "start": 469,
                            "end": 475
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 448,
                        "end": 475
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 478,
                            "end": 486
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "id",
                                "loc": {
                                    "start": 487,
                                    "end": 489
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
                                            "start": 491,
                                            "end": 493
                                        }
                                    },
                                    "loc": {
                                        "start": 491,
                                        "end": 493
                                    }
                                },
                                "loc": {
                                    "start": 491,
                                    "end": 494
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 487,
                                "end": 494
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Proposal",
                            "loc": {
                                "start": 497,
                                "end": 505
                            }
                        },
                        "loc": {
                            "start": 497,
                            "end": 505
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 478,
                        "end": 505
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposals",
                        "loc": {
                            "start": 508,
                            "end": 517
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "ids",
                                "loc": {
                                    "start": 518,
                                    "end": 521
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
                                                "start": 524,
                                                "end": 526
                                            }
                                        },
                                        "loc": {
                                            "start": 524,
                                            "end": 526
                                        }
                                    },
                                    "loc": {
                                        "start": 524,
                                        "end": 527
                                    }
                                },
                                "loc": {
                                    "start": 523,
                                    "end": 528
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 518,
                                "end": 528
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "isActive",
                                "loc": {
                                    "start": 530,
                                    "end": 538
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Boolean",
                                    "loc": {
                                        "start": 540,
                                        "end": 547
                                    }
                                },
                                "loc": {
                                    "start": 540,
                                    "end": 547
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 530,
                                "end": 547
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
                                    "start": 551,
                                    "end": 559
                                }
                            },
                            "loc": {
                                "start": 551,
                                "end": 559
                            }
                        },
                        "loc": {
                            "start": 550,
                            "end": 560
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 508,
                        "end": 560
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposalCount",
                        "loc": {
                            "start": 563,
                            "end": 576
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "isActive",
                                "loc": {
                                    "start": 577,
                                    "end": 585
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Boolean",
                                    "loc": {
                                        "start": 587,
                                        "end": 594
                                    }
                                },
                                "loc": {
                                    "start": 587,
                                    "end": 594
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 577,
                                "end": 594
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 597,
                                "end": 600
                            }
                        },
                        "loc": {
                            "start": 597,
                            "end": 600
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 563,
                        "end": 600
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 603,
                            "end": 619
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 620,
                                    "end": 631
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 633,
                                        "end": 636
                                    }
                                },
                                "loc": {
                                    "start": 633,
                                    "end": 636
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 620,
                                "end": 636
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 639,
                                "end": 655
                            }
                        },
                        "loc": {
                            "start": 639,
                            "end": 655
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 603,
                        "end": 655
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 658,
                            "end": 664
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
                                    "start": 667,
                                    "end": 672
                                }
                            },
                            "loc": {
                                "start": 667,
                                "end": 672
                            }
                        },
                        "loc": {
                            "start": 666,
                            "end": 673
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 658,
                        "end": 673
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 676,
                            "end": 686
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 688,
                                "end": 691
                            }
                        },
                        "loc": {
                            "start": 688,
                            "end": 691
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 676,
                        "end": 691
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 694,
                            "end": 705
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 706,
                                    "end": 711
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
                                            "start": 713,
                                            "end": 715
                                        }
                                    },
                                    "loc": {
                                        "start": 713,
                                        "end": 715
                                    }
                                },
                                "loc": {
                                    "start": 713,
                                    "end": 716
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 706,
                                "end": 716
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 718,
                                    "end": 729
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 731,
                                        "end": 734
                                    }
                                },
                                "loc": {
                                    "start": 731,
                                    "end": 734
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 718,
                                "end": 734
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 737,
                                "end": 748
                            }
                        },
                        "loc": {
                            "start": 737,
                            "end": 748
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 694,
                        "end": 748
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 751,
                            "end": 763
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 764,
                                    "end": 770
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
                                                "start": 773,
                                                "end": 775
                                            }
                                        },
                                        "loc": {
                                            "start": 773,
                                            "end": 775
                                        }
                                    },
                                    "loc": {
                                        "start": 773,
                                        "end": 776
                                    }
                                },
                                "loc": {
                                    "start": 772,
                                    "end": 777
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 764,
                                "end": 777
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 779,
                                    "end": 790
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 792,
                                        "end": 795
                                    }
                                },
                                "loc": {
                                    "start": 792,
                                    "end": 795
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 779,
                                "end": 795
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
                                    "start": 799,
                                    "end": 810
                                }
                            },
                            "loc": {
                                "start": 799,
                                "end": 810
                            }
                        },
                        "loc": {
                            "start": 798,
                            "end": 811
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 751,
                        "end": 811
                    }
                }
            ],
            "loc": {
                "start": 377,
                "end": 813
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingVault",
                "loc": {
                    "start": 820,
                    "end": 831
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
                            "start": 836,
                            "end": 843
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
                                    "start": 845,
                                    "end": 847
                                }
                            },
                            "loc": {
                                "start": 845,
                                "end": 847
                            }
                        },
                        "loc": {
                            "start": 845,
                            "end": 848
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 836,
                        "end": 848
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balance",
                        "loc": {
                            "start": 851,
                            "end": 858
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 859,
                                    "end": 864
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
                                            "start": 866,
                                            "end": 868
                                        }
                                    },
                                    "loc": {
                                        "start": 866,
                                        "end": 868
                                    }
                                },
                                "loc": {
                                    "start": 866,
                                    "end": 869
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 859,
                                "end": 869
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 872,
                                "end": 878
                            }
                        },
                        "loc": {
                            "start": 872,
                            "end": 878
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 851,
                        "end": 878
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 881,
                            "end": 897
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 898,
                                    "end": 909
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 911,
                                        "end": 914
                                    }
                                },
                                "loc": {
                                    "start": 911,
                                    "end": 914
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 898,
                                "end": 914
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 917,
                                "end": 933
                            }
                        },
                        "loc": {
                            "start": 917,
                            "end": 933
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 881,
                        "end": 933
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 936,
                            "end": 942
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
                                    "start": 945,
                                    "end": 950
                                }
                            },
                            "loc": {
                                "start": 945,
                                "end": 950
                            }
                        },
                        "loc": {
                            "start": 944,
                            "end": 951
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 936,
                        "end": 951
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 954,
                            "end": 964
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 966,
                                "end": 969
                            }
                        },
                        "loc": {
                            "start": 966,
                            "end": 969
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 954,
                        "end": 969
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 972,
                            "end": 983
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 984,
                                    "end": 989
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
                                            "start": 991,
                                            "end": 993
                                        }
                                    },
                                    "loc": {
                                        "start": 991,
                                        "end": 993
                                    }
                                },
                                "loc": {
                                    "start": 991,
                                    "end": 994
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 984,
                                "end": 994
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 996,
                                    "end": 1007
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1009,
                                        "end": 1012
                                    }
                                },
                                "loc": {
                                    "start": 1009,
                                    "end": 1012
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 996,
                                "end": 1012
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1015,
                                "end": 1026
                            }
                        },
                        "loc": {
                            "start": 1015,
                            "end": 1026
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 972,
                        "end": 1026
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1029,
                            "end": 1041
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1042,
                                    "end": 1048
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
                                                "start": 1051,
                                                "end": 1053
                                            }
                                        },
                                        "loc": {
                                            "start": 1051,
                                            "end": 1053
                                        }
                                    },
                                    "loc": {
                                        "start": 1051,
                                        "end": 1054
                                    }
                                },
                                "loc": {
                                    "start": 1050,
                                    "end": 1055
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1042,
                                "end": 1055
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 1057,
                                    "end": 1068
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1070,
                                        "end": 1073
                                    }
                                },
                                "loc": {
                                    "start": 1070,
                                    "end": 1073
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1057,
                                "end": 1073
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
                                    "start": 1077,
                                    "end": 1088
                                }
                            },
                            "loc": {
                                "start": 1077,
                                "end": 1088
                            }
                        },
                        "loc": {
                            "start": 1076,
                            "end": 1089
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1029,
                        "end": 1089
                    }
                }
            ],
            "loc": {
                "start": 815,
                "end": 1091
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Proposal",
                "loc": {
                    "start": 1098,
                    "end": 1106
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
                            "start": 1111,
                            "end": 1113
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
                                    "start": 1115,
                                    "end": 1117
                                }
                            },
                            "loc": {
                                "start": 1115,
                                "end": 1117
                            }
                        },
                        "loc": {
                            "start": 1115,
                            "end": 1118
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1111,
                        "end": 1118
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingContract",
                        "loc": {
                            "start": 1121,
                            "end": 1135
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
                                    "start": 1137,
                                    "end": 1151
                                }
                            },
                            "loc": {
                                "start": 1137,
                                "end": 1151
                            }
                        },
                        "loc": {
                            "start": 1137,
                            "end": 1152
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1121,
                        "end": 1152
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1155,
                            "end": 1169
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "created",
                        "loc": {
                            "start": 1172,
                            "end": 1179
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
                                    "start": 1181,
                                    "end": 1184
                                }
                            },
                            "loc": {
                                "start": 1181,
                                "end": 1184
                            }
                        },
                        "loc": {
                            "start": 1181,
                            "end": 1185
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1155,
                        "end": 1185
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1188,
                            "end": 1202
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "expiration",
                        "loc": {
                            "start": 1205,
                            "end": 1215
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
                                    "start": 1217,
                                    "end": 1220
                                }
                            },
                            "loc": {
                                "start": 1217,
                                "end": 1220
                            }
                        },
                        "loc": {
                            "start": 1217,
                            "end": 1221
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1188,
                        "end": 1221
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1224,
                            "end": 1238
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "unlock",
                        "loc": {
                            "start": 1241,
                            "end": 1247
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
                                    "start": 1249,
                                    "end": 1252
                                }
                            },
                            "loc": {
                                "start": 1249,
                                "end": 1252
                            }
                        },
                        "loc": {
                            "start": 1249,
                            "end": 1253
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1224,
                        "end": 1253
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Proposals are active during their voting period, i.e., from creation block up\nto expiration block. This will be false if the current block is later than the\nproposal's expiration.",
                        "block": true,
                        "loc": {
                            "start": 1256,
                            "end": 1451
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "isActive",
                        "loc": {
                            "start": 1454,
                            "end": 1462
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
                                    "start": 1464,
                                    "end": 1471
                                }
                            },
                            "loc": {
                                "start": 1464,
                                "end": 1471
                            }
                        },
                        "loc": {
                            "start": 1464,
                            "end": 1472
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1256,
                        "end": 1472
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isExecuted",
                        "loc": {
                            "start": 1475,
                            "end": 1485
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1487,
                                "end": 1494
                            }
                        },
                        "loc": {
                            "start": 1487,
                            "end": 1494
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1475,
                        "end": 1494
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1497,
                            "end": 1511
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "lastCall",
                        "loc": {
                            "start": 1514,
                            "end": 1522
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1524,
                                "end": 1527
                            }
                        },
                        "loc": {
                            "start": 1524,
                            "end": 1527
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1497,
                        "end": 1527
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "quorum",
                        "loc": {
                            "start": 1530,
                            "end": 1536
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1538,
                                "end": 1544
                            }
                        },
                        "loc": {
                            "start": 1538,
                            "end": 1544
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1530,
                        "end": 1544
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1547,
                            "end": 1551
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1552,
                                    "end": 1557
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
                                            "start": 1559,
                                            "end": 1561
                                        }
                                    },
                                    "loc": {
                                        "start": 1559,
                                        "end": 1561
                                    }
                                },
                                "loc": {
                                    "start": 1559,
                                    "end": 1562
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1552,
                                "end": 1562
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1565,
                                "end": 1569
                            }
                        },
                        "loc": {
                            "start": 1565,
                            "end": 1569
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1547,
                        "end": 1569
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 1572,
                            "end": 1578
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
                                    "start": 1581,
                                    "end": 1586
                                }
                            },
                            "loc": {
                                "start": 1581,
                                "end": 1586
                            }
                        },
                        "loc": {
                            "start": 1580,
                            "end": 1587
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1572,
                        "end": 1587
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 1590,
                            "end": 1600
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1602,
                                "end": 1605
                            }
                        },
                        "loc": {
                            "start": 1602,
                            "end": 1605
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1590,
                        "end": 1605
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1608,
                            "end": 1613
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1614,
                                    "end": 1620
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
                                                "start": 1623,
                                                "end": 1625
                                            }
                                        },
                                        "loc": {
                                            "start": 1623,
                                            "end": 1625
                                        }
                                    },
                                    "loc": {
                                        "start": 1623,
                                        "end": 1626
                                    }
                                },
                                "loc": {
                                    "start": 1622,
                                    "end": 1627
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1614,
                                "end": 1627
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
                                    "start": 1631,
                                    "end": 1635
                                }
                            },
                            "loc": {
                                "start": 1631,
                                "end": 1635
                            }
                        },
                        "loc": {
                            "start": 1630,
                            "end": 1636
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1608,
                        "end": 1636
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1639,
                            "end": 1650
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1651,
                                    "end": 1656
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
                                            "start": 1658,
                                            "end": 1660
                                        }
                                    },
                                    "loc": {
                                        "start": 1658,
                                        "end": 1660
                                    }
                                },
                                "loc": {
                                    "start": 1658,
                                    "end": 1661
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1651,
                                "end": 1661
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1664,
                                "end": 1675
                            }
                        },
                        "loc": {
                            "start": 1664,
                            "end": 1675
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1639,
                        "end": 1675
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1678,
                            "end": 1690
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1691,
                                    "end": 1697
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
                                                "start": 1700,
                                                "end": 1702
                                            }
                                        },
                                        "loc": {
                                            "start": 1700,
                                            "end": 1702
                                        }
                                    },
                                    "loc": {
                                        "start": 1700,
                                        "end": 1703
                                    }
                                },
                                "loc": {
                                    "start": 1699,
                                    "end": 1704
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1691,
                                "end": 1704
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
                                    "start": 1708,
                                    "end": 1719
                                }
                            },
                            "loc": {
                                "start": 1708,
                                "end": 1719
                            }
                        },
                        "loc": {
                            "start": 1707,
                            "end": 1720
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1678,
                        "end": 1720
                    }
                }
            ],
            "loc": {
                "start": 1093,
                "end": 1722
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Vote",
                "loc": {
                    "start": 1729,
                    "end": 1733
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
                            "start": 1738,
                            "end": 1743
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
                                    "start": 1745,
                                    "end": 1750
                                }
                            },
                            "loc": {
                                "start": 1745,
                                "end": 1750
                            }
                        },
                        "loc": {
                            "start": 1745,
                            "end": 1751
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1738,
                        "end": 1751
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "power",
                        "loc": {
                            "start": 1754,
                            "end": 1759
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
                                    "start": 1761,
                                    "end": 1767
                                }
                            },
                            "loc": {
                                "start": 1761,
                                "end": 1767
                            }
                        },
                        "loc": {
                            "start": 1761,
                            "end": 1768
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1754,
                        "end": 1768
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 1771,
                            "end": 1779
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
                                    "start": 1781,
                                    "end": 1789
                                }
                            },
                            "loc": {
                                "start": 1781,
                                "end": 1789
                            }
                        },
                        "loc": {
                            "start": 1781,
                            "end": 1790
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1771,
                        "end": 1790
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "castBallot",
                        "loc": {
                            "start": 1793,
                            "end": 1803
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Ballot",
                            "loc": {
                                "start": 1805,
                                "end": 1811
                            }
                        },
                        "loc": {
                            "start": 1805,
                            "end": 1811
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1793,
                        "end": 1811
                    }
                }
            ],
            "loc": {
                "start": 1724,
                "end": 1813
            }
        },
        {
            "kind": "EnumTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Ballot",
                "loc": {
                    "start": 1820,
                    "end": 1826
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
                            "start": 1831,
                            "end": 1834
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1831,
                        "end": 1834
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "No",
                        "loc": {
                            "start": 1837,
                            "end": 1839
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1837,
                        "end": 1839
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "Abstain",
                        "loc": {
                            "start": 1842,
                            "end": 1849
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1842,
                        "end": 1849
                    }
                }
            ],
            "loc": {
                "start": 1815,
                "end": 1851
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingPower",
                "loc": {
                    "start": 1858,
                    "end": 1869
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
                            "start": 1874,
                            "end": 1885
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
                                    "start": 1887,
                                    "end": 1890
                                }
                            },
                            "loc": {
                                "start": 1887,
                                "end": 1890
                            }
                        },
                        "loc": {
                            "start": 1887,
                            "end": 1891
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1874,
                        "end": 1891
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1894,
                            "end": 1899
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
                                    "start": 1901,
                                    "end": 1907
                                }
                            },
                            "loc": {
                                "start": 1901,
                                "end": 1907
                            }
                        },
                        "loc": {
                            "start": 1901,
                            "end": 1908
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1894,
                        "end": 1908
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 1911,
                            "end": 1916
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
                                    "start": 1918,
                                    "end": 1923
                                }
                            },
                            "loc": {
                                "start": 1918,
                                "end": 1923
                            }
                        },
                        "loc": {
                            "start": 1918,
                            "end": 1924
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1911,
                        "end": 1924
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1927,
                            "end": 1939
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
                                            "start": 1942,
                                            "end": 1953
                                        }
                                    },
                                    "loc": {
                                        "start": 1942,
                                        "end": 1953
                                    }
                                },
                                "loc": {
                                    "start": 1942,
                                    "end": 1954
                                }
                            },
                            "loc": {
                                "start": 1941,
                                "end": 1955
                            }
                        },
                        "loc": {
                            "start": 1941,
                            "end": 1956
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1927,
                        "end": 1956
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isStale",
                        "loc": {
                            "start": 1959,
                            "end": 1966
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1968,
                                "end": 1975
                            }
                        },
                        "loc": {
                            "start": 1968,
                            "end": 1975
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1959,
                        "end": 1975
                    }
                }
            ],
            "loc": {
                "start": 1853,
                "end": 1977
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "TotalVotingPower",
                "loc": {
                    "start": 1984,
                    "end": 2000
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
                            "start": 2005,
                            "end": 2016
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
                                    "start": 2018,
                                    "end": 2021
                                }
                            },
                            "loc": {
                                "start": 2018,
                                "end": 2021
                            }
                        },
                        "loc": {
                            "start": 2018,
                            "end": 2022
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2005,
                        "end": 2022
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 2025,
                            "end": 2030
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
                                    "start": 2032,
                                    "end": 2038
                                }
                            },
                            "loc": {
                                "start": 2032,
                                "end": 2038
                            }
                        },
                        "loc": {
                            "start": 2032,
                            "end": 2039
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2025,
                        "end": 2039
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 2042,
                            "end": 2054
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
                                            "start": 2057,
                                            "end": 2068
                                        }
                                    },
                                    "loc": {
                                        "start": 2057,
                                        "end": 2068
                                    }
                                },
                                "loc": {
                                    "start": 2057,
                                    "end": 2069
                                }
                            },
                            "loc": {
                                "start": 2056,
                                "end": 2070
                            }
                        },
                        "loc": {
                            "start": 2056,
                            "end": 2071
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2042,
                        "end": 2071
                    }
                }
            ],
            "loc": {
                "start": 1979,
                "end": 2073
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Voter",
                "loc": {
                    "start": 2080,
                    "end": 2085
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
                            "start": 2090,
                            "end": 2097
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
                                    "start": 2099,
                                    "end": 2101
                                }
                            },
                            "loc": {
                                "start": 2099,
                                "end": 2101
                            }
                        },
                        "loc": {
                            "start": 2099,
                            "end": 2102
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2090,
                        "end": 2102
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balance",
                        "loc": {
                            "start": 2105,
                            "end": 2112
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVault",
                                "loc": {
                                    "start": 2113,
                                    "end": 2124
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
                                            "start": 2126,
                                            "end": 2128
                                        }
                                    },
                                    "loc": {
                                        "start": 2126,
                                        "end": 2128
                                    }
                                },
                                "loc": {
                                    "start": 2126,
                                    "end": 2129
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2113,
                                "end": 2129
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2132,
                                "end": 2138
                            }
                        },
                        "loc": {
                            "start": 2132,
                            "end": 2138
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2105,
                        "end": 2138
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balances",
                        "loc": {
                            "start": 2141,
                            "end": 2149
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 2150,
                                    "end": 2162
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
                                                    "start": 2165,
                                                    "end": 2167
                                                }
                                            },
                                            "loc": {
                                                "start": 2165,
                                                "end": 2167
                                            }
                                        },
                                        "loc": {
                                            "start": 2165,
                                            "end": 2168
                                        }
                                    },
                                    "loc": {
                                        "start": 2164,
                                        "end": 2169
                                    }
                                },
                                "loc": {
                                    "start": 2164,
                                    "end": 2170
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2150,
                                "end": 2170
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
                                    "start": 2174,
                                    "end": 2180
                                }
                            },
                            "loc": {
                                "start": 2174,
                                "end": 2180
                            }
                        },
                        "loc": {
                            "start": 2173,
                            "end": 2181
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2141,
                        "end": 2181
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "ensName",
                        "loc": {
                            "start": 2184,
                            "end": 2191
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2193,
                                "end": 2199
                            }
                        },
                        "loc": {
                            "start": 2193,
                            "end": 2199
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2184,
                        "end": 2199
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 2202,
                            "end": 2206
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposal",
                                "loc": {
                                    "start": 2207,
                                    "end": 2215
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
                                            "start": 2217,
                                            "end": 2219
                                        }
                                    },
                                    "loc": {
                                        "start": 2217,
                                        "end": 2219
                                    }
                                },
                                "loc": {
                                    "start": 2217,
                                    "end": 2220
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2207,
                                "end": 2220
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 2222,
                                    "end": 2236
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
                                            "start": 2238,
                                            "end": 2240
                                        }
                                    },
                                    "loc": {
                                        "start": 2238,
                                        "end": 2240
                                    }
                                },
                                "loc": {
                                    "start": 2238,
                                    "end": 2241
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2222,
                                "end": 2241
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 2244,
                                "end": 2248
                            }
                        },
                        "loc": {
                            "start": 2244,
                            "end": 2248
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2202,
                        "end": 2248
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 2251,
                            "end": 2256
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposals",
                                "loc": {
                                    "start": 2257,
                                    "end": 2266
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
                                                    "start": 2269,
                                                    "end": 2271
                                                }
                                            },
                                            "loc": {
                                                "start": 2269,
                                                "end": 2271
                                            }
                                        },
                                        "loc": {
                                            "start": 2269,
                                            "end": 2272
                                        }
                                    },
                                    "loc": {
                                        "start": 2268,
                                        "end": 2273
                                    }
                                },
                                "loc": {
                                    "start": 2268,
                                    "end": 2274
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2257,
                                "end": 2274
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 2276,
                                    "end": 2290
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
                                            "start": 2292,
                                            "end": 2294
                                        }
                                    },
                                    "loc": {
                                        "start": 2292,
                                        "end": 2294
                                    }
                                },
                                "loc": {
                                    "start": 2292,
                                    "end": 2295
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2276,
                                "end": 2295
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
                                    "start": 2299,
                                    "end": 2303
                                }
                            },
                            "loc": {
                                "start": 2299,
                                "end": 2303
                            }
                        },
                        "loc": {
                            "start": 2298,
                            "end": 2304
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2251,
                        "end": 2304
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 2307,
                            "end": 2318
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVault",
                                "loc": {
                                    "start": 2319,
                                    "end": 2330
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
                                            "start": 2332,
                                            "end": 2334
                                        }
                                    },
                                    "loc": {
                                        "start": 2332,
                                        "end": 2334
                                    }
                                },
                                "loc": {
                                    "start": 2332,
                                    "end": 2335
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2319,
                                "end": 2335
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 2337,
                                    "end": 2348
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 2350,
                                        "end": 2353
                                    }
                                },
                                "loc": {
                                    "start": 2350,
                                    "end": 2353
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2337,
                                "end": 2353
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 2356,
                                "end": 2367
                            }
                        },
                        "loc": {
                            "start": 2356,
                            "end": 2367
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2307,
                        "end": 2367
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 2370,
                            "end": 2382
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 2383,
                                    "end": 2395
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
                                                    "start": 2398,
                                                    "end": 2400
                                                }
                                            },
                                            "loc": {
                                                "start": 2398,
                                                "end": 2400
                                            }
                                        },
                                        "loc": {
                                            "start": 2398,
                                            "end": 2401
                                        }
                                    },
                                    "loc": {
                                        "start": 2397,
                                        "end": 2402
                                    }
                                },
                                "loc": {
                                    "start": 2397,
                                    "end": 2403
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2383,
                                "end": 2403
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 2405,
                                    "end": 2416
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 2418,
                                        "end": 2421
                                    }
                                },
                                "loc": {
                                    "start": 2418,
                                    "end": 2421
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2405,
                                "end": 2421
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
                                    "start": 2425,
                                    "end": 2436
                                }
                            },
                            "loc": {
                                "start": 2425,
                                "end": 2436
                            }
                        },
                        "loc": {
                            "start": 2424,
                            "end": 2437
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2370,
                        "end": 2437
                    }
                }
            ],
            "loc": {
                "start": 2075,
                "end": 2439
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 2440
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
