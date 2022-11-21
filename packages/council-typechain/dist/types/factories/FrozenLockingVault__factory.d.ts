import { Signer, BigNumberish, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { FrozenLockingVault, FrozenLockingVaultInterface } from "../FrozenLockingVault";
export declare class FrozenLockingVault__factory extends ContractFactory {
    constructor(...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>);
    deploy(_token: string, _staleBlockLag: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): Promise<FrozenLockingVault>;
    getDeployTransaction(_token: string, _staleBlockLag: BigNumberish, overrides?: Overrides & {
        from?: string | Promise<string>;
    }): TransactionRequest;
    attach(address: string): FrozenLockingVault;
    connect(signer: Signer): FrozenLockingVault__factory;
    static readonly bytecode = "0x60c060405234801561001057600080fd5b5060405161127a38038061127a83398101604081905261002f9161004a565b60609190911b6001600160601b03191660805260a052610082565b6000806040838503121561005c578182fd5b82516001600160a01b0381168114610072578283fd5b6020939093015192949293505050565b60805160601c60a0516111c36100b76000396000818160ba015261040301526000818161012d01526104f301526111c36000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c8063e91f32351161005b578063e91f323514610102578063f45346dc14610115578063fc0c546a14610128578063fc7e286d1461017457610088565b80632e1a7d4d1461008d5780639f973fd5146100a2578063c2c94b88146100b5578063e7d20283146100ef575b600080fd5b6100a061009b366004610fb1565b6101c0565b005b6100a06100b0366004610e8a565b610227565b6100dc7f000000000000000000000000000000000000000000000000000000000000000081565b6040519081526020015b60405180910390f35b6100dc6100fd366004610eab565b6103ca565b6100dc610110366004610f0f565b6103ec565b6100a0610123366004610ed4565b61043b565b61014f7f000000000000000000000000000000000000000000000000000000000000000081565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100e6565b610187610182366004610e8a565b610770565b6040805173ffffffffffffffffffffffffffffffffffffffff90931683526bffffffffffffffffffffffff9091166020830152016100e6565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600660248201527f46726f7a656e000000000000000000000000000000000000000000000000000060448201526064015b60405180910390fd5b60006102316107d7565b33600090815260209190915260408120805473ffffffffffffffffffffffffffffffffffffffff8581167fffffffffffffffffffffffff000000000000000000000000000000000000000083161783559193506bffffffffffffffffffffffff74010000000000000000000000000000000000000000820416929116906102b661081c565b905060006102c4828461086f565b90506102dc836102d48684611147565b849190610910565b73ffffffffffffffffffffffffffffffffffffffff8316337f33161cf2da28d747be9df136b6f3729390298494947268743193c53d73d3c2e061033f877fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff61108f565b60405190815260200160405180910390a3600061035c838861086f565b90506103748761036c878461100e565b859190610910565b60405185815273ffffffffffffffffffffffffffffffffffffffff88169033907f33161cf2da28d747be9df136b6f3729390298494947268743193c53d73d3c2e09060200160405180910390a350505050505050565b6000806103d561081c565b90506103e2818585610a4f565b9150505b92915050565b6000806103f761081c565b905061043186866104287f000000000000000000000000000000000000000000000000000000000000000043611147565b84929190610abe565b9695505050505050565b73ffffffffffffffffffffffffffffffffffffffff81166104b8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601460248201527f5a65726f20616464722064656c65676174696f6e000000000000000000000000604482015260640161021e565b6040517f23b872dd000000000000000000000000000000000000000000000000000000008152336004820152306024820152604481018390527f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff16906323b872dd90606401602060405180830381600087803b15801561054c57600080fd5b505af1158015610560573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105849190610f91565b50600061058f6107d7565b73ffffffffffffffffffffffffffffffffffffffff808616600090815260209290925260409091208054909250168061066f575080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83161780825582908490839060149061063c9084907401000000000000000000000000000000000000000090046bffffffffffffffffffffffff16611026565b92506101000a8154816bffffffffffffffffffffffff02191690836bffffffffffffffffffffffff1602179055506106d8565b8154849083906014906106a99084907401000000000000000000000000000000000000000090046bffffffffffffffffffffffff16611026565b92506101000a8154816bffffffffffffffffffffffff02191690836bffffffffffffffffffffffff1602179055505b60006106e261081c565b905060006106f0828461086f565b90508273ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff167f33161cf2da28d747be9df136b6f3729390298494947268743193c53d73d3c2e08860405161075191815260200190565b60405180910390a3610767836102d4888461100e565b50505050505050565b600080600061077d6107d7565b73ffffffffffffffffffffffffffffffffffffffff9485166000908152602091909152604090205493841694740100000000000000000000000000000000000000009094046bffffffffffffffffffffffff169392505050565b60006108176040518060400160405280600881526020017f6465706f73697473000000000000000000000000000000000000000000000000815250610b42565b905090565b6040805180820190915260608152600060208201526108176040518060400160405280600b81526020017f766f74696e67506f776572000000000000000000000000000000000000000000815250610bbb565b60008061087d846020015190565b73ffffffffffffffffffffffffffffffffffffffff841660009081526020919091526040902080549091506fffffffffffffffffffffffffffffffff16806108ca576000925050506103e6565b6000610905836108db600185611147565b016001015460c081901c9177ffffffffffffffffffffffffffffffffffffffffffffffff90911690565b979650505050505050565b77ffffffffffffffffffffffffffffffffffffffffffffffff811115610992576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600360248201527f4f6f420000000000000000000000000000000000000000000000000000000000604482015260640161021e565b600061099f846020015190565b73ffffffffffffffffffffffffffffffffffffffff841660009081526020829052604081208054929350914360c01b9185831791608081901c916fffffffffffffffffffffffffffffffff909116908115610a0757610a03866108db600185611147565b5090505b8143821415610a1e57610a1b600184611147565b90505b8481600189010155438214610a4257610a428785610a3d86600161100e565b610bf9565b5050505050505050505050565b600080610a5d856020015190565b73ffffffffffffffffffffffffffffffffffffffff85166000908152602082905260408120805492935091608081901c916fffffffffffffffffffffffffffffffff90911690610ab08488838686610c22565b9a9950505050505050505050565b600080610acc866020015190565b73ffffffffffffffffffffffffffffffffffffffff86166000908152602082905260408120805492935091608081901c916fffffffffffffffffffffffffffffffff9091169080610b20858a8a8787610c22565b9150915083821115610ab057610b37848387610dfb565b610ab0858385610bf9565b6000807f03a912cdb153207069d92d44a2357e3f0ce00f7ee84da3510f1c6851b4cac4ee905060008184604051602001610b7d929190610fc9565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08184030181529190528051602090910120949350505050565b6040805180820190915260608152600060208201526000610bdb83610e2b565b6040805180820190915284815260208101919091529150505b919050565b808210610c0557600080fd5b6fffffffffffffffffffffffffffffffff1660809190911b179055565b60008082610c8c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600d60248201527f756e696e697469616c697a656400000000000000000000000000000000000000604482015260640161021e565b85851115610c9957600080fd5b828410610ca557600080fd5b6000610cb2600185611147565b90508460005b828214610d565760006002610ccd858561100e565b610cd890600161100e565b610ce29190611056565b6001818d01015490915060c081901c9077ffffffffffffffffffffffffffffffffffffffffffffffff168b821415610d2457929650919450610df19350505050565b8b821015610d40578a821015610d38578293505b829450610d4e565b610d4b600184611147565b95505b505050610cb8565b60018a8301015460c081901c9077ffffffffffffffffffffffffffffffffffffffffffffffff168a821115610de7576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600e60248201527f536561726368204661696c757265000000000000000000000000000000000000604482015260640161021e565b9195509093505050505b9550959350505050565b81831115610e0857600080fd5b60018101835b83811015610e2457600082820155600101610e0e565b5050505050565b6000807f7b1a68ec3e3284b167e69db1c622dcfa612281976b71d7e2d239dbe16a75891a905060008184604051602001610b7d929190610fc9565b803573ffffffffffffffffffffffffffffffffffffffff81168114610bf457600080fd5b600060208284031215610e9b578081fd5b610ea482610e66565b9392505050565b60008060408385031215610ebd578081fd5b610ec683610e66565b946020939093013593505050565b600080600060608486031215610ee8578081fd5b610ef184610e66565b925060208401359150610f0660408501610e66565b90509250925092565b60008060008060608587031215610f24578081fd5b610f2d85610e66565b935060208501359250604085013567ffffffffffffffff80821115610f50578283fd5b818701915087601f830112610f63578283fd5b813581811115610f71578384fd5b886020828501011115610f82578384fd5b95989497505060200194505050565b600060208284031215610fa2578081fd5b81518015158114610ea4578182fd5b600060208284031215610fc2578081fd5b5035919050565b60008382528251815b81811015610fee57602081860181015185830182015201610fd2565b81811115610fff5782602083860101525b50919091016020019392505050565b600082198211156110215761102161115e565b500190565b60006bffffffffffffffffffffffff80831681851680830382111561104d5761104d61115e565b01949350505050565b60008261108a577f4e487b710000000000000000000000000000000000000000000000000000000081526012600452602481fd5b500490565b60007f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff818413828413858304851182821616156110ce576110ce61115e565b7f8000000000000000000000000000000000000000000000000000000000000000848712868205881281841616156111085761110861115e565b8587129250878205871284841616156111235761112361115e565b878505871281841616156111395761113961115e565b505050929093029392505050565b6000828210156111595761115961115e565b500390565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fdfea2646970667358221220e8c1805b3c64286c2473747257ecd592ba258e8b8d4281257463d802c13094fd64736f6c63430008030033";
    static readonly abi: ({
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
    } | {
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
    } | {
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
    })[];
    static createInterface(): FrozenLockingVaultInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): FrozenLockingVault;
}
