import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ITerm, ITermInterface } from "../../../contracts/interfaces/ITerm";
export declare class ITerm__factory {
    static readonly abi: ({
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
    } | {
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
    })[];
    static createInterface(): ITermInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ITerm;
}
