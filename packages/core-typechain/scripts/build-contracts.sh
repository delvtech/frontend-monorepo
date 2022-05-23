# rm -rf artifacts cache typechain-types
rm -rf typechain-types

# Compile typechain to convert contracts (.sol files) into .ts files.  Hardhat
# typechain will not make typescript definitions (*.d.ts), so we compile those
# manually with tsc in a different script. (see: build-typescript.sh)
export SOURCE_CONTRACTS_PATH="src/libraries"
export TYPECHAIN_OUTDIR="typechain-types/libraries"
npx hardhat clean
npx hardhat compile --show-stack-traces --force

# Because we are compiling the contracts for each version separately, we must
# remove the artifacts and compiled files after each build, since hardhat caches
# artifacts.
# rm -rf cached

export SOURCE_CONTRACTS_PATH="src/v1"
export TYPECHAIN_OUTDIR="typechain-types/v1"
npx hardhat clean
npx hardhat compile --show-stack-traces --force

# Because we are compiling the contracts for each version separately, we must
# remove the artifacts and compiled files after each build, since hardhat caches
# artifacts.
# rm -rf cached

export SOURCE_CONTRACTS_PATH="src/v1.1"
export TYPECHAIN_OUTDIR="typechain-types/v1.1"
npx hardhat clean
npx hardhat compile --show-stack-traces --force