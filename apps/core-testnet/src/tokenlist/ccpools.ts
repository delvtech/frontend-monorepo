import { TokenInfo } from "@uniswap/token-lists";
import hre from "hardhat";
import zip from "lodash.zip";
import { PrincipalPoolTokenInfo, TokenListTag } from "src/tokenlist/types";
import { ConvergentCurvePool, ConvergentPoolFactory } from "src/types";

import { ConvergentCurvePool__factory } from "src/types/factories/ConvergentCurvePool__factory";
import { ConvergentPoolFactory__factory } from "src/types/factories/ConvergentPoolFactory__factory";

export const provider = hre.ethers.provider;
export async function getPrincipalPoolTokenInfos(
  chainId: number,
  ccPoolFactory: ConvergentPoolFactory,
  safelist: string[],
): Promise<PrincipalPoolTokenInfo[]> {
  const filter = ccPoolFactory.filters.CCPoolCreated(null, null);
  const events = await ccPoolFactory.queryFilter(filter);
  const poolCreatedEvents = events.map((event) => {
    const [poolAddress, bondTokenAddress] = event.args || [];
    const { blockNumber } = event;
    return { poolAddress, bondTokenAddress, blockNumber };
  });

  const safePoolEvents = poolCreatedEvents.filter(({ poolAddress }) =>
    safelist.includes(poolAddress),
  );
  const safePoolAddresses = safePoolEvents.map(
    ({ poolAddress }) => poolAddress,
  );
  const safePools = safePoolAddresses.map((poolAddress) =>
    ConvergentCurvePool__factory.connect(poolAddress, provider),
  );

  const poolBondAddresses = safePoolEvents.map(
    ({ bondTokenAddress }) => bondTokenAddress,
  );

  const poolCreatedAts = await Promise.all(
    safePoolEvents.map(async ({ blockNumber }) => {
      const block = await provider.getBlock(blockNumber as number);
      return +block.timestamp;
    }),
  );

  const poolIds = await Promise.all(safePools.map((pool) => pool.getPoolId()));
  const poolUnderlyingAddresses = await Promise.all(
    safePools.map((pool) => pool.underlying()),
  );
  const poolNames = await Promise.all(safePools.map((pool) => pool.name()));
  const poolSymbols = await Promise.all(safePools.map((pool) => pool.symbol()));
  const poolDecimals = await Promise.all(
    safePools.map((pool) => pool.decimals()),
  );
  const poolUnitSeconds = await Promise.all(
    safePools.map((pool) => pool.unitSeconds()),
  );
  const poolExpirations = await Promise.all(
    safePools.map((pool) => pool.expiration()),
  );

  const ccPoolTokensList: PrincipalPoolTokenInfo[] = zip<any>(
    safePoolAddresses,
    poolSymbols,
    poolNames,
    poolDecimals,
    poolBondAddresses,
    poolUnderlyingAddresses,
    poolIds,
    poolUnitSeconds,
    poolExpirations,
    poolCreatedAts,
  ).map(
    ([
      address,
      symbol,
      name,
      decimal,
      bondAddress,
      underlyingAddress,
      poolId,
      unitSeconds,
      expiration,
      poolCreatedAt,
    ]): PrincipalPoolTokenInfo => {
      return {
        chainId,
        address: address as string,
        symbol: symbol as string,
        decimals: decimal as number,
        extensions: {
          bond: bondAddress as string,
          underlying: underlyingAddress as string,
          poolId: poolId as string,
          unitSeconds: unitSeconds.toNumber() as number,
          expiration: expiration.toNumber() as number,
          createdAtTimestamp: poolCreatedAt as number,
        },
        name: name as string,
        tags: [TokenListTag.CCPOOL],
        // TODO: What logo do we want to show for ccpool tokens?
        // logoURI: ""
      };
    },
  );

  return ccPoolTokensList;
}
