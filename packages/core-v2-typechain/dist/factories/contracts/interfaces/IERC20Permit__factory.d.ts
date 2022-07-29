import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IERC20Permit, IERC20PermitInterface } from "../../../contracts/interfaces/IERC20Permit";
export declare class IERC20Permit__factory {
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
    static createInterface(): IERC20PermitInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IERC20Permit;
}
