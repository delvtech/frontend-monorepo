import { Signer, ContractFactory, Overrides, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TestTranche, TestTrancheInterface } from "../TestTranche";
declare type TestTrancheConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class TestTranche__factory extends ContractFactory {
  constructor(...args: TestTrancheConstructorParams);
  deploy(
    baseToken: string,
    timestamp: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<TestTranche>;
  getDeployTransaction(
    baseToken: string,
    timestamp: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): TestTranche;
  connect(signer: Signer): TestTranche__factory;
  static readonly bytecode =
    "0x608060405234801561001057600080fd5b506040516102e13803806102e1833981810160405281019061003291906100aa565b816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806001819055505050610150565b60008151905061008f81610122565b92915050565b6000815190506100a481610139565b92915050565b600080604083850312156100bd57600080fd5b60006100cb85828601610080565b92505060206100dc85828601610095565b9150509250929050565b60006100f1826100f8565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b61012b816100e6565b811461013657600080fd5b50565b61014281610118565b811461014d57600080fd5b50565b6101828061015f6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80636f307dc31461003b578063aa082a9d14610059575b600080fd5b610043610077565b60405161005091906100c8565b60405180910390f35b6100616100a0565b60405161006e91906100e3565b60405180910390f35b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6000600154905090565b6100b381610128565b82525050565b6100c28161011e565b82525050565b60006020820190506100dd60008301846100aa565b92915050565b60006020820190506100f860008301846100b9565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b60006101338261013a565b9050919050565b6000610145826100fe565b905091905056fea2646970667358221220eb4e59c51fe1e6be51a05b8eb3b613c04ebb9a79ac4a37e56b9bc2f83994d4d364736f6c63430008000033";
  static readonly abi: (
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
      }
    | {
        inputs: never[];
        name: string;
        outputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
      }
  )[];
  static createInterface(): TestTrancheInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): TestTranche;
}
export {};
