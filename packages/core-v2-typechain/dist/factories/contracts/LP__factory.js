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
exports.LP__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
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
                internalType: "contract ITerm",
                name: "_term",
                type: "address",
            },
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
                internalType: "uint256",
                name: "poolId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "bondsDeposited",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "destination",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "minLpOut",
                type: "uint256",
            },
        ],
        name: "depositBonds",
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
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "poolId",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "destination",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "minOutput",
                type: "uint256",
            },
        ],
        name: "depositUnderlying",
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
                name: "",
                type: "uint256",
            },
        ],
        name: "reserves",
        outputs: [
            {
                internalType: "uint128",
                name: "shares",
                type: "uint128",
            },
            {
                internalType: "uint128",
                name: "bonds",
                type: "uint128",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "fromPoolId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "toPoolId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "destination",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "minOutput",
                type: "uint256",
            },
        ],
        name: "rollover",
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
        inputs: [],
        name: "term",
        outputs: [
            {
                internalType: "contract ITerm",
                name: "",
                type: "address",
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
    {
        inputs: [
            {
                internalType: "uint256",
                name: "poolId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "destination",
                type: "address",
            },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
var _bytecode = "0x610140604090808252346200024e576080816200252c803803809162000026828562000253565b8339810103126200024e578051916001600160a01b0391828416908185036200024e57602090818101519480861686036200024e5760608583015192015190811681036200024e5760805260a05282516001600160401b0392908085018481118282101762000238576001918491875282815201603160f81b81522090845196838801927f2aef22f9d7df5f9d21c56d14029233f3fdaa91917727e1eb68e504d27072d6cd8452868901524660608901523060808901526080885260a08801948886109086111762000238578480926004928695838a528b51902060065560e05263313ce56760e01b82525afa9485156200022d57600095620001e4575b50505060ff610100938085521691604d8311620001ce5761012092600a0a835260c05251906122b4928362000278843960805183818161051d0152611fa8015260a0518381816104cd0152611fd9015260c0518381816102e3015281816105b5015281816108da01528181610ca8015281816113a201528181611b2e0152611e92015260e05183818161016d015261026b0152518261105a01525181818161032b01526119f90152f35b634e487b7160e01b600052601160045260246000fd5b819593953d831162000225575b620001fd818562000253565b810103126200022157519060ff821682036200021e57509138808062000124565b80fd5b5080fd5b503d620001f1565b83513d6000823e3d90fd5b634e487b7160e01b600052604160045260246000fd5b600080fd5b601f909101601f19168101906001600160401b03821190821017620002385760405256fe608060408181526004918236101561001657600080fd5b600092833560e01c918262ad800c146114e4575081630ad58d2f146112eb57816317fad7fc146111525781631c0f12b61461111e57816321ff32a9146110b957816330adf81f1461107e578163313ce567146110405781633644e515146110215781633656eec214610fd35781634e41a1fb14610ea65781634ed2d6ac14610e245781637ecebe0014610de05781638334278d14610d9e57816383541b4a14610c1f5781639032c7261461092a5781639cd241af146108fe578163a10ffbed146108ad578163a22cb465146107f5578163a7de458e1461056d578163bd85b03914610541578163c45a0155146104f0578163c905a4b5146104b5578163e44808bc1461041d578163e4b446d9146101f257508063e985e9c5146101955763fc0c546a1461014257600080fd5b346101915781600319360112610191576020905173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b5080fd5b50346101915780600319360112610191576020916101b1611625565b826101ba611648565b9273ffffffffffffffffffffffffffffffffffffffff809316815260028652209116600052825260ff81600020541690519015158152f35b83833461019157610202366116bf565b94916102129391934282116116fa565b8451917f23b872dd000000000000000000000000000000000000000000000000000000008352338884015230602484015280604484015260209773ffffffffffffffffffffffffffffffffffffffff93898160648189897f0000000000000000000000000000000000000000000000000000000000000000165af180156104135790889392916103d1575b5060849086845196879485937fa2ea09d90000000000000000000000000000000000000000000000000000000085528401528160248401528160448401523060648401527f0000000000000000000000000000000000000000000000000000000000000000165af19182156103c75791839161038995936103809590849361038f575b5082610350610355927f000000000000000000000000000000000000000000000000000000000000000090611817565b611877565b9281815260088a52876fffffffffffffffffffffffffffffffff818320541691205460801c916119a7565b928310156118b0565b51908152f35b610350935061035591506103b890893d8b116103c0575b6103b081836117c0565b810190611801565b935090610320565b503d6103a6565b85513d85823e3d90fd5b909192508981813d831161040c575b6103ea81836117c0565b81010312610408575180151503610404579086918a61029d565b8480fd5b8580fd5b503d6103e0565b88513d88823e3d90fd5b8383346101915760a060031936011261019157823561043a611648565b90610443611602565b6084359273ffffffffffffffffffffffffffffffffffffffff80851685036104b05761046e84611f13565b16330361048857610485949596506064359261200f565b51f35b8685517f8bea3737000000000000000000000000000000000000000000000000000000008152fd5b600080fd5b505034610191578160031936011261019157602090517f00000000000000000000000000000000000000000000000000000000000000008152f35b5050346101915781600319360112610191576020905173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b9050346105695760206003193601126105695760209282913581526001845220549051908152f35b8280fd5b8383346101915761057d366116bf565b929161058d9591954284116116fa565b8282526008602052848220546fffffffffffffffffffffffffffffffff91608082901c9183167f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16803b156104085788517f1c0f12b600000000000000000000000000000000000000000000000000000000808252818d0189815233602082015230604082015260608101869052909190889082908190608001038183875af180156107eb579088916107d3575b5050610660856103508686611817565b91803b156107cf579087918b519d8e92835282017f8000000000000000000000000000000000000000000000000000000000000000905233602483015230604483015283606483015281835a92608493f19a8b156107c557899a9b999798996107a1575b509084918887526001602052848489892054906106e091611817565b906106ea91611877565b9b8c6106f6918b6121b5565b6106ff916118fb565b1686855260086020528585209081547fffffffffffffffffffffffffffffffff000000000000000000000000000000001617905561073c916118fb565b169281526008602052209061078c91906fffffffffffffffffffffffffffffffff7fffffffffffffffffffffffffffffffff0000000000000000000000000000000083549260801b169116179055565b821015610798906118b0565b51908152602090f35b8697506107b49096919293949596611745565b61040857908895949392918b6106c4565b89513d88823e3d90fd5b8780fd5b6107dc90611745565b6107e757868d610650565b8680fd5b8b513d8a823e3d90fd5b50503461019157806003193601126101915761080f611625565b602435801515908181036104b05761087f90338652600260205273ffffffffffffffffffffffffffffffffffffffff85872094169384600052602052846000209060ff7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0083541691151516179055565b82519081527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a351f35b5050346101915781600319360112610191576020905173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b905034610569576060600319360112610569576104859061091d611648565b903391604435913561214a565b9050346105695760e060031936011261056957610945611625565b61094d611648565b604435801515908181036104b057606435946084359460ff8616809603610c1b57864211610bd85773ffffffffffffffffffffffffffffffffffffffff809116958615610b9557600654878b528960209760078952818d20549a858351928c8c8501957f9319a49e677b4f5aede521541bd9c2c7d0f3529998213c5c9b41a6bf27579feb8752850152169b8c606084015289608084015260a083015260c082015260c0815260e081019181831067ffffffffffffffff841117610b675792828a95928f958f90608096610122925282519020916101008101947f19010000000000000000000000000000000000000000000000000000000000008652610102820152015260428152610a5e816117a4565b519020908c519182528482015260a4358c82015260c435606082015282805260015afa15610b5d57859089511603610b1b575090610b127f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31939285895260078452878920610acc8154612241565b905585895260028452878920876000528452876000209060ff7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0083541691151516179055565b8551908152a351f35b6064908488519162461bcd60e51b8352820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e617475726500006044820152fd5b87513d8a823e3d90fd5b6041877f4e487b71000000000000000000000000000000000000000000000000000000006000525260246000fd5b60648360208b519162461bcd60e51b8352820152601860248201527f45524332303a20696e76616c69642d616464726573732d3000000000000000006044820152fd5b60648260208a519162461bcd60e51b8352820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e650000006044820152fd5b8880fd5b919050346105695760a060031936011261056957602435928235610c62610c4461166b565b9142811080610d95575b610c57906116fa565b339060443590611caa565b50918351927f48ef824b0000000000000000000000000000000000000000000000000000000084526020968785888173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165afa928315610d8a578093610d59575b610d07955081815260088952866fffffffffffffffffffffffffffffffff818320541691205460801c916119a7565b916084358310610d18575051908152f35b83606492519162461bcd60e51b8352820152601b60248201527f546f646f206e696365206578706563746174696f6e206572726f7200000000006044820152fd5b92508785813d8311610d83575b610d7081836117c0565b810103126104b057610d07945192610cd8565b503d610d66565b8651903d90823e3d90fd5b50428711610c4e565b90503461056957602060031936011261056957918192358152600860205220548151906fffffffffffffffffffffffffffffffff8116825260801c6020820152f35b505034610191576020600319360112610191578060209273ffffffffffffffffffffffffffffffffffffffff610e14611625565b1681526007845220549051908152f35b905034610569576080600319360112610569578035610e41611648565b610e4961166b565b9273ffffffffffffffffffffffffffffffffffffffff610e6884611f13565b163303610e7f57509061048592916044359161214a565b84517f8bea3737000000000000000000000000000000000000000000000000000000008152fd5b9190503461056957602080600319360112610fcf578235845260058152818420928251938581549160019280841c94848216908115610fc5575b8787108214610f995750858952908115610f575750600114610f1c575b610f188787610f0e828c03836117c0565b519182918261158c565b0390f35b9080949750528583205b828410610f445750505082610f1894610f0e92820101943880610efd565b8054868501880152928601928101610f26565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00168887015250505050151560051b8301019250610f0e82610f183880610efd565b8460226024927f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b95607f1695610ee0565b8380fd5b90503461056957816003193601126105695773ffffffffffffffffffffffffffffffffffffffff82602094611006611648565b93358152808652209116600052825280600020549051908152f35b5050346101915781600319360112610191576020906006549051908152f35b5050346101915781600319360112610191576020905160ff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b505034610191578160031936011261019157602090517f9319a49e677b4f5aede521541bd9c2c7d0f3529998213c5c9b41a6bf27579feb8152f35b90503461056957606060031936011261056957602092826110d8611648565b916110e1611602565b93358152600386522073ffffffffffffffffffffffffffffffffffffffff8092166000528452826000209116600052825280600020549051908152f35b905034610569576080600319360112610569576104859061113d611648565b90611146611602565b3392606435923561200f565b9050346105695760806003193601126105695761116d611625565b90611176611648565b67ffffffffffffffff92906044358481116107e757611198903690850161168e565b9290946064359081116107cf576111b2903690860161168e565b93909473ffffffffffffffffffffffffffffffffffffffff808416156112a857841615611265578482036112225750875b8181106111ef57888851f35b806112188761120261121d94868c61226e565b358787611211868c339661226e565b359261200f565b612241565b6111e3565b606490602089519162461bcd60e51b8352820152601e60248201527f69647320616e642076616c756573206c656e677468206d69736d6174636800006044820152fd5b606490602089519162461bcd60e51b8352820152601c60248201527f7472616e7366657220746f20746865207a65726f2061646472657373000000006044820152fd5b60648260208b519162461bcd60e51b8352820152601e60248201527f7472616e736665722066726f6d20746865207a65726f206164647265737300006044820152fd5b839150346101915760031990606082360112610569578084913590611411611311611602565b61131e3360243586611caa565b969086519261132c84611788565b6001845260209485938436818801377f800000000000000000000000000000000000000000000000000000000000000061136587611907565b5289519361137285611788565b6001855285368187013761138585611907565b5273ffffffffffffffffffffffffffffffffffffffff93611402857f0000000000000000000000000000000000000000000000000000000000000000169b5197889687967fddda35cd000000000000000000000000000000000000000000000000000000008852168b870152606060248701526064860190611943565b91848303016044850152611943565b03818a895af180156114da576114b1575b50508361142e57848651f35b823b156104045785517f1c0f12b600000000000000000000000000000000000000000000000000000000815290810191825230602083015233604083015260608201939093528391839182908490829060800103925af180156114a757611498575b808080848651f35b6114a190611745565b82611490565b83513d84823e3d90fd5b813d83116114d3575b6114c481836117c0565b81010312610404578680611422565b503d6114ba565b88513d89823e3d90fd5b92915034610fcf576020908160031936011261040457803585528082528285208581549160019280841c94848216908115611582575b8787108214610f995750858952908115610f57575060011461154757610f188787610f0e828c03836117c0565b9080949750528583205b82841061156f5750505082610f1894610f0e92820101943880610efd565b8054868501880152928601928101611551565b95607f169561151a565b919091602080825283519081818401526000945b8286106115ec575050601f817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09260409596116115df575b0116010190565b60008582860101526115d8565b85810182015184870160400152948101946115a0565b6044359073ffffffffffffffffffffffffffffffffffffffff821682036104b057565b6004359073ffffffffffffffffffffffffffffffffffffffff821682036104b057565b6024359073ffffffffffffffffffffffffffffffffffffffff821682036104b057565b6064359073ffffffffffffffffffffffffffffffffffffffff821682036104b057565b9181601f840112156104b05782359167ffffffffffffffff83116104b0576020808501948460051b0101116104b057565b60031960809101126104b057600435906024359060443573ffffffffffffffffffffffffffffffffffffffff811681036104b0579060643590565b1561170157565b606460405162461bcd60e51b815260206004820152601460248201527f546f646f206e6963652074696d65206572726f720000000000000000000000006044820152fd5b67ffffffffffffffff811161175957604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040810190811067ffffffffffffffff82111761175957604052565b6080810190811067ffffffffffffffff82111761175957604052565b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff82111761175957604052565b91908260409103126104b0576020825192015190565b807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04821181151516611848570290565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8115611881570490565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b156118b757565b606460405162461bcd60e51b815260206004820152601060248201527f546f646f206e696365206572726f7273000000000000000000000000000000006044820152fd5b81198111611848570190565b8051156119145760200190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b90815180825260208080930193019160005b828110611963575050505090565b835185529381019392810192600101611955565b818110611848570390565b906fffffffffffffffffffffffffffffffff8080931691168092038111611848570190565b93919392909283151580611ca1575b15611c5d57611a2b611aea936119cd4284116116fa565b610350611a246119e6896119e1858b611817565b6118fb565b6103506119f38589611817565b9a611a1f7f0000000000000000000000000000000000000000000000000000000000000000809d611877565b611817565b9788611817565b93604094855193611a3b85611788565b600185526020948536818301377f8000000000000000000000000000000000000000000000000000000000000000611a7282611907565b5287611ad88b825193611a8485611788565b6001855289368187013786611a9886611907565b5283519a8b95869485937f9a90b9080000000000000000000000000000000000000000000000000000000085526101006004860152610104850190611943565b90600319848303016024850152611943565b60009b8c9182604483015282606483015273ffffffffffffffffffffffffffffffffffffffff80951660848301523060a48301524260c48301528b60e483015203927f0000000000000000000000000000000000000000000000000000000000000000165af180156114da5793611b9c611b94611b7f600896611be89a96611c3e9e9d9a96611bfe9d9a611c41575b50611977565b9284885260018652610350848a8a2054611817565b809c846121b5565b818552838352858520907fffffffffffffffffffffffffffffffff000000000000000000000000000000008254916fffffffffffffffffffffffffffffffff998a809216828516611982565b169116179055835252209216825460801c611982565b6fffffffffffffffffffffffffffffffff7fffffffffffffffffffffffffffffffff0000000000000000000000000000000083549260801b169116179055565b90565b611c57908c8d3d106103c0576103b081836117c0565b50611b79565b606460405162461bcd60e51b815260206004820152601e60248201527f746f646f206e69636520696e697469616c697a6174696f6e206572726f7200006044820152fd5b508415156119b6565b90926000828152602090600882526040908181205460801c946fffffffffffffffffffffffffffffffff93848484205416978242101580611f0a575b611e34575b859088999a84869a999a52600184528587812054928186528882209073ffffffffffffffffffffffffffffffffffffffff1690818352865288822083815490611d3391611977565b90558682526001865288822083815490611d4c91611977565b9055888051888152848882015233917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6291a481611d898d83611817565b90611d9391611877565b9b8c611d9e91611977565b98611da891611817565b90611db291611877565b9889611dbd91611977565b928452600890915283832080546fffffffffffffffffffffffffffffffff169190921660801b7fffffffffffffffffffffffffffffffff000000000000000000000000000000001617905520911681547fffffffffffffffffffffffffffffffff0000000000000000000000000000000016179055565b849896979851987fa2ea09d9000000000000000000000000000000000000000000000000000000008a528460048b015260248a01528260448a01523060648a015284896084818773ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165af1988915611f00578499611edd575b508590611ed1859a8b996118fb565b99509050969596611ceb565b86919950611ef790863d88116103c0576103b081836117c0565b90509890611ec2565b85513d86823e3d90fd5b50871515611ce6565b60405160208101913083526040820152604081526060810181811067ffffffffffffffff8211176117595773ffffffffffffffffffffffffffffffffffffffff9281604052825190209160808101927fff0000000000000000000000000000000000000000000000000000000000000084527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000060601b166081830152609582015260b57f000000000000000000000000000000000000000000000000000000000000000091015260558152612008816117a4565b5190201690565b919373ffffffffffffffffffffffffffffffffffffffff91821693908216927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6292918585036120af575b60009282845283602052604093849182822089835260205282822061207f858254611977565b905584825281602052828220991698898252602052206120a08282546118fb565b905582519182526020820152a4565b600086815260209060028252604091828220888352815260ff8383205416156120db575b505050612059565b84825260038152828220898352815282822088835281527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8383205403156120d357848252600381528282208983528152828220908883525220612140828254611977565b90553880806120d3565b827f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92592949360406020936000908152600385528181209673ffffffffffffffffffffffffffffffffffffffff80911697888352865282822098169788825285522055604051908152a3565b9190916000918183528260205273ffffffffffffffffffffffffffffffffffffffff60408420941693848452602052604083206121f38282546118fb565b905581835260016020526040832061220c8282546118fb565b905560405191825260208201527fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6260403392a4565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146118485760010190565b91908110156119145760051b019056fea2646970667358221220323226bedf8b4c4de305d9826f10475b8da6cfef85ecdb9f2e69d960cd1c0a7064736f6c634300080f0033";
var isSuperArgs = function (xs) { return xs.length > 1; };
var LP__factory = /** @class */ (function (_super) {
    __extends(LP__factory, _super);
    function LP__factory() {
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
    LP__factory.prototype.deploy = function (_token, _term, _linkerCodeHash, _factory, overrides) {
        return _super.prototype.deploy.call(this, _token, _term, _linkerCodeHash, _factory, overrides || {});
    };
    LP__factory.prototype.getDeployTransaction = function (_token, _term, _linkerCodeHash, _factory, overrides) {
        return _super.prototype.getDeployTransaction.call(this, _token, _term, _linkerCodeHash, _factory, overrides || {});
    };
    LP__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    LP__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    LP__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    LP__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    LP__factory.bytecode = _bytecode;
    LP__factory.abi = _abi;
    return LP__factory;
}(ethers_1.ContractFactory));
exports.LP__factory = LP__factory;
