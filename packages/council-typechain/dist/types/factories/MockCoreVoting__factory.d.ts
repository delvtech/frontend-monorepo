import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { MockCoreVoting, MockCoreVotingInterface } from "../MockCoreVoting";
export declare class MockCoreVoting__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<MockCoreVoting>;
    getDeployTransaction(overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): MockCoreVoting;
    connect(signer: Signer): MockCoreVoting__factory;
    static readonly bytecode = "0x608060405234801561001057600080fd5b50610192806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063627f66c61461003b578063af7a060c146100a1575b600080fd5b61009f610049366004610122565b73ffffffffffffffffffffffffffffffffffffffff91909116600090815260208190526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0016911515919091179055565b005b6100c46100af366004610101565b60006020819052908152604090205460ff1681565b604051901515815260200160405180910390f35b803573ffffffffffffffffffffffffffffffffffffffff811681146100fc57600080fd5b919050565b600060208284031215610112578081fd5b61011b826100d8565b9392505050565b60008060408385031215610134578081fd5b61013d836100d8565b915060208301358015158114610151578182fd5b80915050925092905056fea264697066735822122099247ceb87d1220ec440dfc923dfeeb4454465b284bdf8e32d4bb733555c975c64736f6c63430008030033";
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
    static createInterface(): MockCoreVotingInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): MockCoreVoting;
}
