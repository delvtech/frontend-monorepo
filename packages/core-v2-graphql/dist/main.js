var $bsQ4Z$graphqltoolsschema = require("@graphql-tools/schema");

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
                }
            ],
            "loc": {
                "start": 0,
                "end": 905
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "MultiTerm",
                "loc": {
                    "start": 912,
                    "end": 921
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
                            "start": 926,
                            "end": 1002
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "address",
                        "loc": {
                            "start": 1005,
                            "end": 1012
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
                                    "start": 1014,
                                    "end": 1016
                                }
                            },
                            "loc": {
                                "start": 1014,
                                "end": 1016
                            }
                        },
                        "loc": {
                            "start": 1014,
                            "end": 1017
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 926,
                        "end": 1017
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Possibly fetched from a registry",
                        "block": false,
                        "loc": {
                            "start": 1020,
                            "end": 1054
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 1057,
                            "end": 1068
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldSource",
                            "loc": {
                                "start": 1070,
                                "end": 1081
                            }
                        },
                        "loc": {
                            "start": 1070,
                            "end": 1081
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1020,
                        "end": 1081
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "The underlying token, sometimes referred to as base asset",
                        "block": false,
                        "loc": {
                            "start": 1084,
                            "end": 1143
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 1146,
                            "end": 1155
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 1157,
                                "end": 1162
                            }
                        },
                        "loc": {
                            "start": 1157,
                            "end": 1162
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1084,
                        "end": 1162
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "terms",
                        "loc": {
                            "start": 1165,
                            "end": 1170
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
                                    "start": 1173,
                                    "end": 1177
                                }
                            },
                            "loc": {
                                "start": 1173,
                                "end": 1177
                            }
                        },
                        "loc": {
                            "start": 1172,
                            "end": 1178
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1165,
                        "end": 1178
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "pretty sure this is useful",
                        "block": false,
                        "loc": {
                            "start": 1182,
                            "end": 1210
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "tvl",
                        "loc": {
                            "start": 1213,
                            "end": 1216
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "atBlock",
                                "loc": {
                                    "start": 1217,
                                    "end": 1224
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1226,
                                        "end": 1229
                                    }
                                },
                                "loc": {
                                    "start": 1226,
                                    "end": 1229
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1217,
                                "end": 1229
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1232,
                                "end": 1238
                            }
                        },
                        "loc": {
                            "start": 1232,
                            "end": 1238
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1182,
                        "end": 1238
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "scratch space: are these useful?",
                        "block": false,
                        "loc": {
                            "start": 1242,
                            "end": 1276
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "totalVolume",
                        "loc": {
                            "start": 1279,
                            "end": 1290
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1292,
                                "end": 1298
                            }
                        },
                        "loc": {
                            "start": 1292,
                            "end": 1298
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1242,
                        "end": 1298
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "perDayVolume",
                        "loc": {
                            "start": 1301,
                            "end": 1313
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1315,
                                "end": 1321
                            }
                        },
                        "loc": {
                            "start": 1315,
                            "end": 1321
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1301,
                        "end": 1321
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "yields",
                        "loc": {
                            "start": 1324,
                            "end": 1330
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
                                    "start": 1333,
                                    "end": 1339
                                }
                            },
                            "loc": {
                                "start": 1333,
                                "end": 1339
                            }
                        },
                        "loc": {
                            "start": 1332,
                            "end": 1340
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1324,
                        "end": 1340
                    }
                }
            ],
            "loc": {
                "start": 907,
                "end": 1342
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Term",
                "loc": {
                    "start": 1349,
                    "end": 1353
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
                            "start": 1358,
                            "end": 1360
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
                                    "start": 1362,
                                    "end": 1364
                                }
                            },
                            "loc": {
                                "start": 1362,
                                "end": 1364
                            }
                        },
                        "loc": {
                            "start": 1362,
                            "end": 1365
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1358,
                        "end": 1365
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "multiTerm",
                        "loc": {
                            "start": 1368,
                            "end": 1377
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
                                    "start": 1379,
                                    "end": 1388
                                }
                            },
                            "loc": {
                                "start": 1379,
                                "end": 1388
                            }
                        },
                        "loc": {
                            "start": 1379,
                            "end": 1389
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1368,
                        "end": 1389
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "name",
                        "loc": {
                            "start": 1392,
                            "end": 1396
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
                                    "start": 1398,
                                    "end": 1404
                                }
                            },
                            "loc": {
                                "start": 1398,
                                "end": 1404
                            }
                        },
                        "loc": {
                            "start": 1398,
                            "end": 1405
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1392,
                        "end": 1405
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Timestamp in milliseconds since unix epoch",
                        "block": false,
                        "loc": {
                            "start": 1408,
                            "end": 1452
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 1455,
                            "end": 1463
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
                                    "start": 1465,
                                    "end": 1471
                                }
                            },
                            "loc": {
                                "start": 1465,
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
                        "start": 1408,
                        "end": 1472
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Possibly fetched from a registry",
                        "block": false,
                        "loc": {
                            "start": 1475,
                            "end": 1509
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 1512,
                            "end": 1523
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldSource",
                            "loc": {
                                "start": 1525,
                                "end": 1536
                            }
                        },
                        "loc": {
                            "start": 1525,
                            "end": 1536
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1475,
                        "end": 1536
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 1539,
                            "end": 1548
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 1550,
                                "end": 1555
                            }
                        },
                        "loc": {
                            "start": 1550,
                            "end": 1555
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1539,
                        "end": 1555
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalToken",
                        "loc": {
                            "start": 1558,
                            "end": 1572
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "PrincipalToken",
                            "loc": {
                                "start": 1574,
                                "end": 1588
                            }
                        },
                        "loc": {
                            "start": 1574,
                            "end": 1588
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1558,
                        "end": 1588
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "startDate must be between created and maturity",
                        "block": false,
                        "loc": {
                            "start": 1591,
                            "end": 1639
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldToken",
                        "loc": {
                            "start": 1642,
                            "end": 1652
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "startDate",
                                "loc": {
                                    "start": 1653,
                                    "end": 1662
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
                                            "start": 1664,
                                            "end": 1670
                                        }
                                    },
                                    "loc": {
                                        "start": 1664,
                                        "end": 1670
                                    }
                                },
                                "loc": {
                                    "start": 1664,
                                    "end": 1671
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1653,
                                "end": 1671
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldToken",
                            "loc": {
                                "start": 1674,
                                "end": 1684
                            }
                        },
                        "loc": {
                            "start": 1674,
                            "end": 1684
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1591,
                        "end": 1684
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pool",
                        "loc": {
                            "start": 1687,
                            "end": 1691
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Pool",
                            "loc": {
                                "start": 1693,
                                "end": 1697
                            }
                        },
                        "loc": {
                            "start": 1693,
                            "end": 1697
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1687,
                        "end": 1697
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Dollar amount of deposits into the term: union(mint,LP)",
                        "block": false,
                        "loc": {
                            "start": 1700,
                            "end": 1757
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "tvl",
                        "loc": {
                            "start": 1760,
                            "end": 1763
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "atBlock",
                                "loc": {
                                    "start": 1764,
                                    "end": 1771
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1773,
                                        "end": 1776
                                    }
                                },
                                "loc": {
                                    "start": 1773,
                                    "end": 1776
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1764,
                                "end": 1776
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1779,
                                "end": 1785
                            }
                        },
                        "loc": {
                            "start": 1779,
                            "end": 1785
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1700,
                        "end": 1785
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Timestamp in milliseconds since unix epoch",
                        "block": false,
                        "loc": {
                            "start": 1788,
                            "end": 1832
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "createdTimestamp",
                        "loc": {
                            "start": 1835,
                            "end": 1851
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1853,
                                "end": 1856
                            }
                        },
                        "loc": {
                            "start": 1853,
                            "end": 1856
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1788,
                        "end": 1856
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Int the term was created at",
                        "block": false,
                        "loc": {
                            "start": 1859,
                            "end": 1894
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "createdAtBlock",
                        "loc": {
                            "start": 1897,
                            "end": 1911
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1913,
                                "end": 1916
                            }
                        },
                        "loc": {
                            "start": 1913,
                            "end": 1916
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1859,
                        "end": 1916
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "variableAPY",
                        "loc": {
                            "start": 2028,
                            "end": 2039
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 2041,
                                "end": 2044
                            }
                        },
                        "loc": {
                            "start": 2041,
                            "end": 2044
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2028,
                        "end": 2044
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "fixedAPR",
                        "loc": {
                            "start": 2047,
                            "end": 2055
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 2057,
                                "end": 2060
                            }
                        },
                        "loc": {
                            "start": 2057,
                            "end": 2060
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2047,
                        "end": 2060
                    }
                }
            ],
            "loc": {
                "start": 1344,
                "end": 2062
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "YieldToken",
                "loc": {
                    "start": 2069,
                    "end": 2079
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
                            "start": 2084,
                            "end": 2091
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
                        "start": 2084,
                        "end": 2096
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "tokenId",
                        "loc": {
                            "start": 2099,
                            "end": 2106
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
                                    "start": 2108,
                                    "end": 2110
                                }
                            },
                            "loc": {
                                "start": 2108,
                                "end": 2110
                            }
                        },
                        "loc": {
                            "start": 2108,
                            "end": 2111
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2099,
                        "end": 2111
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "startDate",
                        "loc": {
                            "start": 2114,
                            "end": 2123
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
                                    "start": 2125,
                                    "end": 2131
                                }
                            },
                            "loc": {
                                "start": 2125,
                                "end": 2131
                            }
                        },
                        "loc": {
                            "start": 2125,
                            "end": 2132
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2114,
                        "end": 2132
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 2135,
                            "end": 2143
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
                                    "start": 2145,
                                    "end": 2151
                                }
                            },
                            "loc": {
                                "start": 2145,
                                "end": 2151
                            }
                        },
                        "loc": {
                            "start": 2145,
                            "end": 2152
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2135,
                        "end": 2152
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "accruedInterest",
                        "loc": {
                            "start": 2155,
                            "end": 2170
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2172,
                                "end": 2178
                            }
                        },
                        "loc": {
                            "start": 2172,
                            "end": 2178
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2155,
                        "end": 2178
                    }
                }
            ],
            "loc": {
                "start": 2064,
                "end": 2180
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "PrincipalToken",
                "loc": {
                    "start": 2187,
                    "end": 2201
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
                            "start": 2206,
                            "end": 2213
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
                                    "start": 2215,
                                    "end": 2217
                                }
                            },
                            "loc": {
                                "start": 2215,
                                "end": 2217
                            }
                        },
                        "loc": {
                            "start": 2215,
                            "end": 2218
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2206,
                        "end": 2218
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "tokenId",
                        "loc": {
                            "start": 2221,
                            "end": 2228
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
                                    "start": 2230,
                                    "end": 2232
                                }
                            },
                            "loc": {
                                "start": 2230,
                                "end": 2232
                            }
                        },
                        "loc": {
                            "start": 2230,
                            "end": 2233
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2221,
                        "end": 2233
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 2236,
                            "end": 2244
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
                                    "start": 2246,
                                    "end": 2252
                                }
                            },
                            "loc": {
                                "start": 2246,
                                "end": 2252
                            }
                        },
                        "loc": {
                            "start": 2246,
                            "end": 2253
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2236,
                        "end": 2253
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "price in terms of base asset or fiat",
                        "block": false,
                        "loc": {
                            "start": 2256,
                            "end": 2294
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "pool",
                        "loc": {
                            "start": 2297,
                            "end": 2301
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Pool",
                            "loc": {
                                "start": 2303,
                                "end": 2307
                            }
                        },
                        "loc": {
                            "start": 2303,
                            "end": 2307
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2256,
                        "end": 2307
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": " the token this principal token will resolve 1 to 1 to.",
                        "block": false,
                        "loc": {
                            "start": 2350,
                            "end": 2407
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 2410,
                            "end": 2419
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 2421,
                                "end": 2426
                            }
                        },
                        "loc": {
                            "start": 2421,
                            "end": 2426
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2350,
                        "end": 2426
                    }
                }
            ],
            "loc": {
                "start": 2182,
                "end": 2428
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Token",
                "loc": {
                    "start": 2435,
                    "end": 2440
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
                            "start": 2445,
                            "end": 2452
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
                                    "start": 2454,
                                    "end": 2456
                                }
                            },
                            "loc": {
                                "start": 2454,
                                "end": 2456
                            }
                        },
                        "loc": {
                            "start": 2454,
                            "end": 2457
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2445,
                        "end": 2457
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "symbol",
                        "loc": {
                            "start": 2460,
                            "end": 2466
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
                                    "start": 2468,
                                    "end": 2474
                                }
                            },
                            "loc": {
                                "start": 2468,
                                "end": 2474
                            }
                        },
                        "loc": {
                            "start": 2468,
                            "end": 2475
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2460,
                        "end": 2475
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "decimals",
                        "loc": {
                            "start": 2478,
                            "end": 2486
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
                                    "start": 2488,
                                    "end": 2491
                                }
                            },
                            "loc": {
                                "start": 2488,
                                "end": 2491
                            }
                        },
                        "loc": {
                            "start": 2488,
                            "end": 2492
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2478,
                        "end": 2492
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "price",
                        "loc": {
                            "start": 2495,
                            "end": 2500
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2502,
                                "end": 2508
                            }
                        },
                        "loc": {
                            "start": 2502,
                            "end": 2508
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2495,
                        "end": 2508
                    }
                }
            ],
            "loc": {
                "start": 2430,
                "end": 2510
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "MultiPool",
                "loc": {
                    "start": 2517,
                    "end": 2526
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
                            "start": 2531,
                            "end": 2538
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
                                    "start": 2540,
                                    "end": 2542
                                }
                            },
                            "loc": {
                                "start": 2540,
                                "end": 2542
                            }
                        },
                        "loc": {
                            "start": 2540,
                            "end": 2543
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2531,
                        "end": 2543
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Possibly fetched from a registry",
                        "block": false,
                        "loc": {
                            "start": 2546,
                            "end": 2580
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 2583,
                            "end": 2594
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldSource",
                            "loc": {
                                "start": 2596,
                                "end": 2607
                            }
                        },
                        "loc": {
                            "start": 2596,
                            "end": 2607
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2546,
                        "end": 2607
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pool",
                        "loc": {
                            "start": 2610,
                            "end": 2614
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "maturity",
                                "loc": {
                                    "start": 2615,
                                    "end": 2623
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
                                            "start": 2625,
                                            "end": 2631
                                        }
                                    },
                                    "loc": {
                                        "start": 2625,
                                        "end": 2631
                                    }
                                },
                                "loc": {
                                    "start": 2625,
                                    "end": 2632
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2615,
                                "end": 2632
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Pool",
                            "loc": {
                                "start": 2635,
                                "end": 2639
                            }
                        },
                        "loc": {
                            "start": 2635,
                            "end": 2639
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2610,
                        "end": 2639
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pools",
                        "loc": {
                            "start": 2642,
                            "end": 2647
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
                                    "start": 2650,
                                    "end": 2654
                                }
                            },
                            "loc": {
                                "start": 2650,
                                "end": 2654
                            }
                        },
                        "loc": {
                            "start": 2649,
                            "end": 2655
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2642,
                        "end": 2655
                    }
                }
            ],
            "loc": {
                "start": 2512,
                "end": 2657
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Pool",
                "loc": {
                    "start": 2664,
                    "end": 2668
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
                            "start": 2673,
                            "end": 2675
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
                                    "start": 2677,
                                    "end": 2679
                                }
                            },
                            "loc": {
                                "start": 2677,
                                "end": 2679
                            }
                        },
                        "loc": {
                            "start": 2677,
                            "end": 2680
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2673,
                        "end": 2680
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "multiPool",
                        "loc": {
                            "start": 2683,
                            "end": 2692
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
                                    "start": 2694,
                                    "end": 2703
                                }
                            },
                            "loc": {
                                "start": 2694,
                                "end": 2703
                            }
                        },
                        "loc": {
                            "start": 2694,
                            "end": 2704
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2683,
                        "end": 2704
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 2707,
                            "end": 2715
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
                                    "start": 2717,
                                    "end": 2723
                                }
                            },
                            "loc": {
                                "start": 2717,
                                "end": 2723
                            }
                        },
                        "loc": {
                            "start": 2717,
                            "end": 2724
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2707,
                        "end": 2724
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 2727,
                            "end": 2738
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldSource",
                            "loc": {
                                "start": 2740,
                                "end": 2751
                            }
                        },
                        "loc": {
                            "start": 2740,
                            "end": 2751
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2727,
                        "end": 2751
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 2763,
                            "end": 2772
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 2774,
                                "end": 2779
                            }
                        },
                        "loc": {
                            "start": 2774,
                            "end": 2779
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2763,
                        "end": 2779
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAssetReserves",
                        "loc": {
                            "start": 2782,
                            "end": 2799
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2801,
                                "end": 2807
                            }
                        },
                        "loc": {
                            "start": 2801,
                            "end": 2807
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2782,
                        "end": 2807
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "shareAsset",
                        "loc": {
                            "start": 2840,
                            "end": 2850
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 2852,
                                "end": 2857
                            }
                        },
                        "loc": {
                            "start": 2852,
                            "end": 2857
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2840,
                        "end": 2857
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "shareAssetReserves",
                        "loc": {
                            "start": 2860,
                            "end": 2878
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2880,
                                "end": 2886
                            }
                        },
                        "loc": {
                            "start": 2880,
                            "end": 2886
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2860,
                        "end": 2886
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalToken",
                        "loc": {
                            "start": 2927,
                            "end": 2941
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "PrincipalToken",
                            "loc": {
                                "start": 2943,
                                "end": 2957
                            }
                        },
                        "loc": {
                            "start": 2943,
                            "end": 2957
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2927,
                        "end": 2957
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalTokenReserves",
                        "loc": {
                            "start": 2960,
                            "end": 2982
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2984,
                                "end": 2990
                            }
                        },
                        "loc": {
                            "start": 2984,
                            "end": 2990
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2960,
                        "end": 2990
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "lpToken",
                        "loc": {
                            "start": 2993,
                            "end": 3000
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 3002,
                                "end": 3007
                            }
                        },
                        "loc": {
                            "start": 3002,
                            "end": 3007
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2993,
                        "end": 3007
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "price",
                        "loc": {
                            "start": 3051,
                            "end": 3056
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3058,
                                "end": 3064
                            }
                        },
                        "loc": {
                            "start": 3058,
                            "end": 3064
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3051,
                        "end": 3064
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "priceFiat",
                        "loc": {
                            "start": 3067,
                            "end": 3076
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3078,
                                "end": 3084
                            }
                        },
                        "loc": {
                            "start": 3078,
                            "end": 3084
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3067,
                        "end": 3084
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "term",
                        "loc": {
                            "start": 3087,
                            "end": 3091
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Term",
                            "loc": {
                                "start": 3093,
                                "end": 3097
                            }
                        },
                        "loc": {
                            "start": 3093,
                            "end": 3097
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3087,
                        "end": 3097
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "tvl",
                        "loc": {
                            "start": 3100,
                            "end": 3103
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3105,
                                "end": 3111
                            }
                        },
                        "loc": {
                            "start": 3105,
                            "end": 3111
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3100,
                        "end": 3111
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "buyPreview",
                        "loc": {
                            "start": 3114,
                            "end": 3124
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "baseAssetAmountIn",
                                "loc": {
                                    "start": 3125,
                                    "end": 3142
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
                                            "start": 3144,
                                            "end": 3150
                                        }
                                    },
                                    "loc": {
                                        "start": 3144,
                                        "end": 3150
                                    }
                                },
                                "loc": {
                                    "start": 3144,
                                    "end": 3151
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 3125,
                                "end": 3151
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "BuySwapPreview",
                            "loc": {
                                "start": 3154,
                                "end": 3168
                            }
                        },
                        "loc": {
                            "start": 3154,
                            "end": 3168
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3114,
                        "end": 3168
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "sellPreview",
                        "loc": {
                            "start": 3171,
                            "end": 3182
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "principalAmountTokenIn",
                                "loc": {
                                    "start": 3183,
                                    "end": 3205
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
                                            "start": 3207,
                                            "end": 3213
                                        }
                                    },
                                    "loc": {
                                        "start": 3207,
                                        "end": 3213
                                    }
                                },
                                "loc": {
                                    "start": 3207,
                                    "end": 3214
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 3183,
                                "end": 3214
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "SellSwapPreview",
                            "loc": {
                                "start": 3217,
                                "end": 3232
                            }
                        },
                        "loc": {
                            "start": 3217,
                            "end": 3232
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3171,
                        "end": 3232
                    }
                }
            ],
            "loc": {
                "start": 2659,
                "end": 3234
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "BuySwapPreview",
                "loc": {
                    "start": 3241,
                    "end": 3255
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
                            "start": 3260,
                            "end": 3277
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
                                    "start": 3279,
                                    "end": 3285
                                }
                            },
                            "loc": {
                                "start": 3279,
                                "end": 3285
                            }
                        },
                        "loc": {
                            "start": 3279,
                            "end": 3286
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3260,
                        "end": 3286
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalTokenAmountOut",
                        "loc": {
                            "start": 3289,
                            "end": 3312
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
                                    "start": 3314,
                                    "end": 3320
                                }
                            },
                            "loc": {
                                "start": 3314,
                                "end": 3320
                            }
                        },
                        "loc": {
                            "start": 3314,
                            "end": 3321
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3289,
                        "end": 3321
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "slippage",
                        "loc": {
                            "start": 3324,
                            "end": 3332
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 3334,
                                "end": 3337
                            }
                        },
                        "loc": {
                            "start": 3334,
                            "end": 3337
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3324,
                        "end": 3337
                    }
                }
            ],
            "loc": {
                "start": 3236,
                "end": 3339
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "SellSwapPreview",
                "loc": {
                    "start": 3345,
                    "end": 3360
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
                            "start": 3365,
                            "end": 3387
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
                                    "start": 3389,
                                    "end": 3395
                                }
                            },
                            "loc": {
                                "start": 3389,
                                "end": 3395
                            }
                        },
                        "loc": {
                            "start": 3389,
                            "end": 3396
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3365,
                        "end": 3396
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAssetAmountOut",
                        "loc": {
                            "start": 3399,
                            "end": 3417
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
                                    "start": 3419,
                                    "end": 3425
                                }
                            },
                            "loc": {
                                "start": 3419,
                                "end": 3425
                            }
                        },
                        "loc": {
                            "start": 3419,
                            "end": 3426
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3399,
                        "end": 3426
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "slippage",
                        "loc": {
                            "start": 3429,
                            "end": 3437
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 3439,
                                "end": 3442
                            }
                        },
                        "loc": {
                            "start": 3439,
                            "end": 3442
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3429,
                        "end": 3442
                    }
                }
            ],
            "loc": {
                "start": 3340,
                "end": 3444
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "YieldSource",
                "loc": {
                    "start": 3483,
                    "end": 3494
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
                            "start": 3521,
                            "end": 3528
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
                                    "start": 3530,
                                    "end": 3532
                                }
                            },
                            "loc": {
                                "start": 3530,
                                "end": 3532
                            }
                        },
                        "loc": {
                            "start": 3530,
                            "end": 3533
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3521,
                        "end": 3533
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "protocol",
                        "loc": {
                            "start": 3547,
                            "end": 3555
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
                                    "start": 3557,
                                    "end": 3563
                                }
                            },
                            "loc": {
                                "start": 3557,
                                "end": 3563
                            }
                        },
                        "loc": {
                            "start": 3557,
                            "end": 3564
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3547,
                        "end": 3564
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "name",
                        "loc": {
                            "start": 3589,
                            "end": 3593
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
                                    "start": 3595,
                                    "end": 3601
                                }
                            },
                            "loc": {
                                "start": 3595,
                                "end": 3601
                            }
                        },
                        "loc": {
                            "start": 3595,
                            "end": 3602
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3589,
                        "end": 3602
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "placeholder for more yield source specific data",
                        "block": false,
                        "loc": {
                            "start": 3606,
                            "end": 3655
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "pricePerShare",
                        "loc": {
                            "start": 3658,
                            "end": 3671
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3673,
                                "end": 3679
                            }
                        },
                        "loc": {
                            "start": 3673,
                            "end": 3679
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3606,
                        "end": 3679
                    }
                }
            ],
            "loc": {
                "start": 3478,
                "end": 3681
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 3682
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
