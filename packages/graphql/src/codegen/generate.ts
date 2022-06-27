import { loadDocuments } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
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
    overwrite: true,
  };

  // TODO: Create a PR on the @graphql-codegen/cli repo to handle missing
  // schemas and documents more gracefully so you're not forced to edit your
  // config for each scenario. If it can't find a schema or document, it should
  // probably just log a warning, but continue generating what it can. If I
  // require the script to throw an error to prevent "broken" builds in a CI/CD
  // pipeline, then maybe that behavior should have a separate config setting I
  // can use to disable/enable it.
  try {
    // this will fail if their are no documents (operations) found.
    await loadDocuments("./**/*.graphql", {
      loaders: [new GraphQLFileLoader()],
    });
    // if it doesn't fail, include the documents field
    config.documents = "./**/*.graphql";
  } catch (err) {
    // If no operations are found, don't include the documents field since it
    // would cause the codegen to fail.
  }

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
