import { CoreV2Context } from "src/context";
import { Resolvers } from "src/generated";
import { MultiTermModel } from "src/models/MultiTerm";
import { TermModel } from "src/models/Term";
import { YieldSourceModel } from "src/models/YieldSource";
import { MultiPoolModel } from "src/models/MultiPool";
import { PoolModel } from "src/models/Pool";

export const resolvers: Resolvers<CoreV2Context> = {
  Query: {
    multiTerm: (_, { yieldSource: yieldSourceName }, context) => {
      const yieldSource = YieldSourceModel.getByName({
        name: yieldSourceName,
        context,
      });
      const multiTerm = MultiTermModel.getByYieldSource({
        yieldSource,
        context,
      });
      return multiTerm || null;
    },

    term: (_, { yieldSource: yieldSourceName, maturity }, context) => {
      const yieldSource = YieldSourceModel.getByName({
        name: yieldSourceName,
        context,
      });
      const term = TermModel.getByMaturity({ maturity, yieldSource, context });
      return term || null;
    },

    // terms: (_, { yieldSource: yieldSourceName }, context) => {

    // },

    multiPool: (_, { yieldSource: yieldSourceName }, context) => {
      const yieldSource = YieldSourceModel.getByName({
        name: yieldSourceName,
        context,
      });
      const multiPool = MultiPoolModel.getByYieldSource({
        yieldSource,
        context,
      });
      return multiPool || null;
    },

    pool: (_, { yieldSource: yieldSourceName, maturity }, context) => {
      const yieldSource = YieldSourceModel.getByName({
        name: yieldSourceName,
        context,
      });
      const pool = PoolModel.getByMaturity({ maturity, yieldSource, context });
      return pool || null;
    },

    // pools: (_, { yieldSource: yieldSourceName }, context) => {

    // },

    yieldSource: (_, { name }, context) => {
      const yieldSource = YieldSourceModel.getByName({
        name,
        context,
      });
      return yieldSource || null;
    },

    yieldSources: (_, { names }, context) => {
      const yieldSources = YieldSourceModel.getByNames({
        names,
        context,
      });
      return yieldSources.map((yieldSource) => yieldSource || null);
    },
  },

  // MultiTerm: {
  //   baseAsset: (multiTerm, _, context) => {

  //   },

  //   terms: (multiTerm, _, context) => {

  //   },

  //   tvl: (multiTerm, { atBlock }, context) => {

  //   },

  //   totalVolume: (multiTerm, _, context) => {

  //   },

  //   perDayVolume: (multiTerm, _, context) => {

  //   },

  //   yields: (multiTerm, _, context) => {

  //   },
  // },
  // Term: {
  //   baseAsset: (multiTerm, _, context) => {

  //   },

  //   principalToken: (multiTerm, _, context) => {

  //   },

  //   yieldToken: (multiTerm, { startDate }, context) => {

  //   },

  //   pool: (multiTerm, _, context) => {

  //   },

  //   tvl: (multiTerm, _, context) => {

  //   },

  //   createdTimestamp: (multiTerm, _, context) => {

  //   },

  //   createdAtBlock: (multiTerm, _, context) => {

  //   },
  // },

  // YieldToken: {
  //   accruedInterest: (yieldToken, _, context) => {

  //   }
  // },

  // PrincipalToken: {
  //   price: (principalToken, _, context) => {

  //   },

  //   priceFiat: (principalToken, _, context) => {

  //   },

  //   baseAsset: (principalToken, _, context) => {

  //   }
  // },

  // Token: {
  //   price: (token, _, context) => {

  //   }
  // },

  // MultiPool: {
  //   pool: (multiPool, { maturity }, context) => {

  //   },

  //   pools: (multiPool, _, context) => {

  //   }
  // },

  // Pool: {
  //   baseAsset: (pool, _, context) => {

  //   },

  //   baseAssetReserves: (pool, _, context) => {

  //   },

  //   shareAsset: (pool, _, context) => {

  //   },

  //   shareAssetReserves: (pool, _, context) => {

  //   },

  //   principalToken: (pool, _, context) => {

  //   },

  //   principalTokenReserves: (pool, _, context) => {

  //   },

  //   lpToken: (pool, _, context) => {

  //   },

  //   price: (pool, _, context) => {

  //   },

  //   priceFiat: (pool, _, context) => {

  //   },

  //   term: (pool, _, context) => {

  //   },

  //   tvl: (pool, _, context) => {

  //   },

  //   buyPreview: (pool, { baseAssetIn }, context) => {

  //   },

  //   sellPreview: (pool, { principalTokenIn }, context) => {

  //   },
  // },

  // SwapPreview: {
  //   slippage: (swapPreview, _, context) => {

  //   }
  // },

  // YieldSource: {
  //   url: (yieldSource, _, context) => {

  //   },

  //   pricePerShare: (yieldSource, _, context) => {

  //   },
  // }
};
