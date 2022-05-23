import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  CErc20Interface,
  CErc20InterfaceInterface,
} from "../CErc20Interface";
export declare class CErc20Interface__factory {
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
  static createInterface(): CErc20InterfaceInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CErc20Interface;
}
