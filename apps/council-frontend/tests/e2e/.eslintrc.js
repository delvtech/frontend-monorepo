const path = require("path");
const synpressPath = path.join(
  process.cwd(),
  "/node_modules/@synthetixio/synpress",
);

module.exports = {
  extends: `${synpressPath}/.eslintrc.js`,
  rules: {
    "ui-testing/no-css-page-layout-selector": ["warn", "cypress"],
    "testing-library/await-async-query": "off",
    "testing-library/prefer-screen-queries": "off",
  },
};
