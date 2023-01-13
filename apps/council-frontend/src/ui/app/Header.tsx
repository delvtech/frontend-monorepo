import React, { ReactElement } from "react";
import { t } from "ttag";
import ElementUrl from "src/urls";
import { useDeposited } from "src/ui/base/lockingVault/useDeposited";
import {
  ElementIconCircle,
  IconSize,
} from "src/ui/base/ElementIconCircle/ElementIconCircle";
import Tooltip from "src/ui/base/Tooltip/Tooltip";
import { TooltipDefinition } from "src/ui/voting/tooltipDefinitions";
import ExternalLink from "src/ui/base/ExternalLink/ExternalLink";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import Button from "src/ui/base/Button/Button";
import PushIcon from "src/ui/base/svg/PushLogo";
import { usePushSubscribe } from "src/ui/push/usePushSubscribe";

function Header(): ReactElement {
  const { address } = useAccount();
  const { toggleUserStatus, loading, isSubscribed } = usePushSubscribe();

  const amountDeposited = useDeposited(address) || "0";
  const formattedAmountDeposited = parseFloat(amountDeposited).toFixed(2);

  return (
    <div className="flex w-full">
      <div className="ml-auto flex items-center space-x-4 text-gray-400">
        {address ? (
          <div className="flex items-center">
            <span className="mr-8 hidden items-center gap-1 lg:flex">
              <ExternalLink
                href={ElementUrl.DOCS}
                text={t`Learn how to vote`}
                className="text-principalRoyalBlue"
              />
            </span>

            <Tooltip content={t`${TooltipDefinition.OWNED_ELFI}`}>
              <span className="mr-8 flex items-center gap-2 font-bold text-principalRoyalBlue">
                <ElementIconCircle size={IconSize.MEDIUM} />
                <span>
                  {formattedAmountDeposited}
                  <span className="hidden lg:inline"> ELFI</span>
                </span>
              </span>
            </Tooltip>
            <Tooltip content={t`${TooltipDefinition.PUSH_DESCRIPTION}`}>
              <span className="hidden lg:inline">
                <Button
                  loading={loading}
                  onClick={toggleUserStatus}
                  className="mr-4 "
                >
                  <PushIcon className="mr-2" />
                  {isSubscribed ? "Unsubscribe" : "Subscribe"}
                </Button>
              </span>
            </Tooltip>
          </div>
        ) : null}
      </div>

      {/* TODO: There's a weird bug that happens when you refresh the Delegate page when your wallet is connected. Check console for a potential hydration error (missing div) */}
      <ConnectButton
        showBalance={false}
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
        label={t`Connect Wallet`}
      />
    </div>
  );
}

export default Header;
