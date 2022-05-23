import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  MinimalSwapInfoPoolsBalance,
  MinimalSwapInfoPoolsBalanceInterface,
} from "../MinimalSwapInfoPoolsBalance";
export declare class MinimalSwapInfoPoolsBalance__factory {
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
        inputs: (
          | {
              internalType: string;
              name: string;
              type: string;
              components?: undefined;
            }
          | {
              components: {
                internalType: string;
                name: string;
                type: string;
              }[];
              internalType: string;
              name: string;
              type: string;
            }
        )[];
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
  static createInterface(): MinimalSwapInfoPoolsBalanceInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): MinimalSwapInfoPoolsBalance;
}
