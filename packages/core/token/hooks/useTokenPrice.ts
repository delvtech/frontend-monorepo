import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { isMainnet } from "@elementfi/base";
import { AddressesJson } from "@elementfi/core/addresses/addresses";
import {
  useCrv3CryptoPrice,
  useSteCrvPrice,
  useTriCryptoPrice,
} from "@elementfi/core/integrations/curve/hooks/pools";
import { useCurveStablecoinPoolVirtualPrice } from "@elementfi/core/integrations/curve/hooks/stablePools";
import {
  curveVirtualPriceContractsByAddress,
  isCurveStablePool,
} from "@elementfi/core/integrations/curve/stablePools";
import { getTokenInfo } from "@elementfi/core/tokenlists/tokenlists";
import { getCoinGeckoId } from "@elementfi/integrations/coingecko";
import { useCoinGeckoPrice } from "@elementfi/integrations/coingecko/hooks/useCoinGeckoPrice";
import { QueryObserverResult } from "react-query";
import { Currency, Money } from "ts-money";

const {
  chainId,
  addresses: { crvtricryptoAddress, crv3cryptoAddress, stecrvAddress },
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

  // Because of the nature of hooks, we must return the correct token price here at the end.
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
