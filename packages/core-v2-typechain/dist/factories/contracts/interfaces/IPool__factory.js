"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPool__factory = void 0;
var ethers_1 = require("ethers");
var _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "lpOut",
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
        ],
        name: "exitPool",
        outputs: [
            {
                internalType: "uint256",
                name: "baseOut",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "bondOut",
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
                name: "amountBond",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "amountBase",
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
        ],
        name: "joinPool",
        outputs: [
            {
                internalType: "uint256",
                name: "lpOut",
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
                name: "amountIn",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "baseIn",
                type: "bool",
            },
            {
                internalType: "uint256",
                name: "poolId",
                type: "uint256",
            },
        ],
        name: "quote",
        outputs: [
            {
                internalType: "uint256",
                name: "amountOut",
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
                name: "lpAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "inputPoolId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "outputPoolId",
                type: "uint256",
            },
        ],
        name: "rollover",
        outputs: [
            {
                internalType: "uint256",
                name: "baseOut",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "bondOut",
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
                name: "amountIn",
                type: "uint256",
            },
            {
                internalType: "bool",
                name: "baseIn",
                type: "bool",
            },
            {
                internalType: "uint256",
                name: "poolId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "minAmountOut",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "destination",
                type: "address",
            },
        ],
        name: "trade",
        outputs: [
            {
                internalType: "uint256",
                name: "amountOut",
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
                name: "soldAmount",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "poolId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "maxAmountIn",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "destination",
                type: "address",
            },
        ],
        name: "virtualPrincipalSale",
        outputs: [
            {
                internalType: "uint256",
                name: "basePaid",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "ytBought",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
];
var IPool__factory = /** @class */ (function () {
    function IPool__factory() {
    }
    IPool__factory.createInterface = function () {
        return new ethers_1.utils.Interface(_abi);
    };
    IPool__factory.connect = function (address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    };
    IPool__factory.abi = _abi;
    return IPool__factory;
}());
exports.IPool__factory = IPool__factory;