## Frontend monorepo for Element Finance

Single repo that contains the shareable package code and the apps that depend on them.

## Development

1. Clone the repo: `git clone git@github.com:element-fi/liquidity-mining-ui.git`
2. Run `npm ci` at the top-level to install all packages across every workspace


### Installing new packages 

```bash
# Install prettier for the top-level package.json
npm install prettier 

# Install lodash for the packages/base workspace 
npm install lodash -w packages/base

# Install peripherals workspace as dependency for the liquidity mining app
npm install peripherals -w apps/liquiditymining
```

### Add a new workspace to the monorepo

```bash
# adding a package
cd packages/
npm init package-name -w

# adding an app
cd apps/
npm init app-name -w
```