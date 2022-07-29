module.exports = {
  ignorePatterns: ["*.json", "*.md"],
  extends: require.resolve("@synthetixio/synpress/.eslintrc.js"),
  root: true,
  rules: {
    "ui-testing/no-css-page-layout-selector": ["warn", "cypress"],
    "testing-library/await-async-query": "off",
    "testing-library/prefer-screen-queries": "off",
  },
};
