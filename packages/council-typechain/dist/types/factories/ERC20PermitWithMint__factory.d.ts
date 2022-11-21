import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ERC20PermitWithMint, ERC20PermitWithMintInterface } from "../ERC20PermitWithMint";
export declare class ERC20PermitWithMint__factory {
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
    static createInterface(): ERC20PermitWithMintInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC20PermitWithMint;
}
