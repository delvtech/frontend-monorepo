import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  CurveStethPool,
  CurveStethPoolInterface,
} from "../CurveStethPool";
export declare class CurveStethPool__factory {
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
  static createInterface(): CurveStethPoolInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CurveStethPool;
}
