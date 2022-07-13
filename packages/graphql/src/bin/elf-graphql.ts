#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generate } from "src/codegen/generate";

/**
 * A simple CLI for the codegen/generate function
 */
const argv = yargs(hideBin(process.argv))
  .option("outDir", {
    alias: "o",
    describe: "The output directory for emitted files.",
    default: ".",
  })
  .option("package", {
    alias: "p",
    describe:
      "Generate everything needed for a new @elementfi graphql package.",
    type: "boolean",
  })
  .option("schema", {
    alias: "s",
    describe: "Specify the path to your schema.",
    type: "string",
  })
  .option("watch", {
    alias: "w",
    describe:
      "Watch for changes to .graphql files and rerun when changes are found.",
    type: "boolean",
  })
  .help().argv;

argv instanceof Promise ? argv.then(generate) : generate(argv);
