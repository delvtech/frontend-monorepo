import { GraphQLSchema } from "graphql";
/**
 * Load a `GraphQLSchema` from a file path.
 * @param schemaPath The path to a `.js` or `.ts` file who's default
 *   export is a `GraphQLSchema` or an array of `GraphQLSchema`s
 * @returns A `Promise` that resolves to a `GraphQLSchema`.
 */
export default function schemaLoader(schemaPath: string): Promise<GraphQLSchema>;
