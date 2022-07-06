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
    async getIsActive ({ proposal: proposal , context: context  }) {
        const dataSource = $e35651dc583d7dca$var$getVotingContractDataSourceByAddress(proposal.votingContract.address, context.councilDataSources);
        const { proposalHash: proposalHash  } = await dataSource.getProposalById(proposal.id);
        return proposalHash !== $e35651dc583d7dca$var$EXECUTED_PROPOSAL_HASH;
    },
    async getLastCall ({ proposal: proposal , context: context  }) {
        const dataSource = $e35651dc583d7dca$var$getVotingContractDataSourceByAddress(proposal.votingContract.address, context.councilDataSources);
        const { proposalHash: proposalHash , lastCall: lastCall  } = await dataSource.getProposalById(proposal.id);
        if (proposalHash === $e35651dc583d7dca$var$EXECUTED_PROPOSAL_HASH) return lastCall;
    },
    async getQuorum ({ proposal: proposal , context: context  }) {
        const dataSource = $e35651dc583d7dca$var$getVotingContractDataSourceByAddress(proposal.votingContract.address, context.councilDataSources);
        const { proposalHash: proposalHash , quorum: quorum  } = await dataSource.getProposalById(proposal.id);
        if (proposalHash === $e35651dc583d7dca$var$EXECUTED_PROPOSAL_HASH) return quorum;
    },
    async getByVotingContract ({ votingContract: votingContract , context: context  }) {
        const dataSource = $e35651dc583d7dca$var$getVotingContractDataSourceByAddress(votingContract.address, context.councilDataSources);
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
function $e35651dc583d7dca$var$getVotingContractDataSourceByAddress(address, councilDataSources) {
    throw new Error("Function not implemented.");
}



function $a9d8dc444614e877$export$2c8942c776a655d1(address, dataSources) {
    return dataSources.votingVaults.find((votingVault)=>votingVault.address === address);
}
function $a9d8dc444614e877$export$8f465fcd5ae4b18c(address, dataSources) {
    return dataSources.votingContracts.find((votingContract)=>votingContract.address === address);
}



const $730705444d2faf33$export$24d97b9dae72698 = function() {
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


// TODO: Should this come from method arguments as `excludeAddresses`?
const $ac266e1a17cc8ea7$var$nonVoters = [
    "0x0000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000001", 
];
const $ac266e1a17cc8ea7$export$40a03fbff71f56d3 = {
    async getByVotingVault ({ votingVault: votingVault , blockNumber: blockNumber , context: context  }) {
        const { chainId: chainId , councilDataSources: councilDataSources , provider: provider  } = context;
        const dataSource = (0, $a9d8dc444614e877$export$2c8942c776a655d1)(votingVault.address, councilDataSources);
        blockNumber = blockNumber || await (0, $730705444d2faf33$export$24d97b9dae72698)(provider);
        const powerChanges = await dataSource.getVoteChangeEventArgs((0, $97c17b3f7f480abc$export$472b2ff001c2cfbf)(chainId), blockNumber);
        let total = BigInt(0);
        for (const { to: to , amount: amount  } of powerChanges)if (!$ac266e1a17cc8ea7$var$nonVoters.includes(to)) total += BigInt(amount);
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
    }
};



const $74d4fdf5b0550f40$export$e424928527fab42f = {
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
            else {
                const votingVaults = (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByAddresses({
                    addresses: context.councilDataSources.votingVaults.map(({ address: address  })=>address),
                    context: context
                });
                return (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByVotingVaults({
                    votingVaults: votingVaults.filter((vault)=>!!vault),
                    context: context
                });
            }
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
        isActive: (proposal, _, context)=>{
            return (0, $e35651dc583d7dca$export$b327309c2fad1272).getIsActive({
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
            const voters = (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByAddresses({
                addresses: addresses
            });
            return (0, $d10dcacbcc0ff0c7$export$81fb29a3b5045c76).getByVoters({
                voters: voters,
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
    // TODO: Should this be replaced with a more generalized `getEventArgs`
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
                            "start": 162,
                            "end": 176
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 177,
                                    "end": 184
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
                            "directives": [],
                            "loc": {
                                "start": 177,
                                "end": 189
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingContract",
                            "loc": {
                                "start": 192,
                                "end": 206
                            }
                        },
                        "loc": {
                            "start": 192,
                            "end": 206
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 162,
                        "end": 206
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingContracts",
                        "loc": {
                            "start": 209,
                            "end": 224
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "addresses",
                                "loc": {
                                    "start": 225,
                                    "end": 234
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
                                                "start": 237,
                                                "end": 239
                                            }
                                        },
                                        "loc": {
                                            "start": 237,
                                            "end": 239
                                        }
                                    },
                                    "loc": {
                                        "start": 237,
                                        "end": 240
                                    }
                                },
                                "loc": {
                                    "start": 236,
                                    "end": 241
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 225,
                                "end": 241
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
                                    "start": 245,
                                    "end": 259
                                }
                            },
                            "loc": {
                                "start": 245,
                                "end": 259
                            }
                        },
                        "loc": {
                            "start": 244,
                            "end": 260
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 209,
                        "end": 260
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVault",
                        "loc": {
                            "start": 263,
                            "end": 274
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 275,
                                    "end": 282
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
                                            "start": 284,
                                            "end": 286
                                        }
                                    },
                                    "loc": {
                                        "start": 284,
                                        "end": 286
                                    }
                                },
                                "loc": {
                                    "start": 284,
                                    "end": 287
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 275,
                                "end": 287
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingVault",
                            "loc": {
                                "start": 290,
                                "end": 301
                            }
                        },
                        "loc": {
                            "start": 290,
                            "end": 301
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 263,
                        "end": 301
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 304,
                            "end": 316
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "addresses",
                                "loc": {
                                    "start": 317,
                                    "end": 326
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
                                                "start": 329,
                                                "end": 331
                                            }
                                        },
                                        "loc": {
                                            "start": 329,
                                            "end": 331
                                        }
                                    },
                                    "loc": {
                                        "start": 329,
                                        "end": 332
                                    }
                                },
                                "loc": {
                                    "start": 328,
                                    "end": 333
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 317,
                                "end": 333
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
                                    "start": 337,
                                    "end": 348
                                }
                            },
                            "loc": {
                                "start": 337,
                                "end": 348
                            }
                        },
                        "loc": {
                            "start": 336,
                            "end": 349
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 304,
                        "end": 349
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 352,
                            "end": 357
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 358,
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
                                "start": 358,
                                "end": 370
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Voter",
                            "loc": {
                                "start": 373,
                                "end": 378
                            }
                        },
                        "loc": {
                            "start": 373,
                            "end": 378
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 352,
                        "end": 378
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 381,
                            "end": 387
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "addresses",
                                "loc": {
                                    "start": 388,
                                    "end": 397
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
                                                "start": 400,
                                                "end": 402
                                            }
                                        },
                                        "loc": {
                                            "start": 400,
                                            "end": 402
                                        }
                                    },
                                    "loc": {
                                        "start": 400,
                                        "end": 403
                                    }
                                },
                                "loc": {
                                    "start": 399,
                                    "end": 404
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 388,
                                "end": 404
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
                                    "start": 408,
                                    "end": 413
                                }
                            },
                            "loc": {
                                "start": 408,
                                "end": 413
                            }
                        },
                        "loc": {
                            "start": 407,
                            "end": 414
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 381,
                        "end": 414
                    }
                }
            ],
            "loc": {
                "start": 0,
                "end": 416
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingContract",
                "loc": {
                    "start": 423,
                    "end": 437
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
                            "start": 442,
                            "end": 449
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
                                    "start": 451,
                                    "end": 453
                                }
                            },
                            "loc": {
                                "start": 451,
                                "end": 453
                            }
                        },
                        "loc": {
                            "start": 451,
                            "end": 454
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 442,
                        "end": 454
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 457,
                            "end": 469
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
                                            "start": 472,
                                            "end": 483
                                        }
                                    },
                                    "loc": {
                                        "start": 472,
                                        "end": 483
                                    }
                                },
                                "loc": {
                                    "start": 472,
                                    "end": 484
                                }
                            },
                            "loc": {
                                "start": 471,
                                "end": 485
                            }
                        },
                        "loc": {
                            "start": 471,
                            "end": 486
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 457,
                        "end": 486
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 489,
                            "end": 497
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "id",
                                "loc": {
                                    "start": 498,
                                    "end": 500
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
                                            "start": 502,
                                            "end": 504
                                        }
                                    },
                                    "loc": {
                                        "start": 502,
                                        "end": 504
                                    }
                                },
                                "loc": {
                                    "start": 502,
                                    "end": 505
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 498,
                                "end": 505
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Proposal",
                            "loc": {
                                "start": 508,
                                "end": 516
                            }
                        },
                        "loc": {
                            "start": 508,
                            "end": 516
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 489,
                        "end": 516
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposals",
                        "loc": {
                            "start": 519,
                            "end": 528
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "ids",
                                "loc": {
                                    "start": 529,
                                    "end": 532
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
                                                "start": 535,
                                                "end": 537
                                            }
                                        },
                                        "loc": {
                                            "start": 535,
                                            "end": 537
                                        }
                                    },
                                    "loc": {
                                        "start": 535,
                                        "end": 538
                                    }
                                },
                                "loc": {
                                    "start": 534,
                                    "end": 539
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 529,
                                "end": 539
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
                                    "start": 543,
                                    "end": 551
                                }
                            },
                            "loc": {
                                "start": 543,
                                "end": 551
                            }
                        },
                        "loc": {
                            "start": 542,
                            "end": 552
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 519,
                        "end": 552
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 555,
                            "end": 571
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 572,
                                    "end": 583
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 585,
                                        "end": 588
                                    }
                                },
                                "loc": {
                                    "start": 585,
                                    "end": 588
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 572,
                                "end": 588
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 591,
                                "end": 607
                            }
                        },
                        "loc": {
                            "start": 591,
                            "end": 607
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 555,
                        "end": 607
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 610,
                            "end": 616
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
                                    "start": 619,
                                    "end": 624
                                }
                            },
                            "loc": {
                                "start": 619,
                                "end": 624
                            }
                        },
                        "loc": {
                            "start": 618,
                            "end": 625
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 610,
                        "end": 625
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 628,
                            "end": 639
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 640,
                                    "end": 645
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
                                            "start": 647,
                                            "end": 649
                                        }
                                    },
                                    "loc": {
                                        "start": 647,
                                        "end": 649
                                    }
                                },
                                "loc": {
                                    "start": 647,
                                    "end": 650
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 640,
                                "end": 650
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 652,
                                    "end": 663
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 665,
                                        "end": 668
                                    }
                                },
                                "loc": {
                                    "start": 665,
                                    "end": 668
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 652,
                                "end": 668
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 671,
                                "end": 682
                            }
                        },
                        "loc": {
                            "start": 671,
                            "end": 682
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 628,
                        "end": 682
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 685,
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
                            "directives": [],
                            "loc": {
                                "start": 698,
                                "end": 711
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 713,
                                    "end": 724
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 726,
                                        "end": 729
                                    }
                                },
                                "loc": {
                                    "start": 726,
                                    "end": 729
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 713,
                                "end": 729
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
                                    "start": 733,
                                    "end": 744
                                }
                            },
                            "loc": {
                                "start": 733,
                                "end": 744
                            }
                        },
                        "loc": {
                            "start": 732,
                            "end": 745
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 685,
                        "end": 745
                    }
                }
            ],
            "loc": {
                "start": 418,
                "end": 747
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingVault",
                "loc": {
                    "start": 754,
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
                        "value": "address",
                        "loc": {
                            "start": 770,
                            "end": 777
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
                                    "start": 779,
                                    "end": 781
                                }
                            },
                            "loc": {
                                "start": 779,
                                "end": 781
                            }
                        },
                        "loc": {
                            "start": 779,
                            "end": 782
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 770,
                        "end": 782
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 785,
                            "end": 801
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 802,
                                    "end": 813
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 815,
                                        "end": 818
                                    }
                                },
                                "loc": {
                                    "start": 815,
                                    "end": 818
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 802,
                                "end": 818
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 821,
                                "end": 837
                            }
                        },
                        "loc": {
                            "start": 821,
                            "end": 837
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 785,
                        "end": 837
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 840,
                            "end": 846
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
                                    "start": 849,
                                    "end": 854
                                }
                            },
                            "loc": {
                                "start": 849,
                                "end": 854
                            }
                        },
                        "loc": {
                            "start": 848,
                            "end": 855
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 840,
                        "end": 855
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 858,
                            "end": 869
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 870,
                                    "end": 875
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
                                            "start": 877,
                                            "end": 879
                                        }
                                    },
                                    "loc": {
                                        "start": 877,
                                        "end": 879
                                    }
                                },
                                "loc": {
                                    "start": 877,
                                    "end": 880
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 870,
                                "end": 880
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 882,
                                    "end": 893
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 895,
                                        "end": 898
                                    }
                                },
                                "loc": {
                                    "start": 895,
                                    "end": 898
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 882,
                                "end": 898
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 901,
                                "end": 912
                            }
                        },
                        "loc": {
                            "start": 901,
                            "end": 912
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 858,
                        "end": 912
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 915,
                            "end": 927
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 928,
                                    "end": 934
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
                                                "start": 937,
                                                "end": 939
                                            }
                                        },
                                        "loc": {
                                            "start": 937,
                                            "end": 939
                                        }
                                    },
                                    "loc": {
                                        "start": 937,
                                        "end": 940
                                    }
                                },
                                "loc": {
                                    "start": 936,
                                    "end": 941
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 928,
                                "end": 941
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 943,
                                    "end": 954
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 956,
                                        "end": 959
                                    }
                                },
                                "loc": {
                                    "start": 956,
                                    "end": 959
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 943,
                                "end": 959
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
                                    "start": 963,
                                    "end": 974
                                }
                            },
                            "loc": {
                                "start": 963,
                                "end": 974
                            }
                        },
                        "loc": {
                            "start": 962,
                            "end": 975
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 915,
                        "end": 975
                    }
                }
            ],
            "loc": {
                "start": 749,
                "end": 977
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Proposal",
                "loc": {
                    "start": 984,
                    "end": 992
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
                            "start": 997,
                            "end": 999
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
                                    "start": 1001,
                                    "end": 1003
                                }
                            },
                            "loc": {
                                "start": 1001,
                                "end": 1003
                            }
                        },
                        "loc": {
                            "start": 1001,
                            "end": 1004
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 997,
                        "end": 1004
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingContract",
                        "loc": {
                            "start": 1007,
                            "end": 1021
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
                                    "start": 1023,
                                    "end": 1037
                                }
                            },
                            "loc": {
                                "start": 1023,
                                "end": 1037
                            }
                        },
                        "loc": {
                            "start": 1023,
                            "end": 1038
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1007,
                        "end": 1038
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1041,
                            "end": 1055
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "created",
                        "loc": {
                            "start": 1058,
                            "end": 1065
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
                                    "start": 1067,
                                    "end": 1070
                                }
                            },
                            "loc": {
                                "start": 1067,
                                "end": 1070
                            }
                        },
                        "loc": {
                            "start": 1067,
                            "end": 1071
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1041,
                        "end": 1071
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1074,
                            "end": 1088
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "expiration",
                        "loc": {
                            "start": 1091,
                            "end": 1101
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
                                    "start": 1103,
                                    "end": 1106
                                }
                            },
                            "loc": {
                                "start": 1103,
                                "end": 1106
                            }
                        },
                        "loc": {
                            "start": 1103,
                            "end": 1107
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1074,
                        "end": 1107
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1110,
                            "end": 1124
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "unlock",
                        "loc": {
                            "start": 1127,
                            "end": 1133
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
                                    "start": 1135,
                                    "end": 1138
                                }
                            },
                            "loc": {
                                "start": 1135,
                                "end": 1138
                            }
                        },
                        "loc": {
                            "start": 1135,
                            "end": 1139
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1110,
                        "end": 1139
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isActive",
                        "loc": {
                            "start": 1142,
                            "end": 1150
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1152,
                                "end": 1159
                            }
                        },
                        "loc": {
                            "start": 1152,
                            "end": 1159
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1142,
                        "end": 1159
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1162,
                            "end": 1176
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "lastCall",
                        "loc": {
                            "start": 1179,
                            "end": 1187
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1189,
                                "end": 1192
                            }
                        },
                        "loc": {
                            "start": 1189,
                            "end": 1192
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1162,
                        "end": 1192
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "quorum",
                        "loc": {
                            "start": 1195,
                            "end": 1201
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1203,
                                "end": 1209
                            }
                        },
                        "loc": {
                            "start": 1203,
                            "end": 1209
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1195,
                        "end": 1209
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1212,
                            "end": 1216
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1217,
                                    "end": 1222
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
                                            "start": 1224,
                                            "end": 1226
                                        }
                                    },
                                    "loc": {
                                        "start": 1224,
                                        "end": 1226
                                    }
                                },
                                "loc": {
                                    "start": 1224,
                                    "end": 1227
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1217,
                                "end": 1227
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1230,
                                "end": 1234
                            }
                        },
                        "loc": {
                            "start": 1230,
                            "end": 1234
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1212,
                        "end": 1234
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 1237,
                            "end": 1243
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
                                    "start": 1246,
                                    "end": 1251
                                }
                            },
                            "loc": {
                                "start": 1246,
                                "end": 1251
                            }
                        },
                        "loc": {
                            "start": 1245,
                            "end": 1252
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1237,
                        "end": 1252
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1255,
                            "end": 1260
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1261,
                                    "end": 1267
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
                                                    "start": 1270,
                                                    "end": 1272
                                                }
                                            },
                                            "loc": {
                                                "start": 1270,
                                                "end": 1272
                                            }
                                        },
                                        "loc": {
                                            "start": 1270,
                                            "end": 1273
                                        }
                                    },
                                    "loc": {
                                        "start": 1269,
                                        "end": 1274
                                    }
                                },
                                "loc": {
                                    "start": 1269,
                                    "end": 1275
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1261,
                                "end": 1275
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
                                    "start": 1279,
                                    "end": 1283
                                }
                            },
                            "loc": {
                                "start": 1279,
                                "end": 1283
                            }
                        },
                        "loc": {
                            "start": 1278,
                            "end": 1284
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1255,
                        "end": 1284
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1287,
                            "end": 1298
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1299,
                                    "end": 1304
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
                                            "start": 1306,
                                            "end": 1308
                                        }
                                    },
                                    "loc": {
                                        "start": 1306,
                                        "end": 1308
                                    }
                                },
                                "loc": {
                                    "start": 1306,
                                    "end": 1309
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1299,
                                "end": 1309
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1312,
                                "end": 1323
                            }
                        },
                        "loc": {
                            "start": 1312,
                            "end": 1323
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1287,
                        "end": 1323
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1326,
                            "end": 1338
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1339,
                                    "end": 1345
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
                                                "start": 1348,
                                                "end": 1350
                                            }
                                        },
                                        "loc": {
                                            "start": 1348,
                                            "end": 1350
                                        }
                                    },
                                    "loc": {
                                        "start": 1348,
                                        "end": 1351
                                    }
                                },
                                "loc": {
                                    "start": 1347,
                                    "end": 1352
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1339,
                                "end": 1352
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
                                    "start": 1356,
                                    "end": 1367
                                }
                            },
                            "loc": {
                                "start": 1356,
                                "end": 1367
                            }
                        },
                        "loc": {
                            "start": 1355,
                            "end": 1368
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1326,
                        "end": 1368
                    }
                }
            ],
            "loc": {
                "start": 979,
                "end": 1370
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Vote",
                "loc": {
                    "start": 1377,
                    "end": 1381
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
                            "start": 1386,
                            "end": 1391
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
                                    "start": 1393,
                                    "end": 1398
                                }
                            },
                            "loc": {
                                "start": 1393,
                                "end": 1398
                            }
                        },
                        "loc": {
                            "start": 1393,
                            "end": 1399
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1386,
                        "end": 1399
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "power",
                        "loc": {
                            "start": 1402,
                            "end": 1407
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
                                    "start": 1409,
                                    "end": 1415
                                }
                            },
                            "loc": {
                                "start": 1409,
                                "end": 1415
                            }
                        },
                        "loc": {
                            "start": 1409,
                            "end": 1416
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1402,
                        "end": 1416
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 1419,
                            "end": 1427
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
                                    "start": 1429,
                                    "end": 1437
                                }
                            },
                            "loc": {
                                "start": 1429,
                                "end": 1437
                            }
                        },
                        "loc": {
                            "start": 1429,
                            "end": 1438
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1419,
                        "end": 1438
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "castBallot",
                        "loc": {
                            "start": 1441,
                            "end": 1451
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Ballot",
                            "loc": {
                                "start": 1453,
                                "end": 1459
                            }
                        },
                        "loc": {
                            "start": 1453,
                            "end": 1459
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1441,
                        "end": 1459
                    }
                }
            ],
            "loc": {
                "start": 1372,
                "end": 1461
            }
        },
        {
            "kind": "EnumTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Ballot",
                "loc": {
                    "start": 1468,
                    "end": 1474
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
                            "start": 1479,
                            "end": 1482
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1479,
                        "end": 1482
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "No",
                        "loc": {
                            "start": 1485,
                            "end": 1487
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1485,
                        "end": 1487
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "Abstain",
                        "loc": {
                            "start": 1490,
                            "end": 1497
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1490,
                        "end": 1497
                    }
                }
            ],
            "loc": {
                "start": 1463,
                "end": 1499
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingPower",
                "loc": {
                    "start": 1506,
                    "end": 1517
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
                            "start": 1522,
                            "end": 1533
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
                                    "start": 1535,
                                    "end": 1538
                                }
                            },
                            "loc": {
                                "start": 1535,
                                "end": 1538
                            }
                        },
                        "loc": {
                            "start": 1535,
                            "end": 1539
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1522,
                        "end": 1539
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1542,
                            "end": 1547
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
                                    "start": 1549,
                                    "end": 1555
                                }
                            },
                            "loc": {
                                "start": 1549,
                                "end": 1555
                            }
                        },
                        "loc": {
                            "start": 1549,
                            "end": 1556
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1542,
                        "end": 1556
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 1559,
                            "end": 1564
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
                                    "start": 1566,
                                    "end": 1571
                                }
                            },
                            "loc": {
                                "start": 1566,
                                "end": 1571
                            }
                        },
                        "loc": {
                            "start": 1566,
                            "end": 1572
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1559,
                        "end": 1572
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1575,
                            "end": 1587
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
                                            "start": 1590,
                                            "end": 1601
                                        }
                                    },
                                    "loc": {
                                        "start": 1590,
                                        "end": 1601
                                    }
                                },
                                "loc": {
                                    "start": 1590,
                                    "end": 1602
                                }
                            },
                            "loc": {
                                "start": 1589,
                                "end": 1603
                            }
                        },
                        "loc": {
                            "start": 1589,
                            "end": 1604
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1575,
                        "end": 1604
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isStale",
                        "loc": {
                            "start": 1607,
                            "end": 1614
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1616,
                                "end": 1623
                            }
                        },
                        "loc": {
                            "start": 1616,
                            "end": 1623
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1607,
                        "end": 1623
                    }
                }
            ],
            "loc": {
                "start": 1501,
                "end": 1625
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "TotalVotingPower",
                "loc": {
                    "start": 1632,
                    "end": 1648
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
                            "start": 1653,
                            "end": 1664
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
                                    "start": 1666,
                                    "end": 1669
                                }
                            },
                            "loc": {
                                "start": 1666,
                                "end": 1669
                            }
                        },
                        "loc": {
                            "start": 1666,
                            "end": 1670
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1653,
                        "end": 1670
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1673,
                            "end": 1678
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
                                    "start": 1680,
                                    "end": 1686
                                }
                            },
                            "loc": {
                                "start": 1680,
                                "end": 1686
                            }
                        },
                        "loc": {
                            "start": 1680,
                            "end": 1687
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1673,
                        "end": 1687
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1690,
                            "end": 1702
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
                                            "start": 1705,
                                            "end": 1716
                                        }
                                    },
                                    "loc": {
                                        "start": 1705,
                                        "end": 1716
                                    }
                                },
                                "loc": {
                                    "start": 1705,
                                    "end": 1717
                                }
                            },
                            "loc": {
                                "start": 1704,
                                "end": 1718
                            }
                        },
                        "loc": {
                            "start": 1704,
                            "end": 1719
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1690,
                        "end": 1719
                    }
                }
            ],
            "loc": {
                "start": 1627,
                "end": 1721
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Voter",
                "loc": {
                    "start": 1728,
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
                        "value": "address",
                        "loc": {
                            "start": 1738,
                            "end": 1745
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
                                    "start": 1747,
                                    "end": 1749
                                }
                            },
                            "loc": {
                                "start": 1747,
                                "end": 1749
                            }
                        },
                        "loc": {
                            "start": 1747,
                            "end": 1750
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1738,
                        "end": 1750
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1753,
                            "end": 1757
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposal",
                                "loc": {
                                    "start": 1758,
                                    "end": 1766
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
                                            "start": 1768,
                                            "end": 1770
                                        }
                                    },
                                    "loc": {
                                        "start": 1768,
                                        "end": 1770
                                    }
                                },
                                "loc": {
                                    "start": 1768,
                                    "end": 1771
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1758,
                                "end": 1771
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 1773,
                                    "end": 1787
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
                                            "start": 1789,
                                            "end": 1791
                                        }
                                    },
                                    "loc": {
                                        "start": 1789,
                                        "end": 1791
                                    }
                                },
                                "loc": {
                                    "start": 1789,
                                    "end": 1792
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1773,
                                "end": 1792
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1795,
                                "end": 1799
                            }
                        },
                        "loc": {
                            "start": 1795,
                            "end": 1799
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1753,
                        "end": 1799
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1802,
                            "end": 1807
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposals",
                                "loc": {
                                    "start": 1808,
                                    "end": 1817
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
                                                    "start": 1820,
                                                    "end": 1822
                                                }
                                            },
                                            "loc": {
                                                "start": 1820,
                                                "end": 1822
                                            }
                                        },
                                        "loc": {
                                            "start": 1820,
                                            "end": 1823
                                        }
                                    },
                                    "loc": {
                                        "start": 1819,
                                        "end": 1824
                                    }
                                },
                                "loc": {
                                    "start": 1819,
                                    "end": 1825
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1808,
                                "end": 1825
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 1827,
                                    "end": 1841
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
                                            "start": 1843,
                                            "end": 1845
                                        }
                                    },
                                    "loc": {
                                        "start": 1843,
                                        "end": 1845
                                    }
                                },
                                "loc": {
                                    "start": 1843,
                                    "end": 1846
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1827,
                                "end": 1846
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
                                    "start": 1850,
                                    "end": 1854
                                }
                            },
                            "loc": {
                                "start": 1850,
                                "end": 1854
                            }
                        },
                        "loc": {
                            "start": 1849,
                            "end": 1855
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1802,
                        "end": 1855
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1858,
                            "end": 1869
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVault",
                                "loc": {
                                    "start": 1870,
                                    "end": 1881
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
                            "directives": [],
                            "loc": {
                                "start": 1870,
                                "end": 1886
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 1888,
                                    "end": 1899
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1901,
                                        "end": 1904
                                    }
                                },
                                "loc": {
                                    "start": 1901,
                                    "end": 1904
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1888,
                                "end": 1904
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1907,
                                "end": 1918
                            }
                        },
                        "loc": {
                            "start": 1907,
                            "end": 1918
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1858,
                        "end": 1918
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1921,
                            "end": 1933
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 1934,
                                    "end": 1946
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
                                                    "start": 1949,
                                                    "end": 1951
                                                }
                                            },
                                            "loc": {
                                                "start": 1949,
                                                "end": 1951
                                            }
                                        },
                                        "loc": {
                                            "start": 1949,
                                            "end": 1952
                                        }
                                    },
                                    "loc": {
                                        "start": 1948,
                                        "end": 1953
                                    }
                                },
                                "loc": {
                                    "start": 1948,
                                    "end": 1954
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1934,
                                "end": 1954
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 1956,
                                    "end": 1967
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1969,
                                        "end": 1972
                                    }
                                },
                                "loc": {
                                    "start": 1969,
                                    "end": 1972
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1956,
                                "end": 1972
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
                                    "start": 1976,
                                    "end": 1987
                                }
                            },
                            "loc": {
                                "start": 1976,
                                "end": 1987
                            }
                        },
                        "loc": {
                            "start": 1975,
                            "end": 1988
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1921,
                        "end": 1988
                    }
                }
            ],
            "loc": {
                "start": 1723,
                "end": 1990
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 1990
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
