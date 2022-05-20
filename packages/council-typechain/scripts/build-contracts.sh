rm -rf artifacts types dist compiled

# Compile typechain to create contracts definitions and create factory
# instances. Hardhat typechain will not make factory definitions, so we'll
# compile the factory instances manually with tsc to create the defintions in
# the next step.
npx hardhat compile

# Compile the factory definition files, including any local factories. Also
# create the main index.d.ts definition file.
tsc --project tsconfig.json

mkdir -p dist/types

# Copy over contract definitions.
cp -R types/* dist/types

# Copy over compiled factory definitions.
cp -R compiled/types/* dist/types/
