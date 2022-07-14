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
        }
    }
};



class $41844f56d22dc55e$export$ca33481ae8bfff02 {
    constructor(address, provider, votingVaults){
        this.address = address;
        this.contract = (0, $1RIJT$elementficounciltypechain.CoreVoting__factory).connect(address, provider);
        this.votingVaults = votingVaults || [];
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
        const { votingPower: votingPower , castBallot: castBallot  } = await this.contract.functions.votes(voter, proposalId);
        return {
            votingPower: votingPower.toString(),
            castBallot: castBallot
        };
    }
}





class $a0cf45371a696709$export$2b7e06d96cf7f075 {
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
        } catch (error) {}
        return "0";
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
        super(address, contract);
        this.contract = contract;
    }
    async getAllVotersWithPower(fromBlock, toBlock) {
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
}






class $a1c706d406f5708a$export$93f46c2abf3fc254 extends (0, $a0cf45371a696709$export$2b7e06d96cf7f075) {
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
        } catch (error) {
            return "0";
        }
    }
    async getAllVotersWithPower(fromBlock, toBlock) {
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
}






class $e0e2802e459d88e3$export$a37e73beca8c1698 extends (0, $a0cf45371a696709$export$2b7e06d96cf7f075) {
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
        } catch (error) {
            return "0";
        }
    }
    async getAllVotersWithPower(fromBlock, toBlock) {
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
                        "value": "proposal",
                        "loc": {
                            "start": 354,
                            "end": 362
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "id",
                                "loc": {
                                    "start": 363,
                                    "end": 365
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
                                            "start": 367,
                                            "end": 369
                                        }
                                    },
                                    "loc": {
                                        "start": 367,
                                        "end": 369
                                    }
                                },
                                "loc": {
                                    "start": 367,
                                    "end": 370
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 363,
                                "end": 370
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Proposal",
                            "loc": {
                                "start": 373,
                                "end": 381
                            }
                        },
                        "loc": {
                            "start": 373,
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
                        "value": "proposals",
                        "loc": {
                            "start": 385,
                            "end": 394
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "ids",
                                "loc": {
                                    "start": 395,
                                    "end": 398
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
                                                "start": 401,
                                                "end": 403
                                            }
                                        },
                                        "loc": {
                                            "start": 401,
                                            "end": 403
                                        }
                                    },
                                    "loc": {
                                        "start": 401,
                                        "end": 404
                                    }
                                },
                                "loc": {
                                    "start": 400,
                                    "end": 405
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 395,
                                "end": 405
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "isActive",
                                "loc": {
                                    "start": 407,
                                    "end": 415
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Boolean",
                                    "loc": {
                                        "start": 417,
                                        "end": 424
                                    }
                                },
                                "loc": {
                                    "start": 417,
                                    "end": 424
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 407,
                                "end": 424
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
                                    "start": 428,
                                    "end": 436
                                }
                            },
                            "loc": {
                                "start": 428,
                                "end": 436
                            }
                        },
                        "loc": {
                            "start": 427,
                            "end": 437
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 385,
                        "end": 437
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposalCount",
                        "loc": {
                            "start": 441,
                            "end": 454
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "isActive",
                                "loc": {
                                    "start": 455,
                                    "end": 463
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Boolean",
                                    "loc": {
                                        "start": 465,
                                        "end": 472
                                    }
                                },
                                "loc": {
                                    "start": 465,
                                    "end": 472
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 455,
                                "end": 472
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 475,
                                "end": 478
                            }
                        },
                        "loc": {
                            "start": 475,
                            "end": 478
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 441,
                        "end": 478
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 482,
                            "end": 498
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 499,
                                    "end": 510
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 512,
                                        "end": 515
                                    }
                                },
                                "loc": {
                                    "start": 512,
                                    "end": 515
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 499,
                                "end": 515
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 518,
                                "end": 534
                            }
                        },
                        "loc": {
                            "start": 518,
                            "end": 534
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 482,
                        "end": 534
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 538,
                            "end": 544
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
                                    "start": 547,
                                    "end": 552
                                }
                            },
                            "loc": {
                                "start": 547,
                                "end": 552
                            }
                        },
                        "loc": {
                            "start": 546,
                            "end": 553
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 538,
                        "end": 553
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 557,
                            "end": 567
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 569,
                                "end": 572
                            }
                        },
                        "loc": {
                            "start": 569,
                            "end": 572
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 557,
                        "end": 572
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 576,
                            "end": 587
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 588,
                                    "end": 593
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
                                            "start": 595,
                                            "end": 597
                                        }
                                    },
                                    "loc": {
                                        "start": 595,
                                        "end": 597
                                    }
                                },
                                "loc": {
                                    "start": 595,
                                    "end": 598
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 588,
                                "end": 598
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 600,
                                    "end": 611
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 613,
                                        "end": 616
                                    }
                                },
                                "loc": {
                                    "start": 613,
                                    "end": 616
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 600,
                                "end": 616
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 619,
                                "end": 630
                            }
                        },
                        "loc": {
                            "start": 619,
                            "end": 630
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 576,
                        "end": 630
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 634,
                            "end": 646
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 647,
                                    "end": 653
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
                                                "start": 656,
                                                "end": 658
                                            }
                                        },
                                        "loc": {
                                            "start": 656,
                                            "end": 658
                                        }
                                    },
                                    "loc": {
                                        "start": 656,
                                        "end": 659
                                    }
                                },
                                "loc": {
                                    "start": 655,
                                    "end": 660
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 647,
                                "end": 660
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 662,
                                    "end": 673
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 675,
                                        "end": 678
                                    }
                                },
                                "loc": {
                                    "start": 675,
                                    "end": 678
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 662,
                                "end": 678
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
                                    "start": 682,
                                    "end": 693
                                }
                            },
                            "loc": {
                                "start": 682,
                                "end": 693
                            }
                        },
                        "loc": {
                            "start": 681,
                            "end": 694
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 634,
                        "end": 694
                    }
                }
            ],
            "loc": {
                "start": 280,
                "end": 697
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingVault",
                "loc": {
                    "start": 706,
                    "end": 717
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
                            "start": 723,
                            "end": 730
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
                                    "start": 732,
                                    "end": 734
                                }
                            },
                            "loc": {
                                "start": 732,
                                "end": 734
                            }
                        },
                        "loc": {
                            "start": 732,
                            "end": 735
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 723,
                        "end": 735
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 739,
                            "end": 755
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 756,
                                    "end": 767
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 769,
                                        "end": 772
                                    }
                                },
                                "loc": {
                                    "start": 769,
                                    "end": 772
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 756,
                                "end": 772
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 775,
                                "end": 791
                            }
                        },
                        "loc": {
                            "start": 775,
                            "end": 791
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 739,
                        "end": 791
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 795,
                            "end": 801
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
                                    "start": 804,
                                    "end": 809
                                }
                            },
                            "loc": {
                                "start": 804,
                                "end": 809
                            }
                        },
                        "loc": {
                            "start": 803,
                            "end": 810
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 795,
                        "end": 810
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 814,
                            "end": 824
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 826,
                                "end": 829
                            }
                        },
                        "loc": {
                            "start": 826,
                            "end": 829
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 814,
                        "end": 829
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 833,
                            "end": 844
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 845,
                                    "end": 850
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
                                            "start": 852,
                                            "end": 854
                                        }
                                    },
                                    "loc": {
                                        "start": 852,
                                        "end": 854
                                    }
                                },
                                "loc": {
                                    "start": 852,
                                    "end": 855
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 845,
                                "end": 855
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 857,
                                    "end": 868
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 870,
                                        "end": 873
                                    }
                                },
                                "loc": {
                                    "start": 870,
                                    "end": 873
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 857,
                                "end": 873
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 876,
                                "end": 887
                            }
                        },
                        "loc": {
                            "start": 876,
                            "end": 887
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 833,
                        "end": 887
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 891,
                            "end": 903
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 904,
                                    "end": 910
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
                                                "start": 913,
                                                "end": 915
                                            }
                                        },
                                        "loc": {
                                            "start": 913,
                                            "end": 915
                                        }
                                    },
                                    "loc": {
                                        "start": 913,
                                        "end": 916
                                    }
                                },
                                "loc": {
                                    "start": 912,
                                    "end": 917
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 904,
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
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "VotingPower",
                                "loc": {
                                    "start": 939,
                                    "end": 950
                                }
                            },
                            "loc": {
                                "start": 939,
                                "end": 950
                            }
                        },
                        "loc": {
                            "start": 938,
                            "end": 951
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 891,
                        "end": 951
                    }
                }
            ],
            "loc": {
                "start": 701,
                "end": 954
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Proposal",
                "loc": {
                    "start": 963,
                    "end": 971
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
                            "start": 977,
                            "end": 979
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
                                    "start": 981,
                                    "end": 983
                                }
                            },
                            "loc": {
                                "start": 981,
                                "end": 983
                            }
                        },
                        "loc": {
                            "start": 981,
                            "end": 984
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 977,
                        "end": 984
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingContract",
                        "loc": {
                            "start": 988,
                            "end": 1002
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
                                    "start": 1004,
                                    "end": 1018
                                }
                            },
                            "loc": {
                                "start": 1004,
                                "end": 1018
                            }
                        },
                        "loc": {
                            "start": 1004,
                            "end": 1019
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 988,
                        "end": 1019
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1023,
                            "end": 1037
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "created",
                        "loc": {
                            "start": 1041,
                            "end": 1048
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
                                    "start": 1050,
                                    "end": 1053
                                }
                            },
                            "loc": {
                                "start": 1050,
                                "end": 1053
                            }
                        },
                        "loc": {
                            "start": 1050,
                            "end": 1054
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1023,
                        "end": 1054
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1058,
                            "end": 1072
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "expiration",
                        "loc": {
                            "start": 1076,
                            "end": 1086
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
                                    "start": 1088,
                                    "end": 1091
                                }
                            },
                            "loc": {
                                "start": 1088,
                                "end": 1091
                            }
                        },
                        "loc": {
                            "start": 1088,
                            "end": 1092
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1058,
                        "end": 1092
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1096,
                            "end": 1110
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "unlock",
                        "loc": {
                            "start": 1114,
                            "end": 1120
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
                                    "start": 1122,
                                    "end": 1125
                                }
                            },
                            "loc": {
                                "start": 1122,
                                "end": 1125
                            }
                        },
                        "loc": {
                            "start": 1122,
                            "end": 1126
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1096,
                        "end": 1126
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Proposals are active during their voting period, i.e., from creation block up\nto expiration block. This will be false if the current block is later than the\nproposal's expiration.",
                        "block": true,
                        "loc": {
                            "start": 1130,
                            "end": 1329
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "isActive",
                        "loc": {
                            "start": 1333,
                            "end": 1341
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
                                    "start": 1343,
                                    "end": 1350
                                }
                            },
                            "loc": {
                                "start": 1343,
                                "end": 1350
                            }
                        },
                        "loc": {
                            "start": 1343,
                            "end": 1351
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1130,
                        "end": 1351
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isExecuted",
                        "loc": {
                            "start": 1355,
                            "end": 1365
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1367,
                                "end": 1374
                            }
                        },
                        "loc": {
                            "start": 1367,
                            "end": 1374
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1355,
                        "end": 1374
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1378,
                            "end": 1392
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "lastCall",
                        "loc": {
                            "start": 1396,
                            "end": 1404
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1406,
                                "end": 1409
                            }
                        },
                        "loc": {
                            "start": 1406,
                            "end": 1409
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1378,
                        "end": 1409
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "quorum",
                        "loc": {
                            "start": 1413,
                            "end": 1419
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1421,
                                "end": 1427
                            }
                        },
                        "loc": {
                            "start": 1421,
                            "end": 1427
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1413,
                        "end": 1427
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1431,
                            "end": 1435
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1436,
                                    "end": 1441
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
                                            "start": 1443,
                                            "end": 1445
                                        }
                                    },
                                    "loc": {
                                        "start": 1443,
                                        "end": 1445
                                    }
                                },
                                "loc": {
                                    "start": 1443,
                                    "end": 1446
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1436,
                                "end": 1446
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1449,
                                "end": 1453
                            }
                        },
                        "loc": {
                            "start": 1449,
                            "end": 1453
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1431,
                        "end": 1453
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 1457,
                            "end": 1463
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
                                    "start": 1466,
                                    "end": 1471
                                }
                            },
                            "loc": {
                                "start": 1466,
                                "end": 1471
                            }
                        },
                        "loc": {
                            "start": 1465,
                            "end": 1472
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1457,
                        "end": 1472
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 1476,
                            "end": 1486
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1488,
                                "end": 1491
                            }
                        },
                        "loc": {
                            "start": 1488,
                            "end": 1491
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1476,
                        "end": 1491
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1495,
                            "end": 1500
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1501,
                                    "end": 1507
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
                                                "start": 1510,
                                                "end": 1512
                                            }
                                        },
                                        "loc": {
                                            "start": 1510,
                                            "end": 1512
                                        }
                                    },
                                    "loc": {
                                        "start": 1510,
                                        "end": 1513
                                    }
                                },
                                "loc": {
                                    "start": 1509,
                                    "end": 1514
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1501,
                                "end": 1514
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
                                    "start": 1518,
                                    "end": 1522
                                }
                            },
                            "loc": {
                                "start": 1518,
                                "end": 1522
                            }
                        },
                        "loc": {
                            "start": 1517,
                            "end": 1523
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1495,
                        "end": 1523
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1527,
                            "end": 1538
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1539,
                                    "end": 1544
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
                                            "start": 1546,
                                            "end": 1548
                                        }
                                    },
                                    "loc": {
                                        "start": 1546,
                                        "end": 1548
                                    }
                                },
                                "loc": {
                                    "start": 1546,
                                    "end": 1549
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1539,
                                "end": 1549
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1552,
                                "end": 1563
                            }
                        },
                        "loc": {
                            "start": 1552,
                            "end": 1563
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1527,
                        "end": 1563
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1567,
                            "end": 1579
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1580,
                                    "end": 1586
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
                                                "start": 1589,
                                                "end": 1591
                                            }
                                        },
                                        "loc": {
                                            "start": 1589,
                                            "end": 1591
                                        }
                                    },
                                    "loc": {
                                        "start": 1589,
                                        "end": 1592
                                    }
                                },
                                "loc": {
                                    "start": 1588,
                                    "end": 1593
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1580,
                                "end": 1593
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
                                    "start": 1597,
                                    "end": 1608
                                }
                            },
                            "loc": {
                                "start": 1597,
                                "end": 1608
                            }
                        },
                        "loc": {
                            "start": 1596,
                            "end": 1609
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1567,
                        "end": 1609
                    }
                }
            ],
            "loc": {
                "start": 958,
                "end": 1612
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Vote",
                "loc": {
                    "start": 1621,
                    "end": 1625
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
                            "start": 1631,
                            "end": 1636
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
                                    "start": 1638,
                                    "end": 1643
                                }
                            },
                            "loc": {
                                "start": 1638,
                                "end": 1643
                            }
                        },
                        "loc": {
                            "start": 1638,
                            "end": 1644
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1631,
                        "end": 1644
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "power",
                        "loc": {
                            "start": 1648,
                            "end": 1653
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
                                    "start": 1655,
                                    "end": 1661
                                }
                            },
                            "loc": {
                                "start": 1655,
                                "end": 1661
                            }
                        },
                        "loc": {
                            "start": 1655,
                            "end": 1662
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1648,
                        "end": 1662
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 1666,
                            "end": 1674
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
                                    "start": 1676,
                                    "end": 1684
                                }
                            },
                            "loc": {
                                "start": 1676,
                                "end": 1684
                            }
                        },
                        "loc": {
                            "start": 1676,
                            "end": 1685
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1666,
                        "end": 1685
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "castBallot",
                        "loc": {
                            "start": 1689,
                            "end": 1699
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Ballot",
                            "loc": {
                                "start": 1701,
                                "end": 1707
                            }
                        },
                        "loc": {
                            "start": 1701,
                            "end": 1707
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1689,
                        "end": 1707
                    }
                }
            ],
            "loc": {
                "start": 1616,
                "end": 1710
            }
        },
        {
            "kind": "EnumTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Ballot",
                "loc": {
                    "start": 1719,
                    "end": 1725
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
                            "start": 1731,
                            "end": 1734
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1731,
                        "end": 1734
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "No",
                        "loc": {
                            "start": 1738,
                            "end": 1740
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1738,
                        "end": 1740
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "Abstain",
                        "loc": {
                            "start": 1744,
                            "end": 1751
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1744,
                        "end": 1751
                    }
                }
            ],
            "loc": {
                "start": 1714,
                "end": 1754
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingPower",
                "loc": {
                    "start": 1763,
                    "end": 1774
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
                            "start": 1780,
                            "end": 1791
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
                                    "start": 1793,
                                    "end": 1796
                                }
                            },
                            "loc": {
                                "start": 1793,
                                "end": 1796
                            }
                        },
                        "loc": {
                            "start": 1793,
                            "end": 1797
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1780,
                        "end": 1797
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1801,
                            "end": 1806
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
                                    "start": 1808,
                                    "end": 1814
                                }
                            },
                            "loc": {
                                "start": 1808,
                                "end": 1814
                            }
                        },
                        "loc": {
                            "start": 1808,
                            "end": 1815
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1801,
                        "end": 1815
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 1819,
                            "end": 1824
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
                                    "start": 1826,
                                    "end": 1831
                                }
                            },
                            "loc": {
                                "start": 1826,
                                "end": 1831
                            }
                        },
                        "loc": {
                            "start": 1826,
                            "end": 1832
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1819,
                        "end": 1832
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1836,
                            "end": 1848
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
                                            "start": 1851,
                                            "end": 1862
                                        }
                                    },
                                    "loc": {
                                        "start": 1851,
                                        "end": 1862
                                    }
                                },
                                "loc": {
                                    "start": 1851,
                                    "end": 1863
                                }
                            },
                            "loc": {
                                "start": 1850,
                                "end": 1864
                            }
                        },
                        "loc": {
                            "start": 1850,
                            "end": 1865
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1836,
                        "end": 1865
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isStale",
                        "loc": {
                            "start": 1869,
                            "end": 1876
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1878,
                                "end": 1885
                            }
                        },
                        "loc": {
                            "start": 1878,
                            "end": 1885
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1869,
                        "end": 1885
                    }
                }
            ],
            "loc": {
                "start": 1758,
                "end": 1888
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "TotalVotingPower",
                "loc": {
                    "start": 1897,
                    "end": 1913
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
                            "start": 1919,
                            "end": 1930
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
                                    "start": 1932,
                                    "end": 1935
                                }
                            },
                            "loc": {
                                "start": 1932,
                                "end": 1935
                            }
                        },
                        "loc": {
                            "start": 1932,
                            "end": 1936
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1919,
                        "end": 1936
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1940,
                            "end": 1945
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
                                    "start": 1947,
                                    "end": 1953
                                }
                            },
                            "loc": {
                                "start": 1947,
                                "end": 1953
                            }
                        },
                        "loc": {
                            "start": 1947,
                            "end": 1954
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1940,
                        "end": 1954
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1958,
                            "end": 1970
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
                                            "start": 1973,
                                            "end": 1984
                                        }
                                    },
                                    "loc": {
                                        "start": 1973,
                                        "end": 1984
                                    }
                                },
                                "loc": {
                                    "start": 1973,
                                    "end": 1985
                                }
                            },
                            "loc": {
                                "start": 1972,
                                "end": 1986
                            }
                        },
                        "loc": {
                            "start": 1972,
                            "end": 1987
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1958,
                        "end": 1987
                    }
                }
            ],
            "loc": {
                "start": 1892,
                "end": 1990
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Voter",
                "loc": {
                    "start": 1999,
                    "end": 2004
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
                            "start": 2010,
                            "end": 2017
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
                                    "start": 2019,
                                    "end": 2021
                                }
                            },
                            "loc": {
                                "start": 2019,
                                "end": 2021
                            }
                        },
                        "loc": {
                            "start": 2019,
                            "end": 2022
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2010,
                        "end": 2022
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 2026,
                            "end": 2030
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposal",
                                "loc": {
                                    "start": 2031,
                                    "end": 2039
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
                                            "start": 2041,
                                            "end": 2043
                                        }
                                    },
                                    "loc": {
                                        "start": 2041,
                                        "end": 2043
                                    }
                                },
                                "loc": {
                                    "start": 2041,
                                    "end": 2044
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2031,
                                "end": 2044
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 2046,
                                    "end": 2060
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
                                            "start": 2062,
                                            "end": 2064
                                        }
                                    },
                                    "loc": {
                                        "start": 2062,
                                        "end": 2064
                                    }
                                },
                                "loc": {
                                    "start": 2062,
                                    "end": 2065
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2046,
                                "end": 2065
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 2068,
                                "end": 2072
                            }
                        },
                        "loc": {
                            "start": 2068,
                            "end": 2072
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2026,
                        "end": 2072
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 2076,
                            "end": 2081
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposals",
                                "loc": {
                                    "start": 2082,
                                    "end": 2091
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
                                                    "start": 2094,
                                                    "end": 2096
                                                }
                                            },
                                            "loc": {
                                                "start": 2094,
                                                "end": 2096
                                            }
                                        },
                                        "loc": {
                                            "start": 2094,
                                            "end": 2097
                                        }
                                    },
                                    "loc": {
                                        "start": 2093,
                                        "end": 2098
                                    }
                                },
                                "loc": {
                                    "start": 2093,
                                    "end": 2099
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2082,
                                "end": 2099
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 2101,
                                    "end": 2115
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
                                            "start": 2117,
                                            "end": 2119
                                        }
                                    },
                                    "loc": {
                                        "start": 2117,
                                        "end": 2119
                                    }
                                },
                                "loc": {
                                    "start": 2117,
                                    "end": 2120
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2101,
                                "end": 2120
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
                                    "start": 2124,
                                    "end": 2128
                                }
                            },
                            "loc": {
                                "start": 2124,
                                "end": 2128
                            }
                        },
                        "loc": {
                            "start": 2123,
                            "end": 2129
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2076,
                        "end": 2129
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 2133,
                            "end": 2144
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVault",
                                "loc": {
                                    "start": 2145,
                                    "end": 2156
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
                                            "start": 2158,
                                            "end": 2160
                                        }
                                    },
                                    "loc": {
                                        "start": 2158,
                                        "end": 2160
                                    }
                                },
                                "loc": {
                                    "start": 2158,
                                    "end": 2161
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2145,
                                "end": 2161
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 2163,
                                    "end": 2174
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 2176,
                                        "end": 2179
                                    }
                                },
                                "loc": {
                                    "start": 2176,
                                    "end": 2179
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2163,
                                "end": 2179
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 2182,
                                "end": 2193
                            }
                        },
                        "loc": {
                            "start": 2182,
                            "end": 2193
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2133,
                        "end": 2193
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 2197,
                            "end": 2209
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 2210,
                                    "end": 2222
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
                                                    "start": 2225,
                                                    "end": 2227
                                                }
                                            },
                                            "loc": {
                                                "start": 2225,
                                                "end": 2227
                                            }
                                        },
                                        "loc": {
                                            "start": 2225,
                                            "end": 2228
                                        }
                                    },
                                    "loc": {
                                        "start": 2224,
                                        "end": 2229
                                    }
                                },
                                "loc": {
                                    "start": 2224,
                                    "end": 2230
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2210,
                                "end": 2230
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 2232,
                                    "end": 2243
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 2245,
                                        "end": 2248
                                    }
                                },
                                "loc": {
                                    "start": 2245,
                                    "end": 2248
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2232,
                                "end": 2248
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
                                    "start": 2252,
                                    "end": 2263
                                }
                            },
                            "loc": {
                                "start": 2252,
                                "end": 2263
                            }
                        },
                        "loc": {
                            "start": 2251,
                            "end": 2264
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2197,
                        "end": 2264
                    }
                }
            ],
            "loc": {
                "start": 1994,
                "end": 2267
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 2269
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
