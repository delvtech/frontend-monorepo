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
    static readonly bytecode = "0x6080806040523461002857600080546001600160a01b03191633179055610323908161002e8239f35b600080fdfe6040608081526004908136101561001557600080fd5b600091823560e01c806313af40351461021e57806327c97fa5146101ab5780638da5cb5b14610174578063b6a5d7de146100fa578063b9181611146100b05763fe9fbb801461006357600080fd5b346100ac5760206003193601126100ac573573ffffffffffffffffffffffffffffffffffffffff81168091036100ac57818360ff92602095526001855220541690519015158152f35b8280fd5b50346100ac5760206003193601126100ac573573ffffffffffffffffffffffffffffffffffffffff81168091036100ac57818360ff92602095526001855220541690519015158152f35b50346100ac5760206003193601126100ac573573ffffffffffffffffffffffffffffffffffffffff8082168092036101705761013a908454163314610288565b8252600160205280822060017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0082541617905551f35b8380fd5b5050346101a757816003193601126101a75773ffffffffffffffffffffffffffffffffffffffff60209254169051908152f35b5080fd5b50346100ac5760206003193601126100ac573573ffffffffffffffffffffffffffffffffffffffff808216809203610170576101eb908454163314610288565b825260016020528082207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00815416905551f35b50346100ac5760206003193601126100ac573573ffffffffffffffffffffffffffffffffffffffff808216809203610170577fffffffffffffffffffffffff00000000000000000000000000000000000000009061028185549182163314610288565b1617825551f35b1561028f57565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601060248201527f53656e646572206e6f74206f776e6572000000000000000000000000000000006044820152fdfea26469706673582212201a771fb29988761249f0d35fe05a5e2ff8758796f64de85d45bfd610ad614e5964736f6c634300080f0033";
    static readonly abi: ({
        inputs: never[];
        stateMutability: string;
        type: string;
        name?: undefined;
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
