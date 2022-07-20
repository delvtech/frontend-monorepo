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
    async getBalance(voter) {
        return "0";
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
    async getBalance(voter) {
        const [, balance] = await this.contract.functions.deposits(voter);
        return balance.toString();
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
    async getBalance(voter) {
        try {
            const grants = await this.contract.functions.getGrant(voter);
            return grants[0].toString();
        } catch (err) {
            // TODO: Handle error
            return "0";
        }
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
                                    "start": 261,
                                    "end": 266
                                }
                            },
                            "loc": {
                                "start": 261,
                                "end": 266
                            }
                        },
                        "loc": {
                            "start": 260,
                            "end": 267
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 234,
                        "end": 267
                    }
                }
            ],
            "loc": {
                "start": 0,
                "end": 269
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingContract",
                "loc": {
                    "start": 276,
                    "end": 290
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
                            "start": 295,
                            "end": 302
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
                                    "start": 304,
                                    "end": 306
                                }
                            },
                            "loc": {
                                "start": 304,
                                "end": 306
                            }
                        },
                        "loc": {
                            "start": 304,
                            "end": 307
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 295,
                        "end": 307
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 310,
                            "end": 322
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
                                            "start": 325,
                                            "end": 336
                                        }
                                    },
                                    "loc": {
                                        "start": 325,
                                        "end": 336
                                    }
                                },
                                "loc": {
                                    "start": 325,
                                    "end": 337
                                }
                            },
                            "loc": {
                                "start": 324,
                                "end": 338
                            }
                        },
                        "loc": {
                            "start": 324,
                            "end": 339
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 310,
                        "end": 339
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balance",
                        "loc": {
                            "start": 342,
                            "end": 349
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 350,
                                    "end": 355
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
                                            "start": 357,
                                            "end": 359
                                        }
                                    },
                                    "loc": {
                                        "start": 357,
                                        "end": 359
                                    }
                                },
                                "loc": {
                                    "start": 357,
                                    "end": 360
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 350,
                                "end": 360
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 363,
                                "end": 369
                            }
                        },
                        "loc": {
                            "start": 363,
                            "end": 369
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 342,
                        "end": 369
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 372,
                            "end": 380
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "id",
                                "loc": {
                                    "start": 381,
                                    "end": 383
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
                                            "start": 385,
                                            "end": 387
                                        }
                                    },
                                    "loc": {
                                        "start": 385,
                                        "end": 387
                                    }
                                },
                                "loc": {
                                    "start": 385,
                                    "end": 388
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 381,
                                "end": 388
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Proposal",
                            "loc": {
                                "start": 391,
                                "end": 399
                            }
                        },
                        "loc": {
                            "start": 391,
                            "end": 399
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 372,
                        "end": 399
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposals",
                        "loc": {
                            "start": 402,
                            "end": 411
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "ids",
                                "loc": {
                                    "start": 412,
                                    "end": 415
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
                                                "start": 418,
                                                "end": 420
                                            }
                                        },
                                        "loc": {
                                            "start": 418,
                                            "end": 420
                                        }
                                    },
                                    "loc": {
                                        "start": 418,
                                        "end": 421
                                    }
                                },
                                "loc": {
                                    "start": 417,
                                    "end": 422
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 412,
                                "end": 422
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "isActive",
                                "loc": {
                                    "start": 424,
                                    "end": 432
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Boolean",
                                    "loc": {
                                        "start": 434,
                                        "end": 441
                                    }
                                },
                                "loc": {
                                    "start": 434,
                                    "end": 441
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 424,
                                "end": 441
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
                                    "start": 445,
                                    "end": 453
                                }
                            },
                            "loc": {
                                "start": 445,
                                "end": 453
                            }
                        },
                        "loc": {
                            "start": 444,
                            "end": 454
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 402,
                        "end": 454
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposalCount",
                        "loc": {
                            "start": 457,
                            "end": 470
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "isActive",
                                "loc": {
                                    "start": 471,
                                    "end": 479
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Boolean",
                                    "loc": {
                                        "start": 481,
                                        "end": 488
                                    }
                                },
                                "loc": {
                                    "start": 481,
                                    "end": 488
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 471,
                                "end": 488
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 491,
                                "end": 494
                            }
                        },
                        "loc": {
                            "start": 491,
                            "end": 494
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 457,
                        "end": 494
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 497,
                            "end": 513
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 514,
                                    "end": 525
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 527,
                                        "end": 530
                                    }
                                },
                                "loc": {
                                    "start": 527,
                                    "end": 530
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 514,
                                "end": 530
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 533,
                                "end": 549
                            }
                        },
                        "loc": {
                            "start": 533,
                            "end": 549
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 497,
                        "end": 549
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 552,
                            "end": 558
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
                                    "start": 561,
                                    "end": 566
                                }
                            },
                            "loc": {
                                "start": 561,
                                "end": 566
                            }
                        },
                        "loc": {
                            "start": 560,
                            "end": 567
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 552,
                        "end": 567
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 570,
                            "end": 580
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 582,
                                "end": 585
                            }
                        },
                        "loc": {
                            "start": 582,
                            "end": 585
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 570,
                        "end": 585
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 588,
                            "end": 599
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 600,
                                    "end": 605
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
                                            "start": 607,
                                            "end": 609
                                        }
                                    },
                                    "loc": {
                                        "start": 607,
                                        "end": 609
                                    }
                                },
                                "loc": {
                                    "start": 607,
                                    "end": 610
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 600,
                                "end": 610
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 612,
                                    "end": 623
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 625,
                                        "end": 628
                                    }
                                },
                                "loc": {
                                    "start": 625,
                                    "end": 628
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 612,
                                "end": 628
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 631,
                                "end": 642
                            }
                        },
                        "loc": {
                            "start": 631,
                            "end": 642
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 588,
                        "end": 642
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 645,
                            "end": 657
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 658,
                                    "end": 664
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
                                                "start": 667,
                                                "end": 669
                                            }
                                        },
                                        "loc": {
                                            "start": 667,
                                            "end": 669
                                        }
                                    },
                                    "loc": {
                                        "start": 667,
                                        "end": 670
                                    }
                                },
                                "loc": {
                                    "start": 666,
                                    "end": 671
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 658,
                                "end": 671
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 673,
                                    "end": 684
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 686,
                                        "end": 689
                                    }
                                },
                                "loc": {
                                    "start": 686,
                                    "end": 689
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 673,
                                "end": 689
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
                                    "start": 693,
                                    "end": 704
                                }
                            },
                            "loc": {
                                "start": 693,
                                "end": 704
                            }
                        },
                        "loc": {
                            "start": 692,
                            "end": 705
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 645,
                        "end": 705
                    }
                }
            ],
            "loc": {
                "start": 271,
                "end": 707
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingVault",
                "loc": {
                    "start": 714,
                    "end": 725
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
                            "start": 730,
                            "end": 737
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
                                    "start": 739,
                                    "end": 741
                                }
                            },
                            "loc": {
                                "start": 739,
                                "end": 741
                            }
                        },
                        "loc": {
                            "start": 739,
                            "end": 742
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 730,
                        "end": 742
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balance",
                        "loc": {
                            "start": 745,
                            "end": 752
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 753,
                                    "end": 758
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
                                            "start": 760,
                                            "end": 762
                                        }
                                    },
                                    "loc": {
                                        "start": 760,
                                        "end": 762
                                    }
                                },
                                "loc": {
                                    "start": 760,
                                    "end": 763
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 753,
                                "end": 763
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 766,
                                "end": 772
                            }
                        },
                        "loc": {
                            "start": 766,
                            "end": 772
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 745,
                        "end": 772
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 775,
                            "end": 791
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 792,
                                    "end": 803
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 805,
                                        "end": 808
                                    }
                                },
                                "loc": {
                                    "start": 805,
                                    "end": 808
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 792,
                                "end": 808
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 811,
                                "end": 827
                            }
                        },
                        "loc": {
                            "start": 811,
                            "end": 827
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 775,
                        "end": 827
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 830,
                            "end": 836
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
                                    "start": 839,
                                    "end": 844
                                }
                            },
                            "loc": {
                                "start": 839,
                                "end": 844
                            }
                        },
                        "loc": {
                            "start": 838,
                            "end": 845
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 830,
                        "end": 845
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 848,
                            "end": 858
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 860,
                                "end": 863
                            }
                        },
                        "loc": {
                            "start": 860,
                            "end": 863
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 848,
                        "end": 863
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 866,
                            "end": 877
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 878,
                                    "end": 883
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
                                            "start": 885,
                                            "end": 887
                                        }
                                    },
                                    "loc": {
                                        "start": 885,
                                        "end": 887
                                    }
                                },
                                "loc": {
                                    "start": 885,
                                    "end": 888
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 878,
                                "end": 888
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 890,
                                    "end": 901
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 903,
                                        "end": 906
                                    }
                                },
                                "loc": {
                                    "start": 903,
                                    "end": 906
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 890,
                                "end": 906
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 909,
                                "end": 920
                            }
                        },
                        "loc": {
                            "start": 909,
                            "end": 920
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 866,
                        "end": 920
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 923,
                            "end": 935
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 936,
                                    "end": 942
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
                                                "start": 945,
                                                "end": 947
                                            }
                                        },
                                        "loc": {
                                            "start": 945,
                                            "end": 947
                                        }
                                    },
                                    "loc": {
                                        "start": 945,
                                        "end": 948
                                    }
                                },
                                "loc": {
                                    "start": 944,
                                    "end": 949
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 936,
                                "end": 949
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 951,
                                    "end": 962
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 964,
                                        "end": 967
                                    }
                                },
                                "loc": {
                                    "start": 964,
                                    "end": 967
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 951,
                                "end": 967
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
                                    "start": 971,
                                    "end": 982
                                }
                            },
                            "loc": {
                                "start": 971,
                                "end": 982
                            }
                        },
                        "loc": {
                            "start": 970,
                            "end": 983
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 923,
                        "end": 983
                    }
                }
            ],
            "loc": {
                "start": 709,
                "end": 985
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Proposal",
                "loc": {
                    "start": 992,
                    "end": 1000
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
                            "start": 1005,
                            "end": 1007
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
                                    "start": 1009,
                                    "end": 1011
                                }
                            },
                            "loc": {
                                "start": 1009,
                                "end": 1011
                            }
                        },
                        "loc": {
                            "start": 1009,
                            "end": 1012
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1005,
                        "end": 1012
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingContract",
                        "loc": {
                            "start": 1015,
                            "end": 1029
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
                                    "start": 1031,
                                    "end": 1045
                                }
                            },
                            "loc": {
                                "start": 1031,
                                "end": 1045
                            }
                        },
                        "loc": {
                            "start": 1031,
                            "end": 1046
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1015,
                        "end": 1046
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1049,
                            "end": 1063
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "created",
                        "loc": {
                            "start": 1066,
                            "end": 1073
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
                                    "start": 1075,
                                    "end": 1078
                                }
                            },
                            "loc": {
                                "start": 1075,
                                "end": 1078
                            }
                        },
                        "loc": {
                            "start": 1075,
                            "end": 1079
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1049,
                        "end": 1079
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1082,
                            "end": 1096
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "expiration",
                        "loc": {
                            "start": 1099,
                            "end": 1109
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
                                    "start": 1111,
                                    "end": 1114
                                }
                            },
                            "loc": {
                                "start": 1111,
                                "end": 1114
                            }
                        },
                        "loc": {
                            "start": 1111,
                            "end": 1115
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1082,
                        "end": 1115
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1118,
                            "end": 1132
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "unlock",
                        "loc": {
                            "start": 1135,
                            "end": 1141
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
                                    "start": 1143,
                                    "end": 1146
                                }
                            },
                            "loc": {
                                "start": 1143,
                                "end": 1146
                            }
                        },
                        "loc": {
                            "start": 1143,
                            "end": 1147
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1118,
                        "end": 1147
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Proposals are active during their voting period, i.e., from creation block up\nto expiration block. This will be false if the current block is later than the\nproposal's expiration.",
                        "block": true,
                        "loc": {
                            "start": 1150,
                            "end": 1345
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "isActive",
                        "loc": {
                            "start": 1348,
                            "end": 1356
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
                                    "start": 1358,
                                    "end": 1365
                                }
                            },
                            "loc": {
                                "start": 1358,
                                "end": 1365
                            }
                        },
                        "loc": {
                            "start": 1358,
                            "end": 1366
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1150,
                        "end": 1366
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isExecuted",
                        "loc": {
                            "start": 1369,
                            "end": 1379
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1381,
                                "end": 1388
                            }
                        },
                        "loc": {
                            "start": 1381,
                            "end": 1388
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1369,
                        "end": 1388
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1391,
                            "end": 1405
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "lastCall",
                        "loc": {
                            "start": 1408,
                            "end": 1416
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1418,
                                "end": 1421
                            }
                        },
                        "loc": {
                            "start": 1418,
                            "end": 1421
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1391,
                        "end": 1421
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "quorum",
                        "loc": {
                            "start": 1424,
                            "end": 1430
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1432,
                                "end": 1438
                            }
                        },
                        "loc": {
                            "start": 1432,
                            "end": 1438
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1424,
                        "end": 1438
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1441,
                            "end": 1445
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1446,
                                    "end": 1451
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
                                            "start": 1453,
                                            "end": 1455
                                        }
                                    },
                                    "loc": {
                                        "start": 1453,
                                        "end": 1455
                                    }
                                },
                                "loc": {
                                    "start": 1453,
                                    "end": 1456
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1446,
                                "end": 1456
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1459,
                                "end": 1463
                            }
                        },
                        "loc": {
                            "start": 1459,
                            "end": 1463
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1441,
                        "end": 1463
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 1466,
                            "end": 1472
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
                                    "start": 1475,
                                    "end": 1480
                                }
                            },
                            "loc": {
                                "start": 1475,
                                "end": 1480
                            }
                        },
                        "loc": {
                            "start": 1474,
                            "end": 1481
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1466,
                        "end": 1481
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voterCount",
                        "loc": {
                            "start": 1484,
                            "end": 1494
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1496,
                                "end": 1499
                            }
                        },
                        "loc": {
                            "start": 1496,
                            "end": 1499
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1484,
                        "end": 1499
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1502,
                            "end": 1507
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1508,
                                    "end": 1514
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
                                                "start": 1517,
                                                "end": 1519
                                            }
                                        },
                                        "loc": {
                                            "start": 1517,
                                            "end": 1519
                                        }
                                    },
                                    "loc": {
                                        "start": 1517,
                                        "end": 1520
                                    }
                                },
                                "loc": {
                                    "start": 1516,
                                    "end": 1521
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1508,
                                "end": 1521
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
                                    "start": 1525,
                                    "end": 1529
                                }
                            },
                            "loc": {
                                "start": 1525,
                                "end": 1529
                            }
                        },
                        "loc": {
                            "start": 1524,
                            "end": 1530
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1502,
                        "end": 1530
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1533,
                            "end": 1544
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1545,
                                    "end": 1550
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
                                            "start": 1552,
                                            "end": 1554
                                        }
                                    },
                                    "loc": {
                                        "start": 1552,
                                        "end": 1554
                                    }
                                },
                                "loc": {
                                    "start": 1552,
                                    "end": 1555
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1545,
                                "end": 1555
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1558,
                                "end": 1569
                            }
                        },
                        "loc": {
                            "start": 1558,
                            "end": 1569
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1533,
                        "end": 1569
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1572,
                            "end": 1584
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1585,
                                    "end": 1591
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
                                                "start": 1594,
                                                "end": 1596
                                            }
                                        },
                                        "loc": {
                                            "start": 1594,
                                            "end": 1596
                                        }
                                    },
                                    "loc": {
                                        "start": 1594,
                                        "end": 1597
                                    }
                                },
                                "loc": {
                                    "start": 1593,
                                    "end": 1598
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1585,
                                "end": 1598
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
                                    "start": 1602,
                                    "end": 1613
                                }
                            },
                            "loc": {
                                "start": 1602,
                                "end": 1613
                            }
                        },
                        "loc": {
                            "start": 1601,
                            "end": 1614
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1572,
                        "end": 1614
                    }
                }
            ],
            "loc": {
                "start": 987,
                "end": 1616
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Vote",
                "loc": {
                    "start": 1623,
                    "end": 1627
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
                            "start": 1632,
                            "end": 1637
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
                                    "start": 1639,
                                    "end": 1644
                                }
                            },
                            "loc": {
                                "start": 1639,
                                "end": 1644
                            }
                        },
                        "loc": {
                            "start": 1639,
                            "end": 1645
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1632,
                        "end": 1645
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
                            "start": 1665,
                            "end": 1673
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
                                    "start": 1675,
                                    "end": 1683
                                }
                            },
                            "loc": {
                                "start": 1675,
                                "end": 1683
                            }
                        },
                        "loc": {
                            "start": 1675,
                            "end": 1684
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1665,
                        "end": 1684
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "castBallot",
                        "loc": {
                            "start": 1687,
                            "end": 1697
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Ballot",
                            "loc": {
                                "start": 1699,
                                "end": 1705
                            }
                        },
                        "loc": {
                            "start": 1699,
                            "end": 1705
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1687,
                        "end": 1705
                    }
                }
            ],
            "loc": {
                "start": 1618,
                "end": 1707
            }
        },
        {
            "kind": "EnumTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Ballot",
                "loc": {
                    "start": 1714,
                    "end": 1720
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
                            "start": 1725,
                            "end": 1728
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1725,
                        "end": 1728
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "No",
                        "loc": {
                            "start": 1731,
                            "end": 1733
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1731,
                        "end": 1733
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "Abstain",
                        "loc": {
                            "start": 1736,
                            "end": 1743
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1736,
                        "end": 1743
                    }
                }
            ],
            "loc": {
                "start": 1709,
                "end": 1745
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingPower",
                "loc": {
                    "start": 1752,
                    "end": 1763
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
                            "start": 1768,
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
                                "value": "Int",
                                "loc": {
                                    "start": 1781,
                                    "end": 1784
                                }
                            },
                            "loc": {
                                "start": 1781,
                                "end": 1784
                            }
                        },
                        "loc": {
                            "start": 1781,
                            "end": 1785
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1768,
                        "end": 1785
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1788,
                            "end": 1793
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
                                    "start": 1795,
                                    "end": 1801
                                }
                            },
                            "loc": {
                                "start": 1795,
                                "end": 1801
                            }
                        },
                        "loc": {
                            "start": 1795,
                            "end": 1802
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1788,
                        "end": 1802
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
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
                                "value": "Voter",
                                "loc": {
                                    "start": 1812,
                                    "end": 1817
                                }
                            },
                            "loc": {
                                "start": 1812,
                                "end": 1817
                            }
                        },
                        "loc": {
                            "start": 1812,
                            "end": 1818
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1805,
                        "end": 1818
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1821,
                            "end": 1833
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
                                            "start": 1836,
                                            "end": 1847
                                        }
                                    },
                                    "loc": {
                                        "start": 1836,
                                        "end": 1847
                                    }
                                },
                                "loc": {
                                    "start": 1836,
                                    "end": 1848
                                }
                            },
                            "loc": {
                                "start": 1835,
                                "end": 1849
                            }
                        },
                        "loc": {
                            "start": 1835,
                            "end": 1850
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1821,
                        "end": 1850
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isStale",
                        "loc": {
                            "start": 1853,
                            "end": 1860
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1862,
                                "end": 1869
                            }
                        },
                        "loc": {
                            "start": 1862,
                            "end": 1869
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1853,
                        "end": 1869
                    }
                }
            ],
            "loc": {
                "start": 1747,
                "end": 1871
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "TotalVotingPower",
                "loc": {
                    "start": 1878,
                    "end": 1894
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
                            "start": 1899,
                            "end": 1910
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
                                    "start": 1912,
                                    "end": 1915
                                }
                            },
                            "loc": {
                                "start": 1912,
                                "end": 1915
                            }
                        },
                        "loc": {
                            "start": 1912,
                            "end": 1916
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1899,
                        "end": 1916
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1919,
                            "end": 1924
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
                                    "start": 1926,
                                    "end": 1932
                                }
                            },
                            "loc": {
                                "start": 1926,
                                "end": 1932
                            }
                        },
                        "loc": {
                            "start": 1926,
                            "end": 1933
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1919,
                        "end": 1933
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1936,
                            "end": 1948
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
                                            "start": 1951,
                                            "end": 1962
                                        }
                                    },
                                    "loc": {
                                        "start": 1951,
                                        "end": 1962
                                    }
                                },
                                "loc": {
                                    "start": 1951,
                                    "end": 1963
                                }
                            },
                            "loc": {
                                "start": 1950,
                                "end": 1964
                            }
                        },
                        "loc": {
                            "start": 1950,
                            "end": 1965
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1936,
                        "end": 1965
                    }
                }
            ],
            "loc": {
                "start": 1873,
                "end": 1967
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Voter",
                "loc": {
                    "start": 1974,
                    "end": 1979
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
                            "start": 1984,
                            "end": 1991
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
                                    "start": 1993,
                                    "end": 1995
                                }
                            },
                            "loc": {
                                "start": 1993,
                                "end": 1995
                            }
                        },
                        "loc": {
                            "start": 1993,
                            "end": 1996
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1984,
                        "end": 1996
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balance",
                        "loc": {
                            "start": 1999,
                            "end": 2006
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVault",
                                "loc": {
                                    "start": 2007,
                                    "end": 2018
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
                                            "start": 2020,
                                            "end": 2022
                                        }
                                    },
                                    "loc": {
                                        "start": 2020,
                                        "end": 2022
                                    }
                                },
                                "loc": {
                                    "start": 2020,
                                    "end": 2023
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2007,
                                "end": 2023
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2026,
                                "end": 2032
                            }
                        },
                        "loc": {
                            "start": 2026,
                            "end": 2032
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1999,
                        "end": 2032
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balances",
                        "loc": {
                            "start": 2035,
                            "end": 2043
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 2044,
                                    "end": 2056
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
                                                    "start": 2059,
                                                    "end": 2061
                                                }
                                            },
                                            "loc": {
                                                "start": 2059,
                                                "end": 2061
                                            }
                                        },
                                        "loc": {
                                            "start": 2059,
                                            "end": 2062
                                        }
                                    },
                                    "loc": {
                                        "start": 2058,
                                        "end": 2063
                                    }
                                },
                                "loc": {
                                    "start": 2058,
                                    "end": 2064
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2044,
                                "end": 2064
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
                                    "start": 2068,
                                    "end": 2074
                                }
                            },
                            "loc": {
                                "start": 2068,
                                "end": 2074
                            }
                        },
                        "loc": {
                            "start": 2067,
                            "end": 2075
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2035,
                        "end": 2075
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 2078,
                            "end": 2082
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposal",
                                "loc": {
                                    "start": 2083,
                                    "end": 2091
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
                                            "start": 2093,
                                            "end": 2095
                                        }
                                    },
                                    "loc": {
                                        "start": 2093,
                                        "end": 2095
                                    }
                                },
                                "loc": {
                                    "start": 2093,
                                    "end": 2096
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2083,
                                "end": 2096
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 2098,
                                    "end": 2112
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
                                            "start": 2114,
                                            "end": 2116
                                        }
                                    },
                                    "loc": {
                                        "start": 2114,
                                        "end": 2116
                                    }
                                },
                                "loc": {
                                    "start": 2114,
                                    "end": 2117
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2098,
                                "end": 2117
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 2120,
                                "end": 2124
                            }
                        },
                        "loc": {
                            "start": 2120,
                            "end": 2124
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2078,
                        "end": 2124
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 2127,
                            "end": 2132
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposals",
                                "loc": {
                                    "start": 2133,
                                    "end": 2142
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
                                                    "start": 2145,
                                                    "end": 2147
                                                }
                                            },
                                            "loc": {
                                                "start": 2145,
                                                "end": 2147
                                            }
                                        },
                                        "loc": {
                                            "start": 2145,
                                            "end": 2148
                                        }
                                    },
                                    "loc": {
                                        "start": 2144,
                                        "end": 2149
                                    }
                                },
                                "loc": {
                                    "start": 2144,
                                    "end": 2150
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2133,
                                "end": 2150
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 2152,
                                    "end": 2166
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
                                            "start": 2168,
                                            "end": 2170
                                        }
                                    },
                                    "loc": {
                                        "start": 2168,
                                        "end": 2170
                                    }
                                },
                                "loc": {
                                    "start": 2168,
                                    "end": 2171
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2152,
                                "end": 2171
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
                                    "start": 2175,
                                    "end": 2179
                                }
                            },
                            "loc": {
                                "start": 2175,
                                "end": 2179
                            }
                        },
                        "loc": {
                            "start": 2174,
                            "end": 2180
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2127,
                        "end": 2180
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 2183,
                            "end": 2194
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVault",
                                "loc": {
                                    "start": 2195,
                                    "end": 2206
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
                                            "start": 2208,
                                            "end": 2210
                                        }
                                    },
                                    "loc": {
                                        "start": 2208,
                                        "end": 2210
                                    }
                                },
                                "loc": {
                                    "start": 2208,
                                    "end": 2211
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2195,
                                "end": 2211
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 2213,
                                    "end": 2224
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 2226,
                                        "end": 2229
                                    }
                                },
                                "loc": {
                                    "start": 2226,
                                    "end": 2229
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2213,
                                "end": 2229
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 2232,
                                "end": 2243
                            }
                        },
                        "loc": {
                            "start": 2232,
                            "end": 2243
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2183,
                        "end": 2243
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 2246,
                            "end": 2258
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 2259,
                                    "end": 2271
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
                                                    "start": 2274,
                                                    "end": 2276
                                                }
                                            },
                                            "loc": {
                                                "start": 2274,
                                                "end": 2276
                                            }
                                        },
                                        "loc": {
                                            "start": 2274,
                                            "end": 2277
                                        }
                                    },
                                    "loc": {
                                        "start": 2273,
                                        "end": 2278
                                    }
                                },
                                "loc": {
                                    "start": 2273,
                                    "end": 2279
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2259,
                                "end": 2279
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 2281,
                                    "end": 2292
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 2294,
                                        "end": 2297
                                    }
                                },
                                "loc": {
                                    "start": 2294,
                                    "end": 2297
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2281,
                                "end": 2297
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
                                    "start": 2301,
                                    "end": 2312
                                }
                            },
                            "loc": {
                                "start": 2301,
                                "end": 2312
                            }
                        },
                        "loc": {
                            "start": 2300,
                            "end": 2313
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2246,
                        "end": 2313
                    }
                }
            ],
            "loc": {
                "start": 1969,
                "end": 2315
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 2316
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
