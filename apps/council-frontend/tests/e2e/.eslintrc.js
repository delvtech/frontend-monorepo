const path = require("path");
const synpressPath = path.join(
  // Hacky way to get the absolute project root path
  process.cwd().slice(0, process.cwd().indexOf("/apps")),
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
