"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollocatedHooks =
  exports.packageMain =
  exports.moduleDefinitions =
  exports.types =
    void 0;
/**
 * A comment to be added to the top of generated files.
 */
var addGeneratedNote = {
  add: {
    placement: "prepend",
    content:
      "\n/* eslint-disable */\n// NOTE: This is a generated file and should not be edited directly.\n// To edit this file, modify the @element/graphql codegen script.\n",
  },
};
/**
 * A fallback declaration for graphql files that don't contain any operations
 */
var addFallbackFileModule = {
  add: {
    placement: "append",
    content:
      "\ndeclare module '*.graphql' {\n  import { DocumentNode } from 'graphql';\n  const Schema: DocumentNode;\n  export default Schema;\n}\n",
  },
};
/**
 * A simple config for GraphQL types based on a schema's type definitions.
 */
exports.types = {
  plugins: ["time", addGeneratedNote, "typescript"],
};
/**
 * A config for generated module definitions to avoid TypeScript errors when
 * importing `.graphql` files into `.ts`, `.tsx`, and `.mts` files.
 */
exports.moduleDefinitions = {
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
exports.packageMain = {
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
function getCollocatedHooks(baseTypesPath) {
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
exports.getCollocatedHooks = getCollocatedHooks;
