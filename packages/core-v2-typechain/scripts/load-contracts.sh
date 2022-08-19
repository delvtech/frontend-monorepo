#!/bin/bash
rm -rf elf-council

echo "Downloading contracts..."

if [[ -z "${GITHUB_TOKEN}" ]]; then
  git clone git@github.com:element-fi/protocol_v2.git protocol-v2
else
 git clone https://$GITHUB_TOKEN@github.com/element-fi/protocol_v2.git protocol-v2
fi

# blow away old-contracts
rm -rf src/contracts
mkdir src/contracts

echo "Copying latest contracts..."
cp -R protocol-v2/contracts src
rm -rf protocol-v2

echo "Done!"