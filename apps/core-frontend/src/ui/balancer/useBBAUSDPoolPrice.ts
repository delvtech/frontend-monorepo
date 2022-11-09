import {
  StablePool,
  StablePool__factory,
} from "@elementfi/core-typechain/dist/v1.1";
import { AddressesJson } from "addresses/addresses";
import { balancerVaultContract } from "elf/balancer/vault";
import { defaultProvider } from "elf/providers/providers";
import { BigNumber, Contract } from "ethers";
import { formatEther } from "ethers/lib/utils";
import ComposableStablePoolABI from "integrations/balancer/abis/ComposableStablePool.json";
import zip from "lodash.zip";
import { QueryObserverResult, useQuery } from "react-query";
import { Money } from "ts-money";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";

const {
  addresses: { "bb-a-usdAddress": bbaUsdAddress },
} = AddressesJson;

// THIS IS THE POOL ITSELF
const bbaUSDContract = new Contract(
  bbaUsdAddress,
  ComposableStablePoolABI,
  defaultProvider,
);
// The pool has an id that will never change
const BB_A_USD_POOL_ID =
  "0xa13a9247ea42d743238089903570127dda72fe4400000000000000000000035d";

// One of the tokens in the pool, this could be found by calling
// Vault.getPoolTokens(bbaUSDContract.address), but since it will never change
// we can just hardcode it
const BB_A_USDT_ADDRESS = "0x2F4eb100552ef93840d5aDC30560E5513DFfFACb";
const bbaUSDTContract = StablePool__factory.connect(
  BB_A_USDT_ADDRESS,
  defaultProvider,
);

// Another one of the tokens in the pool, this could be found by calling
// Vault.getPoolTokens(bbaUSDContract.address), but since it will never change
// we can just hardcode it
const BB_A_USDC_ADDRESS = "0x82698aeCc9E28e9Bb27608Bd52cF57f704BD1B83";
const bbaUSDCContract = StablePool__factory.connect(
  BB_A_USDC_ADDRESS,
  defaultProvider,
);

// Another one of the tokens in the pool, this could be found by calling
// Vault.getPoolTokens(bbaUSDContract.address), but since it will never change
// we can just hardcode it
const BB_A_DAI_ADDRESS = "0xae37D54Ae477268B9997d4161B96b8200755935c";
const bbaDaiContract = StablePool__factory.connect(
  BB_A_DAI_ADDRESS,
  defaultProvider,
);

export function useBBAUSDPrice({
  enabled,
}: {
  enabled: boolean;
}): QueryObserverResult<Money> {
  const { currency } = useCurrencyPref();

  // first get the balances for each token in the pool
  const { data: [addresses = [], balances = []] = [] } =
    useSmartContractReadCall(balancerVaultContract, "getPoolTokens", {
      callArgs: [BB_A_USD_POOL_ID],
    });

  // remove the pool's lp token itself from the list of pool tokens, and add in it's contract
  const zippedPoolTokens = zip(addresses, balances).filter(
    ([address, balance]) => address !== bbaUSDContract.address,
  );

  return useQuery({
    queryKey: ["tvl-of-bb-a-usd-pool", balances],
    queryFn: async () => {
      // request the token's rate, and multiply it by it's reserve balance
      const balanceRateProducts = await Promise.all(
        zippedPoolTokens.map(async ([address, balance]) => {
          const contract = getContractForAddress(address as string);
          const tokenRate = (await contract.getRate()) as BigNumber;
          // TODO: also multiply this by the actual price of usdc, usdt, or dai
          // respectively, but realistically this is going to change things by
          // like .001 cent, so it's not really worth it.
          const product =
            +formatEther(tokenRate) * +formatEther(balance as BigNumber);
          return product;
        }),
      );

      // This is exactly what reduce is for, arithmetic on values where the
      // return type is the same as the inputs
      const tvl = balanceRateProducts.reduce(
        (sum, currentProduct) => sum + currentProduct,
        0,
      );

      const totalSupply = (await bbaUSDContract.getActualSupply()) as BigNumber;

      const priceNumber = tvl / +formatEther(totalSupply);
      const price = Money.fromDecimal(priceNumber, currency.code, Math.round);

      return price;
    },
    enabled,
  });
}

function getContractForAddress(address: string): Contract {
  if (address === BB_A_DAI_ADDRESS) {
    return bbaDaiContract;
  }
  if (address === BB_A_USDC_ADDRESS) {
    return bbaUSDCContract;
  }
  if (address === BB_A_USDT_ADDRESS) {
    return bbaUSDTContract;
  }
  // this will never happen
  return bbaUSDTContract;
}
