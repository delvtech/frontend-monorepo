import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { Authorizable, AuthorizableInterface } from "../../../contracts/libraries/Authorizable";
declare type AuthorizableConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class Authorizable__factory extends ContractFactory {
    constructor(...args: AuthorizableConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<Authorizable>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): Authorizable;
    connect(signer: Signer): Authorizable__factory;
    static readonly bytecode = "0x6080806040523461002857600080546001600160a01b03191633179055610311908161002e8239f35b600080fdfe6080604081815260048036101561001557600080fd5b600092833560e01c90816313af4035146102435750806327c97fa5146101d25780638da5cb5b1461019b578063b6a5d7de146100fc578063b9181611146100b25763fe9fbb801461006557600080fd5b346100ae5760206003193601126100ae573573ffffffffffffffffffffffffffffffffffffffff81168091036100ae57818360ff92602095526001855220541690519015158152f35b8280fd5b50346100ae5760206003193601126100ae573573ffffffffffffffffffffffffffffffffffffffff81168091036100ae57818360ff92602095526001855220541690519015158152f35b50346100ae5760206003193601126100ae5780359073ffffffffffffffffffffffffffffffffffffffff80831680930361019757845416330361017057508252600160205280822060017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0082541617905551f35b82517fdf920334000000000000000000000000000000000000000000000000000000008152fd5b8480fd5b5050346101ce57816003193601126101ce5773ffffffffffffffffffffffffffffffffffffffff60209254169051908152f35b5080fd5b50346100ae5760206003193601126100ae5780359073ffffffffffffffffffffffffffffffffffffffff8083168093036101975784541633036101705750825260016020528082207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00815416905551f35b9050346102d75760206003193601126102d75781359173ffffffffffffffffffffffffffffffffffffffff918284168094036102d357855492831633036102ae5750507fffffffffffffffffffffffff00000000000000000000000000000000000000001617825551f35b7fdf920334000000000000000000000000000000000000000000000000000000008152fd5b8580fd5b8380fdfea2646970667358221220af4d95a91257c3febbe88e25af2968e19b0caa1410b5ca6b90876d41c51acb6464736f6c634300080f0033";
    static readonly abi: ({
        inputs: never[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: never[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
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
    })[];
    static createInterface(): AuthorizableInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): Authorizable;
}
export {};
