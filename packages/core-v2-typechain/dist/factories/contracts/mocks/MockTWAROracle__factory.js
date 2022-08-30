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
exports.MockTWAROracle__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [],
        name: "TWAROracle_BufferAlreadyInitialized",
        type: "error",
    },
    {
        inputs: [],
        name: "TWAROracle_IncorrectBufferLength",
        type: "error",
    },
    {
        inputs: [],
        name: "TWAROracle_IndexOutOfBounds",
        type: "error",
    },
    {
        inputs: [],
        name: "TWAROracle_MinTimeStepMustBeNonZero",
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
            {
                internalType: "uint16",
                name: "maxTime",
                type: "uint16",
            },
            {
                internalType: "uint16",
                name: "maxLength",
                type: "uint16",
            },
        ],
        name: "initializeBuffer",
        outputs: [],
        stateMutability: "nonpayable",
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
    {
        inputs: [
            {
                internalType: "uint256",
                name: "bufferId",
                type: "uint256",
            },
            {
                internalType: "uint224",
                name: "price",
                type: "uint224",
            },
        ],
        name: "updateBuffer",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
var _bytecode = "0x6080806040523461001657610aa7908161001c8239f35b600080fdfe60406080815260048036101561001457600080fd5b6000803560e01c806362549f28146102b357806372f1b5fc14610267578063763d768d1461022e578063c646c13c146100b05763fe2f3f161461005657600080fd5b346100ad57826003193601126100ad57506100977bffffffffffffffffffffffffffffffffffffffffffffffffffffffff91610090610334565b9035610391565b63ffffffff849392935193168352166020820152f35b80fd5b5091903461022a57606060031936011261022a5780356100ce610334565b906044359161ffff808416918285036102265760018311156101fe578161012485600052600060205260406000205461ffff80821690808360101c16908360201c169163ffffffff808560301c169460501c1694565b5092505050166101d65782156101aa5716049263ffffffff84161561018357509063ffff00009185528460205260101b16906dffffffff0000000000000000000069ffffffff0000000000004260301b169160501b1617178183205551f35b84517f56d1e7e7000000000000000000000000000000000000000000000000000000008152fd5b6024886012887f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b8587517f38b1691a000000000000000000000000000000000000000000000000000000008152fd5b8587517fcc51fbf6000000000000000000000000000000000000000000000000000000008152fd5b8780fd5b8280fd5b5091903461022a578160031936011261022a576024359263ffffffff841684036100ad57506020926102609135610585565b9051908152f35b5091903461022a578160031936011261022a576024357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff811681036102af576102ac9135610840565b51f35b8380fd5b508290346100ad5760206003193601126100ad575061030460a09235600052600060205260406000205461ffff80821690808360101c16908360201c169163ffffffff808560301c169460501c1694565b92949384519563ffffffff809216875216602086015261ffff938480931690860152166060840152166080820152f35b6024359061ffff8216820361034557565b600080fd5b80548210156103625760005260206000200190600090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b906103cb82600052600060205260406000205461ffff80821690808360101c16908360201c169163ffffffff808560301c169460501c1694565b935050505061ffff8091169082161015610422576103f5916000526000602052604060002061034a565b90549060031b1c7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff81169060e01c91565b60046040517f5c19474d000000000000000000000000000000000000000000000000000000008152fd5b61ffff1661fffe811161045f5760010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b9061ffff8091169182156104a157160690565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b81811061045f570390565b61ffff166001811061045f577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0190565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff918216911681811061045f570390565b63ffffffff918216911681811061045f570390565b907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8091169182156104a157160490565b81156104a1570490565b6105be81600052600060205260406000205461ffff80821690808360101c16908360201c169163ffffffff808560301c169460501c1694565b92509492509261ffff8092169060019182811115610816576000908785160361081057506105f4866105ef8761044c565b61048e565b945b61060763ffffffff809616426104d0565b916106128282610391565b989097889684916000978a8c16968789116107af5750805b610748575b5082821691160361068057505050505061067c93929161066f610675927bffffffffffffffffffffffffffffffffffffffffffffffffffffffff9761050c565b93610539565b169061054e565b1690565b61069d939850906105ef610697929a98959a61044c565b90610391565b9190816106cc7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff808096169616866104d0565b9116946106d989876104d0565b90827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0482118315151661045f57610728966107219461071a9216906104d0565b910261057b565b93166104d0565b918119831161045f576107459361073e916104d0565b910161057b565b90565b989097878b83959495161015806107a1575b156107965750508082166107875750610772826104db565b905b61077e8285610391565b9790988061062a565b610790906104db565b90610774565b97909892919261062f565b50838916848416141561075a565b9291505061067c9a9998507bffffffffffffffffffffffffffffffffffffffffffffffffffffffff9b965061066f95506107ff9493925061067597508116156000146108065750610697906104db565b909261050c565b61069791506104db565b946105f6565b60046040517feec61350000000000000000000000000000000000000000000000000000000008152fd5b9061087a82600052600060205260406000205461ffff80821690808360101c16908360201c169163ffffffff808560301c169460501c1694565b9092959391819063ffffffff95864216976108958a8a610539565b888088169116108015610a65575b610a5957600091825281602052604082209761ffff8096169a8b159a8b15610a1b575b906108d091610539565b167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff80921680830482118115151661045f57028116918116808203831161045f57879201164260e01b1797600014610a095750506000965b82851681106109ea575b50958594936040969363ffff00006109a7947fea7c39ed8c4fd0c62d6ec8483ffbdb35a146cc6ab03f84652e7d4837c6f85e609a169260101b169065ffff000000008460201b16906dffffffff0000000000000000000069ffffffff0000000000004260301b169160501b16171717179384815561034a565b819291549060031b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff811b9283911b1691191617905582519182526020820152a1565b9295949396905081831461045f5795939492939291600101604061092e565b6105ef610a159261044c565b96610924565b93506108d0907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff610a48878d61034a565b90549060031b1c16949091506108c6565b50505050505050505050565b5061ffff8716156108a356fea264697066735822122062324735a35539b8a76661f4f4cfcd1dc8a3a18e4222216b16bc1fb5aa49a15c64736f6c634300080f0033";
var isSuperArgs = function (xs) { return xs.length > 1; };
var MockTWAROracle__factory = /** @class */ (function (_super) {
    __extends(MockTWAROracle__factory, _super);
    function MockTWAROracle__factory() {
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
    MockTWAROracle__factory.prototype.deploy = function (overrides) {
        return _super.prototype.deploy.call(this, overrides || {});
    };
    MockTWAROracle__factory.prototype.getDeployTransaction = function (overrides) {
        return _super.prototype.getDeployTransaction.call(this, overrides || {});
    };
    MockTWAROracle__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    MockTWAROracle__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    MockTWAROracle__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    MockTWAROracle__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    MockTWAROracle__factory.bytecode = _bytecode;
    MockTWAROracle__factory.abi = _abi;
    return MockTWAROracle__factory;
}(ethers_1.ContractFactory));
exports.MockTWAROracle__factory = MockTWAROracle__factory;
