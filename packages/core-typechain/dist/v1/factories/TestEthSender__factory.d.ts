import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TestEthSender, TestEthSenderInterface } from "../TestEthSender";
declare type TestEthSenderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class TestEthSender__factory extends ContractFactory {
  constructor(...args: TestEthSenderConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<TestEthSender>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): TestEthSender;
  connect(signer: Signer): TestEthSender__factory;
  static readonly bytecode =
    "0x608060405234801561001057600080fd5b50610146806100206000396000f3fe60806040526004361061001e5760003560e01c806376a54c6014610023575b600080fd5b61003d6004803603810190610038919061009e565b61003f565b005b8073ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f19350505050158015610085573d6000803e3d6000fd5b5050565b600081359050610098816100f9565b92915050565b6000602082840312156100b057600080fd5b60006100be84828501610089565b91505092915050565b60006100d2826100d9565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b610102816100c7565b811461010d57600080fd5b5056fea264697066735822122039743ea7d9e87b0427f3825900263384c5237f1b649b05fffb39eab167623ed064736f6c63430008000033";
  static readonly abi: {
    inputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    name: string;
    outputs: never[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): TestEthSenderInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): TestEthSender;
}
export {};
