## Frontend monorepo for Element Finance

This repo contains frontend packages and applications that are maintained by Element Finance.

## Required `node` version
- **Node 14.19.1**
- Vercel only supports node 12.x and 14.x as of this writing.
- This repo contains an .nvmrc, so you can just run `nvm use` from the top-level.

## Required `npm` version
- **npm 8.6.0**
- By default, node ships with npm@6.14.16.
- The `npm workspaces` feature was introduced in 7.x, so you will have to upgrade npm manually.
- Run: `npm install -g npm@8.6.0`

## Development

1. Clone the repo: `git clone git@github.com:element-fi/liquidity-mining-ui.git`
2. Run `npm ci` at the top-level to install all packages across every workspace

### Installing new packages

Here are a few examples of how to install packages in this repo:

```bash
# Install prettier for the top-level package.json, useful for tooling that
# runs against the entire monorepo
npm install prettier

# Install lodash for the packages/base workspace.
# Note: specify the workspace by the name in its `package.json`, ie: `base` not `packages/base`
npm install lodash -w base

# Install peripherals workspace as dependency for the liquidity mining app
npm install peripherals -w liquiditymining
```
