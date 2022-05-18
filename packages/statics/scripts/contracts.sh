#!/usr/bin/env bash

rm -rf contracts
git clone https://github.com/element-fi/elf-contracts.git contracts-tmp
cd contracts-tmp
yarn load-contracts
mv contracts ..
cd ../contracts
cd ..
rm -rf contracts-tmp
