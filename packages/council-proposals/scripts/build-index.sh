TESTNET_PROPOSALS_JSON=`cat src/proposals/testnet.proposals.json`
TESTNET_GSC_PROPOSALS_JSON=`cat src/proposals/testnet-gsc.proposals.json`
GOERLI_PROPOSALS_JSON=`cat src/proposals/goerli.proposals.json`
GOERLI_GSC_PROPOSALS_JSON=`cat src/proposals/goerli-gsc.proposals.json`
MAINNET_PROPOSALS_JSON=`cat src/proposals/mainnet.proposals.json`
MAINNET_GSC_PROPOSALS_JSON=`cat src/proposals/mainnet-gsc.proposals.json`

echo "
/**
 * 🚨🚨🚨 THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY. 🚨🚨🚨
 * 🚨🚨🚨 THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY. 🚨🚨🚨
 * 🚨🚨🚨 THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY. 🚨🚨🚨
 *
 * This is the index.ts file that will be compiled to JS and set as the 'main'
 * property in package.json. This makes it possible to use elf-council-proposals
 * as a normal package, ie: import { mainnetProposals } from 'elf-council-proposals'
 *
 * See scripts/build-index.sh for details.
 *
 * 🚨🚨🚨 THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY. 🚨🚨🚨
 * 🚨🚨🚨 THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY. 🚨🚨🚨
 * 🚨🚨🚨 THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY. 🚨🚨🚨
 */

import { ProposalsJson } from './types';

export const testnetProposals: ProposalsJson = $TESTNET_PROPOSALS_JSON;
export const testnetGscProposals: ProposalsJson = $TESTNET_GSC_PROPOSALS_JSON;
export const goerliProposals: ProposalsJson = $GOERLI_PROPOSALS_JSON;
export const goerliGscProposals: ProposalsJson = $GOERLI_GSC_PROPOSALS_JSON;
export const mainnetProposals: ProposalsJson = $MAINNET_PROPOSALS_JSON;
export const mainnetGscProposals: ProposalsJson = $MAINNET_GSC_PROPOSALS_JSON;
" > src/index.ts

tsc --project tsconfig.json