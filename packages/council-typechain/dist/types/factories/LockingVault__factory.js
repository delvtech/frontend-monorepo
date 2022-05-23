"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== "function" && b !== null)
        throw new TypeError(
          "Class extends value " + String(b) + " is not a constructor or null",
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockingVault__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
  {
    inputs: [
      {
        internalType: "contract IERC20",
        name: "_token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_staleBlockLag",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "int256",
        name: "amount",
        type: "int256",
      },
    ],
    name: "VoteChange",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newDelegate",
        type: "address",
      },
    ],
    name: "changeDelegation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "fundedAccount",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "firstDelegation",
        type: "address",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "who",
        type: "address",
      },
    ],
    name: "deposits",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint96",
        name: "",
        type: "uint96",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "queryVotePower",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "blockNumber",
        type: "uint256",
      },
    ],
    name: "queryVotePowerView",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "staleBlockLag",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
var _bytecode =
  "0x60c060405234801561001057600080fd5b5060405161144d38038061144d83398101604081905261002f9161004a565b60609190911b6001600160601b03191660805260a052610082565b6000806040838503121561005c578182fd5b82516001600160a01b0381168114610072578283fd5b6020939093015192949293505050565b60805160601c60a05161138f6100be6000396000818160ba015261059d01526000818161012d015281816103300152610692015261138f6000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063e91f32351161005b578063e91f323514610102578063f45346dc14610115578063fc0c546a14610128578063fc7e286d1461017457610088565b80632e1a7d4d1461008d5780639f973fd5146100a2578063c2c94b88146100b5578063e7d20283146100ef575b600080fd5b6100a061009b366004611150565b6101c0565b005b6100a06100b0366004611029565b6103c9565b6100dc7f000000000000000000000000000000000000000000000000000000000000000081565b6040519081526020015b60405180910390f35b6100dc6100fd36600461104a565b610564565b6100dc6101103660046110ae565b610586565b6100a0610123366004611073565b6105d5565b61014f7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100e6565b610187610182366004611029565b61090f565b6040805173ffffffffffffffffffffffffffffffffffffffff90931683526bffffffffffffffffffffffff9091166020830152016100e6565b60006101ca610976565b336000908152602091909152604090208054909150829082906014906102179084907401000000000000000000000000000000000000000090046bffffffffffffffffffffffff166112fd565b82546bffffffffffffffffffffffff9182166101009390930a928302919092021990911617905550805473ffffffffffffffffffffffffffffffffffffffff1660006102616109bb565b9050600061026f8284610a0e565b90506102878361027f87846112e6565b849190610aaf565b73ffffffffffffffffffffffffffffffffffffffff8316337f33161cf2da28d747be9df136b6f3729390298494947268743193c53d73d3c2e06102ea887fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff61122e565b60405190815260200160405180910390a36040517fa9059cbb000000000000000000000000000000000000000000000000000000008152336004820152602481018690527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff169063a9059cbb90604401602060405180830381600087803b15801561038957600080fd5b505af115801561039d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103c19190611130565b505050505050565b60006103d3610976565b33600090815260209190915260408120805473ffffffffffffffffffffffffffffffffffffffff8581167fffffffffffffffffffffffff000000000000000000000000000000000000000083161783559193506bffffffffffffffffffffffff74010000000000000000000000000000000000000000820416929116906104586109bb565b905060006104668284610a0e565b90506104768361027f86846112e6565b73ffffffffffffffffffffffffffffffffffffffff8316337f33161cf2da28d747be9df136b6f3729390298494947268743193c53d73d3c2e06104d9877fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff61122e565b60405190815260200160405180910390a360006104f68388610a0e565b905061050e8761050687846111ad565b859190610aaf565b60405185815273ffffffffffffffffffffffffffffffffffffffff88169033907f33161cf2da28d747be9df136b6f3729390298494947268743193c53d73d3c2e09060200160405180910390a350505050505050565b60008061056f6109bb565b905061057c818585610bee565b9150505b92915050565b6000806105916109bb565b90506105cb86866105c27f0000000000000000000000000000000000000000000000000000000000000000436112e6565b84929190610c5d565b9695505050505050565b73ffffffffffffffffffffffffffffffffffffffff8116610657576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f5a65726f20616464722064656c65676174696f6e00000000000000000000000060448201526064015b60405180910390fd5b6040517f23b872dd000000000000000000000000000000000000000000000000000000008152336004820152306024820152604481018390527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16906323b872dd90606401602060405180830381600087803b1580156106eb57600080fd5b505af11580156106ff573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107239190611130565b50600061072e610976565b73ffffffffffffffffffffffffffffffffffffffff808616600090815260209290925260409091208054909250168061080e575080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff8316178082558290849083906014906107db9084907401000000000000000000000000000000000000000090046bffffffffffffffffffffffff166111c5565b92506101000a8154816bffffffffffffffffffffffff02191690836bffffffffffffffffffffffff160217905550610877565b8154849083906014906108489084907401000000000000000000000000000000000000000090046bffffffffffffffffffffffff166111c5565b92506101000a8154816bffffffffffffffffffffffff02191690836bffffffffffffffffffffffff1602179055505b60006108816109bb565b9050600061088f8284610a0e565b90508273ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff167f33161cf2da28d747be9df136b6f3729390298494947268743193c53d73d3c2e0886040516108f091815260200190565b60405180910390a36109068361027f88846111ad565b50505050505050565b600080600061091c610976565b73ffffffffffffffffffffffffffffffffffffffff9485166000908152602091909152604090205493841694740100000000000000000000000000000000000000009094046bffffffffffffffffffffffff169392505050565b60006109b66040518060400160405280600881526020017f6465706f73697473000000000000000000000000000000000000000000000000815250610ce1565b905090565b6040805180820190915260608152600060208201526109b66040518060400160405280600b81526020017f766f74696e67506f776572000000000000000000000000000000000000000000815250610d5a565b600080610a1c846020015190565b73ffffffffffffffffffffffffffffffffffffffff841660009081526020919091526040902080549091506fffffffffffffffffffffffffffffffff1680610a6957600092505050610580565b6000610aa483610a7a6001856112e6565b016001015460c081901c9177ffffffffffffffffffffffffffffffffffffffffffffffff90911690565b979650505050505050565b77ffffffffffffffffffffffffffffffffffffffffffffffff811115610b31576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600360248201527f4f6f420000000000000000000000000000000000000000000000000000000000604482015260640161064e565b6000610b3e846020015190565b73ffffffffffffffffffffffffffffffffffffffff841660009081526020829052604081208054929350914360c01b9185831791608081901c916fffffffffffffffffffffffffffffffff909116908115610ba657610ba286610a7a6001856112e6565b5090505b8143821415610bbd57610bba6001846112e6565b90505b8481600189010155438214610be157610be18785610bdc8660016111ad565b610d98565b5050505050505050505050565b600080610bfc856020015190565b73ffffffffffffffffffffffffffffffffffffffff85166000908152602082905260408120805492935091608081901c916fffffffffffffffffffffffffffffffff90911690610c4f8488838686610dc1565b9a9950505050505050505050565b600080610c6b866020015190565b73ffffffffffffffffffffffffffffffffffffffff86166000908152602082905260408120805492935091608081901c916fffffffffffffffffffffffffffffffff9091169080610cbf858a8a8787610dc1565b9150915083821115610c4f57610cd6848387610f9a565b610c4f858385610d98565b6000807f03a912cdb153207069d92d44a2357e3f0ce00f7ee84da3510f1c6851b4cac4ee905060008184604051602001610d1c929190611168565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190528051602090910120949350505050565b6040805180820190915260608152600060208201526000610d7a83610fca565b6040805180820190915284815260208101919091529150505b919050565b808210610da457600080fd5b6fffffffffffffffffffffffffffffffff1660809190911b179055565b60008082610e2b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f756e696e697469616c697a656400000000000000000000000000000000000000604482015260640161064e565b85851115610e3857600080fd5b828410610e4457600080fd5b6000610e516001856112e6565b90508460005b828214610ef55760006002610e6c85856111ad565b610e779060016111ad565b610e8191906111f5565b6001818d01015490915060c081901c9077ffffffffffffffffffffffffffffffffffffffffffffffff168b821415610ec357929650919450610f909350505050565b8b821015610edf578a821015610ed7578293505b829450610eed565b610eea6001846112e6565b95505b505050610e57565b60018a8301015460c081901c9077ffffffffffffffffffffffffffffffffffffffffffffffff168a821115610f86576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f536561726368204661696c757265000000000000000000000000000000000000604482015260640161064e565b9195509093505050505b9550959350505050565b81831115610fa757600080fd5b60018101835b83811015610fc357600082820155600101610fad565b5050505050565b6000807f7b1a68ec3e3284b167e69db1c622dcfa612281976b71d7e2d239dbe16a75891a905060008184604051602001610d1c929190611168565b803573ffffffffffffffffffffffffffffffffffffffff81168114610d9357600080fd5b60006020828403121561103a578081fd5b61104382611005565b9392505050565b6000806040838503121561105c578081fd5b61106583611005565b946020939093013593505050565b600080600060608486031215611087578081fd5b61109084611005565b9250602084013591506110a560408501611005565b90509250925092565b600080600080606085870312156110c3578081fd5b6110cc85611005565b935060208501359250604085013567ffffffffffffffff808211156110ef578283fd5b818701915087601f830112611102578283fd5b813581811115611110578384fd5b886020828501011115611121578384fd5b95989497505060200194505050565b600060208284031215611141578081fd5b81518015158114611043578182fd5b600060208284031215611161578081fd5b5035919050565b60008382528251815b8181101561118d57602081860181015185830182015201611171565b8181111561119e5782602083860101525b50919091016020019392505050565b600082198211156111c0576111c061132a565b500190565b60006bffffffffffffffffffffffff8083168185168083038211156111ec576111ec61132a565b01949350505050565b600082611229577f4e487b710000000000000000000000000000000000000000000000000000000081526012600452602481fd5b500490565b60007f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8184138284138583048511828216161561126d5761126d61132a565b7f8000000000000000000000000000000000000000000000000000000000000000848712868205881281841616156112a7576112a761132a565b8587129250878205871284841616156112c2576112c261132a565b878505871281841616156112d8576112d861132a565b505050929093029392505050565b6000828210156112f8576112f861132a565b500390565b60006bffffffffffffffffffffffff838116908316818110156113225761132261132a565b039392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220a98857a0a41ca843f3186e09d8e4ad936efceafbdbedfeaefc413363a5626b5364736f6c63430008030033";
var LockingVault__factory = /** @class */ (function (_super) {
  __extends(LockingVault__factory, _super);
  function LockingVault__factory(signer) {
    return _super.call(this, _abi, _bytecode, signer) || this;
  }
  LockingVault__factory.prototype.deploy = function (
    _token,
    _staleBlockLag,
    overrides,
  ) {
    return _super.prototype.deploy.call(
      this,
      _token,
      _staleBlockLag,
      overrides || {},
    );
  };
  LockingVault__factory.prototype.getDeployTransaction = function (
    _token,
    _staleBlockLag,
    overrides,
  ) {
    return _super.prototype.getDeployTransaction.call(
      this,
      _token,
      _staleBlockLag,
      overrides || {},
    );
  };
  LockingVault__factory.prototype.attach = function (address) {
    return _super.prototype.attach.call(this, address);
  };
  LockingVault__factory.prototype.connect = function (signer) {
    return _super.prototype.connect.call(this, signer);
  };
  LockingVault__factory.createInterface = function () {
    return new ethers_1.utils.Interface(_abi);
  };
  LockingVault__factory.connect = function (address, signerOrProvider) {
    return new ethers_1.Contract(address, _abi, signerOrProvider);
  };
  LockingVault__factory.bytecode = _bytecode;
  LockingVault__factory.abi = _abi;
  return LockingVault__factory;
})(ethers_1.ContractFactory);
exports.LockingVault__factory = LockingVault__factory;
