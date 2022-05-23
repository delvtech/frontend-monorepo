import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MockPoolFactory,
  MockPoolFactoryInterface,
} from "../MockPoolFactory";
declare type MockPoolFactoryConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class MockPoolFactory__factory extends ContractFactory {
  constructor(...args: MockPoolFactoryConstructorParams);
  deploy(
    _vault: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<MockPoolFactory>;
  getDeployTransaction(
    _vault: string,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): MockPoolFactory;
  connect(signer: Signer): MockPoolFactory__factory;
  static readonly bytecode =
    "0x60a060405234801561001057600080fd5b5060405161059538038061059583398181016040528101906100329190610086565b808073ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b81525050505061010a565b600081519050610080816100f3565b92915050565b60006020828403121561009857600080fd5b60006100a684828501610071565b91505092915050565b60006100ba826100d3565b9050919050565b60006100cc826100af565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6100fc816100c1565b811461010757600080fd5b50565b60805160601c61046e6101276000398061010b525061046e6000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80636634b753146100465780638d928af814610076578063efc81a8c14610094575b600080fd5b610060600480360381019061005b919061022b565b6100b2565b60405161006d919061029c565b60405180910390f35b61007e610107565b60405161008b91906102b7565b60405180910390f35b61009c61012f565b6040516100a99190610281565b60405180910390f35b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b60008060405161013e9061020a565b604051809103906000f08015801561015a573d6000803e3d6000fd5b5090506101668161016d565b8091505090565b60016000808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff0219169083151502179055508073ffffffffffffffffffffffffffffffffffffffff167f83a48fbcfc991335314e74d0496aab6a1987e992ddc85dddbcc4d6dd6ef2e9fc60405160405180910390a250565b60ed8061034c83390190565b60008135905061022581610334565b92915050565b60006020828403121561023d57600080fd5b600061024b84828501610216565b91505092915050565b61025d816102d2565b82525050565b61026c816102e4565b82525050565b61027b81610310565b82525050565b60006020820190506102966000830184610254565b92915050565b60006020820190506102b16000830184610263565b92915050565b60006020820190506102cc6000830184610272565b92915050565b60006102dd826102f0565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061031b82610322565b9050919050565b600061032d826102f0565b9050919050565b61033d816102d2565b811461034857600080fd5b5056fe608060405234801561001057600080fd5b5060ce8061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c806338fff2d014602d575b600080fd5b60336047565b604051603e91906075565b60405180910390f35b60003073ffffffffffffffffffffffffffffffffffffffff1660001b905090565b606f81608e565b82525050565b6000602082019050608860008301846068565b92915050565b600081905091905056fea26469706673582212201fc6eb963d71e971c8c83ecce289c3a3e752a113a277576f817d2935358d88f164736f6c63430007010033a2646970667358221220ccede716e059d2800fef11b1362012170ebcdbe9b87e34a7fd1baee2ac1bcea964736f6c63430007010033";
  static readonly abi: (
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
        name?: undefined;
        outputs?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        stateMutability?: undefined;
        outputs?: undefined;
      }
    | {
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
      }
  )[];
  static createInterface(): MockPoolFactoryInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): MockPoolFactory;
}
export {};
