import { TokenInfo } from "@uniswap/token-lists";
import { ERC20__factory } from "@elementfi/core-v2-typechain";
import { Provider } from "@ethersproject/providers";

export async function getERC20Info(
  provider: Provider,
  chainId: number,
  address: string,
): Promise<TokenInfo> {
  const erc20 = ERC20__factory.connect(address, provider);
  return {
    address,
    chainId,
    decimals: await erc20.decimals(),
    name: await erc20.name(),
    symbol: await erc20.symbol(),
  };
}
