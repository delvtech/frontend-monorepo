import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IWrappedCoveredPrincipalToken,
  IWrappedCoveredPrincipalTokenInterface,
} from "../IWrappedCoveredPrincipalToken";
export declare class IWrappedCoveredPrincipalToken__factory {
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
        outputs: never[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
  )[];
  static createInterface(): IWrappedCoveredPrincipalTokenInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): IWrappedCoveredPrincipalToken;
}
