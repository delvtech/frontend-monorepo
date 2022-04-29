## Building for production

| Network          | Command                     |
| ---------------- | --------------------------- |
| Hardhat          | `npm run build`             |
| Goerli           | `npm run build:goerli-app`  |
| Ethereum Mainnet | `npm run build:mainnet-app` |

## Developer Setup

First install the dependencies. Open the directory in your terminal and run:

```bash
npm ci
```

> **note:** Running `npm ci` instead of just `npm i` or `npm install` will ensure that the package-lock.json isn't modified if you're using a different version of npm. See the [npm-ci docs](https://docs.npmjs.com/cli/v8/commands/npm-ci) for more info.

To start the app in development mode:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The development server has some perks for developing like hot-code reloading, error reporting, and more, but it will pre-render each page on each request. This can cause some parts of the app to run a little slow. To start the app in production mode, run:

```
npm run build
npm start
```

### Adding a new base asset

1. Run `npm run update-elf-tokenlist`.
1. Add a logo svg to `src/static/svg/` directory.
1. Update `src/addresses/AddressesJsonFile.d.ts`

### Running against a mainnet fork environment

It may be useful for some to develop against a mainnet fork environment and we can use [elf-frontend-testnet](https://github.com/element-fi/elf-frontend-testnet) to do so. In a separate directory, clone the elf-frontend-testnet repository and install the dependencies as outlined.

##### Importing the developer address

The next step is to import the target testnet developer address into your Metamask wallet.

```bash
Address       0x70997970c51812dc3a010c7d01b50e0d17dc79c8
Private Key:  0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d # <- Import this
```

The purpose of doing this is so we can finance a wallet with a basket of ERC20 tokens required to interact with the system. **IMPORTANT! This address is a default hardhat address and as such should never be sent real mainnet funds as they will be stolen**.

##### Running the mainnet fork node

In the elf-frontend-testnet directory, run:

```bash
npm run start-mainnet:dev
```

##### Developing against the Mainnet fork environment

In a separate terminal, `cd` into this repo's directory and run:

```bash
npm run start:dev-mainnet-fork-app
```

This will spin up the frontend as normal. It will be noticeably slower in initial instances as hardhat will have to first retrieve real state but will be cached in future instances. This will repeat itself when the target blocknumber is changed.

##### Metamask related issues

1. Sometimes metamask can be out of sync and will attempt to cache on the basis of blocknumber last seen. This is known as ["tagging"](https://ethereum.stackexchange.com/questions/109625/received-invalid-block-tag-87-latest-block-number-is-0) and will most likely occur when the node is restarted, resetting the blocknumber. This can be circumvented as instructed from the link and so it is advised to set your network to some other and back again to localhost
2. When submitting transactions, there may be a nonce issue which is also due to metamask caching. This can be annoying but can be manually edited with the correct one. Usually if a transaction is attempted there should be an error log in the console which should mention the correct one.

## Deployment

This app is deployed to 3 different projects in [Vercel](https://vercel.com/element-finance).

### 1. [elf-frontend-staging](https://vercel.com/element-finance/elf-frontend-staging)

This is a password protected app accessible at [staging.element.fi][staging-app-url]. It uses `main` as its production branch and will create a new [preview deployment](https://vercel.com/docs/concepts/deployments/environments#preview) each time there's a push to _any_ branch or a deployment is made using the [`vercel` command](https://vercel.com/docs/concepts/deployments/overview#vercel-cli).

Once a branch has been merged into `main`, it will be deployed to [staging.element.fi][staging-app-url].

### 2. [elf-frontend-testnet](https://vercel.com/element-finance/elf-frontend-testnet)

This is the Goerli app accessible at [testnet.element.fi][testnet-app-url] and uses `testnet` as its production branch.

After merging a branch into `main`, merge `main` into `testnet` to deploy to [testnet.element.fi][testnet-app-url].

### 3. [elf-frontend](https://vercel.com/element-finance/elf-frontend)

This is the main app accessible at [app.element.fi][mainnet-app-url] and uses `mainnet` as its production branch.

After merging a branch into `main`, merge `main` into `mainnet` to deploy to [app.element.fi][mainnet-app-url].

[staging-app-url]: https://staging.element.fi
[testnet-app-url]: https://testnet.element.fi
[mainnet-app-url]: https://app.element.fi
