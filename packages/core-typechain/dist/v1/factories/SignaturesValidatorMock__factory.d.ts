import { Signer, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  SignaturesValidatorMock,
  SignaturesValidatorMockInterface,
} from "../SignaturesValidatorMock";
declare type SignaturesValidatorMockConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;
export declare class SignaturesValidatorMock__factory extends ContractFactory {
  constructor(...args: SignaturesValidatorMockConstructorParams);
  deploy(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): Promise<SignaturesValidatorMock>;
  getDeployTransaction(
    overrides?: Overrides & {
      from?: string | Promise<string>;
    },
  ): TransactionRequest;
  attach(address: string): SignaturesValidatorMock;
  connect(signer: Signer): SignaturesValidatorMock__factory;
  static readonly bytecode =
    "0x6101006040527f088e910861b9d0ac056c32bb5d44fcdd155bbfa025bdca87c7390e174ac6179560e09081525034801561003857600080fd5b506040518060400160405280601181526020017f42616c616e636572205632205661756c74000000000000000000000000000000815250806040518060400160405280600181526020017f3100000000000000000000000000000000000000000000000000000000000000815250818051906020012060808181525050808051906020012060a081815250507f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f60c0818152505050505060805160a05160c05160e0516108b76101246000398061077652508061043c52508061047e52508061045d52506108b76000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806325e511851461006757806378ea7ae7146100ab5780638247a97c146100ef57806390193b7c1461013357806394df26d61461018b578063ed24911d14610195575b600080fd5b6100a96004803603602081101561007d57600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506101b3565b005b6100ed600480360360208110156100c157600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610235565b005b6101316004803603602081101561010557600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610238565b005b6101756004803603602081101561014957600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610289565b6040518082815260200191505060405180910390f35b6101936102d1565b005b61019d6102db565b6040518082815260200191505060405180910390f35b6101bf816101f86102ea565b6101c7610353565b7fd42c368decf104a7572c7884ea7028fe04ef7d3e76dbd706484f9175d6c4ec628133604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a150565b50565b6000808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000815480929190600101919050555050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6102d9610353565b565b60006102e5610438565b905090565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600081548092919060010191905055905061034e6103488483610503565b836106b4565b505050565b60008060006103606106c7565b9250925092507f6ab714885e85fe1094a5f8af742b0c2eb868ce590c1280ec1c3594899d143cbf61038f6106f8565b610397610756565b85858560405180806020018681526020018560ff168152602001848152602001838152602001828103825287818151815260200191508051906020019080838360005b838110156103f55780820151818401526020810190506103da565b50505050905090810190601f1680156104225780820380516001836020036101000a031916815260200191505b50965050505050505060405180910390a1505050565b60007f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000006104a561076a565b30604051602001808681526020018581526020018481526020018381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019550505050505060405160208183030381529060405280519060200120905090565b60008061050e610756565b9050428110156105225760009150506106ae565b600061052c610772565b90506000801b811415610544576000925050506106ae565b60008161054f6106f8565b80519060200120338786604051602001808681526020018581526020018473ffffffffffffffffffffffffffffffffffffffff1681526020018381526020018281526020019550505050505060405160208183030381529060405280519060200120905060006105be8261079a565b905060008060006105cd6106c7565b925092509250600060018585858560405160008152602001604052604051808581526020018460ff1681526020018381526020018281526020019450505050506020604051602081039080840390855afa15801561062f573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141580156106a357508a73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16145b985050505050505050505b92915050565b816106c3576106c281610801565b5b5050565b60008060006106d66020610871565b60001c92506106e56040610871565b91506106f16060610871565b9050909192565b60606000368080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509050608081511115610753576080360381525b90565b60006107626000610871565b60001c905090565b600046905090565b60007f0000000000000000000000000000000000000000000000000000000000000000905090565b60006107a4610438565b8260405160200180807f190100000000000000000000000000000000000000000000000000000000000081525060020183815260200182815260200192505050604051602081830303815290604052805190602001209050919050565b6030600a820601600a820491506030600a830601600a830492506030600a8406018060101b8260081b8401016642414c230000000160c81b7f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260076024528060445260646000fd5b600081608036030135905091905056fea2646970667358221220611836aed547a369cf8d14d51244f17507152d22f589465808b5a0fd3796cc5e64736f6c63430007010033";
  static readonly abi: (
    | {
        inputs: never[];
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
  static createInterface(): SignaturesValidatorMockInterface;
  static connect(
    address: string,
    signerOrProvider: Signer | Provider,
  ): SignaturesValidatorMock;
}
export {};