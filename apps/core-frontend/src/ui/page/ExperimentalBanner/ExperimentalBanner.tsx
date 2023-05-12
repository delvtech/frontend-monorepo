import { ReactElement } from "react";

import { Button, Colors } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";

import { useBannerPref } from "./useBannerPref";
import classNames from "classnames";

interface ExperimentalBannerProps {
  className?: string;
}

/**
 * TODO: We might want banners for other things in the future. Generalize this
 * for re-use when that time comes!
 */
export function ExperimentalBanner({
  className,
}: ExperimentalBannerProps): ReactElement | null {
  const { isDarkMode } = useDarkMode();

  return (
    <div
      className={classNames(
        tw(
          "flex",
          "h-8",
          "w-full",
          "font-bold",
          "text-center",
          "justify-center",
          "items-center",
          "space-x-4",
        ),
        className,
      )}
      style={{
        borderRadius: 0,
        background: isDarkMode ? Colors.ORANGE3 : Colors.ORANGE4,
        color: isDarkMode ? undefined : Colors.DARK_GRAY2,
      }}
    >
      {/* this just here for symmetry so message is centered */}
      <Button className={tw("invisible")} minimal small />
      <span
        style={{
          color: isDarkMode ? undefined : Colors.DARK_GRAY3,
        }}
      >{t`The Element V1 UI will sunset on November 4th, 2023. After this date, this website will be taken down.`}</span>
    </div>
  );
}
