import { ReactElement } from "react";

import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import zipObject from "lodash.zipobject";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { useShareOfPool } from "ui/pools/hooks/useShareOfPool";
import { formatPercent } from "base/formatPercent/formatPercent";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { getPoolContract } from "elf/pools/getPoolContract";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { PoolInfo } from "elf/pools/PoolInfo";

interface PoolStakeStatsProps {
  account: string | null | undefined;
  poolInfo: PoolInfo;
}

const calloutClassName = tw(
  "flex",
  "flex-1",
  "flex-wrap",
  "space-y-2",
  "p-8",
  "w-full",
  "items-center",
  "justify-between",
);

export function PoolStakeStats(
  props: PoolStakeStatsProps,
): ReactElement | null {
  const { account, poolInfo } = props;
  const { baseAssetInfo, termAssetInfo } = getPoolTokens(poolInfo);
  const baseAsset = getCryptoAssetForToken(baseAssetInfo.address);
  const baseAssetSymbol = getCryptoSymbol(baseAsset);
  const pool = getPoolContract(poolInfo.address);

  const { data: [addresses, poolBalances] = [] } = usePoolTokens(pool);
  const { decimals: baseAssetDecimals } = baseAssetInfo;

  const shareOfPool = useShareOfPool(pool, account);
  const shareOfPoolLabel = getShareOfPoolLabel(shareOfPool);

  const baseAssetLiquidity = calculatePoolShareLiquidity(
    shareOfPool,
    addresses,
    poolBalances,
    baseAssetInfo.address,
    baseAssetDecimals,
  );

  const termAssetLiquidity = calculatePoolShareLiquidity(
    shareOfPool,
    addresses,
    poolBalances,
    termAssetInfo.address,
    termAssetInfo.decimals,
  );

  const baseAssetLiquidityLabel = baseAssetLiquidity
    ? `${baseAssetLiquidity?.toFixed(4)}`
    : "0.0000";

  const termAssetLiquidityLabel = termAssetLiquidity
    ? `${termAssetLiquidity?.toFixed(4)}`
    : "0.0000";
  return (
    <div className={calloutClassName}>
      <LabeledText
        muted={false}
        className={tw(
          "w-full",
          "flex",
          "flex-col",
          "justify-center",
          "items-center",
        )}
        bold
        textClassName={tw("text-2xl")}
        text={shareOfPoolLabel}
        label={t`Share of pool`}
      />
      <LabeledText
        muted={false}
        className={tw(
          "w-full",
          "flex",
          "flex-col",
          "justify-center",
          "items-center",
        )}
        bold
        textClassName={tw("text-2xl")}
        text={baseAssetLiquidityLabel}
        label={t`${baseAssetSymbol} liquidity`}
      />
      <LabeledText
        muted={false}
        className={tw(
          "w-full",
          "flex",
          "flex-col",
          "justify-center",
          "items-center",
        )}
        bold
        textClassName={tw("text-2xl")}
        text={termAssetLiquidityLabel}
        label={t`${termAssetInfo.symbol} liquidity`}
        labelClassName={tw("break-normal", "lg:truncate", "text-sm")}
      />
    </div>
  );
}

function calculatePoolShareLiquidity(
  poolShares: number | undefined,
  poolTokenAddresses: string[] | undefined,
  poolTokenReserves: BigNumber[] | undefined,
  tokenAddress: string | undefined,
  tokenDecimals: number | undefined,
): number | undefined {
  let baseAssetLiquidity: number | undefined;
  if (
    poolShares &&
    poolTokenAddresses &&
    poolTokenReserves &&
    tokenAddress &&
    tokenDecimals
  ) {
    const reservesByAddress = zipObject(poolTokenAddresses, poolTokenReserves);
    const reserves = reservesByAddress[tokenAddress];
    const reservesNumber = +formatUnits(reserves ?? 0, tokenDecimals);
    baseAssetLiquidity = poolShares * reservesNumber;
  }
  return baseAssetLiquidity;
}

function getShareOfPoolLabel(shareOfPool: number | undefined) {
  if (!shareOfPool) {
    return formatPercent(0, 0);
  }
  if (shareOfPool === 1) {
    return formatPercent(shareOfPool, 0);
  }

  return formatPercent(shareOfPool, 2);
}
