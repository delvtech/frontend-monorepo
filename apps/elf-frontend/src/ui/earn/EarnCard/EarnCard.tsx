import { CSSProperties, ReactElement, useCallback, useState } from "react";

import { Card, Collapse, Elevation } from "@blueprintjs/core";
import { PrincipalTokenInfo } from "@elementfi/tokenlist";
import { Web3Provider } from "@ethersproject/providers";
import { differenceInDays } from "date-fns";
import { Signer } from "ethers";

import tw from "efi-tailwindcss-classnames";

import { EarnSummaryCard } from "./EarnSummaryCard";
import { WETH, USDC, ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { getCryptoAssetForToken } from "elf/crypto/getCryptoAssetForToken";
import {
  getPoolInfoForPrincipalToken,
  principalPoolContractsByAddress,
} from "elf/pools/ccpool";
import { getPoolInfoForYieldToken } from "elf/pools/weightedPool";
import { getIsMature } from "elf/tranche/getIsMature";
import { getVaultTokenInfoForTranche } from "elf/tranche/tranches";
import { underlyingContractsByAddress } from "elf/underlying/underlying";
import { getYearnVaultAPY } from "integrations/yearn/fetchYearnVaults";
import { findAssetIcon } from "ui/crypto/CryptoIcon";
import { EarnActionsCard } from "ui/earn/EarnActionsCard/EarnActionsCard";
import { EarnActionsTabId } from "ui/earn/EarnActionsTabs/EarnActionsTabId";
import { usePoolSpotPrice } from "ui/pools/hooks/usePoolSpotPrice/usePoolSpotPrice";
import { useTotalValueLockedForTranche } from "ui/pools/hooks/useTotalValueLockedForTranche";
import { useYearnVault } from "ui/yearn/useYearnVault";

interface EarnCardProps {
  signer: Signer | undefined;
  library: Web3Provider | undefined;
  account: string | null | undefined;
  id: string;
  principalTokenInfo: PrincipalTokenInfo;
  isExpanded: boolean;
  onExpandOpen: (id: string) => void;
  onExpandClose: (id: string) => void;
}

const poolCardStyle: CSSProperties = {
  padding: "0px",
};

export function EarnCard(props: EarnCardProps): ReactElement | null {
  const {
    signer,
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

  // state
  const [activeTabId, setActiveTabId] = useState(EarnActionsTabId.MINT);

  // get token infos
  const yieldPoolInfo = getPoolInfoForYieldToken(interestTokenAddress);
  const principalPoolInfo = getPoolInfoForPrincipalToken(
    principalTokenInfo.address,
  );
  const vaultTokenInfo = getVaultTokenInfoForTranche(principalTokenAddress);

  // get contracts
  const principalPoolContract =
    principalPoolContractsByAddress[principalPoolInfo.address];
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

  return (
    <Card
      interactive={!isExpanded}
      elevation={isExpanded ? Elevation.THREE : Elevation.ZERO}
      className={tw("p-0", "w-full")}
      style={poolCardStyle}
    >
      <EarnSummaryCard
        onToggleExpand={onToggleExpand}
        BaseAssetIcon={BaseAssetIcon}
        displayName={displayName}
        type={type}
        termLength={termLength}
        vaultApy={vaultApy}
        tvl={tvl}
        yieldPoolInfo={yieldPoolInfo}
        principalPoolInfo={principalPoolInfo}
        principalPrice={principalPrice}
        startTime={startTime}
        maturityTime={maturityTime}
        isExpanded={isExpanded}
      />

      <Collapse isOpen={isExpanded}>
        <EarnActionsCard
          signer={signer}
          library={library}
          account={account}
          trancheInfo={principalTokenInfo}
          activeTabId={activeTabId}
          setActiveTabId={setActiveTabId}
        />
      </Collapse>
    </Card>
  );
}
