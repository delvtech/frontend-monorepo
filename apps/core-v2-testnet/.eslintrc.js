module.exports = {
  env: {
    browser: false,
    es2021: true,
    mocha: true,
    node: true,
  },
  // extends from monorepo eslints package
  extends: ["@elementfi/eslint-config", "plugin:node/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "node/no-unsupported-features/es-syntax": [
      "error",
      { ignores: ["modules"] },
    ],
    // TODO @cashd: Changed rule to warning until I can figure out resolving ts paths
    "node/no-missing-import": ["warn"],
    // disabling this rule because the testnet will need to output to log frequently
    "no-console": "off",
    "no-process-exit": "off",
  },
};
