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

function $a9d8dc444614e877$export$81a5cdb6fade8a42(address, dataSources) {
    return Object.values(dataSources).find((dataSource)=>dataSource.address === address);
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
    async getIsActive ({ proposal: proposal , context: context  }) {
        const dataSource = (0, $a9d8dc444614e877$export$81a5cdb6fade8a42)(proposal.votingContract.address, context.councilDataSources);
        const { proposalHash: proposalHash  } = await dataSource.getProposalById(proposal.id);
        return proposalHash !== $e35651dc583d7dca$var$EXECUTED_PROPOSAL_HASH;
    },
    async getLastCall ({ proposal: proposal , context: context  }) {
        const dataSource = (0, $a9d8dc444614e877$export$81a5cdb6fade8a42)(proposal.votingContract.address, context.councilDataSources);
        const { proposalHash: proposalHash , lastCall: lastCall  } = await dataSource.getProposalById(proposal.id);
        if (proposalHash === $e35651dc583d7dca$var$EXECUTED_PROPOSAL_HASH) return lastCall;
    },
    async getQuorum ({ proposal: proposal , context: context  }) {
        const dataSource = (0, $a9d8dc444614e877$export$81a5cdb6fade8a42)(proposal.votingContract.address, context.councilDataSources);
        const { proposalHash: proposalHash , quorum: quorum  } = await dataSource.getProposalById(proposal.id);
        if (proposalHash === $e35651dc583d7dca$var$EXECUTED_PROPOSAL_HASH) return quorum;
    },
    async getByVotingContract ({ votingContract: votingContract , context: context  }) {
        const dataSource = (0, $a9d8dc444614e877$export$81a5cdb6fade8a42)(votingContract.address, context.councilDataSources);
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
        const dataSource = (0, $a9d8dc444614e877$export$81a5cdb6fade8a42)(votingVault.address, councilDataSources);
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
        let dataSource = (0, $a9d8dc444614e877$export$81a5cdb6fade8a42)(votingContract.address, councilDataSources);
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
    async getByVotingVaults ({ votingVaults: votingVaults , blockNumber: blockNumber , context: { councilDataSources: councilDataSources  } ,  }) {
        const voterPowers = {};
        for (const votingVault of votingVaults){
            const dataSource = (0, $a9d8dc444614e877$export$81a5cdb6fade8a42)(votingVault.address, councilDataSources);
            const powerChanges = await dataSource.getVoteChangeEventArgs(undefined, blockNumber);
            for (const { to: to , amount: amount  } of powerChanges){
                voterPowers[to] = voterPowers[0] || BigInt(0);
                voterPowers[to] += BigInt(amount);
            }
        }
        const voterAddressesWithPower = Object.entries(voterPowers).filter(([, power])=>power > 0).map(([address])=>address);
        return this.getByAddresses({
            addresses: voterAddressesWithPower
        });
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



const $1f368d119f63f485$export$4c0b87851cbe4e3f = {
    getByAddress ({ address: address1 , context: context  }) {
        const dataSource = (0, $a9d8dc444614e877$export$81a5cdb6fade8a42)(address1, context.councilDataSources);
        if (dataSource instanceof (0, $41844f56d22dc55e$export$ca33481ae8bfff02)) return {
            address: dataSource.address,
            votingVaults: dataSource.votingVaults.map(({ address: address  })=>({
                    address: address
                }))
        };
    }
};





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
        return [];
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




const $889645ffb5e37d8c$export$a0cbbdeeb12308cd = {
    async getByVoter ({ voter: voter , blockNumber: blockNumber , votingVaults: votingVaults , context: { councilDataSources: councilDataSources , provider: provider  } ,  }) {
        blockNumber = blockNumber || await (0, $730705444d2faf33$export$24d97b9dae72698)(provider);
        let aggregateValue = BigInt(0);
        for (const { address: address  } of votingVaults){
            const dataSource = (0, $a9d8dc444614e877$export$81a5cdb6fade8a42)(address, councilDataSources);
            if (dataSource instanceof (0, $a0cf45371a696709$export$2b7e06d96cf7f075)) {
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
                const dataSource = (0, $a9d8dc444614e877$export$81a5cdb6fade8a42)(address, councilDataSources);
                if (dataSource instanceof (0, $a0cf45371a696709$export$2b7e06d96cf7f075)) {
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
        coreVoting: (_, __, context)=>{
            return (0, $1f368d119f63f485$export$4c0b87851cbe4e3f).getByAddress({
                address: context.councilDataSources.coreVoting.address,
                context: context
            }) || null;
        },
        gscVoting: (_, __, context)=>{
            return (0, $1f368d119f63f485$export$4c0b87851cbe4e3f).getByAddress({
                address: context.councilDataSources.gscVoting.address,
                context: context
            }) || null;
        },
        lockingVault: (_, __, context)=>{
            return (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByAddress({
                address: context.councilDataSources.lockingVault.address,
                context: context
            }) || null;
        },
        vestingVault: (_, __, context)=>{
            return (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByAddress({
                address: context.councilDataSources.vestingVault.address,
                context: context
            }) || null;
        },
        gscVault: (_, __, context)=>{
            return (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByAddress({
                address: context.councilDataSources.gscVault.address,
                context: context
            }) || null;
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
                    addresses: [
                        context.councilDataSources.lockingVault.address,
                        context.councilDataSources.vestingVault.address,
                        context.councilDataSources.gscVault.address, 
                    ],
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
    return {
        ...context,
        councilAddresses: councilAddresses,
        councilDataSources: {
            coreVoting: new (0, $41844f56d22dc55e$export$ca33481ae8bfff02)(councilAddresses.coreVoting, provider, [
                lockingVault,
                vestingVault
            ]),
            gscVoting: new (0, $41844f56d22dc55e$export$ca33481ae8bfff02)(councilAddresses.gscCoreVoting, provider, [
                gscVault
            ]),
            lockingVault: lockingVault,
            vestingVault: vestingVault,
            gscVault: gscVault
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
                        "value": "coreVoting",
                        "loc": {
                            "start": 15,
                            "end": 25
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingContract",
                            "loc": {
                                "start": 27,
                                "end": 41
                            }
                        },
                        "loc": {
                            "start": 27,
                            "end": 41
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 15,
                        "end": 41
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "gscVault",
                        "loc": {
                            "start": 44,
                            "end": 52
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingVault",
                            "loc": {
                                "start": 54,
                                "end": 65
                            }
                        },
                        "loc": {
                            "start": 54,
                            "end": 65
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 44,
                        "end": 65
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "gscVoting",
                        "loc": {
                            "start": 68,
                            "end": 77
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingContract",
                            "loc": {
                                "start": 79,
                                "end": 93
                            }
                        },
                        "loc": {
                            "start": 79,
                            "end": 93
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 68,
                        "end": 93
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "lockingVault",
                        "loc": {
                            "start": 96,
                            "end": 108
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingVault",
                            "loc": {
                                "start": 110,
                                "end": 121
                            }
                        },
                        "loc": {
                            "start": 110,
                            "end": 121
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 96,
                        "end": 121
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vestingVault",
                        "loc": {
                            "start": 124,
                            "end": 136
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingVault",
                            "loc": {
                                "start": 138,
                                "end": 149
                            }
                        },
                        "loc": {
                            "start": 138,
                            "end": 149
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 124,
                        "end": 149
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 350,
                            "end": 355
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 356,
                                    "end": 363
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
                                            "start": 365,
                                            "end": 367
                                        }
                                    },
                                    "loc": {
                                        "start": 365,
                                        "end": 367
                                    }
                                },
                                "loc": {
                                    "start": 365,
                                    "end": 368
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 356,
                                "end": 368
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Voter",
                            "loc": {
                                "start": 371,
                                "end": 376
                            }
                        },
                        "loc": {
                            "start": 371,
                            "end": 376
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 350,
                        "end": 376
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 379,
                            "end": 385
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "addresses",
                                "loc": {
                                    "start": 386,
                                    "end": 395
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
                                "loc": {
                                    "start": 397,
                                    "end": 402
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 386,
                                "end": 402
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
                                    "start": 406,
                                    "end": 411
                                }
                            },
                            "loc": {
                                "start": 406,
                                "end": 411
                            }
                        },
                        "loc": {
                            "start": 405,
                            "end": 412
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 379,
                        "end": 412
                    }
                }
            ],
            "loc": {
                "start": 0,
                "end": 414
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingContract",
                "loc": {
                    "start": 421,
                    "end": 435
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
                            "start": 440,
                            "end": 447
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
                                    "start": 449,
                                    "end": 451
                                }
                            },
                            "loc": {
                                "start": 449,
                                "end": 451
                            }
                        },
                        "loc": {
                            "start": 449,
                            "end": 452
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 440,
                        "end": 452
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 455,
                            "end": 467
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
                                            "start": 470,
                                            "end": 481
                                        }
                                    },
                                    "loc": {
                                        "start": 470,
                                        "end": 481
                                    }
                                },
                                "loc": {
                                    "start": 470,
                                    "end": 482
                                }
                            },
                            "loc": {
                                "start": 469,
                                "end": 483
                            }
                        },
                        "loc": {
                            "start": 469,
                            "end": 484
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 455,
                        "end": 484
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 487,
                            "end": 495
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "id",
                                "loc": {
                                    "start": 496,
                                    "end": 498
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
                            "directives": [],
                            "loc": {
                                "start": 496,
                                "end": 503
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Proposal",
                            "loc": {
                                "start": 506,
                                "end": 514
                            }
                        },
                        "loc": {
                            "start": 506,
                            "end": 514
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 487,
                        "end": 514
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposals",
                        "loc": {
                            "start": 517,
                            "end": 526
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "ids",
                                "loc": {
                                    "start": 527,
                                    "end": 530
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
                                                "start": 533,
                                                "end": 535
                                            }
                                        },
                                        "loc": {
                                            "start": 533,
                                            "end": 535
                                        }
                                    },
                                    "loc": {
                                        "start": 533,
                                        "end": 536
                                    }
                                },
                                "loc": {
                                    "start": 532,
                                    "end": 537
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 527,
                                "end": 537
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
                                    "start": 541,
                                    "end": 549
                                }
                            },
                            "loc": {
                                "start": 541,
                                "end": 549
                            }
                        },
                        "loc": {
                            "start": 540,
                            "end": 550
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 517,
                        "end": 550
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 553,
                            "end": 569
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 570,
                                    "end": 581
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 583,
                                        "end": 586
                                    }
                                },
                                "loc": {
                                    "start": 583,
                                    "end": 586
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 570,
                                "end": 586
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 589,
                                "end": 605
                            }
                        },
                        "loc": {
                            "start": 589,
                            "end": 605
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 553,
                        "end": 605
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 608,
                            "end": 614
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
                                    "start": 617,
                                    "end": 622
                                }
                            },
                            "loc": {
                                "start": 617,
                                "end": 622
                            }
                        },
                        "loc": {
                            "start": 616,
                            "end": 623
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 608,
                        "end": 623
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 626,
                            "end": 637
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 638,
                                    "end": 643
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
                                            "start": 645,
                                            "end": 647
                                        }
                                    },
                                    "loc": {
                                        "start": 645,
                                        "end": 647
                                    }
                                },
                                "loc": {
                                    "start": 645,
                                    "end": 648
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 638,
                                "end": 648
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 650,
                                    "end": 661
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 663,
                                        "end": 666
                                    }
                                },
                                "loc": {
                                    "start": 663,
                                    "end": 666
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 650,
                                "end": 666
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 669,
                                "end": 680
                            }
                        },
                        "loc": {
                            "start": 669,
                            "end": 680
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 626,
                        "end": 680
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 683,
                            "end": 695
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 696,
                                    "end": 702
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
                                                "start": 705,
                                                "end": 707
                                            }
                                        },
                                        "loc": {
                                            "start": 705,
                                            "end": 707
                                        }
                                    },
                                    "loc": {
                                        "start": 705,
                                        "end": 708
                                    }
                                },
                                "loc": {
                                    "start": 704,
                                    "end": 709
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 696,
                                "end": 709
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 711,
                                    "end": 722
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 724,
                                        "end": 727
                                    }
                                },
                                "loc": {
                                    "start": 724,
                                    "end": 727
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 711,
                                "end": 727
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
                                    "start": 731,
                                    "end": 742
                                }
                            },
                            "loc": {
                                "start": 731,
                                "end": 742
                            }
                        },
                        "loc": {
                            "start": 730,
                            "end": 743
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 683,
                        "end": 743
                    }
                }
            ],
            "loc": {
                "start": 416,
                "end": 745
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingVault",
                "loc": {
                    "start": 752,
                    "end": 763
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
                            "start": 768,
                            "end": 775
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
                        "start": 768,
                        "end": 780
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 783,
                            "end": 799
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 800,
                                    "end": 811
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 813,
                                        "end": 816
                                    }
                                },
                                "loc": {
                                    "start": 813,
                                    "end": 816
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 800,
                                "end": 816
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 819,
                                "end": 835
                            }
                        },
                        "loc": {
                            "start": 819,
                            "end": 835
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 783,
                        "end": 835
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 838,
                            "end": 844
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
                                    "start": 847,
                                    "end": 852
                                }
                            },
                            "loc": {
                                "start": 847,
                                "end": 852
                            }
                        },
                        "loc": {
                            "start": 846,
                            "end": 853
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 838,
                        "end": 853
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 856,
                            "end": 867
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 868,
                                    "end": 873
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
                                            "start": 875,
                                            "end": 877
                                        }
                                    },
                                    "loc": {
                                        "start": 875,
                                        "end": 877
                                    }
                                },
                                "loc": {
                                    "start": 875,
                                    "end": 878
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 868,
                                "end": 878
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 880,
                                    "end": 891
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 893,
                                        "end": 896
                                    }
                                },
                                "loc": {
                                    "start": 893,
                                    "end": 896
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 880,
                                "end": 896
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 899,
                                "end": 910
                            }
                        },
                        "loc": {
                            "start": 899,
                            "end": 910
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 856,
                        "end": 910
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 913,
                            "end": 925
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 926,
                                    "end": 932
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
                                                "start": 935,
                                                "end": 937
                                            }
                                        },
                                        "loc": {
                                            "start": 935,
                                            "end": 937
                                        }
                                    },
                                    "loc": {
                                        "start": 935,
                                        "end": 938
                                    }
                                },
                                "loc": {
                                    "start": 934,
                                    "end": 939
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 926,
                                "end": 939
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 941,
                                    "end": 952
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 954,
                                        "end": 957
                                    }
                                },
                                "loc": {
                                    "start": 954,
                                    "end": 957
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 941,
                                "end": 957
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
                                    "start": 961,
                                    "end": 972
                                }
                            },
                            "loc": {
                                "start": 961,
                                "end": 972
                            }
                        },
                        "loc": {
                            "start": 960,
                            "end": 973
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 913,
                        "end": 973
                    }
                }
            ],
            "loc": {
                "start": 747,
                "end": 975
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Proposal",
                "loc": {
                    "start": 982,
                    "end": 990
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
                            "start": 995,
                            "end": 997
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
                                    "start": 999,
                                    "end": 1001
                                }
                            },
                            "loc": {
                                "start": 999,
                                "end": 1001
                            }
                        },
                        "loc": {
                            "start": 999,
                            "end": 1002
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 995,
                        "end": 1002
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingContract",
                        "loc": {
                            "start": 1005,
                            "end": 1019
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
                                    "start": 1021,
                                    "end": 1035
                                }
                            },
                            "loc": {
                                "start": 1021,
                                "end": 1035
                            }
                        },
                        "loc": {
                            "start": 1021,
                            "end": 1036
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1005,
                        "end": 1036
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1039,
                            "end": 1053
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "created",
                        "loc": {
                            "start": 1056,
                            "end": 1063
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
                                    "start": 1065,
                                    "end": 1068
                                }
                            },
                            "loc": {
                                "start": 1065,
                                "end": 1068
                            }
                        },
                        "loc": {
                            "start": 1065,
                            "end": 1069
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1039,
                        "end": 1069
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1072,
                            "end": 1086
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "expiration",
                        "loc": {
                            "start": 1089,
                            "end": 1099
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
                                    "start": 1101,
                                    "end": 1104
                                }
                            },
                            "loc": {
                                "start": 1101,
                                "end": 1104
                            }
                        },
                        "loc": {
                            "start": 1101,
                            "end": 1105
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1072,
                        "end": 1105
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1108,
                            "end": 1122
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "unlock",
                        "loc": {
                            "start": 1125,
                            "end": 1131
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
                                    "start": 1133,
                                    "end": 1136
                                }
                            },
                            "loc": {
                                "start": 1133,
                                "end": 1136
                            }
                        },
                        "loc": {
                            "start": 1133,
                            "end": 1137
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1108,
                        "end": 1137
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isActive",
                        "loc": {
                            "start": 1140,
                            "end": 1148
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1150,
                                "end": 1157
                            }
                        },
                        "loc": {
                            "start": 1150,
                            "end": 1157
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1140,
                        "end": 1157
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1160,
                            "end": 1174
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "lastCall",
                        "loc": {
                            "start": 1177,
                            "end": 1185
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1187,
                                "end": 1190
                            }
                        },
                        "loc": {
                            "start": 1187,
                            "end": 1190
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1160,
                        "end": 1190
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "quorum",
                        "loc": {
                            "start": 1193,
                            "end": 1199
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1201,
                                "end": 1207
                            }
                        },
                        "loc": {
                            "start": 1201,
                            "end": 1207
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1193,
                        "end": 1207
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1210,
                            "end": 1214
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1215,
                                    "end": 1220
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
                                            "start": 1222,
                                            "end": 1224
                                        }
                                    },
                                    "loc": {
                                        "start": 1222,
                                        "end": 1224
                                    }
                                },
                                "loc": {
                                    "start": 1222,
                                    "end": 1225
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1215,
                                "end": 1225
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1228,
                                "end": 1232
                            }
                        },
                        "loc": {
                            "start": 1228,
                            "end": 1232
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1210,
                        "end": 1232
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 1235,
                            "end": 1241
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
                                    "start": 1244,
                                    "end": 1249
                                }
                            },
                            "loc": {
                                "start": 1244,
                                "end": 1249
                            }
                        },
                        "loc": {
                            "start": 1243,
                            "end": 1250
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1235,
                        "end": 1250
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1253,
                            "end": 1258
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1259,
                                    "end": 1265
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
                                                    "start": 1268,
                                                    "end": 1270
                                                }
                                            },
                                            "loc": {
                                                "start": 1268,
                                                "end": 1270
                                            }
                                        },
                                        "loc": {
                                            "start": 1268,
                                            "end": 1271
                                        }
                                    },
                                    "loc": {
                                        "start": 1267,
                                        "end": 1272
                                    }
                                },
                                "loc": {
                                    "start": 1267,
                                    "end": 1273
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1259,
                                "end": 1273
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
                                    "start": 1277,
                                    "end": 1281
                                }
                            },
                            "loc": {
                                "start": 1277,
                                "end": 1281
                            }
                        },
                        "loc": {
                            "start": 1276,
                            "end": 1282
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1253,
                        "end": 1282
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1285,
                            "end": 1296
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1297,
                                    "end": 1302
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
                                            "start": 1304,
                                            "end": 1306
                                        }
                                    },
                                    "loc": {
                                        "start": 1304,
                                        "end": 1306
                                    }
                                },
                                "loc": {
                                    "start": 1304,
                                    "end": 1307
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1297,
                                "end": 1307
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1310,
                                "end": 1321
                            }
                        },
                        "loc": {
                            "start": 1310,
                            "end": 1321
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1285,
                        "end": 1321
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1324,
                            "end": 1336
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1337,
                                    "end": 1343
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
                                                "start": 1346,
                                                "end": 1348
                                            }
                                        },
                                        "loc": {
                                            "start": 1346,
                                            "end": 1348
                                        }
                                    },
                                    "loc": {
                                        "start": 1346,
                                        "end": 1349
                                    }
                                },
                                "loc": {
                                    "start": 1345,
                                    "end": 1350
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1337,
                                "end": 1350
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
                                    "start": 1354,
                                    "end": 1365
                                }
                            },
                            "loc": {
                                "start": 1354,
                                "end": 1365
                            }
                        },
                        "loc": {
                            "start": 1353,
                            "end": 1366
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1324,
                        "end": 1366
                    }
                }
            ],
            "loc": {
                "start": 977,
                "end": 1368
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Vote",
                "loc": {
                    "start": 1375,
                    "end": 1379
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
                            "start": 1384,
                            "end": 1389
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
                                    "start": 1391,
                                    "end": 1396
                                }
                            },
                            "loc": {
                                "start": 1391,
                                "end": 1396
                            }
                        },
                        "loc": {
                            "start": 1391,
                            "end": 1397
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1384,
                        "end": 1397
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "power",
                        "loc": {
                            "start": 1400,
                            "end": 1405
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
                                    "start": 1407,
                                    "end": 1413
                                }
                            },
                            "loc": {
                                "start": 1407,
                                "end": 1413
                            }
                        },
                        "loc": {
                            "start": 1407,
                            "end": 1414
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1400,
                        "end": 1414
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 1417,
                            "end": 1425
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
                                    "start": 1427,
                                    "end": 1435
                                }
                            },
                            "loc": {
                                "start": 1427,
                                "end": 1435
                            }
                        },
                        "loc": {
                            "start": 1427,
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
                    "name": {
                        "kind": "Name",
                        "value": "castBallot",
                        "loc": {
                            "start": 1439,
                            "end": 1449
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Ballot",
                            "loc": {
                                "start": 1451,
                                "end": 1457
                            }
                        },
                        "loc": {
                            "start": 1451,
                            "end": 1457
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1439,
                        "end": 1457
                    }
                }
            ],
            "loc": {
                "start": 1370,
                "end": 1459
            }
        },
        {
            "kind": "EnumTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Ballot",
                "loc": {
                    "start": 1466,
                    "end": 1472
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
                            "start": 1477,
                            "end": 1480
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1477,
                        "end": 1480
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "No",
                        "loc": {
                            "start": 1483,
                            "end": 1485
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1483,
                        "end": 1485
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "Abstain",
                        "loc": {
                            "start": 1488,
                            "end": 1495
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1488,
                        "end": 1495
                    }
                }
            ],
            "loc": {
                "start": 1461,
                "end": 1497
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingPower",
                "loc": {
                    "start": 1504,
                    "end": 1515
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
                            "start": 1520,
                            "end": 1531
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
                                    "start": 1533,
                                    "end": 1536
                                }
                            },
                            "loc": {
                                "start": 1533,
                                "end": 1536
                            }
                        },
                        "loc": {
                            "start": 1533,
                            "end": 1537
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1520,
                        "end": 1537
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1540,
                            "end": 1545
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
                                    "start": 1547,
                                    "end": 1553
                                }
                            },
                            "loc": {
                                "start": 1547,
                                "end": 1553
                            }
                        },
                        "loc": {
                            "start": 1547,
                            "end": 1554
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1540,
                        "end": 1554
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 1557,
                            "end": 1562
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
                                    "start": 1564,
                                    "end": 1569
                                }
                            },
                            "loc": {
                                "start": 1564,
                                "end": 1569
                            }
                        },
                        "loc": {
                            "start": 1564,
                            "end": 1570
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1557,
                        "end": 1570
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1573,
                            "end": 1585
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
                                            "start": 1588,
                                            "end": 1599
                                        }
                                    },
                                    "loc": {
                                        "start": 1588,
                                        "end": 1599
                                    }
                                },
                                "loc": {
                                    "start": 1588,
                                    "end": 1600
                                }
                            },
                            "loc": {
                                "start": 1587,
                                "end": 1601
                            }
                        },
                        "loc": {
                            "start": 1587,
                            "end": 1602
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1573,
                        "end": 1602
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isStale",
                        "loc": {
                            "start": 1605,
                            "end": 1612
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1614,
                                "end": 1621
                            }
                        },
                        "loc": {
                            "start": 1614,
                            "end": 1621
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1605,
                        "end": 1621
                    }
                }
            ],
            "loc": {
                "start": 1499,
                "end": 1623
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "TotalVotingPower",
                "loc": {
                    "start": 1630,
                    "end": 1646
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
                            "start": 1651,
                            "end": 1662
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
                                    "start": 1664,
                                    "end": 1667
                                }
                            },
                            "loc": {
                                "start": 1664,
                                "end": 1667
                            }
                        },
                        "loc": {
                            "start": 1664,
                            "end": 1668
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1651,
                        "end": 1668
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1671,
                            "end": 1676
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
                                    "start": 1678,
                                    "end": 1684
                                }
                            },
                            "loc": {
                                "start": 1678,
                                "end": 1684
                            }
                        },
                        "loc": {
                            "start": 1678,
                            "end": 1685
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1671,
                        "end": 1685
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1688,
                            "end": 1700
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
                                            "start": 1703,
                                            "end": 1714
                                        }
                                    },
                                    "loc": {
                                        "start": 1703,
                                        "end": 1714
                                    }
                                },
                                "loc": {
                                    "start": 1703,
                                    "end": 1715
                                }
                            },
                            "loc": {
                                "start": 1702,
                                "end": 1716
                            }
                        },
                        "loc": {
                            "start": 1702,
                            "end": 1717
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1688,
                        "end": 1717
                    }
                }
            ],
            "loc": {
                "start": 1625,
                "end": 1719
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Voter",
                "loc": {
                    "start": 1726,
                    "end": 1731
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
                            "start": 1736,
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
                                "value": "ID",
                                "loc": {
                                    "start": 1745,
                                    "end": 1747
                                }
                            },
                            "loc": {
                                "start": 1745,
                                "end": 1747
                            }
                        },
                        "loc": {
                            "start": 1745,
                            "end": 1748
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1736,
                        "end": 1748
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1751,
                            "end": 1755
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposal",
                                "loc": {
                                    "start": 1756,
                                    "end": 1764
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
                                            "start": 1766,
                                            "end": 1768
                                        }
                                    },
                                    "loc": {
                                        "start": 1766,
                                        "end": 1768
                                    }
                                },
                                "loc": {
                                    "start": 1766,
                                    "end": 1769
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1756,
                                "end": 1769
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 1771,
                                    "end": 1785
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
                                            "start": 1787,
                                            "end": 1789
                                        }
                                    },
                                    "loc": {
                                        "start": 1787,
                                        "end": 1789
                                    }
                                },
                                "loc": {
                                    "start": 1787,
                                    "end": 1790
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1771,
                                "end": 1790
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1793,
                                "end": 1797
                            }
                        },
                        "loc": {
                            "start": 1793,
                            "end": 1797
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1751,
                        "end": 1797
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1800,
                            "end": 1805
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposals",
                                "loc": {
                                    "start": 1806,
                                    "end": 1815
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
                                                    "start": 1818,
                                                    "end": 1820
                                                }
                                            },
                                            "loc": {
                                                "start": 1818,
                                                "end": 1820
                                            }
                                        },
                                        "loc": {
                                            "start": 1818,
                                            "end": 1821
                                        }
                                    },
                                    "loc": {
                                        "start": 1817,
                                        "end": 1822
                                    }
                                },
                                "loc": {
                                    "start": 1817,
                                    "end": 1823
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1806,
                                "end": 1823
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 1825,
                                    "end": 1839
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
                                            "start": 1841,
                                            "end": 1843
                                        }
                                    },
                                    "loc": {
                                        "start": 1841,
                                        "end": 1843
                                    }
                                },
                                "loc": {
                                    "start": 1841,
                                    "end": 1844
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1825,
                                "end": 1844
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
                                    "start": 1848,
                                    "end": 1852
                                }
                            },
                            "loc": {
                                "start": 1848,
                                "end": 1852
                            }
                        },
                        "loc": {
                            "start": 1847,
                            "end": 1853
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1800,
                        "end": 1853
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1856,
                            "end": 1867
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVault",
                                "loc": {
                                    "start": 1868,
                                    "end": 1879
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
                                            "start": 1881,
                                            "end": 1883
                                        }
                                    },
                                    "loc": {
                                        "start": 1881,
                                        "end": 1883
                                    }
                                },
                                "loc": {
                                    "start": 1881,
                                    "end": 1884
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1868,
                                "end": 1884
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 1886,
                                    "end": 1897
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1899,
                                        "end": 1902
                                    }
                                },
                                "loc": {
                                    "start": 1899,
                                    "end": 1902
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1886,
                                "end": 1902
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1905,
                                "end": 1916
                            }
                        },
                        "loc": {
                            "start": 1905,
                            "end": 1916
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1856,
                        "end": 1916
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1919,
                            "end": 1931
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 1932,
                                    "end": 1944
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
                                                    "start": 1947,
                                                    "end": 1949
                                                }
                                            },
                                            "loc": {
                                                "start": 1947,
                                                "end": 1949
                                            }
                                        },
                                        "loc": {
                                            "start": 1947,
                                            "end": 1950
                                        }
                                    },
                                    "loc": {
                                        "start": 1946,
                                        "end": 1951
                                    }
                                },
                                "loc": {
                                    "start": 1946,
                                    "end": 1952
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1932,
                                "end": 1952
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 1954,
                                    "end": 1965
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1967,
                                        "end": 1970
                                    }
                                },
                                "loc": {
                                    "start": 1967,
                                    "end": 1970
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1954,
                                "end": 1970
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
                                    "start": 1974,
                                    "end": 1985
                                }
                            },
                            "loc": {
                                "start": 1974,
                                "end": 1985
                            }
                        },
                        "loc": {
                            "start": 1973,
                            "end": 1986
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1919,
                        "end": 1986
                    }
                }
            ],
            "loc": {
                "start": 1721,
                "end": 1988
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 1988
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
