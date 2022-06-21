import { Provider } from "@ethersproject/abstract-provider";
import { TokenInfo } from "@uniswap/token-lists";
export declare function getVotingTokenInfo(provider: Provider, chainId: number, tokenAddress: string): Promise<TokenInfo | undefined>;
