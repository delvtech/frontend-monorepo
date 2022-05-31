import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { PrincipalTokenInfo } from "@elementfi/core-tokenlist";
import { usePoolTokenPrices } from "ui/pools/hooks/usePoolTokenPrices/usePoolTokenPrices";
import { getPrincipalPoolContractForTranche } from "elf/pools/ccpool";
import { underlyingContractsByAddress } from "elf/underlying/underlying";

export function useMarketPrice(principalTokenInfo: PrincipalTokenInfo): string {
  const {
    address: principalTokenAddress,
    extensions: { underlying },
  } = principalTokenInfo;
  const poolContract = getPrincipalPoolContractForTranche(
    principalTokenAddress,
  );
  const underlyingPoolTokenContract = underlyingContractsByAddress[
    underlying
  ] as ERC20;

  // TODO: Use a hook that returns a string here instead
  const { spotPriceBaseAssetForOneToken: principalTokenMarketPrice } =
    usePoolTokenPrices(poolContract, underlyingPoolTokenContract);

  if (!principalTokenMarketPrice) {
    return "0";
  }

  return `${principalTokenMarketPrice}`;
}
