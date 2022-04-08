## Frontend monorepo for Element Finance

Single repo that contains the shareable package code and the apps that depend on them.

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