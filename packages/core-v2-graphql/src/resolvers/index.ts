import { MultiPool, MultiTerm, Token } from "@elementfi/core-v2-sdk";
import { ElementGraphQLContext } from "src/context";
import * as types from "src/generated";

export const resolvers: types.Resolvers<ElementGraphQLContext> = {
  Query: {
    multiTerm: (_, { address, yieldSource }, { elementContext }) => {
      if (address) {
        return new MultiTerm(address, elementContext);
      } else if (yieldSource) {
        // TODO: How will yield source names be mapped to multiterms?
      }
      return null;
    },

    term: async (
      _,
      { multiTerm: multiTermAddress, maturity },
      { elementContext },
    ) => {
      const term = await new MultiTerm(
        multiTermAddress,
        elementContext,
      ).getTerm(+maturity);
      if (term) {
        const { id: idNumber, maturityDate, multiTerm } = term;
        const maturity = maturityDate.getTime();
        const id = idNumber.toString();
        return {
          id,
          multiTerm,
          maturity,
          principalToken: {
            id,
            maturity,
          },
        };
      }
      return null;
    },

    // terms: (_, { yieldSource: yieldSourceName }, context) => {

    // },

    multiPool: (_, { address, yieldSource }, { elementContext }) => {
      if (address) {
        return new MultiPool(address, elementContext);
      } else if (yieldSource) {
        // TODO: How will yield source names be mapped to multiPools?
      }
      return null;
    },

    pool: async (
      _,
      { multiPool: multiPoolAddress, maturity },
      { elementContext },
    ) => {
      const pool = await new MultiPool(
        multiPoolAddress,
        elementContext,
      ).getPool(+maturity);
      if (pool) {
        const { id: idNumber, maturityDate, multiPool } = pool;
        const maturity = maturityDate.getTime();
        const id = idNumber.toString();
        return {
          id,
          multiPool,
          maturity,
          lpToken: {
            id,
            maturity,
          },
          principalToken: {
            id,
            maturity,
          },
        };
      }
      return null;
    },

    token: async (_, { address }) => {
      return { address };
    },

    // pools: (_, { yieldSource: yieldSourceName }, context) => {

    // },

    // yieldSource: (_, { name }, context) => {
    //   const yieldSource = YieldSourceModel.getByName({
    //     name,
    //     context,
    //   });
    //   return yieldSource || null;
    // },

    // yieldSources: (_, { names }, context) => {
    //   const yieldSources = YieldSourceModel.getByNames({
    //     names,
    //     context,
    //   });
    //   return yieldSources.map((yieldSource) => yieldSource || null);
    // },
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

  Token: {
    balanceOf: (token, { owner }, { elementContext }) => {
      return new Token(token.address, elementContext).getBalanceOf(owner);
    },

    allowance: async (token, { owner, spender }, { elementContext }) => {
      return new Token(token.address, elementContext).getAllowance(
        owner,
        spender,
      );
    },
  },

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
