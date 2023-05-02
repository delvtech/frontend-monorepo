## Liquidity Mining UI

Example UI for interacting with the peripherals contracts:
https://github.com/element-foundation/peripherals

This is a NextJS project and is intended to be deployed to Vercel.

## Installation

```bash
 git clone git@github.com:delv-tech/frontend-monorepo.git

 # run yarn at the top level
 cd frontend-monorepo
 yarn
```

NOTE: All commands are intended to be run with the monorepo's `yarn` and `node`
verions, see: https://github.com/delv-tech/frontend-monorepo#readme

## Environment variables

Make sure you have the following environment variables set up in your `.env` file.

**apps/liquiditymining/.env**

```bash
NEXT_PUBLIC_GOERLI_URI=your-goerli-uri
NEXT_PUBLIC_MAINNET_URI=your-mainnet-uri
NEXT_PUBLIC_CHAIN_NAME=goerli # or "mainnet"
```

NOTE: This was developed with [Alchemy](https://www.alchemy.com/) as a provider.

## Development

To run the development server you must first build the app, then run the start command:

```
# Build the app, you only need to do this once
yarn workspace liquidity-mining-ui run build

# Start the app server and point it at goerli
yarn workspace liquidity-mining-ui run dev-goerli
```

## Deployment

This is a NextJS app and intended to be deployed to Vercel. Make sure to set up
all the same environment variables when you create your Vercel project.

Also, since this app lives in a monorepo, you'll need to override the following
settings in your Vercel project:

Build Command: `yarn workspace liquidity-mining-ui run build`

Output Directory: `apps/liquiditymining/.next`

![image](https://user-images.githubusercontent.com/4524175/168927928-36c3f35b-7aab-4484-adea-61764011d253.png)
