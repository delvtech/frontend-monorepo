"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
var cli_1 = require("@graphql-codegen/cli");
var watch_1 = require("./watch");
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
    var outDir = _a.outDir, isPackage = _a.package, schema = _a.schema, watch = _a.watch;
    return __awaiter(this, void 0, void 0, function () {
        var graphqlFilesPath, config;
        var _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    graphqlFilesPath = "./**/*.(graphql|gql)";
                    config = {
                        schema: graphqlFilesPath,
                        documents: graphqlFilesPath,
                        // documents are files with graphql operations (queries and mutations). This
                        // option prevents the codegen from throwing an error if none are found.
                        ignoreNoDocuments: true,
                        overwrite: true,
                    };
                    if (isPackage) {
                        config.generates = (_b = {},
                            _b["".concat(outDir, "/module.d.ts")] = configs_js_1.moduleDefinitions,
                            _b["".concat(outDir, "/index.ts")] = configs_js_1.packageMain,
                            _b);
                    }
                    else {
                        if (schema) {
                            config.schema = (_c = {},
                                _c[schema] = {
                                    loader: "@elementfi/graphql/dist/codegen/schemaLoader",
                                },
                                _c);
                        }
                        config.generates = (_d = {},
                            _d["".concat(outDir, "/module.d.ts")] = configs_js_1.moduleDefinitions,
                            _d["".concat(outDir, "/index.ts")] = configs_js_1.appMain,
                            _d);
                    }
                    return [4 /*yield*/, (0, cli_1.generate)(config)];
                case 1:
                    _e.sent();
                    if (watch) {
                        (0, watch_1.watch)(graphqlFilesPath, function () {
                            (0, cli_1.generate)(config);
                        });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.generate = generate;
