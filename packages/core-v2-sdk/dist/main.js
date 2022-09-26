var $eCQIH$elementfibase = require("@elementfi/base");
var $eCQIH$lrucache = require("lru-cache");
var $eCQIH$elementficorev2typechain = require("@elementfi/core-v2-typechain");
var $eCQIH$ethers = require("ethers");

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
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $2d791c10cef53ac9$exports = {};

$parcel$export($2d791c10cef53ac9$exports, "ElementClient", () => $2d791c10cef53ac9$export$893aa5fc2ccbccd6);
class $2d791c10cef53ac9$export$893aa5fc2ccbccd6 {
    constructor({ chainId: chainId , provider: provider , dataSources: dataSources = []  }){
        this.chainId = chainId;
        this.provider = provider;
        this.dataSources = dataSources;
    }
    // TODO: Should data sources take on the responsibility of uniquely identifying themselves?
    getDataSource(filter) {
        const dataSource1 = this.dataSources.find((dataSource)=>{
            let isMatch = true;
            for (const [key, value] of Object.entries(filter))if (!dataSource[key] !== value) isMatch = false;
            return isMatch;
        });
        return dataSource1 ?? null;
    }
    setDataSource(filter, // TODO: This could be turned into a callback function that's only called
    // when there isn't an existing data source to avoid the wasted effort of
    // constructing a new data source when one already exists.
    dataSource) {
        const existing = this.getDataSource(filter);
        if (existing) return existing;
        this.dataSources.push(dataSource);
        return dataSource;
    }
}


var $54e3433d3ac69f8a$exports = {};

$parcel$export($54e3433d3ac69f8a$exports, "CachedDataSource", () => $54e3433d3ac69f8a$export$2ed75dd8c92d9d3e);


class $54e3433d3ac69f8a$export$2ed75dd8c92d9d3e {
    constructor(cache){
        this.cache = cache ?? new (0, ($parcel$interopDefault($eCQIH$lrucache)))({
            max: 500
        });
    }
    cached(cacheKey, callback) {
        return (0, $eCQIH$elementfibase.cached)({
            cacheKey: cacheKey,
            cache: this.cache,
            callback: callback
        });
    }
}


var $20adc394a346779f$exports = {};

$parcel$export($20adc394a346779f$exports, "ContractDataSource", () => $20adc394a346779f$export$f5a95cc94689234f);

class $20adc394a346779f$export$f5a95cc94689234f extends (0, $54e3433d3ac69f8a$export$2ed75dd8c92d9d3e) {
    constructor(contract, cache){
        super(cache);
        this.address = contract.address;
        this.contract = contract;
    }
    call(property, args) {
        return this.cached([
            property,
            ...args
        ], ()=>{
            const contract = this.contract;
            const fn = contract[property];
            return fn(...args);
        });
    }
}


var $d0dba6c4aa120ac9$exports = {};

$parcel$export($d0dba6c4aa120ac9$exports, "HTTPDataSource", () => $d0dba6c4aa120ac9$export$4c0f08f860b6a287);

class $d0dba6c4aa120ac9$export$4c0f08f860b6a287 extends (0, $54e3433d3ac69f8a$export$2ed75dd8c92d9d3e) {
    constructor(baseURL, options){
        super();
        this.baseURL = baseURL;
        this.defaultRequestOptions = options?.defaultRequestOptions ?? {};
        this.defaultGetOptions = options?.defaultGetOptions ?? {
            method: "GET"
        };
        this.defaultPostOptions = options?.defaultPostOptions ?? {
            method: "POST"
        };
        this.defaultPutOptions = options?.defaultPutOptions ?? {
            method: "PUT"
        };
        this.defaultDeleteOptions = options?.defaultDeleteOptions ?? {
            method: "DELETE"
        };
        this.onResponse = options?.onResponse ?? ((res)=>res.json());
    }
    // Create
    post(path, options) {
        return this.cached([
            "post",
            path,
            options.body
        ], ()=>fetch(`${this.baseURL}${path}`, {
                ...this.defaultRequestOptions,
                ...this.defaultPostOptions,
                ...options
            }).then(this.onResponse));
    }
    // Read
    get(path, options = {}) {
        return this.cached([
            "get",
            path
        ], ()=>fetch(`${this.baseURL}${path}`, {
                ...this.defaultRequestOptions,
                ...this.defaultGetOptions,
                ...options
            }).then(this.onResponse));
    }
    // Update
    put(path, options) {
        return this.cached([
            "put",
            path,
            options.body
        ], ()=>fetch(`${this.baseURL}${path}`, {
                ...this.defaultRequestOptions,
                ...this.defaultPutOptions,
                ...options
            }).then(this.onResponse));
    }
    // Delete
    delete(path, options = {}) {
        return this.cached([
            "delete",
            path
        ], ()=>fetch(`${this.baseURL}${path}`, {
                ...this.defaultRequestOptions,
                ...this.defaultDeleteOptions,
                ...options
            }).then(this.onResponse));
    }
}


var $69340da10f22a3bb$exports = {};


var $bd9ebd5a6170b777$exports = {};

$parcel$export($bd9ebd5a6170b777$exports, "MultiPoolContractDataSource", () => $bd9ebd5a6170b777$export$3e28d0e9e34d7848);


class $bd9ebd5a6170b777$export$3e28d0e9e34d7848 extends (0, $20adc394a346779f$export$f5a95cc94689234f) {
    constructor(address, provider){
        super((0, $eCQIH$elementficorev2typechain.Pool__factory).connect(address, provider));
    }
    getPoolIds(fromBlock, toBlock) {
        return this.cached([
            "getPoolIds",
            fromBlock,
            toBlock
        ], async ()=>{
            const eventFilter = this.contract.filters.PoolRegistered();
            const events = await this.contract.queryFilter(eventFilter, fromBlock, toBlock);
            return events.map((event)=>event.args.poolId.toNumber());
        });
    }
    getMultiTerm() {
        return this.call("term", []);
    }
}


var $2bc757e9b01d8e37$exports = {};


var $d179b418267ba386$exports = {};

$parcel$export($d179b418267ba386$exports, "MultiTermContractDataSource", () => $d179b418267ba386$export$2bd093a746116e9a);



class $d179b418267ba386$export$2bd093a746116e9a extends (0, $20adc394a346779f$export$f5a95cc94689234f) {
    constructor(address, provider){
        super((0, $eCQIH$elementficorev2typechain.Term__factory).connect(address, provider));
    }
    async getTermIds(fromBlock, toBlock) {
        return this.cached([
            "getPoolIds",
            fromBlock,
            toBlock
        ], async ()=>{
            // TODO: Filter out yield token addresses
            const eventFilter = this.contract.filters.TransferSingle(null, // new mints result in a transfer from the zero address
            (0, $eCQIH$elementfibase.ETH_ZERO_ADDRESS));
            const events = await this.contract.queryFilter(eventFilter, fromBlock, toBlock);
            return Array.from(new Set(events.map((event)=>event.args.id.toNumber())));
        });
    }
    async getYieldSource() {
        // TODO: Replace with appropriate Term.sol yield source property once added
        // console.warn('Idk how to do that')
        return null;
    }
    async getBaseAsset() {
        return this.call("token", []);
    }
}


var $f51a6578dfe1989b$exports = {};

$parcel$export($f51a6578dfe1989b$exports, "ERC4626TermContractDataSource", () => $f51a6578dfe1989b$export$bbbba6d0f10fb94f);


class $f51a6578dfe1989b$export$bbbba6d0f10fb94f extends (0, $d179b418267ba386$export$2bd093a746116e9a) {
    constructor(address, provider){
        super(address, provider);
        this.contract = (0, $eCQIH$elementficorev2typechain.ERC4626Term__factory).connect(address, provider);
    }
    getYieldSourceAddress() {
        return this.call("vault", []);
    }
}


var $e5fa39cebc28622b$exports = {};

$parcel$export($e5fa39cebc28622b$exports, "CompoundV3TermContractDataSource", () => $e5fa39cebc28622b$export$200f8c2a47155eb4);


class $e5fa39cebc28622b$export$200f8c2a47155eb4 extends (0, $d179b418267ba386$export$2bd093a746116e9a) {
    constructor(address, provider){
        super(address, provider);
        this.contract = (0, $eCQIH$elementficorev2typechain.CompoundV3Term__factory).connect(address, provider);
    }
    getYieldSourceAddress() {
        return this.call("yieldSource", []);
    }
}


var $73e85b7b3cdac107$exports = {};


var $fe6691dc6a8bbe5c$exports = {};

$parcel$export($fe6691dc6a8bbe5c$exports, "TokenContractDataSource", () => $fe6691dc6a8bbe5c$export$f746d784fcd6629);


var $f00ba8e0ba7f8838$exports = {};

$parcel$export($f00ba8e0ba7f8838$exports, "CoinGeckoAPIDataSource", () => $f00ba8e0ba7f8838$export$9329909b02e34fde);

class $f00ba8e0ba7f8838$export$9329909b02e34fde extends (0, $d0dba6c4aa120ac9$export$4c0f08f860b6a287) {
    constructor(){
        super("https://api.coingecko.com/api/v3/");
    }
    async getTokenPrice(id, currency) {
        const res = await this.get(`/simple/price?ids=${id}&vs_currencies=${currency ?? "usd"}`);
        return res[id][currency];
    }
}


class $fe6691dc6a8bbe5c$export$f746d784fcd6629 {
    constructor(address, provider, options){
        this.address = address;
        this.apiDataSource = options?.apiDataSource ?? new (0, $f00ba8e0ba7f8838$export$9329909b02e34fde)();
        this.erc20DataSource = options?.erc20DataSource ?? new (0, $20adc394a346779f$export$f5a95cc94689234f)((0, $eCQIH$elementficorev2typechain.ERC20__factory).connect(address, provider));
    }
    getSymbol() {
        return this.erc20DataSource.call("symbol", []);
    }
    getDecimals() {
        return this.erc20DataSource.call("decimals", []);
    }
    getName() {
        return this.erc20DataSource.call("name", []);
    }
    async getPrice(currency) {
        // TODO: find a more reliable way to get the id
        const id = await (await this.getName()).toLowerCase();
        return this.apiDataSource.getTokenPrice(id, currency);
    }
    async getAllowance(owner, spender) {
        const balanceBigNumber = await this.erc20DataSource.call("allowance", [
            owner,
            spender, 
        ]);
        return balanceBigNumber.toString();
    }
    async getBalanceOf(address) {
        const balanceBigNumber = await this.erc20DataSource.call("balanceOf", [
            address, 
        ]);
        return balanceBigNumber.toString();
    }
}


var $12faf819c81c198b$exports = {};



var $38c20ee8daaa11b0$exports = {};


var $047c4a05380e9203$exports = {};

$parcel$export($047c4a05380e9203$exports, "UnknownYieldSourceDataSource", () => $047c4a05380e9203$export$cf7432b8e060b664);

class $047c4a05380e9203$export$cf7432b8e060b664 extends (0, $54e3433d3ac69f8a$export$2ed75dd8c92d9d3e) {
    constructor(address){
        super();
        this.address = address;
    }
    async getName() {
        return this.cached("getName", async ()=>"Unnamed YieldSource");
    }
}


var $3b777295048083ac$exports = {};

$parcel$export($3b777295048083ac$exports, "ERC4626ContractDataSource", () => $3b777295048083ac$export$2404bedfffaf4ac);


class $3b777295048083ac$export$2404bedfffaf4ac extends (0, $20adc394a346779f$export$f5a95cc94689234f) {
    constructor(address, provider){
        super((0, $eCQIH$elementficorev2typechain.ERC4626__factory).connect(address, provider));
    }
    async getName() {
        return this.call("name", []);
    }
}


var $db3c4c3da11ea48c$exports = {};

$parcel$export($db3c4c3da11ea48c$exports, "MultiPool", () => $db3c4c3da11ea48c$export$38f2878d4d50407d);

var $73142241d07e4549$exports = {};

$parcel$export($73142241d07e4549$exports, "MultiTerm", () => $73142241d07e4549$export$44a06e384a6d2ed0);

var $2361706748e2a981$exports = {};

$parcel$export($2361706748e2a981$exports, "Token", () => $2361706748e2a981$export$50792b0e93539fde);


class $2361706748e2a981$export$50792b0e93539fde {
    constructor({ address: address , client: client , dataSource: dataSource  }){
        this.address = address;
        this.client = client;
        if (dataSource) this.dataSource = dataSource;
        else {
            const tokenAPIDataSource = client.setDataSource({
                baseURL: (0, $f00ba8e0ba7f8838$export$9329909b02e34fde).baseURL
            }, new (0, $f00ba8e0ba7f8838$export$9329909b02e34fde)());
            this.dataSource = client.setDataSource({
                address: address
            }, new (0, $fe6691dc6a8bbe5c$export$f746d784fcd6629)(address, client.provider, {
                apiDataSource: tokenAPIDataSource
            }));
        }
    }
    getSymbol() {
        return this.dataSource.getSymbol();
    }
    getDecimals() {
        return this.dataSource.getDecimals();
    }
    getName() {
        return this.dataSource.getName();
    }
    getPrice(currency) {
        return this.dataSource.getPrice(currency);
    }
    getAllowance(owner, spender) {
        return this.dataSource.getAllowance(owner, spender);
    }
    getBalanceOf(address) {
        return this.dataSource.getBalanceOf(address);
    }
}


var $43a71ca2139b91c6$exports = {};

$parcel$export($43a71ca2139b91c6$exports, "YieldSource", () => $43a71ca2139b91c6$export$5b513f5c41d35e50);

class $43a71ca2139b91c6$export$5b513f5c41d35e50 {
    constructor({ address: address , client: client , dataSource: dataSource  }){
        this.address = address;
        this.client = client;
        this.dataSource = dataSource ?? client.setDataSource({
            address: address
        }, new (0, $047c4a05380e9203$export$cf7432b8e060b664)(address));
    }
    getName() {
        return this.dataSource.getName();
    }
}


var $51ba50e48c247b12$exports = {};

$parcel$export($51ba50e48c247b12$exports, "Term", () => $51ba50e48c247b12$export$656c1e606ad06131);
class $51ba50e48c247b12$export$656c1e606ad06131 {
    constructor({ id: id , client: client , multiTerm: multiTerm  }){
        this.id = id;
        this.client = client;
        this.multiTerm = multiTerm;
    }
    get maturity() {
        return this.id;
    }
    getYieldSource() {
        return this.multiTerm.getYieldSource();
    }
    getBaseAsset() {
        return this.multiTerm.getBaseAsset();
    }
}


class $73142241d07e4549$export$44a06e384a6d2ed0 {
    constructor({ address: address , client: client , dataSource: dataSource  }){
        this.address = address;
        this.client = client;
        this.dataSource = dataSource ?? client.setDataSource({
            address: address
        }, new (0, $d179b418267ba386$export$2bd093a746116e9a)(address, client.provider));
    }
    async getTerm(expiryTimestamp) {
        // TODO: should this validate that the term exists?
        return new (0, $51ba50e48c247b12$export$656c1e606ad06131)({
            id: expiryTimestamp,
            client: this.client,
            multiTerm: this
        });
    }
    async getTerms(fromBlock, toBlock) {
        const termIds = await this.dataSource.getTermIds(fromBlock, toBlock);
        return termIds.map((id)=>new (0, $51ba50e48c247b12$export$656c1e606ad06131)({
                id: id,
                client: this.client,
                multiTerm: this
            }));
    }
    async getYieldSource() {
        const address = await this.dataSource.getYieldSource();
        if (!address) return null;
        return new (0, $43a71ca2139b91c6$export$5b513f5c41d35e50)({
            address: address,
            client: this.client
        });
    }
    async getBaseAsset() {
        const address = await this.dataSource.getBaseAsset();
        return new (0, $2361706748e2a981$export$50792b0e93539fde)({
            address: address,
            client: this.client
        });
    }
}


var $5c922a29083dd917$exports = {};

$parcel$export($5c922a29083dd917$exports, "Pool", () => $5c922a29083dd917$export$14963ee5c8637e11);
class $5c922a29083dd917$export$14963ee5c8637e11 {
    constructor({ id: id , client: client , multiPool: multiPool  }){
        this.id = id;
        this.client = client;
        this.multiPool = multiPool;
    }
    get maturity() {
        return this.id;
    }
    getYieldSource() {
        return this.multiPool.getYieldSource();
    }
    getBaseAsset() {
        return this.multiPool.getBaseAsset();
    }
}


class $db3c4c3da11ea48c$export$38f2878d4d50407d {
    constructor({ address: address , client: client , dataSource: dataSource  }){
        this.address = address;
        this.client = client;
        this.dataSource = dataSource ?? client.setDataSource({
            address: address
        }, new (0, $bd9ebd5a6170b777$export$3e28d0e9e34d7848)(address, client.provider));
    }
    async getPool(expiryTimestamp) {
        // TODO: should this validate that the pool exists?
        return new (0, $5c922a29083dd917$export$14963ee5c8637e11)({
            id: expiryTimestamp,
            client: this.client,
            multiPool: this
        });
    }
    async getPools(fromBlock, toBlock) {
        const poolIds = await this.dataSource.getPoolIds(fromBlock, toBlock);
        return poolIds.map((id)=>new (0, $5c922a29083dd917$export$14963ee5c8637e11)({
                id: id,
                client: this.client,
                multiPool: this
            }));
    }
    async getMultiTerm() {
        const address = await this.dataSource.getMultiTerm();
        return new (0, $73142241d07e4549$export$44a06e384a6d2ed0)({
            address: address,
            client: this.client
        });
    }
    async getYieldSource() {
        const multiTerm = await this.getMultiTerm();
        return multiTerm.getYieldSource();
    }
    async getBaseAsset() {
        const multiTerm = await this.getMultiTerm();
        return multiTerm.getBaseAsset();
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


$parcel$exportWildcard(module.exports, $2d791c10cef53ac9$exports);
$parcel$exportWildcard(module.exports, $54e3433d3ac69f8a$exports);
$parcel$exportWildcard(module.exports, $20adc394a346779f$exports);
$parcel$exportWildcard(module.exports, $d0dba6c4aa120ac9$exports);
$parcel$exportWildcard(module.exports, $69340da10f22a3bb$exports);
$parcel$exportWildcard(module.exports, $bd9ebd5a6170b777$exports);
$parcel$exportWildcard(module.exports, $2bc757e9b01d8e37$exports);
$parcel$exportWildcard(module.exports, $d179b418267ba386$exports);
$parcel$exportWildcard(module.exports, $f51a6578dfe1989b$exports);
$parcel$exportWildcard(module.exports, $e5fa39cebc28622b$exports);
$parcel$exportWildcard(module.exports, $73e85b7b3cdac107$exports);
$parcel$exportWildcard(module.exports, $fe6691dc6a8bbe5c$exports);
$parcel$exportWildcard(module.exports, $12faf819c81c198b$exports);
$parcel$exportWildcard(module.exports, $f00ba8e0ba7f8838$exports);
$parcel$exportWildcard(module.exports, $38c20ee8daaa11b0$exports);
$parcel$exportWildcard(module.exports, $047c4a05380e9203$exports);
$parcel$exportWildcard(module.exports, $3b777295048083ac$exports);
$parcel$exportWildcard(module.exports, $db3c4c3da11ea48c$exports);
$parcel$exportWildcard(module.exports, $73142241d07e4549$exports);
$parcel$exportWildcard(module.exports, $5c922a29083dd917$exports);
$parcel$exportWildcard(module.exports, $51ba50e48c247b12$exports);
$parcel$exportWildcard(module.exports, $2361706748e2a981$exports);
$parcel$exportWildcard(module.exports, $43a71ca2139b91c6$exports);
$parcel$exportWildcard(module.exports, $a6ef1106a8ce388b$exports);
$parcel$exportWildcard(module.exports, $98797cba267d5720$exports);
$parcel$exportWildcard(module.exports, $7141e549f83aab3e$exports);
$parcel$exportWildcard(module.exports, $9dde791ff857a61d$exports);
$parcel$exportWildcard(module.exports, $36cbfb79cc4b34b2$exports);
$parcel$exportWildcard(module.exports, $9c1766b6f9f74658$exports);
$parcel$exportWildcard(module.exports, $2199ecd2883db3b5$exports);


//# sourceMappingURL=main.js.map
