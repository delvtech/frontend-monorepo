import { Classes, Icon, Intent, Tag } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Tooltip2 } from "@blueprintjs/popover2";
import { ERC20 } from "@elementfi/core-typechain/dist/libraries";
import { PrincipalTokenInfo } from "@elementfi/tokenlist";
import { Web3Provider } from "@ethersproject/providers";
import classNames from "classnames";
import tw from "efi-tailwindcss-classnames";
import { useNowMs } from "ui/base/hooks/useNowMs/useNowMs";
import { useTokenAllowance } from "ui/token/hooks/useTokenAllowance";
import { RedeemPrincipalTokensDrawer } from "ui/tranche/RedeemTokensDrawer/RedeemPrincipalTokensDrawer";
import { useTrancheCanPerform } from "ui/tranche/useTrancheCanPerform";
import ContractAddresses from "addresses/addresses";
import { convertEpochSecondsToDate } from "base/convertEpochSecondsToDate/convertEpochSecondsToDate";
import { CryptoAsset } from "elf/crypto/CryptoAsset";
import { trancheContractsByAddress as principalTokenContractsByAddress } from "elf/tranche/tranches";
import { formatUnits } from "ethers/lib/utils";
import React, { Fragment, ReactElement, useCallback, useState } from "react";
import { t } from "ttag";

const { userProxyContractAddress } = ContractAddresses;

interface RedeemPrincipalTokensButtonTagProps {
  account: string | null | undefined;
  library: Web3Provider | undefined;

  principalTokenInfo: PrincipalTokenInfo;
  baseAsset: CryptoAsset;
}

export function RedeemPrincipalTokensButtonTag({
  baseAsset,
  principalTokenInfo,
  account,
  library,
}: RedeemPrincipalTokensButtonTagProps): ReactElement {
  const nowMs = useNowMs();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const {
    address,
    extensions: { unlockTimestamp },
  } = principalTokenInfo;
  const unlockDate = convertEpochSecondsToDate(unlockTimestamp);
  const canPerformWithdrawPrincipal = useTrancheCanPerform(
    address,
    "withdrawPrincipal",
  );

  const buttonDisabled =
    (unlockDate && unlockDate.getTime() > nowMs) ||
    !canPerformWithdrawPrincipal;

  const principalTokenContract =
    principalTokenContractsByAddress[principalTokenInfo.address];
  const { data: userProxyAllowanceBN } = useTokenAllowance(
    principalTokenContract as unknown as ERC20,
    account,
    userProxyContractAddress,
  );

  const userProxyAllowance = formatUnits(
    userProxyAllowanceBN ?? 1,
    principalTokenInfo.decimals,
  );
  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  if (!canPerformWithdrawPrincipal) {
    return (
      <Tooltip2
        inheritDarkTheme={false}
        className={tw("w-full")}
        intent={Intent.DANGER}
        content={t`Redeeming for this token has been temporarily disabled, please refer to our Discord or Twitter for further updates.`}
      >
        <Tag
          fill
          large
          intent={Intent.DANGER}
          minimal
          rightIcon={<Icon icon={IconNames.CHEVRON_RIGHT} color={"#a7b6c2"} />}
        >
          <div className={tw("p-2", "text-base")}>{t`Redeem`}</div>
        </Tag>
      </Tooltip2>
    );
  }

  if (buttonDisabled) {
    return (
      <Tooltip2
        inheritDarkTheme={false}
        className={tw("w-full")}
        content={t`This asset can be claimed after it has reached maturity.`}
      >
        <Tag
          large
          fill
          intent={Intent.NONE}
          minimal
          rightIcon={<Icon icon={IconNames.CHEVRON_RIGHT} color={"#a7b6c2"} />}
        >
          <div
            className={classNames(tw("p-2"), Classes.TEXT_MUTED)}
          >{t`Redeem`}</div>
        </Tag>
      </Tooltip2>
    );
  }

  return (
    <Fragment>
      <Tag
        fill
        large
        interactive
        intent={Intent.SUCCESS}
        onClick={openDrawer}
        minimal
        rightIcon={IconNames.CHEVRON_RIGHT}
      >
        <div className={tw("p-2")}>{t`Redeem`}</div>
      </Tag>
      {!baseAsset ? null : (
        <RedeemPrincipalTokensDrawer
          isOpen={isDrawerOpen}
          principalTokenInfo={principalTokenInfo}
          userProxyAllowance={userProxyAllowance}
          account={account}
          baseAsset={baseAsset}
          library={library}
          onClose={closeDrawer}
        />
      )}
    </Fragment>
  );
}
