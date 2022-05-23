import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ReentrancyAttack,
  ReentrancyAttackInterface,
} from "../ReentrancyAttack";
declare type ReentrancyAttackConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class ReentrancyAttack__factory extends ContractFactory {
  constructor(...args: ReentrancyAttackConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<ReentrancyAttack>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): ReentrancyAttack;
  connect(signer: Signer): ReentrancyAttack__factory;
  static readonly bytecode =
    "0x608060405234801561001057600080fd5b50610245806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80630a2df1ed14610030575b600080fd5b61007b6004803603602081101561004657600080fd5b8101908080357bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916906020019092919050505061007d565b005b60003373ffffffffffffffffffffffffffffffffffffffff1682604051602401604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506040518082805190602001908083835b6020831061012d578051825260208201915060208101905060208303925061010a565b6001836020036101000a0380198251168184511680821785525050505050509050019150506000604051808303816000865af19150503d806000811461018f576040519150601f19603f3d011682016040523d82523d6000602084013e610194565b606091505b505090508061020b576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004018080602001828103825260118152602001807f5245454e5452414e43595f41545441434b00000000000000000000000000000081525060200191505060405180910390fd5b505056fea2646970667358221220bf3fb992b0a0193c1639862b62de1df4296a9719624d572d73585a3892dfab6b64736f6c63430007010033";
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
  static createInterface(): ReentrancyAttackInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): ReentrancyAttack;
}
export {};
