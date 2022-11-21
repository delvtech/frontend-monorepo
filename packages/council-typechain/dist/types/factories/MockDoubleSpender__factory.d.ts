import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MockDoubleSpender, MockDoubleSpenderInterface } from "../MockDoubleSpender";
export declare class MockDoubleSpender__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<MockDoubleSpender>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): MockDoubleSpender;
    connect(signer: Signer): MockDoubleSpender__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b506103c9806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80632b3fadc6146100465780638ae031951461005b57806395e18a691461006e575b600080fd5b610059610054366004610350565b610081565b005b610059610069366004610350565b610192565b61005961007c366004610350565b610271565b6040517fce0891d50000000000000000000000000000000000000000000000000000000081526004810182905233602482015273ffffffffffffffffffffffffffffffffffffffff83169063ce0891d590604401600060405180830381600087803b1580156100ef57600080fd5b505af1158015610103573d6000803e3d6000fd5b50506040517fce0891d50000000000000000000000000000000000000000000000000000000081526004810184905233602482015273ffffffffffffffffffffffffffffffffffffffff8516925063ce0891d591506044015b600060405180830381600087803b15801561017657600080fd5b505af115801561018a573d6000803e3d6000fd5b505050505050565b6040517f0d9460a00000000000000000000000000000000000000000000000000000000081526004810182905233602482015273ffffffffffffffffffffffffffffffffffffffff831690630d9460a090604401600060405180830381600087803b15801561020057600080fd5b505af1158015610214573d6000803e3d6000fd5b50506040517f0d9460a00000000000000000000000000000000000000000000000000000000081526004810184905233602482015273ffffffffffffffffffffffffffffffffffffffff85169250630d9460a0915060440161015c565b6040517f03e41d200000000000000000000000000000000000000000000000000000000081526004810182905233602482015273ffffffffffffffffffffffffffffffffffffffff8316906303e41d2090604401600060405180830381600087803b1580156102df57600080fd5b505af11580156102f3573d6000803e3d6000fd5b50506040517f03e41d200000000000000000000000000000000000000000000000000000000081526004810184905233602482015273ffffffffffffffffffffffffffffffffffffffff851692506303e41d20915060440161015c565b60008060408385031215610362578182fd5b823573ffffffffffffffffffffffffffffffffffffffff81168114610385578283fd5b94602093909301359350505056fea2646970667358221220745814be21015a9abf55029f8472b90c625bfcedd4d988ef9bef15d97df6db4964736f6c63430008030033";
    static readonly abi: {
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
    }[];
    static createInterface(): MockDoubleSpenderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MockDoubleSpender;
}
