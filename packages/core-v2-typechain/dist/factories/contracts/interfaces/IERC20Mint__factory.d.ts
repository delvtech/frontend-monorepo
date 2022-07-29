import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC20Mint, IERC20MintInterface } from "../../../contracts/interfaces/IERC20Mint";
export declare class IERC20Mint__factory {
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
    static createInterface(): IERC20MintInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC20Mint;
}
