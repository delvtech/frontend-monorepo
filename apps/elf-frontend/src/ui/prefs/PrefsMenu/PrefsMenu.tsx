import React, { ChangeEvent, FC, useCallback } from "react";

import {
  Alignment,
  Button,
  ButtonGroup,
  H6,
  Icon,
  Intent,
  Switch,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Currencies } from "ts-money";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useCurrencyPref } from "ui/prefs/useCurrency/useCurencyPref";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";

interface PrefsMenuProps {}
export const PrefsMenu: FC<PrefsMenuProps> = () => {
  const { isDarkMode, setDarkMode } = useDarkMode();

  const onDarkModeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => setDarkMode(event.target.checked),
    [setDarkMode],
  );

  const { currency, setCurrency } = useCurrencyPref();
  const isUSD = currency.code === Currencies.USD.code;
  const setUSD = useCallback(() => setCurrency(Currencies.USD), [setCurrency]);
  const isEUR = currency.code === Currencies.EUR.code;
  const setEUR = useCallback(() => setCurrency(Currencies.EUR), [setCurrency]);

  return (
    <div className={tw("p-4", "flex", "flex-col", "space-y-2")}>
      <H6>{t`User preferences`}</H6>
      <div className={tw("flex", "flex-col", "flex-1", "space-y-4", "px-4")}>
        <div
          className={tw(
            "flex",
            "justify-between",
            "items-center",
            "space-x-10",
          )}
        >
          <span>{t`Base currency`}</span>
          <ButtonGroup>
            <Button
              active={isUSD}
              intent={isUSD ? Intent.PRIMARY : Intent.NONE}
              outlined
              small
              icon={<Icon icon={IconNames.DOLLAR} iconSize={12} />}
              onClick={setUSD}
            >{t`USD`}</Button>
            <Button
              active={isEUR}
              intent={isEUR ? Intent.PRIMARY : Intent.NONE}
              outlined
              small
              icon={<Icon icon={IconNames.EURO} iconSize={12} />}
              onClick={setEUR}
            >{t`EUR`}</Button>
          </ButtonGroup>
        </div>
        <Switch
          label={t`Dark mode`}
          alignIndicator={Alignment.RIGHT}
          checked={isDarkMode}
          onChange={onDarkModeChange}
          innerLabel={t`off`}
          innerLabelChecked={t`on`}
        />
      </div>
    </div>
  );
};
