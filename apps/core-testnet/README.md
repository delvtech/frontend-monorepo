# ELF Deploy

The purpose of this repo is automate the setup of a local testnet to run the elf-contracts.

## How to run

###

our code requires npm version 14.11.0. Please update to this version before trying to run the
testnet.

### Get the contracts

```bash
$ npm run load-contracts
```

#### Compile the contracts

```bash
$ npm run build
```

### Run the hardhat local testnet

Install npm packages

```bash
$ npm ci
```

### Run the Hardhat Runtime Environment

```bash
$ npm start
```

(This makes a local testnet at http://localhost:8545/ and chain id 31337)

### Deploy the contracts

```bash
$ npm run deploy-contracts
```

Now all the contracts are loaded to the local testnet!

You'll need to grab the private key associated with the userAddres in addresses.json.
It should be the 2nd key created by hardhat, which is printed to the screen after you
run `npx hardhat node`.
