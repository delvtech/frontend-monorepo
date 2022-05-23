import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IWeightedPoolPriceOracle,
  IWeightedPoolPriceOracleInterface,
} from "../IWeightedPoolPriceOracle";
export declare class IWeightedPoolPriceOracle__factory {
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
  static createInterface(): IWeightedPoolPriceOracleInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): IWeightedPoolPriceOracle;
}
