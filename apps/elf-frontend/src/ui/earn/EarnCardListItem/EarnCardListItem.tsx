import { Fragment, ReactElement, useCallback, useState } from "react";

import {
  Button,
  Card,
  Classes,
  Collapse,
  Divider,
  Elevation,
  Intent,
  Tag,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { ERC20, USDC, WETH } from "@elementfi/core-typechain/dist/libraries";
import { PrincipalTokenInfo, YieldTokenInfo } from "@elementfi/tokenlist";
import { Web3Provider } from "@ethersproject/providers";
import classNames from "classnames";
import { differenceInDays } from "date-fns";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import {
  getPoolInfoForPrincipalToken,
  principalPoolContractsByAddress,
} from "elf/pools/ccpool";
import {
  getPoolInfoForYieldToken,
  yieldPoolContractsByAddress,
} from "elf/pools/weightedPool";
import { getIsMature } from "elf/tranche/getIsMature";
import { getVaultTokenInfoForTranche } from "elf/tranche/tranches";
import { underlyingContractsByAddress } from "elf/underlying/underlying";
import { Signer } from "ethers";
import { getYearnVaultAPY } from "integrations/yearn/fetchYearnVaults";
import { getTokenInfo } from "tokenlists/tokenlists";
import { t } from "ttag";
import { findAssetIcon } from "ui/crypto/CryptoIcon";
import { EarnActionsTabId } from "ui/earn/EarnActionsTabs/EarnActionsTabId";
import { EarnExpandedSummary } from "ui/earn/EarnCardListItem/EarnExpandedSummary";
import { EarnStakingForms } from "ui/earn/EarnStakingForm/EarnStakingForms";
import { MintForm } from "ui/mint/MintCard/MintForm";
import { usePoolSpotPrice } from "ui/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";
import { useTotalValueLockedForTranche } from "ui/pools/hooks/useTotalValueLockedForTranche";
import { useSigner } from "ui/provider/useBlockFromTag/useSigner/useSigner";
import { useYearnVault } from "ui/yearn/useYearnVault";

import tw from "efi-tailwindcss-classnames";

import { EarnSummaryCardListItem } from "./EarnSummaryCardListItem";

interface EarnCardListItemProps {
  signer: Signer | undefined;
  library: Web3Provider | undefined;
  account: string | null | undefined;
  id: string;
  principalTokenInfo: PrincipalTokenInfo;
  isExpanded: boolean;
  onExpandOpen: (id: string) => void;
  onExpandClose: (id: string) => void;
}

export function EarnCardListItem(
  props: EarnCardListItemProps,
): ReactElement | null {
  const {
    id,
    library,
    account,
    principalTokenInfo,
    principalTokenInfo: {
      address: principalTokenAddress,
      extensions: {
        interestToken: interestTokenAddress,
        underlying: baseAssetAddress,
      },
    },
    isExpanded,
    onExpandClose,
    onExpandOpen,
  } = props;

  // get token infos
  const yieldPoolInfo = getPoolInfoForYieldToken(interestTokenAddress);
  const principalPoolInfo = getPoolInfoForPrincipalToken(
    principalTokenInfo.address,
  );
  const vaultTokenInfo = getVaultTokenInfoForTranche(principalTokenAddress);
  const yieldTokenInfo = getTokenInfo<YieldTokenInfo>(interestTokenAddress);

  // get contracts
  const principalPoolContract =
    principalPoolContractsByAddress[principalPoolInfo.address];
  const yieldPoolContract =
    yieldPoolInfo && yieldPoolContractsByAddress[yieldPoolInfo.address];
  const baseAssetContract = underlyingContractsByAddress[
    principalTokenInfo.extensions.underlying
  ] as WETH | USDC | ERC20;

  // get static display information
  const {
    extensions: { createdAtTimestamp: trancheCreatedAt, unlockTimestamp },
  } = principalTokenInfo;
  const { symbol: vaultSymbol, address: vaultAddress } = vaultTokenInfo;
  const maturityTime = unlockTimestamp * 1000;
  const isMature = getIsMature(unlockTimestamp);
  const baseAsset = getCryptoAssetForToken(baseAssetAddress);
  const BaseAssetIcon = findAssetIcon(baseAsset);
  const { data: vaultInfo } = useYearnVault(vaultSymbol, vaultAddress);
  const { display_name: displayName, type, apy } = vaultInfo || {};

  // get dynamic pool information
  const principalPrice = usePoolSpotPrice(
    principalPoolContract,
    principalTokenInfo.address,
  )?.toFixed(4);

  const yieldPrice = usePoolSpotPrice(
    yieldPoolContract,
    yieldTokenInfo.address,
  )?.toFixed(4);

  const tvl = useTotalValueLockedForTranche(
    principalTokenInfo,
    baseAssetContract as unknown as ERC20,
  );
  const vaultApy = apy ? getYearnVaultAPY(apy) : 0;

  const startTime = trancheCreatedAt ? trancheCreatedAt * 1000 : 0;

  const dayDifference = differenceInDays(
    maturityTime as number,
    startTime as number,
  );

  const termLength =
    dayDifference > 10 ? Math.round(dayDifference / 10) * 10 : dayDifference;

  // TODO: this is a big hammer for loading state.  we should use a more granular technique when we can.
  const dataToLoad = [tvl, vaultInfo];
  const allDataLoaded = dataToLoad.every((data) => data !== undefined);

  const onToggleExpand = useCallback(() => {
    if (isMature) {
      return;
    }
    if (isExpanded) {
      onExpandClose(id);
    } else {
      onExpandOpen(id);
    }
  }, [id, isExpanded, isMature, onExpandClose, onExpandOpen]);

  if (!allDataLoaded) {
    return (
      <Card
        interactive={false}
        elevation={Elevation.ZERO}
        className={tw(
          "max-w-md",
          "w-full",
          "flex",
          "flex-col",
          "p-4",
          "space-y-2",
        )}
      >
        <div
          className={classNames(tw("p-0", "w-full", "h-24"), Classes.SKELETON)}
        />
      </Card>
    );
  }

  return (
    <Card
      interactive={!isExpanded}
      elevation={isExpanded ? Elevation.THREE : Elevation.ZERO}
      className={tw(
        "max-w-md",
        "w-full",
        "flex",
        "flex-col",
        "p-6",
        "space-y-2",
      )}
    >
      <EarnSummaryCardListItem
        onToggleExpand={onToggleExpand}
        BaseAssetIcon={BaseAssetIcon}
        displayName={displayName}
        type={type}
        termLength={termLength}
        vaultApy={vaultApy}
        tvl={tvl}
        yieldPoolInfo={yieldPoolInfo}
        principalPoolInfo={principalPoolInfo}
        startTime={startTime}
        maturityTime={maturityTime}
        isExpanded={isExpanded}
      />

      <Collapse isOpen={isExpanded}>
        <Divider className={tw("mt-4", "mb-6")} />
        <EarnExpandedSummary
          yieldPoolInfo={yieldPoolInfo}
          principalPoolInfo={principalPoolInfo}
          principalPrice={principalPrice}
          yieldPrice={yieldPrice}
        />
        <EarnActionsButtons
          library={library}
          account={account}
          principalTokenInfo={principalTokenInfo}
          unlockTimestamp={principalTokenInfo.extensions.unlockTimestamp}
        />
      </Collapse>
    </Card>
  );
}

interface EarnActionsButtonsProps {
  library: Web3Provider | undefined;
  account: string | null | undefined;
  principalTokenInfo: PrincipalTokenInfo;
  unlockTimestamp: number;
}

export function EarnActionsButtons(
  props: EarnActionsButtonsProps,
): ReactElement {
  const { unlockTimestamp, library, account, principalTokenInfo } = props;
  const signer = useSigner(account, library);
  const isMature = getIsMature(unlockTimestamp);

  const [showMint, setShowMint] = useState(false);
  const [showLiquidity, setShowLiquidity] = useState(false);
  const onClickMintButton = useCallback(() => {
    setShowLiquidity(false);
    setShowMint(!showMint);
  }, [showMint]);

  const onClickLiquidityButton = useCallback(() => {
    setShowMint(false);
    setShowLiquidity(!showLiquidity);
  }, [showLiquidity]);

  return (
    <Fragment>
      <Button
        minimal
        active
        disabled={isMature}
        intent={Intent.PRIMARY}
        id={EarnActionsTabId.MINT}
        rightIcon={IconNames.CHEVRON_RIGHT}
        className={tw("mt-8", "w-full", "flex", "justify-between")}
        onClick={onClickMintButton}
      >
        <Tag
          intent={Intent.PRIMARY}
          round
          minimal
          className={tw("mr-2", "my-2")}
        >
          1
        </Tag>
        <span>{t`Mint principal and yield tokens`}</span>
      </Button>

      <Collapse isOpen={showMint} className={tw("my-2")}>
        <MintForm
          library={library}
          account={account}
          trancheInfo={principalTokenInfo}
        />
      </Collapse>
      <Button
        minimal
        active
        disabled={isMature}
        intent={Intent.PRIMARY}
        id={EarnActionsTabId.PROVIDE_LIQUIDITY}
        rightIcon={IconNames.CHEVRON_RIGHT}
        className={tw("w-full", "flex", "justify-between")}
        onClick={onClickLiquidityButton}
      >
        <Tag
          intent={Intent.PRIMARY}
          round
          minimal
          className={tw("mr-2", "my-2")}
        >
          2
        </Tag>
        <span>{t`Provide liquidity to earn fees`}</span>
      </Button>

      <Collapse isOpen={showLiquidity} className={tw("my-2")}>
        <EarnStakingForms
          library={library}
          signer={signer}
          account={account}
          trancheInfo={principalTokenInfo}
          className={tw("flex-col", "space-x-0", "space-y-4")}
        />
      </Collapse>
    </Fragment>
  );
}
