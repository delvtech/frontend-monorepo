import type { Types } from "@graphql-codegen/plugin-helpers";

/**
 * A comment to be added to the top of generated files.
 */
const addGeneratedNote = {
  add: {
    placement: "prepend",
    content: `
/* eslint-disable */
// NOTE: This is a generated file and should not be edited directly.
// To edit this file, modify the @element/graphql codegen script.
`,
  },
};

/**
 * A fallback declaration for graphql files that don't contain any operations
 */
const addFallbackFileModule = {
  add: {
    placement: "append",
    content: `
declare module '*.graphql' {
  import { DocumentNode } from 'graphql';
  const Schema: DocumentNode;
  export default Schema;
}
`,
  },
};

/**
 * A simple config for GraphQL types based on a schema's type definitions.
 */
export const types: Types.ConfiguredOutput = {
  plugins: ["time", addGeneratedNote, "typescript"],
};

/**
 * A config for generated module definitions to avoid TypeScript errors when
 * importing `.graphql` files into `.ts`, `.tsx`, and `.mts` files.
 */
export const moduleDefinitions: Types.ConfiguredOutput = {
  plugins: [
    "time",
    addGeneratedNote,
    "typescript-graphql-files-modules",
    addFallbackFileModule,
  ],
};

/**
 * A config for generated types and Apollo hooks for a new `@elementfi` schema
 * package.
 */
export const packageMain: Types.ConfiguredOutput = {
  plugins: [
    "time",
    addGeneratedNote,
    "typescript",
    {
      "typescript-resolvers": {
        // Imports the `ResolverContext` interface for resolver types.
        contextType: "@elementfi/graphql#ResolverContext",
      },
    },
    "typescript-operations",
    "typescript-react-apollo",
  ],
};

/**
 * Create a config for generated Apollo hooks which are emitted next to their
 * corresponding `.graphql` files and import common schema types from a
 * base types path.
 * @param baseTypesPath The path to the base types.
 * @returns `ConfiguredOutput` to included in codegen.
 */
export function getCollocatedHooks(
  baseTypesPath: string,
): Types.ConfiguredOutput {
  return {
    preset: "near-operation-file",
    presetConfig: {
      extension: ".generated.ts",
      baseTypesPath: baseTypesPath,
    },
    plugins: [
      "time",
      addGeneratedNote,
      "typescript-operations",
      "typescript-react-apollo",
    ],
  };
}
