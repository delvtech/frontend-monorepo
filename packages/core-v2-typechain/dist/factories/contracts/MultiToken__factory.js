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
exports.MultiToken__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "_linkerCodeHash",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "_factory",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "NonLinkerCaller",
        type: "error",
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
                name: "account",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
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
                name: "id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "TransferSingle",
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
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
                internalType: "uint256[]",
                name: "ids",
                type: "uint256[]",
            },
            {
                internalType: "uint256[]",
                name: "values",
                type: "uint256[]",
            },
        ],
        name: "batchTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "factory",
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
        name: "isApprovedForAll",
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
        name: "linkerCodeHash",
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
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
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
        name: "perTokenApprovals",
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
                internalType: "bool",
                name: "_approved",
                type: "bool",
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
        name: "permitForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenID",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
        ],
        name: "setApproval",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenID",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "caller",
                type: "address",
            },
        ],
        name: "setApprovalBridge",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "id",
                type: "uint256",
            },
        ],
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
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
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
                internalType: "uint256",
                name: "tokenID",
                type: "uint256",
            },
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
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenID",
                type: "uint256",
            },
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
            {
                internalType: "address",
                name: "caller",
                type: "address",
            },
        ],
        name: "transferFromBridge",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
var _bytecode = "0x60c03461011f576001600160401b03906112f690601f38839003908101601f191682019084821183831017610109578083916040958694855283398101031261011f5780516020909101516001600160a01b038116810361011f5760805260a05280518181018181108482111761010957600191602091845282815201603160f81b8152209080519060208201927f2aef22f9d7df5f9d21c56d14029233f3fdaa91917727e1eb68e504d27072d6cd8452818301524660608301523060808301526080825260a082019382851090851117610109578390525190206006556111d1908161012582396080518181816102460152610eb7015260a0518181816101f60152610ee80152f35b634e487b7160e01b600052604160045260246000fd5b600080fdfe608060408181526004918236101561001657600080fd5b600092833560e01c918262ad800c14610bd95750816317fad7fc146109ee5781631c0f12b6146109ba57816321ff32a91461095957816330adf81f1461091e5781633644e515146108ff5781633656eec2146108b25781634e41a1fb146107855781634ed2d6ac146106ff5781637ecebe00146106bb5781639032c7261461037c5781639cd241af14610350578163a22cb46514610296578163bd85b0391461026a578163c45a015514610219578163c905a4b5146101de578163e44808bc14610147575063e985e9c5146100ea57600080fd5b3461014357806003193601126101435760ff81602093610108610cf7565b610110610d1f565b73ffffffffffffffffffffffffffffffffffffffff91821683526002875283832091168252855220549151911615158152f35b5080fd5b8383346101435760a0600319360112610143578235610164610d1f565b9061016d610d42565b6084359273ffffffffffffffffffffffffffffffffffffffff80851685036101da5761019884610e22565b1633036101b2576101af9495965060643592610f58565b51f35b8685517f8bea3737000000000000000000000000000000000000000000000000000000008152fd5b8680fd5b505034610143578160031936011261014357602090517f00000000000000000000000000000000000000000000000000000000000000008152f35b5050346101435781600319360112610143576020905173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b9050346102925760206003193601126102925760209282913581526001845220549051908152f35b8280fd5b5050346101435780600319360112610143576102b0610cf7565b6024358015159081810361034c5761031e90338652600260205273ffffffffffffffffffffffffffffffffffffffff8587209416938487526020528486209060ff7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0083541691151516179055565b82519081527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a351f35b8480fd5b905034610292576060600319360112610292576101af9061036f610d1f565b90339160443591356110c4565b9050346102925760e060031936011261029257610397610cf7565b61039f610d1f565b604435801515908181036101da57606435946084359460ff86168096036106b75786421161065a5773ffffffffffffffffffffffffffffffffffffffff8091169586156105fd57600654878b528960209760078952818d20549a858351928c8c8501957f9319a49e677b4f5aede521541bd9c2c7d0f3529998213c5c9b41a6bf27579feb8752850152169b8c606084015289608084015260a083015260c082015260c0815260e081019181831067ffffffffffffffff8411176105d15792828a95928f958f90608096610122925282519020916101008101947f190100000000000000000000000000000000000000000000000000000000000086526101028201520152604281526104b081610d96565b519020908c519182528482015260a4358c82015260c435606082015282805260015afa156105c75785908951160361056b5750906105627f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3193928589526007845287892061051e815461112f565b905585895260028452878920878a5284528789209060ff7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0083541691151516179055565b8551908152a351f35b606490848851917f08c379a0000000000000000000000000000000000000000000000000000000008352820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e617475726500006044820152fd5b87513d8a823e3d90fd5b60248e6041897f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b60648360208b51917f08c379a0000000000000000000000000000000000000000000000000000000008352820152601860248201527f45524332303a20696e76616c69642d616464726573732d3000000000000000006044820152fd5b60648260208a51917f08c379a0000000000000000000000000000000000000000000000000000000008352820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e650000006044820152fd5b8880fd5b505034610143576020600319360112610143578060209273ffffffffffffffffffffffffffffffffffffffff6106ef610cf7565b1681526007845220549051908152f35b90503461029257608060031936011261029257803561071c610d1f565b6064359273ffffffffffffffffffffffffffffffffffffffff80851685036101da5761074784610e22565b16330361075e5750906101af9291604435916110c4565b84517f8bea3737000000000000000000000000000000000000000000000000000000008152fd5b91905034610292576020806003193601126108ae578235845260058152818420928251938581549160019280841c948482169081156108a4575b8787108214610878575085895290811561083657506001146107fb575b6107f787876107ed828c0383610de1565b5191829182610c81565b0390f35b9080949750528583205b82841061082357505050826107f7946107ed928201019438806107dc565b8054868501880152928601928101610805565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00168887015250505050151560051b83010192506107ed826107f738806107dc565b8460226024927f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b95607f16956107bf565b8380fd5b90503461029257816003193601126102925760209282916108d1610d1f565b9035825281855273ffffffffffffffffffffffffffffffffffffffff83832091168252845220549051908152f35b5050346101435781600319360112610143576020906006549051908152f35b505034610143578160031936011261014357602090517f9319a49e677b4f5aede521541bd9c2c7d0f3529998213c5c9b41a6bf27579feb8152f35b905034610292576060600319360112610292576020928291610979610d1f565b610981610d42565b913583526003865283832073ffffffffffffffffffffffffffffffffffffffff8092168452865283832091168252845220549051908152f35b905034610292576080600319360112610292576101af906109d9610d1f565b906109e2610d42565b33926064359235610f58565b90503461029257608060031936011261029257610a09610cf7565b90610a12610d1f565b67ffffffffffffffff92906044358481116101da57610a349036908501610d65565b929094606435908111610bd557610a4e9036908601610d65565b93909473ffffffffffffffffffffffffffffffffffffffff80841615610b7857841615610b1b57848203610abe5750875b818110610a8b57888851f35b80610ab487610a9e610ab994868c61115c565b358787610aad868c339661115c565b3592610f58565b61112f565b610a7f565b60649060208951917f08c379a0000000000000000000000000000000000000000000000000000000008352820152601e60248201527f69647320616e642076616c756573206c656e677468206d69736d6174636800006044820152fd5b60649060208951917f08c379a0000000000000000000000000000000000000000000000000000000008352820152601c60248201527f7472616e7366657220746f20746865207a65726f2061646472657373000000006044820152fd5b60648260208b51917f08c379a0000000000000000000000000000000000000000000000000000000008352820152601e60248201527f7472616e736665722066726f6d20746865207a65726f206164647265737300006044820152fd5b8780fd5b929150346108ae576020908160031936011261034c57803585528082528285208581549160019280841c94848216908115610c77575b878710821461087857508589529081156108365750600114610c3c576107f787876107ed828c0383610de1565b9080949750528583205b828410610c6457505050826107f7946107ed928201019438806107dc565b8054868501880152928601928101610c46565b95607f1695610c0f565b919091602080825283519081818401526000945b828610610ce1575050601f817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0926040959611610cd4575b0116010190565b6000858286010152610ccd565b8581018201518487016040015294810194610c95565b6004359073ffffffffffffffffffffffffffffffffffffffff82168203610d1a57565b600080fd5b6024359073ffffffffffffffffffffffffffffffffffffffff82168203610d1a57565b6044359073ffffffffffffffffffffffffffffffffffffffff82168203610d1a57565b9181601f84011215610d1a5782359167ffffffffffffffff8311610d1a576020808501948460051b010111610d1a57565b6080810190811067ffffffffffffffff821117610db257604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff821117610db257604052565b60405160208101913083526040820152604081526060810181811067ffffffffffffffff821117610db25773ffffffffffffffffffffffffffffffffffffffff9281604052825190209160808101927fff0000000000000000000000000000000000000000000000000000000000000084527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000060601b166081830152609582015260b57f000000000000000000000000000000000000000000000000000000000000000091015260558152610f1781610d96565b5190201690565b818110610f29570390565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b9392919373ffffffffffffffffffffffffffffffffffffffff80809316941692848403611029575b600082815280602052604093848220878352602052848220610fa3848254610f1e565b9055838252816020528482209716968782526020528381209081549083198211610ffc575082019055825191825260208201527fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f629190a4565b807f4e487b7100000000000000000000000000000000000000000000000000000000602492526011600452fd5b600085815260209060028252604091828220878352815260ff838320541615611055575b505050610f80565b84825260038152828220888352815282822087835281527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83832054031561104d578482526003815282822088835281528282209087835252206110ba828254610f1e565b905538808061104d565b827f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92592949360406020936000908152600385528181209673ffffffffffffffffffffffffffffffffffffffff80911697888352865282822098169788825285522055604051908152a3565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610f295760010190565b919081101561116c5760051b0190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea2646970667358221220017003d10400842571bb7b00424e852cf036f02d2abdab7583eaaf22d910383364736f6c634300080f0033";
var isSuperArgs = function (xs) { return xs.length > 1; };
var MultiToken__factory = /** @class */ (function (_super) {
    __extends(MultiToken__factory, _super);
    function MultiToken__factory() {
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
    MultiToken__factory.prototype.deploy = function (_linkerCodeHash, _factory, overrides) {
        return _super.prototype.deploy.call(this, _linkerCodeHash, _factory, overrides || {});
    };
    MultiToken__factory.prototype.getDeployTransaction = function (_linkerCodeHash, _factory, overrides) {
        return _super.prototype.getDeployTransaction.call(this, _linkerCodeHash, _factory, overrides || {});
    };
    MultiToken__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    MultiToken__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    MultiToken__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    MultiToken__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    MultiToken__factory.bytecode = _bytecode;
    MultiToken__factory.abi = _abi;
    return MultiToken__factory;
}(ethers_1.ContractFactory));
exports.MultiToken__factory = MultiToken__factory;
