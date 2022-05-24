import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { CurvePool3, CurvePool3Interface } from "../CurvePool3";
export declare class CurvePool3__factory {
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
  static createInterface(): CurvePool3Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CurvePool3;
}
