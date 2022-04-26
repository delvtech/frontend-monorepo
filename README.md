## Frontend monorepo for Element Finance

This repo contains frontend packages and applications that are maintained by Element Finance.

## Required `node` version

- **Node 14.19.1**
- Vercel only supports node 12.x and 14.x as of this writing.
- This repo contains an .nvmrc, so you can just run `nvm use` from the top-level.

## Required `yarn` version

- **yarn 1.22.18 **
- Vercel supports Yarn 1, see: https://vercel.com/support/articles/does-vercel-support-yarn-2
- Run: `npm install -g yarn@1.22.18`

## Development

1. Clone the repo: `git clone git@github.com:element-fi/frontend-monorepo.git`
2. Run `yarn` at the top-level to install all packages across every workspace

### Installing new packages

Here are a few examples of how to install packages in this repo:

```bash
# Install prettier for the top-level package.json, useful for tooling that
# runs against the entire monorepo
yarn add prettier

# Install lodash for the packages/base workspace.
# Note: specify the workspace by the name in its `package.json`, ie: `base` not `packages/base`
yarn workspace base add lodash

# Install peripherals workspace as dependency for the liquidity mining app
# confirm this: yarn workspace liquidity-mining-ui add peripherals
```

### Running workspace scripts

To run scripts in workspaces, use the following command:

```bash
yarn workspace <workspace-name> <packge.json script>
```

Example

```bash
yarn workspace elf-council-frontend start
```
