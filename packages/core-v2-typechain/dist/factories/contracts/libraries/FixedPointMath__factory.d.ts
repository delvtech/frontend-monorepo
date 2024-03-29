import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { FixedPointMath, FixedPointMathInterface } from "../../../contracts/libraries/FixedPointMath";
declare type FixedPointMathConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class FixedPointMath__factory extends ContractFactory {
    constructor(...args: FixedPointMathConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<FixedPointMath>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): FixedPointMath;
    connect(signer: Signer): FixedPointMath__factory;
    static readonly bytecode = "0x60808060405234601857609a908161001e823930815050f35b600080fdfe6080806040526004361015601257600080fd5b60003560e01c63d33fee4414602657600080fd5b60007ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc360112605f5780670de0b6b3a764000060209252f35b600080fdfea2646970667358221220198e4cca227abb0ff620c68db2254663261435c4a76501449fc167b565601bae64736f6c634300080f0033";
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
    static createInterface(): FixedPointMathInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): FixedPointMath;
}
export {};
