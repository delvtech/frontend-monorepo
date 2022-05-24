import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  OwnableContract,
  OwnableContractInterface,
} from "../OwnableContract";
declare type OwnableContractConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class OwnableContract__factory extends ContractFactory {
  constructor(...args: OwnableContractConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<OwnableContract>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): OwnableContract;
  connect(signer: Signer): OwnableContract__factory;
  static readonly bytecode =
    "0x6080604052336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610809806100536000396000f300608060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806317ffc3201461007d5780634e71e0c8146100c0578063715018a6146100d75780638da5cb5b146100ee578063e30c397814610145578063f2fde38b1461019c575b600080fd5b34801561008957600080fd5b506100be600480360381019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506101df565b005b3480156100cc57600080fd5b506100d5610364565b005b3480156100e357600080fd5b506100ec610503565b005b3480156100fa57600080fd5b50610103610605565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561015157600080fd5b5061015a61062a565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156101a857600080fd5b506101dd600480360381019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610650565b005b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561023c57600080fd5b8173ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001915050602060405180830381600087803b1580156102d757600080fd5b505af11580156102eb573d6000803e3d6000fd5b505050506040513d602081101561030157600080fd5b810190808051906020019092919050505090506103606000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff16828473ffffffffffffffffffffffffffffffffffffffff166106ef9092919063ffffffff16565b5050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156103c057600080fd5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a3600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506000600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561055e57600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff167ff8df31144d9c2f0f6b59d69b8b98abd5459d07f2742c4df920b25aae33c6482060405160405180910390a260008060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156106ab57600080fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b8273ffffffffffffffffffffffffffffffffffffffff1663a9059cbb83836040518363ffffffff167c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200182815260200192505050602060405180830381600087803b15801561079257600080fd5b505af11580156107a6573d6000803e3d6000fd5b505050506040513d60208110156107bc57600080fd5b810190808051906020019092919050505015156107d857600080fd5b5050505600a165627a7a72305820237519ca65eed0890b7e8b8867d53cd8af30e94fe26542e89a5b8d96f786e32d0029";
  static readonly abi: (
    | {
        constant: boolean;
        inputs: {
          name: string;
          type: string;
        }[];
        name: string;
        outputs: never[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        constant: boolean;
        inputs: never[];
        name: string;
        outputs: {
          name: string;
          type: string;
        }[];
        payable: boolean;
        stateMutability: string;
        type: string;
        anonymous?: undefined;
      }
    | {
        anonymous: boolean;
        inputs: {
          indexed: boolean;
          name: string;
          type: string;
        }[];
        name: string;
        type: string;
        constant?: undefined;
        outputs?: undefined;
        payable?: undefined;
        stateMutability?: undefined;
      }
  )[];
  static createInterface(): OwnableContractInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): OwnableContract;
}
export {};
