/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  NonVotingVault,
  NonVotingVaultInterface,
} from "../NonVotingVault";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
      {
        internalType: "contract ILockingVault",
        name: "_lockingVault",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "who",
        type: "address",
      },
    ],
    name: "authorize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "authorized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "who",
        type: "address",
      },
    ],
    name: "deauthorize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "who",
        type: "address",
      },
    ],
    name: "isAuthorized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "lockingVault",
    outputs: [
      {
        internalType: "contract ILockingVault",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "who",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "destination",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60a06040523480156200001157600080fd5b506040516200128e3803806200128e833981016040819052620000349162000574565b600080546001600160a01b0319163317905562000051826200012d565b600280546001600160a01b0319166001600160a01b03831690811790915560408051637e062a3560e11b815290516000929163fc0c546a91600480830192602092919082900301818787803b158015620000aa57600080fd5b505af1158015620000bf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000e59190620005d4565b606081901b6001600160601b03191660805260025490915062000124906001600160a01b038084169116600019620001a2602090811b6200055317901c565b505050620006ab565b6000546001600160a01b03163314620001805760405162461bcd60e51b815260206004820152601060248201526f29b2b73232b9103737ba1037bbb732b960811b60448201526064015b60405180910390fd5b600080546001600160a01b0319166001600160a01b0392909216919091179055565b801580620002305750604051636eb1769f60e11b81523060048201526001600160a01b03838116602483015284169063dd62ed3e9060440160206040518083038186803b158015620001f357600080fd5b505afa15801562000208573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906200022e9190620005f3565b155b620002a45760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e636500000000000000000000606482015260840162000177565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b0390811663095ea7b360e01b17909152620002fc9185916200030116565b505050565b60006200035d826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b0316620003df60201b6200074d179092919060201c565b805190915015620002fc57808060200190518101906200037e9190620005b2565b620002fc5760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b606482015260840162000177565b6060620003f08484600085620003fa565b90505b9392505050565b6060824710156200045d5760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f6044820152651c8818d85b1b60d21b606482015260840162000177565b6001600160a01b0385163b620004b65760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640162000177565b600080866001600160a01b03168587604051620004d491906200060c565b60006040518083038185875af1925050503d806000811462000513576040519150601f19603f3d011682016040523d82523d6000602084013e62000518565b606091505b5090925090506200052b82828662000536565b979650505050505050565b6060831562000547575081620003f3565b825115620005585782518084602001fd5b8160405162461bcd60e51b81526004016200017791906200062a565b6000806040838503121562000587578182fd5b8251620005948162000692565b6020840151909250620005a78162000692565b809150509250929050565b600060208284031215620005c4578081fd5b81518015158114620003f3578182fd5b600060208284031215620005e6578081fd5b8151620003f38162000692565b60006020828403121562000605578081fd5b5051919050565b60008251620006208184602087016200065f565b9190910192915050565b60006020825282518060208401526200064b8160408501602087016200065f565b601f01601f19169190910160400192915050565b60005b838110156200067c57818101518382015260200162000662565b838111156200068c576000848401525b50505050565b6001600160a01b0381168114620006a857600080fd5b50565b60805160601c610bbd620006d16000396000818161019701526102d60152610bbd6000f3fe608060405234801561001057600080fd5b50600436106100a25760003560e01c8063b6a5d7de11610076578063d2a043451161005b578063d2a0434514610172578063fc0c546a14610192578063fe9fbb80146101b9576100a2565b8063b6a5d7de1461012c578063b91816111461013f576100a2565b8062f714ce146100a757806313af4035146100bc57806327c97fa5146100cf5780638da5cb5b146100e2575b600080fd5b6100ba6100b5366004610abf565b6101cc565b005b6100ba6100ca366004610a6d565b610303565b6100ba6100dd366004610a6d565b6103b1565b6000546101029073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6100ba61013a366004610a6d565b610464565b61016261014d366004610a6d565b60016020526000908152604090205460ff1681565b6040519015158152602001610123565b6002546101029073ffffffffffffffffffffffffffffffffffffffff1681565b6101027f000000000000000000000000000000000000000000000000000000000000000081565b6101626101c7366004610a6d565b610524565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102385760405162461bcd60e51b815260206004820152601060248201527f53656e646572206e6f74206f776e65720000000000000000000000000000000060448201526064015b60405180910390fd5b6002546040517f2e1a7d4d0000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff90911690632e1a7d4d90602401600060405180830381600087803b1580156102a457600080fd5b505af11580156102b8573d6000803e3d6000fd5b506102ff92505073ffffffffffffffffffffffffffffffffffffffff7f00000000000000000000000000000000000000000000000000000000000000001690508284610766565b5050565b60005473ffffffffffffffffffffffffffffffffffffffff16331461036a5760405162461bcd60e51b815260206004820152601060248201527f53656e646572206e6f74206f776e657200000000000000000000000000000000604482015260640161022f565b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60005473ffffffffffffffffffffffffffffffffffffffff1633146104185760405162461bcd60e51b815260206004820152601060248201527f53656e646572206e6f74206f776e657200000000000000000000000000000000604482015260640161022f565b73ffffffffffffffffffffffffffffffffffffffff16600090815260016020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055565b60005473ffffffffffffffffffffffffffffffffffffffff1633146104cb5760405162461bcd60e51b815260206004820152601060248201527f53656e646572206e6f74206f776e657200000000000000000000000000000000604482015260640161022f565b6105218173ffffffffffffffffffffffffffffffffffffffff16600090815260016020819052604090912080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169091179055565b50565b73ffffffffffffffffffffffffffffffffffffffff811660009081526001602052604090205460ff165b919050565b80158061060257506040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff838116602483015284169063dd62ed3e9060440160206040518083038186803b1580156105c857600080fd5b505afa1580156105dc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106009190610aa7565b155b6106745760405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527f20746f206e6f6e2d7a65726f20616c6c6f77616e636500000000000000000000606482015260840161022f565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526107489084907f095ea7b300000000000000000000000000000000000000000000000000000000906064015b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190526020810180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff167fffffffff00000000000000000000000000000000000000000000000000000000909316929092179091526107bc565b505050565b606061075c84846000856108ae565b90505b9392505050565b60405173ffffffffffffffffffffffffffffffffffffffff83166024820152604481018290526107489084907fa9059cbb00000000000000000000000000000000000000000000000000000000906064016106c6565b600061081e826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff1661074d9092919063ffffffff16565b805190915015610748578080602001905181019061083c9190610a87565b6107485760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e60448201527f6f74207375636365656400000000000000000000000000000000000000000000606482015260840161022f565b6060824710156109265760405162461bcd60e51b815260206004820152602660248201527f416464726573733a20696e73756666696369656e742062616c616e636520666f60448201527f722063616c6c0000000000000000000000000000000000000000000000000000606482015260840161022f565b73ffffffffffffffffffffffffffffffffffffffff85163b61098a5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e7472616374000000604482015260640161022f565b6000808673ffffffffffffffffffffffffffffffffffffffff1685876040516109b39190610aea565b60006040518083038185875af1925050503d80600081146109f0576040519150601f19603f3d011682016040523d82523d6000602084013e6109f5565b606091505b5091509150610a05828286610a10565b979650505050505050565b60608315610a1f57508161075f565b825115610a2f5782518084602001fd5b8160405162461bcd60e51b815260040161022f9190610b06565b803573ffffffffffffffffffffffffffffffffffffffff8116811461054e57600080fd5b600060208284031215610a7e578081fd5b61075f82610a49565b600060208284031215610a98578081fd5b8151801515811461075f578182fd5b600060208284031215610ab8578081fd5b5051919050565b60008060408385031215610ad1578081fd5b82359150610ae160208401610a49565b90509250929050565b60008251610afc818460208701610b57565b9190910192915050565b6000602082528251806020840152610b25816040850160208701610b57565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b60005b83811015610b72578181015183820152602001610b5a565b83811115610b81576000848401525b5050505056fea2646970667358221220c35d624b7358a995a1850d6c2131e9d4d6e86ce4432f35a1340f80f9499c9ecb64736f6c63430008030033";

export class NonVotingVault__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    _owner: string,
    _lockingVault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<NonVotingVault> {
    return super.deploy(
      _owner,
      _lockingVault,
      overrides || {}
    ) as Promise<NonVotingVault>;
  }
  getDeployTransaction(
    _owner: string,
    _lockingVault: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_owner, _lockingVault, overrides || {});
  }
  attach(address: string): NonVotingVault {
    return super.attach(address) as NonVotingVault;
  }
  connect(signer: Signer): NonVotingVault__factory {
    return super.connect(signer) as NonVotingVault__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NonVotingVaultInterface {
    return new utils.Interface(_abi) as NonVotingVaultInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NonVotingVault {
    return new Contract(address, _abi, signerOrProvider) as NonVotingVault;
  }
}
