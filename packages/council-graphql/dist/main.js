var $1RIJT$graphqltoolsschema = require("@graphql-tools/schema");
var $1RIJT$elementficounciltypechain = require("@elementfi/council-typechain");
var $1RIJT$elementficounciltokenlist = require("@elementfi/council-tokenlist");
var $1RIJT$apolloclient = require("@apollo/client");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {
    get: v,
    set: s,
    enumerable: true,
    configurable: true,
  });
}
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function (key) {
    if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      },
    });
  });

  return dest;
}

$parcel$export(
  module.exports,
  "councilSchema",
  () => $efcd12aae16f0d3a$export$824f3a4901d93da0,
);

var $430a85f9dbbc5964$exports = {};
$430a85f9dbbc5964$exports = {
  kind: "Document",
  definitions: [
    {
      kind: "ObjectTypeDefinition",
      description: {
        kind: "StringValue",
        value:
          "CoreVoting \n- holds the proposals\n- allows you to create a proposal\n- maintains a whitelist of approved voting vaults\n- Has events for seeing the list of votes (voting power + ballot) that have been cast)\n- has vote(votingVaults[], proposalId) method\n\nGSCVoting \n- holds the proposals that gsc votes on\n- allows you to create a proposal\n- has a single approved voting vault, aka LockingVault\n- Has events for seeing the list of votes (voting power + ballot) that have been cast)\n- has vote(votingVaults[], proposalId) method\n\n\nVotingVault\n(ie: LockingVault, VestingVault)\n- allows you to deposit your ELFI token, giving you voting power in the vault\n- can define the behavior for calculating how much voting power the depositer into the vault receives\n    - eg, LockingVault defines delegation capabilities, where 1 ELFI = 1 Vote power\n    - eg, VestingVault defines delegation too, but 1 ELFI = 0.25 VP",
        block: true,
        loc: {
          start: 1,
          end: 938,
        },
      },
      name: {
        kind: "Name",
        value: "Query",
        loc: {
          start: 944,
          end: 949,
        },
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "ping",
            loc: {
              start: 954,
              end: 958,
            },
          },
          arguments: [],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "String",
              loc: {
                start: 960,
                end: 966,
              },
            },
            loc: {
              start: 960,
              end: 966,
            },
          },
          directives: [],
          loc: {
            start: 954,
            end: 966,
          },
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "coreVoting",
            loc: {
              start: 969,
              end: 979,
            },
          },
          arguments: [],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "VotingContract",
              loc: {
                start: 981,
                end: 995,
              },
            },
            loc: {
              start: 981,
              end: 995,
            },
          },
          directives: [],
          loc: {
            start: 969,
            end: 995,
          },
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "gscVoting",
            loc: {
              start: 998,
              end: 1007,
            },
          },
          arguments: [],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "VotingContract",
              loc: {
                start: 1009,
                end: 1023,
              },
            },
            loc: {
              start: 1009,
              end: 1023,
            },
          },
          directives: [],
          loc: {
            start: 998,
            end: 1023,
          },
        },
      ],
      loc: {
        start: 1,
        end: 1025,
      },
    },
    {
      kind: "ObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "VotingContract",
        loc: {
          start: 1032,
          end: 1046,
        },
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "address",
            loc: {
              start: 1051,
              end: 1058,
            },
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "ID",
                loc: {
                  start: 1060,
                  end: 1062,
                },
              },
              loc: {
                start: 1060,
                end: 1062,
              },
            },
            loc: {
              start: 1060,
              end: 1063,
            },
          },
          directives: [],
          loc: {
            start: 1051,
            end: 1063,
          },
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "proposals",
            loc: {
              start: 1066,
              end: 1075,
            },
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "filter",
                loc: {
                  start: 1076,
                  end: 1082,
                },
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "ProposalFilters",
                  loc: {
                    start: 1084,
                    end: 1099,
                  },
                },
                loc: {
                  start: 1084,
                  end: 1099,
                },
              },
              directives: [],
              loc: {
                start: 1076,
                end: 1099,
              },
            },
          ],
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Proposal",
                loc: {
                  start: 1103,
                  end: 1111,
                },
              },
              loc: {
                start: 1103,
                end: 1111,
              },
            },
            loc: {
              start: 1102,
              end: 1112,
            },
          },
          directives: [],
          loc: {
            start: 1066,
            end: 1112,
          },
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "proposals",
            loc: {
              start: 1115,
              end: 1124,
            },
          },
          arguments: [],
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Proposal",
                loc: {
                  start: 1127,
                  end: 1135,
                },
              },
              loc: {
                start: 1127,
                end: 1135,
              },
            },
            loc: {
              start: 1126,
              end: 1136,
            },
          },
          directives: [],
          loc: {
            start: 1115,
            end: 1136,
          },
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "verifiedProposals",
            loc: {
              start: 1139,
              end: 1156,
            },
          },
          arguments: [],
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "Proposal",
                loc: {
                  start: 1159,
                  end: 1167,
                },
              },
              loc: {
                start: 1159,
                end: 1167,
              },
            },
            loc: {
              start: 1158,
              end: 1168,
            },
          },
          directives: [],
          loc: {
            start: 1139,
            end: 1168,
          },
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "votingVaults",
            loc: {
              start: 1171,
              end: 1183,
            },
          },
          arguments: [],
          type: {
            kind: "ListType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "VotingVault",
                loc: {
                  start: 1186,
                  end: 1197,
                },
              },
              loc: {
                start: 1186,
                end: 1197,
              },
            },
            loc: {
              start: 1185,
              end: 1198,
            },
          },
          directives: [],
          loc: {
            start: 1171,
            end: 1198,
          },
        },
      ],
      loc: {
        start: 1027,
        end: 1200,
      },
    },
    {
      kind: "InputObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "ProposalFilters",
        loc: {
          start: 1208,
          end: 1223,
        },
      },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          name: {
            kind: "Name",
            value: "verified",
            loc: {
              start: 1228,
              end: 1236,
            },
          },
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Boolean",
              loc: {
                start: 1238,
                end: 1245,
              },
            },
            loc: {
              start: 1238,
              end: 1245,
            },
          },
          directives: [],
          loc: {
            start: 1228,
            end: 1245,
          },
        },
      ],
      loc: {
        start: 1202,
        end: 1247,
      },
    },
    {
      kind: "ObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "Proposal",
        loc: {
          start: 1254,
          end: 1262,
        },
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "id",
            loc: {
              start: 1267,
              end: 1269,
            },
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "ID",
                loc: {
                  start: 1271,
                  end: 1273,
                },
              },
              loc: {
                start: 1271,
                end: 1273,
              },
            },
            loc: {
              start: 1271,
              end: 1274,
            },
          },
          directives: [],
          loc: {
            start: 1267,
            end: 1274,
          },
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "votingContract",
            loc: {
              start: 1277,
              end: 1291,
            },
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "ID",
                loc: {
                  start: 1293,
                  end: 1295,
                },
              },
              loc: {
                start: 1293,
                end: 1295,
              },
            },
            loc: {
              start: 1293,
              end: 1296,
            },
          },
          directives: [],
          loc: {
            start: 1277,
            end: 1296,
          },
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "verified",
            loc: {
              start: 1299,
              end: 1307,
            },
          },
          arguments: [],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Boolean",
              loc: {
                start: 1309,
                end: 1316,
              },
            },
            loc: {
              start: 1309,
              end: 1316,
            },
          },
          directives: [],
          loc: {
            start: 1299,
            end: 1316,
          },
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "title",
            loc: {
              start: 1319,
              end: 1324,
            },
          },
          arguments: [],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "String",
              loc: {
                start: 1326,
                end: 1332,
              },
            },
            loc: {
              start: 1326,
              end: 1332,
            },
          },
          directives: [],
          loc: {
            start: 1319,
            end: 1332,
          },
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "description",
            loc: {
              start: 1335,
              end: 1346,
            },
          },
          arguments: [],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "String",
              loc: {
                start: 1348,
                end: 1354,
              },
            },
            loc: {
              start: 1348,
              end: 1354,
            },
          },
          directives: [],
          loc: {
            start: 1335,
            end: 1354,
          },
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "quorum",
            loc: {
              start: 1357,
              end: 1363,
            },
          },
          arguments: [],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "String",
              loc: {
                start: 1365,
                end: 1371,
              },
            },
            loc: {
              start: 1365,
              end: 1371,
            },
          },
          directives: [],
          loc: {
            start: 1357,
            end: 1371,
          },
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "vote",
            loc: {
              start: 1374,
              end: 1378,
            },
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "voter",
                loc: {
                  start: 1379,
                  end: 1384,
                },
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "ID",
                    loc: {
                      start: 1386,
                      end: 1388,
                    },
                  },
                  loc: {
                    start: 1386,
                    end: 1388,
                  },
                },
                loc: {
                  start: 1386,
                  end: 1389,
                },
              },
              directives: [],
              loc: {
                start: 1379,
                end: 1389,
              },
            },
          ],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Vote",
              loc: {
                start: 1392,
                end: 1396,
              },
            },
            loc: {
              start: 1392,
              end: 1396,
            },
          },
          directives: [],
          loc: {
            start: 1374,
            end: 1396,
          },
        },
      ],
      loc: {
        start: 1249,
        end: 1398,
      },
    },
    {
      kind: "ObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "Vote",
        loc: {
          start: 1405,
          end: 1409,
        },
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "votingPower",
            loc: {
              start: 1414,
              end: 1425,
            },
          },
          arguments: [],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "String",
              loc: {
                start: 1427,
                end: 1433,
              },
            },
            loc: {
              start: 1427,
              end: 1433,
            },
          },
          directives: [],
          loc: {
            start: 1414,
            end: 1433,
          },
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "castBallot",
            loc: {
              start: 1436,
              end: 1446,
            },
          },
          arguments: [],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "Ballot",
              loc: {
                start: 1448,
                end: 1454,
              },
            },
            loc: {
              start: 1448,
              end: 1454,
            },
          },
          directives: [],
          loc: {
            start: 1436,
            end: 1454,
          },
        },
      ],
      loc: {
        start: 1400,
        end: 1456,
      },
    },
    {
      kind: "ObjectTypeDefinition",
      name: {
        kind: "Name",
        value: "VotingVault",
        loc: {
          start: 1463,
          end: 1474,
        },
      },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "address",
            loc: {
              start: 1479,
              end: 1486,
            },
          },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: {
                kind: "Name",
                value: "ID",
                loc: {
                  start: 1488,
                  end: 1490,
                },
              },
              loc: {
                start: 1488,
                end: 1490,
              },
            },
            loc: {
              start: 1488,
              end: 1491,
            },
          },
          directives: [],
          loc: {
            start: 1479,
            end: 1491,
          },
        },
        {
          kind: "FieldDefinition",
          name: {
            kind: "Name",
            value: "votePower",
            loc: {
              start: 1494,
              end: 1503,
            },
          },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "voter",
                loc: {
                  start: 1504,
                  end: 1509,
                },
              },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: {
                    kind: "Name",
                    value: "ID",
                    loc: {
                      start: 1511,
                      end: 1513,
                    },
                  },
                  loc: {
                    start: 1511,
                    end: 1513,
                  },
                },
                loc: {
                  start: 1511,
                  end: 1514,
                },
              },
              directives: [],
              loc: {
                start: 1504,
                end: 1514,
              },
            },
            {
              kind: "InputValueDefinition",
              name: {
                kind: "Name",
                value: "blockNumber",
                loc: {
                  start: 1516,
                  end: 1527,
                },
              },
              type: {
                kind: "NamedType",
                name: {
                  kind: "Name",
                  value: "Int",
                  loc: {
                    start: 1529,
                    end: 1532,
                  },
                },
                loc: {
                  start: 1529,
                  end: 1532,
                },
              },
              directives: [],
              loc: {
                start: 1516,
                end: 1532,
              },
            },
          ],
          type: {
            kind: "NamedType",
            name: {
              kind: "Name",
              value: "String",
              loc: {
                start: 1535,
                end: 1541,
              },
            },
            loc: {
              start: 1535,
              end: 1541,
            },
          },
          directives: [],
          loc: {
            start: 1494,
            end: 1541,
          },
        },
      ],
      loc: {
        start: 1458,
        end: 1543,
      },
    },
    {
      kind: "EnumTypeDefinition",
      name: {
        kind: "Name",
        value: "Ballot",
        loc: {
          start: 1550,
          end: 1556,
        },
      },
      directives: [],
      values: [
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "Yes",
            loc: {
              start: 1561,
              end: 1564,
            },
          },
          directives: [],
          loc: {
            start: 1561,
            end: 1564,
          },
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "No",
            loc: {
              start: 1568,
              end: 1570,
            },
          },
          directives: [],
          loc: {
            start: 1568,
            end: 1570,
          },
        },
        {
          kind: "EnumValueDefinition",
          name: {
            kind: "Name",
            value: "Abstain",
            loc: {
              start: 1574,
              end: 1581,
            },
          },
          directives: [],
          loc: {
            start: 1574,
            end: 1581,
          },
        },
      ],
      loc: {
        start: 1545,
        end: 1584,
      },
    },
  ],
  loc: {
    start: 0,
    end: 1584,
  },
};

const $8ba502acb3446aa3$export$a8fd08e8b7cfacd3 = {
  ...(0, $1RIJT$elementficounciltokenlist.mainnetAddressList),
  chainId: 31337,
};
const $8ba502acb3446aa3$export$578de1f6b0e6a3e9 = {
  chainId: 31337,
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
    spender: "0x0B306BF915C4d645ff596e518fAf3F9669b97016",
  },
};
const $8ba502acb3446aa3$export$c9b69c213f456a9c = {
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
    spender: "0x0000000000000000000000000000000000000000",
  },
  chainId: 31337,
};
const $8ba502acb3446aa3$var$ALL_ADDRESSES = [
  $8ba502acb3446aa3$export$578de1f6b0e6a3e9,
  $8ba502acb3446aa3$export$c9b69c213f456a9c,
  (0, $1RIJT$elementficounciltokenlist.goerliAddressList),
  (0, $1RIJT$elementficounciltokenlist.mainnetAddressList),
  $8ba502acb3446aa3$export$a8fd08e8b7cfacd3,
];
function $8ba502acb3446aa3$export$735f3e625be6eff7(chainId) {
  return (
    $8ba502acb3446aa3$var$ALL_ADDRESSES.find((addressList) => {
      return addressList.chainId === chainId;
    }) || $8ba502acb3446aa3$export$578de1f6b0e6a3e9
  );
}

const $ccc85676594c37d4$var$MAINNET_FROM_BLOCK = 14496292;
const $ccc85676594c37d4$export$f62412552be5daf2 = {
  Query: {
    // TODO: Remove once codegen operation bug fix has landed
    ping: () => {
      return "pong";
    },
    coreVoting: async (_, __, { provider: provider }) => {
      const { chainId: chainId } = await provider.getNetwork();
      return {
        address: (0, $8ba502acb3446aa3$export$735f3e625be6eff7)(chainId)
          .addresses.coreVoting,
      };
    },
  },
  VotingContract: {
    proposals: async ({ address: address }, _, { provider: provider }) => {
      const coreVotingContract = (0,
      $1RIJT$elementficounciltypechain.CoreVoting__factory).connect(
        address,
        provider,
      );
      const proposalCreatedEvents = await coreVotingContract.queryFilter(
        coreVotingContract.filters.ProposalCreated(),
        $ccc85676594c37d4$var$MAINNET_FROM_BLOCK,
      );
      const { chainId: chainId } = await provider.getNetwork();
      const proposalsUrl = $ccc85676594c37d4$var$getProposalsJsonUrl(chainId);
      const res = await fetch(proposalsUrl);
      const { proposals: coreProposals } = await res.json();
      // proposals with a snapshot id are considered verified, as they have been
      // synced up with their off-chain snapshot proposal.
      // const verifiedProposals = proposalsJson.proposals.filter(({snapshotId}) => !!snapshotId);
      return proposalCreatedEvents.map((event) => {
        const id = event.args.proposalId.toString();
        const proposalInfo = coreProposals.find(
          ({ proposalId: proposalId, snapshotId: snapshotId }) =>
            proposalId === id,
        );
        return {
          id: id,
          votingContract: address,
          verified: !!proposalInfo?.snapshotId,
          title: proposalInfo?.title,
          description: proposalInfo?.description,
          quorum: proposalInfo?.quorum,
        };
      });
    },
  },
  Proposal: {
    vote: async (
      { id: id, votingContract: votingContractAddress },
      { voter: voter },
      { provider: provider },
    ) => {
      const coreVotingContract = (0,
      $1RIJT$elementficounciltypechain.CoreVoting__factory).connect(
        votingContractAddress,
        provider,
      );
      const votes = await coreVotingContract.functions.votes(voter, id);
      // TODO: Make custom scalar for Ballot
      const castBallot = ["Yes", "No", "Abstain"][votes.castBallot];
      return {
        votingPower: votes.votingPower.toString(),
        castBallot: castBallot,
      };
    },
  },
};
function $ccc85676594c37d4$var$getProposalsJsonUrl(chainId) {
  if (chainId === 1)
    return "https://elementfi.s3.us-east-2.amazonaws.com/mainnet.proposals.json";
  if (chainId === 5)
    return "https://elementfi.s3.us-east-2.amazonaws.com/goerli.proposals.json";
  // default to local
  return "https://elementfi.s3.us-east-2.amazonaws.com/testnet.proposals.json";
}
function $ccc85676594c37d4$var$getGscProposalsJsonUrl(chainId) {
  if (chainId === 1)
    return "https://elementfi.s3.us-east-2.amazonaws.com/mainnet-gsc.proposals.json";
  if (chainId === 5)
    return "https://elementfi.s3.us-east-2.amazonaws.com/goerli-gsc.proposals.json";
  if (chainId === 31337)
    return "https://elementfi.s3.us-east-2.amazonaws.com/testnet-gsc.proposals.json";
}

var $c3b13ec6d9e5ad30$exports = {};

$parcel$export(
  $c3b13ec6d9e5ad30$exports,
  "Ballot",
  () => $c3b13ec6d9e5ad30$export$7d641b7d097c9cd3,
);
$parcel$export(
  $c3b13ec6d9e5ad30$exports,
  "PingDocument",
  () => $c3b13ec6d9e5ad30$export$6e5c33bc8cfb17e4,
);
$parcel$export(
  $c3b13ec6d9e5ad30$exports,
  "usePingQuery",
  () => $c3b13ec6d9e5ad30$export$23ea5063d89f4830,
);
$parcel$export(
  $c3b13ec6d9e5ad30$exports,
  "usePingLazyQuery",
  () => $c3b13ec6d9e5ad30$export$7af002eb033d1cc4,
);

const $c3b13ec6d9e5ad30$var$defaultOptions = {};
let $c3b13ec6d9e5ad30$export$7d641b7d097c9cd3;
(function (Ballot1) {
  Ballot1["Abstain"] = "Abstain";
  Ballot1["No"] = "No";
  Ballot1["Yes"] = "Yes";
})(
  $c3b13ec6d9e5ad30$export$7d641b7d097c9cd3 ||
    ($c3b13ec6d9e5ad30$export$7d641b7d097c9cd3 = {}),
);
const $c3b13ec6d9e5ad30$export$6e5c33bc8cfb17e4 = (0, $1RIJT$apolloclient.gql)`
    query Ping {
  ping
}
    `;
function $c3b13ec6d9e5ad30$export$23ea5063d89f4830(baseOptions) {
  const options = {
    ...$c3b13ec6d9e5ad30$var$defaultOptions,
    ...baseOptions,
  };
  return $1RIJT$apolloclient.useQuery(
    $c3b13ec6d9e5ad30$export$6e5c33bc8cfb17e4,
    options,
  );
}
function $c3b13ec6d9e5ad30$export$7af002eb033d1cc4(baseOptions) {
  const options = {
    ...$c3b13ec6d9e5ad30$var$defaultOptions,
    ...baseOptions,
  };
  return $1RIJT$apolloclient.useLazyQuery(
    $c3b13ec6d9e5ad30$export$6e5c33bc8cfb17e4,
    options,
  );
}

const $efcd12aae16f0d3a$export$824f3a4901d93da0 = (0,
$1RIJT$graphqltoolsschema.makeExecutableSchema)({
  resolvers: $ccc85676594c37d4$export$f62412552be5daf2,
  typeDefs: /*@__PURE__*/ $parcel$interopDefault($430a85f9dbbc5964$exports),
});
$parcel$exportWildcard(module.exports, $c3b13ec6d9e5ad30$exports);

//# sourceMappingURL=main.js.map
