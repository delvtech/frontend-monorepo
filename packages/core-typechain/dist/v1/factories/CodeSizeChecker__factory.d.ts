import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  CodeSizeChecker,
  CodeSizeCheckerInterface,
} from "../CodeSizeChecker";
declare type CodeSizeCheckerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class CodeSizeChecker__factory extends ContractFactory {
  constructor(...args: CodeSizeCheckerConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<CodeSizeChecker>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): CodeSizeChecker;
  connect(signer: Signer): CodeSizeChecker__factory;
  static readonly bytecode =
    "0x608060405234801561001057600080fd5b5061015c806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c806352872cf314610030575b600080fd5b61004a60048036038101906100459190610080565b610060565b60405161005791906100b8565b60405180910390f35b6000813b9050919050565b60008135905061007a8161010f565b92915050565b60006020828403121561009257600080fd5b60006100a08482850161006b565b91505092915050565b6100b281610105565b82525050565b60006020820190506100cd60008301846100a9565b92915050565b60006100de826100e5565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b610118816100d3565b811461012357600080fd5b5056fea2646970667358221220879a8f364d3872a8d14b0c252088aa361068eb6f0f0566b0e4ca174250af02cd64736f6c63430008000033";
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
  static createInterface(): CodeSizeCheckerInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CodeSizeChecker;
}
export {};
