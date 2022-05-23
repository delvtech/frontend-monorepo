import json from "@rollup/plugin-json";
// rollup-plugin-typescript2 IS the blessed typescript plugin for rollup
import typescript from "rollup-plugin-typescript2";
import ttypescript from "ttypescript";

export default [
  // ES Modules
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "cjs",
    },
    plugins: [
      typescript({
        // transform typescript, needed for typescript-transform-paths.  this transforms aliased
        // imports used in source files to relative imports in dist files.
        typescript: ttypescript,
        tsconfigOverride: {
          compilerOptions: {
            // hardhat requires commonjs, rollup uses esnext
            module: "esnext",
          },
          // don't include hardhat.config.ts
          files: null,
        },
        tsconfigDefaults: {
          compilerOptions: {
            plugins: [
              // transform aliased paths.  files in src/ use aliased paths.  e.g in src/index.ts, we
              // import a file like
              // import { getTokenList } from 'src/getTokenList';
              // when we create dist files, we need to transform this to
              // import { getTokenList } from './getTokenList';
              { transform: "typescript-transform-paths" },
              // do the same transfomrmation for declaration files
              {
                transform: "typescript-transform-paths",
                afterDeclarations: true,
              },
            ],
          },
        },
      }),
      json(),
    ],
  },
];
