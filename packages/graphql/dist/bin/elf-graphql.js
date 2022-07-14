#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var helpers_1 = require("yargs/helpers");
var generate_1 = require("../codegen/generate");
/**
 * A simple CLI for the codegen/generate function
 */
var argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .option("outDir", {
    alias: "o",
    describe: "The output directory for emitted files.",
    default: ".",
})
    .option("package", {
    alias: "p",
    describe: "Generate everything needed for a new @elementfi graphql package.",
    type: "boolean",
})
    .option("schema", {
    alias: "s",
    describe: "Specify the path to your schema.",
    type: "string",
})
    .option("watch", {
    alias: "w",
    describe: "Watch for changes to .graphql files and rerun when changes are found.",
    type: "boolean",
})
    .help().argv;
argv instanceof Promise ? argv.then(generate_1.generate) : (0, generate_1.generate)(argv);
