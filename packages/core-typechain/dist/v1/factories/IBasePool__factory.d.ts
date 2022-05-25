import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IBasePool, IBasePoolInterface } from "../IBasePool";
export declare class IBasePool__factory {
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
  static createInterface(): IBasePoolInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): IBasePool;
}
