import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ICoreVoting, ICoreVotingInterface } from "../ICoreVoting";
export declare class ICoreVoting__factory {
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
  static createInterface(): ICoreVotingInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): ICoreVoting;
}
