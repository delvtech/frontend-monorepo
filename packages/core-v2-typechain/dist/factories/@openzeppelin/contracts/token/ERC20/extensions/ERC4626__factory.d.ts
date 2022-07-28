import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { ERC4626, ERC4626Interface } from "../../../../../../@openzeppelin/contracts/token/ERC20/extensions/ERC4626";
export declare class ERC4626__factory {
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
    static createInterface(): ERC4626Interface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC4626;
}
