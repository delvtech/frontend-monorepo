import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { CurvePool2, CurvePool2Interface } from "../CurvePool2";
export declare class CurvePool2__factory {
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
  static createInterface(): CurvePool2Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CurvePool2;
}
