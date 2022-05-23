# elf-council-tokenlist

The Council Tokenlist for Element

## Install

To install this repo as a dependency on another repo, you'll need to follow these steps in that
repo.

1. Run

```bash
npm install git+https://github.com/element-fi/elf-council-tokenlist.git
```

2. Since this repo is not an npm package yet, add this script to package.json to
   stay up-to-date with the latest version.

```
  "scripts": {
    "update-elf-council-tokenlist": "npm install git+https://github.com/element-fi/elf-council-tokenlist.git"
  },
```

## Setup

To setup this repo you need to run the following:

```bash
npm ci
```

You'll also need to add api keys listed in elf.default.env to your local elf.env file.

##

### Deploying a new term

When a new term is deployed in the elf-deploy repo, run this command to
regenerate the tokenlist:

```bash
# build the new tokenlists
npm run build
```

Once complete, commit all file changes and submit a PR to `main`.

Any project that wants the latest tokenlist will now need to update their
dependency on this repo. See below for handy script that makes upgrading easy
for consumers.
