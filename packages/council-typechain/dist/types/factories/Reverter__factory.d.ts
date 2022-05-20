import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Reverter, ReverterInterface } from "../Reverter";
export declare class Reverter__factory extends ContractFactory {
  constructor(signer?: Signer);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<Reverter>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): Reverter;
  connect(signer: Signer): Reverter__factory;
  static readonly bytecode =
    "0x6080604052348015600f57600080fd5b50606b80601d6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063a9cc471814602d575b600080fd5b60336028565b00fea26469706673582212207dde1aaa311dcf0eb0200351ecd39ca261612edd47b2358dc42029a54ed9dc2964736f6c63430008030033";
  static readonly abi: {
    inputs: never[];
    name: string;
    outputs: never[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): ReverterInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): Reverter;
}
