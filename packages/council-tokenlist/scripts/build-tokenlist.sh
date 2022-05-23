NETWORK="$1"

# Build the specified tokenlist.json file
npx hardhat build-tokenlist --chain $NETWORK --network $NETWORK
