module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  // extends from monorepo eslints package
  extends: [
    "plugin:node/recommended",
    "plugin:import/recommended",
    "@elementfi/eslint-config",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] },
    ],
    // disabling b/c this node rule has problems with ts paths, added import plugin for coverage instead
    "node/no-missing-import": "off",
    // disabling this rule because the testnet will need to output to log frequently
    "no-console": "off",
    // disabling b/c the watch script needs to terminate early and we use the exit() function
    "no-process-exit": "off",
    // node plugin throws an error when importing from core-v2-typechain b/c it's not published
    "node/no-unpublished-import": "off",
  },
};
