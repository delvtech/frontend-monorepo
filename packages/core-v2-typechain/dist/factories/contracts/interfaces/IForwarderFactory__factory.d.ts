import { Signer } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type { IForwarderFactory, IForwarderFactoryInterface } from "../../../contracts/interfaces/IForwarderFactory";
export declare class IForwarderFactory__factory {
    static readonly abi: {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): IForwarderFactoryInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): IForwarderFactory;
}
