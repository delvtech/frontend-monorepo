"use strict";
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
exports.ERC20__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "name_",
                type: "string",
            },
            {
                internalType: "string",
                name: "symbol_",
                type: "string",
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
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
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
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
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
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "balanceOf",
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
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "subtractedValue",
                type: "uint256",
            },
        ],
        name: "decreaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "addedValue",
                type: "uint256",
            },
        ],
        name: "increaseAllowance",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
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
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
var _bytecode = "0x6080604052346200031d5762000ef3803803806200001d8162000322565b9283398101906040818303126200031d5780516001600160401b03908181116200031d57836200004f91840162000348565b91602093848201518381116200031d576200006b920162000348565b82518281116200021d576003918254916001958684811c9416801562000312575b88851014620002fc578190601f94858111620002a6575b5088908583116001146200023f5760009262000233575b505060001982861b1c191690861b1783555b80519384116200021d5760049586548681811c9116801562000212575b82821014620001fd57838111620001b2575b508092851160011462000144575093839491849260009562000138575b50501b92600019911b1c19161790555b604051610b279081620003cc8239f35b01519350388062000118565b92919084601f1981168860005285600020956000905b898383106200019757505050106200017c575b50505050811b01905562000128565b01519060f884600019921b161c19169055388080806200016d565b8587015189559097019694850194889350908101906200015a565b87600052816000208480880160051c820192848910620001f3575b0160051c019087905b828110620001e6575050620000fb565b60008155018790620001d6565b92508192620001cd565b602288634e487b7160e01b6000525260246000fd5b90607f1690620000e9565b634e487b7160e01b600052604160045260246000fd5b015190503880620000ba565b90889350601f19831691876000528a6000209260005b8c8282106200028f575050841162000276575b505050811b018355620000cc565b015160001983881b60f8161c1916905538808062000268565b8385015186558c9790950194938401930162000255565b90915085600052886000208580850160051c8201928b8610620002f2575b918a91869594930160051c01915b828110620002e2575050620000a3565b600081558594508a9101620002d2565b92508192620002c4565b634e487b7160e01b600052602260045260246000fd5b93607f16936200008c565b600080fd5b6040519190601f01601f191682016001600160401b038111838210176200021d57604052565b81601f820112156200031d578051906001600160401b0382116200021d576020906200037d601f8401601f1916830162000322565b938385528284830101116200031d5782906000905b83838310620003b257505011620003a857505090565b6000918301015290565b819350828193920101518282880101520183916200039256fe608060408181526004918236101561001657600080fd5b600092833560e01c91826306fdde03146105a057508163095ea7b31461057657816318160ddd1461055757816323b872dd14610447578163313ce5671461042b57816339509351146103cf57816370a082311461038c57816395d89b411461020e578163a457c2d71461012657508063a9059cbb146100f65763dd62ed3e1461009e57600080fd5b346100f257806003193601126100f257806020926100ba6106e0565b6100c2610708565b73ffffffffffffffffffffffffffffffffffffffff91821683526001865283832091168252845220549051908152f35b5080fd5b50346100f257806003193601126100f25760209061011f6101156106e0565b6024359033610766565b5160018152f35b9050823461020b578260031936011261020b576101416106e0565b918360243592338152600160205281812073ffffffffffffffffffffffffffffffffffffffff861682526020522054908282106101885760208561011f858503873361097c565b60849060208651917f08c379a0000000000000000000000000000000000000000000000000000000008352820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760448201527f207a65726f0000000000000000000000000000000000000000000000000000006064820152fd5b80fd5b8383346100f257816003193601126100f257805190828454600181811c90808316928315610382575b602093848410811461035657838852879594939291811561031957506001146102bb575b50505003601f01601f191682019267ffffffffffffffff84118385101761028f575082918261028b925282610688565b0390f35b806041867f4e487b71000000000000000000000000000000000000000000000000000000006024945252fd5b8888529193925086917f8a35acfbc15ff81a39ae7d344fd709f28e8600b4aa8c65c6b64bfe7fe36bd19b5b8284106103035750505090601f1992601f9282010191819361025b565b80548885018701528794509285019281016102e6565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016848701525050151560051b830101905081601f601f1961025b565b60248960228c7f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b91607f1691610237565b5050346100f25760206003193601126100f2578060209273ffffffffffffffffffffffffffffffffffffffff6103c06106e0565b16815280845220549051908152f35b5050346100f257806003193601126100f25761011f6020926104246103f26106e0565b913381526001865284812073ffffffffffffffffffffffffffffffffffffffff8416825286528460243591205461072b565b903361097c565b5050346100f257816003193601126100f2576020905160128152f35b839150346100f25760606003193601126100f2576104636106e0565b61046b610708565b91846044359473ffffffffffffffffffffffffffffffffffffffff8416815260016020528181203382526020522054907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036104d1575b60208661011f878787610766565b8482106104fa57509183916104ef6020969561011f9503338361097c565b9193948193506104c3565b60649060208751917f08c379a0000000000000000000000000000000000000000000000000000000008352820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e63650000006044820152fd5b5050346100f257816003193601126100f2576020906002549051908152f35b5050346100f257806003193601126100f25760209061011f6105966106e0565b602435903361097c565b8490843461068457826003193601126106845782600354600181811c9080831692831561067a575b6020938484108114610356578388528795949392918115610319575060011461061b5750505003601f01601f191682019267ffffffffffffffff84118385101761028f575082918261028b925282610688565b600388529193925086917fc2575a0e9e593c00f959f8c92f12db2869c3395a3b0502d05e2516446f71f85b5b8284106106645750505090601f1992601f9282010191819361025b565b8054888501870152879450928501928101610647565b91607f16916105c8565b8280fd5b919091602080825283519081818401526000945b8286106106ca575050601f81601f199260409596116106bd575b0116010190565b60008582860101526106b6565b858101820151848701604001529481019461069c565b6004359073ffffffffffffffffffffffffffffffffffffffff8216820361070357565b600080fd5b6024359073ffffffffffffffffffffffffffffffffffffffff8216820361070357565b81198111610737570190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b73ffffffffffffffffffffffffffffffffffffffff8091169182156108f85716918215610874576000828152806020526040812054918083106107f057604082827fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9587602096528286520382822055868152206107e582825461072b565b9055604051908152a3565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e742065786365656473206260448201527f616c616e636500000000000000000000000000000000000000000000000000006064820152fd5b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201527f65737300000000000000000000000000000000000000000000000000000000006064820152fd5b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152fd5b73ffffffffffffffffffffffffffffffffffffffff809116918215610a6e57169182156109ea5760207f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925918360005260018252604060002085600052825280604060002055604051908152a3565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f20616464726560448201527f73730000000000000000000000000000000000000000000000000000000000006064820152fd5b60846040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460448201527f72657373000000000000000000000000000000000000000000000000000000006064820152fdfea26469706673582212206cb9f38bbddf4457dfafbf887d9aface5e64e2a79910737160479faaf9d63e5164736f6c634300080f0033";
var isSuperArgs = function (xs) { return xs.length > 1; };
var ERC20__factory = /** @class */ (function (_super) {
    __extends(ERC20__factory, _super);
    function ERC20__factory() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        if (isSuperArgs(args)) {
            _this = _super.apply(this, args) || this;
        }
        else {
            _this = _super.call(this, _abi, _bytecode, args[0]) || this;
        }
        return _this;
    }
    ERC20__factory.prototype.deploy = function (name_, symbol_, overrides) {
        return _super.prototype.deploy.call(this, name_, symbol_, overrides || {});
    };
    ERC20__factory.prototype.getDeployTransaction = function (name_, symbol_, overrides) {
        return _super.prototype.getDeployTransaction.call(this, name_, symbol_, overrides || {});
    };
    ERC20__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    ERC20__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    ERC20__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    ERC20__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    ERC20__factory.bytecode = _bytecode;
    ERC20__factory.abi = _abi;
    return ERC20__factory;
}(ethers_1.ContractFactory));
exports.ERC20__factory = ERC20__factory;
