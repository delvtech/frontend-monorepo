import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IAuthorizer, IAuthorizerInterface } from "../IAuthorizer";
export declare class IAuthorizer__factory {
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
  static createInterface(): IAuthorizerInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): IAuthorizer;
}
