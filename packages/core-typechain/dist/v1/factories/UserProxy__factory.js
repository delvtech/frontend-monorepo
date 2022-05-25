"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProxy__factory = void 0;
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
const ethers_1 = require("ethers");
const _abi = [
  {
    inputs: [
      {
        internalType: "contract IWETH",
        name: "_weth",
        type: "address",
      },
      {
        internalType: "address",
        name: "__trancheFactory",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "__trancheBytecodeHash",
        type: "bytes32",
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
    inputs: [],
    name: "deprecate",
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
    name: "isFrozen",
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
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "contract IERC20",
        name: "_underlying",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_expiration",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_position",
        type: "address",
      },
      {
        components: [
          {
            internalType: "contract IERC20Permit",
            name: "tokenContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "who",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expiration",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
        ],
        internalType: "struct UserProxy.PermitData[]",
        name: "_permitCallData",
        type: "tuple[]",
      },
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
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
        internalType: "bool",
        name: "_newState",
        type: "bool",
      },
    ],
    name: "setIsFrozen",
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
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "weth",
    outputs: [
      {
        internalType: "contract IWETH",
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
        name: "_expiration",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_position",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amountPT",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_amountYT",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "contract IERC20Permit",
            name: "tokenContract",
            type: "address",
          },
          {
            internalType: "address",
            name: "who",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expiration",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "r",
            type: "bytes32",
          },
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
          {
            internalType: "uint8",
            name: "v",
            type: "uint8",
          },
        ],
        internalType: "struct UserProxy.PermitData[]",
        name: "_permitCallData",
        type: "tuple[]",
      },
    ],
    name: "withdrawWeth",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
const _bytecode =
  "0x60e06040526000600260006101000a81548160ff0219169083151502179055503480156200002c57600080fd5b50604051620025e3380380620025e38339818101604052810190620000529190620001c1565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620000a3336200012260201b60201c565b8273ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff1660601b815250508173ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff1660601b815250508060c08181525050505050620002b7565b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b6000815190506200018d8162000269565b92915050565b600081519050620001a48162000283565b92915050565b600081519050620001bb816200029d565b92915050565b600080600060608486031215620001d757600080fd5b6000620001e786828701620001aa565b9350506020620001fa868287016200017c565b92505060406200020d8682870162000193565b9150509250925092565b6000620002248262000249565b9050919050565b6000819050919050565b6000620002428262000217565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b620002748162000217565b81146200028057600080fd5b50565b6200028e816200022b565b81146200029a57600080fd5b50565b620002a88162000235565b8114620002b457600080fd5b50565b60805160601c60a05160601c60c0516122d46200030f600039600061133d0152600061131b01526000818160b2015281816105950152818161073801528181610c1101528181610f6a0152610feb01526122d46000f3fe6080604052600436106100ab5760003560e01c80636f1ea24c116100645780636f1ea24c146101f75780638da5cb5b14610220578063b6a5d7de1461024b578063b841d2d214610274578063b9181611146102a5578063fe9fbb80146102e25761010a565b80630fcc0c281461010f57806313af40351461012657806327c97fa51461014f57806333eeb147146101785780633fc8cef3146101a357806364eda74b146101ce5761010a565b3661010a577f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461010857600080fd5b005b600080fd5b34801561011b57600080fd5b5061012461031f565b005b34801561013257600080fd5b5061014d60048036038101906101489190611677565b6103c6565b005b34801561015b57600080fd5b5061017660048036038101906101719190611677565b610497565b005b34801561018457600080fd5b5061018d610580565b60405161019a9190611d90565b60405180910390f35b3480156101af57600080fd5b506101b8610593565b6040516101c59190611dab565b60405180910390f35b3480156101da57600080fd5b506101f560048036038101906101f091906116a0565b6105b7565b005b34801561020357600080fd5b5061021e60048036038101906102199190611796565b61061c565b005b34801561022c57600080fd5b50610235610d03565b6040516102429190611ca6565b60405180910390f35b34801561025757600080fd5b50610272600480360381019061026d9190611677565b610d27565b005b61028e60048036038101906102899190611828565b610dc1565b60405161029c929190611f4a565b60405180910390f35b3480156102b157600080fd5b506102cc60048036038101906102c79190611677565b6111d8565b6040516102d99190611d90565b60405180910390f35b3480156102ee57600080fd5b5061030960048036038101906103049190611677565b6111f8565b6040516103169190611d90565b60405180910390f35b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103ad576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a490611de6565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff16ff5b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610454576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161044b90611de6565b60405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610525576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161051c90611de6565b60405180910390fd5b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b600260009054906101000a900460ff1681565b7f000000000000000000000000000000000000000000000000000000000000000081565b6105c0336111f8565b6105ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105f690611e06565b60405180910390fd5b80600260006101000a81548160ff02191690831515021790555050565b600260009054906101000a900460ff161561066c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161066390611ee6565b60405180910390fd5b8181808060200260200160405190810160405280939291908181526020016000905b828210156106be57848483905060e002018036038101906106af9190611744565b8152602001906001019061068e565b505050505060008151146107365760005b815181101561073457610721828281518110610714577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015161124e565b808061072c906120f0565b9150506106cf565b505b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff168673ffffffffffffffffffffffffffffffffffffffff1663fc0c546a6040518163ffffffff1660e01b815260040160206040518083038186803b1580156107b357600080fd5b505afa1580156107c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107eb91906116f2565b73ffffffffffffffffffffffffffffffffffffffff1614610841576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161083890611e46565b60405180910390fd5b600085141580610852575060008414155b610891576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161088890611e26565b60405180910390fd5b600061089d87896112e4565b9050600080600088146109ca578273ffffffffffffffffffffffffffffffffffffffff166323b872dd33308b6040518463ffffffff1660e01b81526004016108e793929190611cc1565b602060405180830381600087803b15801561090157600080fd5b505af1158015610915573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061093991906116c9565b508273ffffffffffffffffffffffffffffffffffffffff1663884e17f389306040518363ffffffff1660e01b8152600401610975929190611f21565b602060405180830381600087803b15801561098f57600080fd5b505af11580156109a3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109c7919061176d565b91505b60008714610b755760008373ffffffffffffffffffffffffffffffffffffffff1663764b666c6040518163ffffffff1660e01b815260040160206040518083038186803b158015610a1a57600080fd5b505afa158015610a2e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a52919061171b565b90508073ffffffffffffffffffffffffffffffffffffffff166323b872dd33308b6040518463ffffffff1660e01b8152600401610a9193929190611cc1565b602060405180830381600087803b158015610aab57600080fd5b505af1158015610abf573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ae391906116c9565b508373ffffffffffffffffffffffffffffffffffffffff16631210aac289306040518363ffffffff1660e01b8152600401610b1f929190611f21565b602060405180830381600087803b158015610b3957600080fd5b505af1158015610b4d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b71919061176d565b9150505b60008814610bc2576000821415610bc1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bb890611e66565b60405180910390fd5b5b60008714610c0f576000811415610c0e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c0590611e86565b60405180910390fd5b5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16632e1a7d4d8284610c579190611fb5565b6040518263ffffffff1660e01b8152600401610c739190611f06565b600060405180830381600087803b158015610c8d57600080fd5b505af1158015610ca1573d6000803e3d6000fd5b505050503373ffffffffffffffffffffffffffffffffffffffff166108fc8284610ccb9190611fb5565b9081150290604051600060405180830381858888f19350505050158015610cf6573d6000803e3d6000fd5b5050505050505050505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610db5576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610dac90611de6565b60405180910390fd5b610dbe81611395565b50565b600080600260009054906101000a900460ff1615610e14576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e0b90611ee6565b60405180910390fd5b8383808060200260200160405190810160405280939291908181526020016000905b82821015610e6657848483905060e00201803603810190610e579190611744565b81526020019060010190610e36565b50505050506000815114610ede5760005b8151811015610edc57610ec9828281518110610ebc577f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b602002602001015161124e565b8080610ed4906120f0565b915050610e77565b505b73eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee73ffffffffffffffffffffffffffffffffffffffff168873ffffffffffffffffffffffffffffffffffffffff16141561109c57883414610f68576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f5f90611ec6565b60405180910390fd5b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663d0e30db0346040518263ffffffff1660e01b81526004016000604051808303818588803b158015610fd057600080fd5b505af1158015610fe4573d6000803e3d6000fd5b50505050507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb878b6040518363ffffffff1660e01b8152600401611044929190611d67565b602060405180830381600087803b15801561105e57600080fd5b505af1158015611072573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061109691906116c9565b50611170565b600034146110df576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110d690611dc6565b60405180910390fd5b8773ffffffffffffffffffffffffffffffffffffffff166323b872dd33888c6040518463ffffffff1660e01b815260040161111c93929190611cc1565b602060405180830381600087803b15801561113657600080fd5b505af115801561114a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061116e91906116c9565b505b60008061117d89896113ef565b915091508a8110156111c4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111bb90611ea6565b60405180910390fd5b818194509450505050965096945050505050565b60016020528060005260406000206000915054906101000a900460ff1681565b6000600160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b806000015173ffffffffffffffffffffffffffffffffffffffff1663d505accf338360200151846040015185606001518660c0015187608001518860a001516040518863ffffffff1660e01b81526004016112af9796959493929190611cf8565b600060405180830381600087803b1580156112c957600080fd5b505af11580156112dd573d6000803e3d6000fd5b5050505050565b60008083836040516020016112fa929190611c2c565b604051602081830303815290604052805190602001209050600060ff60f81b7f0000000000000000000000000000000000000000000000000000000000000000837f000000000000000000000000000000000000000000000000000000000000000060405160200161136f9493929190611c58565b6040516020818303038152906040528051906020012090508060001c9250505092915050565b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555050565b60008060006113fe84866112e4565b90508073ffffffffffffffffffffffffffffffffffffffff166385f45c88336040518263ffffffff1660e01b81526004016114399190611ca6565b6040805180830381600087803b15801561145257600080fd5b505af1158015611466573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061148a91906118ba565b92509250509250929050565b6000813590506114a5816121e6565b92915050565b60008083601f8401126114bd57600080fd5b8235905067ffffffffffffffff8111156114d657600080fd5b6020830191508360e08202830111156114ee57600080fd5b9250929050565b600081359050611504816121fd565b92915050565b600081519050611519816121fd565b92915050565b60008135905061152e81612214565b92915050565b6000813590506115438161222b565b92915050565b60008135905061155881612242565b92915050565b60008151905061156d81612242565b92915050565b60008151905061158281612259565b92915050565b600060e0828403121561159a57600080fd5b6115a460e0611f73565b905060006115b484828501611534565b60008301525060206115c884828501611496565b60208301525060406115dc84828501611638565b60408301525060606115f084828501611638565b60608301525060806116048482850161151f565b60808301525060a06116188482850161151f565b60a08301525060c061162c84828501611662565b60c08301525092915050565b60008135905061164781612270565b92915050565b60008151905061165c81612270565b92915050565b60008135905061167181612287565b92915050565b60006020828403121561168957600080fd5b600061169784828501611496565b91505092915050565b6000602082840312156116b257600080fd5b60006116c0848285016114f5565b91505092915050565b6000602082840312156116db57600080fd5b60006116e98482850161150a565b91505092915050565b60006020828403121561170457600080fd5b60006117128482850161155e565b91505092915050565b60006020828403121561172d57600080fd5b600061173b84828501611573565b91505092915050565b600060e0828403121561175657600080fd5b600061176484828501611588565b91505092915050565b60006020828403121561177f57600080fd5b600061178d8482850161164d565b91505092915050565b60008060008060008060a087890312156117af57600080fd5b60006117bd89828a01611638565b96505060206117ce89828a01611496565b95505060406117df89828a01611638565b94505060606117f089828a01611638565b935050608087013567ffffffffffffffff81111561180d57600080fd5b61181989828a016114ab565b92509250509295509295509295565b60008060008060008060a0878903121561184157600080fd5b600061184f89828a01611638565b965050602061186089828a01611549565b955050604061187189828a01611638565b945050606061188289828a01611496565b935050608087013567ffffffffffffffff81111561189f57600080fd5b6118ab89828a016114ab565b92509250509295509295509295565b600080604083850312156118cd57600080fd5b60006118db8582860161164d565b92505060206118ec8582860161164d565b9150509250929050565b6118ff8161200b565b82525050565b6119166119118261200b565b612139565b82525050565b6119258161201d565b82525050565b61193c61193782612029565b61214b565b82525050565b61194b81612055565b82525050565b61196261195d82612055565b612155565b82525050565b611971816120cc565b82525050565b6000611984600b83611fa4565b91507f4e6f6e2070617961626c650000000000000000000000000000000000000000006000830152602082019050919050565b60006119c4601083611fa4565b91507f53656e646572206e6f74206f776e6572000000000000000000000000000000006000830152602082019050919050565b6000611a04601583611fa4565b91507f53656e646572206e6f7420417574686f72697a656400000000000000000000006000830152602082019050919050565b6000611a44601083611fa4565b91507f496e76616c6964207769746864726177000000000000000000000000000000006000830152602082019050919050565b6000611a84600e83611fa4565b91507f4e6f6e207765746820746f6b656e0000000000000000000000000000000000006000830152602082019050919050565b6000611ac4600683611fa4565b91507f52756767656400000000000000000000000000000000000000000000000000006000830152602082019050919050565b6000611b04601083611fa4565b91507f4e6f207969656c642061636372756564000000000000000000000000000000006000830152602082019050919050565b6000611b44601183611fa4565b91507f4e6f7420656e6f756768206d696e7465640000000000000000000000000000006000830152602082019050919050565b6000611b84601983611fa4565b91507f496e636f727265637420616d6f756e742070726f7669646564000000000000006000830152602082019050919050565b6000611bc4600f83611fa4565b91507f436f6e74726163742066726f7a656e00000000000000000000000000000000006000830152602082019050919050565b611c00816120b5565b82525050565b611c17611c12826120b5565b612171565b82525050565b611c26816120bf565b82525050565b6000611c388285611905565b601482019150611c488284611c06565b6020820191508190509392505050565b6000611c64828761192b565b600182019150611c748286611905565b601482019150611c848285611951565b602082019150611c948284611951565b60208201915081905095945050505050565b6000602082019050611cbb60008301846118f6565b92915050565b6000606082019050611cd660008301866118f6565b611ce360208301856118f6565b611cf06040830184611bf7565b949350505050565b600060e082019050611d0d600083018a6118f6565b611d1a60208301896118f6565b611d276040830188611bf7565b611d346060830187611bf7565b611d416080830186611c1d565b611d4e60a0830185611942565b611d5b60c0830184611942565b98975050505050505050565b6000604082019050611d7c60008301856118f6565b611d896020830184611bf7565b9392505050565b6000602082019050611da5600083018461191c565b92915050565b6000602082019050611dc06000830184611968565b92915050565b60006020820190508181036000830152611ddf81611977565b9050919050565b60006020820190508181036000830152611dff816119b7565b9050919050565b60006020820190508181036000830152611e1f816119f7565b9050919050565b60006020820190508181036000830152611e3f81611a37565b9050919050565b60006020820190508181036000830152611e5f81611a77565b9050919050565b60006020820190508181036000830152611e7f81611ab7565b9050919050565b60006020820190508181036000830152611e9f81611af7565b9050919050565b60006020820190508181036000830152611ebf81611b37565b9050919050565b60006020820190508181036000830152611edf81611b77565b9050919050565b60006020820190508181036000830152611eff81611bb7565b9050919050565b6000602082019050611f1b6000830184611bf7565b92915050565b6000604082019050611f366000830185611bf7565b611f4360208301846118f6565b9392505050565b6000604082019050611f5f6000830185611bf7565b611f6c6020830184611bf7565b9392505050565b6000604051905081810181811067ffffffffffffffff82111715611f9a57611f996121aa565b5b8060405250919050565b600082825260208201905092915050565b6000611fc0826120b5565b9150611fcb836120b5565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0382111561200057611fff61217b565b5b828201905092915050565b600061201682612095565b9050919050565b60008115159050919050565b60007fff0000000000000000000000000000000000000000000000000000000000000082169050919050565b6000819050919050565b600061206a8261200b565b9050919050565b600061207c8261200b565b9050919050565b600061208e8261200b565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60006120d7826120de565b9050919050565b60006120e982612095565b9050919050565b60006120fb826120b5565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561212e5761212d61217b565b5b600182019050919050565b60006121448261215f565b9050919050565b6000819050919050565b6000819050919050565b600061216a826121d9565b9050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60008160601b9050919050565b6121ef8161200b565b81146121fa57600080fd5b50565b6122068161201d565b811461221157600080fd5b50565b61221d81612055565b811461222857600080fd5b50565b6122348161205f565b811461223f57600080fd5b50565b61224b81612071565b811461225657600080fd5b50565b61226281612083565b811461226d57600080fd5b50565b612279816120b5565b811461228457600080fd5b50565b612290816120bf565b811461229b57600080fd5b5056fea264697066735822122000e2bfeb39885612b94d6f317fd19015a1730ce8288dbea7aa1d2534bcc725b564736f6c63430008000033";
const isSuperArgs = (xs) => xs.length > 1;
class UserProxy__factory extends ethers_1.ContractFactory {
  constructor(...args) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }
  deploy(_weth, __trancheFactory, __trancheBytecodeHash, overrides) {
    return super.deploy(
      _weth,
      __trancheFactory,
      __trancheBytecodeHash,
      overrides || {},
    );
  }
  getDeployTransaction(
    _weth,
    __trancheFactory,
    __trancheBytecodeHash,
    overrides,
  ) {
    return super.getDeployTransaction(
      _weth,
      __trancheFactory,
      __trancheBytecodeHash,
      overrides || {},
    );
  }
  attach(address) {
    return super.attach(address);
  }
  connect(signer) {
    return super.connect(signer);
  }
  static createInterface() {
    return new ethers_1.utils.Interface(_abi);
  }
  static connect(address, signerOrProvider) {
    return new ethers_1.Contract(address, _abi, signerOrProvider);
  }
}
exports.UserProxy__factory = UserProxy__factory;
UserProxy__factory.bytecode = _bytecode;
UserProxy__factory.abi = _abi;
