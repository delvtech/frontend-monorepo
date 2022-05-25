import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { CErc20Storage, CErc20StorageInterface } from "../CErc20Storage";
export declare class CErc20Storage__factory {
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
  static createInterface(): CErc20StorageInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CErc20Storage;
}
