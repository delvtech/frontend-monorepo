import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IVotingVault, IVotingVaultInterface } from "../IVotingVault";
export declare class IVotingVault__factory {
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
    static createInterface(): IVotingVaultInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IVotingVault;
}
