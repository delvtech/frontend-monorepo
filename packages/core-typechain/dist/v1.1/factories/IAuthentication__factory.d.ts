import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IAuthentication,
  IAuthenticationInterface,
} from "../IAuthentication";
export declare class IAuthentication__factory {
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
  static createInterface(): IAuthenticationInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): IAuthentication;
}
