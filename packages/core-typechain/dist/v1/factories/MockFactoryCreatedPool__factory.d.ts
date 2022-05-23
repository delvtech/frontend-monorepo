import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MockFactoryCreatedPool,
  MockFactoryCreatedPoolInterface,
} from "../MockFactoryCreatedPool";
declare type MockFactoryCreatedPoolConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class MockFactoryCreatedPool__factory extends ContractFactory {
  constructor(...args: MockFactoryCreatedPoolConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<MockFactoryCreatedPool>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): MockFactoryCreatedPool;
  connect(signer: Signer): MockFactoryCreatedPool__factory;
  static readonly bytecode =
    "0x608060405234801561001057600080fd5b5060ce8061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806338fff2d014602d575b600080fd5b60336047565b604051603e91906075565b60405180910390f35b60003073ffffffffffffffffffffffffffffffffffffffff1660001b905090565b606f81608e565b82525050565b6000602082019050608860008301846068565b92915050565b600081905091905056fea2646970667358221220c467021b4f725a3e82608b00d98a059fc1dc2727e2b1ed0870007f0e392154e464736f6c63430007010033";
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
  static createInterface(): MockFactoryCreatedPoolInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): MockFactoryCreatedPool;
}
export {};
