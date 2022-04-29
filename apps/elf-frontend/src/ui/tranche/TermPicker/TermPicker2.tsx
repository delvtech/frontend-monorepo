import { ReactElement, useCallback } from "react";

import { ItemRenderer, Select } from "@blueprintjs/select";
import classNames from "classnames";

import tw from "efi-tailwindcss-classnames";

import styles from "./TermPicker.module.css";
import { IPopoverProps } from "@blueprintjs/core";
import { PrincipalTokenInfo } from "@elementfi/tokenlist";
import { TermButton2 } from "ui/tranche/TermPicker/TermButton2";
import { useRouter } from "next/router";
import { Navigation } from "ui/app/navigation/navigation";

interface TermPicker2Props {
  account: string | null | undefined;
  principalTokenInfos: PrincipalTokenInfo[];
  activePrincipalToken: PrincipalTokenInfo;
  buttonLabelRenderer: (principalToken: PrincipalTokenInfo) => JSX.Element;
}

const popoverProps: IPopoverProps = {
  minimal: true,
  className: tw("w-full"),
  targetClassName: classNames(styles.fullHeight, tw("w-full", "h-full")),
  popoverClassName: tw("w-300", "h-full"),
};
export function TermPicker2({
  principalTokenInfos,
  account,
  activePrincipalToken,
  buttonLabelRenderer,
}: TermPicker2Props): ReactElement | null {
  const { push: navigate } = useRouter();
  const onItemSelect = useCallback(
    (principalToken: PrincipalTokenInfo) => {
      navigate(`/${Navigation.FIXED_RATES}/${principalToken.address}`);
    },
    [navigate],
  );

  const itemRenderer: ItemRenderer<PrincipalTokenInfo> = useCallback(
    (principalTokenInfo: PrincipalTokenInfo, { handleClick }) => (
      <TermButton2
        key={principalTokenInfo?.address}
        showCaret={false}
        account={account}
        principalTokenInfo={principalTokenInfo}
        buttonLabelRenderer={buttonLabelRenderer}
        onClick={handleClick}
      />
    ),
    [account, buttonLabelRenderer],
  );

  const hasZeroOrOneTranche = principalTokenInfos.length < 2;

  return (
    <Select
      disabled={hasZeroOrOneTranche}
      popoverProps={popoverProps}
      items={principalTokenInfos}
      filterable={false}
      itemRenderer={itemRenderer}
      onItemSelect={onItemSelect}
    >
      <TermButton2
        disabled={hasZeroOrOneTranche}
        showCaret={principalTokenInfos.length > 1}
        account={account}
        principalTokenInfo={activePrincipalToken}
        buttonLabelRenderer={buttonLabelRenderer}
      />
    </Select>
  );
}
