import type { Config } from "@jest/types";

// https://nextjs.org/docs/testing#jest-and-react-testing-library
const config: Config.InitialOptions = {
  collectCoverageFrom: [
    "<rootDir>/elf/**/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageDirectory: "<rootDir>/../coverage",
  coverageReporters: ["lcov"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    /* Handle CSS imports (with CSS modules)
    https://jestjs.io/docs/webpack#mocking-css-modules */
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

    // Handle CSS imports (without CSS modules)
    "^.+\\.(css|sass|scss)$": "<rootDir>/elf/base/styleMock.js",

    /* Handle image imports
    https://jestjs.io/docs/webpack#handling-static-assets */
    "^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$": "<rootDir>/elf/base/fileMock.js",
  },
  rootDir: "src",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testPathIgnorePatterns: ["node_modules/", ".next/"],
  testEnvironment: "jsdom",
  transform: {
    /* Use babel-jest to transpile tests with the next/babel preset
    https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object */
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  transformIgnorePatterns: [
    "node_modules/(?!d3-)",
    "^.+\\.module\\.(css|sass|scss)$",
  ],
};

export default config;
