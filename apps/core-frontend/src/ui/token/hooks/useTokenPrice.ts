import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { getCoinGeckoId } from "integrations/coingecko";
import {
  curveVirtualPriceContractsByAddress,
  isCurveStablePool,
} from "elf/curve/stablePools";
import { useCoinGeckoPrice } from "ui/coingecko/useCoinGeckoPrice";
import {
  useCrv3CryptoPrice,
  useSteCrvPrice,
  useTriCryptoPrice,
} from "ui/curve/pools";
import { useCurveStablecoinPoolVirtualPrice } from "ui/curve/stablePools";
import { AddressesJson } from "addresses/addresses";
import { isMainnet } from "base/ethereum/ethereum";
import { getTokenInfo } from "tokenlists/tokenlists";
import { QueryObserverResult } from "react-query";
import { Currency, Money } from "ts-money";
import { useBBAUSDPrice } from "ui/balancer/useBBAUSDPoolPrice";

const {
  chainId,
  addresses: {
    crvtricryptoAddress,
    crv3cryptoAddress,
    stecrvAddress,
    "bb-a-usdAddress": bbaUsdAddress,
  },
} = AddressesJson;

export function useTokenPrice<TContract extends ERC20>(
  contract: TContract,
  currency: Currency,
): QueryObserverResult<Money> {
  const { symbol: tokenSymbol, decimals } = getTokenInfo(contract.address);

  // Regular base assets
  const coinGeckoPriceResult = useCoinGeckoPrice(
    getCoinGeckoId(tokenSymbol), // query is disabled when this is undefined
    currency,
  );

  // Curve stable pools, eg: crvLUSD
  const isStablePool = isCurveStablePool(contract.address);
  const curveStablePoolContract =
    isMainnet(chainId) && isStablePool
      ? curveVirtualPriceContractsByAddress[contract.address]
      : undefined;
  const curveStablePoolPriceResult = useCurveStablecoinPoolVirtualPrice(
    // query is disabled when this is undefined
    curveStablePoolContract,
    decimals,
  );

  // Individual Curve non-stable pools, eg crvTricrypto or steCRV
  const isCrvTricrypto = contract.address === crvtricryptoAddress;
  const triCryptoPriceResult = useTriCryptoPrice({ enabled: isCrvTricrypto });
  const isCrv3crypto = contract.address === crv3cryptoAddress;
  const crv3CryptoPriceResult = useCrv3CryptoPrice({ enabled: isCrv3crypto });
  const isSteCrv = contract.address === stecrvAddress;
  const steCrvPriceResult = useSteCrvPrice({ enabled: isSteCrv });

  const isBbaUsd = contract.address === bbaUsdAddress;
  const bbaUSDPriceResult = useBBAUSDPrice({ enabled: isBbaUsd });

  // Because of the nature of hooks, we must return the correct token price here at the end.
  if (isBbaUsd) {
    return bbaUSDPriceResult;
  }

  if (isCurveStablePool(contract.address)) {
    return curveStablePoolPriceResult;
  }

  if (isCrv3crypto) {
    return crv3CryptoPriceResult;
  }

  if (isCrvTricrypto) {
    return triCryptoPriceResult;
  }

  if (isSteCrv) {
    return steCrvPriceResult;
  }

  return coinGeckoPriceResult;
}
