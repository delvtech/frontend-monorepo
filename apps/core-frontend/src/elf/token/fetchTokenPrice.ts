import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
// TODO Use better type definition for interacting stablePool contract
import { CRVLUSD } from "@elementfi/core-typechain/dist/libraries";

import { formatUnits } from "ethers/lib/utils";
import { Currencies, Currency, Money } from "ts-money";

import { fetchCoinGeckoPrice, getCoinGeckoId } from "integrations/coingecko";
import {
  crv3CryptoPoolContract,
  crvTriCryptoPoolContract,
  steCrvPoolContract,
} from "elf/curve/pools";
import {
  curveVirtualPriceContractsByAddress,
  isCurveStablePool,
} from "elf/curve/stablePools";
import { AddressesJson } from "addresses/addresses";
import { formatBalance } from "base/formatBalance/formatBalance";
import { isGoerli, NUM_ETH_DECIMALS, ONE_ETHER } from "base/ethereum/ethereum";
import { getTokenInfo } from "tokenlists/tokenlists";

const {
  addresses: { crvtricryptoAddress, stecrvAddress, crv3cryptoAddress },
} = AddressesJson;

export function fetchTokenPrice<TContract extends ERC20>(
  contract: TContract,
  currency: Currency,
): Promise<Money> {
  const { symbol: tokenSymbol, decimals } = getTokenInfo(contract.address);

  // Curve stable pools, eg: crvLUSD
  const isStablePool = isCurveStablePool(contract.address);

  // Individual Curve non-stable pools, eg crvTricrypto or steCRV
  const isCrvTricrypto = contract.address === crvtricryptoAddress;
  const isSteCrv = contract.address === stecrvAddress;
  const isCrv3crypto = contract.address === crv3cryptoAddress;

  if (isStablePool) {
    const curveStablePoolContract =
      curveVirtualPriceContractsByAddress[contract.address];
    const curveStablePoolPriceResult = fetchCurveStablecoinPoolVirtualPrice(
      curveStablePoolContract,
      decimals,
      currency,
    );
    return curveStablePoolPriceResult;
  }

  if (isCrvTricrypto) {
    const triCryptoPriceResult = fetchTriCryptoPrice(currency);
    return triCryptoPriceResult;
  }
  if (isCrv3crypto) {
    const crv3CryptoPriceResult = fetch3CryptoPrice(currency);
    return crv3CryptoPriceResult;
  }

  if (isSteCrv) {
    const steCrvPriceResult = fetchSteCrvPrice(currency);
    return steCrvPriceResult;
  }

  // Regular base assets
  const coinGeckoPricePromise = fetchCoinGeckoPrice(
    getCoinGeckoId(tokenSymbol) as string,
    currency,
  );

  return coinGeckoPricePromise;
}
// Goerli curve stable pools can be inferred to be $1
const GOERLI_STUB_VIRTUAL_PRICE = Money.fromDecimal(
  100,
  Currencies.USD,
  Math.round,
);

async function fetchCurveStablecoinPoolVirtualPrice(
  stablePoolContract: CRVLUSD,
  decimals: number,
  currency: Currency,
): Promise<Money> {
  if (isGoerli(AddressesJson.chainId)) {
    return GOERLI_STUB_VIRTUAL_PRICE;
  }

  const virtualPriceBigNumber = await stablePoolContract.get_virtual_price();
  const price = +formatBalance(virtualPriceBigNumber, decimals);
  return Money.fromDecimal(price, currency, Math.round);
}

const ETHER_INDEX_FOR_CRVTRICRYPTO = 0;
const GOERLI_STUB_PRICE = new Money(150000, Currencies.USD);

async function fetch3CryptoPrice(currency: Currency): Promise<Money> {
  if (isGoerli(AddressesJson.chainId)) {
    return GOERLI_STUB_PRICE;
  }

  // tricrypto is made up of usdt, eth, and wbtc so we get a price in usdt
  const usdtPrice = await fetchCoinGeckoPrice(
    getCoinGeckoId("usdt") as string,
    currency,
  );

  const crv3CryptoPriceInUSDT =
    await crv3CryptoPoolContract.calc_withdraw_one_coin(
      ONE_ETHER,
      ETHER_INDEX_FOR_CRVTRICRYPTO,
    );

  const price =
    +formatUnits(crv3CryptoPriceInUSDT, 6) / +(usdtPrice as Money).toString();
  return Money.fromDecimal(price, currency, Math.round);
}
async function fetchTriCryptoPrice(currency: Currency): Promise<Money> {
  if (isGoerli(AddressesJson.chainId)) {
    return GOERLI_STUB_PRICE;
  }

  // tricrypto is made up of usdt, eth, and wbtc so we get a price in usdt
  const usdtPrice = await fetchCoinGeckoPrice(
    getCoinGeckoId("usdt") as string,
    currency,
  );

  const triCryptoPriceInUSDT =
    await crvTriCryptoPoolContract.calc_withdraw_one_coin(
      ONE_ETHER,
      ETHER_INDEX_FOR_CRVTRICRYPTO,
    );

  const price =
    +formatUnits(triCryptoPriceInUSDT, 6) / +(usdtPrice as Money).toString();
  return Money.fromDecimal(price, currency, Math.round);
}

const ETHER_INDEX_FOR_STECRV = 0;
async function fetchSteCrvPrice(currency: Currency): Promise<Money> {
  if (isGoerli(AddressesJson.chainId)) {
    return GOERLI_STUB_PRICE;
  }
  // steCRV is made up of eth and stEth, so we get a price in eth
  const ethPrice = await fetchCoinGeckoPrice(
    getCoinGeckoId("eth") as string,
    currency,
  );

  const steCrvPriceInEth = await steCrvPoolContract.calc_withdraw_one_coin(
    ONE_ETHER,
    ETHER_INDEX_FOR_STECRV,
  );

  const price =
    +formatUnits(steCrvPriceInEth, NUM_ETH_DECIMALS) *
    +(ethPrice as Money).toString();
  return Money.fromDecimal(price, currency.code, Math.round);
}
