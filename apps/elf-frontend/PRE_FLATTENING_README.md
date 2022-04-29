The frontend for Element.fi

## How to run locally

From the testnet directory, run the following commands:

```bash
npm ci
npm run build
npm start
npm run deploy-contracts
```

From the project top-level directory, run the following commands:

```bash
npm run copy-contracts
```

From the frontend directory, run the following commands:

Run

```bash
npm ci

# Run a local version of the mainnet Earn ui
npm run start:dev-mainnet-app
```

### Updating contracts

From the testnet directory, run:

```bash
npm run load-contracts
```
