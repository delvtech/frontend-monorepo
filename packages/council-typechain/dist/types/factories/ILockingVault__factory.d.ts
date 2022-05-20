import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ILockingVault, ILockingVaultInterface } from "../ILockingVault";
export declare class ILockingVault__factory {
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
  static createInterface(): ILockingVaultInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): ILockingVault;
}
