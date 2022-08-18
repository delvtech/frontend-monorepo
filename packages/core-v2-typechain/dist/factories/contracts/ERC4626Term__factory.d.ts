import { Signer, ContractFactory, BytesLike, BigNumberish, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { ERC4626Term, ERC4626TermInterface } from "../../contracts/ERC4626Term";
declare type ERC4626TermConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;
export declare class ERC4626Term__factory extends ContractFactory {
    constructor(...args: ERC4626TermConstructorParams);
    deploy(_vault: PromiseOrValue<string>, _linkerCodeHash: PromiseOrValue<BytesLike>, _factory: PromiseOrValue<string>, _maxReserve: PromiseOrValue<BigNumberish>, _owner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ERC4626Term>;
    getDeployTransaction(_vault: PromiseOrValue<string>, _linkerCodeHash: PromiseOrValue<BytesLike>, _factory: PromiseOrValue<string>, _maxReserve: PromiseOrValue<BigNumberish>, _owner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): TransactionRequest;
    attach(address: string): ERC4626Term;
    connect(signer: Signer): ERC4626Term__factory;
    static readonly bytecode = "0x61018060409080825234620003215760a081620039938038038091620000268285620003fe565b833981010312620003215780516001600160a01b03808216939192918484036200032157602080840151906200005e83860162000438565b966200007260806060880151970162000438565b978451936338d52e0f60e01b855260049484818781875afa908115620003f357908891600091620003b4575b50169160805260a0528451908582019160018060401b0392818110848211176200039f57875260018152603160f81b9085015285517f2aef22f9d7df5f9d21c56d14029233f3fdaa91917727e1eb68e504d27072d6cd8186019081527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc68289015246606083015230608080840191909152825260a08201938411828510176200039f578388528151902060065560018060a01b031992858188818760085416963388176008558060c05263313ce56760e01b82525afa918215620003945786906000936200034e575b5050508060ff9160e0521699604d8b1162000339579087859493926101009c600a0a8d521691331617176008556101209788526044610140968888526101609860011c895260c051169460008751968794859363095ea7b360e01b8552840152811960248401525af180156200032e57620002ef575b5050519261354594856200044e8639608051858181610a1a0152612756015260a0518581816109d80152612785015260c051858181610241015281816105d70152818161072e01528181610cfa0152818161112a0152818161152901526116aa015260e05185611fcc0152518481816119be01528181611c36015281816131440152818161330001526133ec015251838181610284015281816106aa0152818161085a01528181610df501528181610ef4015281816113a7015281816115b30152818161265c01528181612b7e0152612c1c0152518281816102bf0152610d5901525181818161099e0152610d890152f35b81813d831162000326575b620003068183620003fe565b810103126200032157518015150362000321573880620001fd565b600080fd5b503d620002fa565b83513d6000823e3d90fd5b601186634e487b7160e01b6000525260246000fd5b813d83116200038c575b620003648185620003fe565b810103126200038857519060ff8216820362000385575060ff853862000187565b80fd5b5080fd5b503d62000358565b88513d6000823e3d90fd5b604187634e487b7160e01b6000525260246000fd5b91508582813d8311620003eb575b620003ce8183620003fe565b81010312620003855750620003e4889162000438565b386200009e565b503d620003c2565b87513d6000823e3d90fd5b601f909101601f19168101906001600160401b038211908210176200042257604052565b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b0382168203620003215756fe60806040818152600436101561001457600080fd5b600091823560e01c908162ad800c146122e75750806309630c2e1461229b57806313af40351461221557806317fad7fc146120f55780631c0f12b6146120c157806321ff32a91461206e57806327c97fa51461202a57806330adf81f14611ff0578063313ce56714611fb35780633644e51514611f955780633656eec214611f5657806342b7d39414611f2e578063487b188814611c6e57806348ef824b14611c0d5780634e41a1fb14611b055780634ed2d6ac14611a8e5780637b7615d114611a3e5780637ecebe0014611a085780638da5cb5b146119e1578063901717d1146119a75780639032c7261461172f5780639a90b9081461123c5780639cd241af14611211578063a22cb46514611187578063a2ea09d914610c7d578063b6a5d7de14610c0d578063b819220514610a8e578063b918161114610a66578063bd85b03914610a3e578063c45a0155146109fb578063c905a4b5146109c1578063cd33f2bd14610987578063d0c555cc14610969578063d245940314610935578063ddda35cd146103b2578063e44808bc1461032f578063e985e9c5146102e2578063f3b3a9fa146102a8578063fbfa77cf14610265578063fc0c546a146102225763fe9fbb80146101e457600080fd5b3461021e57602060031936011261021e5760ff816020936001600160a01b0361020b612406565b1681526009855220541690519015158152f35b5080fd5b503461021e578160031936011261021e57602090516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b503461021e578160031936011261021e57602090516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b503461021e578160031936011261021e57602090517f00000000000000000000000000000000000000000000000000000000000000008152f35b503461021e578060031936011261021e5760ff81602093610301612406565b610309612421565b6001600160a01b0391821683526002875283832091168252855220549151911615158152f35b503461021e5760a060031936011261021e5760043561034c612421565b90610355612437565b61035d612463565b926001600160a01b0361036f846126da565b1633036103895790610386939291606435926127c8565b51f35b600485517f2aab8bd3000000000000000000000000000000000000000000000000000000008152fd5b509034610907576060600319360112610907576103cd612406565b67ffffffffffffffff602435818111610931576103ee903690600401612561565b9060443590811161093157610407903690600401612561565b93839084859486955b85518710156104c65761042387876129d8565b51111561049d5761043486866129d8565b519161045761044388886129d8565b5161044e898c6129d8565b51903390612fab565b5090600160ff1b61046889896129d8565b5103610488576104819161047b916125c8565b96612954565b9591610410565b969461048191610497916125c8565b94612954565b600483517f35192696000000000000000000000000000000000000000000000000000000008152fd5b50929086809481938061091d575b50826104ef575b6020856104e886896125c8565b9051908152f35b61053093509061050f9291610502612603565b86989293989791976129ec565b600160ff1b855261052a602096600188528a872054906125c8565b90612a1d565b958695818711610654575091610581869261055087986105ca98966127bd565b906fffffffffffffffffffffffffffffffff196fffffffffffffffffffffffffffffffff9160801b16911617600d55565b875194859283927fa9059cbb00000000000000000000000000000000000000000000000000000000845260048401602090939291936001600160a01b0360408201951681520152565b0381846001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000165af19081156106495750916104e893916020969361061b575b50505b9181946104db565b8161063a92903d10610642575b6106328183612520565b8101906129c0565b508580610610565b503d610628565b8551903d90823e3d90fd5b909511156108035786517fba0876520000000000000000000000000000000000000000000000000000000081526004810191909152306024820181905260448201529291906001600160a01b03908385606481867f000000000000000000000000000000000000000000000000000000000000000087165af19485156107f9579087929184966107c0575b5088517fa9059cbb0000000000000000000000000000000000000000000000000000000081526001600160a01b03919091166004820152602481019290925290919083908390604490829085907f0000000000000000000000000000000000000000000000000000000000000000165af19081156107b55750936107886104e896946fffffffffffffffffffffffffffffffff9461078e9460209b98610797575b5050856127bd565b906127bd565b16600d55610613565b816107ad92903d10610642576106328183612520565b508a80610780565b8751903d90823e3d90fd5b8580929750819394503d83116107f2575b6107db8183612520565b810103126107ee575193869190846106df565b8280fd5b503d6107d1565b88513d85823e3d90fd5b86517fb460af94000000000000000000000000000000000000000000000000000000008152600481018790526001600160a01b03909216602483015230604483015291838280606481010381846001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000165af19384156109115781946108d7575b505050602095926108a26104e895936108d2936127bd565b6fffffffffffffffffffffffffffffffff196fffffffffffffffffffffffffffffffff9160801b16911617600d55565b610613565b909180939450813d831161090a575b6108f08183612520565b8101031261090757505190826108a26108d261088a565b80fd5b503d6108e6565b508651903d90823e3d90fd5b8196509061092a91612b24565b94866104d4565b8380fd5b503461021e578160031936011261021e57608090610951612603565b92939091815194855260208501528301526060820152f35b503461021e578160031936011261021e5760209051600160ff1b8152f35b503461021e578160031936011261021e57602090517f00000000000000000000000000000000000000000000000000000000000000008152f35b503461021e578160031936011261021e57602090517f00000000000000000000000000000000000000000000000000000000000000008152f35b503461021e578160031936011261021e57602090516001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000168152f35b503461021e57602060031936011261021e578060209260043581526001845220549051908152f35b503461021e57602060031936011261021e5760ff816020936001600160a01b0361020b612406565b503461021e57606060031936011261021e5760043560243592604435933382526020946009865260ff858420541615610be4576fffffffffffffffffffffffffffffffff938285821603610bbb5791610ba084928488956104e8989752600b8a52610b5c610afd878720612c50565b9288610b218d6001610b1285858a51166129ec565b91878c52528a8a205490612a1d565b169880610b318b828851166134ee565b1685528c850190610b47818416828451166134ee565b169052610b558133856134a7565b33866134a7565b8452600b8952848420815160209092015160801b6fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff92909216919091179055565b8152600a865220610bb28282546127bd565b90553390612b24565b600486517f7d0f8cb6000000000000000000000000000000000000000000000000000000008152fd5b600485517ff5229289000000000000000000000000000000000000000000000000000000008152fd5b503461021e57602060031936011261021e57610c27612406565b6001600160a01b039081600854163303610c54571682526009602052808220600160ff1982541617905551f35b600483517fdf920334000000000000000000000000000000000000000000000000000000008152fd5b509034610907576080600319360112610907576004356024359060443592610ca361244d565b91806110e8575b50610cb3612603565b949290508795919551957f70a082310000000000000000000000000000000000000000000000000000000087523060048801526020956001600160a01b039787816024818c7f0000000000000000000000000000000000000000000000000000000000000000165afa9081156110de578b94939288928a9284916110a0575b5085610d3d916127bd565b9586918061107c575050610d53915080946125c8565b91888a8d7f000000000000000000000000000000000000000000000000000000000000000086111561103d5790610df191610daf7f000000000000000000000000000000000000000000000000000000000000000080986127bd565b90517f6e553f65000000000000000000000000000000000000000000000000000000008152600481019190915230602482015294859283919082906044820190565b03927f0000000000000000000000000000000000000000000000000000000000000000165af1918215611033578892610ffe575b50610e3492916108a2916125c8565b8096829884610e9e575b505050505090610e4f848793612a56565b600160ff1b8152600b83522080546fffffffffffffffffffffffffffffffff196fffffffffffffffffffffffffffffffff610e8e818716828516612c7e565b1691161790558351928352820152f35b91939998509193965042811015610fd557610ec0869798996024923390612fab565b9790928a51928380927f4cdad5060000000000000000000000000000000000000000000000000000000082528660048301527f0000000000000000000000000000000000000000000000000000000000000000165afa908115610fcb57918594939187938b9791610f8c575b5092610f8292610f7560016108a2610f7a95610f6f8b610f6a610e4f9c9b8f610f53612603565b96929a919d9050600160ff1b8352522054906129ec565b612a1d565b956125c8565b6125c8565b9687926125c8565b9692933880610e3e565b9294959650509181813d8311610fc4575b610fa78183612520565b81010312610fc057518894939286929091610f82610f2c565b8480fd5b503d610f9d565b89513d87823e3d90fd5b600488517fc5cde8ca000000000000000000000000000000000000000000000000000000008152fd5b9091508881813d831161102c575b6110168183612520565b810103126110285751906108a2610e25565b8780fd5b503d61100c565b8c513d8a823e3d90fd5b505050905061107791906fffffffffffffffffffffffffffffffff196fffffffffffffffffffffffffffffffff9160801b16911617600d55565b610e34565b610f6a61109a926001610d5396600160ff1b895252862054846129ec565b946125c8565b9350509293945081813d83116110d7575b6110bb8183612520565b810103126110d357518a939291879189919085610d32565b8680fd5b503d6110b1565b8b513d89823e3d90fd5b85517f23b872dd0000000000000000000000000000000000000000000000000000000081523360048201523060248201526044810191909152602081606481857f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af1801561117d5715610caa576111769060203d8111610642576106328183612520565b5038610caa565b86513d84823e3d90fd5b503461021e578060031936011261021e576111a0612406565b60243580151590818103610fc0576111e39033865260026020526001600160a01b038587209416938487526020528486209060ff60ff1983541691151516179055565b82519081527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a351f35b503461021e57606060031936011261021e5761038661122e612421565b3390604435906004356128f6565b509034610907576101006003193601126109075767ffffffffffffffff916004358381116107ee57611272903690600401612561565b926024359081116107ee5761128b903690600401612561565b90604435906112986124aa565b936112a1612463565b906001600160a01b03918260a4351660a4350361021e5760c435428110611729575042955b4260e4351115611700578295839881159182159081611668575b5091611660575b506114f0575b829795979183965b8a5188101561149d57611308888c6129d8565b51998a6113158a866129d8565b519510156114745761133461132d8c968d3390612fab565b90936125c8565b9a600160ff1b9081036114665761135d61137461134f612603565b9050879592959491946129ec565b908a5261052a602096600188528d8c2054906125c8565b8a51907f0a28a477000000000000000000000000000000000000000000000000000000008252600482015284816024818d7f0000000000000000000000000000000000000000000000000000000000000000165afa94851561145c57899561142c575b50508084116114035791610f7584926108a26113fc966113f6966127bd565b97612954565b96986112f5565b60048a517fbd64e03b000000000000000000000000000000000000000000000000000000008152fd5b9080929550813d8311611455575b6114448183612520565b8101031261102857519238806113d7565b503d61143a565b8b513d8b823e3d90fd5b506113fc916113f6916125c8565b600488517f35192696000000000000000000000000000000000000000000000000000000008152fd5b6114c66114b188938b8d8560e43593612ca3565b6114bb81846127bd565b6114d3575b826127bd565b9082519182526020820152f35b6114eb6114e082856127bd565b60a43560e435612af3565b6114c0565b84517f70a082310000000000000000000000000000000000000000000000000000000081523060048201526020985090955087816024817f000000000000000000000000000000000000000000000000000000000000000088165afa8015611656578390611627575b61157991506fffffffffffffffffffffffffffffffff600d5416906127bd565b84517f6e553f65000000000000000000000000000000000000000000000000000000008152600481018290523060248201528881604481877f00000000000000000000000000000000000000000000000000000000000000008a165af198891561161d5784996115ed575b505096946112ed565b9080929950813d8311611616575b6116058183612520565b810103126107ee57519638806115e4565b503d6115fb565b86513d86823e3d90fd5b508781813d831161164f575b61163d8183612520565b810103126107ee576115799051611559565b503d611633565b85513d85823e3d90fd5b9050386112e7565b88517f23b872dd00000000000000000000000000000000000000000000000000000000815233600482015230602482015260448101919091526020816064818a7f00000000000000000000000000000000000000000000000000000000000000008d165af180156116f657156112e0576116ef9060203d8111610642576106328183612520565b50386112e0565b89513d89823e3d90fd5b600485517fc5cde8ca000000000000000000000000000000000000000000000000000000008152fd5b956112c6565b503461021e5760e060031936011261021e57611749612406565b611751612421565b90604435918215158084036119a357606435936084359360ff85168095036110285785421161197a576001600160a01b0380911694851561195157600654868a528860209660078852818c205499858351928b8b8501957f9319a49e677b4f5aede521541bd9c2c7d0f3529998213c5c9b41a6bf27579feb8752850152169a8b606084015288608084015260a083015260c082015260c0815260e081019181831067ffffffffffffffff8411176119245792828995926101228f968f966080975282519020916101008101947f1901000000000000000000000000000000000000000000000000000000000000865261010282015201526042815261185581612504565b519020908b519182528482015260a4358b82015260c435606082015282805260015afa1561191a578490885116036118f157906118e87f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c319392858952600784528789206118c28154612954565b905585895260028452878920878a5284528789209060ff60ff1983541691151516179055565b8551908152a351f35b600486517f8baa579f000000000000000000000000000000000000000000000000000000008152fd5b86513d89823e3d90fd5b60248d7f4e487b710000000000000000000000000000000000000000000000000000000081526041600452fd5b600488517ff0dd15fd000000000000000000000000000000000000000000000000000000008152fd5b600487517ff87d9271000000000000000000000000000000000000000000000000000000008152fd5b8580fd5b503461021e578160031936011261021e57602090517f00000000000000000000000000000000000000000000000000000000000000008152f35b503461021e578160031936011261021e576020906001600160a01b03600854169051908152f35b503461021e57602060031936011261021e57806020926001600160a01b03611a2e612406565b1681526007845220549051908152f35b503461021e57602060031936011261021e576004358252600b6020908152918190205490516fffffffffffffffffffffffffffffffff8216815260809190911c91810191909152604090f35b0390f35b503461021e57608060031936011261021e57600435611aab612421565b90611ab461244d565b916001600160a01b03611ac6836126da565b163303611adc57906103869291604435916128f6565b600484517f2aab8bd3000000000000000000000000000000000000000000000000000000008152fd5b509034610907576020918260031936011261021e5760043582526005835280822092815192809480549160019183831c938381168015611c03575b8686108114611bd657858952908115611bb25750600114611b77575b611a8a8787611b6d828c0383612520565b5191829182612390565b9080949750528583205b828410611b9f5750505082611a8a94611b6d92820101943880611b5c565b8054868501880152928601928101611b81565b60ff19168887015250505050151560051b8301019250611b6d82611a8a3880611b5c565b6024847f4e487b710000000000000000000000000000000000000000000000000000000081526022600452fd5b94607f1694611b40565b503461021e578160031936011261021e576104e860209282611c5a611c30612603565b925050507f00000000000000000000000000000000000000000000000000000000000000006129ec565b91600160ff1b815260018652205490612a1d565b503461021e57608060031936011261021e576004359160243590611c90612437565b90611c996124aa565b9160018660ff1c03611f05576fffffffffffffffffffffffffffffffff808716928315611edc576f7fffffffffffffffffffffffffffffff8860801c1615611eb357878152602097600b8952611cf0888320612c50565b928984019080825116158015611ea8575b611e7f57908180808d8c8e9897968a511690611d1c916129ec565b908688526001905287872054611d3191612a1d565b975116818816611d40916134ee565b925116818b16611d4f916134ee565b81865193611d5c856124b9565b168352168b820152818352600b8b5283832090611dae91815160209092015160801b6fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff92909216919091179055565b8733611db9926134a7565b611dc287612be0565b9515611e2457505082611dd89142908685612ca3565b611dfb578291611df691611df0866104e897966127bd565b91612af3565b6127bd565b600485517f34fa3503000000000000000000000000000000000000000000000000000000008152fd5b84611e6887968596611e60611e4e8a610f6a611e789a6104e89f9e8f611e49916127bd565b6129ec565b8099611e5a8483612b24565b506127bd565b8a4292612ca3565b508152600a8952209182546127bd565b90556127bd565b60048a517feb152065000000000000000000000000000000000000000000000000000000008152fd5b508085511615611d01565b600487517fe51f688c000000000000000000000000000000000000000000000000000000008152fd5b600487517fbb9bff15000000000000000000000000000000000000000000000000000000008152fd5b600485517f71ce092f000000000000000000000000000000000000000000000000000000008152fd5b503461021e57602060031936011261021e57806020926004358152600a845220549051908152f35b503461021e578060031936011261021e5780602092611f73612421565b60043582528185526001600160a01b0383832091168252845220549051908152f35b503461021e578160031936011261021e576020906006549051908152f35b503461021e578160031936011261021e576020905160ff7f0000000000000000000000000000000000000000000000000000000000000000168152f35b503461021e578160031936011261021e57602090517f9319a49e677b4f5aede521541bd9c2c7d0f3529998213c5c9b41a6bf27579feb8152f35b503461021e57602060031936011261021e57612044612406565b6001600160a01b039081600854163303610c5457168252600960205280822060ff19815416905551f35b503461021e57606060031936011261021e578060209261208c612421565b612094612437565b6004358352600386528383206001600160a01b039283168452865283832091168252845220549051908152f35b503461021e57608060031936011261021e576103866120de612421565b6120e6612437565b903391606435916004356127c8565b503461021e57608060031936011261021e5761210f612406565b612117612421565b67ffffffffffffffff916044358381116119a357612139903690600401612479565b9290936064359081116110d357612154903690600401612479565b9290936001600160a01b038083161590811561220a575b506121e1578381036121b857875b81811061218557888851f35b806121ae876121986121b394868c612981565b3587876121a7868c3396612981565b35926127c8565b612954565b612179565b600487517fba430d38000000000000000000000000000000000000000000000000000000008152fd5b600487517ff0dd15fd000000000000000000000000000000000000000000000000000000008152fd5b90508316153861216b565b503461021e57602060031936011261021e5761222f612406565b600854906001600160a01b0390818316330361227257907fffffffffffffffffffffffff0000000000000000000000000000000000000000911691161760085551f35b600484517fdf920334000000000000000000000000000000000000000000000000000000008152fd5b503461021e57602060031936011261021e576004358252600c6020908152918190205490516fffffffffffffffffffffffffffffffff8216815260809190911c91810191909152604090f35b919050346107ee576020806003193601126109315760043584526004815281842093809480549160019183831c938381168015612386575b8686108114611bd657858952908115611bb2575060011461234b57611a8a8787611b6d828c0383612520565b9080949750528583205b8284106123735750505082611a8a94611b6d92820101943880611b5c565b8054868501880152928601928101612355565b94607f169461231f565b919091602080825283519081818401526000945b8286106123f0575050601f817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe09260409596116123e3575b0116010190565b60008582860101526123dc565b85810182015184870160400152948101946123a4565b600435906001600160a01b038216820361241c57565b600080fd5b602435906001600160a01b038216820361241c57565b604435906001600160a01b038216820361241c57565b606435906001600160a01b038216820361241c57565b608435906001600160a01b038216820361241c57565b9181601f8401121561241c5782359167ffffffffffffffff831161241c576020808501948460051b01011161241c57565b60643590811515820361241c57565b6040810190811067ffffffffffffffff8211176124d557604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6080810190811067ffffffffffffffff8211176124d557604052565b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff8211176124d557604052565b9080601f8301121561241c5781359067ffffffffffffffff82116124d5578160051b6040519360209361259685840187612520565b8552838086019282010192831161241c578301905b8282106125b9575050505090565b813581529083019083016125ab565b811981116125d4570190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600d546fffffffffffffffffffffffffffffffff81169060801c9080926040517f4cdad5060000000000000000000000000000000000000000000000000000000081528360048201526020816024816001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa80156126ce5760009061269b575b612698915080936125c8565b90565b6020823d82116126c6575b816126b360209383612520565b810103126109075750612698905161268c565b3d91506126a6565b6040513d6000823e3d90fd5b604080513060208201908152818301939093529081526001600160a01b039190612705606082612520565b51902060405160208101917fff0000000000000000000000000000000000000000000000000000000000000083527fffffffffffffffffffffffffffffffffffffffff0000000000000000000000007f000000000000000000000000000000000000000000000000000000000000000060601b16602183015260358201527f00000000000000000000000000000000000000000000000000000000000000006055820152605581526127b681612504565b5190201690565b8181106125d4570390565b91936001600160a01b0391821693908216927fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62929185850361285b575b60009282845283602052604093849182822089835260205282822061282b8582546127bd565b9055848252816020528282209916988982526020522061284c8282546125c8565b905582519182526020820152a4565b600086815260209060028252604091828220888352815260ff838320541615612887575b505050612805565b84825260038152828220898352815282822088835281527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff83832054031561287f578482526003815282822089835281528282209088835252206128ec8282546127bd565b905538808061287f565b827f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9259294936040602093600090815260038552818120966001600160a01b0380911697888352865282822098169788825285522055604051908152a3565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81146125d45760010190565b91908110156129915760051b0190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b9081602091031261241c5751801515810361241c5790565b80518210156129915760209160051b010190565b807fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048211811515166125d4570290565b8115612a27570490565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6001600160a01b031660008181527fc34d87ebb14544cb33c3e325dea3e881cd1780beb96cc6c142d139f1d4a9e26d60205260408120805492939192600160ff1b929190612aa59083906125c8565b9055818352600160205260408320612abe8282546125c8565b905560405191825260208201527fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6260403392a4565b919091600091818352826020526001600160a01b036040842094169384845260205260408320612aa58282546125c8565b6040517fba08765200000000000000000000000000000000000000000000000000000000815260048101919091526001600160a01b0390911660248201523060448201526020818060648101038160006001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000165af19081156126ce57600091612bb2575090565b906020823d8211612bd8575b81612bcb60209383612520565b8101031261090757505190565b3d9150612bbe565b604051907f4cdad50600000000000000000000000000000000000000000000000000000000825260048201526020816024816001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000165afa9081156126ce57600091612bb2575090565b90604051612c5d816124b9565b91546fffffffffffffffffffffffffffffffff8116835260801c6020830152565b906fffffffffffffffffffffffffffffffff80809316911680920381116125d4570190565b919290938015600014612d0c57505081612cbc91612a56565b600160ff1b600052600b6020526040600020906fffffffffffffffffffffffffffffffff19825491612d036fffffffffffffffffffffffffffffffff809216828516612c7e565b16911617905590565b918160809592951b600160ff1b811981116125d457612d2d918591016125c8565b944203612df55790612d4381612dda9387612af3565b612da9600095808752600b60205260408720908154916fffffffffffffffffffffffffffffffff926fffffffffffffffffffffffffffffffff1984612d8c818c16828516612c7e565b1691161790558752600b602052604087209216825460801c612c7e565b6fffffffffffffffffffffffffffffffff6fffffffffffffffffffffffffffffffff1983549260801b169116179055565b8252600a602052612df0604083209182546125c8565b905590565b9093919282600052600b602052612e0f6040600020612c50565b926fffffffffffffffffffffffffffffffff845116158015612f8d575b612f635783611df6916fffffffffffffffffffffffffffffffff612eeb89612e9c612e93612e7e612e78612e6b8b610f6a612f4a9f8a905116886129ec565b8760208b015116906127bd565b846129ec565b86600052600160205260406000205490612a1d565b9b8c9986612af3565b612ea688886127bd565b8a600052600a602052612ebf60406000209182546125c8565b905582612ee489826020612eda8c83808d5116911690612c7e565b99015116936127bd565b1690612c7e565b8160405194612ef9866124b9565b168452166020830152600052600b6020526040600020815160209092015160801b6fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff92909216919091179055565b90600052600a602052612df060406000209182546125c8565b60046040517feb152065000000000000000000000000000000000000000000000000000000008152fd5b506fffffffffffffffffffffffffffffffff60208501511615612e2c565b9291926fffffffffffffffffffffffffffffffff91828216904282118061349e575b61347457600093828552602091600c8352604093612fec858820612c50565b90600160ff1b96878114801580613467575b61339f575b156131025750505091600b916130df879487865284845282878720541661303e61302d8d836129ec565b8a8952600187528989205490612a1d565b998a9261306a61305961304f612603565b92505050866129ec565b8c8452600189528b84205490612a1d565b9d8b83528288526001600160a01b038b842092169182845288528a83206130928282546127bd565b90558b8352600188528a83206130a98282546127bd565b90558a51908c8252888201527fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f628b3392a46127bd565b169483525220906fffffffffffffffffffffffffffffffff198254161790559190565b92965096939260018360ff9b939b1c146000146132e857828552600b845261312b868620612c50565b9681808951169b51169a8083048c11811515166132bb577f00000000000000000000000000000000000000000000000000000000000000009b613172918d91028416612a1d565b928589019383855116613184916127bd565b9185885260018752818989205493849161319d916129ec565b906131a791612a1d565b9c8d6131b282612be0565b916131bc916129ec565b906131c691612a1d565b9a808952600a88528989208c8154906131de916127bd565b90558852600c8752818d858b8b209116815460801c906131fd916134ee565b81546fffffffffffffffffffffffffffffffff1660809190911b6fffffffffffffffffffffffffffffffff191617905561323791876134a7565b828282828c511690613248916129ec565b9061325291612a1d565b1689528284511690613263916129ec565b9061326d91612a1d565b1690528252600b905220906132b791815160209092015160801b6fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff92909216919091179055565b9190565b6024877f4e487b710000000000000000000000000000000000000000000000000000000081526011600452fd5b96509782959882859493969552600a835284842054917f0000000000000000000000000000000000000000000000000000000000000000809961332a82612be0565b998a930151169061333a916129ec565b9061334491612a1d565b61334e90836127bd565b61335890826129ec565b868552600184528585205461336c91612a1d565b998a9161337991886134a7565b613382916127bd565b938252600a9052205561339590846129ec565b9061269891612a1d565b92508685838b826134118b610f6a6133e98851986133bc8a6124b9565b868a52838a0196808852888152600a8552600182822054956133dd87612be0565b9a8352522054876127bd565b957f0000000000000000000000000000000000000000000000000000000000000000906129ec565b92169052168152828a52600c875261346181898c20815160209092015160801b6fffffffffffffffffffffffffffffffff19166fffffffffffffffffffffffffffffffff92909216919091179055565b92613003565b5085878501511615612ffe565b60046040517f77ae07e9000000000000000000000000000000000000000000000000000000008152fd5b50811515612fcd565b600092818452836020526001600160a01b0360408520931692838552602052604084206134d58282546127bd565b9055818452600160205260408420612abe8282546127bd565b6fffffffffffffffffffffffffffffffff91821691168181106125d457039056fea26469706673582212209298aec6dfa52410e79c324f4c3a985b2c527429e54c854eeac5ace8e845453e64736f6c634300080f0033";
    static readonly abi: ({
        inputs: {
            internalType: string;
            name: string;
            type: string;
        }[];
        stateMutability: string;
        type: string;
        name?: undefined;
        anonymous?: undefined;
        outputs?: undefined;
    } | {
        inputs: never[];
        name: string;
        type: string;
        stateMutability?: undefined;
        anonymous?: undefined;
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
    static createInterface(): ERC4626TermInterface;
    static connect(address: string, signerOrProvider: Signer | Provider): ERC4626Term;
}
export {};
