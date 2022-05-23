#!/bin/bash
rm -rf elf-contracts

echo "Downloading contracts..."
# link/clone and build contracts
if [ ! -z "$1" ] && [ $1="local" ]; then
    ln -sf ../../elf-contracts .
else
    git clone git@github.com:element-fi/elf-contracts.git && cd-elf-contracts && npm ci && npm run load-contracts
fi

# blow away old-contracts
rm -rf src/contracts
mkdir src/contracts

# TODO: copy the contracts to the src folder so hardhat will pick up on them.
# A coupl of things are out of sync so I need to get those fixed first.  I made WETH and USDC
# contracts and I think elf-contracts is using AToken.  I also added all the balancer V1 stuff and
# now elf-contracts has balancer V2 stuff in it.  I need to wait for some PRs to land in
# elf-contracts before I can sync up.

echo "Copying latest contracts..."
cp -R elf-contracts/contracts src

echo "Done!"