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
exports.MockERC20Permit__factory = void 0;
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
            {
                internalType: "uint8",
                name: "decimals_",
                type: "uint8",
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
        inputs: [],
        name: "DOMAIN_SEPARATOR",
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
        inputs: [],
        name: "PERMIT_TYPEHASH",
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
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
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
                name: "account",
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
                name: "",
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
                name: "account",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
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
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "nonces",
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
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
            },
            {
                internalType: "uint8",
                name: "v",
                type: "uint8",
            },
            {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
            },
        ],
        name: "permit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "destination",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "setBalance",
        outputs: [],
        stateMutability: "nonpayable",
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
        inputs: [
            {
                internalType: "address",
                name: "recipient",
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
                name: "spender",
                type: "address",
            },
            {
                internalType: "address",
                name: "recipient",
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
    {
        inputs: [
            {
                internalType: "address",
                name: "destination",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "uncheckedTransfer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
var _bytecode = "0x60806040818152346200045a576200139780380380916200002182866200045f565b843982016060838203126200045a5782516001600160401b0393908481116200045a57826200005291830162000483565b91602090818301518681116200045a5785916200007191850162000483565b9201519360ff85168095036200045a578351938685116200044457600094806200009c87546200050b565b92601f93848111620003f3575b5085908483116001146200038b5788926200037f575b50508160011b916000199060031b1c19161785555b8351908782116200036b578190600195620000f087546200050b565b82811162000316575b5085918311600114620002b2578792620002a6575b5050600019600383901b1c191690841b1783555b60ff199360128560025416176002558080526003835260001980838320553082528282205581518190825491816200015a846200050b565b9182825287820194888b8b831692836000146200028c575050506001146200024b575b6200018b925003826200045f565b5190209382518381018181108a8211176200023757908591855282815201603160f81b8152208251938401947f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f86528385015260608401524660808401523060a084015260a0835260c0830196838810908811176200022357508590525190206006556002541617600255610e4e9081620005498239f35b634e487b7160e01b81526041600452602490fd5b634e487b7160e01b84526041600452602484fd5b505083805281868086208987915b858310620002725750506200018b93508201016200017d565b809192945054838588010152019101879089859362000259565b1687526200018b94151560051b84010191506200017d9050565b0151905038806200010e565b8688528588208794509190601f198416895b88828210620002ff5750508411620002e5575b505050811b01835562000122565b015160001960f88460031b161c19169055388080620002d7565b8385015186558a97909501949384019301620002c4565b909192508688528588208380860160051c82019288871062000361575b9186958a929594930160051c01915b82811062000352575050620000f9565b8a815586955089910162000342565b9250819262000333565b634e487b7160e01b86526041600452602486fd5b015190503880620000bf565b8880528689209250601f198416895b88828210620003dc575050908460019594939210620003c2575b505050811b018555620000d4565b015160001960f88460031b161c19169055388080620003b4565b60018596829396860151815501950193016200039a565b9091508780528588208480850160051c8201928886106200043a575b9085949392910160051c01905b8181106200042b5750620000a9565b8981558493506001016200041c565b925081926200040f565b634e487b7160e01b600052604160045260246000fd5b600080fd5b601f909101601f19168101906001600160401b038211908210176200044457604052565b9080601f830112156200045a578151906001600160401b038211620004445760405192602091620004be601f8501601f19168401866200045f565b8385528284830101116200045a5782906000905b83838310620004f257505011620004e857505090565b6000918301015290565b81935082819392010151828288010152018391620004d2565b90600182811c921680156200053d575b60208310146200052757565b634e487b7160e01b600052602260045260246000fd5b91607f16916200051b56fe608060408181526004918236101561001657600080fd5b600092833560e01c91826306fdde03146109f057508163095ea7b31461097357816323b872dd1461094157816330adf81f14610906578163313ce567146108e45781633644e515146108c557816340c10f191461084457816370a08231146108005781637ecebe00146107bc57816395d89b4114610685578163a9059cbb14610652578163d505accf1461020c578163dd62ed3e146101b257508063e22f03c11461013a5763e30443bc146100ca57600080fd5b346101365780600319360112610136576100e2610b93565b827fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef602073ffffffffffffffffffffffffffffffffffffffff6024359416938484526003825280868520558551908152a351f35b5080fd5b5034610136578060031936011261013657610153610b93565b827fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef602073ffffffffffffffffffffffffffffffffffffffff602435941693848452600382528584206101a7828254610c18565b90558551908152a351f35b90503461020857816003193601126102085760209282916101d1610b93565b6101d9610bbb565b9173ffffffffffffffffffffffffffffffffffffffff8092168452865283832091168252845220549051908152f35b8280fd5b8383346101365760e060031936011261013657610227610b93565b61022f610bbb565b604435606435906084359160ff831680930361064e5760c435906006549573ffffffffffffffffffffffffffffffffffffffff80911695868a526020956005875289808c205499848251948b8b8701947f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98652870152169a8b606086015288608086015260a08501528560c085015260c0845260e0840167ffffffffffffffff928582108483111761062157818e52855190206101008601927f1901000000000000000000000000000000000000000000000000000000000000845261010287015261012286015260428152610160850192818410908411176105f357828d52519020928915610595575050608087928c928c519182528482015260a4358c82015286606082015282805260015afa1561058b57885116850361052f578015908115610524575b50156104c8577f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a010610446578286526005825284862080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811461041a576001019055828652868252848620848752825284862081905584519081527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259190a351f35b60248860118b7f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b608487838751917f08c379a0000000000000000000000000000000000000000000000000000000008352820152602260248201527f45524332303a20696e76616c6964207369676e6174757265202773272076616c60448201527f75650000000000000000000000000000000000000000000000000000000000006064820152fd5b606488848851917f08c379a0000000000000000000000000000000000000000000000000000000008352820152601560248201527f45524332303a207065726d69742d6578706972656400000000000000000000006044820152fd5b905042111589610376565b606489858951917f08c379a0000000000000000000000000000000000000000000000000000000008352820152601560248201527f45524332303a20696e76616c69642d7065726d697400000000000000000000006044820152fd5b87513d8a823e3d90fd5b907f45524332303a20696e76616c69642d616464726573732d3000000000000000006101a46064938b7f08c379a000000000000000000000000000000000000000000000000000000000855261016482015260186101848201520152fd5b505060248c60418f7f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b8f8f60416024927f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b8680fd5b50503461013657806003193601126101365760209061067c610672610b93565b6024359033610c24565b90519015158152f35b9190503461020857826003193601126102085780519183600180549182821c9282811680156107b2575b6020958686108214610786575084885290811561074657506001146106ee575b6106ea86866106e0828b0383610aad565b5191829182610b1d565b0390f35b9295508083527fb10e2d527612073b26eecdfd717e6a320cf44b4afac2b0732d9fcbe2b7fa0cf65b82841061073357505050826106ea946106e09282010194386106cf565b8054868501880152928601928101610716565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001687860152505050151560051b83010192506106e0826106ea386106cf565b8360226024927f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b93607f16936106af565b505034610136576020600319360112610136578060209273ffffffffffffffffffffffffffffffffffffffff6107f0610b93565b1681526005845220549051908152f35b505034610136576020600319360112610136578060209273ffffffffffffffffffffffffffffffffffffffff610834610b93565b1681526003845220549051908152f35b50503461013657806003193601126101365761085e610b93565b827fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef602073ffffffffffffffffffffffffffffffffffffffff602435941693848452600382526108b18187862054610c18565b85855260038352868520558551908152a351f35b5050346101365781600319360112610136576020906006549051908152f35b50503461013657816003193601126101365760209060ff600254169051908152f35b505034610136578160031936011261013657602090517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98152f35b5050346101365760606003193601126101365760209061067c610962610b93565b61096a610bbb565b60443591610c24565b905034610208578160031936011261020857602092610990610b93565b9183602435928392338252875273ffffffffffffffffffffffffffffffffffffffff8282209516948582528752205582519081527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925843392a35160018152f35b92915034610aa95783600319360112610aa9578354600181811c9186908281168015610a9f575b602095868610821461078657508488529081156107465750600114610a47576106ea86866106e0828b0383610aad565b8080949750527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e5635b828410610a8c57505050826106ea946106e09282010194386106cf565b8054868501880152928601928101610a6f565b93607f1693610a17565b8380fd5b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff821117610aee57604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b919091602080825283519081818401526000945b828610610b7d575050601f817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0926040959611610b70575b0116010190565b6000858286010152610b69565b8581018201518487016040015294810194610b31565b6004359073ffffffffffffffffffffffffffffffffffffffff82168203610bb657565b600080fd5b6024359073ffffffffffffffffffffffffffffffffffffffff82168203610bb657565b818110610be9570390565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b81198111610be9570190565b9291909273ffffffffffffffffffffffffffffffffffffffff80911690600092828452602091600383526040908186205497838910610dbb57338603610cc5575b610c93847fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9798999a610bde565b8789526003865283892055169586815281610cb18482842054610c18565b9188815260038652205551908152a3600190565b858752600485528287203388528552828720547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8103610d06575b50610c65565b848110610d5e57847fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9798999a610d4082610c9394610bde565b8a8c5260048952868c20338d528952868c20559a9998975050610d00565b6064868551907f08c379a00000000000000000000000000000000000000000000000000000000082526004820152601d60248201527f45524332303a20696e73756666696369656e742d616c6c6f77616e63650000006044820152fd5b6064858451907f08c379a00000000000000000000000000000000000000000000000000000000082526004820152601b60248201527f45524332303a20696e73756666696369656e742d62616c616e636500000000006044820152fdfea26469706673582212207b8ad9ab4936513e39a4e4f75f089c03683d82c5a4999bbd3eb98869022d19c364736f6c634300080f0033";
var isSuperArgs = function (xs) { return xs.length > 1; };
var MockERC20Permit__factory = /** @class */ (function (_super) {
    __extends(MockERC20Permit__factory, _super);
    function MockERC20Permit__factory() {
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
    MockERC20Permit__factory.prototype.deploy = function (name_, symbol_, decimals_, overrides) {
        return _super.prototype.deploy.call(this, name_, symbol_, decimals_, overrides || {});
    };
    MockERC20Permit__factory.prototype.getDeployTransaction = function (name_, symbol_, decimals_, overrides) {
        return _super.prototype.getDeployTransaction.call(this, name_, symbol_, decimals_, overrides || {});
    };
    MockERC20Permit__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    MockERC20Permit__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    MockERC20Permit__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    MockERC20Permit__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    MockERC20Permit__factory.bytecode = _bytecode;
    MockERC20Permit__factory.abi = _abi;
    return MockERC20Permit__factory;
}(ethers_1.ContractFactory));
exports.MockERC20Permit__factory = MockERC20Permit__factory;
