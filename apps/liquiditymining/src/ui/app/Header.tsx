import React, { ReactElement } from "react";
import { useWeb3React } from "@web3-react/core";
import { WalletProfileButton } from "src/ui/wallet/ConnectWalletButton";
import { useGasPrice } from "src/ui/ethereum/useGasPrice";
import GasIcon from "src/ui/base/svg/GasIcon";
import { Provider } from "@ethersproject/providers";

const GAS_URL = "https://www.etherchain.org/tools/gasnow";

function Header(): ReactElement {
  const { account, active, library } = useWeb3React<Provider>();
  const { data: gasPrice } = useGasPrice();

  return (
    <div className="flex w-full justify-between">
      <div className="flex space-x-3"></div>
      <div className="flex items-center space-x-4 text-gray-400">
        {account ? (
          <div className="flex items-center">
            <a
              href={GAS_URL}
              target="_blank"
              rel="noreferrer"
              className="mr-8 flex items-center"
            >
              <GasIcon className="h-5 w-5" />
              <span className="ml-2 mr-1 font-bold text-principalRoyalBlue">
                {gasPrice?.recommendedBaseFee || 0.0}
              </span>
            </a>
          </div>
        ) : null}

        <WalletProfileButton
          account={account}
          provider={library}
          walletConnectionActive={active}
        />
      </div>
    </div>
  );
}

export default Header;
