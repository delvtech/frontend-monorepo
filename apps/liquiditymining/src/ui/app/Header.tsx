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
    <div className="flex items-center justify-end gap-8 text-gray-400">
      {account ? (
        <a
          href={GAS_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2"
        >
          <GasIcon className="h-5 w-5" />
          <span className="font-bold text-principalRoyalBlue">
            {gasPrice?.recommendedBaseFee || 0.0}
          </span>
        </a>
      ) : null}

      <WalletProfileButton
        account={account}
        provider={library}
        walletConnectionActive={active}
      />
    </div>
  );
}

export default Header;
