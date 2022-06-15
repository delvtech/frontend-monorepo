"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
var cli_1 = require("@graphql-codegen/cli");
var configs_js_1 = require("./configs.js");
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
function generate(_a) {
  var _b, _c, _d;
  var outDir = _a.outDir,
    isPackage = _a.package,
    schema = _a.schema;
  var config = {
    schema: "./**/*.graphql",
    documents: "./**/*.graphql",
    overwrite: true,
  };
  if (isPackage) {
    config.generates =
      ((_b = {}),
      (_b["".concat(outDir, "/module.d.ts")] = configs_js_1.moduleDefinitions),
      (_b["".concat(outDir, "/index.ts")] = configs_js_1.packageMain),
      _b);
  } else {
    if (schema) {
      config.schema =
        ((_c = {}),
        (_c[schema] = {
          loader: "@elementfi/graphql/dist/codegen/schemaLoader",
        }),
        _c);
    }
    var baseTypesPath = "".concat(outDir, "/graphql.d.ts");
    config.generates =
      ((_d = {}),
      (_d["".concat(outDir, "/graphql-modules.d.ts")] =
        configs_js_1.moduleDefinitions),
      (_d[baseTypesPath] = configs_js_1.types),
      (_d["."] = (0, configs_js_1.getCollocatedHooks)(baseTypesPath)),
      _d);
  }
  (0, cli_1.generate)(config);
}
exports.generate = generate;
