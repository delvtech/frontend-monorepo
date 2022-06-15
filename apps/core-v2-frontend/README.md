## core-v2-frontend

UI for interacting with the core-v2 contracts

This is a NextJS project and is intended to be deployed to Vercel.

## Installation

```bash
 git clone git@github.com:element-fi/frontend-monorepo.git

 # run yarn at the top level
 cd frontend-monorepo
 yarn
```

NOTE: All commands are intended to be run with the monorepo's `yarn` and `node`
versions, see: https://github.com/element-fi/frontend-monorepo#readme

## Environment variables

Make sure you have the following environment variables set up in your `.env` file.

**apps/liquiditymining/.env**

```bash
NEXT_PUBLIC_GOERLI_ALCHEMY_ID=<your-alchemy-id-here>
NEXT_PUBLIC_MAINNET_ALCHEMY_ID=<your-alchemy-id-here>
NEXT_PUBLIC_CHAIN_ID=1 # 1 for mainnet, 5 for goerli
```

NOTE: This was developed with [Alchemy](https://www.alchemy.com/) as a provider.

## Development

To run the development server you must first build the app, then run the start command:

```
# Build the app, you only need to do this once
yarn workspace core-v2-frontend run build

# Start the app server and point it at goerli
yarn workspace core-v2-frontend run dev-goerli
```

## Deployment

This is a NextJS app and intended to be deployed to Vercel. Make sure to set up
all the same environment variables when you create your Vercel project.

Also, since this app lives in a monorepo, you'll need to override the following
settings in your Vercel project:

Build Command: `yarn workspace core-v2-frontend run build`

Output Directory: `apps/core-v2-frontend/.next`
