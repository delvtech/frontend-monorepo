import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  SignaturesValidator,
  SignaturesValidatorInterface,
} from "../SignaturesValidator";
export declare class SignaturesValidator__factory {
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
  static createInterface(): SignaturesValidatorInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): SignaturesValidator;
}
