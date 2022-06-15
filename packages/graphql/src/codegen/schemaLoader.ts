import { mergeSchemas } from "@graphql-tools/schema";
import { readFileSync } from "fs";
import { GraphQLSchema } from "graphql";
import { transpile } from "typescript";

/**
 * Load a `GraphQLSchema` from a file path.
 * @param schemaPath The path to a `.js` or `.ts` file who's default
 *   export is a `GraphQLSchema` or an array of `GraphQLSchema`s
 * @returns A `Promise` that resolves to a `GraphQLSchema`.
 */
export default async function schemaLoader(
  schemaPath: string,
): Promise<GraphQLSchema> {
  const rootPath = process.cwd();
  const fullSchemaPath = `${rootPath}/${schemaPath}`;

  const schemasTS = readFileSync(fullSchemaPath, { encoding: "utf-8" });
  const schemasJS = transpile(schemasTS);
  const schemas = eval(schemasJS);

  if (Array.isArray(schemas)) {
    return mergeSchemas({ schemas });
  } else {
    return schemas;
  }
}
