import type { Types } from "@graphql-codegen/plugin-helpers";
/**
 * A simple config for GraphQL types based on a schema's type definitions.
 */
export declare const types: Types.ConfiguredOutput;
/**
 * A config for generated module definitions to avoid TypeScript errors when
 * importing `.graphql` files into `.ts`, `.tsx`, and `.mts` files.
 */
export declare const moduleDefinitions: Types.ConfiguredOutput;
/**
 * A config for generated types and Apollo hooks for a new `@elementfi` schema
 * package.
 */
export declare const packageMain: Types.ConfiguredOutput;
/**
 * Create a config for generated Apollo hooks which are emitted next to their
 * corresponding `.graphql` files and import common schema types from a
 * base types path.
 * @param baseTypesPath The path to the base types.
 * @returns `ConfiguredOutput` to included in codegen.
 */
export declare function getCollocatedHooks(baseTypesPath: string): Types.ConfiguredOutput;
