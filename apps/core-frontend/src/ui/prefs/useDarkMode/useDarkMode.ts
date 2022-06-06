import { Classes } from "@blueprintjs/core";

import { usePref } from "ui/prefs/usePref/usePref";
import { useCallback } from "react";

interface DarkMode {
  isDarkMode: boolean;
  darkModeClassName: string | undefined;
  setDarkMode: (isDarkMode: boolean) => void;
  setDarkModeOn: () => void;
  setDarkModeOff: () => void;
}

const DARK_MODE_PREF_ID = "isDarkMode";
export const DARK_MODE_DEFAULT = true;

export function useDarkMode(): DarkMode {
  const { pref: isDarkMode, setPref: setDarkMode } = usePref(
    DARK_MODE_PREF_ID,
    DARK_MODE_DEFAULT,
  );

  const setDarkModeOn = useCallback(() => setDarkMode(true), [setDarkMode]);
  const setDarkModeOff = useCallback(() => setDarkMode(false), [setDarkMode]);

  const darkModeClassName = isDarkMode ? Classes.DARK : undefined;

  return {
    isDarkMode,
    darkModeClassName,
    setDarkMode,
    setDarkModeOn,
    setDarkModeOff,
  };
}
