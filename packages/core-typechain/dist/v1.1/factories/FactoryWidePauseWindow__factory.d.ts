import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  FactoryWidePauseWindow,
  FactoryWidePauseWindowInterface,
} from "../FactoryWidePauseWindow";
declare type FactoryWidePauseWindowConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class FactoryWidePauseWindow__factory extends ContractFactory {
  constructor(...args: FactoryWidePauseWindowConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<FactoryWidePauseWindow>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): FactoryWidePauseWindow;
  connect(signer: Signer): FactoryWidePauseWindow__factory;
  static readonly bytecode =
    "0x60a060405234801561001057600080fd5b506276a70042016080818152505060805161012661003b6000398060525280607a52506101266000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80632da47c4014602d575b600080fd5b60336048565b604051603f92919060c1565b60405180910390f35b60008060004290507f000000000000000000000000000000000000000000000000000000000000000081101560a657807f000000000000000000000000000000000000000000000000000000000000000003925062278d00915060af565b60009250600091505b509091565b60bb8160e6565b82525050565b600060408201905060d4600083018560b4565b60df602083018460b4565b9392505050565b600081905091905056fea26469706673582212207e57edff3acc0efa57ba1aaaf37f61673462b6f22b12c25140e70b42d54a8d7464736f6c63430007010033";
  static readonly abi: (
    | {
        inputs: never[];
        stateMutability: string;
        type: string;
        name?: undefined;
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
      }
  )[];
  static createInterface(): FactoryWidePauseWindowInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): FactoryWidePauseWindow;
}
export {};
