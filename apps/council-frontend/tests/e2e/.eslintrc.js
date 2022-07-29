module.exports = {
  extends: require.resolve("@synthetixio/synpress/.eslintrc.js"),
  rules: {
    "ui-testing/no-css-page-layout-selector": ["warn", "cypress"],
    "testing-library/await-async-query": "off",
    "testing-library/prefer-screen-queries": "off",
  },
};
