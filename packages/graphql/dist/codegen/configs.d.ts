import type { Types } from "@graphql-codegen/plugin-helpers";
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
 * A config for generated types and Apollo hooks for a new `@elementfi` app.
 */
export declare const appMain: Types.ConfiguredOutput;
