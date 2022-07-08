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
    },
    async getByVotingContract ({ votingContract: votingContract , context: context  }) {
        const dataSource = (0, $a9d8dc444614e877$export$8f465fcd5ae4b18c)(votingContract.address, context.councilDataSources);
        if (!dataSource) return [];
        const args = await dataSource.getProposalCreatedEventArgs((0, $97c17b3f7f480abc$export$472b2ff001c2cfbf)(context.chainId));
        return args.map(({ created: created , execution: execution , expiration: expiration , proposalId: proposalId  })=>{
            return {
                id: proposalId,
                votingContract: votingContract,
                created: created,
                expiration: expiration,
                unlock: execution
            };
        });
    }
};
function $e35651dc583d7dca$var$getByIdFromDataSource(proposal, context) {
    const dataSource = (0, $a9d8dc444614e877$export$8f465fcd5ae4b18c)(proposal.votingContract.address, context.councilDataSources);
    return dataSource.getProposalById(proposal.id);
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


// TODO: Should this come from method arguments as `excludeAddresses`?
const $ac266e1a17cc8ea7$var$nonVoters = [
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000001", 
];
const $ac266e1a17cc8ea7$export$40a03fbff71f56d3 = {
    async getByVotingVault ({ votingVault: votingVault , blockNumber: blockNumber , context: context  }) {
        const { chainId: chainId , councilDataSources: councilDataSources , provider: provider  } = context;
        const dataSource = (0, $a9d8dc444614e877$export$2c8942c776a655d1)(votingVault.address, councilDataSources);
        let total = BigInt(0);
        blockNumber = blockNumber || await (0, $730705444d2faf33$export$24d97b9dae72698)(provider);
        const powerChanges = await dataSource.getVoteChangeEventArgs((0, $97c17b3f7f480abc$export$472b2ff001c2cfbf)(chainId), blockNumber);
        if (powerChanges) {
            for (const { to: to , amount: amount  } of powerChanges)if (!$ac266e1a17cc8ea7$var$nonVoters.includes(to)) total += BigInt(amount);
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
            const vaultVotingPower = await this.getByVotingVault({
                votingVault: votingVault,
                blockNumber: blockNumber,
                context: context
            });
            aggregateValue += (0, $1RIJT$etherslibutils.parseEther)(vaultVotingPower.value).toBigInt();
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
    // TODO: Revisit logic for calculating voting power based on vault type, eg:
    // disambiguate the list of vaults, instead of falling through
    async getByVotingVaults ({ votingVaults: votingVaults , blockNumber: blockNumber , context: { councilDataSources: councilDataSources  } ,  }) {
        const voterPowers = {};
        for (const votingVault of votingVaults){
            const dataSource = (0, $a9d8dc444614e877$export$2c8942c776a655d1)(votingVault.address, councilDataSources);
            // any change of voting power (delegating, depositing more ELFI, etc..)
            // will trigger this event on certain voting vaults.
            const powerChanges = await dataSource.getVoteChangeEventArgs(undefined, blockNumber);
            if (powerChanges) for (const { to: to , amount: amount  } of powerChanges){
                voterPowers[to] = voterPowers[to] || BigInt(0);
                voterPowers[to] += BigInt(amount);
            }
            // voting power can be calculated on voting vaults that don't have a
            // VoteChange event by looking at membershipProved events.
            const members = await dataSource.getMembershipProvedEventArgs(undefined, blockNumber);
            if (members) for (const { who: who  } of members){
                voterPowers[who] = voterPowers[who] || BigInt(0);
                voterPowers[who] += BigInt(1);
            }
        }
        const voterAddressesWithPower = Object.entries(voterPowers).filter(([, power])=>power > 0).map(([address])=>address);
        return this.getByAddresses({
            addresses: voterAddressesWithPower
        });
    }
};


const $d10dcacbcc0ff0c7$export$81fb29a3b5045c76 = {
    async getByVoter ({ voter: voter , proposal: proposal , context: { councilDataSources: councilDataSources  }  }) {
        const { id: id , votingContract: votingContract  } = proposal;
        let dataSource = (0, $a9d8dc444614e877$export$8f465fcd5ae4b18c)(votingContract.address, councilDataSources);
        const { votingPower: votingPower , castBallot: castBallot  } = await dataSource.getVote(voter.address, id);
        return {
            voter: voter,
            proposal: proposal,
            power: (0, $1RIJT$etherslibutils.formatEther)(votingPower),
            castBallot: votingPower.toBigInt() > 0 ? [
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
        proposals: async (votingContract, { ids: ids  }, context)=>{
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
            return proposals.map((proposal)=>proposal || null);
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
        vote: (proposal, { voter: address  }, context)=>{
            const voter = (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByAddress({
                address: address
            });
            return (0, $d10dcacbcc0ff0c7$export$81fb29a3b5045c76).getByVoter({
                voter: voter,
                proposal: proposal,
                context: context
            });
        },
        voters: ({ created: created , votingContract: votingContract  }, _, context)=>{
            return (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByVotingVaults({
                votingVaults: votingContract.votingVaults,
                blockNumber: created,
                context: context
            });
        },
        votes: (proposal, { voters: addresses  }, context)=>{
            if (addresses) {
                const voters = (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByAddresses({
                    addresses: addresses
                });
                return (0, $d10dcacbcc0ff0c7$export$81fb29a3b5045c76).getByVoters({
                    voters: voters,
                    proposal: proposal,
                    context: context
                });
            }
            return (0, $d10dcacbcc0ff0c7$export$81fb29a3b5045c76).getByProposal({
                proposal: proposal,
                context: context
            });
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
            return (0, $d10dcacbcc0ff0c7$export$81fb29a3b5045c76).getByVoter({
                voter: voter,
                proposal: proposal,
                context: context
            });
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
            return Promise.all(proposals.map((proposal)=>{
                if (!proposal) return null;
                return (0, $d10dcacbcc0ff0c7$export$81fb29a3b5045c76).getByVoter({
                    voter: voter,
                    proposal: proposal,
                    context: context
                });
            }));
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
        return this.contract.functions.votes(voter, proposalId);
    }
}





class $a0cf45371a696709$export$2b7e06d96cf7f075 {
    constructor(address, contract){
        this.address = address;
        this.contract = contract;
    }
    async getKickedEventArgs(fromBlock, toBlock) {
        if ("Kicked" in this.contract.filters) {
            const membershipProvedEvents = await this.contract.queryFilter(this.contract.filters.Kicked(), fromBlock, toBlock);
            return membershipProvedEvents.map(({ args: { when: when , who: who  }  })=>{
                return {
                    who: who,
                    when: when.toNumber()
                };
            });
        }
    }
    async getMembershipProvedEventArgs(fromBlock, toBlock) {
        if ("MembershipProved" in this.contract.filters) {
            const membershipProvedEvents = await this.contract.queryFilter(this.contract.filters.MembershipProved(), fromBlock, toBlock);
            return membershipProvedEvents.map(({ args: { when: when , who: who  }  })=>{
                return {
                    who: who,
                    when: when.toNumber()
                };
            });
        }
    }
    async getVoteChangeEventArgs(fromBlock, toBlock) {
        if ("VoteChange" in this.contract.filters) {
            const voteChangeEvents = await this.contract.queryFilter(this.contract.filters.VoteChange(), fromBlock, toBlock);
            return voteChangeEvents.map(({ args: { from: from , to: to , amount: amount  }  })=>{
                return {
                    from: from,
                    to: to,
                    amount: amount.toString()
                };
            });
        }
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
            console.error(error);
        }
        return "0";
    }
    async getVotingPowerView(voter, blockNumber) {
        if ("queryVotePowerView" in this.contract.callStatic) try {
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
        return this.getVotingPower(voter, blockNumber);
    }
}


class $492df70f1218e6f0$export$e2e4dee807f6af7a extends (0, $a0cf45371a696709$export$2b7e06d96cf7f075) {
    constructor(address, provider){
        const contract = (0, $1RIJT$elementficounciltypechain.GSCVault__factory).connect(address, provider);
        super(address, contract);
        this.contract = contract;
    }
}




class $a1c706d406f5708a$export$93f46c2abf3fc254 extends (0, $a0cf45371a696709$export$2b7e06d96cf7f075) {
    constructor(address, provider){
        const contract = (0, $1RIJT$elementficounciltypechain.LockingVault__factory).connect(address, provider);
        super(address, contract);
        this.contract = contract;
    }
}




class $e0e2802e459d88e3$export$a37e73beca8c1698 extends (0, $a0cf45371a696709$export$2b7e06d96cf7f075) {
    constructor(address, provider){
        const contract = (0, $1RIJT$elementficounciltypechain.VestingVault__factory).connect(address, provider);
        super(address, contract);
        this.contract = contract;
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


async function $e2ca106c4b0edc69$export$54fae1269cb9a9e0(context) {
    const { chainId: chainId , provider: provider  } = context;
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
        ...context,
        councilAddresses: councilAddresses,
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
                                    "start": 409,
                                    "end": 417
                                }
                            },
                            "loc": {
                                "start": 409,
                                "end": 417
                            }
                        },
                        "loc": {
                            "start": 408,
                            "end": 418
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 385,
                        "end": 418
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 422,
                            "end": 438
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 439,
                                    "end": 450
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 452,
                                        "end": 455
                                    }
                                },
                                "loc": {
                                    "start": 452,
                                    "end": 455
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 439,
                                "end": 455
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 458,
                                "end": 474
                            }
                        },
                        "loc": {
                            "start": 458,
                            "end": 474
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 422,
                        "end": 474
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 478,
                            "end": 484
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
                                    "start": 487,
                                    "end": 492
                                }
                            },
                            "loc": {
                                "start": 487,
                                "end": 492
                            }
                        },
                        "loc": {
                            "start": 486,
                            "end": 493
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 478,
                        "end": 493
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 497,
                            "end": 508
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 509,
                                    "end": 514
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
                                            "start": 516,
                                            "end": 518
                                        }
                                    },
                                    "loc": {
                                        "start": 516,
                                        "end": 518
                                    }
                                },
                                "loc": {
                                    "start": 516,
                                    "end": 519
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 509,
                                "end": 519
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 521,
                                    "end": 532
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 534,
                                        "end": 537
                                    }
                                },
                                "loc": {
                                    "start": 534,
                                    "end": 537
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 521,
                                "end": 537
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 540,
                                "end": 551
                            }
                        },
                        "loc": {
                            "start": 540,
                            "end": 551
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 497,
                        "end": 551
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 555,
                            "end": 567
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 568,
                                    "end": 574
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
                                                "start": 577,
                                                "end": 579
                                            }
                                        },
                                        "loc": {
                                            "start": 577,
                                            "end": 579
                                        }
                                    },
                                    "loc": {
                                        "start": 577,
                                        "end": 580
                                    }
                                },
                                "loc": {
                                    "start": 576,
                                    "end": 581
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 568,
                                "end": 581
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 583,
                                    "end": 594
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 596,
                                        "end": 599
                                    }
                                },
                                "loc": {
                                    "start": 596,
                                    "end": 599
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 583,
                                "end": 599
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
                                    "start": 603,
                                    "end": 614
                                }
                            },
                            "loc": {
                                "start": 603,
                                "end": 614
                            }
                        },
                        "loc": {
                            "start": 602,
                            "end": 615
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 555,
                        "end": 615
                    }
                }
            ],
            "loc": {
                "start": 280,
                "end": 618
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingVault",
                "loc": {
                    "start": 627,
                    "end": 638
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
                            "start": 644,
                            "end": 651
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
                                    "start": 653,
                                    "end": 655
                                }
                            },
                            "loc": {
                                "start": 653,
                                "end": 655
                            }
                        },
                        "loc": {
                            "start": 653,
                            "end": 656
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 644,
                        "end": 656
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 660,
                            "end": 676
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 677,
                                    "end": 688
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 690,
                                        "end": 693
                                    }
                                },
                                "loc": {
                                    "start": 690,
                                    "end": 693
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 677,
                                "end": 693
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 696,
                                "end": 712
                            }
                        },
                        "loc": {
                            "start": 696,
                            "end": 712
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 660,
                        "end": 712
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 716,
                            "end": 722
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
                                    "start": 725,
                                    "end": 730
                                }
                            },
                            "loc": {
                                "start": 725,
                                "end": 730
                            }
                        },
                        "loc": {
                            "start": 724,
                            "end": 731
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 716,
                        "end": 731
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 735,
                            "end": 746
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 747,
                                    "end": 752
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
                                            "start": 754,
                                            "end": 756
                                        }
                                    },
                                    "loc": {
                                        "start": 754,
                                        "end": 756
                                    }
                                },
                                "loc": {
                                    "start": 754,
                                    "end": 757
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 747,
                                "end": 757
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 759,
                                    "end": 770
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 772,
                                        "end": 775
                                    }
                                },
                                "loc": {
                                    "start": 772,
                                    "end": 775
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 759,
                                "end": 775
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 778,
                                "end": 789
                            }
                        },
                        "loc": {
                            "start": 778,
                            "end": 789
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 735,
                        "end": 789
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 793,
                            "end": 805
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 806,
                                    "end": 812
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
                                                "start": 815,
                                                "end": 817
                                            }
                                        },
                                        "loc": {
                                            "start": 815,
                                            "end": 817
                                        }
                                    },
                                    "loc": {
                                        "start": 815,
                                        "end": 818
                                    }
                                },
                                "loc": {
                                    "start": 814,
                                    "end": 819
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 806,
                                "end": 819
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 821,
                                    "end": 832
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 834,
                                        "end": 837
                                    }
                                },
                                "loc": {
                                    "start": 834,
                                    "end": 837
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 821,
                                "end": 837
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
                                    "start": 841,
                                    "end": 852
                                }
                            },
                            "loc": {
                                "start": 841,
                                "end": 852
                            }
                        },
                        "loc": {
                            "start": 840,
                            "end": 853
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 793,
                        "end": 853
                    }
                }
            ],
            "loc": {
                "start": 622,
                "end": 856
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Proposal",
                "loc": {
                    "start": 865,
                    "end": 873
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
                            "start": 879,
                            "end": 881
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
                                    "start": 883,
                                    "end": 885
                                }
                            },
                            "loc": {
                                "start": 883,
                                "end": 885
                            }
                        },
                        "loc": {
                            "start": 883,
                            "end": 886
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 879,
                        "end": 886
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingContract",
                        "loc": {
                            "start": 890,
                            "end": 904
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
                                    "start": 906,
                                    "end": 920
                                }
                            },
                            "loc": {
                                "start": 906,
                                "end": 920
                            }
                        },
                        "loc": {
                            "start": 906,
                            "end": 921
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 890,
                        "end": 921
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 925,
                            "end": 939
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "created",
                        "loc": {
                            "start": 943,
                            "end": 950
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
                                    "start": 952,
                                    "end": 955
                                }
                            },
                            "loc": {
                                "start": 952,
                                "end": 955
                            }
                        },
                        "loc": {
                            "start": 952,
                            "end": 956
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 925,
                        "end": 956
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 960,
                            "end": 974
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "expiration",
                        "loc": {
                            "start": 978,
                            "end": 988
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
                                    "start": 990,
                                    "end": 993
                                }
                            },
                            "loc": {
                                "start": 990,
                                "end": 993
                            }
                        },
                        "loc": {
                            "start": 990,
                            "end": 994
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 960,
                        "end": 994
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 998,
                            "end": 1012
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "unlock",
                        "loc": {
                            "start": 1016,
                            "end": 1022
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
                                    "start": 1024,
                                    "end": 1027
                                }
                            },
                            "loc": {
                                "start": 1024,
                                "end": 1027
                            }
                        },
                        "loc": {
                            "start": 1024,
                            "end": 1028
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 998,
                        "end": 1028
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isExecuted",
                        "loc": {
                            "start": 1032,
                            "end": 1042
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1044,
                                "end": 1051
                            }
                        },
                        "loc": {
                            "start": 1044,
                            "end": 1051
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1032,
                        "end": 1051
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1055,
                            "end": 1069
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "lastCall",
                        "loc": {
                            "start": 1073,
                            "end": 1081
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1083,
                                "end": 1086
                            }
                        },
                        "loc": {
                            "start": 1083,
                            "end": 1086
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1055,
                        "end": 1086
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "quorum",
                        "loc": {
                            "start": 1090,
                            "end": 1096
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1098,
                                "end": 1104
                            }
                        },
                        "loc": {
                            "start": 1098,
                            "end": 1104
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1090,
                        "end": 1104
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1108,
                            "end": 1112
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1113,
                                    "end": 1118
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
                                            "start": 1120,
                                            "end": 1122
                                        }
                                    },
                                    "loc": {
                                        "start": 1120,
                                        "end": 1122
                                    }
                                },
                                "loc": {
                                    "start": 1120,
                                    "end": 1123
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1113,
                                "end": 1123
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1126,
                                "end": 1130
                            }
                        },
                        "loc": {
                            "start": 1126,
                            "end": 1130
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1108,
                        "end": 1130
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 1134,
                            "end": 1140
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
                                    "start": 1143,
                                    "end": 1148
                                }
                            },
                            "loc": {
                                "start": 1143,
                                "end": 1148
                            }
                        },
                        "loc": {
                            "start": 1142,
                            "end": 1149
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1134,
                        "end": 1149
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1153,
                            "end": 1158
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1159,
                                    "end": 1165
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
                                                "start": 1168,
                                                "end": 1170
                                            }
                                        },
                                        "loc": {
                                            "start": 1168,
                                            "end": 1170
                                        }
                                    },
                                    "loc": {
                                        "start": 1168,
                                        "end": 1171
                                    }
                                },
                                "loc": {
                                    "start": 1167,
                                    "end": 1172
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1159,
                                "end": 1172
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
                                    "start": 1176,
                                    "end": 1180
                                }
                            },
                            "loc": {
                                "start": 1176,
                                "end": 1180
                            }
                        },
                        "loc": {
                            "start": 1175,
                            "end": 1181
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1153,
                        "end": 1181
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1185,
                            "end": 1196
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1197,
                                    "end": 1202
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
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1210,
                                "end": 1221
                            }
                        },
                        "loc": {
                            "start": 1210,
                            "end": 1221
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1185,
                        "end": 1221
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1225,
                            "end": 1237
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1238,
                                    "end": 1244
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
                                                "start": 1247,
                                                "end": 1249
                                            }
                                        },
                                        "loc": {
                                            "start": 1247,
                                            "end": 1249
                                        }
                                    },
                                    "loc": {
                                        "start": 1247,
                                        "end": 1250
                                    }
                                },
                                "loc": {
                                    "start": 1246,
                                    "end": 1251
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1238,
                                "end": 1251
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
                                    "start": 1255,
                                    "end": 1266
                                }
                            },
                            "loc": {
                                "start": 1255,
                                "end": 1266
                            }
                        },
                        "loc": {
                            "start": 1254,
                            "end": 1267
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1225,
                        "end": 1267
                    }
                }
            ],
            "loc": {
                "start": 860,
                "end": 1270
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Vote",
                "loc": {
                    "start": 1279,
                    "end": 1283
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
                            "start": 1289,
                            "end": 1294
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
                                    "start": 1296,
                                    "end": 1301
                                }
                            },
                            "loc": {
                                "start": 1296,
                                "end": 1301
                            }
                        },
                        "loc": {
                            "start": 1296,
                            "end": 1302
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1289,
                        "end": 1302
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "power",
                        "loc": {
                            "start": 1306,
                            "end": 1311
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
                                    "start": 1313,
                                    "end": 1319
                                }
                            },
                            "loc": {
                                "start": 1313,
                                "end": 1319
                            }
                        },
                        "loc": {
                            "start": 1313,
                            "end": 1320
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1306,
                        "end": 1320
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 1324,
                            "end": 1332
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
                                    "start": 1334,
                                    "end": 1342
                                }
                            },
                            "loc": {
                                "start": 1334,
                                "end": 1342
                            }
                        },
                        "loc": {
                            "start": 1334,
                            "end": 1343
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1324,
                        "end": 1343
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "castBallot",
                        "loc": {
                            "start": 1347,
                            "end": 1357
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Ballot",
                            "loc": {
                                "start": 1359,
                                "end": 1365
                            }
                        },
                        "loc": {
                            "start": 1359,
                            "end": 1365
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1347,
                        "end": 1365
                    }
                }
            ],
            "loc": {
                "start": 1274,
                "end": 1368
            }
        },
        {
            "kind": "EnumTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Ballot",
                "loc": {
                    "start": 1377,
                    "end": 1383
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
                            "start": 1389,
                            "end": 1392
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1389,
                        "end": 1392
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "No",
                        "loc": {
                            "start": 1396,
                            "end": 1398
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1396,
                        "end": 1398
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "Abstain",
                        "loc": {
                            "start": 1402,
                            "end": 1409
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1402,
                        "end": 1409
                    }
                }
            ],
            "loc": {
                "start": 1372,
                "end": 1412
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingPower",
                "loc": {
                    "start": 1421,
                    "end": 1432
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
                            "start": 1438,
                            "end": 1449
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
                                    "start": 1451,
                                    "end": 1454
                                }
                            },
                            "loc": {
                                "start": 1451,
                                "end": 1454
                            }
                        },
                        "loc": {
                            "start": 1451,
                            "end": 1455
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1438,
                        "end": 1455
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1459,
                            "end": 1464
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
                                    "start": 1466,
                                    "end": 1472
                                }
                            },
                            "loc": {
                                "start": 1466,
                                "end": 1472
                            }
                        },
                        "loc": {
                            "start": 1466,
                            "end": 1473
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1459,
                        "end": 1473
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 1477,
                            "end": 1482
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
                                    "start": 1484,
                                    "end": 1489
                                }
                            },
                            "loc": {
                                "start": 1484,
                                "end": 1489
                            }
                        },
                        "loc": {
                            "start": 1484,
                            "end": 1490
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1477,
                        "end": 1490
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1494,
                            "end": 1506
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
                                            "start": 1509,
                                            "end": 1520
                                        }
                                    },
                                    "loc": {
                                        "start": 1509,
                                        "end": 1520
                                    }
                                },
                                "loc": {
                                    "start": 1509,
                                    "end": 1521
                                }
                            },
                            "loc": {
                                "start": 1508,
                                "end": 1522
                            }
                        },
                        "loc": {
                            "start": 1508,
                            "end": 1523
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1494,
                        "end": 1523
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isStale",
                        "loc": {
                            "start": 1527,
                            "end": 1534
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1536,
                                "end": 1543
                            }
                        },
                        "loc": {
                            "start": 1536,
                            "end": 1543
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1527,
                        "end": 1543
                    }
                }
            ],
            "loc": {
                "start": 1416,
                "end": 1546
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "TotalVotingPower",
                "loc": {
                    "start": 1555,
                    "end": 1571
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
                            "start": 1577,
                            "end": 1588
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
                                    "start": 1590,
                                    "end": 1593
                                }
                            },
                            "loc": {
                                "start": 1590,
                                "end": 1593
                            }
                        },
                        "loc": {
                            "start": 1590,
                            "end": 1594
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1577,
                        "end": 1594
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1598,
                            "end": 1603
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
                                    "start": 1605,
                                    "end": 1611
                                }
                            },
                            "loc": {
                                "start": 1605,
                                "end": 1611
                            }
                        },
                        "loc": {
                            "start": 1605,
                            "end": 1612
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1598,
                        "end": 1612
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1616,
                            "end": 1628
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
                                            "start": 1631,
                                            "end": 1642
                                        }
                                    },
                                    "loc": {
                                        "start": 1631,
                                        "end": 1642
                                    }
                                },
                                "loc": {
                                    "start": 1631,
                                    "end": 1643
                                }
                            },
                            "loc": {
                                "start": 1630,
                                "end": 1644
                            }
                        },
                        "loc": {
                            "start": 1630,
                            "end": 1645
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1616,
                        "end": 1645
                    }
                }
            ],
            "loc": {
                "start": 1550,
                "end": 1648
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Voter",
                "loc": {
                    "start": 1657,
                    "end": 1662
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
                            "start": 1668,
                            "end": 1675
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
                                    "start": 1677,
                                    "end": 1679
                                }
                            },
                            "loc": {
                                "start": 1677,
                                "end": 1679
                            }
                        },
                        "loc": {
                            "start": 1677,
                            "end": 1680
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1668,
                        "end": 1680
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1684,
                            "end": 1688
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposal",
                                "loc": {
                                    "start": 1689,
                                    "end": 1697
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
                                            "start": 1699,
                                            "end": 1701
                                        }
                                    },
                                    "loc": {
                                        "start": 1699,
                                        "end": 1701
                                    }
                                },
                                "loc": {
                                    "start": 1699,
                                    "end": 1702
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1689,
                                "end": 1702
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 1704,
                                    "end": 1718
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
                                            "start": 1720,
                                            "end": 1722
                                        }
                                    },
                                    "loc": {
                                        "start": 1720,
                                        "end": 1722
                                    }
                                },
                                "loc": {
                                    "start": 1720,
                                    "end": 1723
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1704,
                                "end": 1723
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1726,
                                "end": 1730
                            }
                        },
                        "loc": {
                            "start": 1726,
                            "end": 1730
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1684,
                        "end": 1730
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1734,
                            "end": 1739
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposals",
                                "loc": {
                                    "start": 1740,
                                    "end": 1749
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
                                                    "start": 1752,
                                                    "end": 1754
                                                }
                                            },
                                            "loc": {
                                                "start": 1752,
                                                "end": 1754
                                            }
                                        },
                                        "loc": {
                                            "start": 1752,
                                            "end": 1755
                                        }
                                    },
                                    "loc": {
                                        "start": 1751,
                                        "end": 1756
                                    }
                                },
                                "loc": {
                                    "start": 1751,
                                    "end": 1757
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1740,
                                "end": 1757
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 1759,
                                    "end": 1773
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
                                            "start": 1775,
                                            "end": 1777
                                        }
                                    },
                                    "loc": {
                                        "start": 1775,
                                        "end": 1777
                                    }
                                },
                                "loc": {
                                    "start": 1775,
                                    "end": 1778
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1759,
                                "end": 1778
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
                                    "start": 1782,
                                    "end": 1786
                                }
                            },
                            "loc": {
                                "start": 1782,
                                "end": 1786
                            }
                        },
                        "loc": {
                            "start": 1781,
                            "end": 1787
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1734,
                        "end": 1787
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1791,
                            "end": 1802
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVault",
                                "loc": {
                                    "start": 1803,
                                    "end": 1814
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
                                            "start": 1816,
                                            "end": 1818
                                        }
                                    },
                                    "loc": {
                                        "start": 1816,
                                        "end": 1818
                                    }
                                },
                                "loc": {
                                    "start": 1816,
                                    "end": 1819
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1803,
                                "end": 1819
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 1821,
                                    "end": 1832
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1834,
                                        "end": 1837
                                    }
                                },
                                "loc": {
                                    "start": 1834,
                                    "end": 1837
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1821,
                                "end": 1837
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1840,
                                "end": 1851
                            }
                        },
                        "loc": {
                            "start": 1840,
                            "end": 1851
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1791,
                        "end": 1851
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1855,
                            "end": 1867
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 1868,
                                    "end": 1880
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
                                                    "start": 1883,
                                                    "end": 1885
                                                }
                                            },
                                            "loc": {
                                                "start": 1883,
                                                "end": 1885
                                            }
                                        },
                                        "loc": {
                                            "start": 1883,
                                            "end": 1886
                                        }
                                    },
                                    "loc": {
                                        "start": 1882,
                                        "end": 1887
                                    }
                                },
                                "loc": {
                                    "start": 1882,
                                    "end": 1888
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1868,
                                "end": 1888
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 1890,
                                    "end": 1901
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1903,
                                        "end": 1906
                                    }
                                },
                                "loc": {
                                    "start": 1903,
                                    "end": 1906
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1890,
                                "end": 1906
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
                                    "start": 1910,
                                    "end": 1921
                                }
                            },
                            "loc": {
                                "start": 1910,
                                "end": 1921
                            }
                        },
                        "loc": {
                            "start": 1909,
                            "end": 1922
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1855,
                        "end": 1922
                    }
                }
            ],
            "loc": {
                "start": 1652,
                "end": 1925
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 1925
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
