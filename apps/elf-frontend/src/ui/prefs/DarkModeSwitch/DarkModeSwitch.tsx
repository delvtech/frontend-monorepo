import React, { ChangeEvent, Fragment, ReactElement, useCallback } from "react";

import { Switch } from "@blueprintjs/core";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";

export function DarkModeSwitch(): ReactElement {
  const { isDarkMode, setDarkMode } = useDarkMode();

  const onDarkModeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setDarkMode(event.target.checked),
    [setDarkMode],
  );

  return (
    <Fragment>
      <Switch
        checked={isDarkMode}
        className={tw("mb-0")}
        onChange={onDarkModeChange}
        innerLabel={t`Light`}
        innerLabelChecked={t`Dark`}
      />
    </Fragment>
  );
}
