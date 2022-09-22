var $eCQIH$lrucache = require("lru-cache");
var $eCQIH$elementfibase = require("@elementfi/base");
var $eCQIH$elementficorev2typechain = require("@elementfi/core-v2-typechain");
var $eCQIH$ethers = require("ethers");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

$parcel$export(module.exports, "ElementClient", () => $2d791c10cef53ac9$export$893aa5fc2ccbccd6);


var $db3c4c3da11ea48c$exports = {};

$parcel$export($db3c4c3da11ea48c$exports, "MultiPool", () => $db3c4c3da11ea48c$export$38f2878d4d50407d);
class $db3c4c3da11ea48c$export$38f2878d4d50407d {
    constructor({ address: address , multiTerm: multiTerm  }){
        this.address = address;
        this.multiTerm = multiTerm;
    }
}


class $75aaf199713be27c$export$2a55ad228252345c {
    constructor(client){
        this.client = client;
        this.cache = new (0, ($parcel$interopDefault($eCQIH$lrucache)))({
            max: 500
        });
    }
    get(address) {
        return (0, $eCQIH$elementfibase.cached)({
            cacheKey: address,
            cache: this.cache,
            callback: ()=>{
                const dataSource = this.client.context.multiPools.find((multiPool)=>multiPool.address === address);
                if (!dataSource) return null;
                const multiTermAddress = dataSource.multiTerm.address;
                return new (0, $db3c4c3da11ea48c$export$38f2878d4d50407d)({
                    address: address,
                    multiTerm: this.client.multiTerms.get(multiTermAddress)
                });
            }
        });
    }
    getAll() {
        return [];
    }
}




var $73142241d07e4549$exports = {};

$parcel$export($73142241d07e4549$exports, "MultiTerm", () => $73142241d07e4549$export$44a06e384a6d2ed0);
class $73142241d07e4549$export$44a06e384a6d2ed0 {
    // baseAsset: Token;
    // terms: Term[];
    // totalVolume: string;
    // perDayVolume: string;
    // yields: string[];
    constructor({ address: address , yieldSource: yieldSource  }){
        this.address = address;
        this.yieldSource = yieldSource;
    // this.baseAsset = baseAsset;
    // this.terms = terms;
    // this.totalVolume = totalVolume;
    // this.perDayVolume = perDayVolume;
    // this.yields = yields;
    }
}


class $e262c7eb9b3216bc$export$c5dc6238413f3789 {
    constructor(client){
        this.client = client;
        this.cache = new (0, ($parcel$interopDefault($eCQIH$lrucache)))({
            max: 500
        });
    }
    get(address) {
        return (0, $eCQIH$elementfibase.cached)({
            cacheKey: address,
            cache: this.cache,
            callback: ()=>{
                const multiPoolDataSource = this.client.context.multiPools.find((multiPool)=>multiPool.multiTerm.address === address);
                if (!multiPoolDataSource) return null;
                const yieldSourceAddress = multiPoolDataSource.multiTerm.yieldSource.address;
                return new (0, $73142241d07e4549$export$44a06e384a6d2ed0)({
                    address: address,
                    yieldSource: this.client.yieldSources.get(yieldSourceAddress)
                });
            }
        });
    }
    getAll() {
        return [];
    }
}


var $43a71ca2139b91c6$exports = {};

$parcel$export($43a71ca2139b91c6$exports, "Protocol", () => $43a71ca2139b91c6$export$377bbedb5576dfa8);
$parcel$export($43a71ca2139b91c6$exports, "YieldSource", () => $43a71ca2139b91c6$export$5b513f5c41d35e50);
let $43a71ca2139b91c6$export$377bbedb5576dfa8;
(function(Protocol1) {
    Protocol1["YEARN"] = "Yearn";
})($43a71ca2139b91c6$export$377bbedb5576dfa8 || ($43a71ca2139b91c6$export$377bbedb5576dfa8 = {}));
class $43a71ca2139b91c6$export$5b513f5c41d35e50 {
    constructor({ address: address  }){
        this.address = address;
    }
}


class $2ea5fa06982c3328$export$d7ae256a4955dc3e {
    constructor(client){
        this.client = client;
    }
    get(address) {
        return new (0, $43a71ca2139b91c6$export$5b513f5c41d35e50)({
            address: address
        });
    }
    getAll() {
        return [];
    }
}


class $2d791c10cef53ac9$export$893aa5fc2ccbccd6 {
    constructor(context){
        this.context = context;
        this.multiPools = new (0, $75aaf199713be27c$export$2a55ad228252345c)(this);
        this.multiTerms = new (0, $e262c7eb9b3216bc$export$c5dc6238413f3789)(this);
        this.yieldSources = new (0, $2ea5fa06982c3328$export$d7ae256a4955dc3e)(this);
    }
}


var $69340da10f22a3bb$exports = {};


var $bd9ebd5a6170b777$exports = {};

$parcel$export($bd9ebd5a6170b777$exports, "MultiPoolContractDataSource", () => $bd9ebd5a6170b777$export$3e28d0e9e34d7848);


var $f51a6578dfe1989b$exports = {};

$parcel$export($f51a6578dfe1989b$exports, "ERC4626TermContractDataSource", () => $f51a6578dfe1989b$export$bbbba6d0f10fb94f);



var $3b777295048083ac$exports = {};

$parcel$export($3b777295048083ac$exports, "ERC4626ContractDataSource", () => $3b777295048083ac$export$2404bedfffaf4ac);



class $3b777295048083ac$export$2404bedfffaf4ac {
    constructor({ address: address , provider: provider  }){
        this.address = address;
        this.contract = (0, $eCQIH$elementficorev2typechain.ERC4626__factory).connect(address, provider);
        this.cache = new (0, ($parcel$interopDefault($eCQIH$lrucache)))({
            max: 500
        });
    }
    async getName() {
        return (0, $eCQIH$elementfibase.cached)({
            cacheKey: "getName",
            callback: async ()=>{
                return this.contract.name();
            },
            cache: this.cache
        });
    }
}


class $f51a6578dfe1989b$export$bbbba6d0f10fb94f {
    constructor({ address: address , provider: provider , yieldSource: yieldSource  }){
        this.address = address;
        this.contract = (0, $eCQIH$elementficorev2typechain.ERC4626Term__factory).connect(address, provider);
        this.yieldSource = typeof yieldSource === "string" ? new (0, $3b777295048083ac$export$2404bedfffaf4ac)({
            address: yieldSource,
            provider: provider
        }) : yieldSource;
        this.cache = new (0, ($parcel$interopDefault($eCQIH$lrucache)))({
            max: 500
        });
    }
    getYieldSourceAddress() {
        return (0, $eCQIH$elementfibase.cached)({
            cacheKey: "getYieldSourceAddress",
            cache: this.cache,
            callback: ()=>this.contract.vault()
        });
    }
}


class $bd9ebd5a6170b777$export$3e28d0e9e34d7848 {
    constructor({ address: address , provider: provider , multiTerm: multiTerm  }){
        this.address = address;
        this.contract = (0, $eCQIH$elementficorev2typechain.Pool__factory).connect(address, provider);
        this.multiTerm = multiTerm;
        this.cache = new (0, ($parcel$interopDefault($eCQIH$lrucache)))({
            max: 500
        });
    }
    static async createERC4626MultiPool(address, provider) {
        const multiPoolContract = (0, $eCQIH$elementficorev2typechain.Pool__factory).connect(address, provider);
        const multiTermAddress = await multiPoolContract.term();
        const termContract = (0, $eCQIH$elementficorev2typechain.ERC4626Term__factory).connect(multiTermAddress, provider);
        const yieldSourceAddress = await termContract.vault();
        const multiTermDataSource = new (0, $f51a6578dfe1989b$export$bbbba6d0f10fb94f)({
            address: multiTermAddress,
            provider: provider,
            yieldSource: yieldSourceAddress
        });
        return new $bd9ebd5a6170b777$export$3e28d0e9e34d7848({
            address: address,
            provider: provider,
            multiTerm: multiTermDataSource
        });
    }
}


var $2bc757e9b01d8e37$exports = {};



var $38c20ee8daaa11b0$exports = {};





var $5c922a29083dd917$exports = {};

$parcel$export($5c922a29083dd917$exports, "Pool", () => $5c922a29083dd917$export$14963ee5c8637e11);
class $5c922a29083dd917$export$14963ee5c8637e11 {
    constructor({ id: id , multiPool: multiPool , maturity: maturity , yieldSource: yieldSource , baseAsset: baseAsset , baseAssetReserves: baseAssetReserves , shareAsset: shareAsset , shareAssetReserves: shareAssetReserves , principalToken: principalToken , principalTokenReserves: principalTokenReserves , lpToken: lpToken , price: price , priceFiat: priceFiat , term: term , tvl: tvl  }){
        this.id = id;
        this.multiPool = multiPool;
        this.maturity = maturity;
        this.yieldSource = yieldSource;
        this.baseAsset = baseAsset;
        this.baseAssetReserves = baseAssetReserves;
        this.shareAsset = shareAsset;
        this.shareAssetReserves = shareAssetReserves;
        this.principalToken = principalToken;
        this.principalTokenReserves = principalTokenReserves;
        this.lpToken = lpToken;
        this.price = price;
        this.priceFiat = priceFiat;
        this.term = term;
        this.tvl = tvl;
    }
}


var $2ababb11162a7525$exports = {};

$parcel$export($2ababb11162a7525$exports, "PrincipalToken", () => $2ababb11162a7525$export$62007a0bd048d56c);
var $2361706748e2a981$exports = {};

$parcel$export($2361706748e2a981$exports, "Token", () => $2361706748e2a981$export$50792b0e93539fde);
class $2361706748e2a981$export$50792b0e93539fde {
    constructor({ address: address , symbol: symbol , decimals: decimals , name: name , price: price  }){
        this.address = address;
        this.symbol = symbol;
        this.decimals = decimals;
        this.name = name;
        this.price = price;
    }
}


class $2ababb11162a7525$export$62007a0bd048d56c extends (0, $2361706748e2a981$export$50792b0e93539fde) {
    constructor(fields){
        super(fields);
        Object.assign(this, fields);
    }
}


var $51ba50e48c247b12$exports = {};

$parcel$export($51ba50e48c247b12$exports, "Term", () => $51ba50e48c247b12$export$656c1e606ad06131);
class $51ba50e48c247b12$export$656c1e606ad06131 {
    constructor({ id: id , multiTerm: multiTerm , name: name , maturity: maturity , yieldSource: yieldSource , baseAsset: baseAsset , principalToken: principalToken , pool: pool , createdTimestamp: createdTimestamp , createdAtBlock: createdAtBlock , variableAPY: variableAPY , fixedAPR: fixedAPR  }){
        this.id = id;
        this.multiTerm = multiTerm;
        this.name = name;
        this.maturity = maturity;
        this.yieldSource = yieldSource;
        this.baseAsset = baseAsset;
        this.principalToken = principalToken;
        this.pool = pool;
        this.createdTimestamp = createdTimestamp;
        this.createdAtBlock = createdAtBlock;
        this.variableAPY = variableAPY;
        this.fixedAPR = fixedAPR;
    }
}




var $d42f7646c857727b$exports = {};

$parcel$export($d42f7646c857727b$exports, "YieldToken", () => $d42f7646c857727b$export$7e27801a0b3a9d2a);

class $d42f7646c857727b$export$7e27801a0b3a9d2a extends (0, $2361706748e2a981$export$50792b0e93539fde) {
    constructor(fields){
        super(fields);
        Object.assign(this, fields);
    }
}


var $a6ef1106a8ce388b$exports = {};

$parcel$export($a6ef1106a8ce388b$exports, "buyYieldTokens", () => $a6ef1106a8ce388b$export$6f04aa4e93ebc2f0);

async function $a6ef1106a8ce388b$export$6f04aa4e93ebc2f0(tokenAddress, vaultAddress, amount, signer, overrides = {}) {
    const signerAddress = await signer.getAddress();
    return {
        hash: "0x00",
        from: signerAddress,
        gasLimit: (0, $eCQIH$ethers.BigNumber).from(100),
        data: "0x",
        value: (0, $eCQIH$ethers.BigNumber).from(amount),
        confirmations: 1,
        chainId: 1,
        nonce: 1,
        wait: async ()=>Promise.resolve({})
    };
}


var $98797cba267d5720$exports = {};

$parcel$export($98797cba267d5720$exports, "calcSwapConvergentCurvePool", () => $98797cba267d5720$export$5a396e44c774c23);
function $98797cba267d5720$export$5a396e44c774c23(tokenAmountsIn, tokenReserves) {
    return "1";
}


var $7141e549f83aab3e$exports = {};

$parcel$export($7141e549f83aab3e$exports, "calculateLPTokensOut", () => $7141e549f83aab3e$export$fc1e179e9427dc9d);
function $7141e549f83aab3e$export$fc1e179e9427dc9d(tokenAmountsIn, tokenReserves) {
    return "1";
}


var $9dde791ff857a61d$exports = {};

$parcel$export($9dde791ff857a61d$exports, "provideLiquidity", () => $9dde791ff857a61d$export$89f79baa523d0647);

async function $9dde791ff857a61d$export$89f79baa523d0647(amounts, tokensInAddresses, vaultAddress, slippage, signer, overrides = {}) {
    const signerAddress = await signer.getAddress();
    return {
        hash: "0x00",
        from: signerAddress,
        gasLimit: (0, $eCQIH$ethers.BigNumber).from(100),
        data: "0x",
        value: (0, $eCQIH$ethers.BigNumber).from(amounts[0]),
        confirmations: 1,
        chainId: 1,
        nonce: 1,
        wait: async ()=>Promise.resolve({})
    };
}


var $36cbfb79cc4b34b2$exports = {};

$parcel$export($36cbfb79cc4b34b2$exports, "redeemLiquidity", () => $36cbfb79cc4b34b2$export$3d4323a2aa222f23);

async function $36cbfb79cc4b34b2$export$3d4323a2aa222f23(amount, poolAddress, signer, overrides = {}) {
    const signerAddress = await signer.getAddress();
    return {
        hash: "0x00",
        from: signerAddress,
        gasLimit: (0, $eCQIH$ethers.BigNumber).from(100),
        data: "0x",
        value: (0, $eCQIH$ethers.BigNumber).from(amount),
        confirmations: 1,
        chainId: 1,
        nonce: 1,
        wait: async ()=>Promise.resolve({})
    };
}


var $9c1766b6f9f74658$exports = {};

$parcel$export($9c1766b6f9f74658$exports, "tradePrincipalTokens", () => $9c1766b6f9f74658$export$4788e751b8f21c65);

async function $9c1766b6f9f74658$export$4788e751b8f21c65(amount, tokenInAddress, tokenOutAddress, vaultAddress, slippage, signer, overrides = {}) {
    const signerAddress = await signer.getAddress();
    return {
        hash: "0x00",
        from: signerAddress,
        gasLimit: (0, $eCQIH$ethers.BigNumber).from(100),
        data: "0x",
        value: (0, $eCQIH$ethers.BigNumber).from(amount),
        confirmations: 1,
        chainId: 1,
        nonce: 1,
        wait: async ()=>Promise.resolve({})
    };
}


var $2199ecd2883db3b5$exports = {};

$parcel$export($2199ecd2883db3b5$exports, "withdrawLiquidity", () => $2199ecd2883db3b5$export$3191c47e10722ce4);

async function $2199ecd2883db3b5$export$3191c47e10722ce4(amount, poolAddress, signer, overrides = {}) {
    const signerAddress = await signer.getAddress();
    return {
        hash: "0x00",
        from: signerAddress,
        gasLimit: (0, $eCQIH$ethers.BigNumber).from(100),
        data: "0x",
        value: (0, $eCQIH$ethers.BigNumber).from(amount),
        confirmations: 1,
        chainId: 1,
        nonce: 1,
        wait: async ()=>Promise.resolve({})
    };
}


$parcel$exportWildcard(module.exports, $69340da10f22a3bb$exports);
$parcel$exportWildcard(module.exports, $bd9ebd5a6170b777$exports);
$parcel$exportWildcard(module.exports, $2bc757e9b01d8e37$exports);
$parcel$exportWildcard(module.exports, $f51a6578dfe1989b$exports);
$parcel$exportWildcard(module.exports, $38c20ee8daaa11b0$exports);
$parcel$exportWildcard(module.exports, $3b777295048083ac$exports);
$parcel$exportWildcard(module.exports, $db3c4c3da11ea48c$exports);
$parcel$exportWildcard(module.exports, $73142241d07e4549$exports);
$parcel$exportWildcard(module.exports, $5c922a29083dd917$exports);
$parcel$exportWildcard(module.exports, $2ababb11162a7525$exports);
$parcel$exportWildcard(module.exports, $51ba50e48c247b12$exports);
$parcel$exportWildcard(module.exports, $2361706748e2a981$exports);
$parcel$exportWildcard(module.exports, $43a71ca2139b91c6$exports);
$parcel$exportWildcard(module.exports, $d42f7646c857727b$exports);
$parcel$exportWildcard(module.exports, $a6ef1106a8ce388b$exports);
$parcel$exportWildcard(module.exports, $98797cba267d5720$exports);
$parcel$exportWildcard(module.exports, $7141e549f83aab3e$exports);
$parcel$exportWildcard(module.exports, $9dde791ff857a61d$exports);
$parcel$exportWildcard(module.exports, $36cbfb79cc4b34b2$exports);
$parcel$exportWildcard(module.exports, $9c1766b6f9f74658$exports);
$parcel$exportWildcard(module.exports, $2199ecd2883db3b5$exports);


//# sourceMappingURL=main.js.map
