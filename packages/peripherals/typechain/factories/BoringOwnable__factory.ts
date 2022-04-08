/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { BoringOwnable, BoringOwnableInterface } from "../BoringOwnable";

const _abi = [
  {
    inputs: [],
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
    name: "claimOwnership",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "pendingOwner",
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
        name: "newOwner",
        type: "address",
      },
      {
        internalType: "bool",
        name: "direct",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "renounce",
        type: "bool",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50600080546001600160a01b0319163390811782556040519091907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a36104558061005f6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063078dfbe7146100515780634e71e0c8146100965780638da5cb5b1461009e578063e30c3978146100cf575b600080fd5b6100946004803603606081101561006757600080fd5b5073ffffffffffffffffffffffffffffffffffffffff8135169060208101351515906040013515156100d7565b005b6100946102cc565b6100a66103e7565b6040805173ffffffffffffffffffffffffffffffffffffffff9092168252519081900360200190f35b6100a6610403565b60005473ffffffffffffffffffffffffffffffffffffffff16331461015d57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b81156102865773ffffffffffffffffffffffffffffffffffffffff83161515806101845750805b6101ef57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601560248201527f4f776e61626c653a207a65726f20616464726573730000000000000000000000604482015290519081900360640190fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808716939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff85167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216179091556001805490911690556102c7565b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff85161790555b505050565b60015473ffffffffffffffffffffffffffffffffffffffff1633811461035357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820181905260248201527f4f776e61626c653a2063616c6c657220213d2070656e64696e67206f776e6572604482015290519081900360640190fd5b6000805460405173ffffffffffffffffffffffffffffffffffffffff808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a36000805473ffffffffffffffffffffffffffffffffffffffff9092167fffffffffffffffffffffffff0000000000000000000000000000000000000000928316179055600180549091169055565b60005473ffffffffffffffffffffffffffffffffffffffff1681565b60015473ffffffffffffffffffffffffffffffffffffffff168156fea26469706673582212200f0c344b96d3353dfbe3d2bd2d34b88ec15a1ca4cac2a652fe251e12b109fff564736f6c634300060c0033";

type BoringOwnableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BoringOwnableConstructorParams,
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BoringOwnable__factory extends ContractFactory {
  constructor(...args: BoringOwnableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<BoringOwnable> {
    return super.deploy(overrides || {}) as Promise<BoringOwnable>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> },
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): BoringOwnable {
    return super.attach(address) as BoringOwnable;
  }
  connect(signer: Signer): BoringOwnable__factory {
    return super.connect(signer) as BoringOwnable__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BoringOwnableInterface {
    return new utils.Interface(_abi) as BoringOwnableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): BoringOwnable {
    return new Contract(address, _abi, signerOrProvider) as BoringOwnable;
  }
}