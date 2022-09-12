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
var $954ad8ef0fea4afa$exports = {};
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


$parcel$exportWildcard($954ad8ef0fea4afa$exports, $a6ef1106a8ce388b$exports);
$parcel$exportWildcard($954ad8ef0fea4afa$exports, $98797cba267d5720$exports);
$parcel$exportWildcard($954ad8ef0fea4afa$exports, $7141e549f83aab3e$exports);
$parcel$exportWildcard($954ad8ef0fea4afa$exports, $9dde791ff857a61d$exports);
$parcel$exportWildcard($954ad8ef0fea4afa$exports, $36cbfb79cc4b34b2$exports);
$parcel$exportWildcard($954ad8ef0fea4afa$exports, $9c1766b6f9f74658$exports);
$parcel$exportWildcard($954ad8ef0fea4afa$exports, $2199ecd2883db3b5$exports);


$parcel$exportWildcard(module.exports, $954ad8ef0fea4afa$exports);


//# sourceMappingURL=main.js.map
