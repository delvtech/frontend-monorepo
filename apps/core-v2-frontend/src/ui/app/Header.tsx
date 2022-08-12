import { ReactElement } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Navbar } from "@elementfi/component-library";

import ElementIcon, {
  IconSize,
  IconVariant,
} from "src/ui/base/svg/ElementIcon/ElementIcon";

export default function Header(): ReactElement {
  return (
    <Navbar>
      <div className="flex-1">
        <ElementIcon variant={IconVariant.LIGHT} size={IconSize.LARGE} />
      </div>
      <div className="flex-none">{<ConnectButton />}</div>
    </Navbar>
  );
}
