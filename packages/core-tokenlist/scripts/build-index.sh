MAINNET_TOKENLIST=`cat dist/mainnet.tokenlist.json`
GOERLI_TOKENLIST=`cat dist/goerli.tokenlist.json`

echo "
/** 
 * 🚨🚨🚨 THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY. 🚨🚨🚨
 * 🚨🚨🚨 THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY. 🚨🚨🚨
 * 🚨🚨🚨 THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY. 🚨🚨🚨
 *
 * This is the index.ts file that will be compiled to JS and set as the 'main'
 * property in package.json. This makes it possible to use elf-tokenlist as a
 * normal package, ie: import { mainnetTokenList } from 'elf-tokenlist'
 *
 * See scripts/build-index.sh for details.
 *
 * 🚨🚨🚨 THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY. 🚨🚨🚨
 * 🚨🚨🚨 THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY. 🚨🚨🚨
 * 🚨🚨🚨 THIS FILE IS AUTO-GENERATED. DO NOT EDIT MANUALLY. 🚨🚨🚨
 */

import { TokenList } from '@uniswap/token-lists/src';

export * from './tags';
export * from './types';

export const mainnetTokenList: TokenList = $MAINNET_TOKENLIST;
export const goerliTokenList: TokenList = $GOERLI_TOKENLIST;
" > src/index.ts

tsc --project tsconfig.json
