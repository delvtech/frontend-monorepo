import { ReactElement } from "react";

import {
  Button,
  Menu,
  MenuDivider,
  MenuItem,
  Position,
} from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Popover2 } from "@blueprintjs/popover2";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { SocialMediaMenuItems } from "ui/navigation/ContactUsMenuItems/SocialMediaMenuItems";

export function AppHamburgerButton(): ReactElement {
  return (
    <Popover2
      fill
      position={Position.BOTTOM_RIGHT}
      minimal
      className={tw("flex")}
      content={
        <Menu large>
          <MenuItem
            href="https://element.fi"
            target="_blank"
            rel="noreferrer"
            text={t`About`}
          />
          <MenuItem
            href="https://docs-delv.gitbook.io/element-developer-docs"
            target="_blank"
            rel="noreferrer"
            text={t`Docs`}
          />
          <MenuDivider
            title={<span className={tw("text-sm")}>{t`Get in touch`}</span>}
          />
          <SocialMediaMenuItems />
        </Menu>
      }
    >
      <Button
        fill
        minimal
        className={tw("px-6", "py-3")}
        icon={IconNames.MENU}
      />
    </Popover2>
  );
}
