import React, { FC } from "react";

import { Classes, Colors, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Web3Provider } from "@ethersproject/providers";
import classNames from "classnames";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { LabeledText } from "ui/base/LabeledText/LabeledText";
import { useEthBalance } from "ui/wallets/hooks/useEthBalance/useEthBalance";
import { formatEth } from "elf/coins/ether/formatEth";

interface EthereumBalanceWidgetProps {
  library: Web3Provider | undefined;
  account: string | null | undefined;
}

export const EthereumBalanceWidget: FC<EthereumBalanceWidgetProps> = ({
  library,
  account,
}) => {
  const { data: ethBalance, isLoading } = useEthBalance(library, account);
  const formattedEthBalance = formatEth(ethBalance);

  const text = isLoading ? t`loading` : t`${formattedEthBalance} ETH`;

  return (
    <LabeledText
      large
      text={text}
      textClassName={classNames({ [Classes.SKELETON]: isLoading })}
      label={t`in this wallet`}
      icon={
        <Icon
          icon={IconNames.BANK_ACCOUNT}
          iconSize={48}
          color={Colors.GRAY1}
          className={tw("pr-4")}
        />
      }
    />
  );
};
