"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tags = exports.TokenTag = void 0;
var TokenTag;
(function (TokenTag) {
  TokenTag["VAULT"] = "vault";
  TokenTag["ASSET_PROXY"] = "assetproxy";
  TokenTag["CCPOOL"] = "ccpool";
  TokenTag["PRINCIPAL"] = "eP";
  TokenTag["WPOOL"] = "wpool";
  TokenTag["YIELD"] = "eY";
  TokenTag["CURVE"] = "curve";
})((TokenTag = exports.TokenTag || (exports.TokenTag = {})));
exports.tags = {
  [TokenTag.CURVE]: {
    name: "Curve LP token",
    description:
      "Token that represents a liquidity provider position in a Curve.fi pool",
  },
  [TokenTag.PRINCIPAL]: {
    name: "Principal token",
    description:
      "Token that represents a deposit of principal into a yield position",
  },
  [TokenTag.YIELD]: {
    name: "Yield token",
    description:
      "Token that represents the yield on a deposit into a yield position",
  },
  [TokenTag.CCPOOL]: {
    name: "ConvergentCurve pool",
    description: "Token that represents the balancer pool for Principal tokens",
  },
  [TokenTag.WPOOL]: {
    name: "Weighted pool",
    description: "Token that represents the balancer pool for Yield tokens",
  },
  [TokenTag.ASSET_PROXY]: {
    name: "Vault asset proxy",
    description:
      "Token that wraps a yield position, ie: Yearn vault asset proxy",
  },
  [TokenTag.VAULT]: {
    name: "Vault",
    description: "The yield position, ie: Yearn yvcrvLUSD",
  },
};
