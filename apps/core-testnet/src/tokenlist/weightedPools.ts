import { TokenInfo } from "@uniswap/token-lists";
import hre from "hardhat";
import zip from "lodash.zip";

import {
  TokenListTag,
  YieldPoolTokenInfo,
  YieldTokenInfo,
} from "src/tokenlist/types";
import { Vault, WeightedPoolFactory } from "src/types";
import { WeightedPool__factory } from "src/types/factories/WeightedPool__factory";
import { WeightedPool } from "src/types/WeightedPool";

export const provider = hre.ethers.provider;
export async function getYieldPoolTokenInfos(
  chainId: number,
  underlyingTokenInfos: TokenInfo[],
  yieldTokenInfos: YieldTokenInfo[],
  balancerVault: Vault,
  weightedPoolFactory: WeightedPoolFactory,
  safelist: string[],
): Promise<YieldPoolTokenInfo[]> {
  const filter = weightedPoolFactory.filters.PoolCreated(null);
  const events = await weightedPoolFactory.queryFilter(filter);
  const poolCreatedEvents = events.map((event) => {
    const [poolAddress] = event.args || [];
    const { blockNumber } = event;
    return { poolAddress, blockNumber };
  });

  const safePoolEvents = poolCreatedEvents.filter(({ poolAddress }) =>
    safelist.includes(poolAddress),
  );
  const safePoolAddresses = safePoolEvents.map(
    ({ poolAddress }) => poolAddress,
  );
  const safePools = safePoolAddresses.map((poolAddress) =>
    WeightedPool__factory.connect(poolAddress, provider),
  );

  const poolCreatedAts = await Promise.all(
    safePoolEvents.map(async ({ blockNumber }) => {
      const block = await provider.getBlock(blockNumber as number);
      return +block.timestamp;
    }),
  );

  const underlyingAddresses = underlyingTokenInfos.map(
    ({ address }) => address,
  );
  const poolIds = await Promise.all(safePools.map((pool) => pool.getPoolId()));
  const poolNames = await Promise.all(safePools.map((pool) => pool.name()));
  const poolUnderlyingAddresses = await Promise.all(
    zip(safePools, poolIds).map(async (zipped) => {
      const [pool, poolId] = zipped as [WeightedPool, string];
      const [tokenAddresses] = await balancerVault.getPoolTokens(poolId);
      return tokenAddresses.find((address) =>
        underlyingAddresses.includes(address),
      ) as string;
    }),
  );

  const yieldTokenAddresses = yieldTokenInfos.map(({ address }) => address);
  const interestTokenAddresses = await Promise.all(
    zip(safePools, poolIds).map(async (zipped) => {
      const [pool, poolId] = zipped as [WeightedPool, string];
      const [tokenAddresses] = await balancerVault.getPoolTokens(poolId);
      const interestToken = tokenAddresses.find((address) =>
        yieldTokenAddresses.includes(address),
      ) as string;
      return interestToken;
    }),
  );

  const unlockTimestamps = interestTokenAddresses.map((address) => {
    return yieldTokenInfos.find(
      ({ address: tokenInfoAddress }) => tokenInfoAddress === address,
    )?.extensions.unlockTimestamp;
  });

  const poolSymbols = await Promise.all(safePools.map((pool) => pool.symbol()));
  const poolDecimals = await Promise.all(
    safePools.map((pool) => pool.decimals()),
  );

  const weightedPoolTokensList: YieldPoolTokenInfo[] = zip<any>(
    safePoolAddresses,
    poolSymbols,
    poolNames,
    poolDecimals,
    poolIds,
    poolUnderlyingAddresses,
    interestTokenAddresses,
    poolCreatedAts,
    unlockTimestamps,
  ).map(
    ([
      address,
      symbol,
      name,
      decimal,
      poolId,
      underlying,
      interestToken,
      poolCreatedAt,
      unlockTimestamp,
    ]): YieldPoolTokenInfo => {
      return {
        chainId,
        address: address as string,
        symbol: symbol as string,
        decimals: decimal as number,
        extensions: {
          poolId: poolId as string,
          underlying: underlying as string,
          interestToken: interestToken as string,
          createdAtTimestamp: poolCreatedAt as number,
          expiration: unlockTimestamp as number,
        },
        name: name as string,
        tags: [TokenListTag.WPOOL],
        // TODO: What logo do we want to show for wpool tokens?
        // logoURI: ""
      };
    },
  );

  return weightedPoolTokensList;
}
