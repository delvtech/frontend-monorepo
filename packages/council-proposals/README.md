# elf-council-proposals

A simple JSON file that stores our pairs of on-chain and off-chain proposals.

## Install

Run

```bash
npm install git+https://github.com/element-fi/elf-council-proposals.git
```

## Build

```bash
npm run build
```

## Example

```ts
import { mainnetProposals } from "elf-council-proposals";

// Get the list of proposals that haven't expired yet
const openProposals = mainnetProposals.proposals.filter(
  (proposal) => provider.getBlock() < proposal.expiration,
);
```

## Here, take this!

Since this repo is not an npm package, it can be helpful to include this simple script to upgrade your project to the latest commit:

```
  "scripts": {
    "update-elf-council-proposals": "npm install git+https://github.com/element-fi/elf-council-proposals.git"
  },
```

## Configure

To build this repo you need to configure some env variables. For linux and mac run the following:

1. Copy `elf.default.env`

```bash
cp elf.default.env elf.env
```

2. Update elf.env with your alchemy api key

```bash
export ALCHEMY_MAINNET_API_KEY=
```

3. Source the env file

```bash
source elf.env
```
