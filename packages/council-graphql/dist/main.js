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

function $55c8ce6d3048bfc3$export$1e541e0e596db3f0(name, dataSources) {
    switch(name){
        case "gscCoreVoting":
            return dataSources.gscVoting;
        case "gscVault":
            return dataSources.gscVault;
        case "lockingVault":
            return dataSources.lockingVault;
        case "vestingVault":
            return dataSources.vestingVault;
        case "coreVoting":
        default:
            return dataSources.coreVoting;
    }
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
    async getLastCall ({ proposal: proposal , context: context  }) {
        const dataSource = (0, $55c8ce6d3048bfc3$export$1e541e0e596db3f0)(proposal.votingContract.name, context.dataSources);
        const { proposalHash: proposalHash , lastCall: lastCall  } = await dataSource.getProposalById(proposal.id);
        if (proposalHash === $e35651dc583d7dca$var$EXECUTED_PROPOSAL_HASH) return lastCall;
    },
    async getQuorum ({ proposal: proposal , context: context  }) {
        const dataSource = (0, $55c8ce6d3048bfc3$export$1e541e0e596db3f0)(proposal.votingContract.name, context.dataSources);
        const { proposalHash: proposalHash , quorum: quorum  } = await dataSource.getProposalById(proposal.id);
        if (proposalHash === $e35651dc583d7dca$var$EXECUTED_PROPOSAL_HASH) return quorum;
    },
    async getByVotingContract ({ votingContract: votingContract , context: context  }) {
        const dataSource = (0, $55c8ce6d3048bfc3$export$1e541e0e596db3f0)(votingContract.name, context.dataSources);
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




const $08874734e9bff795$export$122d5d4b482edf52 = "0xFEaDB1F18386d0225a38E9c4bD1E9Ac52243dE99";
const $08874734e9bff795$export$f0bc18d92a8ff06c = "0xcC46775f1dB1d697c176ed66698BA3C15394C3D4";
const $08874734e9bff795$var$LOCALHOST_CHAIN_ID = 31337;
const $08874734e9bff795$export$a8fd08e8b7cfacd3 = {
    ...(0, $1RIJT$elementficounciltokenlist.mainnetAddressList),
    chainId: $08874734e9bff795$var$LOCALHOST_CHAIN_ID
};
const $08874734e9bff795$export$578de1f6b0e6a3e9 = {
    chainId: $08874734e9bff795$var$LOCALHOST_CHAIN_ID,
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
const $08874734e9bff795$export$c9b69c213f456a9c = {
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
    chainId: $08874734e9bff795$var$LOCALHOST_CHAIN_ID
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


const $ac266e1a17cc8ea7$export$40a03fbff71f56d3 = {
    async getByVotingVault ({ votingVault: votingVault , blockNumber: blockNumber , context: context  }) {
        const { chainId: chainId , dataSources: dataSources , provider: provider  } = context;
        blockNumber = blockNumber || await (0, $730705444d2faf33$export$24d97b9dae72698)(provider);
        let value = BigInt(0);
        const dataSource = (0, $55c8ce6d3048bfc3$export$1e541e0e596db3f0)(votingVault.name, dataSources);
        const powerChanges = await dataSource.getVoteChangeEventArgs((0, $97c17b3f7f480abc$export$472b2ff001c2cfbf)(chainId), blockNumber);
        for (const { to: to , amount: amount  } of powerChanges){
            // The foundation an team deposits are delegated to the 0x0000...0001
            // address so they can't vote.
            const isVoter = to !== (0, $08874734e9bff795$export$f0bc18d92a8ff06c) && to !== (0, $08874734e9bff795$export$122d5d4b482edf52);
            if (isVoter) value += BigInt(amount);
        }
        return {
            blockNumber: blockNumber,
            value: (0, $1RIJT$etherslibutils.formatEther)(value),
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
    async getByVoter ({ voter: voter , proposal: proposal , context: { dataSources: dataSources  }  }) {
        const { id: id , votingContract: votingContract  } = proposal;
        let dataSource = (0, $55c8ce6d3048bfc3$export$1e541e0e596db3f0)(votingContract.name, dataSources);
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
    async getByVotingVaults ({ votingVaults: votingVaults , blockNumber: blockNumber , context: { dataSources: dataSources  } ,  }) {
        const voterPowers = {};
        for (const votingVault of votingVaults){
            const dataSource = (0, $55c8ce6d3048bfc3$export$1e541e0e596db3f0)(votingVault.name, dataSources);
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




function $abdf1ffe226cc459$export$17d5f00cfd692b8a(chainId) {
    switch(chainId){
        case (0, $1RIJT$elementficounciltokenlist.mainnetAddressList).chainId:
            return (0, $1RIJT$elementficounciltokenlist.mainnetAddressList).addresses;
        case (0, $1RIJT$elementficounciltokenlist.goerliAddressList).chainId:
            return (0, $1RIJT$elementficounciltokenlist.goerliAddressList).addresses;
        default:
            // TODO: When and how should mainnetForkAddressList be used?
            return (0, $08874734e9bff795$export$578de1f6b0e6a3e9).addresses;
    }
}



function $964e5405d7675612$export$c11fa5b37b624db8(address, chainId) {
    const addresses = (0, $abdf1ffe226cc459$export$17d5f00cfd692b8a)(chainId);
    for (const [name, nameAddress] of Object.entries(addresses)){
        if (address === nameAddress) return name;
    }
}



const $7818ae0a8b433afc$export$1dbe110119cb4dd2 = {
    getByName ({ name: name , context: context  }) {
        // prefer plural to getAddresses once
        const vaults = this.getByNames({
            names: [
                name
            ],
            context: context
        });
        return vaults[0];
    },
    getByNames ({ names: names , context: { chainId: chainId  }  }) {
        const addresses = (0, $abdf1ffe226cc459$export$17d5f00cfd692b8a)(chainId);
        return names.map((name)=>({
                address: addresses[name],
                name: name
            }));
    }
};


const $1f368d119f63f485$export$4c0b87851cbe4e3f = {
    getByAddress ({ address: address , context: context  }) {
        const name = (0, $964e5405d7675612$export$c11fa5b37b624db8)(address, context.chainId);
        return name ? this.getByName({
            name: name,
            context: context
        }) : null;
    },
    getByName ({ name: name , context: context  }) {
        const addresses = (0, $abdf1ffe226cc459$export$17d5f00cfd692b8a)(context.chainId);
        let votingVaults;
        switch(name){
            case "coreVoting":
                votingVaults = [
                    (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByName({
                        name: "lockingVault",
                        context: context
                    }),
                    (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByName({
                        name: "vestingVault",
                        context: context
                    }), 
                ];
                break;
            case "gscCoreVoting":
                votingVaults = [
                    (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByName({
                        name: "gscVault",
                        context: context
                    }), 
                ];
                break;
            default:
                votingVaults = [];
        }
        return {
            address: addresses[name],
            name: name,
            votingVaults: votingVaults
        };
    }
};





const $889645ffb5e37d8c$export$a0cbbdeeb12308cd = {
    async getByVoter ({ voter: voter , blockNumber: blockNumber , votingVaults: votingVaults , context: { dataSources: dataSources , provider: provider  } ,  }) {
        blockNumber = blockNumber || await (0, $730705444d2faf33$export$24d97b9dae72698)(provider);
        let aggregateValue = BigInt(0);
        for (const { name: name  } of votingVaults){
            let value;
            switch(name){
                case "lockingVault":
                    value = await dataSources.lockingVault.getVotingPowerView(voter.address, blockNumber);
                    break;
                case "vestingVault":
                    value = await dataSources.vestingVault.getVotingPowerView(voter.address, blockNumber);
                    break;
                case "gscVault":
                    value = await dataSources.gscVault.getVotingPower(voter.address, blockNumber);
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
    getByVoters ({ voters: voters , votingVaults: votingVaults , blockNumber: blockNumber , context: context  }) {
        return Promise.all(voters.map((voter)=>this.getByVoter({
                voter: voter,
                votingVaults: votingVaults,
                blockNumber: blockNumber,
                context: context
            })));
    },
    async getIsStale ({ votingPower: { value: value , voter: voter , votingVaults: votingVaults , blockNumber: blockNumber  } , context: { dataSources: dataSources , provider: provider  } ,  }) {
        const latestBlock = await (0, $730705444d2faf33$export$24d97b9dae72698)(provider);
        if (blockNumber === latestBlock) return false;
        else {
            for (const { name: name  } of votingVaults){
                const dataSource = (0, $55c8ce6d3048bfc3$export$1e541e0e596db3f0)(name, dataSources);
                const valueAtBlock = await dataSource.getVotingPower(voter.address, blockNumber);
                if (Number(valueAtBlock) === 0 && Number(value) > 0) return true;
                return false;
            }
            return null;
        }
    }
};



const $76cfde035e4f639b$export$f62412552be5daf2 = {
    Query: {
        coreVoting: (_, __, context)=>{
            return (0, $1f368d119f63f485$export$4c0b87851cbe4e3f).getByName({
                name: "coreVoting",
                context: context
            });
        },
        gscVoting: (_, __, context)=>{
            return (0, $1f368d119f63f485$export$4c0b87851cbe4e3f).getByName({
                name: "gscCoreVoting",
                context: context
            });
        },
        lockingVault: (_, __, context)=>{
            return (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByName({
                name: "lockingVault",
                context: context
            });
        },
        vestingVault: (_, __, context)=>{
            return (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByName({
                name: "vestingVault",
                context: context
            });
        },
        gscVault: (_, __, context)=>{
            return (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByName({
                name: "gscVault",
                context: context
            });
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
                const votingVaults = (0, $7818ae0a8b433afc$export$1dbe110119cb4dd2).getByNames({
                    names: [
                        "lockingVault",
                        "vestingVault",
                        "gscCoreVoting"
                    ],
                    context: context
                });
                return (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByVotingVaults({
                    votingVaults: votingVaults,
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
        voters: ({ votingContract: votingContract  }, _, context)=>{
            // TODO: make proposal.created required and pass that here.
            return (0, $74d4fdf5b0550f40$export$e424928527fab42f).getByVotingVaults({
                votingVaults: votingContract.votingVaults,
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
        isStale: (votingPower, _, context)=>{
            return (0, $889645ffb5e37d8c$export$a0cbbdeeb12308cd).getIsStale({
                votingPower: votingPower,
                context: context
            });
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
        } catch (error) {}
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



async function $362c94e84882e5ac$export$54fae1269cb9a9e0(context) {
    const { chainId: chainId , dataSources: dataSources , provider: provider  } = context;
    const addresses = (0, $abdf1ffe226cc459$export$17d5f00cfd692b8a)(chainId);
    return {
        ...context,
        dataSources: {
            ...dataSources,
            coreVoting: new (0, $41844f56d22dc55e$export$ca33481ae8bfff02)(addresses.coreVoting, provider),
            gscVoting: new (0, $41844f56d22dc55e$export$ca33481ae8bfff02)(addresses.gscCoreVoting, provider),
            lockingVault: new (0, $a1c706d406f5708a$export$93f46c2abf3fc254)(addresses.lockingVault, provider),
            vestingVault: new (0, $e0e2802e459d88e3$export$a37e73beca8c1698)(addresses.vestingVault, provider),
            gscVault: new (0, $492df70f1218e6f0$export$e2e4dee807f6af7a)(addresses.gscVault, provider)
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
                        "value": "gscVault",
                        "loc": {
                            "start": 46,
                            "end": 54
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingVault",
                            "loc": {
                                "start": 56,
                                "end": 67
                            }
                        },
                        "loc": {
                            "start": 56,
                            "end": 67
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 46,
                        "end": 67
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "gscVoting",
                        "loc": {
                            "start": 71,
                            "end": 80
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingContract",
                            "loc": {
                                "start": 82,
                                "end": 96
                            }
                        },
                        "loc": {
                            "start": 82,
                            "end": 96
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 71,
                        "end": 96
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "lockingVault",
                        "loc": {
                            "start": 100,
                            "end": 112
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingVault",
                            "loc": {
                                "start": 114,
                                "end": 125
                            }
                        },
                        "loc": {
                            "start": 114,
                            "end": 125
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 100,
                        "end": 125
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vestingVault",
                        "loc": {
                            "start": 129,
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
                        "start": 129,
                        "end": 154
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 158,
                            "end": 163
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 164,
                                    "end": 171
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
                                            "start": 173,
                                            "end": 175
                                        }
                                    },
                                    "loc": {
                                        "start": 173,
                                        "end": 175
                                    }
                                },
                                "loc": {
                                    "start": 173,
                                    "end": 176
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 164,
                                "end": 176
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Voter",
                            "loc": {
                                "start": 179,
                                "end": 184
                            }
                        },
                        "loc": {
                            "start": 179,
                            "end": 184
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 158,
                        "end": 184
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 188,
                            "end": 194
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "addresses",
                                "loc": {
                                    "start": 195,
                                    "end": 204
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
                                                "start": 207,
                                                "end": 209
                                            }
                                        },
                                        "loc": {
                                            "start": 207,
                                            "end": 209
                                        }
                                    },
                                    "loc": {
                                        "start": 207,
                                        "end": 210
                                    }
                                },
                                "loc": {
                                    "start": 206,
                                    "end": 211
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 195,
                                "end": 211
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
                                    "start": 215,
                                    "end": 220
                                }
                            },
                            "loc": {
                                "start": 215,
                                "end": 220
                            }
                        },
                        "loc": {
                            "start": 214,
                            "end": 221
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 188,
                        "end": 221
                    }
                }
            ],
            "loc": {
                "start": 0,
                "end": 224
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingContract",
                "loc": {
                    "start": 233,
                    "end": 247
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
                            "start": 253,
                            "end": 260
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
                                    "start": 262,
                                    "end": 264
                                }
                            },
                            "loc": {
                                "start": 262,
                                "end": 264
                            }
                        },
                        "loc": {
                            "start": 262,
                            "end": 265
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 253,
                        "end": 265
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "name",
                        "loc": {
                            "start": 269,
                            "end": 273
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
                                    "start": 275,
                                    "end": 281
                                }
                            },
                            "loc": {
                                "start": 275,
                                "end": 281
                            }
                        },
                        "loc": {
                            "start": 275,
                            "end": 282
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 269,
                        "end": 282
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 286,
                            "end": 298
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
                                            "start": 301,
                                            "end": 312
                                        }
                                    },
                                    "loc": {
                                        "start": 301,
                                        "end": 312
                                    }
                                },
                                "loc": {
                                    "start": 301,
                                    "end": 313
                                }
                            },
                            "loc": {
                                "start": 300,
                                "end": 314
                            }
                        },
                        "loc": {
                            "start": 300,
                            "end": 315
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 286,
                        "end": 315
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 319,
                            "end": 327
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "id",
                                "loc": {
                                    "start": 328,
                                    "end": 330
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
                                            "start": 332,
                                            "end": 334
                                        }
                                    },
                                    "loc": {
                                        "start": 332,
                                        "end": 334
                                    }
                                },
                                "loc": {
                                    "start": 332,
                                    "end": 335
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 328,
                                "end": 335
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Proposal",
                            "loc": {
                                "start": 338,
                                "end": 346
                            }
                        },
                        "loc": {
                            "start": 338,
                            "end": 346
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 319,
                        "end": 346
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposals",
                        "loc": {
                            "start": 350,
                            "end": 359
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "ids",
                                "loc": {
                                    "start": 360,
                                    "end": 363
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
                                                "start": 366,
                                                "end": 368
                                            }
                                        },
                                        "loc": {
                                            "start": 366,
                                            "end": 368
                                        }
                                    },
                                    "loc": {
                                        "start": 366,
                                        "end": 369
                                    }
                                },
                                "loc": {
                                    "start": 365,
                                    "end": 370
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 360,
                                "end": 370
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
                                    "start": 374,
                                    "end": 382
                                }
                            },
                            "loc": {
                                "start": 374,
                                "end": 382
                            }
                        },
                        "loc": {
                            "start": 373,
                            "end": 383
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 350,
                        "end": 383
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 387,
                            "end": 403
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 404,
                                    "end": 415
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 417,
                                        "end": 420
                                    }
                                },
                                "loc": {
                                    "start": 417,
                                    "end": 420
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 404,
                                "end": 420
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 423,
                                "end": 439
                            }
                        },
                        "loc": {
                            "start": 423,
                            "end": 439
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 387,
                        "end": 439
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 443,
                            "end": 449
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
                                    "start": 452,
                                    "end": 457
                                }
                            },
                            "loc": {
                                "start": 452,
                                "end": 457
                            }
                        },
                        "loc": {
                            "start": 451,
                            "end": 458
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 443,
                        "end": 458
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 462,
                            "end": 473
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 474,
                                    "end": 479
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
                                            "start": 481,
                                            "end": 483
                                        }
                                    },
                                    "loc": {
                                        "start": 481,
                                        "end": 483
                                    }
                                },
                                "loc": {
                                    "start": 481,
                                    "end": 484
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 474,
                                "end": 484
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 486,
                                    "end": 497
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 499,
                                        "end": 502
                                    }
                                },
                                "loc": {
                                    "start": 499,
                                    "end": 502
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 486,
                                "end": 502
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 505,
                                "end": 516
                            }
                        },
                        "loc": {
                            "start": 505,
                            "end": 516
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 462,
                        "end": 516
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 520,
                            "end": 532
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 533,
                                    "end": 539
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
                                                "start": 542,
                                                "end": 544
                                            }
                                        },
                                        "loc": {
                                            "start": 542,
                                            "end": 544
                                        }
                                    },
                                    "loc": {
                                        "start": 542,
                                        "end": 545
                                    }
                                },
                                "loc": {
                                    "start": 541,
                                    "end": 546
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 533,
                                "end": 546
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 548,
                                    "end": 559
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 561,
                                        "end": 564
                                    }
                                },
                                "loc": {
                                    "start": 561,
                                    "end": 564
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 548,
                                "end": 564
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
                                    "start": 568,
                                    "end": 579
                                }
                            },
                            "loc": {
                                "start": 568,
                                "end": 579
                            }
                        },
                        "loc": {
                            "start": 567,
                            "end": 580
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 520,
                        "end": 580
                    }
                }
            ],
            "loc": {
                "start": 228,
                "end": 583
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingVault",
                "loc": {
                    "start": 592,
                    "end": 603
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
                            "start": 609,
                            "end": 616
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
                                    "start": 618,
                                    "end": 620
                                }
                            },
                            "loc": {
                                "start": 618,
                                "end": 620
                            }
                        },
                        "loc": {
                            "start": 618,
                            "end": 621
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 609,
                        "end": 621
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "name",
                        "loc": {
                            "start": 625,
                            "end": 629
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
                                    "start": 631,
                                    "end": 637
                                }
                            },
                            "loc": {
                                "start": 631,
                                "end": 637
                            }
                        },
                        "loc": {
                            "start": 631,
                            "end": 638
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 625,
                        "end": 638
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "totalVotingPower",
                        "loc": {
                            "start": 642,
                            "end": 658
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 659,
                                    "end": 670
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 672,
                                        "end": 675
                                    }
                                },
                                "loc": {
                                    "start": 672,
                                    "end": 675
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 659,
                                "end": 675
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "TotalVotingPower",
                            "loc": {
                                "start": 678,
                                "end": 694
                            }
                        },
                        "loc": {
                            "start": 678,
                            "end": 694
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 642,
                        "end": 694
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 698,
                            "end": 704
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
                                    "start": 707,
                                    "end": 712
                                }
                            },
                            "loc": {
                                "start": 707,
                                "end": 712
                            }
                        },
                        "loc": {
                            "start": 706,
                            "end": 713
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 698,
                        "end": 713
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 717,
                            "end": 728
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 729,
                                    "end": 734
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
                                            "start": 736,
                                            "end": 738
                                        }
                                    },
                                    "loc": {
                                        "start": 736,
                                        "end": 738
                                    }
                                },
                                "loc": {
                                    "start": 736,
                                    "end": 739
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 729,
                                "end": 739
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 741,
                                    "end": 752
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 754,
                                        "end": 757
                                    }
                                },
                                "loc": {
                                    "start": 754,
                                    "end": 757
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 741,
                                "end": 757
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 760,
                                "end": 771
                            }
                        },
                        "loc": {
                            "start": 760,
                            "end": 771
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 717,
                        "end": 771
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 775,
                            "end": 787
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 788,
                                    "end": 794
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
                                                "start": 797,
                                                "end": 799
                                            }
                                        },
                                        "loc": {
                                            "start": 797,
                                            "end": 799
                                        }
                                    },
                                    "loc": {
                                        "start": 797,
                                        "end": 800
                                    }
                                },
                                "loc": {
                                    "start": 796,
                                    "end": 801
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 788,
                                "end": 801
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 803,
                                    "end": 814
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 816,
                                        "end": 819
                                    }
                                },
                                "loc": {
                                    "start": 816,
                                    "end": 819
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 803,
                                "end": 819
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
                                    "start": 823,
                                    "end": 834
                                }
                            },
                            "loc": {
                                "start": 823,
                                "end": 834
                            }
                        },
                        "loc": {
                            "start": 822,
                            "end": 835
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 775,
                        "end": 835
                    }
                }
            ],
            "loc": {
                "start": 587,
                "end": 838
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Proposal",
                "loc": {
                    "start": 847,
                    "end": 855
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
                            "start": 861,
                            "end": 863
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
                                    "start": 865,
                                    "end": 867
                                }
                            },
                            "loc": {
                                "start": 865,
                                "end": 867
                            }
                        },
                        "loc": {
                            "start": 865,
                            "end": 868
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 861,
                        "end": 868
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingContract",
                        "loc": {
                            "start": 872,
                            "end": 886
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
                                    "start": 888,
                                    "end": 902
                                }
                            },
                            "loc": {
                                "start": 888,
                                "end": 902
                            }
                        },
                        "loc": {
                            "start": 888,
                            "end": 903
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 872,
                        "end": 903
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 907,
                            "end": 921
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "created",
                        "loc": {
                            "start": 925,
                            "end": 932
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
                                    "start": 934,
                                    "end": 937
                                }
                            },
                            "loc": {
                                "start": 934,
                                "end": 937
                            }
                        },
                        "loc": {
                            "start": 934,
                            "end": 938
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 907,
                        "end": 938
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 942,
                            "end": 956
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "expiration",
                        "loc": {
                            "start": 960,
                            "end": 970
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
                                    "start": 972,
                                    "end": 975
                                }
                            },
                            "loc": {
                                "start": 972,
                                "end": 975
                            }
                        },
                        "loc": {
                            "start": 972,
                            "end": 976
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 942,
                        "end": 976
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 980,
                            "end": 994
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "unlock",
                        "loc": {
                            "start": 998,
                            "end": 1004
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
                                    "start": 1006,
                                    "end": 1009
                                }
                            },
                            "loc": {
                                "start": 1006,
                                "end": 1009
                            }
                        },
                        "loc": {
                            "start": 1006,
                            "end": 1010
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 980,
                        "end": 1010
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Number",
                        "block": false,
                        "loc": {
                            "start": 1014,
                            "end": 1028
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "lastCall",
                        "loc": {
                            "start": 1057,
                            "end": 1065
                        }
                    },
                    "arguments": [],
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
                    "directives": [],
                    "loc": {
                        "start": 1014,
                        "end": 1070
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "quorum",
                        "loc": {
                            "start": 1074,
                            "end": 1080
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1082,
                                "end": 1088
                            }
                        },
                        "loc": {
                            "start": 1082,
                            "end": 1088
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1074,
                        "end": 1088
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1092,
                            "end": 1096
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1097,
                                    "end": 1102
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
                                            "start": 1104,
                                            "end": 1106
                                        }
                                    },
                                    "loc": {
                                        "start": 1104,
                                        "end": 1106
                                    }
                                },
                                "loc": {
                                    "start": 1104,
                                    "end": 1107
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1097,
                                "end": 1107
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1110,
                                "end": 1114
                            }
                        },
                        "loc": {
                            "start": 1110,
                            "end": 1114
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1092,
                        "end": 1114
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voters",
                        "loc": {
                            "start": 1118,
                            "end": 1124
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
                                    "start": 1127,
                                    "end": 1132
                                }
                            },
                            "loc": {
                                "start": 1127,
                                "end": 1132
                            }
                        },
                        "loc": {
                            "start": 1126,
                            "end": 1133
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1118,
                        "end": 1133
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1137,
                            "end": 1142
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1143,
                                    "end": 1149
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
                                                    "start": 1152,
                                                    "end": 1154
                                                }
                                            },
                                            "loc": {
                                                "start": 1152,
                                                "end": 1154
                                            }
                                        },
                                        "loc": {
                                            "start": 1152,
                                            "end": 1155
                                        }
                                    },
                                    "loc": {
                                        "start": 1151,
                                        "end": 1156
                                    }
                                },
                                "loc": {
                                    "start": 1151,
                                    "end": 1157
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1143,
                                "end": 1157
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
                                    "start": 1161,
                                    "end": 1165
                                }
                            },
                            "loc": {
                                "start": 1161,
                                "end": 1165
                            }
                        },
                        "loc": {
                            "start": 1160,
                            "end": 1166
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1137,
                        "end": 1166
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1170,
                            "end": 1181
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voter",
                                "loc": {
                                    "start": 1182,
                                    "end": 1187
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
                                            "start": 1189,
                                            "end": 1191
                                        }
                                    },
                                    "loc": {
                                        "start": 1189,
                                        "end": 1191
                                    }
                                },
                                "loc": {
                                    "start": 1189,
                                    "end": 1192
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1182,
                                "end": 1192
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1195,
                                "end": 1206
                            }
                        },
                        "loc": {
                            "start": 1195,
                            "end": 1206
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1170,
                        "end": 1206
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1210,
                            "end": 1222
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "voters",
                                "loc": {
                                    "start": 1223,
                                    "end": 1229
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
                                                "start": 1232,
                                                "end": 1234
                                            }
                                        },
                                        "loc": {
                                            "start": 1232,
                                            "end": 1234
                                        }
                                    },
                                    "loc": {
                                        "start": 1232,
                                        "end": 1235
                                    }
                                },
                                "loc": {
                                    "start": 1231,
                                    "end": 1236
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1223,
                                "end": 1236
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
                                    "start": 1240,
                                    "end": 1251
                                }
                            },
                            "loc": {
                                "start": 1240,
                                "end": 1251
                            }
                        },
                        "loc": {
                            "start": 1239,
                            "end": 1252
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1210,
                        "end": 1252
                    }
                }
            ],
            "loc": {
                "start": 842,
                "end": 1255
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Vote",
                "loc": {
                    "start": 1264,
                    "end": 1268
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
                            "start": 1274,
                            "end": 1279
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
                                    "start": 1281,
                                    "end": 1286
                                }
                            },
                            "loc": {
                                "start": 1281,
                                "end": 1286
                            }
                        },
                        "loc": {
                            "start": 1281,
                            "end": 1287
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1274,
                        "end": 1287
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "power",
                        "loc": {
                            "start": 1291,
                            "end": 1296
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
                                    "start": 1298,
                                    "end": 1304
                                }
                            },
                            "loc": {
                                "start": 1298,
                                "end": 1304
                            }
                        },
                        "loc": {
                            "start": 1298,
                            "end": 1305
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1291,
                        "end": 1305
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "proposal",
                        "loc": {
                            "start": 1309,
                            "end": 1317
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
                                    "start": 1319,
                                    "end": 1327
                                }
                            },
                            "loc": {
                                "start": 1319,
                                "end": 1327
                            }
                        },
                        "loc": {
                            "start": 1319,
                            "end": 1328
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1309,
                        "end": 1328
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "castBallot",
                        "loc": {
                            "start": 1332,
                            "end": 1342
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Ballot",
                            "loc": {
                                "start": 1344,
                                "end": 1350
                            }
                        },
                        "loc": {
                            "start": 1344,
                            "end": 1350
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1332,
                        "end": 1350
                    }
                }
            ],
            "loc": {
                "start": 1259,
                "end": 1353
            }
        },
        {
            "kind": "EnumTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Ballot",
                "loc": {
                    "start": 1362,
                    "end": 1368
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
                            "start": 1374,
                            "end": 1377
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1374,
                        "end": 1377
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "No",
                        "loc": {
                            "start": 1381,
                            "end": 1383
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1381,
                        "end": 1383
                    }
                },
                {
                    "kind": "EnumValueDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "Abstain",
                        "loc": {
                            "start": 1387,
                            "end": 1394
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1387,
                        "end": 1394
                    }
                }
            ],
            "loc": {
                "start": 1357,
                "end": 1397
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "VotingPower",
                "loc": {
                    "start": 1406,
                    "end": 1417
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
                            "start": 1423,
                            "end": 1434
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
                                    "start": 1436,
                                    "end": 1439
                                }
                            },
                            "loc": {
                                "start": 1436,
                                "end": 1439
                            }
                        },
                        "loc": {
                            "start": 1436,
                            "end": 1440
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1423,
                        "end": 1440
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1444,
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
                                "value": "String",
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
                        "loc": {
                            "start": 1451,
                            "end": 1458
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1444,
                        "end": 1458
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "voter",
                        "loc": {
                            "start": 1462,
                            "end": 1467
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
                                    "start": 1469,
                                    "end": 1474
                                }
                            },
                            "loc": {
                                "start": 1469,
                                "end": 1474
                            }
                        },
                        "loc": {
                            "start": 1469,
                            "end": 1475
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1462,
                        "end": 1475
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1479,
                            "end": 1491
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
                                            "start": 1494,
                                            "end": 1505
                                        }
                                    },
                                    "loc": {
                                        "start": 1494,
                                        "end": 1505
                                    }
                                },
                                "loc": {
                                    "start": 1494,
                                    "end": 1506
                                }
                            },
                            "loc": {
                                "start": 1493,
                                "end": 1507
                            }
                        },
                        "loc": {
                            "start": 1493,
                            "end": 1508
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1479,
                        "end": 1508
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "isStale",
                        "loc": {
                            "start": 1512,
                            "end": 1519
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Boolean",
                            "loc": {
                                "start": 1521,
                                "end": 1528
                            }
                        },
                        "loc": {
                            "start": 1521,
                            "end": 1528
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1512,
                        "end": 1528
                    }
                }
            ],
            "loc": {
                "start": 1401,
                "end": 1531
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "TotalVotingPower",
                "loc": {
                    "start": 1540,
                    "end": 1556
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
                            "start": 1562,
                            "end": 1573
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
                                    "start": 1575,
                                    "end": 1578
                                }
                            },
                            "loc": {
                                "start": 1575,
                                "end": 1578
                            }
                        },
                        "loc": {
                            "start": 1575,
                            "end": 1579
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1562,
                        "end": 1579
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "value",
                        "loc": {
                            "start": 1583,
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
                                "value": "String",
                                "loc": {
                                    "start": 1590,
                                    "end": 1596
                                }
                            },
                            "loc": {
                                "start": 1590,
                                "end": 1596
                            }
                        },
                        "loc": {
                            "start": 1590,
                            "end": 1597
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1583,
                        "end": 1597
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingVaults",
                        "loc": {
                            "start": 1601,
                            "end": 1613
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
                                            "start": 1616,
                                            "end": 1627
                                        }
                                    },
                                    "loc": {
                                        "start": 1616,
                                        "end": 1627
                                    }
                                },
                                "loc": {
                                    "start": 1616,
                                    "end": 1628
                                }
                            },
                            "loc": {
                                "start": 1615,
                                "end": 1629
                            }
                        },
                        "loc": {
                            "start": 1615,
                            "end": 1630
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1601,
                        "end": 1630
                    }
                }
            ],
            "loc": {
                "start": 1535,
                "end": 1633
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Voter",
                "loc": {
                    "start": 1642,
                    "end": 1647
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
                            "start": 1653,
                            "end": 1660
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
                                    "start": 1662,
                                    "end": 1664
                                }
                            },
                            "loc": {
                                "start": 1662,
                                "end": 1664
                            }
                        },
                        "loc": {
                            "start": 1662,
                            "end": 1665
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1653,
                        "end": 1665
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "vote",
                        "loc": {
                            "start": 1669,
                            "end": 1673
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposal",
                                "loc": {
                                    "start": 1674,
                                    "end": 1682
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
                                            "start": 1684,
                                            "end": 1686
                                        }
                                    },
                                    "loc": {
                                        "start": 1684,
                                        "end": 1686
                                    }
                                },
                                "loc": {
                                    "start": 1684,
                                    "end": 1687
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1674,
                                "end": 1687
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 1689,
                                    "end": 1703
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
                                            "start": 1705,
                                            "end": 1707
                                        }
                                    },
                                    "loc": {
                                        "start": 1705,
                                        "end": 1707
                                    }
                                },
                                "loc": {
                                    "start": 1705,
                                    "end": 1708
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1689,
                                "end": 1708
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Vote",
                            "loc": {
                                "start": 1711,
                                "end": 1715
                            }
                        },
                        "loc": {
                            "start": 1711,
                            "end": 1715
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1669,
                        "end": 1715
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votes",
                        "loc": {
                            "start": 1719,
                            "end": 1724
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "proposals",
                                "loc": {
                                    "start": 1725,
                                    "end": 1734
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
                                                    "start": 1737,
                                                    "end": 1739
                                                }
                                            },
                                            "loc": {
                                                "start": 1737,
                                                "end": 1739
                                            }
                                        },
                                        "loc": {
                                            "start": 1737,
                                            "end": 1740
                                        }
                                    },
                                    "loc": {
                                        "start": 1736,
                                        "end": 1741
                                    }
                                },
                                "loc": {
                                    "start": 1736,
                                    "end": 1742
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1725,
                                "end": 1742
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingContract",
                                "loc": {
                                    "start": 1744,
                                    "end": 1758
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
                                            "start": 1760,
                                            "end": 1762
                                        }
                                    },
                                    "loc": {
                                        "start": 1760,
                                        "end": 1762
                                    }
                                },
                                "loc": {
                                    "start": 1760,
                                    "end": 1763
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1744,
                                "end": 1763
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
                                    "start": 1767,
                                    "end": 1771
                                }
                            },
                            "loc": {
                                "start": 1767,
                                "end": 1771
                            }
                        },
                        "loc": {
                            "start": 1766,
                            "end": 1772
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1719,
                        "end": 1772
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPower",
                        "loc": {
                            "start": 1776,
                            "end": 1787
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVault",
                                "loc": {
                                    "start": 1788,
                                    "end": 1799
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
                                            "start": 1801,
                                            "end": 1803
                                        }
                                    },
                                    "loc": {
                                        "start": 1801,
                                        "end": 1803
                                    }
                                },
                                "loc": {
                                    "start": 1801,
                                    "end": 1804
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1788,
                                "end": 1804
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 1806,
                                    "end": 1817
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1819,
                                        "end": 1822
                                    }
                                },
                                "loc": {
                                    "start": 1819,
                                    "end": 1822
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1806,
                                "end": 1822
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "VotingPower",
                            "loc": {
                                "start": 1825,
                                "end": 1836
                            }
                        },
                        "loc": {
                            "start": 1825,
                            "end": 1836
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1776,
                        "end": 1836
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "votingPowers",
                        "loc": {
                            "start": 1840,
                            "end": 1852
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "votingVaults",
                                "loc": {
                                    "start": 1853,
                                    "end": 1865
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
                                                    "start": 1868,
                                                    "end": 1870
                                                }
                                            },
                                            "loc": {
                                                "start": 1868,
                                                "end": 1870
                                            }
                                        },
                                        "loc": {
                                            "start": 1868,
                                            "end": 1871
                                        }
                                    },
                                    "loc": {
                                        "start": 1867,
                                        "end": 1872
                                    }
                                },
                                "loc": {
                                    "start": 1867,
                                    "end": 1873
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1853,
                                "end": 1873
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "blockNumber",
                                "loc": {
                                    "start": 1875,
                                    "end": 1886
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1888,
                                        "end": 1891
                                    }
                                },
                                "loc": {
                                    "start": 1888,
                                    "end": 1891
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1875,
                                "end": 1891
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
                                    "start": 1895,
                                    "end": 1906
                                }
                            },
                            "loc": {
                                "start": 1895,
                                "end": 1906
                            }
                        },
                        "loc": {
                            "start": 1894,
                            "end": 1907
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1840,
                        "end": 1907
                    }
                }
            ],
            "loc": {
                "start": 1637,
                "end": 1910
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 1910
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
