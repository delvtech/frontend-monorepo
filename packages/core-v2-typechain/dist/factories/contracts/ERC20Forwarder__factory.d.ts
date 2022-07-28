import { Signer, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { ERC20Forwarder, ERC20ForwarderInterface } from "../../contracts/ERC20Forwarder";
declare type ERC20ForwarderConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC20Forwarder__factory extends ContractFactory {
    constructor(...args: ERC20ForwarderConstructorParams);
    deploy(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ERC20Forwarder>;
    getDeployTransaction(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): ERC20Forwarder;
    connect(signer: Signer): ERC20Forwarder__factory;
    static readonly bytecode = "0x60c060409080825234620002fb576330075a5d60e11b8152600090828160048185335af180156200029b57829081928291620002a5575b508060a052826080526024855180948193622b600360e21b8352600483015260018060a01b03165afa9081156200029b578291620001c0575b50805160209091012082516001600160401b03939192919080820181811086821117620001ac57600191602091845282815201603160f81b8152209181519260208401947f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f86528385015260608401524660808401523060a084015260a0835260c0830194838610908611176200019857508390525190206001556110e790816200033b823960805181818160ea015281816102eb015281816105fc01528181610787015281816108cb015281816109fb01528181610b8701528181610cfd0152610f2d015260a05181818161033c0152818161064b015281816107480152818161088901528181610a4901528181610b2b01528181610bd601528181610cbe0152610ffe0152f35b634e487b7160e01b81526041600452602490fd5b634e487b7160e01b84526041600452602484fd5b90503d8083833e620001d3818362000300565b8101906020908181840312620002975780516001600160401b039182821162000293570183601f820112156200027b5780519182116200027f5785519362000225601f8401601f191685018662000300565b8285528383830101116200027b579084929183905b828210620002625750811062000255575b505050386200006f565b830101528138806200024b565b818101840151868301850152869450908301906200023a565b8480fd5b634e487b7160e01b85526041600452602485fd5b8580fd5b8380fd5b83513d84823e3d90fd5b925050508281813d8311620002f3575b620002c1818362000300565b81010312620002ef578051906001600160a01b0382168203620002eb576020839101513862000036565b8280fd5b5080fd5b503d620002b5565b600080fd5b601f909101601f19168101906001600160401b038211908210176200032457604052565b634e487b7160e01b600052604160045260246000fdfe608060408181526004918236101561001657600080fd5b600092833560e01c91826306fdde0314610c8757508163095ea7b314610b4e57816317d70f7c14610b1357816323b872dd146109b957816330adf81f1461097e578163313ce567146109625781633644e5151461094357816370a082311461083d5781637ecebe00146107fa57816395d89b411461070d578163a9059cbb146105c3578163d505accf1461014657508063dd62ed3e146101125763fc0c546a146100bf57600080fd5b3461010e578160031936011261010e576020905173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b5080fd5b503461010e578060031936011261010e5760209061013f610131610dbb565b610139610de3565b90610f14565b9051908152f35b9050346105bf5760e06003193601126105bf57610161610dbb565b9061016a610de3565b90604435606435936084359260ff84168094036105bb5785421161055e5773ffffffffffffffffffffffffffffffffffffffff94858316958615610501578860015498888c526020978c8952828d20549a8351928b8b8501957f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c987528501528587169c8d60608601528a608086015260a085015260c084015260c0835260e0830167ffffffffffffffff94848210868311176104d457818f52845190206101008501927f1901000000000000000000000000000000000000000000000000000000000000845261010286015261012285015260428152610160840194818610908611176104a857848e52519020835261018082015260a4356101a082015260c4356101c0909101528a805286908b9060809060015afa1561049e5786818b51160361044257868a52898652888a2080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146104165760010190558992917f000000000000000000000000000000000000000000000000000000000000000090911690813b156104125789517f4ed2d6ac0000000000000000000000000000000000000000000000000000000081527f000000000000000000000000000000000000000000000000000000000000000093810193845273ffffffffffffffffffffffffffffffffffffffff91821660208501526040840187905294166060830152839182908490829060800103925af18015610408576103d3575b50907f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925918551908152a351f35b956104007f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925939297610e06565b9590916103a6565b86513d89823e3d90fd5b8380fd5b60248c6011877f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b606483878b51917f08c379a0000000000000000000000000000000000000000000000000000000008352820152601e60248201527f45524332305065726d69743a20696e76616c6964207369676e617475726500006044820152fd5b88513d8b823e3d90fd5b60248f60418a7f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b5060248f60418a7f4e487b7100000000000000000000000000000000000000000000000000000000835252fd5b60648360208b51917f08c379a0000000000000000000000000000000000000000000000000000000008352820152601860248201527f45524332303a20696e76616c69642d616464726573732d3000000000000000006044820152fd5b60649060208851917f08c379a0000000000000000000000000000000000000000000000000000000008352820152601d60248201527f45524332305065726d69743a206578706972656420646561646c696e650000006044820152fd5b8780fd5b8280fd5b9050346105bf57816003193601126105bf576105dd610dbb565b90602435918473ffffffffffffffffffffffffffffffffffffffff92837f00000000000000000000000000000000000000000000000000000000000000001690813b156105bf5786517fe44808bc0000000000000000000000000000000000000000000000000000000081527f0000000000000000000000000000000000000000000000000000000000000000918101918252336020830181905273ffffffffffffffffffffffffffffffffffffffff861660408401526060830188905260808301529291839182908490829060a00103925af1801561070357602096506106f4575b50835192835216907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef843392a35160018152f35b6106fd90610e06565b386106c0565b85513d88823e3d90fd5b919050346105bf57826003193601126105bf578051917f4e41a1fb0000000000000000000000000000000000000000000000000000000083527f000000000000000000000000000000000000000000000000000000000000000090830152828260248173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165afa9182156107f057836107c794936107cb575b50505191829182610d71565b0390f35b6107e89293503d8091833e6107e08183610e49565b810190610e8a565b9038806107bb565b81513d85823e3d90fd5b50503461010e57602060031936011261010e578060209273ffffffffffffffffffffffffffffffffffffffff61082e610dbb565b16815280845220549051908152f35b83833461010e57602092836003193601126105bf578361085b610dbb565b9160448451809481937f3656eec20000000000000000000000000000000000000000000000000000000083527f00000000000000000000000000000000000000000000000000000000000000009083015273ffffffffffffffffffffffffffffffffffffffff80911660248301527f0000000000000000000000000000000000000000000000000000000000000000165afa928315610938578093610903575b505051908152f35b909192508382813d8311610931575b61091c8183610e49565b8101031261092e5750519083806108fb565b80fd5b503d610912565b8251903d90823e3d90fd5b50503461010e578160031936011261010e576020906001549051908152f35b50503461010e578160031936011261010e576020905160128152f35b50503461010e578160031936011261010e57602090517f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c98152f35b9050346105bf5760606003193601126105bf576109d4610dbb565b906109dd610de3565b936044359173ffffffffffffffffffffffffffffffffffffffff91827f000000000000000000000000000000000000000000000000000000000000000016803b1561010e5786517fe44808bc0000000000000000000000000000000000000000000000000000000081527f000000000000000000000000000000000000000000000000000000000000000093810193845273ffffffffffffffffffffffffffffffffffffffff80881660208601528916604085015260608401869052336080850152928291849182908490829060a00103925af1908115610b085750918060209788937fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef95610af9575b50875195865216941692a35160018152f35b610b0290610e06565b38610ae7565b8651903d90823e3d90fd5b50503461010e578160031936011261010e57602090517f00000000000000000000000000000000000000000000000000000000000000008152f35b9050346105bf57816003193601126105bf57610b68610dbb565b90602435918473ffffffffffffffffffffffffffffffffffffffff92837f00000000000000000000000000000000000000000000000000000000000000001690813b156105bf5786517f4ed2d6ac0000000000000000000000000000000000000000000000000000000081527f000000000000000000000000000000000000000000000000000000000000000091810191825273ffffffffffffffffffffffffffffffffffffffff85166020830152604082018790523360608301529291839182908490829060800103925af180156107035760209650610c78575b50835192835216907f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925843392a35160018152f35b610c8190610e06565b38610c44565b929150346104125783600319360112610412577ead800c0000000000000000000000000000000000000000000000000000000083527f000000000000000000000000000000000000000000000000000000000000000090830152828260248173ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000165afa9182156107f057836107c794936107cb5750505191829182610d71565b918091926000905b828210610d5c575011610d55575050565b6000910152565b91508060209183015181860152018291610d44565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f60409360208452610db48151809281602088015260208888019101610d3c565b0116010190565b6004359073ffffffffffffffffffffffffffffffffffffffff82168203610dde57565b600080fd5b6024359073ffffffffffffffffffffffffffffffffffffffff82168203610dde57565b67ffffffffffffffff8111610e1a57604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff821117610e1a57604052565b602081830312610dde57805167ffffffffffffffff91828211610dde57019082601f83011215610dde578151908111610e1a5760405192610ef360207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8501160185610e49565b81845260208284010111610dde57610f119160208085019101610d3c565b90565b73ffffffffffffffffffffffffffffffffffffffff91827f0000000000000000000000000000000000000000000000000000000000000000169280604051937fe985e9c50000000000000000000000000000000000000000000000000000000085521691826004850152168060248401526020928381604481885afa90811561106f5760009161107b575b5015610fcd57505050507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff90565b6064839260405195869384927f21ff32a90000000000000000000000000000000000000000000000000000000084527f00000000000000000000000000000000000000000000000000000000000000006004850152602484015260448301525afa90811561106f57600091611043575b50905090565b82813d8311611068575b6110578183610e49565b8101031261092e575051803861103d565b503d61104d565b6040513d6000823e3d90fd5b8481813d83116110aa575b6110908183610e49565b8101031261010e575190811515820361092e575038610f9f565b503d61108656fea2646970667358221220266c071707105e2a380fb5a0b7fd3ffc6a36e694a41631c04dc707ef7f1b1de964736f6c634300080f0033";
    static readonly abi: ({
        inputs: never[];
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
    static createInterface(): ERC20ForwarderInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC20Forwarder;
}
export {};
