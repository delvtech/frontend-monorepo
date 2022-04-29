import { ReactElement } from "react";

import { Card } from "@blueprintjs/core";
import { Web3Provider } from "@ethersproject/providers";
import { Signer } from "ethers";
import { PrincipalTokenInfo as TrancheInfo } from "@elementfi/tokenlist";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { StakeYieldTokensForm } from "ui/earn/EarnStakingForm/StakeYieldTokensForm";
import { useStakingAPY } from "ui/pools/hooks/useStakingAPY";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { formatPercent } from "base/formatPercent/formatPercent";
import { getPoolInfoForPrincipalToken } from "elf/pools/ccpool";
import { getPoolInfoForYieldToken } from "elf/pools/weightedPool";

import { StakePrincipalTokenForm } from "./StakePrincipalTokensForm";
import Link from "next/link";
import classNames from "classnames";
import { PoolInfo } from "elf/pools/PoolInfo";

interface EarnStakingFormsProps {
  className?: string;
  library: Web3Provider | undefined;
  signer: Signer | undefined;
  account: string | null | undefined;
  trancheInfo: TrancheInfo;
  formDisabled?: boolean;
  submitDisabled?: boolean;
}

export function EarnStakingForms(props: EarnStakingFormsProps): ReactElement {
  const { className, account, library, signer, trancheInfo } = props;
  const { isDarkMode } = useDarkMode();

  const principalPoolInfo = getPoolInfoForPrincipalToken(trancheInfo.address);
  const yieldPoolInfo = getPoolInfoForYieldToken(
    trancheInfo.extensions.interestToken,
  );

  const cardClassName = tw(
    "flex",
    "flex-col",
    "flex-1",
    "space-y-4",
    "border",
    {
      "border-gray-600": isDarkMode,
    },
  );

  return (
    <div
      className={classNames(className, tw("flex", "justify-between", "w-full"))}
    >
      <Card className={cardClassName}>
        <div
          className={tw("text-center", "font-semibold")}
        >{t`LP your Principal Tokens`}</div>
        <PoolStakingAPY poolInfo={principalPoolInfo} />
        <StakePrincipalTokenForm
          account={account}
          library={library}
          signer={signer}
          poolInfo={principalPoolInfo}
        />
        <PoolLink address={principalPoolInfo.address} />
      </Card>
      {yieldPoolInfo && (
        <Card className={cardClassName}>
          <div
            className={tw("text-center", "font-semibold")}
          >{t`LP your Yield Tokens`}</div>
          <PoolStakingAPY poolInfo={yieldPoolInfo} />
          <StakeYieldTokensForm
            account={account}
            library={library}
            signer={signer}
            poolInfo={yieldPoolInfo}
          />
          <PoolLink address={yieldPoolInfo.address} />
        </Card>
      )}
    </div>
  );
}
interface PoolStakingAPYProps {
  poolInfo: PoolInfo;
}
function PoolStakingAPY({ poolInfo }: PoolStakingAPYProps) {
  const stakingAPY = useStakingAPY(poolInfo);
  return (
    <div className={tw("text-center")}>{t`LP APY: ${formatPercent(
      stakingAPY,
    )}`}</div>
  );
}

interface PoolLinkProps {
  address: string;
}
function PoolLink({ address }: PoolLinkProps) {
  return (
    <Link href={`/pools/${address}`}>
      {/* TODO: fix */}
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={tw("text-center", "font-semibold")}>{t`Go to pool`}</a>
    </Link>
  );
}
