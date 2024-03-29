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
exports.TWAROracle__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [],
        name: "TWAROracle_IndexOutOfBounds",
        type: "error",
    },
    {
        inputs: [],
        name: "TWAROracle_NotEnoughElements",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "metadata",
                type: "uint256",
            },
        ],
        name: "UpdateBuffer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "bufferId",
                type: "uint256",
            },
            {
                internalType: "uint32",
                name: "timeInSeconds",
                type: "uint32",
            },
        ],
        name: "calculateAverageWeightedValue",
        outputs: [
            {
                internalType: "uint256",
                name: "averageWeightedValue",
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
                name: "bufferId",
                type: "uint256",
            },
        ],
        name: "readMetadataParsed",
        outputs: [
            {
                internalType: "uint32",
                name: "minTimeStep",
                type: "uint32",
            },
            {
                internalType: "uint32",
                name: "timeStamp",
                type: "uint32",
            },
            {
                internalType: "uint16",
                name: "headIndex",
                type: "uint16",
            },
            {
                internalType: "uint16",
                name: "maxLength",
                type: "uint16",
            },
            {
                internalType: "uint16",
                name: "bufferLength",
                type: "uint16",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "bufferId",
                type: "uint256",
            },
            {
                internalType: "uint16",
                name: "index",
                type: "uint16",
            },
        ],
        name: "readSumAndTimeStampForPool",
        outputs: [
            {
                internalType: "uint32",
                name: "timeStamp",
                type: "uint32",
            },
            {
                internalType: "uint224",
                name: "cumulativeSum",
                type: "uint224",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
var _bytecode = "0x60808060405234610016576106cc908161001c8239f35b600080fdfe604060808152600436101561001357600080fd5b6000803560e01c806362549f281461011a578063763d768d146100bf5763fe2f3f161461003f57600080fd5b346100bc57817ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126100bc576024359061ffff821682036100bc57506100a67bffffffffffffffffffffffffffffffffffffffffffffffffffffffff916004356101b9565b63ffffffff849392935193168352166020820152f35b80fd5b50903461011657807ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112610116576024359163ffffffff831683036100bc575061010f6020926004356103db565b9051908152f35b5080fd5b5090346101165760207ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc3601126101165760a090610189600435600052600060205260406000205461ffff80821690808360101c16908360201c169163ffffffff808560301c169460501c1694565b92949384519563ffffffff809216875216602086015261ffff938480931690860152166060840152166080820152f35b6101f281600052600060205260406000205461ffff80821690808360101c16908360201c169163ffffffff808560301c169460501c1694565b935050505061ffff80911690831610156102785760009081528060205260408120805483101561024b579060209181522001547bffffffffffffffffffffffffffffffffffffffffffffffffffffffff81169060e01c91565b6024827f4e487b710000000000000000000000000000000000000000000000000000000081526032600452fd5b60046040517f5c19474d000000000000000000000000000000000000000000000000000000008152fd5b61ffff1661fffe81116102b55760010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b9061ffff8091169182156102f757160690565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b8181106102b5570390565b61ffff16600181106102b5577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff91821691168181106102b5570390565b63ffffffff91821691168181106102b5570390565b907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8091169182156102f757160490565b81156102f7570490565b61041481600052600060205260406000205461ffff80821690808360101c16908360201c169163ffffffff808560301c169460501c1694565b92509492509261ffff809216906001918281111561066c5760009087851603610666575061044a86610445876102a2565b6102e4565b945b61045d63ffffffff80961642610326565b9161046882826101b9565b989097889684916000978a8c16968789116106055750805b61059e575b508282169116036104d65750505050506104d29392916104c56104cb927bffffffffffffffffffffffffffffffffffffffffffffffffffffffff97610362565b9361038f565b16906103a4565b1690565b6104f3939850906104456104ed929a98959a6102a2565b906101b9565b9190816105227bffffffffffffffffffffffffffffffffffffffffffffffffffffffff80809616961686610326565b91169461052f8987610326565b90827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048211831515166102b55761057e9661057794610570921690610326565b91026103d1565b9316610326565b91811983116102b55761059b9361059491610326565b91016103d1565b90565b989097878b83959495161015806105f7575b156105ec5750508082166105dd57506105c882610331565b905b6105d482856101b9565b97909880610480565b6105e690610331565b906105ca565b979098929192610485565b5083891684841614156105b0565b929150506104d29a9998507bffffffffffffffffffffffffffffffffffffffffffffffffffffffff9b96506104c59550610655949392506104cb975081161560001461065c57506104ed90610331565b9092610362565b6104ed9150610331565b9461044c565b60046040517feec61350000000000000000000000000000000000000000000000000000000008152fdfea26469706673582212208e088b2991a5974f1a2110104c52ec8225e84a42c12ce081e6731130048d9b5164736f6c634300080f0033";
var isSuperArgs = function (xs) { return xs.length > 1; };
var TWAROracle__factory = /** @class */ (function (_super) {
    __extends(TWAROracle__factory, _super);
    function TWAROracle__factory() {
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
    TWAROracle__factory.prototype.deploy = function (overrides) {
        return _super.prototype.deploy.call(this, overrides || {});
    };
    TWAROracle__factory.prototype.getDeployTransaction = function (overrides) {
        return _super.prototype.getDeployTransaction.call(this, overrides || {});
    };
    TWAROracle__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    TWAROracle__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    TWAROracle__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    TWAROracle__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    TWAROracle__factory.bytecode = _bytecode;
    TWAROracle__factory.abi = _abi;
    return TWAROracle__factory;
}(ethers_1.ContractFactory));
exports.TWAROracle__factory = TWAROracle__factory;
