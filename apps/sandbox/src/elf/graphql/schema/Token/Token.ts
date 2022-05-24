import { makeExecutableSchema } from "@graphql-tools/schema";
import { getTokenInfo } from "@elementfi/core/tokenlists/tokenlists";
import { formatEther } from "ethers/lib/utils";
import { ERC20__factory } from "@elementfi/core-typechain/dist/v1.1";
import { defaultProvider } from "src/elf/providers/providers";
import { Resolvers } from "src/elf/graphql";
import typeDefs from "./Token.graphql";

export const tokenResolvers: Resolvers = {
  Query: {
    token: (_, { address }) => getTokenInfo(address),
    tokens: (_, { addresses }) =>
      addresses.map((address) => getTokenInfo(address) || { address }),
  },
  Token: {
    balance: async ({ address }, { walletAddress }, context, info) => {
      // debugger;
      const tokenContract = ERC20__factory.connect(address, defaultProvider);
      const [balance] = await tokenContract.functions.balanceOf(walletAddress);
      return formatEther(balance);
    },
  },
  Pool: {
    token: ({ address }) => getTokenInfo(address),
  },
};

export const tokenSchema = makeExecutableSchema({
  typeDefs,
  resolvers: tokenResolvers,
});
