import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IPlonkVerifier, IPlonkVerifierInterface } from "../IPlonkVerifier";
export declare class IPlonkVerifier__factory {
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
    static createInterface(): IPlonkVerifierInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IPlonkVerifier;
}
