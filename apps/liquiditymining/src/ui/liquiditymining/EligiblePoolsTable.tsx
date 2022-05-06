import classNames from "classnames";
import { Signer } from "ethers";
import { ReactElement } from "react";
import { eligibleGoerliPoolTokenInfos } from "src/elf/liquiditymining/eligiblepools";
import { t } from "ttag";
import { EligiblePoolTableRow } from "./EligiblePoolTableRow";

interface EligiblePoolsTableProps {
  account: string | null | undefined;
  signer: Signer | undefined;
  className?: string;
}

export function EligiblePoolsTable({
  account,
  signer,
  className,
}: EligiblePoolsTableProps): ReactElement {
  return (
    <div className={classNames("rounded-3xl bg-white shadow-xl", className)}>
      <div className="border-b border-hackerSky-dark p-5">
        <div className="grid grid-cols-[repeat(18,_minmax(0,_1fr))] items-center rounded-2xl bg-hackerSky p-5 text-sm font-semibold text-principalRoyalBlue">
          <span className="col-span-3">{t`LP Token`}</span>
          <span className="col-span-2 text-right">{t`Total Staked`}</span>
          <span className="col-span-2 text-right">{t`Total ELFI / Week`}</span>
          <span className="col-span-2 text-right">{t`Pool Share`}</span>
          <span className="col-span-2 text-right">{t`ELFI / Week`}</span>
          <span className="col-span-2 text-right">{t`Unclaimed ELFI`}</span>
          <span className="col-span-2 text-right">{t`Your Balance`}</span>
        </div>
      </div>
      <div className="p-5">
        {Object.values(eligibleGoerliPoolTokenInfos).map((pool) => (
          <EligiblePoolTableRow
            key={pool.address}
            account={account}
            signer={signer}
            pool={pool}
          />
        ))}
      </div>
    </div>
  );
}
