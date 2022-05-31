import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IInterestTokenFactory,
  IInterestTokenFactoryInterface,
} from "../IInterestTokenFactory";
export declare class IInterestTokenFactory__factory {
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
  static createInterface(): IInterestTokenFactoryInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): IInterestTokenFactory;
}
