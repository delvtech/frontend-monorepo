var $bsQ4Z$graphqltoolsschema = require("@graphql-tools/schema");
var $bsQ4Z$elementficorev2typechain = require("@elementfi/core-v2-typechain");

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

$parcel$export(module.exports, "coreV2Schema", () => $3ef651e6b17f096e$export$3868f2000fd533a8);
$parcel$export(module.exports, "coreV2Graph", () => $3ef651e6b17f096e$export$dd1b4b4cbb12ce96);

const $faf0db6f914270f5$export$530034ea2b4bf5ac = {};


const $118176bb7ca601d4$export$50895256536951e0 = {
    getByAddress: $118176bb7ca601d4$var$getByAddress,
    getByYieldSource: $118176bb7ca601d4$var$getByYieldSource
};
function $118176bb7ca601d4$var$getByAddress({ address: address , context: context  }) {
    // TODO: look up multipool by yield source name
    return {
        address: address
    };
}
function $118176bb7ca601d4$var$getByYieldSource({ yieldSource: yieldSource , context: context  }) {
    // TODO: look up multipool by yield source name
    return {
        address: "0x1",
        yieldSource: yieldSource
    };
}


const $1e8b6571e3c1fada$export$1258c78d6c9cdc59 = {
    getByAddress: $1e8b6571e3c1fada$var$getByAddress,
    getByYieldSource: $1e8b6571e3c1fada$var$getByYieldSource
};
function $1e8b6571e3c1fada$var$getByAddress({ address: address , context: context  }) {
    return {
        address: address
    };
}
function $1e8b6571e3c1fada$var$getByYieldSource({ yieldSource: yieldSource , context: context  }) {
    // TODO: look up multiterm by yield source name using registry
    return {
        address: "0x1",
        yieldSource: yieldSource
    };
}


const $bae65773bc81c4c1$export$f366f8b4fb2be7f6 = {
    getByMaturity: $bae65773bc81c4c1$var$getByMaturity
};
function $bae65773bc81c4c1$var$getByMaturity({ maturity: maturity , multiPool: multiPool , context: context  }) {
    // TODO: look up pool by yield source name and maturity
    return {
        id: "1",
        multiPool: multiPool,
        maturity: maturity
    };
}


const $ddec97213318bb70$export$6ff2d7cdf1b149b9 = {};


const $3fad2c4789785209$export$77698987835df05a = {};


const $38d41d43985fa869$export$b2d94e055b626cdb = {
    getByMaturity: $38d41d43985fa869$var$getByMaturity
};
function $38d41d43985fa869$var$getByMaturity({ maturity: maturity , multiTerm: multiTerm , context: context  }) {
    // TODO: look up term by multiterm and maturity
    return {
        id: "1",
        multiTerm: multiTerm,
        name: "Term 1",
        maturity: maturity
    };
}



const $a1ee3c0593e6c8c6$export$b59f4b18f328714d = {
    getByAddress: $a1ee3c0593e6c8c6$var$getByAddress
};
async function $a1ee3c0593e6c8c6$var$getByAddress({ address: address , context: context  }) {
    const tokenContract = (0, $bsQ4Z$elementficorev2typechain.ERC20__factory).connect(address, context.provider);
    return {
        address: await tokenContract.address,
        decimals: await tokenContract.decimals(),
        symbol: await tokenContract.symbol()
    };
}


const $11576f0276a31fe5$export$3a21e954cf88d444 = {
    getByName: $11576f0276a31fe5$var$getByName,
    getByNames: $11576f0276a31fe5$var$getByNames
};
function $11576f0276a31fe5$var$getByName({ name: name , context: context  }) {
    // TODO: look up yield source by name (possibly from registry)
    return {
        name: name,
        protocol: "yearn",
        address: "0x0000000000000000000000000"
    };
}
function $11576f0276a31fe5$var$getByNames({ names: names , context: context  }) {
    // TODO: look up yield source by name (possibly from registry)
    return names.map((name)=>{
        return {
            name: name,
            protocol: "yearn",
            address: '"0xd1eda2c4213d9c63a6f48ee5fdb23b7991ad90a9"'
        };
    });
}


const $69eca4bd3b4c2d69$export$7614f58b1c85b18b = {};




const $e3560cee69deb57e$export$f62412552be5daf2 = {
    Query: {
        multiTerm: (_, { address: address , yieldSource: yieldSourceName  }, context)=>{
            let multiTerm = null;
            if (address) multiTerm = (0, $1e8b6571e3c1fada$export$1258c78d6c9cdc59).getByAddress({
                address: address,
                context: context
            });
            else if (yieldSourceName) {
                const yieldSource = (0, $11576f0276a31fe5$export$3a21e954cf88d444).getByName({
                    name: yieldSourceName,
                    context: context
                });
                multiTerm = (0, $1e8b6571e3c1fada$export$1258c78d6c9cdc59).getByYieldSource({
                    yieldSource: yieldSource,
                    context: context
                });
            }
            return multiTerm || null;
        },
        term: (_, { multiTerm: multiTermAddress , maturity: maturity  }, context)=>{
            const multiTerm = (0, $1e8b6571e3c1fada$export$1258c78d6c9cdc59).getByAddress({
                address: multiTermAddress,
                context: context
            });
            const term = (0, $38d41d43985fa869$export$b2d94e055b626cdb).getByMaturity({
                maturity: maturity,
                multiTerm: multiTerm,
                context: context
            });
            return term || null;
        },
        // terms: (_, { yieldSource: yieldSourceName }, context) => {
        // },
        multiPool: (_, { yieldSource: yieldSourceName  }, context)=>{
            const yieldSource = (0, $11576f0276a31fe5$export$3a21e954cf88d444).getByName({
                name: yieldSourceName,
                context: context
            });
            const multiPool = (0, $118176bb7ca601d4$export$50895256536951e0).getByYieldSource({
                yieldSource: yieldSource,
                context: context
            });
            return multiPool || null;
        },
        pool: (_, { multiPool: multiPoolAddress , maturity: maturity  }, context)=>{
            const multiPool = (0, $118176bb7ca601d4$export$50895256536951e0).getByAddress({
                address: multiPoolAddress,
                context: context
            });
            const pool = (0, $bae65773bc81c4c1$export$f366f8b4fb2be7f6).getByMaturity({
                maturity: maturity,
                multiPool: multiPool,
                context: context
            });
            return pool || null;
        },
        token: async (_, { address: address  }, context)=>{
            return await (0, $a1ee3c0593e6c8c6$export$b59f4b18f328714d).getByAddress({
                address: address,
                context: context
            });
        }
    },
    // MultiTerm: {
    //   baseAsset: (multiTerm, _, context) => {
    //   },
    //   terms: (multiTerm, _, context) => {
    //   },
    //   tvl: (multiTerm, { atBlock }, context) => {
    //   },
    //   totalVolume: (multiTerm, _, context) => {
    //   },
    //   perDayVolume: (multiTerm, _, context) => {
    //   },
    //   yields: (multiTerm, _, context) => {
    //   },
    // },
    // Term: {
    //   baseAsset: (multiTerm, _, context) => {
    //   },
    //   principalToken: (multiTerm, _, context) => {
    //   },
    //   yieldToken: (multiTerm, { startDate }, context) => {
    //   },
    //   pool: (multiTerm, _, context) => {
    //   },
    //   tvl: (multiTerm, _, context) => {
    //   },
    //   createdTimestamp: (multiTerm, _, context) => {
    //   },
    //   createdAtBlock: (multiTerm, _, context) => {
    //   },
    // },
    // YieldToken: {
    //   accruedInterest: (yieldToken, _, context) => {
    //   }
    // },
    // PrincipalToken: {
    //   price: (principalToken, _, context) => {
    //   },
    //   priceFiat: (principalToken, _, context) => {
    //   },
    //   baseAsset: (principalToken, _, context) => {
    //   }
    // },
    Token: {
        price: async (token, _, context)=>{
            return "";
        }
    }
};


function $ec94378a7e3179cb$export$54fae1269cb9a9e0({ chainId: chainId , provider: provider  }) {
    return {
        chainId: chainId,
        provider: provider,
        elementDataSources: {}
    };
}


var $829ad87c37a8c45d$exports = {};
$829ad87c37a8c45d$exports = {
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
                    "description": {
                        "kind": "StringValue",
                        "value": "Look up the multi term contract for a given yield source, eg: Yearn USDC Vault",
                        "block": false,
                        "loc": {
                            "start": 15,
                            "end": 95
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "multiTerm",
                        "loc": {
                            "start": 98,
                            "end": 107
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 108,
                                    "end": 115
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "ID",
                                    "loc": {
                                        "start": 117,
                                        "end": 119
                                    }
                                },
                                "loc": {
                                    "start": 117,
                                    "end": 119
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 108,
                                "end": 119
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "yieldSource",
                                "loc": {
                                    "start": 121,
                                    "end": 132
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "ID",
                                    "loc": {
                                        "start": 134,
                                        "end": 136
                                    }
                                },
                                "loc": {
                                    "start": 134,
                                    "end": 136
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 121,
                                "end": 136
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "MultiTerm",
                            "loc": {
                                "start": 139,
                                "end": 148
                            }
                        },
                        "loc": {
                            "start": 139,
                            "end": 148
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 15,
                        "end": 148
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "multiTerms",
                        "loc": {
                            "start": 151,
                            "end": 161
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
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "yieldSources",
                                "loc": {
                                    "start": 298,
                                    "end": 310
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
                                                "start": 313,
                                                "end": 315
                                            }
                                        },
                                        "loc": {
                                            "start": 313,
                                            "end": 315
                                        }
                                    },
                                    "loc": {
                                        "start": 313,
                                        "end": 316
                                    }
                                },
                                "loc": {
                                    "start": 312,
                                    "end": 317
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 298,
                                "end": 317
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "baseAsset",
                                "loc": {
                                    "start": 350,
                                    "end": 359
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
                                                "start": 362,
                                                "end": 364
                                            }
                                        },
                                        "loc": {
                                            "start": 362,
                                            "end": 364
                                        }
                                    },
                                    "loc": {
                                        "start": 362,
                                        "end": 365
                                    }
                                },
                                "loc": {
                                    "start": 361,
                                    "end": 366
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 350,
                                "end": 366
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
                                    "value": "MultiTerm",
                                    "loc": {
                                        "start": 373,
                                        "end": 382
                                    }
                                },
                                "loc": {
                                    "start": 373,
                                    "end": 382
                                }
                            },
                            "loc": {
                                "start": 372,
                                "end": 383
                            }
                        },
                        "loc": {
                            "start": 372,
                            "end": 384
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 151,
                        "end": 384
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "term",
                        "loc": {
                            "start": 388,
                            "end": 392
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "multiTerm",
                                "loc": {
                                    "start": 393,
                                    "end": 402
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
                                            "start": 404,
                                            "end": 406
                                        }
                                    },
                                    "loc": {
                                        "start": 404,
                                        "end": 406
                                    }
                                },
                                "loc": {
                                    "start": 404,
                                    "end": 407
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 393,
                                "end": 407
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "maturity",
                                "loc": {
                                    "start": 409,
                                    "end": 417
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "String",
                                        "loc": {
                                            "start": 419,
                                            "end": 425
                                        }
                                    },
                                    "loc": {
                                        "start": 419,
                                        "end": 425
                                    }
                                },
                                "loc": {
                                    "start": 419,
                                    "end": 426
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 409,
                                "end": 426
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Term",
                            "loc": {
                                "start": 429,
                                "end": 433
                            }
                        },
                        "loc": {
                            "start": 429,
                            "end": 433
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 388,
                        "end": 433
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "terms",
                        "loc": {
                            "start": 436,
                            "end": 441
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "baseAssets",
                                "loc": {
                                    "start": 447,
                                    "end": 457
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
                                                "start": 460,
                                                "end": 462
                                            }
                                        },
                                        "loc": {
                                            "start": 460,
                                            "end": 462
                                        }
                                    },
                                    "loc": {
                                        "start": 460,
                                        "end": 463
                                    }
                                },
                                "loc": {
                                    "start": 459,
                                    "end": 464
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 447,
                                "end": 464
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "multiTerms",
                                "loc": {
                                    "start": 469,
                                    "end": 479
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
                                                "start": 482,
                                                "end": 484
                                            }
                                        },
                                        "loc": {
                                            "start": 482,
                                            "end": 484
                                        }
                                    },
                                    "loc": {
                                        "start": 482,
                                        "end": 485
                                    }
                                },
                                "loc": {
                                    "start": 481,
                                    "end": 486
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 469,
                                "end": 486
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "yieldSources",
                                "loc": {
                                    "start": 491,
                                    "end": 503
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
                                                "start": 506,
                                                "end": 508
                                            }
                                        },
                                        "loc": {
                                            "start": 506,
                                            "end": 508
                                        }
                                    },
                                    "loc": {
                                        "start": 506,
                                        "end": 509
                                    }
                                },
                                "loc": {
                                    "start": 505,
                                    "end": 510
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 491,
                                "end": 510
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "timeRemaining",
                                "loc": {
                                    "start": 515,
                                    "end": 528
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "String",
                                    "loc": {
                                        "start": 530,
                                        "end": 536
                                    }
                                },
                                "loc": {
                                    "start": 530,
                                    "end": 536
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 515,
                                "end": 536
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "holders",
                                "loc": {
                                    "start": 541,
                                    "end": 548
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
                                                "start": 551,
                                                "end": 553
                                            }
                                        },
                                        "loc": {
                                            "start": 551,
                                            "end": 553
                                        }
                                    },
                                    "loc": {
                                        "start": 551,
                                        "end": 554
                                    }
                                },
                                "loc": {
                                    "start": 550,
                                    "end": 555
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 541,
                                "end": 555
                            }
                        }
                    ],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "Term",
                                "loc": {
                                    "start": 562,
                                    "end": 566
                                }
                            },
                            "loc": {
                                "start": 562,
                                "end": 566
                            }
                        },
                        "loc": {
                            "start": 561,
                            "end": 567
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 436,
                        "end": 567
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "multiPool",
                        "loc": {
                            "start": 571,
                            "end": 580
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "yieldSource",
                                "loc": {
                                    "start": 581,
                                    "end": 592
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
                                            "start": 594,
                                            "end": 596
                                        }
                                    },
                                    "loc": {
                                        "start": 594,
                                        "end": 596
                                    }
                                },
                                "loc": {
                                    "start": 594,
                                    "end": 597
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 581,
                                "end": 597
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "MultiPool",
                            "loc": {
                                "start": 600,
                                "end": 609
                            }
                        },
                        "loc": {
                            "start": 600,
                            "end": 609
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 571,
                        "end": 609
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Look up the pool for a given maturity date",
                        "block": false,
                        "loc": {
                            "start": 612,
                            "end": 656
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "pool",
                        "loc": {
                            "start": 659,
                            "end": 663
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "multiPool",
                                "loc": {
                                    "start": 664,
                                    "end": 673
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
                                            "start": 675,
                                            "end": 677
                                        }
                                    },
                                    "loc": {
                                        "start": 675,
                                        "end": 677
                                    }
                                },
                                "loc": {
                                    "start": 675,
                                    "end": 678
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 664,
                                "end": 678
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "maturity",
                                "loc": {
                                    "start": 680,
                                    "end": 688
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "String",
                                        "loc": {
                                            "start": 690,
                                            "end": 696
                                        }
                                    },
                                    "loc": {
                                        "start": 690,
                                        "end": 696
                                    }
                                },
                                "loc": {
                                    "start": 690,
                                    "end": 697
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 680,
                                "end": 697
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Pool",
                            "loc": {
                                "start": 700,
                                "end": 704
                            }
                        },
                        "loc": {
                            "start": 700,
                            "end": 704
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 612,
                        "end": 704
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pools",
                        "loc": {
                            "start": 707,
                            "end": 712
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "multiPool",
                                "loc": {
                                    "start": 713,
                                    "end": 722
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
                                            "start": 724,
                                            "end": 726
                                        }
                                    },
                                    "loc": {
                                        "start": 724,
                                        "end": 726
                                    }
                                },
                                "loc": {
                                    "start": 724,
                                    "end": 727
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 713,
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
                                "value": "Pool",
                                "loc": {
                                    "start": 731,
                                    "end": 735
                                }
                            },
                            "loc": {
                                "start": 731,
                                "end": 735
                            }
                        },
                        "loc": {
                            "start": 730,
                            "end": 736
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 707,
                        "end": 736
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "token",
                        "loc": {
                            "start": 740,
                            "end": 745
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 746,
                                    "end": 753
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
                                            "start": 755,
                                            "end": 757
                                        }
                                    },
                                    "loc": {
                                        "start": 755,
                                        "end": 757
                                    }
                                },
                                "loc": {
                                    "start": 755,
                                    "end": 758
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 746,
                                "end": 758
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 761,
                                "end": 766
                            }
                        },
                        "loc": {
                            "start": 761,
                            "end": 766
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 740,
                        "end": 766
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "tokens",
                        "loc": {
                            "start": 769,
                            "end": 775
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "addresses",
                                "loc": {
                                    "start": 776,
                                    "end": 785
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
                                                "start": 788,
                                                "end": 790
                                            }
                                        },
                                        "loc": {
                                            "start": 788,
                                            "end": 790
                                        }
                                    },
                                    "loc": {
                                        "start": 788,
                                        "end": 791
                                    }
                                },
                                "loc": {
                                    "start": 787,
                                    "end": 792
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 776,
                                "end": 792
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 795,
                                "end": 800
                            }
                        },
                        "loc": {
                            "start": 795,
                            "end": 800
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 769,
                        "end": 800
                    }
                }
            ],
            "loc": {
                "start": 0,
                "end": 969
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "MultiTerm",
                "loc": {
                    "start": 976,
                    "end": 985
                }
            },
            "interfaces": [],
            "directives": [],
            "fields": [
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "general lookup across terms for arbitrary helper functions, to be expanded",
                        "block": false,
                        "loc": {
                            "start": 990,
                            "end": 1066
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "address",
                        "loc": {
                            "start": 1069,
                            "end": 1076
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
                                    "start": 1078,
                                    "end": 1080
                                }
                            },
                            "loc": {
                                "start": 1078,
                                "end": 1080
                            }
                        },
                        "loc": {
                            "start": 1078,
                            "end": 1081
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 990,
                        "end": 1081
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Possibly fetched from a registry",
                        "block": false,
                        "loc": {
                            "start": 1084,
                            "end": 1118
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 1121,
                            "end": 1132
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldSource",
                            "loc": {
                                "start": 1134,
                                "end": 1145
                            }
                        },
                        "loc": {
                            "start": 1134,
                            "end": 1145
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1084,
                        "end": 1145
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "The underlying token, sometimes referred to as base asset",
                        "block": false,
                        "loc": {
                            "start": 1148,
                            "end": 1207
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 1210,
                            "end": 1219
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 1221,
                                "end": 1226
                            }
                        },
                        "loc": {
                            "start": 1221,
                            "end": 1226
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1148,
                        "end": 1226
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "terms",
                        "loc": {
                            "start": 1229,
                            "end": 1234
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "Term",
                                "loc": {
                                    "start": 1237,
                                    "end": 1241
                                }
                            },
                            "loc": {
                                "start": 1237,
                                "end": 1241
                            }
                        },
                        "loc": {
                            "start": 1236,
                            "end": 1242
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1229,
                        "end": 1242
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "pretty sure this is useful",
                        "block": false,
                        "loc": {
                            "start": 1246,
                            "end": 1274
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "tvl",
                        "loc": {
                            "start": 1277,
                            "end": 1280
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "atBlock",
                                "loc": {
                                    "start": 1281,
                                    "end": 1288
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1290,
                                        "end": 1293
                                    }
                                },
                                "loc": {
                                    "start": 1290,
                                    "end": 1293
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1281,
                                "end": 1293
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1296,
                                "end": 1302
                            }
                        },
                        "loc": {
                            "start": 1296,
                            "end": 1302
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1246,
                        "end": 1302
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "scratch space: are these useful?",
                        "block": false,
                        "loc": {
                            "start": 1306,
                            "end": 1340
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "totalVolume",
                        "loc": {
                            "start": 1343,
                            "end": 1354
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1356,
                                "end": 1362
                            }
                        },
                        "loc": {
                            "start": 1356,
                            "end": 1362
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1306,
                        "end": 1362
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "perDayVolume",
                        "loc": {
                            "start": 1365,
                            "end": 1377
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1379,
                                "end": 1385
                            }
                        },
                        "loc": {
                            "start": 1379,
                            "end": 1385
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1365,
                        "end": 1385
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "yields",
                        "loc": {
                            "start": 1388,
                            "end": 1394
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "String",
                                "loc": {
                                    "start": 1397,
                                    "end": 1403
                                }
                            },
                            "loc": {
                                "start": 1397,
                                "end": 1403
                            }
                        },
                        "loc": {
                            "start": 1396,
                            "end": 1404
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1388,
                        "end": 1404
                    }
                }
            ],
            "loc": {
                "start": 971,
                "end": 1406
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Term",
                "loc": {
                    "start": 1413,
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
                        "value": "id",
                        "loc": {
                            "start": 1422,
                            "end": 1424
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
                                    "start": 1426,
                                    "end": 1428
                                }
                            },
                            "loc": {
                                "start": 1426,
                                "end": 1428
                            }
                        },
                        "loc": {
                            "start": 1426,
                            "end": 1429
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1422,
                        "end": 1429
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "multiTerm",
                        "loc": {
                            "start": 1432,
                            "end": 1441
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "MultiTerm",
                                "loc": {
                                    "start": 1443,
                                    "end": 1452
                                }
                            },
                            "loc": {
                                "start": 1443,
                                "end": 1452
                            }
                        },
                        "loc": {
                            "start": 1443,
                            "end": 1453
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1432,
                        "end": 1453
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "name",
                        "loc": {
                            "start": 1456,
                            "end": 1460
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
                                    "start": 1462,
                                    "end": 1468
                                }
                            },
                            "loc": {
                                "start": 1462,
                                "end": 1468
                            }
                        },
                        "loc": {
                            "start": 1462,
                            "end": 1469
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1456,
                        "end": 1469
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Timestamp in milliseconds since unix epoch",
                        "block": false,
                        "loc": {
                            "start": 1472,
                            "end": 1516
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 1519,
                            "end": 1527
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
                                    "start": 1529,
                                    "end": 1535
                                }
                            },
                            "loc": {
                                "start": 1529,
                                "end": 1535
                            }
                        },
                        "loc": {
                            "start": 1529,
                            "end": 1536
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1472,
                        "end": 1536
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Possibly fetched from a registry",
                        "block": false,
                        "loc": {
                            "start": 1539,
                            "end": 1573
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 1576,
                            "end": 1587
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldSource",
                            "loc": {
                                "start": 1589,
                                "end": 1600
                            }
                        },
                        "loc": {
                            "start": 1589,
                            "end": 1600
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1539,
                        "end": 1600
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 1603,
                            "end": 1612
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 1614,
                                "end": 1619
                            }
                        },
                        "loc": {
                            "start": 1614,
                            "end": 1619
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1603,
                        "end": 1619
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalToken",
                        "loc": {
                            "start": 1622,
                            "end": 1636
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "PrincipalToken",
                            "loc": {
                                "start": 1638,
                                "end": 1652
                            }
                        },
                        "loc": {
                            "start": 1638,
                            "end": 1652
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1622,
                        "end": 1652
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "startDate must be between created and maturity",
                        "block": false,
                        "loc": {
                            "start": 1655,
                            "end": 1703
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldToken",
                        "loc": {
                            "start": 1706,
                            "end": 1716
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "startDate",
                                "loc": {
                                    "start": 1717,
                                    "end": 1726
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "String",
                                        "loc": {
                                            "start": 1728,
                                            "end": 1734
                                        }
                                    },
                                    "loc": {
                                        "start": 1728,
                                        "end": 1734
                                    }
                                },
                                "loc": {
                                    "start": 1728,
                                    "end": 1735
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1717,
                                "end": 1735
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldToken",
                            "loc": {
                                "start": 1738,
                                "end": 1748
                            }
                        },
                        "loc": {
                            "start": 1738,
                            "end": 1748
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1655,
                        "end": 1748
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pool",
                        "loc": {
                            "start": 1751,
                            "end": 1755
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Pool",
                            "loc": {
                                "start": 1757,
                                "end": 1761
                            }
                        },
                        "loc": {
                            "start": 1757,
                            "end": 1761
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1751,
                        "end": 1761
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Dollar amount of deposits into the term: union(mint,LP)",
                        "block": false,
                        "loc": {
                            "start": 1764,
                            "end": 1821
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "tvl",
                        "loc": {
                            "start": 1824,
                            "end": 1827
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "atBlock",
                                "loc": {
                                    "start": 1828,
                                    "end": 1835
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1837,
                                        "end": 1840
                                    }
                                },
                                "loc": {
                                    "start": 1837,
                                    "end": 1840
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1828,
                                "end": 1840
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1843,
                                "end": 1849
                            }
                        },
                        "loc": {
                            "start": 1843,
                            "end": 1849
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1764,
                        "end": 1849
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Timestamp in milliseconds since unix epoch",
                        "block": false,
                        "loc": {
                            "start": 1852,
                            "end": 1896
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "createdTimestamp",
                        "loc": {
                            "start": 1899,
                            "end": 1915
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1917,
                                "end": 1920
                            }
                        },
                        "loc": {
                            "start": 1917,
                            "end": 1920
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1852,
                        "end": 1920
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Int the term was created at",
                        "block": false,
                        "loc": {
                            "start": 1923,
                            "end": 1958
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "createdAtBlock",
                        "loc": {
                            "start": 1961,
                            "end": 1975
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1977,
                                "end": 1980
                            }
                        },
                        "loc": {
                            "start": 1977,
                            "end": 1980
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1923,
                        "end": 1980
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "variableAPY",
                        "loc": {
                            "start": 2090,
                            "end": 2101
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 2103,
                                "end": 2106
                            }
                        },
                        "loc": {
                            "start": 2103,
                            "end": 2106
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2090,
                        "end": 2106
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "fixedAPR",
                        "loc": {
                            "start": 2109,
                            "end": 2117
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 2119,
                                "end": 2122
                            }
                        },
                        "loc": {
                            "start": 2119,
                            "end": 2122
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2109,
                        "end": 2122
                    }
                }
            ],
            "loc": {
                "start": 1408,
                "end": 2124
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "YieldToken",
                "loc": {
                    "start": 2131,
                    "end": 2141
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
                            "start": 2146,
                            "end": 2153
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
                                    "start": 2155,
                                    "end": 2157
                                }
                            },
                            "loc": {
                                "start": 2155,
                                "end": 2157
                            }
                        },
                        "loc": {
                            "start": 2155,
                            "end": 2158
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2146,
                        "end": 2158
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "tokenId",
                        "loc": {
                            "start": 2161,
                            "end": 2168
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
                                    "start": 2170,
                                    "end": 2172
                                }
                            },
                            "loc": {
                                "start": 2170,
                                "end": 2172
                            }
                        },
                        "loc": {
                            "start": 2170,
                            "end": 2173
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2161,
                        "end": 2173
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "startDate",
                        "loc": {
                            "start": 2176,
                            "end": 2185
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
                                    "start": 2187,
                                    "end": 2193
                                }
                            },
                            "loc": {
                                "start": 2187,
                                "end": 2193
                            }
                        },
                        "loc": {
                            "start": 2187,
                            "end": 2194
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2176,
                        "end": 2194
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 2197,
                            "end": 2205
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
                                    "start": 2207,
                                    "end": 2213
                                }
                            },
                            "loc": {
                                "start": 2207,
                                "end": 2213
                            }
                        },
                        "loc": {
                            "start": 2207,
                            "end": 2214
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2197,
                        "end": 2214
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "accruedInterest",
                        "loc": {
                            "start": 2217,
                            "end": 2232
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2234,
                                "end": 2240
                            }
                        },
                        "loc": {
                            "start": 2234,
                            "end": 2240
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2217,
                        "end": 2240
                    }
                }
            ],
            "loc": {
                "start": 2126,
                "end": 2242
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "PrincipalToken",
                "loc": {
                    "start": 2249,
                    "end": 2263
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
                            "start": 2268,
                            "end": 2275
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
                                    "start": 2277,
                                    "end": 2279
                                }
                            },
                            "loc": {
                                "start": 2277,
                                "end": 2279
                            }
                        },
                        "loc": {
                            "start": 2277,
                            "end": 2280
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2268,
                        "end": 2280
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "tokenId",
                        "loc": {
                            "start": 2283,
                            "end": 2290
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
                        "start": 2283,
                        "end": 2295
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 2298,
                            "end": 2306
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
                                    "start": 2308,
                                    "end": 2314
                                }
                            },
                            "loc": {
                                "start": 2308,
                                "end": 2314
                            }
                        },
                        "loc": {
                            "start": 2308,
                            "end": 2315
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2298,
                        "end": 2315
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "price in terms of base asset or fiat",
                        "block": false,
                        "loc": {
                            "start": 2318,
                            "end": 2356
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "pool",
                        "loc": {
                            "start": 2359,
                            "end": 2363
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Pool",
                            "loc": {
                                "start": 2365,
                                "end": 2369
                            }
                        },
                        "loc": {
                            "start": 2365,
                            "end": 2369
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2318,
                        "end": 2369
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": " the token this principal token will resolve 1 to 1 to.",
                        "block": false,
                        "loc": {
                            "start": 2412,
                            "end": 2469
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 2472,
                            "end": 2481
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 2483,
                                "end": 2488
                            }
                        },
                        "loc": {
                            "start": 2483,
                            "end": 2488
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2412,
                        "end": 2488
                    }
                }
            ],
            "loc": {
                "start": 2244,
                "end": 2490
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Token",
                "loc": {
                    "start": 2497,
                    "end": 2502
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
                            "start": 2507,
                            "end": 2514
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
                                    "start": 2516,
                                    "end": 2518
                                }
                            },
                            "loc": {
                                "start": 2516,
                                "end": 2518
                            }
                        },
                        "loc": {
                            "start": 2516,
                            "end": 2519
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2507,
                        "end": 2519
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "symbol",
                        "loc": {
                            "start": 2522,
                            "end": 2528
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
                                    "start": 2530,
                                    "end": 2536
                                }
                            },
                            "loc": {
                                "start": 2530,
                                "end": 2536
                            }
                        },
                        "loc": {
                            "start": 2530,
                            "end": 2537
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2522,
                        "end": 2537
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "decimals",
                        "loc": {
                            "start": 2540,
                            "end": 2548
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
                                    "start": 2550,
                                    "end": 2553
                                }
                            },
                            "loc": {
                                "start": 2550,
                                "end": 2553
                            }
                        },
                        "loc": {
                            "start": 2550,
                            "end": 2554
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2540,
                        "end": 2554
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "price",
                        "loc": {
                            "start": 2557,
                            "end": 2562
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2564,
                                "end": 2570
                            }
                        },
                        "loc": {
                            "start": 2564,
                            "end": 2570
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2557,
                        "end": 2570
                    }
                }
            ],
            "loc": {
                "start": 2492,
                "end": 2572
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "MultiPool",
                "loc": {
                    "start": 2579,
                    "end": 2588
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
                            "start": 2593,
                            "end": 2600
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
                                    "start": 2602,
                                    "end": 2604
                                }
                            },
                            "loc": {
                                "start": 2602,
                                "end": 2604
                            }
                        },
                        "loc": {
                            "start": 2602,
                            "end": 2605
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2593,
                        "end": 2605
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Possibly fetched from a registry",
                        "block": false,
                        "loc": {
                            "start": 2608,
                            "end": 2642
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 2645,
                            "end": 2656
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldSource",
                            "loc": {
                                "start": 2658,
                                "end": 2669
                            }
                        },
                        "loc": {
                            "start": 2658,
                            "end": 2669
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2608,
                        "end": 2669
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pool",
                        "loc": {
                            "start": 2672,
                            "end": 2676
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "maturity",
                                "loc": {
                                    "start": 2677,
                                    "end": 2685
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "String",
                                        "loc": {
                                            "start": 2687,
                                            "end": 2693
                                        }
                                    },
                                    "loc": {
                                        "start": 2687,
                                        "end": 2693
                                    }
                                },
                                "loc": {
                                    "start": 2687,
                                    "end": 2694
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2677,
                                "end": 2694
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Pool",
                            "loc": {
                                "start": 2697,
                                "end": 2701
                            }
                        },
                        "loc": {
                            "start": 2697,
                            "end": 2701
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2672,
                        "end": 2701
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pools",
                        "loc": {
                            "start": 2704,
                            "end": 2709
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "ListType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "Pool",
                                "loc": {
                                    "start": 2712,
                                    "end": 2716
                                }
                            },
                            "loc": {
                                "start": 2712,
                                "end": 2716
                            }
                        },
                        "loc": {
                            "start": 2711,
                            "end": 2717
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2704,
                        "end": 2717
                    }
                }
            ],
            "loc": {
                "start": 2574,
                "end": 2719
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Pool",
                "loc": {
                    "start": 2726,
                    "end": 2730
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
                            "start": 2735,
                            "end": 2737
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
                                    "start": 2739,
                                    "end": 2741
                                }
                            },
                            "loc": {
                                "start": 2739,
                                "end": 2741
                            }
                        },
                        "loc": {
                            "start": 2739,
                            "end": 2742
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2735,
                        "end": 2742
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "multiPool",
                        "loc": {
                            "start": 2745,
                            "end": 2754
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "MultiPool",
                                "loc": {
                                    "start": 2756,
                                    "end": 2765
                                }
                            },
                            "loc": {
                                "start": 2756,
                                "end": 2765
                            }
                        },
                        "loc": {
                            "start": 2756,
                            "end": 2766
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2745,
                        "end": 2766
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 2769,
                            "end": 2777
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
                                    "start": 2779,
                                    "end": 2785
                                }
                            },
                            "loc": {
                                "start": 2779,
                                "end": 2785
                            }
                        },
                        "loc": {
                            "start": 2779,
                            "end": 2786
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2769,
                        "end": 2786
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 2789,
                            "end": 2800
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldSource",
                            "loc": {
                                "start": 2802,
                                "end": 2813
                            }
                        },
                        "loc": {
                            "start": 2802,
                            "end": 2813
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2789,
                        "end": 2813
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 2825,
                            "end": 2834
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 2836,
                                "end": 2841
                            }
                        },
                        "loc": {
                            "start": 2836,
                            "end": 2841
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2825,
                        "end": 2841
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAssetReserves",
                        "loc": {
                            "start": 2844,
                            "end": 2861
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2863,
                                "end": 2869
                            }
                        },
                        "loc": {
                            "start": 2863,
                            "end": 2869
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2844,
                        "end": 2869
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "shareAsset",
                        "loc": {
                            "start": 2902,
                            "end": 2912
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 2914,
                                "end": 2919
                            }
                        },
                        "loc": {
                            "start": 2914,
                            "end": 2919
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2902,
                        "end": 2919
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "shareAssetReserves",
                        "loc": {
                            "start": 2922,
                            "end": 2940
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2942,
                                "end": 2948
                            }
                        },
                        "loc": {
                            "start": 2942,
                            "end": 2948
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2922,
                        "end": 2948
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalToken",
                        "loc": {
                            "start": 2989,
                            "end": 3003
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "PrincipalToken",
                            "loc": {
                                "start": 3005,
                                "end": 3019
                            }
                        },
                        "loc": {
                            "start": 3005,
                            "end": 3019
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2989,
                        "end": 3019
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalTokenReserves",
                        "loc": {
                            "start": 3022,
                            "end": 3044
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3046,
                                "end": 3052
                            }
                        },
                        "loc": {
                            "start": 3046,
                            "end": 3052
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3022,
                        "end": 3052
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "lpToken",
                        "loc": {
                            "start": 3055,
                            "end": 3062
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 3064,
                                "end": 3069
                            }
                        },
                        "loc": {
                            "start": 3064,
                            "end": 3069
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3055,
                        "end": 3069
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "price",
                        "loc": {
                            "start": 3113,
                            "end": 3118
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3120,
                                "end": 3126
                            }
                        },
                        "loc": {
                            "start": 3120,
                            "end": 3126
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3113,
                        "end": 3126
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "priceFiat",
                        "loc": {
                            "start": 3129,
                            "end": 3138
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3140,
                                "end": 3146
                            }
                        },
                        "loc": {
                            "start": 3140,
                            "end": 3146
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3129,
                        "end": 3146
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "term",
                        "loc": {
                            "start": 3149,
                            "end": 3153
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Term",
                            "loc": {
                                "start": 3155,
                                "end": 3159
                            }
                        },
                        "loc": {
                            "start": 3155,
                            "end": 3159
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3149,
                        "end": 3159
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "tvl",
                        "loc": {
                            "start": 3162,
                            "end": 3165
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3167,
                                "end": 3173
                            }
                        },
                        "loc": {
                            "start": 3167,
                            "end": 3173
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3162,
                        "end": 3173
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "buyPreview",
                        "loc": {
                            "start": 3176,
                            "end": 3186
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "baseAssetAmountIn",
                                "loc": {
                                    "start": 3187,
                                    "end": 3204
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "String",
                                        "loc": {
                                            "start": 3206,
                                            "end": 3212
                                        }
                                    },
                                    "loc": {
                                        "start": 3206,
                                        "end": 3212
                                    }
                                },
                                "loc": {
                                    "start": 3206,
                                    "end": 3213
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 3187,
                                "end": 3213
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "BuySwapPreview",
                            "loc": {
                                "start": 3216,
                                "end": 3230
                            }
                        },
                        "loc": {
                            "start": 3216,
                            "end": 3230
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3176,
                        "end": 3230
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "sellPreview",
                        "loc": {
                            "start": 3233,
                            "end": 3244
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "principalAmountTokenIn",
                                "loc": {
                                    "start": 3245,
                                    "end": 3267
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "String",
                                        "loc": {
                                            "start": 3269,
                                            "end": 3275
                                        }
                                    },
                                    "loc": {
                                        "start": 3269,
                                        "end": 3275
                                    }
                                },
                                "loc": {
                                    "start": 3269,
                                    "end": 3276
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 3245,
                                "end": 3276
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "SellSwapPreview",
                            "loc": {
                                "start": 3279,
                                "end": 3294
                            }
                        },
                        "loc": {
                            "start": 3279,
                            "end": 3294
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3233,
                        "end": 3294
                    }
                }
            ],
            "loc": {
                "start": 2721,
                "end": 3296
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "BuySwapPreview",
                "loc": {
                    "start": 3303,
                    "end": 3317
                }
            },
            "interfaces": [],
            "directives": [],
            "fields": [
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAssetAmountIn",
                        "loc": {
                            "start": 3322,
                            "end": 3339
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
                                    "start": 3341,
                                    "end": 3347
                                }
                            },
                            "loc": {
                                "start": 3341,
                                "end": 3347
                            }
                        },
                        "loc": {
                            "start": 3341,
                            "end": 3348
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3322,
                        "end": 3348
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalTokenAmountOut",
                        "loc": {
                            "start": 3351,
                            "end": 3374
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
                                    "start": 3376,
                                    "end": 3382
                                }
                            },
                            "loc": {
                                "start": 3376,
                                "end": 3382
                            }
                        },
                        "loc": {
                            "start": 3376,
                            "end": 3383
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3351,
                        "end": 3383
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "slippage",
                        "loc": {
                            "start": 3386,
                            "end": 3394
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 3396,
                                "end": 3399
                            }
                        },
                        "loc": {
                            "start": 3396,
                            "end": 3399
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3386,
                        "end": 3399
                    }
                }
            ],
            "loc": {
                "start": 3298,
                "end": 3401
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "SellSwapPreview",
                "loc": {
                    "start": 3407,
                    "end": 3422
                }
            },
            "interfaces": [],
            "directives": [],
            "fields": [
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalTokenAmountIn",
                        "loc": {
                            "start": 3427,
                            "end": 3449
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
                                    "start": 3451,
                                    "end": 3457
                                }
                            },
                            "loc": {
                                "start": 3451,
                                "end": 3457
                            }
                        },
                        "loc": {
                            "start": 3451,
                            "end": 3458
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3427,
                        "end": 3458
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAssetAmountOut",
                        "loc": {
                            "start": 3461,
                            "end": 3479
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
                                    "start": 3481,
                                    "end": 3487
                                }
                            },
                            "loc": {
                                "start": 3481,
                                "end": 3487
                            }
                        },
                        "loc": {
                            "start": 3481,
                            "end": 3488
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3461,
                        "end": 3488
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "slippage",
                        "loc": {
                            "start": 3491,
                            "end": 3499
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 3501,
                                "end": 3504
                            }
                        },
                        "loc": {
                            "start": 3501,
                            "end": 3504
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3491,
                        "end": 3504
                    }
                }
            ],
            "loc": {
                "start": 3402,
                "end": 3506
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "YieldSource",
                "loc": {
                    "start": 3545,
                    "end": 3556
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
                            "start": 3583,
                            "end": 3590
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
                                    "start": 3592,
                                    "end": 3594
                                }
                            },
                            "loc": {
                                "start": 3592,
                                "end": 3594
                            }
                        },
                        "loc": {
                            "start": 3592,
                            "end": 3595
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3583,
                        "end": 3595
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "protocol",
                        "loc": {
                            "start": 3609,
                            "end": 3617
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
                                    "start": 3619,
                                    "end": 3625
                                }
                            },
                            "loc": {
                                "start": 3619,
                                "end": 3625
                            }
                        },
                        "loc": {
                            "start": 3619,
                            "end": 3626
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3609,
                        "end": 3626
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "name",
                        "loc": {
                            "start": 3651,
                            "end": 3655
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
                                    "start": 3657,
                                    "end": 3663
                                }
                            },
                            "loc": {
                                "start": 3657,
                                "end": 3663
                            }
                        },
                        "loc": {
                            "start": 3657,
                            "end": 3664
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3651,
                        "end": 3664
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "placeholder for more yield source specific data",
                        "block": false,
                        "loc": {
                            "start": 3668,
                            "end": 3717
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "pricePerShare",
                        "loc": {
                            "start": 3720,
                            "end": 3733
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3735,
                                "end": 3741
                            }
                        },
                        "loc": {
                            "start": 3735,
                            "end": 3741
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3668,
                        "end": 3741
                    }
                }
            ],
            "loc": {
                "start": 3540,
                "end": 3743
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 3744
    }
};


var $9eb03ae14d56e618$exports = {};


const $3ef651e6b17f096e$export$3868f2000fd533a8 = (0, $bsQ4Z$graphqltoolsschema.makeExecutableSchema)({
    resolvers: $e3560cee69deb57e$export$f62412552be5daf2,
    typeDefs: (/*@__PURE__*/$parcel$interopDefault($829ad87c37a8c45d$exports))
});
const $3ef651e6b17f096e$export$dd1b4b4cbb12ce96 = {
    schema: $3ef651e6b17f096e$export$3868f2000fd533a8,
    initContext: $ec94378a7e3179cb$export$54fae1269cb9a9e0
};
$parcel$exportWildcard(module.exports, $9eb03ae14d56e618$exports);


//# sourceMappingURL=main.js.map
