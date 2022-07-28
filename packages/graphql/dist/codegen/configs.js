"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appMain = exports.packageMain = exports.moduleDefinitions = void 0;
/**
 * A comment to be added to the top of generated files.
 */
var addGeneratedNote = {
    add: {
        placement: "prepend",
        content: "\n/* eslint-disable */\n// NOTE: This is a generated file and should not be edited directly.\n// To edit this file, modify the @element/graphql codegen script.\n",
    },
};
/**
 * A fallback declaration for graphql files that don't contain any operations
 */
var addFallbackFileModule = {
    add: {
        placement: "append",
        content: "\ndeclare module '*.graphql' {\n  import { DocumentNode } from 'graphql';\n  const Schema: DocumentNode;\n  export default Schema;\n}\n",
    },
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
 * A config for generated types and Apollo hooks for a new `@elementfi` app.
 */
exports.appMain = {
    plugins: [
        "time",
        addGeneratedNote,
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
    ],
};
