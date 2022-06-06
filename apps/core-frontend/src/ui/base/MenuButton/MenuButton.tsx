import { ReactElement, useCallback, useState } from "react";

import { Button, Position } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { Popover2 } from "@blueprintjs/popover2";

import tw from "efi-tailwindcss-classnames";

interface MenuButtonProps {
  buttonLabel: ReactElement;
  menu: ReactElement;
}

export function MenuButton(props: MenuButtonProps): ReactElement {
  const { buttonLabel, menu } = props;

  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
  const onButtonClick = useCallback(() => {
    setIsOpen((currentIsOpen) => !currentIsOpen);
  }, []);

  return (
    <Popover2
      fill
      isOpen={isOpen}
      position={Position.BOTTOM_RIGHT}
      minimal
      className={tw("flex")}
      onClose={closeMenu}
      content={menu}
    >
      <Button
        fill
        minimal
        rightIcon={isOpen ? IconNames.CHEVRON_DOWN : IconNames.CHEVRON_RIGHT}
        onClick={onButtonClick}
      >
        {buttonLabel}
      </Button>
    </Popover2>
  );
}
