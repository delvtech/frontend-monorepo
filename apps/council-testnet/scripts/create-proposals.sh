# create 3 expired proposals, 1 failed 2 passing
npx hardhat createProposal --expired true
npx hardhat createProposal --expired true --ballot 0
npx hardhat createProposal --expired true --ballot 0

# create 2 active proposals, 1 passing, one pending
npx hardhat createProposal --ballot 0
npx hardhat createProposal