import { ReactElement, useCallback, useState } from "react";

import { Button, Colors, Icon, Intent } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import classNames from "classnames";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { ConnectWalletDialog } from "ui/wallets/ConnectWalletDialog/ConnectWalletDialog";
import { WalletJazzicon } from "ui/wallets/WalletJazzicon/WalletJazzicon";
import { ChainId } from "base/ethereum/ethereum";
import { formatWalletAddress } from "elf/wallets/formatWalletAddress";

interface ConnectWalletButtonProps {
  account: string | null | undefined;
  walletConnectionActive: boolean | undefined;
  chainId: number | undefined;
  className?: string;
}

const ChainColor: Record<number, string> = {
  [ChainId.GOERLI]: Colors.BLUE4,
  [ChainId.MAINNET]: Colors.GREEN4,
  [ChainId.LOCAL]: Colors.WHITE,
};
export function ConnectWalletButton(
  props: ConnectWalletButtonProps,
): ReactElement {
  const { account, chainId, walletConnectionActive, className } = props;
  const [isWalletDialogOpen, setWalletDialogOpen] = useState(false);
  const onCloseWalletDialog = useCallback(() => setWalletDialogOpen(false), []);
  const onOpenWalletDialog = useCallback(() => setWalletDialogOpen(true), []);

  let walletButtonIntent: Intent = Intent.NONE;
  if (!account) {
    walletButtonIntent = Intent.WARNING;
  }
  const connectionStatusColor =
    walletConnectionActive && !!chainId ? ChainColor[chainId] : Colors.RED4;

  return (
    <div
      className={classNames(className, tw("flex", "space-x-8", "items-center"))}
    >
      {!account ? (
        <div>
          <Button
            outlined
            fill
            large
            intent={walletButtonIntent}
            onClick={onOpenWalletDialog}
          >
            <span className={tw("text-center")}>
              {t`Connect wallet to begin`}
            </span>
          </Button>
        </div>
      ) : (
        <div>
          <Button
            minimal
            icon={<WalletJazzicon size={28} account={account} />}
            rightIcon={
              <Icon
                className={tw("pr-2")}
                icon={IconNames.DOT}
                color={connectionStatusColor}
              />
            }
            fill
            large
            intent={walletButtonIntent}
            onClick={onOpenWalletDialog}
          >
            {formatWalletAddress(account)}
          </Button>
        </div>
      )}
      <ConnectWalletDialog
        isOpen={isWalletDialogOpen}
        onClose={onCloseWalletDialog}
      />
    </div>
  );
}
