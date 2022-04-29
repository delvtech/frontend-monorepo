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
import { PrincipalTokenInfo } from "@elementfi/tokenlist";
import { jt, t } from "ttag";

import { getCoinGeckoId } from "integrations/coingecko";
import tw from "efi-tailwindcss-classnames";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { useCoinGeckoPrice } from "ui/coingecko/useCoinGeckoPrice";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { findAssetIcon } from "ui/crypto/CryptoIcon";
import { GoToPoolButtonOld } from "ui/pools/GoToPoolButton/GoToPoolButtonOld";
import { usePoolSpotPrice } from "ui/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";
import { PoolAction } from "ui/pools/hooks/usePoolViewPoolActionsPref/usePoolViewPoolActionsPref";
import { RedeemPrincipalTokensButtonOld } from "ui/portfolio/RedeemButton/RedeemPrincipalTokensButtonOld";
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
import { useNowMs } from "ui/base/hooks/useNowMs/useNowMs";

interface PrincipalTokenCardOldProps {
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
  "p-8",
  "items-center",
  "justify-center",
);

export function PrincipalTokenCardOld(
  props: PrincipalTokenCardOldProps,
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
      style={{ width: 512 }}
      className={classNames(
        tw("p-8", "flex", "flex-col", "m-4", "space-y-5", "text-base", {
          "text-gray-700": !isDarkMode,
          "text-white": isDarkMode,
        }),
      )}
    >
      <div className={tw("flex", "space-x-4")}>
        <BaseAssetIcon className={tw("flex-shrink-0")} height={72} width={72} />
        <div className={tw("flex", "flex-col", "space-y-2")}>
          <div
            className={tw(
              "flex",
              "items-center",
              "space-x-2",
              "text-2xl",
              "font-semibold",
            )}
          >
            <Link href={`/pools/${pool?.address}`}>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>{t`${baseAssetSymbol} Principal Token` || null}</a>
            </Link>
            <a
              className={tw("flex", "items-center")}
              onClick={(e) => e.stopPropagation()}
              href={`https://etherscan.io/address/${principalTokenAddress}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon
                intent={Intent.NONE}
                className={tw("pr-2")}
                icon={IconNames.SHARE}
              />
            </a>
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
              fill
              className={tw("text-center")}
            >
              {formattedDate}
            </Tag>
            <div className={tw("flex", "space-x-6", "justify-end")}>
              <LabeledText
                bold
                textClassName={tw("text-base")}
                text={`${formatPercent(trancheAPY)}`}
                label={t`yearly`}
              />
              <LabeledText
                bold
                textClassName={tw("text-base")}
                text={`${formatPercent(trancheAPY / 12)}`}
                label={t`monthly`}
              />
              <LabeledText
                bold
                textClassName={tw("text-base")}
                text={`${formatPercent(trancheAPY / 365)}`}
                label={t`daily`}
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
            textClassName={tw("text-lg")}
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
            textClassName={tw("text-lg")}
            text={<span>{t`${exitValue.toFixed(6)} ${baseAssetSymbol}`}</span>}
            label={fiatPrice}
          />
        </Callout>
      </div>

      {/* Quick Actions */}
      <ButtonGroup fill>
        <RedeemPrincipalTokensButtonOld
          library={library}
          account={account}
          principalTokenInfo={principalTokenInfo}
          baseAsset={baseAsset}
        />
        <GoToPoolButtonOld
          fill
          poolAddress={poolInfo.address}
          poolAction={PoolAction.ADD_LIQUIDITY}
          label={t`Add Liquidity`}
        />
        <GoToPoolButtonOld
          fill
          poolAddress={poolInfo.address}
          poolAction={PoolAction.SELL}
          label={t`Sell`}
        />
      </ButtonGroup>
      <div className={tw("flex", "justify-center")}>
        <span>
          {jt`Fixed yield is backed by ${baseAssetSymbol} deposited in ${tableRowLink}`}
        </span>
      </div>
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
