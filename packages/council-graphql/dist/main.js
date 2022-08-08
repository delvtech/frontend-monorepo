var $1RIJT$graphqltoolsschema = require("@graphql-tools/schema");
var $1RIJT$elementficounciltokenlist = require("@elementfi/council-tokenlist");
var $1RIJT$etherslibutils = require("ethers/lib/utils");
var $1RIJT$lrucache = require("lru-cache");
var $1RIJT$elementficounciltypechain = require("@elementfi/council-typechain");
var $1RIJT$fastjsonstablestringify = require("fast-json-stable-stringify");
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

function $a9d8dc444614e877$export$2c8942c776a655d1(address, dataSources) {
    return dataSources.votingVaults.find((votingVault)=>votingVault.address === address);
}
function $a9d8dc444614e877$export$8f465fcd5ae4b18c(address, dataSources) {
    return dataSources.votingContracts.find((votingContract)=>votingContract.address === address);
}



function $97c17b3f7f480abc$export$472b2ff001c2cfbf(chainId) {
    switch(chainId){
        case (0, $1RIJT$elementficounciltokenlist.mainnetAddressList).chainId:
            return 14496292;
        default:
            return 0;
    }
}


const $730705444d2faf33$export$24d97b9dae72698 = function() {
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


const $e35651dc583d7dca$var$EXECUTED_PROPOSAL_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
const $e35651dc583d7dca$export$b327309c2fad1272 = {
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
        const dataSource = (0, $a9d8dc444614e877$export$8f465fcd5ae4b18c)(votingContract.address, context.councilDataSources);
        if (!dataSource) return [];
        const latestBlock = await (0, $730705444d2faf33$export$24d97b9dae72698)(context.provider);
        const args = await dataSource.getProposalCreatedEventArgs((0, $97c17b3f7f480abc$export$472b2ff001c2cfbf)(context.chainId));
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
        const { proposalHash: proposalHash  } = await $e35651dc583d7dca$var$getByIdFromDataSource(proposal, context);
        return proposalHash === $e35651dc583d7dca$var$EXECUTED_PROPOSAL_HASH;
    },
    async getLastCall ({ proposal: proposal , context: context  }) {
        const { proposalHash: proposalHash , lastCall: lastCall  } = await $e35651dc583d7dca$var$getByIdFromDataSource(proposal, context);
        if (proposalHash !== $e35651dc583d7dca$var$EXECUTED_PROPOSAL_HASH) return lastCall;
    },
    async getQuorum ({ proposal: proposal , context: context  }) {
        const { proposalHash: proposalHash , quorum: quorum  } = await $e35651dc583d7dca$var$getByIdFromDataSource(proposal, context);
        if (proposalHash !== $e35651dc583d7dca$var$EXECUTED_PROPOSAL_HASH) return quorum;
    }
};
// TODO: Remove type casting
function $e35651dc583d7dca$var$getByIdFromDataSource(proposal, context) {
    const dataSource = (0, $a9d8dc444614e877$export$8f465fcd5ae4b18c)(proposal.votingContract.address, context.councilDataSources);
    return dataSource.getProposalById(proposal.id);
}






// TODO: Should this come from method arguments as `excludeAddresses`?
const $ac266e1a17cc8ea7$var$nonVoters = [
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000001", 
];
const $ac266e1a17cc8ea7$export$40a03fbff71f56d3 = {
    async getByVotingVault ({ votingVault: votingVault , blockNumber: blockNumber , context: context  }) {
        const { chainId: chainId , councilDataSources: councilDataSources , provider: provider  } = context;
        let total = BigInt(0);
        blockNumber = blockNumber || await (0, $730705444d2faf33$export$24d97b9dae72698)(provider);
        const dataSource = (0, $a9d8dc444614e877$export$2c8942c776a655d1)(votingVault.address, councilDataSources);
        if (dataSource) {
            const allVotersWithPower = await dataSource.getAllVotersWithPower((0, $97c17b3f7f480abc$export$472b2ff001c2cfbf)(chainId), blockNumber);
            for (const { voter: voter , power: power  } of allVotersWithPower)if (!$ac266e1a17cc8ea7$var$nonVoters.includes(voter)) total += BigInt(power);
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
        blockNumber = blockNumber || await (0, $730705444d2faf33$export$24d97b9dae72698)(context.provider);
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






const $7818ae0a8b433afc$export$1dbe110119cb4dd2 = {
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


const $74d4fdf5b0550f40$export$e424928527fab42f = {
    getAll ({ context: context  }) {
        const votingVaults = (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getAll({
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
            const dataSource = (0, $a9d8dc444614e877$export$2c8942c776a655d1)(votingVault.address, context.councilDataSources);
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
            const dataSource = (0, $a9d8dc444614e877$export$2c8942c776a655d1)(votingVault.address, councilDataSources);
            if (dataSource) {
                const allVotersWithPower = await dataSource.getAllVotersWithPower(undefined, blockNumber);
                for (const { voter: voter  } of allVotersWithPower)addresses.add(voter);
            }
        }
        return this.getByAddresses({
            addresses: Array.from(addresses)
        });
    }
};


const $d10dcacbcc0ff0c7$export$81fb29a3b5045c76 = {
    async getByVoter ({ voter: voter , proposal: proposal , context: { councilDataSources: councilDataSources  }  }) {
        const { id: id , votingContract: votingContract  } = proposal;
        const dataSource = (0, $a9d8dc444614e877$export$8f465fcd5ae4b18c)(votingContract.address, councilDataSources);
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
        const voters = await (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByVotingVaults({
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




const $1f368d119f63f485$export$4c0b87851cbe4e3f = {
    getAll ({ context: context  }) {
        return context.councilDataSources.votingContracts.map(({ address: address  })=>this.getByAddress({
                address: address,
                context: context
            }));
    },
    getByAddress ({ address: address1 , context: context  }) {
        const dataSource = (0, $a9d8dc444614e877$export$8f465fcd5ae4b18c)(address1, context.councilDataSources);
        if (dataSource) return {
            address: dataSource.address,
            votingVaults: dataSource.votingVaults.map(({ address: address  })=>({
                    address: address
                }))
        };
    }
};





const $889645ffb5e37d8c$export$a0cbbdeeb12308cd = {
    async getByVoter ({ voter: voter , blockNumber: blockNumber , votingVaults: votingVaults , context: { councilDataSources: councilDataSources , provider: provider  } ,  }) {
        blockNumber = blockNumber || await (0, $730705444d2faf33$export$24d97b9dae72698)(provider);
        let aggregateValue = BigInt(0);
        for (const { address: address  } of votingVaults){
            const dataSource = (0, $a9d8dc444614e877$export$2c8942c776a655d1)(address, councilDataSources);
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
        const latestBlock = await (0, $730705444d2faf33$export$24d97b9dae72698)(provider);
        if (blockNumber === latestBlock) return false;
        else {
            let isStale;
            for (const { address: address  } of votingVaults){
                const dataSource = (0, $a9d8dc444614e877$export$2c8942c776a655d1)(address, councilDataSources);
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
            return (0, $1f368d119f63f485$export$4c0b87851cbe4e3f).getByAddress({
                address: address,
                context: context
            }) || null;
        },
        votingContracts: (_, { addresses: addresses  }, context)=>{
            // Get all the votingContracts by default if no addresses arg is provided
            if (!addresses) return (0, $1f368d119f63f485$export$4c0b87851cbe4e3f).getAll({
                context: context
            }).map((votingContract)=>votingContract || null);
            // TODO: VotingContractModel.getByAddresses
            return addresses.map((address)=>(0, $1f368d119f63f485$export$4c0b87851cbe4e3f).getByAddress({
                    address: address,
                    context: context
                }) || null);
        },
        votingVaults: (_, { addresses: addresses  }, context)=>{
            // Get all the votingVaults by default if no addresses arg is provided
            if (!addresses) return (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getAll({
                context: context
            }).map((votingVault)=>votingVault || null);
            // TODO: VotingVaultModel.getByAddresses
            return addresses.map((address)=>(0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByAddress({
                    address: address,
                    context: context
                }) || null);
        },
        votingVault: (_, { address: address  }, context)=>{
            const result = (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByAddress({
                address: address,
                context: context
            }) || null;
            return result;
        },
        voter: (_, { address: address  })=>{
            return (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByAddress({
                address: address
            });
        },
        voters: (_, { addresses: addresses  }, context)=>{
            if (addresses) return (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByAddresses({
                addresses: addresses
            });
            else return (0, $74d4fdf5b0550f40$export$e424928527fab42f).getAll({
                context: context
            });
        }
    },
    VotingContract: {
        balance: async (votingContract, { voter: voterAddress  }, context)=>{
            const voter = (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByAddress({
                address: voterAddress
            });
            const balance = await (0, $74d4fdf5b0550f40$export$e424928527fab42f).getBalance({
                voter: voter,
                votingVaults: votingContract.votingVaults,
                context: context
            });
            return balance || null;
        },
        proposal: async (votingContract, { id: id  }, context)=>{
            const proposal = await (0, $e35651dc583d7dca$export$b327309c2fad1272).getById({
                id: id,
                votingContract: votingContract,
                context: context
            });
            return proposal || null;
        },
        proposals: async (votingContract, { ids: ids , isActive: isActive  }, context)=>{
            let proposals = [];
            if (ids) proposals = await (0, $e35651dc583d7dca$export$b327309c2fad1272).getByIds({
                ids: ids,
                votingContract: votingContract,
                context: context
            });
            else proposals = await (0, $e35651dc583d7dca$export$b327309c2fad1272).getByVotingContract({
                votingContract: votingContract,
                context: context
            });
            if (typeof isActive !== "undefined") proposals = proposals.filter((proposal)=>proposal?.isActive === isActive);
            return proposals.map((proposal)=>proposal || null);
        },
        proposalCount: async (votingContract, { isActive: isActive  }, context)=>{
            const allProposals = await (0, $e35651dc583d7dca$export$b327309c2fad1272).getByVotingContract({
                votingContract: votingContract,
                context: context
            });
            if (typeof isActive !== "undefined") return allProposals.filter((proposal)=>proposal.isActive === isActive).length;
            return allProposals.length;
        },
        totalVotingPower: ({ votingVaults: votingVaults  }, { blockNumber: blockNumber  }, context)=>{
            return (0, $ac266e1a17cc8ea7$export$40a03fbff71f56d3).getByVotingVaults({
                votingVaults: votingVaults,
                blockNumber: blockNumber,
                context: context
            });
        },
        voters: ({ votingVaults: votingVaults  }, _, context)=>{
            return (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByVotingVaults({
                votingVaults: votingVaults,
                context: context
            });
        },
        voterCount: async ({ votingVaults: votingVaults  }, _, context)=>{
            const allVoters = await (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByVotingVaults({
                votingVaults: votingVaults,
                context: context
            });
            return allVoters.length;
        },
        votingPower: ({ votingVaults: votingVaults  }, { voter: voter , blockNumber: blockNumber  }, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoter({
                voter: (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByAddress({
                    address: voter
                }),
                votingVaults: votingVaults,
                blockNumber: blockNumber,
                context: context
            });
        },
        votingPowers: async ({ votingVaults: votingVaults  }, { voters: addresses , blockNumber: blockNumber  }, context)=>{
            const voters = addresses ? (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByAddresses({
                addresses: addresses
            }) : await (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByVotingVaults({
                votingVaults: votingVaults,
                context: context
            });
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoters({
                voters: voters,
                votingVaults: votingVaults,
                blockNumber: blockNumber,
                context: context
            });
        }
    },
    VotingVault: {
        balance: async (votingVault, { voter: voterAddress  }, context)=>{
            const voter = (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByAddress({
                address: voterAddress
            });
            const balance = await (0, $74d4fdf5b0550f40$export$e424928527fab42f).getBalance({
                voter: voter,
                votingVaults: [
                    votingVault
                ],
                context: context
            });
            return balance || null;
        },
        totalVotingPower: (votingVault, { blockNumber: blockNumber  }, context)=>{
            return (0, $ac266e1a17cc8ea7$export$40a03fbff71f56d3).getByVotingVault({
                votingVault: votingVault,
                blockNumber: blockNumber,
                context: context
            });
        },
        voters: (votingVault, _, context)=>{
            return (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByVotingVault({
                votingVault: votingVault,
                context: context
            });
        },
        voterCount: async (votingVault, _, context)=>{
            const allVoters = await (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByVotingVault({
                votingVault: votingVault,
                context: context
            });
            return allVoters.length;
        },
        votingPower: (votingVault, { voter: address , blockNumber: blockNumber  }, context)=>{
            const voter = (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByAddress({
                address: address
            });
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoter({
                voter: voter,
                votingVaults: [
                    votingVault
                ],
                blockNumber: blockNumber,
                context: context
            });
        },
        votingPowers: async (votingVault, { voters: addresses , blockNumber: blockNumber  }, context)=>{
            const voters = addresses ? (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByAddresses({
                addresses: addresses
            }) : await (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByVotingVault({
                votingVault: votingVault,
                context: context
            });
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoters({
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
            return (0, $e35651dc583d7dca$export$b327309c2fad1272).getIsExecuted({
                proposal: proposal,
                context: context
            });
        },
        lastCall: async (proposal, _, context)=>{
            return await (0, $e35651dc583d7dca$export$b327309c2fad1272).getLastCall({
                proposal: proposal,
                context: context
            }) || null;
        },
        quorum: async (proposal, _, context)=>{
            return await (0, $e35651dc583d7dca$export$b327309c2fad1272).getQuorum({
                proposal: proposal,
                context: context
            }) || null;
        },
        vote: async (proposal, { voter: address  }, context)=>{
            const voter = (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByAddress({
                address: address
            });
            const vote = await (0, $d10dcacbcc0ff0c7$export$81fb29a3b5045c76).getByVoter({
                voter: voter,
                proposal: proposal,
                context: context
            });
            return vote || null;
        },
        voters: ({ created: created , votingContract: votingContract  }, _, context)=>{
            return (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByVotingVaults({
                votingVaults: votingContract.votingVaults,
                blockNumber: created,
                context: context
            });
        },
        voterCount: async ({ votingContract: votingContract  }, _, context)=>{
            const allVoters = await (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByVotingVaults({
                votingVaults: votingContract.votingVaults,
                context: context
            });
            return allVoters.length;
        },
        votes: async (proposal, { voters: addresses  }, context)=>{
            let votes;
            if (addresses) {
                const voters = (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByAddresses({
                    addresses: addresses
                });
                votes = await (0, $d10dcacbcc0ff0c7$export$81fb29a3b5045c76).getByVoters({
                    voters: voters,
                    proposal: proposal,
                    context: context
                });
            } else votes = await (0, $d10dcacbcc0ff0c7$export$81fb29a3b5045c76).getByProposal({
                proposal: proposal,
                context: context
            });
            return votes.map((vote)=>vote || null);
        },
        votingPower: ({ votingContract: votingContract , created: created  }, { voter: address  }, context)=>{
            const voter = (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByAddress({
                address: address
            });
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoter({
                voter: voter,
                votingVaults: votingContract.votingVaults,
                blockNumber: created,
                context: context
            });
        },
        votingPowers: async ({ votingContract: votingContract , created: created  }, { voters: addresses  }, context)=>{
            const { votingVaults: votingVaults  } = votingContract;
            const voters = addresses ? (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByAddresses({
                addresses: addresses
            }) : await (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByVotingVaults({
                votingVaults: votingVaults,
                context: context
            });
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoters({
                voters: voters,
                votingVaults: votingVaults,
                blockNumber: created,
                context: context
            });
        }
    },
    VotingPower: {
        isStale: async (votingPower, _, context)=>{
            return await (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getIsStale({
                votingPower: votingPower,
                context: context
            }) || null;
        }
    },
    Voter: {
        balance: async (voter, { votingVault: votingVaultAddress  }, context)=>{
            const votingVault = (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByAddress({
                address: votingVaultAddress,
                context: context
            });
            if (!votingVault) return null;
            const balance = await (0, $74d4fdf5b0550f40$export$e424928527fab42f).getBalance({
                voter: voter,
                votingVaults: [
                    votingVault
                ],
                context: context
            });
            return balance || null;
        },
        balances: async (voter, { votingVaults: votingVaultAddresses  }, context)=>{
            const votingVaults = (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByAddresses({
                addresses: votingVaultAddresses,
                context: context
            });
            const balances = [];
            for (const votingVault of votingVaults){
                let balance = null;
                if (votingVault) balance = await (0, $74d4fdf5b0550f40$export$e424928527fab42f).getBalance({
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
        vote: async (voter, { proposal: id , votingContract: address  }, context)=>{
            const votingContract = (0, $1f368d119f63f485$export$4c0b87851cbe4e3f).getByAddress({
                address: address,
                context: context
            });
            if (!votingContract) return null;
            const proposal = await (0, $e35651dc583d7dca$export$b327309c2fad1272).getById({
                id: id,
                votingContract: votingContract,
                context: context
            });
            if (!proposal) return null;
            const vote = await (0, $d10dcacbcc0ff0c7$export$81fb29a3b5045c76).getByVoter({
                voter: voter,
                proposal: proposal,
                context: context
            });
            return vote || null;
        },
        votes: async (voter, { proposals: ids , votingContract: address  }, context)=>{
            const votingContract = (0, $1f368d119f63f485$export$4c0b87851cbe4e3f).getByAddress({
                address: address,
                context: context
            });
            if (!votingContract) return null;
            const proposals = await (0, $e35651dc583d7dca$export$b327309c2fad1272).getByIds({
                ids: ids,
                votingContract: votingContract,
                context: context
            });
            const votes = proposals.map(async (proposal)=>{
                if (!proposal) return null;
                const vote = await (0, $d10dcacbcc0ff0c7$export$81fb29a3b5045c76).getByVoter({
                    voter: voter,
                    proposal: proposal,
                    context: context
                });
                return vote || null;
            });
            return Promise.all(votes);
        },
        votingPower: (voter, { votingVault: votingVaultAddress , blockNumber: blockNumber  }, context)=>{
            const votingVault = (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByAddress({
                address: votingVaultAddress,
                context: context
            });
            if (!votingVault) return null;
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoter({
                voter: voter,
                votingVaults: [
                    votingVault
                ],
                blockNumber: blockNumber,
                context: context
            });
        },
        votingPowers: (voter, { votingVaults: votingVaultAddresses , blockNumber: blockNumber  }, context)=>{
            const votingVaults = (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByAddresses({
                addresses: votingVaultAddresses,
                context: context
            });
            return votingVaults.map((votingVault)=>{
                return votingVault ? (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getByVoter({
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






function $a39bbae42cb1e1aa$export$ade7a147f5129058({ cache: cache = new (0, ($parcel$interopDefault($1RIJT$lrucache)))({
    max: 500
}) , cacheKey: cacheKey , callback: callback , options: options  }) {
    if (cache.has(cacheKey)) {
        console.log("\u2705 cache hit", cacheKey);
        return cache.get(cacheKey, options);
    } else {
        console.log("\u274C cache miss", cacheKey);
        const value = callback();
        cache.set(cacheKey, value, options);
        return value;
    }
}
function $a39bbae42cb1e1aa$export$611736262b635f8d(prefix, args) {
    const argKeys = [];
    for (const arg of args){
        if (arg === null) argKeys.push("null");
        else if (typeof arg === "object") argKeys.push((0, ($parcel$interopDefault($1RIJT$fastjsonstablestringify)))(arg));
        else argKeys.push(arg.toString());
    }
    return `${prefix}:${argKeys.join(",")}`;
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
        return (0, $a39bbae42cb1e1aa$export$ade7a147f5129058)({
            cache: this.cache,
            cacheKey: (0, $a39bbae42cb1e1aa$export$611736262b635f8d)("getProposalCreatedEventArgs", [
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
        return (0, $a39bbae42cb1e1aa$export$ade7a147f5129058)({
            cache: this.cache,
            cacheKey: (0, $a39bbae42cb1e1aa$export$611736262b635f8d)("getProposalById", [
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
        return (0, $a39bbae42cb1e1aa$export$ade7a147f5129058)({
            cache: this.cache,
            cacheKey: (0, $a39bbae42cb1e1aa$export$611736262b635f8d)("getVote", [
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
        return (0, $a39bbae42cb1e1aa$export$ade7a147f5129058)({
            cache: this.cache,
            cacheKey: (0, $a39bbae42cb1e1aa$export$611736262b635f8d)("getVotingPower", [
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
        return (0, $a39bbae42cb1e1aa$export$ade7a147f5129058)({
            cache: this.cache,
            cacheKey: (0, $a39bbae42cb1e1aa$export$611736262b635f8d)("getAllVotersWithPower", [
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
        return (0, $a39bbae42cb1e1aa$export$ade7a147f5129058)({
            cache: this.cache,
            cacheKey: (0, $a39bbae42cb1e1aa$export$611736262b635f8d)("getBalance", [
                voter
            ]),
            callback: async ()=>{
                const [, balance] = await this.contract.functions.deposits(voter);
                return balance.toString();
            }
        });
    }
    async getVotingPowerView(voter, blockNumber) {
        return (0, $a39bbae42cb1e1aa$export$ade7a147f5129058)({
            cache: this.cache,
            cacheKey: (0, $a39bbae42cb1e1aa$export$611736262b635f8d)("getVotingPowerView", [
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
        return (0, $a39bbae42cb1e1aa$export$ade7a147f5129058)({
            cache: this.cache,
            cacheKey: (0, $a39bbae42cb1e1aa$export$611736262b635f8d)("getAllVotersWithPower", [
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
        return (0, $a39bbae42cb1e1aa$export$ade7a147f5129058)({
            cache: this.cache,
            cacheKey: (0, $a39bbae42cb1e1aa$export$611736262b635f8d)("getBalance", [
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
        return (0, $a39bbae42cb1e1aa$export$ade7a147f5129058)({
            cache: this.cache,
            cacheKey: (0, $a39bbae42cb1e1aa$export$611736262b635f8d)("getVotingPowerView", [
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
        return (0, $a39bbae42cb1e1aa$export$ade7a147f5129058)({
            cache: this.cache,
            cacheKey: (0, $a39bbae42cb1e1aa$export$611736262b635f8d)("getAllVotersWithPower", [
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



const $a40966fa5fbf0fb2$export$5cb61d802df8179b = (0, $1RIJT$elementficounciltokenlist.goerliAddressList);
const $a40966fa5fbf0fb2$export$bf1e9dcca16b49bd = (0, $1RIJT$elementficounciltokenlist.mainnetAddressList);
const $a40966fa5fbf0fb2$var$LOCALHOST_CHAIN_ID = 31337;
const $a40966fa5fbf0fb2$export$a8fd08e8b7cfacd3 = {
    ...(0, $1RIJT$elementficounciltokenlist.mainnetAddressList),
    chainId: $a40966fa5fbf0fb2$var$LOCALHOST_CHAIN_ID
};
const $a40966fa5fbf0fb2$export$578de1f6b0e6a3e9 = {
    chainId: $a40966fa5fbf0fb2$var$LOCALHOST_CHAIN_ID,
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
const $a40966fa5fbf0fb2$export$c9b69c213f456a9c = {
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
    chainId: $a40966fa5fbf0fb2$var$LOCALHOST_CHAIN_ID
};


async function $e2ca106c4b0edc69$export$54fae1269cb9a9e0({ chainId: chainId , provider: provider  }) {
    const councilAddresses = $e2ca106c4b0edc69$export$17d5f00cfd692b8a(chainId);
    const lockingVault = new (0, $a1c706d406f5708a$export$93f46c2abf3fc254)(councilAddresses.lockingVault, provider);
    const vestingVault = new (0, $e0e2802e459d88e3$export$a37e73beca8c1698)(councilAddresses.vestingVault, provider);
    const gscVault = new (0, $492df70f1218e6f0$export$e2e4dee807f6af7a)(councilAddresses.gscVault, provider);
    const coreVoting = new (0, $41844f56d22dc55e$export$ca33481ae8bfff02)(councilAddresses.coreVoting, provider, [
        lockingVault,
        vestingVault
    ]);
    const gscCoreVoting = new (0, $41844f56d22dc55e$export$ca33481ae8bfff02)(councilAddresses.gscCoreVoting, provider, [
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
function $e2ca106c4b0edc69$export$17d5f00cfd692b8a(chainId) {
    switch(chainId){
        case (0, $a40966fa5fbf0fb2$export$bf1e9dcca16b49bd).chainId:
            return (0, $a40966fa5fbf0fb2$export$bf1e9dcca16b49bd).addresses;
        case (0, $a40966fa5fbf0fb2$export$5cb61d802df8179b).chainId:
            return (0, $a40966fa5fbf0fb2$export$5cb61d802df8179b).addresses;
        default:
            // TODO: When and how should mainnetForkAddressList be used?
            return (0, $a40966fa5fbf0fb2$export$578de1f6b0e6a3e9).addresses;
    }
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
                            "start": 16,
                            "end": 30
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 31,
                                    "end": 38
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
                                            "start": 40,
                                            "end": 42
                                        }
                                    },
                                    "loc": {
                                        "start": 40,
                                        "end": 42
                                    }
                                },
                                "loc": {
                                    "start": 40,
                                    "end": 43
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 31,
                                "end": 43
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingContract",
                            "loc": {
                                "start": 46,
                                "end": 60
                            }
                        },
                        "loc": {
                            "start": 46,
                            "end": 60
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 16,
                        "end": 60
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingContracts",
                        "loc": {
                            "start": 64,
                            "end": 79
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "addresses",
                                "loc": {
                                    "start": 80,
                                    "end": 89
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
                                                "start": 92,
                                                "end": 94
                                            }
                                        },
                                        "loc": {
                                            "start": 92,
                                            "end": 94
                                        }
                                    },
                                    "loc": {
                                        "start": 92,
                                        "end": 95
                                    }
                                },
                                "loc": {
                                    "start": 91,
                                    "end": 96
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 80,
                                "end": 96
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
                                    "start": 100,
                                    "end": 114
                                }
                            },
                            "loc": {
                                "start": 100,
                                "end": 114
                            }
                        },
                        "loc": {
                            "start": 99,
                            "end": 115
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 64,
                        "end": 115
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVault",
                        "loc": {
                            "start": 119,
                            "end": 130
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 131,
                                    "end": 138
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
                                            "start": 140,
                                            "end": 142
                                        }
                                    },
                                    "loc": {
                                        "start": 140,
                                        "end": 142
                                    }
                                },
                                "loc": {
                                    "start": 140,
                                    "end": 143
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 131,
                                "end": 143
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingVault",
                            "loc": {
                                "start": 146,
                                "end": 157
                            }
                        },
                        "loc": {
                            "start": 146,
                            "end": 157
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 119,
                        "end": 157
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 161,
                            "end": 173
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "addresses",
                                "loc": {
                                    "start": 174,
                                    "end": 183
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
                                                "start": 186,
                                                "end": 188
                                            }
                                        },
                                        "loc": {
                                            "start": 186,
                                            "end": 188
                                        }
                                    },
                                    "loc": {
                                        "start": 186,
                                        "end": 189
                                    }
                                },
                                "loc": {
                                    "start": 185,
                                    "end": 190
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 174,
                                "end": 190
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
                                    "start": 194,
                                    "end": 205
                                }
                            },
                            "loc": {
                                "start": 194,
                                "end": 205
                            }
                        },
                        "loc": {
                            "start": 193,
                            "end": 206
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 161,
                        "end": 206
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 210,
                            "end": 215
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 216,
                                    "end": 223
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
                                            "start": 225,
                                            "end": 227
                                        }
                                    },
                                    "loc": {
                                        "start": 225,
                                        "end": 227
                                    }
                                },
                                "loc": {
                                    "start": 225,
                                    "end": 228
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 216,
                                "end": 228
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Voter",
                            "loc": {
                                "start": 231,
                                "end": 236
                            }
                        },
                        "loc": {
                            "start": 231,
                            "end": 236
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 210,
                        "end": 236
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 240,
                            "end": 246
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "addresses",
                                "loc": {
                                    "start": 247,
                                    "end": 256
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
                                                "start": 259,
                                                "end": 261
                                            }
                                        },
                                        "loc": {
                                            "start": 259,
                                            "end": 261
                                        }
                                    },
                                    "loc": {
                                        "start": 259,
                                        "end": 262
                                    }
                                },
                                "loc": {
                                    "start": 258,
                                    "end": 263
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 247,
                                "end": 263
                            }
                        }
                    ],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "Voter",
                                "loc": {
                                    "start": 267,
                                    "end": 272
                                }
                            },
                            "loc": {
                                "start": 267,
                                "end": 272
                            }
                        },
                        "loc": {
                            "start": 266,
                            "end": 273
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 240,
                        "end": 273
                    }
                }
            ],
            "loc": {
                "start": 0,
                "end": 276
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingContract",
                "loc": {
                    "start": 285,
                    "end": 299
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
                            "start": 305,
                            "end": 312
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
                                    "start": 314,
                                    "end": 316
                                }
                            },
                            "loc": {
                                "start": 314,
                                "end": 316
                            }
                        },
                        "loc": {
                            "start": 314,
                            "end": 317
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 305,
                        "end": 317
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 321,
                            "end": 333
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
                                            "start": 336,
                                            "end": 347
                                        }
                                    },
                                    "loc": {
                                        "start": 336,
                                        "end": 347
                                    }
                                },
                                "loc": {
                                    "start": 336,
                                    "end": 348
                                }
                            },
                            "loc": {
                                "start": 335,
                                "end": 349
                            }
                        },
                        "loc": {
                            "start": 335,
                            "end": 350
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 321,
                        "end": 350
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balance",
                        "loc": {
                            "start": 354,
                            "end": 361
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 362,
                                    "end": 367
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
                                            "start": 369,
                                            "end": 371
                                        }
                                    },
                                    "loc": {
                                        "start": 369,
                                        "end": 371
                                    }
                                },
                                "loc": {
                                    "start": 369,
                                    "end": 372
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 362,
                                "end": 372
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 375,
                                "end": 381
                            }
                        },
                        "loc": {
                            "start": 375,
                            "end": 381
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 354,
                        "end": 381
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 385,
                            "end": 393
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "id",
                                "loc": {
                                    "start": 394,
                                    "end": 396
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
                                            "start": 398,
                                            "end": 400
                                        }
                                    },
                                    "loc": {
                                        "start": 398,
                                        "end": 400
                                    }
                                },
                                "loc": {
                                    "start": 398,
                                    "end": 401
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 394,
                                "end": 401
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Proposal",
                            "loc": {
                                "start": 404,
                                "end": 412
                            }
                        },
                        "loc": {
                            "start": 404,
                            "end": 412
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 385,
                        "end": 412
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposals",
                        "loc": {
                            "start": 416,
                            "end": 425
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "ids",
                                "loc": {
                                    "start": 426,
                                    "end": 429
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
                                                "start": 432,
                                                "end": 434
                                            }
                                        },
                                        "loc": {
                                            "start": 432,
                                            "end": 434
                                        }
                                    },
                                    "loc": {
                                        "start": 432,
                                        "end": 435
                                    }
                                },
                                "loc": {
                                    "start": 431,
                                    "end": 436
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 426,
                                "end": 436
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "isActive",
                                "loc": {
                                    "start": 438,
                                    "end": 446
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Boolean",
                                    "loc": {
                                        "start": 448,
                                        "end": 455
                                    }
                                },
                                "loc": {
                                    "start": 448,
                                    "end": 455
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 438,
                                "end": 455
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
                                    "start": 459,
                                    "end": 467
                                }
                            },
                            "loc": {
                                "start": 459,
                                "end": 467
                            }
                        },
                        "loc": {
                            "start": 458,
                            "end": 468
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 416,
                        "end": 468
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposalCount",
                        "loc": {
                            "start": 472,
                            "end": 485
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "isActive",
                                "loc": {
                                    "start": 486,
                                    "end": 494
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Boolean",
                                    "loc": {
                                        "start": 496,
                                        "end": 503
                                    }
                                },
                                "loc": {
                                    "start": 496,
                                    "end": 503
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 486,
                                "end": 503
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 506,
                                "end": 509
                            }
                        },
                        "loc": {
                            "start": 506,
                            "end": 509
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 472,
                        "end": 509
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 513,
                            "end": 529
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 530,
                                    "end": 541
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 543,
                                        "end": 546
                                    }
                                },
                                "loc": {
                                    "start": 543,
                                    "end": 546
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 530,
                                "end": 546
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 549,
                                "end": 565
                            }
                        },
                        "loc": {
                            "start": 549,
                            "end": 565
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 513,
                        "end": 565
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
                            "start": 588,
                            "end": 598
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 600,
                                "end": 603
                            }
                        },
                        "loc": {
                            "start": 600,
                            "end": 603
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 588,
                        "end": 603
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 607,
                            "end": 618
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 619,
                                    "end": 624
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
                                            "start": 626,
                                            "end": 628
                                        }
                                    },
                                    "loc": {
                                        "start": 626,
                                        "end": 628
                                    }
                                },
                                "loc": {
                                    "start": 626,
                                    "end": 629
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 619,
                                "end": 629
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 631,
                                    "end": 642
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 644,
                                        "end": 647
                                    }
                                },
                                "loc": {
                                    "start": 644,
                                    "end": 647
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 631,
                                "end": 647
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 650,
                                "end": 661
                            }
                        },
                        "loc": {
                            "start": 650,
                            "end": 661
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 607,
                        "end": 661
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 665,
                            "end": 677
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 678,
                                    "end": 684
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
                                                "start": 687,
                                                "end": 689
                                            }
                                        },
                                        "loc": {
                                            "start": 687,
                                            "end": 689
                                        }
                                    },
                                    "loc": {
                                        "start": 687,
                                        "end": 690
                                    }
                                },
                                "loc": {
                                    "start": 686,
                                    "end": 691
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 678,
                                "end": 691
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 693,
                                    "end": 704
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 706,
                                        "end": 709
                                    }
                                },
                                "loc": {
                                    "start": 706,
                                    "end": 709
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 693,
                                "end": 709
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
                                    "start": 713,
                                    "end": 724
                                }
                            },
                            "loc": {
                                "start": 713,
                                "end": 724
                            }
                        },
                        "loc": {
                            "start": 712,
                            "end": 725
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 665,
                        "end": 725
                    }
                }
            ],
            "loc": {
                "start": 280,
                "end": 728
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingVault",
                "loc": {
                    "start": 737,
                    "end": 748
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
                            "start": 754,
                            "end": 761
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
                                    "start": 763,
                                    "end": 765
                                }
                            },
                            "loc": {
                                "start": 763,
                                "end": 765
                            }
                        },
                        "loc": {
                            "start": 763,
                            "end": 766
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 754,
                        "end": 766
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balance",
                        "loc": {
                            "start": 770,
                            "end": 777
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 778,
                                    "end": 783
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
                                            "start": 785,
                                            "end": 787
                                        }
                                    },
                                    "loc": {
                                        "start": 785,
                                        "end": 787
                                    }
                                },
                                "loc": {
                                    "start": 785,
                                    "end": 788
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 778,
                                "end": 788
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 791,
                                "end": 797
                            }
                        },
                        "loc": {
                            "start": 791,
                            "end": 797
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 770,
                        "end": 797
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 801,
                            "end": 817
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 818,
                                    "end": 829
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 831,
                                        "end": 834
                                    }
                                },
                                "loc": {
                                    "start": 831,
                                    "end": 834
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 818,
                                "end": 834
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 837,
                                "end": 853
                            }
                        },
                        "loc": {
                            "start": 837,
                            "end": 853
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 801,
                        "end": 853
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 857,
                            "end": 863
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
                                    "start": 866,
                                    "end": 871
                                }
                            },
                            "loc": {
                                "start": 866,
                                "end": 871
                            }
                        },
                        "loc": {
                            "start": 865,
                            "end": 872
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 857,
                        "end": 872
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 876,
                            "end": 886
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 888,
                                "end": 891
                            }
                        },
                        "loc": {
                            "start": 888,
                            "end": 891
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 876,
                        "end": 891
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 895,
                            "end": 906
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 907,
                                    "end": 912
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
                                            "start": 914,
                                            "end": 916
                                        }
                                    },
                                    "loc": {
                                        "start": 914,
                                        "end": 916
                                    }
                                },
                                "loc": {
                                    "start": 914,
                                    "end": 917
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 907,
                                "end": 917
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 919,
                                    "end": 930
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 932,
                                        "end": 935
                                    }
                                },
                                "loc": {
                                    "start": 932,
                                    "end": 935
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 919,
                                "end": 935
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 938,
                                "end": 949
                            }
                        },
                        "loc": {
                            "start": 938,
                            "end": 949
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 895,
                        "end": 949
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 953,
                            "end": 965
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 966,
                                    "end": 972
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
                                                "start": 975,
                                                "end": 977
                                            }
                                        },
                                        "loc": {
                                            "start": 975,
                                            "end": 977
                                        }
                                    },
                                    "loc": {
                                        "start": 975,
                                        "end": 978
                                    }
                                },
                                "loc": {
                                    "start": 974,
                                    "end": 979
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 966,
                                "end": 979
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 981,
                                    "end": 992
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 994,
                                        "end": 997
                                    }
                                },
                                "loc": {
                                    "start": 994,
                                    "end": 997
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 981,
                                "end": 997
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
                                    "start": 1001,
                                    "end": 1012
                                }
                            },
                            "loc": {
                                "start": 1001,
                                "end": 1012
                            }
                        },
                        "loc": {
                            "start": 1000,
                            "end": 1013
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 953,
                        "end": 1013
                    }
                }
            ],
            "loc": {
                "start": 732,
                "end": 1016
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Proposal",
                "loc": {
                    "start": 1025,
                    "end": 1033
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
                            "start": 1039,
                            "end": 1041
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
                                    "start": 1043,
                                    "end": 1045
                                }
                            },
                            "loc": {
                                "start": 1043,
                                "end": 1045
                            }
                        },
                        "loc": {
                            "start": 1043,
                            "end": 1046
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1039,
                        "end": 1046
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingContract",
                        "loc": {
                            "start": 1050,
                            "end": 1064
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
                                    "start": 1066,
                                    "end": 1080
                                }
                            },
                            "loc": {
                                "start": 1066,
                                "end": 1080
                            }
                        },
                        "loc": {
                            "start": 1066,
                            "end": 1081
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1050,
                        "end": 1081
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1085,
                            "end": 1099
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "created",
                        "loc": {
                            "start": 1103,
                            "end": 1110
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
                                    "start": 1112,
                                    "end": 1115
                                }
                            },
                            "loc": {
                                "start": 1112,
                                "end": 1115
                            }
                        },
                        "loc": {
                            "start": 1112,
                            "end": 1116
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1085,
                        "end": 1116
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1120,
                            "end": 1134
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "expiration",
                        "loc": {
                            "start": 1138,
                            "end": 1148
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
                                    "start": 1150,
                                    "end": 1153
                                }
                            },
                            "loc": {
                                "start": 1150,
                                "end": 1153
                            }
                        },
                        "loc": {
                            "start": 1150,
                            "end": 1154
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1120,
                        "end": 1154
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1158,
                            "end": 1172
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "unlock",
                        "loc": {
                            "start": 1176,
                            "end": 1182
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
                                    "start": 1184,
                                    "end": 1187
                                }
                            },
                            "loc": {
                                "start": 1184,
                                "end": 1187
                            }
                        },
                        "loc": {
                            "start": 1184,
                            "end": 1188
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1158,
                        "end": 1188
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Proposals are active during their voting period, i.e., from creation block up\nto expiration block. This will be false if the current block is later than the\nproposal's expiration.",
                        "block": true,
                        "loc": {
                            "start": 1192,
                            "end": 1391
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "isActive",
                        "loc": {
                            "start": 1395,
                            "end": 1403
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
                                    "start": 1405,
                                    "end": 1412
                                }
                            },
                            "loc": {
                                "start": 1405,
                                "end": 1412
                            }
                        },
                        "loc": {
                            "start": 1405,
                            "end": 1413
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1192,
                        "end": 1413
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isExecuted",
                        "loc": {
                            "start": 1417,
                            "end": 1427
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1429,
                                "end": 1436
                            }
                        },
                        "loc": {
                            "start": 1429,
                            "end": 1436
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1417,
                        "end": 1436
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1440,
                            "end": 1454
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "lastCall",
                        "loc": {
                            "start": 1458,
                            "end": 1466
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1468,
                                "end": 1471
                            }
                        },
                        "loc": {
                            "start": 1468,
                            "end": 1471
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1440,
                        "end": 1471
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "quorum",
                        "loc": {
                            "start": 1475,
                            "end": 1481
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1483,
                                "end": 1489
                            }
                        },
                        "loc": {
                            "start": 1483,
                            "end": 1489
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1475,
                        "end": 1489
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1493,
                            "end": 1497
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1498,
                                    "end": 1503
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
                                            "start": 1505,
                                            "end": 1507
                                        }
                                    },
                                    "loc": {
                                        "start": 1505,
                                        "end": 1507
                                    }
                                },
                                "loc": {
                                    "start": 1505,
                                    "end": 1508
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1498,
                                "end": 1508
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1511,
                                "end": 1515
                            }
                        },
                        "loc": {
                            "start": 1511,
                            "end": 1515
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1493,
                        "end": 1515
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 1519,
                            "end": 1525
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
                                    "start": 1528,
                                    "end": 1533
                                }
                            },
                            "loc": {
                                "start": 1528,
                                "end": 1533
                            }
                        },
                        "loc": {
                            "start": 1527,
                            "end": 1534
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1519,
                        "end": 1534
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 1538,
                            "end": 1548
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1550,
                                "end": 1553
                            }
                        },
                        "loc": {
                            "start": 1550,
                            "end": 1553
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1538,
                        "end": 1553
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1557,
                            "end": 1562
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1563,
                                    "end": 1569
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
                                                "start": 1572,
                                                "end": 1574
                                            }
                                        },
                                        "loc": {
                                            "start": 1572,
                                            "end": 1574
                                        }
                                    },
                                    "loc": {
                                        "start": 1572,
                                        "end": 1575
                                    }
                                },
                                "loc": {
                                    "start": 1571,
                                    "end": 1576
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1563,
                                "end": 1576
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
                                    "start": 1580,
                                    "end": 1584
                                }
                            },
                            "loc": {
                                "start": 1580,
                                "end": 1584
                            }
                        },
                        "loc": {
                            "start": 1579,
                            "end": 1585
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1557,
                        "end": 1585
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1589,
                            "end": 1600
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1601,
                                    "end": 1606
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
                                            "start": 1608,
                                            "end": 1610
                                        }
                                    },
                                    "loc": {
                                        "start": 1608,
                                        "end": 1610
                                    }
                                },
                                "loc": {
                                    "start": 1608,
                                    "end": 1611
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1601,
                                "end": 1611
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1614,
                                "end": 1625
                            }
                        },
                        "loc": {
                            "start": 1614,
                            "end": 1625
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1589,
                        "end": 1625
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1629,
                            "end": 1641
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1642,
                                    "end": 1648
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
                                                "start": 1651,
                                                "end": 1653
                                            }
                                        },
                                        "loc": {
                                            "start": 1651,
                                            "end": 1653
                                        }
                                    },
                                    "loc": {
                                        "start": 1651,
                                        "end": 1654
                                    }
                                },
                                "loc": {
                                    "start": 1650,
                                    "end": 1655
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1642,
                                "end": 1655
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
                                    "start": 1659,
                                    "end": 1670
                                }
                            },
                            "loc": {
                                "start": 1659,
                                "end": 1670
                            }
                        },
                        "loc": {
                            "start": 1658,
                            "end": 1671
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1629,
                        "end": 1671
                    }
                }
            ],
            "loc": {
                "start": 1020,
                "end": 1674
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Vote",
                "loc": {
                    "start": 1683,
                    "end": 1687
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
                            "start": 1693,
                            "end": 1698
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
                                    "start": 1700,
                                    "end": 1705
                                }
                            },
                            "loc": {
                                "start": 1700,
                                "end": 1705
                            }
                        },
                        "loc": {
                            "start": 1700,
                            "end": 1706
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1693,
                        "end": 1706
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "power",
                        "loc": {
                            "start": 1710,
                            "end": 1715
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
                                    "start": 1717,
                                    "end": 1723
                                }
                            },
                            "loc": {
                                "start": 1717,
                                "end": 1723
                            }
                        },
                        "loc": {
                            "start": 1717,
                            "end": 1724
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1710,
                        "end": 1724
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 1728,
                            "end": 1736
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
                                    "start": 1738,
                                    "end": 1746
                                }
                            },
                            "loc": {
                                "start": 1738,
                                "end": 1746
                            }
                        },
                        "loc": {
                            "start": 1738,
                            "end": 1747
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1728,
                        "end": 1747
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "castBallot",
                        "loc": {
                            "start": 1751,
                            "end": 1761
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Ballot",
                            "loc": {
                                "start": 1763,
                                "end": 1769
                            }
                        },
                        "loc": {
                            "start": 1763,
                            "end": 1769
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1751,
                        "end": 1769
                    }
                }
            ],
            "loc": {
                "start": 1678,
                "end": 1772
            }
        },
        {
            "kind": "EnumTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Ballot",
                "loc": {
                    "start": 1781,
                    "end": 1787
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
                            "start": 1793,
                            "end": 1796
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1793,
                        "end": 1796
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "No",
                        "loc": {
                            "start": 1800,
                            "end": 1802
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1800,
                        "end": 1802
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "Abstain",
                        "loc": {
                            "start": 1806,
                            "end": 1813
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1806,
                        "end": 1813
                    }
                }
            ],
            "loc": {
                "start": 1776,
                "end": 1816
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingPower",
                "loc": {
                    "start": 1825,
                    "end": 1836
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
                            "start": 1842,
                            "end": 1853
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
                                    "start": 1855,
                                    "end": 1858
                                }
                            },
                            "loc": {
                                "start": 1855,
                                "end": 1858
                            }
                        },
                        "loc": {
                            "start": 1855,
                            "end": 1859
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1842,
                        "end": 1859
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1863,
                            "end": 1868
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
                                    "start": 1870,
                                    "end": 1876
                                }
                            },
                            "loc": {
                                "start": 1870,
                                "end": 1876
                            }
                        },
                        "loc": {
                            "start": 1870,
                            "end": 1877
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1863,
                        "end": 1877
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 1881,
                            "end": 1886
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
                                    "start": 1888,
                                    "end": 1893
                                }
                            },
                            "loc": {
                                "start": 1888,
                                "end": 1893
                            }
                        },
                        "loc": {
                            "start": 1888,
                            "end": 1894
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1881,
                        "end": 1894
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1898,
                            "end": 1910
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
                                            "start": 1913,
                                            "end": 1924
                                        }
                                    },
                                    "loc": {
                                        "start": 1913,
                                        "end": 1924
                                    }
                                },
                                "loc": {
                                    "start": 1913,
                                    "end": 1925
                                }
                            },
                            "loc": {
                                "start": 1912,
                                "end": 1926
                            }
                        },
                        "loc": {
                            "start": 1912,
                            "end": 1927
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1898,
                        "end": 1927
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isStale",
                        "loc": {
                            "start": 1931,
                            "end": 1938
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1940,
                                "end": 1947
                            }
                        },
                        "loc": {
                            "start": 1940,
                            "end": 1947
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1931,
                        "end": 1947
                    }
                }
            ],
            "loc": {
                "start": 1820,
                "end": 1950
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "TotalVotingPower",
                "loc": {
                    "start": 1959,
                    "end": 1975
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
                            "start": 2002,
                            "end": 2007
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
                                    "start": 2009,
                                    "end": 2015
                                }
                            },
                            "loc": {
                                "start": 2009,
                                "end": 2015
                            }
                        },
                        "loc": {
                            "start": 2009,
                            "end": 2016
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2002,
                        "end": 2016
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 2020,
                            "end": 2032
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
                                            "start": 2035,
                                            "end": 2046
                                        }
                                    },
                                    "loc": {
                                        "start": 2035,
                                        "end": 2046
                                    }
                                },
                                "loc": {
                                    "start": 2035,
                                    "end": 2047
                                }
                            },
                            "loc": {
                                "start": 2034,
                                "end": 2048
                            }
                        },
                        "loc": {
                            "start": 2034,
                            "end": 2049
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2020,
                        "end": 2049
                    }
                }
            ],
            "loc": {
                "start": 1954,
                "end": 2052
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Voter",
                "loc": {
                    "start": 2061,
                    "end": 2066
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
                            "start": 2072,
                            "end": 2079
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
                                    "start": 2081,
                                    "end": 2083
                                }
                            },
                            "loc": {
                                "start": 2081,
                                "end": 2083
                            }
                        },
                        "loc": {
                            "start": 2081,
                            "end": 2084
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2072,
                        "end": 2084
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balance",
                        "loc": {
                            "start": 2088,
                            "end": 2095
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVault",
                                "loc": {
                                    "start": 2096,
                                    "end": 2107
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
                                            "start": 2109,
                                            "end": 2111
                                        }
                                    },
                                    "loc": {
                                        "start": 2109,
                                        "end": 2111
                                    }
                                },
                                "loc": {
                                    "start": 2109,
                                    "end": 2112
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2096,
                                "end": 2112
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2115,
                                "end": 2121
                            }
                        },
                        "loc": {
                            "start": 2115,
                            "end": 2121
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2088,
                        "end": 2121
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balances",
                        "loc": {
                            "start": 2125,
                            "end": 2133
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 2134,
                                    "end": 2146
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
                                    "loc": {
                                        "start": 2148,
                                        "end": 2153
                                    }
                                },
                                "loc": {
                                    "start": 2148,
                                    "end": 2154
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2134,
                                "end": 2154
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
                                    "start": 2158,
                                    "end": 2164
                                }
                            },
                            "loc": {
                                "start": 2158,
                                "end": 2164
                            }
                        },
                        "loc": {
                            "start": 2157,
                            "end": 2165
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2125,
                        "end": 2165
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 2169,
                            "end": 2173
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposal",
                                "loc": {
                                    "start": 2174,
                                    "end": 2182
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
                                            "start": 2184,
                                            "end": 2186
                                        }
                                    },
                                    "loc": {
                                        "start": 2184,
                                        "end": 2186
                                    }
                                },
                                "loc": {
                                    "start": 2184,
                                    "end": 2187
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2174,
                                "end": 2187
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 2189,
                                    "end": 2203
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
                                            "start": 2205,
                                            "end": 2207
                                        }
                                    },
                                    "loc": {
                                        "start": 2205,
                                        "end": 2207
                                    }
                                },
                                "loc": {
                                    "start": 2205,
                                    "end": 2208
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2189,
                                "end": 2208
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 2211,
                                "end": 2215
                            }
                        },
                        "loc": {
                            "start": 2211,
                            "end": 2215
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2169,
                        "end": 2215
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 2219,
                            "end": 2224
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposals",
                                "loc": {
                                    "start": 2225,
                                    "end": 2234
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
                                                    "start": 2237,
                                                    "end": 2239
                                                }
                                            },
                                            "loc": {
                                                "start": 2237,
                                                "end": 2239
                                            }
                                        },
                                        "loc": {
                                            "start": 2237,
                                            "end": 2240
                                        }
                                    },
                                    "loc": {
                                        "start": 2236,
                                        "end": 2241
                                    }
                                },
                                "loc": {
                                    "start": 2236,
                                    "end": 2242
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2225,
                                "end": 2242
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 2244,
                                    "end": 2258
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
                                            "start": 2260,
                                            "end": 2262
                                        }
                                    },
                                    "loc": {
                                        "start": 2260,
                                        "end": 2262
                                    }
                                },
                                "loc": {
                                    "start": 2260,
                                    "end": 2263
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2244,
                                "end": 2263
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
                                    "start": 2267,
                                    "end": 2271
                                }
                            },
                            "loc": {
                                "start": 2267,
                                "end": 2271
                            }
                        },
                        "loc": {
                            "start": 2266,
                            "end": 2272
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2219,
                        "end": 2272
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 2276,
                            "end": 2287
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVault",
                                "loc": {
                                    "start": 2288,
                                    "end": 2299
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
                                            "start": 2301,
                                            "end": 2303
                                        }
                                    },
                                    "loc": {
                                        "start": 2301,
                                        "end": 2303
                                    }
                                },
                                "loc": {
                                    "start": 2301,
                                    "end": 2304
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2288,
                                "end": 2304
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 2306,
                                    "end": 2317
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 2319,
                                        "end": 2322
                                    }
                                },
                                "loc": {
                                    "start": 2319,
                                    "end": 2322
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2306,
                                "end": 2322
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 2325,
                                "end": 2336
                            }
                        },
                        "loc": {
                            "start": 2325,
                            "end": 2336
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2276,
                        "end": 2336
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 2340,
                            "end": 2352
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 2353,
                                    "end": 2365
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
                                                    "start": 2368,
                                                    "end": 2370
                                                }
                                            },
                                            "loc": {
                                                "start": 2368,
                                                "end": 2370
                                            }
                                        },
                                        "loc": {
                                            "start": 2368,
                                            "end": 2371
                                        }
                                    },
                                    "loc": {
                                        "start": 2367,
                                        "end": 2372
                                    }
                                },
                                "loc": {
                                    "start": 2367,
                                    "end": 2373
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2353,
                                "end": 2373
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 2375,
                                    "end": 2386
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 2388,
                                        "end": 2391
                                    }
                                },
                                "loc": {
                                    "start": 2388,
                                    "end": 2391
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2375,
                                "end": 2391
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
                                    "start": 2395,
                                    "end": 2406
                                }
                            },
                            "loc": {
                                "start": 2395,
                                "end": 2406
                            }
                        },
                        "loc": {
                            "start": 2394,
                            "end": 2407
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2340,
                        "end": 2407
                    }
                }
            ],
            "loc": {
                "start": 2056,
                "end": 2410
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 2412
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
    initContext: $e2ca106c4b0edc69$export$54fae1269cb9a9e0
};
$parcel$exportWildcard(module.exports, $c3b13ec6d9e5ad30$exports);


//# sourceMappingURL=main.js.map
