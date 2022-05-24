import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  BalancerErrorsMock,
  BalancerErrorsMockInterface,
} from "../BalancerErrorsMock";
declare type BalancerErrorsMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class BalancerErrorsMock__factory extends ContractFactory {
  constructor(...args: BalancerErrorsMockConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<BalancerErrorsMock>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): BalancerErrorsMock;
  connect(signer: Signer): BalancerErrorsMock__factory;
  static readonly bytecode =
    "0x6080604052348015600f57600080fd5b506101088061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063132e4f3c14602d575b600080fd5b605660048036036020811015604157600080fd5b81019080803590602001909291905050506058565b005b605f816062565b50565b6030600a820601600a820491506030600a830601600a830492506030600a8406018060101b8260081b8401016642414c230000000160c81b7f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260076024528060445260646000fdfea26469706673582212204b7d0ca3533aa121fa4dfbdce730d5b8cda38ebd92e2572d902737ab63095b9e64736f6c63430007010033";
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
  static createInterface(): BalancerErrorsMockInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): BalancerErrorsMock;
}
export {};
