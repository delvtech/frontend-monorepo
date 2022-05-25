"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalancerErrorsMock__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "code",
        type: "uint256",
      },
    ],
    name: "fail",
    outputs: [],
    stateMutability: "pure",
    type: "function",
  },
];
const _bytecode =
  "0x6080604052348015600f57600080fd5b506101088061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063132e4f3c14602d575b600080fd5b605660048036036020811015604157600080fd5b81019080803590602001909291905050506058565b005b605f816062565b50565b6030600a820601600a820491506030600a830601600a830492506030600a8406018060101b8260081b8401016642414c230000000160c81b7f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260076024528060445260646000fdfea26469706673582212207a48243421f8356512f9590c869e9a25715606e6a699d634a553f9b125f7883f64736f6c63430007010033";
const isSuperArgs = (xs) => xs.length > 1;
class BalancerErrorsMock__factory extends ethers_1.ContractFactory {
  constructor(...args) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }
  deploy(overrides) {
    return super.deploy(overrides || {});
  }
  getDeployTransaction(overrides) {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address) {
    return super.attach(address);
  }
  connect(signer) {
    return super.connect(signer);
  }
  static createInterface() {
    return new ethers_1.utils.Interface(_abi);
  }
  static connect(address, signerOrProvider) {
    return new ethers_1.Contract(address, _abi, signerOrProvider);
  }
}
exports.BalancerErrorsMock__factory = BalancerErrorsMock__factory;
BalancerErrorsMock__factory.bytecode = _bytecode;
BalancerErrorsMock__factory.abi = _abi;
