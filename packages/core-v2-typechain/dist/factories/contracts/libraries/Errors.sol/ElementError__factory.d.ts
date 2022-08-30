import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type { ElementError, ElementErrorInterface } from "../../../../contracts/libraries/Errors.sol/ElementError";
declare type ElementErrorConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ElementError__factory extends ContractFactory {
    constructor(...args: ElementErrorConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ElementError>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): ElementError;
    connect(signer: Signer): ElementError__factory;
    static readonly bytecode = "0x60808060405234601757603a9081601d823930815050f35b600080fdfe600080fdfea26469706673582212202bd54adb22215041e74c5ca447ec59490454c43fb6a354bdee6e47acf402305b64736f6c634300080f0033";
    static readonly abi: {
        inputs: never[];
        name: string;
        type: string;
    }[];
    static createInterface(): ElementErrorInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ElementError;
}
export {};
