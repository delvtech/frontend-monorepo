import React, { ReactElement } from "react";
import { t } from "ttag";
import { useGasPrice } from "src/ui/ethereum/useGasPrice";
import ElementUrl from "src/urls";
import GasIcon from "src/ui/base/svg/GasIcon";
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

const GAS_URL = "https://www.etherchain.org/tools/gasnow";

function Header(): ReactElement {
  const { address } = useAccount();
  const { data: gasPrice } = useGasPrice();

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

            <ExternalLink
              href={GAS_URL}
              className="mr-8 flex items-center text-principalRoyalBlue"
              showIcon={false}
            >
              <GasIcon className="h-5 w-5" />
              <span className="font-bold">
                {gasPrice?.recommendedBaseFee || 0.0}
              </span>
            </ExternalLink>

            <Tooltip content={t`${TooltipDefinition.OWNED_ELFI}`}>
              <span className="mr-8 flex items-center gap-2 font-bold text-principalRoyalBlue">
                <ElementIconCircle size={IconSize.MEDIUM} />
                <span>
                  {formattedAmountDeposited}
                  <span className="hidden lg:inline"> ELFI</span>
                </span>
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
