const path = require("path");

/**
 * Hacky way to get the absolute project root path:
 *
 * process.cwd() (Current Working Directory)
 * Returns a different path depending on where the script that calls it is ran from
 *
 * This is a solution for when the script is in the council-frontend or root dir
 */
let ROOT_PATH = process.cwd().slice(0, process.cwd().indexOf("/apps"));
if (ROOT_PATH.charAt(ROOT_PATH.length - 1) !== "o") {
  ROOT_PATH += "o";
}

const synpressPath = path.join(
  ROOT_PATH,
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
