import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ERC20, ERC20Interface } from "../ERC20";
export declare class ERC20__factory {
  static readonly abi: (
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        outputs?: undefined;
        stateMutability?: undefined;
      }
    | {
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
        anonymous?: undefined;
      }
  )[];
  static createInterface(): ERC20Interface;
  static connect(address: string, signerOrProvider: Signer | Provider): ERC20;
}
