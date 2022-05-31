import { Signer, ContractFactory, Overrides, BigNumberish } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  TemporarilyPausableMock,
  TemporarilyPausableMockInterface,
} from "../TemporarilyPausableMock";
declare type TemporarilyPausableMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class TemporarilyPausableMock__factory extends ContractFactory {
  constructor(...args: TemporarilyPausableMockConstructorParams);
  deploy(
    pauseWindowDuration: BigNumberish,
    bufferPeriodDuration: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<TemporarilyPausableMock>;
  getDeployTransaction(
    pauseWindowDuration: BigNumberish,
    bufferPeriodDuration: BigNumberish,
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): TemporarilyPausableMock;
  connect(signer: Signer): TemporarilyPausableMock__factory;
  static readonly bytecode =
    "0x60c060405234801561001057600080fd5b506040516103d83803806103d88339818101604052604081101561003357600080fd5b81019080805190602001909291908051906020019092919050505081816100686276a7008311156101946100a360201b60201c565b61008062278d008211156101956100a360201b60201c565b60008242019050806080818152505081810160a08181525050505050505061012c565b816100b8576100b7816100bc60201b60201c565b5b5050565b6030600a820601600a820491506030600a830601600a830492506030600a8406018060101b8260081b8401016642414c230000000160c81b7f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260076024528060445260646000fd5b60805160a05161028961014f600039806101ac52508061018452506102896000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806316c38b3c1461003b5780631c0de0511461006b575b600080fd5b6100696004803603602081101561005157600080fd5b81019080803515159060200190929190505050610099565b005b6100736100a5565b604051808415158152602001838152602001828152602001935050505060405180910390f35b6100a2816100ce565b50565b60008060006100b2610159565b1592506100bd610180565b91506100c76101a8565b9050909192565b80156100ee576100e96100df610180565b42106101936101d0565b610104565b6101036100f96101a8565b42106101a96101d0565b5b806000806101000a81548160ff0219169083151502179055507f9e3a5e37224532dea67b89face185703738a228a6e8a23dee546960180d3be648160405180821515815260200191505060405180910390a150565b60006101636101a8565b42118061017b575060008054906101000a900460ff16155b905090565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b816101df576101de816101e3565b5b5050565b6030600a820601600a820491506030600a830601600a830492506030600a8406018060101b8260081b8401016642414c230000000160c81b7f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260076024528060445260646000fdfea2646970667358221220239e56f901195c3f599144507fc48442f0f20c3333a7f0169d7af31f789f9af664736f6c63430007010033";
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
        inputs: never[];
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
    | {
        inputs: {
          internalType: string;
          name: string;
          type: string;
        }[];
        name: string;
        outputs: never[];
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
  )[];
  static createInterface(): TemporarilyPausableMockInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): TemporarilyPausableMock;
}
export {};
