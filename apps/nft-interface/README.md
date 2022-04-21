# Element NFT Website

## Getting started

Install dependencies

This interface is part of Element's monorepo. Install depencies from the monorepo root.

```bash
# in monorepo project root
yarn
# or
yarn install
```

Setting up .env in project root

```
NEXT_PUBLIC_MAINNET_ALCHEMY_KEY=<insert_provider_key>
NEXT_PUBLIC_GOERLI_ALCHEMY_KEY=<insert_provider_key>
NEXT_PUBLIC_TARGET_CHAIN=1 #mainnet
```

Run the development server

```bash
yarn workspace nft-interface dev
```

Run local production server

```bash
yarn workspace nft-interface start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contracts

The smart contracts associated with this project can be found [here](https://github.com/element-fi/nft-contracts). The generated typechain classes have been migrated already. Any updates to the contract will require manual migration of types.

Contract addresses can be found in the `src/addresses` folder. Mainnet, Goerli, and local chains are supported. Mainnet and Goerli contracts are live, but local development will require a local instance of a hardhat network running. There are some helpful scripts in the contract repo for easily deploying the contracts to a local chain.

## Github Actions

Currently there are two pull request actions, one for enforcing formatting and linting rules.

### Running locally <br>

[Act](https://github.com/nektos/act) can be used to simulate github actions locally. Follow the repository's quick start guide. After installing Act you can run actions locally. This command must be run in the root of this project.

```bash
act pull_request
```

Optionally you can run these commands without act.

```bash
yarn prettier:check && yarn lint
```

## Notable libraries

- useWeb3React
- react-query-typechain
- Styled components
