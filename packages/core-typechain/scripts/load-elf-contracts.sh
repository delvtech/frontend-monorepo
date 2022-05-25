#!/bin/bash
rm -rf elf-contracts

echo "Downloading contracts..."
# link/clone and build contracts
if [ ! -z "$1" ] && [ $1="local" ]; then
    ln -sf ../../elf-contracts .
else
    git clone https://github.com/element-fi/elf-contracts
    cd elf-contracts/
    # load the balancer-v2 contracts which are gitignored in the elf-contracts repo
    npm run load-contracts
    cd ../
fi

echo "Done!"
