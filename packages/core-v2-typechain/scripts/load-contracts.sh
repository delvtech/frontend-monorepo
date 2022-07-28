#!/bin/bash
rm -rf elf-council

echo "Downloading contracts..."
git clone git@github.com:element-fi/protocol_v2.git protocol-v2

# blow away old-contracts
rm -rf src/contracts
mkdir src/contracts

echo "Copying latest contracts..."
cp -R protocol-v2/contracts src
rm -rf protocol-v2

echo "Done!"