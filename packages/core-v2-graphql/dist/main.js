var $bsQ4Z$graphqltoolsschema = require("@graphql-tools/schema");
var $bsQ4Z$elementficorev2sdk = require("@elementfi/core-v2-sdk");

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

$parcel$export(module.exports, "elementSchema", () => $3ef651e6b17f096e$export$fa0cb4b40fa0e479);
$parcel$export(module.exports, "elementGraph", () => $3ef651e6b17f096e$export$1c8bebe1abbf7283);


const $e3560cee69deb57e$export$f62412552be5daf2 = {
    Query: {
        multiTerm: (_, { address: address , yieldSource: yieldSource  }, { elementContext: elementContext  })=>{
            if (address) return new (0, $bsQ4Z$elementficorev2sdk.MultiTerm)(address, elementContext);
            else yieldSource;
            return null;
        },
        term: async (_, { multiTerm: multiTermAddress , maturity: maturity  }, { elementContext: elementContext  })=>{
            const term = await new (0, $bsQ4Z$elementficorev2sdk.MultiTerm)(multiTermAddress, elementContext).getTerm(+maturity);
            if (term) {
                const { id: idNumber , maturityDate: maturityDate , multiTerm: multiTerm  } = term;
                const maturity = maturityDate.getTime();
                const id = idNumber.toString();
                return {
                    id: id,
                    multiTerm: multiTerm,
                    maturity: maturity,
                    principalToken: {
                        id: id,
                        maturity: maturity
                    }
                };
            }
            return null;
        },
        // terms: (_, { yieldSource: yieldSourceName }, context) => {
        // },
        multiPool: (_, { address: address , yieldSource: yieldSource  }, { elementContext: elementContext  })=>{
            if (address) return new (0, $bsQ4Z$elementficorev2sdk.MultiPool)(address, elementContext);
            else yieldSource;
            return null;
        },
        pool: async (_, { multiPool: multiPoolAddress , maturity: maturity  }, { elementContext: elementContext  })=>{
            const pool = await new (0, $bsQ4Z$elementficorev2sdk.MultiPool)(multiPoolAddress, elementContext).getPool(+maturity);
            if (pool) {
                const { id: idNumber , maturityDate: maturityDate , multiPool: multiPool  } = pool;
                const maturity = maturityDate.getTime();
                const id = idNumber.toString();
                return {
                    id: id,
                    multiPool: multiPool,
                    maturity: maturity,
                    lpToken: {
                        id: id,
                        maturity: maturity
                    },
                    principalToken: {
                        id: id,
                        maturity: maturity
                    }
                };
            }
            return null;
        },
        token: async (_, { address: address  })=>{
            return {
                address: address
            };
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
        balanceOf: (token, { owner: owner  }, { elementContext: elementContext  })=>{
            return new (0, $bsQ4Z$elementficorev2sdk.Token)(token.address, elementContext).getBalanceOf(owner);
        },
        allowance: async (token, { owner: owner , spender: spender  }, { elementContext: elementContext  })=>{
            return new (0, $bsQ4Z$elementficorev2sdk.Token)(token.address, elementContext).getAllowance(owner, spender);
        }
    }
};



function $86c186efb47d8d61$export$54fae1269cb9a9e0({ chainId: chainId , provider: provider  }) {
    return {
        elementContext: new (0, $bsQ4Z$elementficorev2sdk.ElementContext)({
            chainId: chainId,
            provider: provider
        })
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
                                        "value": "Int",
                                        "loc": {
                                            "start": 419,
                                            "end": 422
                                        }
                                    },
                                    "loc": {
                                        "start": 419,
                                        "end": 422
                                    }
                                },
                                "loc": {
                                    "start": 419,
                                    "end": 423
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 409,
                                "end": 423
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Term",
                            "loc": {
                                "start": 426,
                                "end": 430
                            }
                        },
                        "loc": {
                            "start": 426,
                            "end": 430
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 388,
                        "end": 430
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "terms",
                        "loc": {
                            "start": 433,
                            "end": 438
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "baseAssets",
                                "loc": {
                                    "start": 444,
                                    "end": 454
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
                                                "start": 457,
                                                "end": 459
                                            }
                                        },
                                        "loc": {
                                            "start": 457,
                                            "end": 459
                                        }
                                    },
                                    "loc": {
                                        "start": 457,
                                        "end": 460
                                    }
                                },
                                "loc": {
                                    "start": 456,
                                    "end": 461
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 444,
                                "end": 461
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "multiTerms",
                                "loc": {
                                    "start": 466,
                                    "end": 476
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
                                                "start": 479,
                                                "end": 481
                                            }
                                        },
                                        "loc": {
                                            "start": 479,
                                            "end": 481
                                        }
                                    },
                                    "loc": {
                                        "start": 479,
                                        "end": 482
                                    }
                                },
                                "loc": {
                                    "start": 478,
                                    "end": 483
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 466,
                                "end": 483
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "yieldSources",
                                "loc": {
                                    "start": 488,
                                    "end": 500
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
                                                "start": 503,
                                                "end": 505
                                            }
                                        },
                                        "loc": {
                                            "start": 503,
                                            "end": 505
                                        }
                                    },
                                    "loc": {
                                        "start": 503,
                                        "end": 506
                                    }
                                },
                                "loc": {
                                    "start": 502,
                                    "end": 507
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 488,
                                "end": 507
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "timeRemaining",
                                "loc": {
                                    "start": 512,
                                    "end": 525
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "String",
                                    "loc": {
                                        "start": 527,
                                        "end": 533
                                    }
                                },
                                "loc": {
                                    "start": 527,
                                    "end": 533
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 512,
                                "end": 533
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "holders",
                                "loc": {
                                    "start": 538,
                                    "end": 545
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
                                                "start": 548,
                                                "end": 550
                                            }
                                        },
                                        "loc": {
                                            "start": 548,
                                            "end": 550
                                        }
                                    },
                                    "loc": {
                                        "start": 548,
                                        "end": 551
                                    }
                                },
                                "loc": {
                                    "start": 547,
                                    "end": 552
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 538,
                                "end": 552
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
                                    "start": 559,
                                    "end": 563
                                }
                            },
                            "loc": {
                                "start": 559,
                                "end": 563
                            }
                        },
                        "loc": {
                            "start": 558,
                            "end": 564
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 433,
                        "end": 564
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "multiPool",
                        "loc": {
                            "start": 568,
                            "end": 577
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 578,
                                    "end": 585
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "ID",
                                    "loc": {
                                        "start": 587,
                                        "end": 589
                                    }
                                },
                                "loc": {
                                    "start": 587,
                                    "end": 589
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 578,
                                "end": 589
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "yieldSource",
                                "loc": {
                                    "start": 591,
                                    "end": 602
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
                                            "start": 604,
                                            "end": 606
                                        }
                                    },
                                    "loc": {
                                        "start": 604,
                                        "end": 606
                                    }
                                },
                                "loc": {
                                    "start": 604,
                                    "end": 607
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 591,
                                "end": 607
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "MultiPool",
                            "loc": {
                                "start": 610,
                                "end": 619
                            }
                        },
                        "loc": {
                            "start": 610,
                            "end": 619
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 568,
                        "end": 619
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Look up the pool for a given maturity date",
                        "block": false,
                        "loc": {
                            "start": 622,
                            "end": 666
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "pool",
                        "loc": {
                            "start": 669,
                            "end": 673
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "multiPool",
                                "loc": {
                                    "start": 674,
                                    "end": 683
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
                                            "start": 685,
                                            "end": 687
                                        }
                                    },
                                    "loc": {
                                        "start": 685,
                                        "end": 687
                                    }
                                },
                                "loc": {
                                    "start": 685,
                                    "end": 688
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 674,
                                "end": 688
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "maturity",
                                "loc": {
                                    "start": 690,
                                    "end": 698
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "Int",
                                        "loc": {
                                            "start": 700,
                                            "end": 703
                                        }
                                    },
                                    "loc": {
                                        "start": 700,
                                        "end": 703
                                    }
                                },
                                "loc": {
                                    "start": 700,
                                    "end": 704
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 690,
                                "end": 704
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Pool",
                            "loc": {
                                "start": 707,
                                "end": 711
                            }
                        },
                        "loc": {
                            "start": 707,
                            "end": 711
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 622,
                        "end": 711
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pools",
                        "loc": {
                            "start": 714,
                            "end": 719
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "multiPool",
                                "loc": {
                                    "start": 720,
                                    "end": 729
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
                                            "start": 731,
                                            "end": 733
                                        }
                                    },
                                    "loc": {
                                        "start": 731,
                                        "end": 733
                                    }
                                },
                                "loc": {
                                    "start": 731,
                                    "end": 734
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 720,
                                "end": 734
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
                                    "start": 738,
                                    "end": 742
                                }
                            },
                            "loc": {
                                "start": 738,
                                "end": 742
                            }
                        },
                        "loc": {
                            "start": 737,
                            "end": 743
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 714,
                        "end": 743
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "token",
                        "loc": {
                            "start": 747,
                            "end": 752
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "address",
                                "loc": {
                                    "start": 753,
                                    "end": 760
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
                                            "start": 762,
                                            "end": 764
                                        }
                                    },
                                    "loc": {
                                        "start": 762,
                                        "end": 764
                                    }
                                },
                                "loc": {
                                    "start": 762,
                                    "end": 765
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 753,
                                "end": 765
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 768,
                                "end": 773
                            }
                        },
                        "loc": {
                            "start": 768,
                            "end": 773
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 747,
                        "end": 773
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "tokens",
                        "loc": {
                            "start": 776,
                            "end": 782
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "addresses",
                                "loc": {
                                    "start": 783,
                                    "end": 792
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
                                                "start": 795,
                                                "end": 797
                                            }
                                        },
                                        "loc": {
                                            "start": 795,
                                            "end": 797
                                        }
                                    },
                                    "loc": {
                                        "start": 795,
                                        "end": 798
                                    }
                                },
                                "loc": {
                                    "start": 794,
                                    "end": 799
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 783,
                                "end": 799
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 802,
                                "end": 807
                            }
                        },
                        "loc": {
                            "start": 802,
                            "end": 807
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 776,
                        "end": 807
                    }
                }
            ],
            "loc": {
                "start": 0,
                "end": 976
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "MultiTerm",
                "loc": {
                    "start": 983,
                    "end": 992
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
                            "start": 997,
                            "end": 1073
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "address",
                        "loc": {
                            "start": 1076,
                            "end": 1083
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
                                    "start": 1085,
                                    "end": 1087
                                }
                            },
                            "loc": {
                                "start": 1085,
                                "end": 1087
                            }
                        },
                        "loc": {
                            "start": 1085,
                            "end": 1088
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 997,
                        "end": 1088
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Possibly fetched from a registry",
                        "block": false,
                        "loc": {
                            "start": 1091,
                            "end": 1125
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 1128,
                            "end": 1139
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldSource",
                            "loc": {
                                "start": 1141,
                                "end": 1152
                            }
                        },
                        "loc": {
                            "start": 1141,
                            "end": 1152
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1091,
                        "end": 1152
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "The underlying token, sometimes referred to as base asset",
                        "block": false,
                        "loc": {
                            "start": 1155,
                            "end": 1214
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 1217,
                            "end": 1226
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 1228,
                                "end": 1233
                            }
                        },
                        "loc": {
                            "start": 1228,
                            "end": 1233
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1155,
                        "end": 1233
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "terms",
                        "loc": {
                            "start": 1236,
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
                                "value": "Term",
                                "loc": {
                                    "start": 1244,
                                    "end": 1248
                                }
                            },
                            "loc": {
                                "start": 1244,
                                "end": 1248
                            }
                        },
                        "loc": {
                            "start": 1243,
                            "end": 1249
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1236,
                        "end": 1249
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "pretty sure this is useful",
                        "block": false,
                        "loc": {
                            "start": 1253,
                            "end": 1281
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "tvl",
                        "loc": {
                            "start": 1284,
                            "end": 1287
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "atBlock",
                                "loc": {
                                    "start": 1288,
                                    "end": 1295
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1297,
                                        "end": 1300
                                    }
                                },
                                "loc": {
                                    "start": 1297,
                                    "end": 1300
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1288,
                                "end": 1300
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1303,
                                "end": 1309
                            }
                        },
                        "loc": {
                            "start": 1303,
                            "end": 1309
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1253,
                        "end": 1309
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "scratch space: are these useful?",
                        "block": false,
                        "loc": {
                            "start": 1313,
                            "end": 1347
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "totalVolume",
                        "loc": {
                            "start": 1350,
                            "end": 1361
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1363,
                                "end": 1369
                            }
                        },
                        "loc": {
                            "start": 1363,
                            "end": 1369
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1313,
                        "end": 1369
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "perDayVolume",
                        "loc": {
                            "start": 1372,
                            "end": 1384
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1386,
                                "end": 1392
                            }
                        },
                        "loc": {
                            "start": 1386,
                            "end": 1392
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1372,
                        "end": 1392
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "yields",
                        "loc": {
                            "start": 1395,
                            "end": 1401
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
                                    "start": 1404,
                                    "end": 1410
                                }
                            },
                            "loc": {
                                "start": 1404,
                                "end": 1410
                            }
                        },
                        "loc": {
                            "start": 1403,
                            "end": 1411
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1395,
                        "end": 1411
                    }
                }
            ],
            "loc": {
                "start": 978,
                "end": 1413
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Term",
                "loc": {
                    "start": 1420,
                    "end": 1424
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
                            "start": 1429,
                            "end": 1431
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
                                    "start": 1433,
                                    "end": 1435
                                }
                            },
                            "loc": {
                                "start": 1433,
                                "end": 1435
                            }
                        },
                        "loc": {
                            "start": 1433,
                            "end": 1436
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1429,
                        "end": 1436
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "multiTerm",
                        "loc": {
                            "start": 1439,
                            "end": 1448
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
                                    "start": 1450,
                                    "end": 1459
                                }
                            },
                            "loc": {
                                "start": 1450,
                                "end": 1459
                            }
                        },
                        "loc": {
                            "start": 1450,
                            "end": 1460
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1439,
                        "end": 1460
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Timestamp in milliseconds since unix epoch",
                        "block": false,
                        "loc": {
                            "start": 1463,
                            "end": 1507
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 1510,
                            "end": 1518
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
                                    "start": 1520,
                                    "end": 1523
                                }
                            },
                            "loc": {
                                "start": 1520,
                                "end": 1523
                            }
                        },
                        "loc": {
                            "start": 1520,
                            "end": 1524
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1463,
                        "end": 1524
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalToken",
                        "loc": {
                            "start": 1527,
                            "end": 1541
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "PrincipalToken",
                                "loc": {
                                    "start": 1543,
                                    "end": 1557
                                }
                            },
                            "loc": {
                                "start": 1543,
                                "end": 1557
                            }
                        },
                        "loc": {
                            "start": 1543,
                            "end": 1558
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1527,
                        "end": 1558
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Possibly fetched from a registry",
                        "block": false,
                        "loc": {
                            "start": 1561,
                            "end": 1595
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 1598,
                            "end": 1609
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldSource",
                            "loc": {
                                "start": 1611,
                                "end": 1622
                            }
                        },
                        "loc": {
                            "start": 1611,
                            "end": 1622
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1561,
                        "end": 1622
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 1625,
                            "end": 1634
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 1636,
                                "end": 1641
                            }
                        },
                        "loc": {
                            "start": 1636,
                            "end": 1641
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1625,
                        "end": 1641
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "startDate must be between created and maturity",
                        "block": false,
                        "loc": {
                            "start": 1644,
                            "end": 1692
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldToken",
                        "loc": {
                            "start": 1695,
                            "end": 1705
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "startDate",
                                "loc": {
                                    "start": 1706,
                                    "end": 1715
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
                                            "start": 1717,
                                            "end": 1723
                                        }
                                    },
                                    "loc": {
                                        "start": 1717,
                                        "end": 1723
                                    }
                                },
                                "loc": {
                                    "start": 1717,
                                    "end": 1724
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1706,
                                "end": 1724
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldToken",
                            "loc": {
                                "start": 1727,
                                "end": 1737
                            }
                        },
                        "loc": {
                            "start": 1727,
                            "end": 1737
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1644,
                        "end": 1737
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pool",
                        "loc": {
                            "start": 1740,
                            "end": 1744
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Pool",
                            "loc": {
                                "start": 1746,
                                "end": 1750
                            }
                        },
                        "loc": {
                            "start": 1746,
                            "end": 1750
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1740,
                        "end": 1750
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Dollar amount of deposits into the term: union(mint,LP)",
                        "block": false,
                        "loc": {
                            "start": 1753,
                            "end": 1810
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "tvl",
                        "loc": {
                            "start": 1813,
                            "end": 1816
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "atBlock",
                                "loc": {
                                    "start": 1817,
                                    "end": 1824
                                }
                            },
                            "type": {
                                "kind": "NamedType",
                                "name": {
                                    "kind": "Name",
                                    "value": "Int",
                                    "loc": {
                                        "start": 1826,
                                        "end": 1829
                                    }
                                },
                                "loc": {
                                    "start": 1826,
                                    "end": 1829
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 1817,
                                "end": 1829
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 1832,
                                "end": 1838
                            }
                        },
                        "loc": {
                            "start": 1832,
                            "end": 1838
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1753,
                        "end": 1838
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Timestamp in milliseconds since unix epoch",
                        "block": false,
                        "loc": {
                            "start": 1841,
                            "end": 1885
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "createdTimestamp",
                        "loc": {
                            "start": 1888,
                            "end": 1904
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1906,
                                "end": 1909
                            }
                        },
                        "loc": {
                            "start": 1906,
                            "end": 1909
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1841,
                        "end": 1909
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Block Int the term was created at",
                        "block": false,
                        "loc": {
                            "start": 1912,
                            "end": 1947
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "createdAtBlock",
                        "loc": {
                            "start": 1950,
                            "end": 1964
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 1966,
                                "end": 1969
                            }
                        },
                        "loc": {
                            "start": 1966,
                            "end": 1969
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 1912,
                        "end": 1969
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "variableAPY",
                        "loc": {
                            "start": 2079,
                            "end": 2090
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 2092,
                                "end": 2095
                            }
                        },
                        "loc": {
                            "start": 2092,
                            "end": 2095
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2079,
                        "end": 2095
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "fixedAPR",
                        "loc": {
                            "start": 2098,
                            "end": 2106
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 2108,
                                "end": 2111
                            }
                        },
                        "loc": {
                            "start": 2108,
                            "end": 2111
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2098,
                        "end": 2111
                    }
                }
            ],
            "loc": {
                "start": 1415,
                "end": 2113
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "YieldToken",
                "loc": {
                    "start": 2120,
                    "end": 2130
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
                            "start": 2135,
                            "end": 2137
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
                                    "start": 2139,
                                    "end": 2141
                                }
                            },
                            "loc": {
                                "start": 2139,
                                "end": 2141
                            }
                        },
                        "loc": {
                            "start": 2139,
                            "end": 2142
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2135,
                        "end": 2142
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "startDate",
                        "loc": {
                            "start": 2145,
                            "end": 2154
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
                                    "start": 2156,
                                    "end": 2162
                                }
                            },
                            "loc": {
                                "start": 2156,
                                "end": 2162
                            }
                        },
                        "loc": {
                            "start": 2156,
                            "end": 2163
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2145,
                        "end": 2163
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 2166,
                            "end": 2174
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
                                    "start": 2176,
                                    "end": 2179
                                }
                            },
                            "loc": {
                                "start": 2176,
                                "end": 2179
                            }
                        },
                        "loc": {
                            "start": 2176,
                            "end": 2180
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2166,
                        "end": 2180
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "term",
                        "loc": {
                            "start": 2183,
                            "end": 2187
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Term",
                            "loc": {
                                "start": 2189,
                                "end": 2193
                            }
                        },
                        "loc": {
                            "start": 2189,
                            "end": 2193
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2183,
                        "end": 2193
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "accruedInterest",
                        "loc": {
                            "start": 2196,
                            "end": 2211
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2213,
                                "end": 2219
                            }
                        },
                        "loc": {
                            "start": 2213,
                            "end": 2219
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2196,
                        "end": 2219
                    }
                }
            ],
            "loc": {
                "start": 2115,
                "end": 2221
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "PrincipalToken",
                "loc": {
                    "start": 2228,
                    "end": 2242
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
                            "start": 2247,
                            "end": 2249
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
                                    "start": 2251,
                                    "end": 2253
                                }
                            },
                            "loc": {
                                "start": 2251,
                                "end": 2253
                            }
                        },
                        "loc": {
                            "start": 2251,
                            "end": 2254
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2247,
                        "end": 2254
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 2257,
                            "end": 2265
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
                                    "start": 2267,
                                    "end": 2270
                                }
                            },
                            "loc": {
                                "start": 2267,
                                "end": 2270
                            }
                        },
                        "loc": {
                            "start": 2267,
                            "end": 2271
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2257,
                        "end": 2271
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "term",
                        "loc": {
                            "start": 2274,
                            "end": 2278
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Term",
                            "loc": {
                                "start": 2280,
                                "end": 2284
                            }
                        },
                        "loc": {
                            "start": 2280,
                            "end": 2284
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2274,
                        "end": 2284
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "the token this principal token will resolve 1 to 1 to.",
                        "block": false,
                        "loc": {
                            "start": 2370,
                            "end": 2426
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 2429,
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
                        "start": 2370,
                        "end": 2445
                    }
                }
            ],
            "loc": {
                "start": 2223,
                "end": 2447
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Token",
                "loc": {
                    "start": 2454,
                    "end": 2459
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
                            "start": 2464,
                            "end": 2471
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
                                    "start": 2473,
                                    "end": 2475
                                }
                            },
                            "loc": {
                                "start": 2473,
                                "end": 2475
                            }
                        },
                        "loc": {
                            "start": 2473,
                            "end": 2476
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2464,
                        "end": 2476
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "symbol",
                        "loc": {
                            "start": 2479,
                            "end": 2485
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2487,
                                "end": 2493
                            }
                        },
                        "loc": {
                            "start": 2487,
                            "end": 2493
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2479,
                        "end": 2493
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "decimals",
                        "loc": {
                            "start": 2496,
                            "end": 2504
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2506,
                                "end": 2512
                            }
                        },
                        "loc": {
                            "start": 2506,
                            "end": 2512
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2496,
                        "end": 2512
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "name",
                        "loc": {
                            "start": 2515,
                            "end": 2519
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2521,
                                "end": 2527
                            }
                        },
                        "loc": {
                            "start": 2521,
                            "end": 2527
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2515,
                        "end": 2527
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "price",
                        "loc": {
                            "start": 2530,
                            "end": 2535
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2537,
                                "end": 2543
                            }
                        },
                        "loc": {
                            "start": 2537,
                            "end": 2543
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2530,
                        "end": 2543
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "allowance",
                        "loc": {
                            "start": 2546,
                            "end": 2555
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "owner",
                                "loc": {
                                    "start": 2556,
                                    "end": 2561
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
                                            "start": 2563,
                                            "end": 2569
                                        }
                                    },
                                    "loc": {
                                        "start": 2563,
                                        "end": 2569
                                    }
                                },
                                "loc": {
                                    "start": 2563,
                                    "end": 2570
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2556,
                                "end": 2570
                            }
                        },
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "spender",
                                "loc": {
                                    "start": 2572,
                                    "end": 2579
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
                                            "start": 2581,
                                            "end": 2587
                                        }
                                    },
                                    "loc": {
                                        "start": 2581,
                                        "end": 2587
                                    }
                                },
                                "loc": {
                                    "start": 2581,
                                    "end": 2588
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2572,
                                "end": 2588
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2591,
                                "end": 2597
                            }
                        },
                        "loc": {
                            "start": 2591,
                            "end": 2597
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2546,
                        "end": 2597
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "balanceOf",
                        "loc": {
                            "start": 2600,
                            "end": 2609
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "owner",
                                "loc": {
                                    "start": 2610,
                                    "end": 2615
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
                                            "start": 2617,
                                            "end": 2623
                                        }
                                    },
                                    "loc": {
                                        "start": 2617,
                                        "end": 2623
                                    }
                                },
                                "loc": {
                                    "start": 2617,
                                    "end": 2624
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2610,
                                "end": 2624
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 2627,
                                "end": 2633
                            }
                        },
                        "loc": {
                            "start": 2627,
                            "end": 2633
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2600,
                        "end": 2633
                    }
                }
            ],
            "loc": {
                "start": 2449,
                "end": 2635
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "MultiPool",
                "loc": {
                    "start": 2642,
                    "end": 2651
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
                            "start": 2656,
                            "end": 2663
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
                                    "start": 2665,
                                    "end": 2667
                                }
                            },
                            "loc": {
                                "start": 2665,
                                "end": 2667
                            }
                        },
                        "loc": {
                            "start": 2665,
                            "end": 2668
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2656,
                        "end": 2668
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "Possibly fetched from a registry",
                        "block": false,
                        "loc": {
                            "start": 2671,
                            "end": 2705
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 2708,
                            "end": 2719
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldSource",
                            "loc": {
                                "start": 2721,
                                "end": 2732
                            }
                        },
                        "loc": {
                            "start": 2721,
                            "end": 2732
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2671,
                        "end": 2732
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pool",
                        "loc": {
                            "start": 2735,
                            "end": 2739
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "maturity",
                                "loc": {
                                    "start": 2740,
                                    "end": 2748
                                }
                            },
                            "type": {
                                "kind": "NonNullType",
                                "type": {
                                    "kind": "NamedType",
                                    "name": {
                                        "kind": "Name",
                                        "value": "Int",
                                        "loc": {
                                            "start": 2750,
                                            "end": 2753
                                        }
                                    },
                                    "loc": {
                                        "start": 2750,
                                        "end": 2753
                                    }
                                },
                                "loc": {
                                    "start": 2750,
                                    "end": 2754
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 2740,
                                "end": 2754
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Pool",
                            "loc": {
                                "start": 2757,
                                "end": 2761
                            }
                        },
                        "loc": {
                            "start": 2757,
                            "end": 2761
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2735,
                        "end": 2761
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pools",
                        "loc": {
                            "start": 2764,
                            "end": 2769
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
                                    "start": 2772,
                                    "end": 2776
                                }
                            },
                            "loc": {
                                "start": 2772,
                                "end": 2776
                            }
                        },
                        "loc": {
                            "start": 2771,
                            "end": 2777
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2764,
                        "end": 2777
                    }
                }
            ],
            "loc": {
                "start": 2637,
                "end": 2779
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "Pool",
                "loc": {
                    "start": 2786,
                    "end": 2790
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
                            "start": 2795,
                            "end": 2797
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
                                    "start": 2799,
                                    "end": 2801
                                }
                            },
                            "loc": {
                                "start": 2799,
                                "end": 2801
                            }
                        },
                        "loc": {
                            "start": 2799,
                            "end": 2802
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2795,
                        "end": 2802
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "multiPool",
                        "loc": {
                            "start": 2805,
                            "end": 2814
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
                                    "start": 2816,
                                    "end": 2825
                                }
                            },
                            "loc": {
                                "start": 2816,
                                "end": 2825
                            }
                        },
                        "loc": {
                            "start": 2816,
                            "end": 2826
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2805,
                        "end": 2826
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 2829,
                            "end": 2837
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
                                    "start": 2839,
                                    "end": 2842
                                }
                            },
                            "loc": {
                                "start": 2839,
                                "end": 2842
                            }
                        },
                        "loc": {
                            "start": 2839,
                            "end": 2843
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2829,
                        "end": 2843
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "lpToken",
                        "loc": {
                            "start": 2884,
                            "end": 2891
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "LPToken",
                                "loc": {
                                    "start": 2893,
                                    "end": 2900
                                }
                            },
                            "loc": {
                                "start": 2893,
                                "end": 2900
                            }
                        },
                        "loc": {
                            "start": 2893,
                            "end": 2901
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2884,
                        "end": 2901
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalToken",
                        "loc": {
                            "start": 2904,
                            "end": 2918
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NonNullType",
                        "type": {
                            "kind": "NamedType",
                            "name": {
                                "kind": "Name",
                                "value": "PrincipalToken",
                                "loc": {
                                    "start": 2920,
                                    "end": 2934
                                }
                            },
                            "loc": {
                                "start": 2920,
                                "end": 2934
                            }
                        },
                        "loc": {
                            "start": 2920,
                            "end": 2935
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2904,
                        "end": 2935
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "yieldSource",
                        "loc": {
                            "start": 2938,
                            "end": 2949
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "YieldSource",
                            "loc": {
                                "start": 2951,
                                "end": 2962
                            }
                        },
                        "loc": {
                            "start": 2951,
                            "end": 2962
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2938,
                        "end": 2962
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAsset",
                        "loc": {
                            "start": 2974,
                            "end": 2983
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 2985,
                                "end": 2990
                            }
                        },
                        "loc": {
                            "start": 2985,
                            "end": 2990
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2974,
                        "end": 2990
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAssetReserves",
                        "loc": {
                            "start": 2993,
                            "end": 3010
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3012,
                                "end": 3018
                            }
                        },
                        "loc": {
                            "start": 3012,
                            "end": 3018
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 2993,
                        "end": 3018
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "shareAsset",
                        "loc": {
                            "start": 3051,
                            "end": 3061
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Token",
                            "loc": {
                                "start": 3063,
                                "end": 3068
                            }
                        },
                        "loc": {
                            "start": 3063,
                            "end": 3068
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3051,
                        "end": 3068
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "shareAssetReserves",
                        "loc": {
                            "start": 3071,
                            "end": 3089
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3091,
                                "end": 3097
                            }
                        },
                        "loc": {
                            "start": 3091,
                            "end": 3097
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3071,
                        "end": 3097
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalTokenReserves",
                        "loc": {
                            "start": 3100,
                            "end": 3122
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3124,
                                "end": 3130
                            }
                        },
                        "loc": {
                            "start": 3124,
                            "end": 3130
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3100,
                        "end": 3130
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "price",
                        "loc": {
                            "start": 3174,
                            "end": 3179
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3181,
                                "end": 3187
                            }
                        },
                        "loc": {
                            "start": 3181,
                            "end": 3187
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3174,
                        "end": 3187
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "priceFiat",
                        "loc": {
                            "start": 3190,
                            "end": 3199
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3201,
                                "end": 3207
                            }
                        },
                        "loc": {
                            "start": 3201,
                            "end": 3207
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3190,
                        "end": 3207
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "term",
                        "loc": {
                            "start": 3210,
                            "end": 3214
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Term",
                            "loc": {
                                "start": 3216,
                                "end": 3220
                            }
                        },
                        "loc": {
                            "start": 3216,
                            "end": 3220
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3210,
                        "end": 3220
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "tvl",
                        "loc": {
                            "start": 3223,
                            "end": 3226
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3228,
                                "end": 3234
                            }
                        },
                        "loc": {
                            "start": 3228,
                            "end": 3234
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3223,
                        "end": 3234
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "buyPreview",
                        "loc": {
                            "start": 3237,
                            "end": 3247
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "baseAssetAmountIn",
                                "loc": {
                                    "start": 3248,
                                    "end": 3265
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
                                            "start": 3267,
                                            "end": 3273
                                        }
                                    },
                                    "loc": {
                                        "start": 3267,
                                        "end": 3273
                                    }
                                },
                                "loc": {
                                    "start": 3267,
                                    "end": 3274
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 3248,
                                "end": 3274
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "BuySwapPreview",
                            "loc": {
                                "start": 3277,
                                "end": 3291
                            }
                        },
                        "loc": {
                            "start": 3277,
                            "end": 3291
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3237,
                        "end": 3291
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "sellPreview",
                        "loc": {
                            "start": 3294,
                            "end": 3305
                        }
                    },
                    "arguments": [
                        {
                            "kind": "InputValueDefinition",
                            "name": {
                                "kind": "Name",
                                "value": "principalAmountTokenIn",
                                "loc": {
                                    "start": 3306,
                                    "end": 3328
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
                                            "start": 3330,
                                            "end": 3336
                                        }
                                    },
                                    "loc": {
                                        "start": 3330,
                                        "end": 3336
                                    }
                                },
                                "loc": {
                                    "start": 3330,
                                    "end": 3337
                                }
                            },
                            "directives": [],
                            "loc": {
                                "start": 3306,
                                "end": 3337
                            }
                        }
                    ],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "SellSwapPreview",
                            "loc": {
                                "start": 3340,
                                "end": 3355
                            }
                        },
                        "loc": {
                            "start": 3340,
                            "end": 3355
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3294,
                        "end": 3355
                    }
                }
            ],
            "loc": {
                "start": 2781,
                "end": 3357
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "LPToken",
                "loc": {
                    "start": 3364,
                    "end": 3371
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
                            "start": 3376,
                            "end": 3378
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
                                    "start": 3380,
                                    "end": 3382
                                }
                            },
                            "loc": {
                                "start": 3380,
                                "end": 3382
                            }
                        },
                        "loc": {
                            "start": 3380,
                            "end": 3383
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3376,
                        "end": 3383
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "maturity",
                        "loc": {
                            "start": 3386,
                            "end": 3394
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
                                    "start": 3396,
                                    "end": 3399
                                }
                            },
                            "loc": {
                                "start": 3396,
                                "end": 3399
                            }
                        },
                        "loc": {
                            "start": 3396,
                            "end": 3400
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3386,
                        "end": 3400
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "pool",
                        "loc": {
                            "start": 3403,
                            "end": 3407
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Pool",
                            "loc": {
                                "start": 3409,
                                "end": 3413
                            }
                        },
                        "loc": {
                            "start": 3409,
                            "end": 3413
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3403,
                        "end": 3413
                    }
                }
            ],
            "loc": {
                "start": 3359,
                "end": 3415
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "BuySwapPreview",
                "loc": {
                    "start": 3422,
                    "end": 3436
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
                            "start": 3441,
                            "end": 3458
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
                                    "start": 3460,
                                    "end": 3466
                                }
                            },
                            "loc": {
                                "start": 3460,
                                "end": 3466
                            }
                        },
                        "loc": {
                            "start": 3460,
                            "end": 3467
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3441,
                        "end": 3467
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "principalTokenAmountOut",
                        "loc": {
                            "start": 3470,
                            "end": 3493
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
                                    "start": 3495,
                                    "end": 3501
                                }
                            },
                            "loc": {
                                "start": 3495,
                                "end": 3501
                            }
                        },
                        "loc": {
                            "start": 3495,
                            "end": 3502
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3470,
                        "end": 3502
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "slippage",
                        "loc": {
                            "start": 3505,
                            "end": 3513
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 3515,
                                "end": 3518
                            }
                        },
                        "loc": {
                            "start": 3515,
                            "end": 3518
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3505,
                        "end": 3518
                    }
                }
            ],
            "loc": {
                "start": 3417,
                "end": 3520
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "SellSwapPreview",
                "loc": {
                    "start": 3526,
                    "end": 3541
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
                            "start": 3546,
                            "end": 3568
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
                                    "start": 3570,
                                    "end": 3576
                                }
                            },
                            "loc": {
                                "start": 3570,
                                "end": 3576
                            }
                        },
                        "loc": {
                            "start": 3570,
                            "end": 3577
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3546,
                        "end": 3577
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "baseAssetAmountOut",
                        "loc": {
                            "start": 3580,
                            "end": 3598
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
                                    "start": 3600,
                                    "end": 3606
                                }
                            },
                            "loc": {
                                "start": 3600,
                                "end": 3606
                            }
                        },
                        "loc": {
                            "start": 3600,
                            "end": 3607
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3580,
                        "end": 3607
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "slippage",
                        "loc": {
                            "start": 3610,
                            "end": 3618
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "Int",
                            "loc": {
                                "start": 3620,
                                "end": 3623
                            }
                        },
                        "loc": {
                            "start": 3620,
                            "end": 3623
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3610,
                        "end": 3623
                    }
                }
            ],
            "loc": {
                "start": 3521,
                "end": 3625
            }
        },
        {
            "kind": "ObjectTypeDefinition",
            "name": {
                "kind": "Name",
                "value": "YieldSource",
                "loc": {
                    "start": 3664,
                    "end": 3675
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
                            "start": 3702,
                            "end": 3709
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
                                    "start": 3711,
                                    "end": 3713
                                }
                            },
                            "loc": {
                                "start": 3711,
                                "end": 3713
                            }
                        },
                        "loc": {
                            "start": 3711,
                            "end": 3714
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3702,
                        "end": 3714
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "protocol",
                        "loc": {
                            "start": 3728,
                            "end": 3736
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
                                    "start": 3738,
                                    "end": 3744
                                }
                            },
                            "loc": {
                                "start": 3738,
                                "end": 3744
                            }
                        },
                        "loc": {
                            "start": 3738,
                            "end": 3745
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3728,
                        "end": 3745
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "name": {
                        "kind": "Name",
                        "value": "name",
                        "loc": {
                            "start": 3770,
                            "end": 3774
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
                                    "start": 3776,
                                    "end": 3782
                                }
                            },
                            "loc": {
                                "start": 3776,
                                "end": 3782
                            }
                        },
                        "loc": {
                            "start": 3776,
                            "end": 3783
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3770,
                        "end": 3783
                    }
                },
                {
                    "kind": "FieldDefinition",
                    "description": {
                        "kind": "StringValue",
                        "value": "placeholder for more yield source specific data",
                        "block": false,
                        "loc": {
                            "start": 3787,
                            "end": 3836
                        }
                    },
                    "name": {
                        "kind": "Name",
                        "value": "pricePerShare",
                        "loc": {
                            "start": 3839,
                            "end": 3852
                        }
                    },
                    "arguments": [],
                    "type": {
                        "kind": "NamedType",
                        "name": {
                            "kind": "Name",
                            "value": "String",
                            "loc": {
                                "start": 3854,
                                "end": 3860
                            }
                        },
                        "loc": {
                            "start": 3854,
                            "end": 3860
                        }
                    },
                    "directives": [],
                    "loc": {
                        "start": 3787,
                        "end": 3860
                    }
                }
            ],
            "loc": {
                "start": 3659,
                "end": 3862
            }
        }
    ],
    "loc": {
        "start": 0,
        "end": 3863
    }
};


var $9eb03ae14d56e618$exports = {};


const $3ef651e6b17f096e$export$fa0cb4b40fa0e479 = (0, $bsQ4Z$graphqltoolsschema.makeExecutableSchema)({
    resolvers: $e3560cee69deb57e$export$f62412552be5daf2,
    typeDefs: (/*@__PURE__*/$parcel$interopDefault($829ad87c37a8c45d$exports))
});
const $3ef651e6b17f096e$export$1c8bebe1abbf7283 = {
    schema: $3ef651e6b17f096e$export$fa0cb4b40fa0e479,
    initContext: $86c186efb47d8d61$export$54fae1269cb9a9e0
};
$parcel$exportWildcard(module.exports, $9eb03ae14d56e618$exports);


//# sourceMappingURL=main.js.map
