# elf-council-typechain

Typechain codegen for generating Typescript classes and types for elf-council

## Install

Run

```
npm install git+https://github.com/element-fi/elf-council-typechain.git
```

## Here, take this!

Since this repo is not an npm package, it can be helpful to include this simple script to upgrade your project to the latest commit:

```
  "scripts": {
    "update-elf-council-typechain": "npm install git+https://github.com/element-fi/elf-council-typechain.git"
  },
```

## Development

Run

```
npm ci
```

## Updating to the latest contracts

Run

```
npm run load-contracts
npm run build
```
