# core-v2-testnet

This project is a local testnet used for rapid development and iteration.

## Getting started

Install dependencies

```shell
yarn install
```

Start hardhat network

```shell
yarn workspace core-v2-testnet start
```

In another terminal deploy the mock protocol to the local network

```shell
yarn workspace core-v2-testnet mock
```

## Rewind

We included a useful script for reverting the local network by N blocks. This is useful for testing flows without having to restart and redeploy any contracts.
While the local network is running

```shell
yarn workspace core-v2-testnet rewind
```
