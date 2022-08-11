import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ICompoundV3, ICompoundV3Interface } from "../../../contracts/interfaces/ICompoundV3";
export declare class ICompoundV3__factory {
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
    static createInterface(): ICompoundV3Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): ICompoundV3;
}
