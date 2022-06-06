import React, { ReactElement } from "react";

import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { LiquidityPositionTableRow } from "ui/portfolio/LiquidityPositionCard/LiquidityPositionTableRow";

const tableHeaders = [
  t`Pool name`,
  t`Quantity`,
  t`Total fees earned`,
  t`Share of pool`,
  t`Quick actions`,
];

export function LiquidityPositionTable(): ReactElement {
  return (
    <div data-testid="fyt-table" className={tw("flex", "flex-col", "w-full")}>
      {/* Table header */}
      <div
        className={tw("grid", "grid-cols-5", "px-6", "pb-3", "mb-2", "w-full")}
      >
        {tableHeaders.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>

      {/* Table row */}
      <LiquidityPositionTableRow />
    </div>
  );
}
