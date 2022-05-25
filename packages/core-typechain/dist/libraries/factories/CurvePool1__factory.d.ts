import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { CurvePool1, CurvePool1Interface } from "../CurvePool1";
export declare class CurvePool1__factory {
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
  static createInterface(): CurvePool1Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CurvePool1;
}
