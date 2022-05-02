# create 2 expired proposals, 1 failed 1 passing
npx hardhat createGscProposal --expired true
npx hardhat createGscProposal --expired true --ballot 0

# create 1 active proposals, pending
npx hardhat createGscProposal