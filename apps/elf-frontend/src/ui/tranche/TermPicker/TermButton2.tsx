import React from "react";

import { Classes, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import classNames from "classnames";

import tw from "efi-tailwindcss-classnames";
import { PrincipalTokenInfo } from "@elementfi/tokenlist";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";

interface TermButton2Props {
  account: string | null | undefined;
  principalTokenInfo: PrincipalTokenInfo;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * If true will show the dropdown caret, defaults to true
   */
  showCaret?: boolean;
  buttonLabelRenderer: (term: PrincipalTokenInfo) => JSX.Element;
}

export function TermButton2({
  principalTokenInfo,
  disabled = false,
  buttonLabelRenderer,
  showCaret = true,
  onClick,
}: TermButton2Props): JSX.Element {
  const { isDarkMode } = useDarkMode();
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        Classes.BUTTON,
        Classes.FILL,
        Classes.MINIMAL,
        tw("flex", "justify-start", "w-64", "h-full"),
      )}
    >
      <div
        className={tw(
          "flex",
          "justify-between",
          "items-center",
          "space-x-4",
          "flex-1",
          "p-2",
          isDarkMode ? "text-white" : "text-black",
        )}
      >
        {buttonLabelRenderer(principalTokenInfo)}
        {showCaret ? <Icon icon={IconNames.CARET_DOWN} /> : null}
      </div>
    </button>
  );
}
