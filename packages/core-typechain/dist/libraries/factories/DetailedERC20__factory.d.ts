import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { DetailedERC20, DetailedERC20Interface } from "../DetailedERC20";
export declare class DetailedERC20__factory {
  static readonly abi: (
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        inputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        constant?: undefined;
        name?: undefined;
        outputs?: undefined;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): DetailedERC20Interface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): DetailedERC20;
}
