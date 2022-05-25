import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  ITemporarilyPausable,
  ITemporarilyPausableInterface,
} from "../ITemporarilyPausable";
export declare class ITemporarilyPausable__factory {
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
        inputs: never[];
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
  static createInterface(): ITemporarilyPausableInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): ITemporarilyPausable;
}
