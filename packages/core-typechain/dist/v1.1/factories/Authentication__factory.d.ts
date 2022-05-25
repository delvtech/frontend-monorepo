import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  Authentication,
  AuthenticationInterface,
} from "../Authentication";
export declare class Authentication__factory {
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
  static createInterface(): AuthenticationInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): Authentication;
}
