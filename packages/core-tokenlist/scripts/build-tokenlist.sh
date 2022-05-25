NETWORK="$1"

mkdir -p dist

# Pull down the latest addresses from elf-deploy
curl -H 'Cache-Control: no-cache' https://raw.githubusercontent.com/element-fi/elf-deploy/main/addresses/frontend-$NETWORK.addresses.json > src/addresses/$NETWORK.addresses.json
curl -H 'Cache-Control: no-cache' https://raw.githubusercontent.com/element-fi/elf-deploy/main/addresses/AddressesJsonFile.d.ts > src/addresses/AddressesJsonFile.d.ts

# Build the specified tokenlist.json file
npx hardhat run src/main.ts --network $NETWORK --no-compile

# compile index.ts template
