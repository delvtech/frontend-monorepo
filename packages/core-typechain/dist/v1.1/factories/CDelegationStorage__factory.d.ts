import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  CDelegationStorage,
  CDelegationStorageInterface,
} from "../CDelegationStorage";
declare type CDelegationStorageConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class CDelegationStorage__factory extends ContractFactory {
  constructor(...args: CDelegationStorageConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<CDelegationStorage>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): CDelegationStorage;
  connect(signer: Signer): CDelegationStorage__factory;
  static readonly bytecode =
    "0x608060405234801561001057600080fd5b5060f78061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80635c60da1b14602d575b600080fd5b60336047565b604051603e91906078565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6072816091565b82525050565b6000602082019050608b6000830184606b565b92915050565b6000609a8260a1565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff8216905091905056fea2646970667358221220e93b5d693749d14b94df7dc365568ebdd60e01fa99859586e22131984f80137264736f6c63430008000033";
  static readonly abi: {
    inputs: never[];
    name: string;
    outputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): CDelegationStorageInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CDelegationStorage;
}
export {};
