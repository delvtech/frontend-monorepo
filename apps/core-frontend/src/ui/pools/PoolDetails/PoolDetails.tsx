import { ReactElement } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { formatUnits } from "ethers/lib/utils";

import tw from "efi-tailwindcss-classnames";
import { useSmartContractReadCall } from "ui/contracts/useSmartContractReadCall/useSmartContractReadCall";
import { PoolActionsCard } from "ui/pools/PoolActionsCard/PoolActionsCard";
import { PoolCharts } from "ui/pools/PoolCharts/PoolCharts";
import { PoolSummary } from "ui/pools/PoolSummary/PoolSummary";
import { TermSummary } from "ui/pools/TermSummary/TermSummary";
import { TokenSummary } from "ui/pools/TokenSummary/TokenSummary";
import { useFeeVolumeFiatForPool } from "ui/pools/hooks/useFeeVolumeForPool/useFeeVolumeForPool";
import { useStakingAPY } from "ui/pools/hooks/useStakingAPY";
import { useTotalFiatLiquidity } from "ui/pools/hooks/useTotalFiatLiquidityForPool/useTotalFiatLiquidityForPool";
import { useTotalValueLockedForTranche } from "ui/pools/hooks/useTotalValueLockedForTranche";
import { useVolumeForPool } from "ui/pools/hooks/useVolumeForPool/useVolumeForPool";
import { ONE_WEEK_IN_SECONDS } from "base/time";
import { getPoolTokens } from "elf/pools/getPoolTokens";
import { getPrincipalTokenInfoForPool } from "elf/pools/getPrincipalTokenInfoForPool";
import { PoolInfo } from "elf/pools/PoolInfo";
import { trancheContractsByAddress } from "elf/tranche/tranches";
import { PoolAction } from "ui/pools/hooks/usePoolViewPoolActionsPref/usePoolViewPoolActionsPref";

interface PoolDetailsProps {
  library: Web3Provider | undefined;
  signer: Signer | undefined;
  account: string | null | undefined;
  poolInfo: PoolInfo;
  poolAction: PoolAction;
}

export function PoolDetails(props: PoolDetailsProps): ReactElement {
  const { library, signer, account, poolInfo, poolAction } = props;
  const { baseAssetInfo, termAssetInfo, baseAssetContract } =
    getPoolTokens(poolInfo);

  const totalLiquidity = useTotalFiatLiquidity(poolInfo);
  const trancheInfo = getPrincipalTokenInfoForPool(poolInfo);
  const {
    address: trancheAddress,
    decimals: trancheDecimals,
    extensions: { createdAtTimestamp, unlockTimestamp },
  } = trancheInfo;
  const trancheContract = trancheContractsByAddress[trancheAddress];
  const startTimeMs = createdAtTimestamp * 1000;
  const maturityTimeMs = unlockTimestamp * 1000;

  const totalValueLocked = useTotalValueLockedForTranche(
    trancheInfo,
    baseAssetContract,
  );
  const { data: interestSupplyBN } = useSmartContractReadCall(
    trancheContract,
    "interestSupply",
  );

  const volume7d = useVolumeForPool(poolInfo, ONE_WEEK_IN_SECONDS);
  const feeVolume7d = useFeeVolumeFiatForPool(poolInfo, ONE_WEEK_IN_SECONDS);
  const stakingAPY7d = useStakingAPY(poolInfo, ONE_WEEK_IN_SECONDS);

  return (
    <div className={tw("flex", "flex-col", "space-y-8", "w-full")}>
      <div
        className={tw(
          "flex",
          "flex-col",
          "space-y-8",
          "lg:space-y-0",
          "lg:grid",
          "lg:grid-flow-row",
          "lg:gap-12",
          "lg:grid-cols-3",
          "lg:auto-rows-max",
        )}
      >
        <PoolSummary
          liquidity={totalLiquidity}
          volume={volume7d}
          feeVolume={feeVolume7d}
          stakingAPY={stakingAPY7d}
          poolInfo={poolInfo}
        />
        <TermSummary
          poolInfo={poolInfo}
          totalValueLocked={totalValueLocked}
          startTimeMs={startTimeMs}
          maturityTimeMs={maturityTimeMs}
        />
        <TokenSummary
          poolInfo={poolInfo}
          interestSupply={+formatUnits(interestSupplyBN ?? 0, trancheDecimals)}
        />
      </div>
      <div
        className={tw(
          "flex",
          "flex-col",
          "space-y-8",
          "lg:space-y-0",
          "lg:grid",
          "lg:grid-flow-row",
          "lg:gap-12",
          "lg:grid-cols-2",
          "lg:auto-rows-max",
        )}
      >
        <PoolCharts poolInfo={poolInfo} />
        <PoolActionsCard
          library={library}
          signer={signer}
          account={account}
          poolInfo={poolInfo}
          poolAction={poolAction}
          baseTokenInfo={baseAssetInfo}
          termTokenInfo={termAssetInfo}
        />
      </div>
    </div>
  );
}
