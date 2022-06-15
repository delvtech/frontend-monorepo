module.exports = {
  ignorePatterns: ["*.json", "*.md"],
  extends: [
    "react-app",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended",
    "plugin:jsx-a11y/recommended",
    /**
     * Prettier must be the last extension in the list.
     * Prettier works best if you disable all other ESLint rules relating to
     * code formatting, and only enable rules that detect potential bugs.
     * (If another active ESLint rule disagrees with prettier about how code
     * should be formatted, it will be impossible to avoid lint errors.)
     */
    "prettier",
  ],
  plugins: ["tailwindcss", "jsx-a11y", "testing-library", "jest-dom"],
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      rules: {
        "no-undef": ["off"],
        "react-hooks/exhaustive-deps": "error",
      },
    },
  ],
  rules: {
    "tailwindcss/classnames-order": "off", // Disable ordering in favor of prettier plugin
    "@typescript-eslint/explicit-module-boundary-types": "error", // exported functions must have return types
    "@typescript-eslint/no-empty-function": "off", // empty arrow functions are fine for noops when passed to components
    "@typescript-eslint/no-empty-interface": "off", // empty interfaces for component props should be allowed
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^unused",
      },
    ],
    "import/no-unused-modules": "error",
    curly: "error",
    "no-console": [
      "warn",
      {
        allow: ["warn", "error", "info", "assert"],
      },
    ],
    "no-new-func": "error", // const func = new Function()
    "no-restricted-imports": [
      "error",
      {
        patterns: ["\\.\\./*"],
      },
    ],
    "no-unused-vars": "off",
    "prefer-template": "error",
    "react/no-unused-prop-types": 0,
  },
  settings: {
    "import/resolver": {
      // always try to resolve types under `<root>@types` directory even it doesn't contain any
      // source code, like `@types/unist`
      "eslint-import-resolver-typescript": {
        alwaysTryTypes: true,
      },
    },
  },
};
