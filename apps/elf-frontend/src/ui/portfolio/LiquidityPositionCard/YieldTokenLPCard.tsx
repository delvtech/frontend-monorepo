import {
  ButtonGroup,
  Callout,
  Card,
  Classes,
  Icon,
  Intent,
  Tag,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { WeightedPool } from "@elementfi/core-typechain/dist/v1";
import { YieldPoolTokenInfo, YieldTokenInfo } from "@elementfi/tokenlist";
import classNames from "classnames";
import tw from "efi-tailwindcss-classnames";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { findAssetIcon } from "ui/crypto/CryptoIcon";
import { GoToPoolButtonOld } from "ui/pools/GoToPoolButton/GoToPoolButtonOld";
import { usePoolTokens } from "ui/pools/hooks/usePoolTokens/usePoolTokens";
import { PoolAction } from "ui/pools/hooks/usePoolViewPoolActionsPref/usePoolViewPoolActionsPref";
import { useShareOfPool } from "ui/pools/hooks/useShareOfPool";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { convertEpochSecondsToDate } from "base/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { formatAbbreviatedDate } from "base/dates/dates";
import { formatPercent } from "base/formatPercent/formatPercent";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { formatYieldTokenShortSymbol } from "elf/interestToken/formatYieldTokenShortSymbol";
import { getPoolInfo } from "elf/pools/getPoolInfo";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { getTokenInfo } from "tokenlists/tokenlists";
import { getIsMature } from "elf/tranche/getIsMature";
import { BigNumber } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import zipObject from "lodash.zipobject";
import Link from "next/link";
import { ReactElement } from "react";
import { t } from "ttag";

interface YieldTokenLPCardProps {
  account: string | null | undefined;
  pool: WeightedPool;
}

const calloutClassName = tw(
  "flex",
  "flex-col",
  "flex-1",
  "h-full",
  "p-8",
  "items-center",
  "justify-center",
);

export function YieldTokenLPCard({
  account,
  pool,
}: YieldTokenLPCardProps): ReactElement {
  const { isDarkMode } = useDarkMode();
  const poolInfo = getPoolInfo(pool.address);

  // base asset
  const { baseAssetInfo } = getPoolTokens(poolInfo);
  const { decimals: baseAssetDecimals } = baseAssetInfo;
  const baseAssetCryptoAsset = getCryptoAssetForToken(baseAssetInfo.address);
  const baseAssetSymbol = getCryptoSymbol(baseAssetCryptoAsset);
  const BaseAssetIcon = findAssetIcon(baseAssetCryptoAsset);

  // yield asset
  const yieldTokenInfo = getYieldTokenForWeightedPool(pool.address);
  const {
    address: yieldTokenAddress,
    decimals: yieldTokenDecimals,
    extensions: { unlockTimestamp },
  } = yieldTokenInfo;

  const isRedeemable = getIsMature(unlockTimestamp);

  const unlockDate = convertEpochSecondsToDate(unlockTimestamp);
  const formattedDate = unlockDate
    ? formatAbbreviatedDate(unlockDate)
    : t`Loading unlock date...`;

  // pool shares
  const poolShares = useShareOfPool(pool, account);
  const poolSharesLabel = getPoolSharesLabel(poolShares);

  // liquidity
  const { data: [addresses, poolBalances] = [] } = usePoolTokens(pool);
  const baseAssetLiquidity = calculatePoolShareLiquidity(
    poolShares,
    addresses,
    poolBalances,
    baseAssetInfo.address,
    baseAssetDecimals,
  );
  const yieldTokenLiquidity = calculatePoolShareLiquidity(
    poolShares,
    addresses,
    poolBalances,
    yieldTokenAddress,
    yieldTokenDecimals,
  );

  const baseAssetLiquidityLabel = `${baseAssetLiquidity?.toFixed(4)}`;
  const yieldTokenLiquidityLabel = `${yieldTokenLiquidity?.toFixed(4)}`;

  const poolName = `${baseAssetSymbol} - ${baseAssetSymbol} Yield Token`;
  const yieldTokenShortSymbol = formatYieldTokenShortSymbol(yieldTokenInfo);
  const poolLabel = `(${baseAssetSymbol} - ${yieldTokenShortSymbol})`;

  return (
    <Card
      style={{ width: 512 }}
      className={classNames(
        tw("p-8", "flex", "flex-col", "m-4", "space-y-5", "text-base", {
          "text-gray-700": !isDarkMode,
          "text-white": isDarkMode,
        }),
      )}
    >
      <div>
        <div className={tw("flex", "space-x-4", "overflow-hidden")}>
          {BaseAssetIcon ? (
            <BaseAssetIcon
              className={tw("flex-shrink-0")}
              height={72}
              width={72}
            />
          ) : null}
          <div
            className={tw(
              "flex",
              "w-full",
              "flex-col",
              "space-y-2",
              "overflow-hidden",
            )}
          >
            <span
              className={tw("flex", "space-x-2", "text-2xl", "font-semibold")}
            >
              <Link href={`/pools/${pool?.address}`}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className={tw("truncate")}>{poolName}</a>
              </Link>
              <a
                className={tw("flex", "items-center")}
                onClick={(e) => e.stopPropagation()}
                href={`https://etherscan.io/address/${yieldTokenAddress}`}
                title={t`View LP token on etherscan`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon
                  intent={Intent.NONE}
                  className={tw("pr-2")}
                  icon={IconNames.SHARE}
                />
              </a>
            </span>
            <span className={classNames(Classes.TEXT_MUTED)}>{poolLabel}</span>
            <div className={tw("flex", "w-full", "items-center", "space-x-2")}>
              <Tag
                large
                intent={isRedeemable ? Intent.SUCCESS : Intent.PRIMARY}
                className={tw("justify-between")}
              >
                <span>{formattedDate}</span>
              </Tag>
              <span> {t`Yield token term`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className={tw("flex", "flex-col", "space-y-5", "items-center")}>
        <div className={tw("flex", "w-full", "space-x-5", "items-center")}>
          <Callout className={calloutClassName}>
            <span
              className={classNames(tw("mb-0"))}
            >{t`${baseAssetSymbol} liquidity`}</span>
            <span className={tw("text-lg", "font-semibold")}>
              {baseAssetLiquidityLabel}
            </span>
          </Callout>
          <Callout className={calloutClassName}>
            <span className={classNames(tw("mb-0"))}>{t`Yield liquidity`}</span>
            <span className={tw("text-lg", "font-semibold")}>
              {yieldTokenLiquidityLabel}
            </span>
          </Callout>
        </div>
        <Callout className={calloutClassName}>
          <span className={classNames(tw("mb-0"))}>{t`Share of pool`}</span>
          <LabeledText
            muted={false}
            className={tw("flex", "justify-center", "items-center")}
            bold
            textClassName={tw("text-2xl")}
            containerClassName={tw("justify-center")}
            text={poolSharesLabel}
            label={""}
          />
        </Callout>
      </div>

      {/* Quick Actions */}
      <ButtonGroup className={tw("space-x-6")}>
        <GoToPoolButtonOld
          fill
          poolAddress={poolInfo.address}
          poolAction={PoolAction.REMOVE_LIQUIDITY}
          label={t`Remove LP`}
        />
        <GoToPoolButtonOld
          fill
          poolAddress={poolInfo.address}
          poolAction={PoolAction.BUY}
          label={t`Go to Market`}
        />
      </ButtonGroup>
    </Card>
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
    const reservesNumber = +formatUnits(reserves, tokenDecimals);
    baseAssetLiquidity = poolShares * reservesNumber;
  }
  return baseAssetLiquidity;
}

function getPoolSharesLabel(poolShares: number | undefined) {
  if (!poolShares) {
    return formatPercent(0, 0);
  }
  if (poolShares === 1) {
    return formatPercent(poolShares, 0);
  }

  return formatPercent(poolShares, 2);
}

function getYieldTokenForWeightedPool(poolAddress: string): YieldTokenInfo {
  const {
    extensions: { interestToken: yieldTokenAddress },
  } = getTokenInfo<YieldPoolTokenInfo>(poolAddress);

  return getTokenInfo<YieldTokenInfo>(yieldTokenAddress);
}
