import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  ITrancheFactory,
  ITrancheFactoryInterface,
} from "../ITrancheFactory";
export declare class ITrancheFactory__factory {
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
  static createInterface(): ITrancheFactoryInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): ITrancheFactory;
}
