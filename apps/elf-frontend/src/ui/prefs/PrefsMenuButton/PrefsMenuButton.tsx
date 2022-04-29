import React, { FC, Fragment } from "react";

import { Button, Icon } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Popover2 } from "@blueprintjs/popover2";

import tw from "efi-tailwindcss-classnames";
import { PrefsMenu } from "ui/prefs/PrefsMenu/PrefsMenu";

interface PrefsMenuButtonProps {}
export const PrefsMenuButton: FC<PrefsMenuButtonProps> = () => {
  return (
    <Fragment>
      {/* Mobile */}
      <Popover2 content={<PrefsMenu />}>
        <Button
          outlined
          minimal
          icon={<Icon icon={IconNames.SETTINGS} iconSize={14} />}
          className={tw("lg:hidden")}
        />
      </Popover2>

      {/* Desktop */}
      <Popover2 content={<PrefsMenu />}>
        <Button
          outlined
          minimal
          large
          icon={IconNames.SETTINGS}
          className={tw("hidden", "lg:flex")}
        />
      </Popover2>
    </Fragment>
  );
};
