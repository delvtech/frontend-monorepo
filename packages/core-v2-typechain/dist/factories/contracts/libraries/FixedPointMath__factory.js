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
exports.FixedPointMath__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [],
        name: "ONE_18",
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
];
var _bytecode = "0x60808060405234601857609a908161001e823930815050f35b600080fdfe6080806040526004361015601257600080fd5b60003560e01c63d33fee4414602657600080fd5b60007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112605f5780670de0b6b3a764000060209252f35b600080fdfea264697066735822122022a32759762d330dc5a6e6601564b51a8099c6918e75b37b04be596c8ae0c1b364736f6c634300080f0033";
var isSuperArgs = function (xs) { return xs.length > 1; };
var FixedPointMath__factory = /** @class */ (function (_super) {
    __extends(FixedPointMath__factory, _super);
    function FixedPointMath__factory() {
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
    FixedPointMath__factory.prototype.deploy = function (overrides) {
        return _super.prototype.deploy.call(this, overrides || {});
    };
    FixedPointMath__factory.prototype.getDeployTransaction = function (overrides) {
        return _super.prototype.getDeployTransaction.call(this, overrides || {});
    };
    FixedPointMath__factory.prototype.attach = function (address) {
        return _super.prototype.attach.call(this, address);
    };
    FixedPointMath__factory.prototype.connect = function (signer) {
        return _super.prototype.connect.call(this, signer);
    };
    FixedPointMath__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    FixedPointMath__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    FixedPointMath__factory.bytecode = _bytecode;
    FixedPointMath__factory.abi = _abi;
    return FixedPointMath__factory;
}(ethers_1.ContractFactory));
exports.FixedPointMath__factory = FixedPointMath__factory;
