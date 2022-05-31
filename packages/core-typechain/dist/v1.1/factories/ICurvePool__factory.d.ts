import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ICurvePool, ICurvePoolInterface } from "../ICurvePool";
export declare class ICurvePool__factory {
  static readonly abi: {
    inputs: {
      internalType: string;
      name: string;
      type: string;
    }[];
    name: string;
    outputs: never[];
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): ICurvePoolInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): ICurvePool;
}
