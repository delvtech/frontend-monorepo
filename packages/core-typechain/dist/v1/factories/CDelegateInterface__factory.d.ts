import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  CDelegateInterface,
  CDelegateInterfaceInterface,
} from "../CDelegateInterface";
export declare class CDelegateInterface__factory {
  static readonly abi: (
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
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
      }
  )[];
  static createInterface(): CDelegateInterfaceInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): CDelegateInterface;
}
