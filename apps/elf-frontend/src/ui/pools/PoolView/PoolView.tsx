import { ReactElement } from "react";

import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";

import tw from "efi-tailwindcss-classnames";
import { PoolDetails } from "ui/pools/PoolDetails/PoolDetails";
import { useSigner } from "ui/provider/useBlockFromTag/useSigner/useSigner";
import { PoolInfo } from "elf/pools/PoolInfo";

import { PoolViewHeader } from "./PoolViewHeader";
import { PoolViewTitle } from "./PoolViewTitle";
import { PoolAction } from "ui/pools/hooks/usePoolViewPoolActionsPref/usePoolViewPoolActionsPref";

export interface PoolViewProps {
  poolInfo: PoolInfo;
  poolAction?: PoolAction;
}

export function PoolView({
  poolInfo,
  poolAction = PoolAction.BUY,
}: PoolViewProps): ReactElement {
  const { account, library } = useWeb3React<Web3Provider>();
  const signer = useSigner(account, library);

  return (
    <>
      <PoolViewTitle poolInfo={poolInfo} />
      <div
        data-testid="pool-view"
        className={tw(
          "flex",
          "flex-col",
          "pb-24",
          "lg:pb-12",
          "h-full",
          "w-full",
          "space-y-8",
          "overflow-auto",
          "px-4",
          "lg:px-12",
        )}
      >
        <div className={tw("flex", "justify-between")}>
          <PoolViewHeader poolInfo={poolInfo} />
        </div>
        <div className={tw("flex", "flex-col", "justify-between")}>
          <PoolDetails
            library={library}
            signer={signer}
            account={account}
            poolInfo={poolInfo}
            poolAction={poolAction}
          />
        </div>
      </div>
    </>
  );
}
