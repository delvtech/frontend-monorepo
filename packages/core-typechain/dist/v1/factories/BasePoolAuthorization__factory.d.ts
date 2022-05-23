import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  BasePoolAuthorization,
  BasePoolAuthorizationInterface,
} from "../BasePoolAuthorization";
export declare class BasePoolAuthorization__factory {
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
  static createInterface(): BasePoolAuthorizationInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): BasePoolAuthorization;
}
