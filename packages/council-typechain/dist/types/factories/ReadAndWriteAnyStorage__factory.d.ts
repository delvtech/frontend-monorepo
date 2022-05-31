import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ReadAndWriteAnyStorage,
  ReadAndWriteAnyStorageInterface,
} from "../ReadAndWriteAnyStorage";
export declare class ReadAndWriteAnyStorage__factory extends ContractFactory {
  constructor(signer?: Signer);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ReadAndWriteAnyStorage>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): ReadAndWriteAnyStorage;
  connect(signer: Signer): ReadAndWriteAnyStorage__factory;
  static readonly bytecode =
    "0x608060405234801561001057600080fd5b5060d68061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060325760003560e01c80632cab8335146037578063e10af4ad146058575b600080fd5b604660423660046069565b5490565b60405190815260200160405180910390f35b606760633660046080565b9055565b005b6000602082840312156079578081fd5b5035919050565b600080604083850312156091578081fd5b5050803592602090910135915056fea2646970667358221220770357450172981f64f5a15e108cbb6d601fb17bf92a717e4a302b00d2dbb00b64736f6c63430008030033";
  static readonly abi: {
    inputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    name: string;
    outputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): ReadAndWriteAnyStorageInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): ReadAndWriteAnyStorage;
}
