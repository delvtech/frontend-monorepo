import { generate as graphqlCodegen } from "@graphql-codegen/cli";
import type { Types } from "@graphql-codegen/plugin-helpers";
import {
  types,
  moduleDefinitions,
  packageMain,
  getCollocatedHooks,
} from "./configs.js";

interface GenerateOptions {
  outDir: string;
  package?: boolean;
  schema?: string;
}

// https://www.graphql-code-generator.com/docs/advanced/programmatic-usage

/**
 * Generate TypeScript types and Apollo hooks from `.graphql` files for Element
 * Finance apps and schema packages.
 * @param options
 * @param options.outDir The output directory for emitted files.
 * @param options.package If `true`, everything needed for a new `@elementfi`
 *   GraphQL schema package (e.g. `@elementfi/core-graphql`) will be emitted
 *   into the `outDir`. If `false` or `undefined`, type files will be emitted
 *   into the `outDir`, but hook files will be emitted next to their
 *   corresponding `.graphql` files.
 * @param options.schema The path to a `.js` or `.ts` file who's default export
 *   is a `GraphQLSchema` or an array of `GraphQLSchema`s containing type
 *   definitions for all the app's GraphQL operations. If `undefined`, the
 *   script will look for type definitions in all `.graphql` files in the app.
 *   If none exist, the script will fail
 */
export async function generate({
  outDir,
  package: isPackage,
  schema,
}: GenerateOptions): Promise<void> {
  const config: Partial<Types.Config> = {
    schema: "./**/*.graphql",
    documents: "./**/*.graphql",
    ignoreNoDocuments: true,
    overwrite: true,
  };

  if (isPackage) {
    config.generates = {
      [`${outDir}/module.d.ts`]: moduleDefinitions,
      [`${outDir}/index.ts`]: packageMain,
    };
  } else {
    if (schema) {
      config.schema = {
        [schema]: {
          loader: "@elementfi/graphql/dist/codegen/schemaLoader",
        },
      };
    }
    const baseTypesPath = `${outDir}/graphql.d.ts`;
    config.generates = {
      [`${outDir}/graphql-modules.d.ts`]: moduleDefinitions,
      [baseTypesPath]: types,
      ".": getCollocatedHooks(baseTypesPath),
    };
  }

  graphqlCodegen(config as Types.Config);
}
