import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { CurveContract, CurveContractInterface } from "../CurveContract";
export declare class CurveContract__factory {
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
  static createInterface(): CurveContractInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CurveContract;
}
