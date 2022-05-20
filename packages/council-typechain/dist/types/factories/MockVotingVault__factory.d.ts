import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  MockVotingVault,
  MockVotingVaultInterface,
} from "../MockVotingVault";
export declare class MockVotingVault__factory extends ContractFactory {
  constructor(signer?: Signer);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<MockVotingVault>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): MockVotingVault;
  connect(signer: Signer): MockVotingVault__factory;
  static readonly bytecode =
    "0x608060405234801561001057600080fd5b50610215806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063274b91a914610046578063c07473f61461007f578063e91f3235146100b1575b600080fd5b61007d610054366004610134565b73ffffffffffffffffffffffffffffffffffffffff909116600090815260208190526040902055565b005b61009f61008d366004610113565b60006020819052908152604090205481565b60405190815260200160405180910390f35b61009f6100bf36600461015d565b50505073ffffffffffffffffffffffffffffffffffffffff1660009081526020819052604090205490565b803573ffffffffffffffffffffffffffffffffffffffff8116811461010e57600080fd5b919050565b600060208284031215610124578081fd5b61012d826100ea565b9392505050565b60008060408385031215610146578081fd5b61014f836100ea565b946020939093013593505050565b60008060008060608587031215610172578182fd5b61017b856100ea565b935060208501359250604085013567ffffffffffffffff8082111561019e578384fd5b818701915087601f8301126101b1578384fd5b8135818111156101bf578485fd5b8860208285010111156101d0578485fd5b9598949750506020019450505056fea26469706673582212207d1ce9b7f1cf982e370e1b30fdfdd4792714cbe59a03ec7d8225c3a40c66103864736f6c63430008030033";
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
  static createInterface(): MockVotingVaultInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): MockVotingVault;
}
