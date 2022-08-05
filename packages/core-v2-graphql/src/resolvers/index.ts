import { V2Context } from "src/context";
import { Resolvers } from "src/generated";

export const resolvers: Resolvers<V2Context> = {
  Query: {
    term: () => {
      return {
        address: "0x1",
        name: "PLACEHOLDER TERM",
      };
    },
  },
  Term: {
    pool: () => {
      return {
        address: "0x1",
        yieldSource: {
          address: "0x1",
          name: "PLACEHOLDER YIELD SOURCE",
        },
      };
    },
  },
};
