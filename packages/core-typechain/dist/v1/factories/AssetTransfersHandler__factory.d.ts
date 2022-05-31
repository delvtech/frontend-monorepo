import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  AssetTransfersHandler,
  AssetTransfersHandlerInterface,
} from "../AssetTransfersHandler";
export declare class AssetTransfersHandler__factory {
  static readonly abi: {
    stateMutability: string;
    type: string;
  }[];
  static createInterface(): AssetTransfersHandlerInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): AssetTransfersHandler;
}
