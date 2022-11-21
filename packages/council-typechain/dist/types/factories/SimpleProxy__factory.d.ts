import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { SimpleProxy, SimpleProxyInterface } from "../SimpleProxy";
export declare class SimpleProxy__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(_governance: string, _firstImplementation: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<SimpleProxy>;
    getDeployTransaction(_governance: string, _firstImplementation: string, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): SimpleProxy;
    connect(signer: Signer): SimpleProxy__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b5060405161041938038061041983398101604081905261002f9161007c565b600180546001600160a01b039384166001600160a01b031991821617909155600080549290931691161790556100ae565b80516001600160a01b038116811461007757600080fd5b919050565b6000806040838503121561008e578182fd5b61009783610060565b91506100a560208401610060565b90509250929050565b61035c806100bd6000396000f3fe60806040526004361061003f5760003560e01c80630c870f911461009157806374474d28146100e75780638c1e1df014610109578063c01cc4d114610136575b368061004757005b60405181600082378082016040526000805473ffffffffffffffffffffffffffffffffffffffff1690808484845af492505060405190503d806000833e8261008d578082fd5b8082f35b34801561009d57600080fd5b506000546100be9073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b3480156100f357600080fd5b506101076101023660046102eb565b610156565b005b34801561011557600080fd5b506001546100be9073ffffffffffffffffffffffffffffffffffffffff1681565b34801561014257600080fd5b506101076101513660046102eb565b610223565b60015473ffffffffffffffffffffffffffffffffffffffff1633146101dc576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f756e617574686f72697a6564000000000000000000000000000000000000000060448201526064015b60405180910390fd5b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60015473ffffffffffffffffffffffffffffffffffffffff1633146102a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f756e617574686f72697a6564000000000000000000000000000000000000000060448201526064016101d3565b600180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6000602082840312156102fc578081fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461031f578182fd5b939250505056fea264697066735822122007e977ba1b9ef6c33d78aeb58c7897ebda7332961cb5afb263797f45c065ddd464736f6c63430008030033";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        outputs?: undefined;
    } | {
        stateMutability: string;
        type: string;
        inputs?: undefined;
        name?: undefined;
        outputs?: undefined;
    } | {
        inputs: never[];
        name: string;
        outputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
    } | {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    })[];
    static createInterface(): SimpleProxyInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): SimpleProxy;
}
