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

function $1e8b6571e3c1fada$var$getByYieldSource({ yieldSource: yieldSource , context: context  }) {
    // TODO: look up multiterm by yield source name using registry
    return {
        address: "0x1",
        yieldSource: yieldSource
    };
}
const $1e8b6571e3c1fada$export$1258c78d6c9cdc59 = {
    getByYieldSource: $1e8b6571e3c1fada$var$getByYieldSource
};



function $38d41d43985fa869$var$getByMaturity({ maturity: maturity , yieldSource: yieldSource , context: context  }) {
    const multiTerm = (0, $1e8b6571e3c1fada$export$1258c78d6c9cdc59).getByYieldSource({
        yieldSource: yieldSource,
        context: context
    });
    if (!multiTerm) return undefined;
    // TODO: look up term by yield source name and maturity
    return {
        id: "1",
        multiTerm: multiTerm,
        name: "Term 1",
        maturity: maturity,
        yieldSource: yieldSource
    };
}
const $38d41d43985fa869$export$b2d94e055b626cdb = {
    getByMaturity: $38d41d43985fa869$var$getByMaturity
};


function $11576f0276a31fe5$var$getByName({ name: name , context: context  }) {
    // TODO: look up yield source by name (possibly from registry)
    return {
        name: name
    };
}
function $11576f0276a31fe5$var$getByNames({ names: names , context: context  }) {
    // TODO: look up yield source by name (possibly from registry)
    return names.map((name)=>{
        return {
            name: name
        };
    });
}
const $11576f0276a31fe5$export$3a21e954cf88d444 = {
    getByName: $11576f0276a31fe5$var$getByName,
    getByNames: $11576f0276a31fe5$var$getByNames
};


function $118176bb7ca601d4$var$getByYieldSource({ yieldSource: yieldSource , context: context  }) {
    // TODO: look up multipool by yield source name
    return {
        address: "0x1",
        yieldSource: yieldSource
    };
}
const $118176bb7ca601d4$export$50895256536951e0 = {
    getByYieldSource: $118176bb7ca601d4$var$getByYieldSource
};



function $bae65773bc81c4c1$var$getByMaturity({ maturity: maturity , yieldSource: yieldSource , context: context  }) {
    const multiPool = (0, $118176bb7ca601d4$export$50895256536951e0).getByYieldSource({
        yieldSource: yieldSource,
        context: context
    });
    if (!multiPool) return undefined;
    // TODO: look up pool by yield source name and maturity
    return {
        id: "1",
        multiPool: multiPool,
        maturity: maturity,
        yieldSource: yieldSource
    };
}
const $bae65773bc81c4c1$export$f366f8b4fb2be7f6 = {
    getByMaturity: $bae65773bc81c4c1$var$getByMaturity
};


const $e3560cee69deb57e$export$f62412552be5daf2 = {
    Query: {
        multiTerm: (_, { yieldSource: yieldSourceName  }, context)=>{
            const yieldSource = (0, $11576f0276a31fe5$export$3a21e954cf88d444).getByName({
                name: yieldSourceName,
                context: context
            });
            const multiTerm = (0, $1e8b6571e3c1fada$export$1258c78d6c9cdc59).getByYieldSource({
                yieldSource: yieldSource,
                context: context
            });
            return multiTerm || null;
        },
        term: (_, { yieldSource: yieldSourceName , maturity: maturity  }, context)=>{
            const yieldSource = (0, $11576f0276a31fe5$export$3a21e954cf88d444).getByName({
                name: yieldSourceName,
                context: context
            });
            const term = (0, $38d41d43985fa869$export$b2d94e055b626cdb).getByMaturity({
                maturity: maturity,
                yieldSource: yieldSource,
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
        pool: (_, { yieldSource: yieldSourceName , maturity: maturity  }, context)=>{
            const yieldSource = (0, $11576f0276a31fe5$export$3a21e954cf88d444).getByName({
                name: yieldSourceName,
                context: context
            });
            const pool = (0, $bae65773bc81c4c1$export$f366f8b4fb2be7f6).getByMaturity({
                maturity: maturity,
                yieldSource: yieldSource,
                context: context
            });
            return pool || null;
        },
        // pools: (_, { yieldSource: yieldSourceName }, context) => {
        // },
        yieldSource: (_, { name: name  }, context)=>{
            const yieldSource = (0, $11576f0276a31fe5$export$3a21e954cf88d444).getByName({
                name: name,
                context: context
            });
            return yieldSource || null;
        },
        yieldSources: (_, { names: names  }, context)=>{
            const yieldSources = (0, $11576f0276a31fe5$export$3a21e954cf88d444).getByNames({
                names: names,
                context: context
            });
            return yieldSources.map((yieldSource)=>yieldSource || null);
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
                            "start": 16,
                            "end": 96
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "multiTerm",
                        "loc": {
                            "start": 100,
                            "end": 109
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 110,
                                    "end": 117
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "ID",
                                    "loc": {
                                        "start": 119,
                                        "end": 121
                                    }
                                },
                                "loc": {
                                    "start": 119,
                                    "end": 121
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 110,
                                "end": 121
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "yieldSource",
                                "loc": {
                                    "start": 123,
                                    "end": 134
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "ID",
                                    "loc": {
                                        "start": 136,
                                        "end": 138
                                    }
                                },
                                "loc": {
                                    "start": 136,
                                    "end": 138
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 123,
                                "end": 138
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "MultiTerm",
                            "loc": {
                                "start": 141,
                                "end": 150
                            }
                        },
                        "loc": {
                            "start": 141,
                            "end": 150
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 16,
                        "end": 150
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "term",
                        "loc": {
                            "start": 154,
                            "end": 158
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "multiTerm",
                                "loc": {
                                    "start": 159,
                                    "end": 168
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
                                            "start": 170,
                                            "end": 172
                                        }
                                    },
                                    "loc": {
                                        "start": 170,
                                        "end": 172
                                    }
                                },
                                "loc": {
                                    "start": 170,
                                    "end": 173
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 159,
                                "end": 173
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "maturity",
                                "loc": {
                                    "start": 175,
                                    "end": 183
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
                                            "start": 185,
                                            "end": 191
                                        }
                                    },
                                    "loc": {
                                        "start": 185,
                                        "end": 191
                                    }
                                },
                                "loc": {
                                    "start": 185,
                                    "end": 192
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 175,
                                "end": 192
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Term",
                            "loc": {
                                "start": 195,
                                "end": 199
                            }
                        },
                        "loc": {
                            "start": 195,
                            "end": 199
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 154,
                        "end": 199
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "terms",
                        "loc": {
                            "start": 203,
                            "end": 208
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "multiTerm",
                                "loc": {
                                    "start": 209,
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
                                "start": 209,
                                "end": 223
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
                                    "start": 227,
                                    "end": 231
                                }
                            },
                            "loc": {
                                "start": 227,
                                "end": 231
                            }
                        },
                        "loc": {
                            "start": 226,
                            "end": 232
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 203,
                        "end": 232
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "multiPool",
                        "loc": {
                            "start": 238,
                            "end": 247
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "yieldSource",
                                "loc": {
                                    "start": 248,
                                    "end": 259
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
                                            "start": 261,
                                            "end": 263
                                        }
                                    },
                                    "loc": {
                                        "start": 261,
                                        "end": 263
                                    }
                                },
                                "loc": {
                                    "start": 261,
                                    "end": 264
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 248,
                                "end": 264
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "MultiPool",
                            "loc": {
                                "start": 267,
                                "end": 276
                            }
                        },
                        "loc": {
                            "start": 267,
                            "end": 276
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 238,
                        "end": 276
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Look up the pool for a given maturity date",
                        "block": false,
                        "loc": {
                            "start": 280,
                            "end": 324
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "pool",
                        "loc": {
                            "start": 328,
                            "end": 332
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "multiPool",
                                "loc": {
                                    "start": 333,
                                    "end": 342
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
                                            "start": 344,
                                            "end": 346
                                        }
                                    },
                                    "loc": {
                                        "start": 344,
                                        "end": 346
                                    }
                                },
                                "loc": {
                                    "start": 344,
                                    "end": 347
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 333,
                                "end": 347
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "maturity",
                                "loc": {
                                    "start": 349,
                                    "end": 357
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
                                            "start": 359,
                                            "end": 365
                                        }
                                    },
                                    "loc": {
                                        "start": 359,
                                        "end": 365
                                    }
                                },
                                "loc": {
                                    "start": 359,
                                    "end": 366
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 349,
                                "end": 366
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Pool",
                            "loc": {
                                "start": 369,
                                "end": 373
                            }
                        },
                        "loc": {
                            "start": 369,
                            "end": 373
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 280,
                        "end": 373
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pools",
                        "loc": {
                            "start": 377,
                            "end": 382
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "multiPool",
                                "loc": {
                                    "start": 383,
                                    "end": 392
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
                                            "start": 394,
                                            "end": 396
                                        }
                                    },
                                    "loc": {
                                        "start": 394,
                                        "end": 396
                                    }
                                },
                                "loc": {
                                    "start": 394,
                                    "end": 397
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 383,
                                "end": 397
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
                                    "start": 401,
                                    "end": 405
                                }
                            },
                            "loc": {
                                "start": 401,
                                "end": 405
                            }
                        },
                        "loc": {
                            "start": 400,
                            "end": 406
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 377,
                        "end": 406
                    }
                }
            ],
            "loc": {
                "start": 0,
                "end": 580
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "MultiTerm",
                "loc": {
                    "start": 589,
                    "end": 598
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
                            "start": 604,
                            "end": 680
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "address",
                        "loc": {
                            "start": 684,
                            "end": 691
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
                                    "start": 693,
                                    "end": 695
                                }
                            },
                            "loc": {
                                "start": 693,
                                "end": 695
                            }
                        },
                        "loc": {
                            "start": 693,
                            "end": 696
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 604,
                        "end": 696
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Possibly fetched from a registry",
                        "block": false,
                        "loc": {
                            "start": 700,
                            "end": 734
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 738,
                            "end": 749
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "YieldSource",
                                "loc": {
                                    "start": 751,
                                    "end": 762
                                }
                            },
                            "loc": {
                                "start": 751,
                                "end": 762
                            }
                        },
                        "loc": {
                            "start": 751,
                            "end": 763
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 700,
                        "end": 763
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "The underlying token, sometimes referred to as base asset",
                        "block": false,
                        "loc": {
                            "start": 767,
                            "end": 826
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 830,
                            "end": 839
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 841,
                                "end": 846
                            }
                        },
                        "loc": {
                            "start": 841,
                            "end": 846
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 767,
                        "end": 846
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "pretty sure these are useful",
                        "block": false,
                        "loc": {
                            "start": 850,
                            "end": 880
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "terms",
                        "loc": {
                            "start": 884,
                            "end": 889
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
                                    "start": 892,
                                    "end": 896
                                }
                            },
                            "loc": {
                                "start": 892,
                                "end": 896
                            }
                        },
                        "loc": {
                            "start": 891,
                            "end": 897
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 850,
                        "end": 897
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "tvl",
                        "loc": {
                            "start": 901,
                            "end": 904
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "atBlock",
                                "loc": {
                                    "start": 905,
                                    "end": 912
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 914,
                                        "end": 917
                                    }
                                },
                                "loc": {
                                    "start": 914,
                                    "end": 917
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 905,
                                "end": 917
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 920,
                                "end": 926
                            }
                        },
                        "loc": {
                            "start": 920,
                            "end": 926
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 901,
                        "end": 926
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "scratch space: are these useful?",
                        "block": false,
                        "loc": {
                            "start": 932,
                            "end": 966
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "totalVolume",
                        "loc": {
                            "start": 970,
                            "end": 981
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 983,
                                "end": 989
                            }
                        },
                        "loc": {
                            "start": 983,
                            "end": 989
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 932,
                        "end": 989
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "perDayVolume",
                        "loc": {
                            "start": 993,
                            "end": 1005
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1007,
                                "end": 1013
                            }
                        },
                        "loc": {
                            "start": 1007,
                            "end": 1013
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 993,
                        "end": 1013
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "yields",
                        "loc": {
                            "start": 1017,
                            "end": 1023
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
                                    "start": 1026,
                                    "end": 1032
                                }
                            },
                            "loc": {
                                "start": 1026,
                                "end": 1032
                            }
                        },
                        "loc": {
                            "start": 1025,
                            "end": 1033
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1017,
                        "end": 1033
                    }
                }
            ],
            "loc": {
                "start": 584,
                "end": 1036
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Term",
                "loc": {
                    "start": 1045,
                    "end": 1049
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
                            "start": 1055,
                            "end": 1057
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
                                    "start": 1059,
                                    "end": 1061
                                }
                            },
                            "loc": {
                                "start": 1059,
                                "end": 1061
                            }
                        },
                        "loc": {
                            "start": 1059,
                            "end": 1062
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1055,
                        "end": 1062
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "multiTerm",
                        "loc": {
                            "start": 1066,
                            "end": 1075
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
                                    "start": 1077,
                                    "end": 1086
                                }
                            },
                            "loc": {
                                "start": 1077,
                                "end": 1086
                            }
                        },
                        "loc": {
                            "start": 1077,
                            "end": 1087
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1066,
                        "end": 1087
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "name",
                        "loc": {
                            "start": 1091,
                            "end": 1095
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
                                    "start": 1097,
                                    "end": 1103
                                }
                            },
                            "loc": {
                                "start": 1097,
                                "end": 1103
                            }
                        },
                        "loc": {
                            "start": 1097,
                            "end": 1104
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1091,
                        "end": 1104
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Timestamp in milliseconds since unix epoch",
                        "block": false,
                        "loc": {
                            "start": 1108,
                            "end": 1152
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 1156,
                            "end": 1164
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
                                    "start": 1166,
                                    "end": 1172
                                }
                            },
                            "loc": {
                                "start": 1166,
                                "end": 1172
                            }
                        },
                        "loc": {
                            "start": 1166,
                            "end": 1173
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1108,
                        "end": 1173
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Possibly fetched from a registry",
                        "block": false,
                        "loc": {
                            "start": 1177,
                            "end": 1211
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 1215,
                            "end": 1226
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "YieldSource",
                                "loc": {
                                    "start": 1228,
                                    "end": 1239
                                }
                            },
                            "loc": {
                                "start": 1228,
                                "end": 1239
                            }
                        },
                        "loc": {
                            "start": 1228,
                            "end": 1240
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1177,
                        "end": 1240
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 1244,
                            "end": 1253
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 1255,
                                "end": 1260
                            }
                        },
                        "loc": {
                            "start": 1255,
                            "end": 1260
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1244,
                        "end": 1260
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalToken",
                        "loc": {
                            "start": 1264,
                            "end": 1278
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "PrincipalToken",
                            "loc": {
                                "start": 1280,
                                "end": 1294
                            }
                        },
                        "loc": {
                            "start": 1280,
                            "end": 1294
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1264,
                        "end": 1294
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "startDate must be between created and maturity",
                        "block": false,
                        "loc": {
                            "start": 1298,
                            "end": 1346
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldToken",
                        "loc": {
                            "start": 1350,
                            "end": 1360
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "startDate",
                                "loc": {
                                    "start": 1361,
                                    "end": 1370
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
                                            "start": 1372,
                                            "end": 1378
                                        }
                                    },
                                    "loc": {
                                        "start": 1372,
                                        "end": 1378
                                    }
                                },
                                "loc": {
                                    "start": 1372,
                                    "end": 1379
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1361,
                                "end": 1379
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldToken",
                            "loc": {
                                "start": 1382,
                                "end": 1392
                            }
                        },
                        "loc": {
                            "start": 1382,
                            "end": 1392
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1298,
                        "end": 1392
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pool",
                        "loc": {
                            "start": 1396,
                            "end": 1400
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Pool",
                            "loc": {
                                "start": 1402,
                                "end": 1406
                            }
                        },
                        "loc": {
                            "start": 1402,
                            "end": 1406
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1396,
                        "end": 1406
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Dollar amount of deposits into the term: union(mint,LP)",
                        "block": false,
                        "loc": {
                            "start": 1410,
                            "end": 1467
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "tvl",
                        "loc": {
                            "start": 1471,
                            "end": 1474
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1476,
                                "end": 1482
                            }
                        },
                        "loc": {
                            "start": 1476,
                            "end": 1482
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1410,
                        "end": 1482
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Timestamp in milliseconds since unix epoch",
                        "block": false,
                        "loc": {
                            "start": 1486,
                            "end": 1530
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "createdTimestamp",
                        "loc": {
                            "start": 1534,
                            "end": 1550
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1552,
                                "end": 1555
                            }
                        },
                        "loc": {
                            "start": 1552,
                            "end": 1555
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1486,
                        "end": 1555
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Int the term was created at",
                        "block": false,
                        "loc": {
                            "start": 1559,
                            "end": 1594
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "createdAtBlock",
                        "loc": {
                            "start": 1598,
                            "end": 1612
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1614,
                                "end": 1617
                            }
                        },
                        "loc": {
                            "start": 1614,
                            "end": 1617
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1559,
                        "end": 1617
                    }
                }
            ],
            "loc": {
                "start": 1040,
                "end": 1620
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "YieldToken",
                "loc": {
                    "start": 1629,
                    "end": 1639
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
                            "start": 1645,
                            "end": 1652
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
                                    "start": 1654,
                                    "end": 1656
                                }
                            },
                            "loc": {
                                "start": 1654,
                                "end": 1656
                            }
                        },
                        "loc": {
                            "start": 1654,
                            "end": 1657
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1645,
                        "end": 1657
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "tokenId",
                        "loc": {
                            "start": 1661,
                            "end": 1668
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
                                    "start": 1670,
                                    "end": 1672
                                }
                            },
                            "loc": {
                                "start": 1670,
                                "end": 1672
                            }
                        },
                        "loc": {
                            "start": 1670,
                            "end": 1673
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1661,
                        "end": 1673
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "startDate",
                        "loc": {
                            "start": 1677,
                            "end": 1686
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
                                    "start": 1688,
                                    "end": 1694
                                }
                            },
                            "loc": {
                                "start": 1688,
                                "end": 1694
                            }
                        },
                        "loc": {
                            "start": 1688,
                            "end": 1695
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1677,
                        "end": 1695
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 1699,
                            "end": 1707
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
                                    "start": 1709,
                                    "end": 1715
                                }
                            },
                            "loc": {
                                "start": 1709,
                                "end": 1715
                            }
                        },
                        "loc": {
                            "start": 1709,
                            "end": 1716
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1699,
                        "end": 1716
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "accruedInterest",
                        "loc": {
                            "start": 1720,
                            "end": 1735
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1737,
                                "end": 1743
                            }
                        },
                        "loc": {
                            "start": 1737,
                            "end": 1743
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1720,
                        "end": 1743
                    }
                }
            ],
            "loc": {
                "start": 1624,
                "end": 1746
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "PrincipalToken",
                "loc": {
                    "start": 1755,
                    "end": 1769
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
                            "start": 1775,
                            "end": 1782
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
                                    "start": 1784,
                                    "end": 1786
                                }
                            },
                            "loc": {
                                "start": 1784,
                                "end": 1786
                            }
                        },
                        "loc": {
                            "start": 1784,
                            "end": 1787
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1775,
                        "end": 1787
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "tokenId",
                        "loc": {
                            "start": 1791,
                            "end": 1798
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
                                    "start": 1800,
                                    "end": 1802
                                }
                            },
                            "loc": {
                                "start": 1800,
                                "end": 1802
                            }
                        },
                        "loc": {
                            "start": 1800,
                            "end": 1803
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1791,
                        "end": 1803
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 1807,
                            "end": 1815
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
                                    "start": 1817,
                                    "end": 1823
                                }
                            },
                            "loc": {
                                "start": 1817,
                                "end": 1823
                            }
                        },
                        "loc": {
                            "start": 1817,
                            "end": 1824
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1807,
                        "end": 1824
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "price in terms of base asset or fiat",
                        "block": false,
                        "loc": {
                            "start": 1828,
                            "end": 1866
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "price",
                        "loc": {
                            "start": 1870,
                            "end": 1875
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1877,
                                "end": 1883
                            }
                        },
                        "loc": {
                            "start": 1877,
                            "end": 1883
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1828,
                        "end": 1883
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "priceFiat",
                        "loc": {
                            "start": 1887,
                            "end": 1896
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1898,
                                "end": 1904
                            }
                        },
                        "loc": {
                            "start": 1898,
                            "end": 1904
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1887,
                        "end": 1904
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": " the token this principal token will resolve 1 to 1 to.",
                        "block": false,
                        "loc": {
                            "start": 1908,
                            "end": 1965
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 1969,
                            "end": 1978
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 1980,
                                "end": 1985
                            }
                        },
                        "loc": {
                            "start": 1980,
                            "end": 1985
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1908,
                        "end": 1985
                    }
                }
            ],
            "loc": {
                "start": 1750,
                "end": 1988
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Token",
                "loc": {
                    "start": 1997,
                    "end": 2002
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
                            "start": 2008,
                            "end": 2015
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
                                    "start": 2017,
                                    "end": 2019
                                }
                            },
                            "loc": {
                                "start": 2017,
                                "end": 2019
                            }
                        },
                        "loc": {
                            "start": 2017,
                            "end": 2020
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2008,
                        "end": 2020
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "symbol",
                        "loc": {
                            "start": 2024,
                            "end": 2030
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
                                    "start": 2032,
                                    "end": 2038
                                }
                            },
                            "loc": {
                                "start": 2032,
                                "end": 2038
                            }
                        },
                        "loc": {
                            "start": 2032,
                            "end": 2039
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2024,
                        "end": 2039
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "decimals",
                        "loc": {
                            "start": 2043,
                            "end": 2051
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
                                    "start": 2053,
                                    "end": 2056
                                }
                            },
                            "loc": {
                                "start": 2053,
                                "end": 2056
                            }
                        },
                        "loc": {
                            "start": 2053,
                            "end": 2057
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2043,
                        "end": 2057
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "price",
                        "loc": {
                            "start": 2061,
                            "end": 2066
                        }
                    },
                    "arguments": [],
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
                    "directives": [],
                    "loc": {
                        "start": 2061,
                        "end": 2074
                    }
                }
            ],
            "loc": {
                "start": 1992,
                "end": 2077
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "MultiPool",
                "loc": {
                    "start": 2086,
                    "end": 2095
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
                            "start": 2101,
                            "end": 2108
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
                                    "start": 2110,
                                    "end": 2112
                                }
                            },
                            "loc": {
                                "start": 2110,
                                "end": 2112
                            }
                        },
                        "loc": {
                            "start": 2110,
                            "end": 2113
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2101,
                        "end": 2113
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Possibly fetched from a registry",
                        "block": false,
                        "loc": {
                            "start": 2117,
                            "end": 2151
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 2155,
                            "end": 2166
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "YieldSource",
                                "loc": {
                                    "start": 2168,
                                    "end": 2179
                                }
                            },
                            "loc": {
                                "start": 2168,
                                "end": 2179
                            }
                        },
                        "loc": {
                            "start": 2168,
                            "end": 2180
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2117,
                        "end": 2180
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pool",
                        "loc": {
                            "start": 2184,
                            "end": 2188
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "maturity",
                                "loc": {
                                    "start": 2189,
                                    "end": 2197
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
                                            "start": 2199,
                                            "end": 2205
                                        }
                                    },
                                    "loc": {
                                        "start": 2199,
                                        "end": 2205
                                    }
                                },
                                "loc": {
                                    "start": 2199,
                                    "end": 2206
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2189,
                                "end": 2206
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Pool",
                            "loc": {
                                "start": 2209,
                                "end": 2213
                            }
                        },
                        "loc": {
                            "start": 2209,
                            "end": 2213
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2184,
                        "end": 2213
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pools",
                        "loc": {
                            "start": 2217,
                            "end": 2222
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
                                    "start": 2225,
                                    "end": 2229
                                }
                            },
                            "loc": {
                                "start": 2225,
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
                        "start": 2217,
                        "end": 2230
                    }
                }
            ],
            "loc": {
                "start": 2081,
                "end": 2233
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Pool",
                "loc": {
                    "start": 2242,
                    "end": 2246
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
                            "start": 2252,
                            "end": 2254
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
                                    "start": 2256,
                                    "end": 2258
                                }
                            },
                            "loc": {
                                "start": 2256,
                                "end": 2258
                            }
                        },
                        "loc": {
                            "start": 2256,
                            "end": 2259
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2252,
                        "end": 2259
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "multiPool",
                        "loc": {
                            "start": 2263,
                            "end": 2272
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
                                    "start": 2274,
                                    "end": 2283
                                }
                            },
                            "loc": {
                                "start": 2274,
                                "end": 2283
                            }
                        },
                        "loc": {
                            "start": 2274,
                            "end": 2284
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2263,
                        "end": 2284
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 2288,
                            "end": 2296
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
                                    "start": 2298,
                                    "end": 2304
                                }
                            },
                            "loc": {
                                "start": 2298,
                                "end": 2304
                            }
                        },
                        "loc": {
                            "start": 2298,
                            "end": 2305
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2288,
                        "end": 2305
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 2309,
                            "end": 2320
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "YieldSource",
                                "loc": {
                                    "start": 2322,
                                    "end": 2333
                                }
                            },
                            "loc": {
                                "start": 2322,
                                "end": 2333
                            }
                        },
                        "loc": {
                            "start": 2322,
                            "end": 2334
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2309,
                        "end": 2334
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 2348,
                            "end": 2357
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 2359,
                                "end": 2364
                            }
                        },
                        "loc": {
                            "start": 2359,
                            "end": 2364
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2348,
                        "end": 2364
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAssetReserves",
                        "loc": {
                            "start": 2368,
                            "end": 2385
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2387,
                                "end": 2393
                            }
                        },
                        "loc": {
                            "start": 2387,
                            "end": 2393
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2368,
                        "end": 2393
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "shareAsset",
                        "loc": {
                            "start": 2428,
                            "end": 2438
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 2440,
                                "end": 2445
                            }
                        },
                        "loc": {
                            "start": 2440,
                            "end": 2445
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2428,
                        "end": 2445
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "shareAssetReserves",
                        "loc": {
                            "start": 2449,
                            "end": 2467
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2469,
                                "end": 2475
                            }
                        },
                        "loc": {
                            "start": 2469,
                            "end": 2475
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2449,
                        "end": 2475
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalToken",
                        "loc": {
                            "start": 2518,
                            "end": 2532
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "PrincipalToken",
                            "loc": {
                                "start": 2534,
                                "end": 2548
                            }
                        },
                        "loc": {
                            "start": 2534,
                            "end": 2548
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2518,
                        "end": 2548
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalTokenReserves",
                        "loc": {
                            "start": 2552,
                            "end": 2574
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2576,
                                "end": 2582
                            }
                        },
                        "loc": {
                            "start": 2576,
                            "end": 2582
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2552,
                        "end": 2582
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "lpToken",
                        "loc": {
                            "start": 2586,
                            "end": 2593
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 2595,
                                "end": 2600
                            }
                        },
                        "loc": {
                            "start": 2595,
                            "end": 2600
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2586,
                        "end": 2600
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "price in terms of base asset or fiat",
                        "block": false,
                        "loc": {
                            "start": 2604,
                            "end": 2642
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "price",
                        "loc": {
                            "start": 2646,
                            "end": 2651
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2653,
                                "end": 2659
                            }
                        },
                        "loc": {
                            "start": 2653,
                            "end": 2659
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2604,
                        "end": 2659
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "priceFiat",
                        "loc": {
                            "start": 2663,
                            "end": 2672
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2674,
                                "end": 2680
                            }
                        },
                        "loc": {
                            "start": 2674,
                            "end": 2680
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2663,
                        "end": 2680
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "term",
                        "loc": {
                            "start": 2684,
                            "end": 2688
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Term",
                            "loc": {
                                "start": 2690,
                                "end": 2694
                            }
                        },
                        "loc": {
                            "start": 2690,
                            "end": 2694
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2684,
                        "end": 2694
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "tvl",
                        "loc": {
                            "start": 2698,
                            "end": 2701
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2703,
                                "end": 2709
                            }
                        },
                        "loc": {
                            "start": 2703,
                            "end": 2709
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2698,
                        "end": 2709
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "buyPreview",
                        "loc": {
                            "start": 2713,
                            "end": 2723
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "baseAssetIn",
                                "loc": {
                                    "start": 2724,
                                    "end": 2735
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
                                            "start": 2737,
                                            "end": 2743
                                        }
                                    },
                                    "loc": {
                                        "start": 2737,
                                        "end": 2743
                                    }
                                },
                                "loc": {
                                    "start": 2737,
                                    "end": 2744
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2724,
                                "end": 2744
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "SwapPreview",
                            "loc": {
                                "start": 2747,
                                "end": 2758
                            }
                        },
                        "loc": {
                            "start": 2747,
                            "end": 2758
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2713,
                        "end": 2758
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "sellPreview",
                        "loc": {
                            "start": 2762,
                            "end": 2773
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "principalTokenIn",
                                "loc": {
                                    "start": 2774,
                                    "end": 2790
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
                                            "start": 2792,
                                            "end": 2798
                                        }
                                    },
                                    "loc": {
                                        "start": 2792,
                                        "end": 2798
                                    }
                                },
                                "loc": {
                                    "start": 2792,
                                    "end": 2799
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2774,
                                "end": 2799
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "SwapPreview",
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
                        "start": 2762,
                        "end": 2813
                    }
                }
            ],
            "loc": {
                "start": 2237,
                "end": 2816
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "SwapPreview",
                "loc": {
                    "start": 2825,
                    "end": 2836
                }
            },
            "interfaces": [],
            "directives": [],
            "fields": [
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 2842,
                            "end": 2851
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
                                    "start": 2853,
                                    "end": 2859
                                }
                            },
                            "loc": {
                                "start": 2853,
                                "end": 2859
                            }
                        },
                        "loc": {
                            "start": 2853,
                            "end": 2860
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2842,
                        "end": 2860
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalTokenIn",
                        "loc": {
                            "start": 2864,
                            "end": 2880
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
                                    "start": 2882,
                                    "end": 2888
                                }
                            },
                            "loc": {
                                "start": 2882,
                                "end": 2888
                            }
                        },
                        "loc": {
                            "start": 2882,
                            "end": 2889
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2864,
                        "end": 2889
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "slippage",
                        "loc": {
                            "start": 2893,
                            "end": 2901
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 2903,
                                "end": 2906
                            }
                        },
                        "loc": {
                            "start": 2903,
                            "end": 2906
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2893,
                        "end": 2906
                    }
                }
            ],
            "loc": {
                "start": 2820,
                "end": 2909
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "YieldSource",
                "loc": {
                    "start": 2951,
                    "end": 2962
                }
            },
            "interfaces": [],
            "directives": [],
            "fields": [
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Yearn",
                        "block": false,
                        "loc": {
                            "start": 2968,
                            "end": 2975
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "name",
                        "loc": {
                            "start": 2979,
                            "end": 2983
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
                                    "start": 2985,
                                    "end": 2987
                                }
                            },
                            "loc": {
                                "start": 2985,
                                "end": 2987
                            }
                        },
                        "loc": {
                            "start": 2985,
                            "end": 2988
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2968,
                        "end": 2988
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pricePerShare",
                        "loc": {
                            "start": 3045,
                            "end": 3058
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3060,
                                "end": 3066
                            }
                        },
                        "loc": {
                            "start": 3060,
                            "end": 3066
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3045,
                        "end": 3066
                    }
                }
            ],
            "loc": {
                "start": 2946,
                "end": 3069
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 3071
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
