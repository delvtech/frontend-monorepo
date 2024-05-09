## Building for production

| Network          | Command                                              |
| ---------------- | ---------------------------------------------------- |
| Hardhat          | `yarn workspace core-frontend run build`             |
| Goerli           | `yarn workspace core-frontend run build:goerli-app`  |
| Ethereum Mainnet | `yarn workspace core-frontend run build:mainnet-app` |

### Running against a mainnet fork environment

It may be useful for some to develop against a mainnet fork environment and we
can use the frontend-testnet in this monorepo to do so.

##### Importing the developer address

The next step is to import the target testnet developer address into your Metamask wallet.

```bash
Address       0x70997970c51812dc3a010c7d01b50e0d17dc79c8
Private Key:  0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d # <- Import this
```

The purpose of doing this is so we can finance a wallet with a basket of ERC20 tokens required to interact with the system. **IMPORTANT! This address is a default hardhat address and as such should never be sent real mainnet funds as they will be stolen**.

##### Running the mainnet fork node

In the core-testnet directory, run:

```bash
yarn workspace core-frontend run start-mainnet:dev
```

##### Developing against the Mainnet fork environment

In a separate terminal, `cd` into this repo's directory and run:

```bash
yarn workspace core-frontend run start:dev-mainnet-fork-app
```

This will spin up the frontend as normal. It will be noticeably slower in initial instances as hardhat will have to first retrieve real state but will be cached in future instances. This will repeat itself when the target blocknumber is changed.

##### Metamask related issues

1. Sometimes metamask can be out of sync and will attempt to cache on the basis of blocknumber last seen. This is known as ["tagging"](https://ethereum.stackexchange.com/questions/109625/received-invalid-block-tag-87-latest-block-number-is-0) and will most likely occur when the node is restarted, resetting the blocknumber. This can be circumvented as instructed from the link and so it is advised to set your network to some other and back again to localhost
2. When submitting transactions, there may be a nonce issue which is also due to metamask caching. This can be annoying but can be manually edited with the correct one. Usually if a transaction is attempted there should be an error log in the console which should mention the correct one.
