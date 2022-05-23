import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IFlashLoanRecipient,
  IFlashLoanRecipientInterface,
} from "../IFlashLoanRecipient";
export declare class IFlashLoanRecipient__factory {
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
  static createInterface(): IFlashLoanRecipientInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): IFlashLoanRecipient;
}
