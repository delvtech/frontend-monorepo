import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { usePoolSpotPrice } from "ui/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";
import { PoolContract } from "elf/pools/PoolContract";

interface PoolTokenPrices {
  spotPriceBaseAssetForOneToken: number | undefined;
  spotPriceTokenForOneBaseAsset: number | undefined;
}
export function usePoolTokenPrices(
  pool: PoolContract,
  baseAssetToken: ERC20,
): PoolTokenPrices {
  // spot price will be zero while we wait for it to load, maybe change this
  // behavior in usePoolSpotPrice to return undefined instead?
  const spotPriceTokenForOneBaseAsset = usePoolSpotPrice(
    pool,
    baseAssetToken.address,
  );
  if (!spotPriceTokenForOneBaseAsset) {
    return {
      spotPriceBaseAssetForOneToken: undefined,
      spotPriceTokenForOneBaseAsset: undefined,
    };
  }

  const spotPriceBaseAssetForOneToken = 1 / spotPriceTokenForOneBaseAsset;

  return {
    spotPriceBaseAssetForOneToken,
    spotPriceTokenForOneBaseAsset,
  };
}
