"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateAirdrop__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [
            {
                internalType: "contract IERC20",
                name: "_airdropToken",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "_amountPerRedemption",
                type: "uint256",
            },
            {
                internalType: "contract IPlonkVerifier",
                name: "_verifier",
                type: "address",
            },
            {
                internalType: "bytes32",
                name: "_root",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "_vault",
                type: "address",
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
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        inputs: [],
        name: "airdropToken",
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
        inputs: [],
        name: "amountPerRedemption",
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
        inputs: [
            {
                internalType: "bytes",
                name: "proof",
                type: "bytes",
            },
            {
                internalType: "bytes32",
                name: "nullifierHash",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "delegate",
                type: "address",
            },
        ],
        name: "claimAirdropAndDelegate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "nullifierSpent",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "root",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "newRoot",
                type: "bytes32",
            },
        ],
        name: "updateRoot",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "vault",
        outputs: [
            {
                internalType: "contract ILockingVault",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
var _bytecode = "0x60a06040523480156200001157600080fd5b5060405162001550380380620015508339810160408190526200003491620004fa565b6200003f33620000b2565b600180546001600160a01b038088166001600160a01b031992831681179093556002879055600380549187169190921617905560048390556001600160601b0319606083901b16608052620000a79082600019620007b862000102602090811b91909117901c565b505050505062000619565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b801580620001905750604051636eb1769f60e11b81523060048201526001600160a01b03838116602483015284169063dd62ed3e9060440160206040518083038186803b1580156200015357600080fd5b505afa15801562000168573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200018e919062000561565b155b620002085760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e63650000000000000000000060648201526084015b60405180910390fd5b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b0390811663095ea7b360e01b17909152620002609185916200026516565b505050565b6000620002c1826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166200034360201b6200096b179092919060201c565b805190915015620002605780806020019051810190620002e29190620004d8565b620002605760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152608401620001ff565b60606200035484846000856200035e565b90505b9392505050565b606082471015620003c15760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b6064820152608401620001ff565b6001600160a01b0385163b6200041a5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606401620001ff565b600080866001600160a01b031685876040516200043891906200057a565b60006040518083038185875af1925050503d806000811462000477576040519150601f19603f3d011682016040523d82523d6000602084013e6200047c565b606091505b5090925090506200048f8282866200049a565b979650505050505050565b60608315620004ab57508162000357565b825115620004bc5782518084602001fd5b8160405162461bcd60e51b8152600401620001ff919062000598565b600060208284031215620004ea578081fd5b8151801515811462000357578182fd5b600080600080600060a0868803121562000512578081fd5b85516200051f8162000600565b602087015160408801519196509450620005398162000600565b606087015160808801519194509250620005538162000600565b809150509295509295909350565b60006020828403121562000573578081fd5b5051919050565b600082516200058e818460208701620005cd565b9190910192915050565b6000602082528251806020840152620005b9816040850160208701620005cd565b601f01601f19169190910160400192915050565b60005b83811015620005ea578181015183820152602001620005d0565b83811115620005fa576000848401525b50505050565b6001600160a01b03811681146200061657600080fd5b50565b60805160601c610f116200063f600039600081816101c601526106590152610f116000f3fe608060405234801561001057600080fd5b50600436106100be5760003560e01c80638da5cb5b11610076578063ebf0c7171161005b578063ebf0c717146101a5578063f2fde38b146101ae578063fbfa77cf146101c1576100be565b80638da5cb5b14610174578063df92857c14610192576100be565b80634d06068a116100a75780634d06068a14610110578063715018a6146101555780637f0d71591461015d576100be565b806321ff9970146100c357806338c86911146100d8575b600080fd5b6100d66100d1366004610cf5565b6101e8565b005b6100fb6100e6366004610cf5565b60056020526000908152604090205460ff1681565b60405190151581526020015b60405180910390f35b6001546101309073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610107565b6100d6610259565b61016660025481565b604051908152602001610107565b60005473ffffffffffffffffffffffffffffffffffffffff16610130565b6100d66101a0366004610d0d565b6102cc565b61016660045481565b6100d66101bc366004610cbb565b6106bc565b6101307f000000000000000000000000000000000000000000000000000000000000000081565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102545760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064015b60405180910390fd5b600455565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102c05760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161024b565b6102ca6000610984565b565b7f30644e72e131a029b85045b68181585d2833e84879b9709143e1f593f000000182106103615760405162461bcd60e51b815260206004820152602160248201527f4e756c6c6966696572206973206e6f742077697468696e20746865206669656c60448201527f6400000000000000000000000000000000000000000000000000000000000000606482015260840161024b565b60008281526005602052604090205460ff16156103c05760405162461bcd60e51b815260206004820152601860248201527f41697264726f7020616c72656164792072656465656d65640000000000000000604482015260640161024b565b604080516003808252608082019092526000916020820160608036833701905050905060045460001c81600081518110610423577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010181815250508260001c8160018151811061046d577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6020026020010181815250503373ffffffffffffffffffffffffffffffffffffffff16816002815181106104ca577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60209081029190910101526003546040517f1e8e1e1300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90911690631e8e1e139061052f90889088908690600401610dc5565b60206040518083038186803b15801561054757600080fd5b505afa15801561055b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061057f9190610cd5565b6105cb5760405162461bcd60e51b815260206004820152601960248201527f50726f6f6620766572696669636174696f6e206661696c656400000000000000604482015260640161024b565b6000838152600560205260409081902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016600117905560025490517ff45346dc000000000000000000000000000000000000000000000000000000008152336004820152602481019190915273ffffffffffffffffffffffffffffffffffffffff83811660448301527f0000000000000000000000000000000000000000000000000000000000000000169063f45346dc90606401600060405180830381600087803b15801561069d57600080fd5b505af11580156106b1573d6000803e3d6000fd5b505050505050505050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146107235760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015260640161024b565b73ffffffffffffffffffffffffffffffffffffffff81166107ac5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f6464726573730000000000000000000000000000000000000000000000000000606482015260840161024b565b6107b581610984565b50565b80158061086757506040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff838116602483015284169063dd62ed3e9060440160206040518083038186803b15801561082d57600080fd5b505afa158015610841573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108659190610d91565b155b6108d95760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e636500000000000000000000606482015260840161024b565b6040805173ffffffffffffffffffffffffffffffffffffffff8416602482015260448082018490528251808303909101815260649091019091526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167f095ea7b3000000000000000000000000000000000000000000000000000000001790526109669084906109f9565b505050565b606061097a8484600085610aeb565b90505b9392505050565b6000805473ffffffffffffffffffffffffffffffffffffffff8381167fffffffffffffffffffffffff0000000000000000000000000000000000000000831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b6000610a5b826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff1661096b9092919063ffffffff16565b8051909150156109665780806020019051810190610a799190610cd5565b6109665760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f74207375636365656400000000000000000000000000000000000000000000606482015260840161024b565b606082471015610b635760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c0000000000000000000000000000000000000000000000000000606482015260840161024b565b610b6c85610c3e565b610bb85760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161024b565b6000808673ffffffffffffffffffffffffffffffffffffffff168587604051610be19190610da9565b60006040518083038185875af1925050503d8060008114610c1e576040519150601f19603f3d011682016040523d82523d6000602084013e610c23565b606091505b5091509150610c33828286610c5e565b979650505050505050565b73ffffffffffffffffffffffffffffffffffffffff81163b15155b919050565b60608315610c6d57508161097d565b825115610c7d5782518084602001fd5b8160405162461bcd60e51b815260040161024b9190610e5a565b803573ffffffffffffffffffffffffffffffffffffffff81168114610c5957600080fd5b600060208284031215610ccc578081fd5b61097d82610c97565b600060208284031215610ce6578081fd5b8151801515811461097d578182fd5b600060208284031215610d06578081fd5b5035919050565b60008060008060608587031215610d22578283fd5b843567ffffffffffffffff80821115610d39578485fd5b818701915087601f830112610d4c578485fd5b813581811115610d5a578586fd5b886020828501011115610d6b578586fd5b602092830196509450508501359150610d8660408601610c97565b905092959194509250565b600060208284031215610da2578081fd5b5051919050565b60008251610dbb818460208701610eab565b9190910192915050565b6000604082528360408301528385606084013780606085840101527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f85011682016060810160206060858403018186015281865180845260808501915082880194508593505b80841015610e4d5784518252938201936001939093019290820190610e2d565b5098975050505050505050565b6000602082528251806020840152610e79816040850160208701610eab565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b60005b83811015610ec6578181015183820152602001610eae565b83811115610ed5576000848401525b5050505056fea264697066735822122037e939f2ee3b22f91c1d0869f9ae94db84ec404198e456dd88ef1a5619c2e17764736f6c63430008030033";
var PrivateAirdrop__factory = /** @class */ (function (_super) {
    __extends(PrivateAirdrop__factory, _super);
    function PrivateAirdrop__factory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        if (args.length === 1) {
            _this = _super.call(this, _abi, _bytecode, args[0]) || this;
        }
        else {
            _this = _super.apply(this, args) || this;
        }
        return _this;
    }
    PrivateAirdrop__factory.prototype.deploy = function (_airdropToken, _amountPerRedemption, _verifier, _root, _vault, overrides) {
        return _super.prototype.deploy.call(this, _airdropToken, _amountPerRedemption, _verifier, _root, _vault, overrides || {});
    };
    PrivateAirdrop__factory.prototype.getDeployTransaction = function (_airdropToken, _amountPerRedemption, _verifier, _root, _vault, overrides) {
        return _super.prototype.getDeployTransaction.call(this, _airdropToken, _amountPerRedemption, _verifier, _root, _vault, overrides || {});
    };
    PrivateAirdrop__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    PrivateAirdrop__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    PrivateAirdrop__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    PrivateAirdrop__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    PrivateAirdrop__factory.bytecode = _bytecode;
    PrivateAirdrop__factory.abi = _abi;
    return PrivateAirdrop__factory;
}(ethers_1.ContractFactory));
exports.PrivateAirdrop__factory = PrivateAirdrop__factory;
