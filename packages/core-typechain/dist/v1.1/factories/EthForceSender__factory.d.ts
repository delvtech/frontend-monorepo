import { Signer, ContractFactory, PayableOverrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  EthForceSender,
  EthForceSenderInterface,
} from "../EthForceSender";
declare type EthForceSenderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class EthForceSender__factory extends ContractFactory {
  constructor(...args: EthForceSenderConstructorParams);
  deploy(
    recipient: string,
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    },
  ): Promise<EthForceSender>;
  getDeployTransaction(
    recipient: string,
    overrides?: PayableOverrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): EthForceSender;
  connect(signer: Signer): EthForceSender__factory;
  static readonly bytecode =
    "0x6080604052604051604e380380604e83398181016040526020811015602357600080fd5b81019080805190602001909291905050508073ffffffffffffffffffffffffffffffffffffffff16fffe";
  static readonly abi: {
    inputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): EthForceSenderInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): EthForceSender;
}
export {};
