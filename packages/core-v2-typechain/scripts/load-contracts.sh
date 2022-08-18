#!/bin/bash
rm -rf elf-council

echo "Downloading contracts..."
echo "$($GITHUB_TOKEN)"
git clone https://$GITHUB_TOKEN@github.com/element-fi/protocol_v2.git protocol-v2

# blow away old-contracts
rm -rf src/contracts
mkdir src/contracts

echo "Copying latest contracts..."
cp -R protocol-v2/contracts src
rm -rf protocol-v2

echo "Done!"