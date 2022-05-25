import { ReactElement, useMemo } from "react";

import {
  ButtonGroup,
  Callout,
  Card,
  Icon,
  Intent,
  Tag,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Web3Provider } from "@ethersproject/providers";
import Link from "next/link";
import classNames from "classnames";
import { PrincipalTokenInfo } from "@elementfi/core-tokenlist";
import { jt, t } from "ttag";

import { getCoinGeckoId } from "integrations/coingecko";
import tw from "efi-tailwindcss-classnames";
import { useNowMs } from "ui/base/hooks/useNowMs/useNowMs";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { useCoinGeckoPrice } from "ui/coingecko/useCoinGeckoPrice";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { findAssetIcon } from "ui/crypto/CryptoIcon";
import { GoToPoolButtonTag } from "ui/pools/GoToPoolButton/GoToPoolButtonTag";
import { usePoolSpotPrice } from "ui/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";
import { PoolAction } from "ui/pools/hooks/usePoolViewPoolActionsPref/usePoolViewPoolActionsPref";
import { RedeemPrincipalTokensButtonTag } from "ui/portfolio/RedeemButton/RedeemPrincipalTokensButtonTag";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { useTokenBalanceUNSAFE } from "ui/token/hooks/useTokenBalance";
import { calculateProgress } from "base/calculateProgress/calculateProgress";
import { convertEpochSecondsToDate } from "base/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { formatAbbreviatedDate } from "base/dates/dates";
import { formatPercent } from "base/formatPercent/formatPercent";
import { ERC20Shim } from "elf/contracts/ERC20Shim";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import { getCryptoSymbol } from "elf/crypto/getCryptoSymbol";
import { formatMoney } from "elf/money/formatMoney";
import { getPoolInfoForPrincipalToken } from "elf/pools/ccpool";
import { getPoolContract } from "elf/pools/getPoolContract";
import { calculateTrancheAPY } from "elf/tranche/calculateTrancheAPY";
import { formatPrincipalTokenShortSymbol } from "elf/tranche/format";
import {
  getVaultContractForTranche,
  trancheContractsByAddress,
} from "elf/tranche/tranches";

import { MaturityTimeBar } from "./MaturityTimeBar";

interface PrincipalTokenCardProps {
  chainId: number | undefined;
  library: Web3Provider | undefined;
  account: string | null | undefined;
  principalTokenInfo: PrincipalTokenInfo;
}

const calloutClassName = tw(
  "flex",
  "flex-col",
  "flex-1",
  "h-full",
  "p-4",
  "items-center",
  "justify-center",
);

export function PrincipalTokenCard(
  props: PrincipalTokenCardProps,
): ReactElement {
  const {
    library,
    account,
    principalTokenInfo,
    principalTokenInfo: {
      address: principalTokenAddress,
      extensions: {
        createdAtTimestamp: trancheCreatedAt,
        unlockTimestamp,
        underlying: underlyingAddress,
      },
    },
  } = props;
  const { isDarkMode } = useDarkMode();
  const nowMs = useNowMs();

  const poolInfo = getPoolInfoForPrincipalToken(principalTokenAddress);
  const baseAsset = getCryptoAssetForToken(underlyingAddress);

  const unlockDate = convertEpochSecondsToDate(unlockTimestamp);
  const createdAtDate = convertEpochSecondsToDate(trancheCreatedAt);
  const progress = calculateProgress(createdAtDate, unlockDate);

  const formattedDate = unlockDate
    ? formatAbbreviatedDate(unlockDate)
    : t`Loading unlock date...`;

  const tranche = trancheContractsByAddress[principalTokenAddress];
  const trancheBalance = useTokenBalanceUNSAFE(
    tranche as unknown as ERC20Shim,
    account,
  );

  const vaultContract = getVaultContractForTranche(principalTokenAddress);
  const { data: vaultName } = useSmartContractReadCall(vaultContract, "name");
  const pool = getPoolContract(poolInfo.address);

  const baseAssetSymbol = getCryptoSymbol(baseAsset);

  const tranchePriceInBaseAsset =
    usePoolSpotPrice(pool, principalTokenAddress) ?? 0;
  const exitValue = trancheBalance * tranchePriceInBaseAsset;
  const { data: baseAssetCoinGeckoPrice } = useCoinGeckoPrice(
    getCoinGeckoId(baseAssetSymbol),
  );

  let fiatPrice;
  if (tranchePriceInBaseAsset && baseAssetCoinGeckoPrice) {
    fiatPrice = formatMoney(baseAssetCoinGeckoPrice.multiply(exitValue));
  }

  const BaseAssetIcon = findAssetIcon(baseAsset);

  const tableRowLink = getTableRowLink(vaultContract?.address, vaultName);
  const maturationDate = useMemo(
    () => convertEpochSecondsToDate(unlockTimestamp),
    [unlockTimestamp],
  );

  let trancheAPY = 0;
  if (maturationDate) {
    trancheAPY = calculateTrancheAPY(
      tranchePriceInBaseAsset,
      nowMs,
      maturationDate?.getTime(),
    );
  }

  const principalTokenShortSymbol =
    formatPrincipalTokenShortSymbol(principalTokenInfo);

  return (
    <Card
      className={classNames(
        tw("p-6", "flex", "flex-col", "m-4", "space-y-5", "max-w-sm", {
          "text-gray-700": !isDarkMode,
          "text-white": isDarkMode,
        }),
      )}
    >
      <div className={tw("flex", "space-x-3", "items-start")}>
        <BaseAssetIcon className={tw("flex-shrink-0")} height={48} width={48} />
        <div className={tw("flex", "flex-col", "space-y-1")}>
          <div className={tw("flex", "text-base", "font-semibold")}>
            <Link href={`/pools/${pool?.address}`}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a style={{ fontFamily: "var(--rubik-font)" }}>
                {t`${baseAssetSymbol} Principal Token` || null}
              </a>
            </Link>
          </div>
          <div
            className={tw(
              "flex",
              "w-full",
              "items-center",
              "justify-center",
              "space-x-8",
            )}
          >
            <Tag
              large
              intent={
                unlockTimestamp * 1000 < nowMs ? Intent.SUCCESS : Intent.PRIMARY
              }
              className={tw("text-center", "text-sm")}
            >
              {formattedDate}
            </Tag>
            <div
              className={tw(
                "flex",
                "flex-shrink-0",
                "space-x-6",
                "justify-end",
              )}
            >
              <LabeledText
                bold
                text={`${formatPercent(trancheAPY)}`}
                label={t`Fixed APR`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={tw("flex", "flex-col", "space-y-5", "items-center")}>
        <MaturityTimeBar
          progress={progress}
          unlockTimestamp={unlockTimestamp}
        />

        <Callout className={calloutClassName}>
          <span className={classNames(tw("mb-0"))}>{t`Total balance`}</span>
          <LabeledText
            muted={false}
            className={tw("flex", "justify-center", "items-center")}
            containerClassName={tw("justify-center")}
            bold
            text={`${trancheBalance.toFixed(6)} ${principalTokenShortSymbol}`}
            label={""}
          />
        </Callout>
        <Callout icon={null} className={calloutClassName}>
          <span className={classNames(tw("mb-0"))}>{t`Current value`}</span>
          <LabeledText
            bold
            muted={false}
            className={tw("flex", "justify-center", "items-center")}
            containerClassName={tw("justify-center")}
            text={<span>{t`${exitValue.toFixed(6)} ${baseAssetSymbol}`}</span>}
            label={fiatPrice}
          />
        </Callout>
      </div>
      <div className={tw("flex")}>
        <span>
          {jt`Fixed yield is backed by ${baseAssetSymbol} deposited in ${tableRowLink}`}
        </span>
      </div>

      {/* Quick Actions */}
      <ButtonGroup vertical fill className={tw("space-y-3")}>
        <RedeemPrincipalTokensButtonTag
          library={library}
          account={account}
          principalTokenInfo={principalTokenInfo}
          baseAsset={baseAsset}
        />
        <GoToPoolButtonTag
          poolAddress={poolInfo.address}
          poolAction={PoolAction.ADD_LIQUIDITY}
          className={tw("text-base")}
          label={t`Add Liquidity`}
        />
        <GoToPoolButtonTag
          poolAddress={poolInfo.address}
          className={tw("text-base")}
          poolAction={PoolAction.SELL}
          label={t`Sell`}
        />
      </ButtonGroup>
    </Card>
  );
}

function getTableRowLink(
  vaultAddress: string | undefined,
  vaultName: string | undefined,
): ReactElement | null {
  if (!vaultAddress || !vaultName) {
    return null;
  }

  return (
    <a key="table-row-link" href={`https://etherscan.io/token/${vaultAddress}`}>
      {vaultName}{" "}
      <sup>
        <Icon icon={IconNames.SHARE} iconSize={8} />
      </sup>
    </a>
  );
}
