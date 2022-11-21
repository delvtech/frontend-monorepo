import { Signer } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { AbstractMerkleRewards, AbstractMerkleRewardsInterface } from "../AbstractMerkleRewards";
export declare class AbstractMerkleRewards__factory {
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
    static createInterface(): AbstractMerkleRewardsInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): AbstractMerkleRewards;
}
