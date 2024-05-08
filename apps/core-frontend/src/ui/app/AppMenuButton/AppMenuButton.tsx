import { ReactElement, useCallback, useState } from "react";

import { Icon, Menu, MenuDivider, MenuItem } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { t } from "ttag";

import tw from "efi-tailwindcss-classnames";
import { useNavigation } from "ui/app/navigation/hooks/useNavigation";
import { Navigation } from "ui/app/navigation/navigation";
import { ElementLogo } from "ui/base/ElementLogo";
import { useDarkMode } from "ui/prefs/useDarkMode/useDarkMode";
import { SocialMediaMenuItems } from "ui/navigation/ContactUsMenuItems/SocialMediaMenuItems";

import styles from "./AppMenuButton.module.css";
import classNames from "classnames";
import { MenuButton } from "ui/base/MenuButton/MenuButton";

export function AppMenuButton(): ReactElement {
  const { isDarkMode } = useDarkMode();

  return (
    <MenuButton
      menu={<AppMenu />}
      buttonLabel={<ElementLogo iconOnly height={48} isDarkMode={isDarkMode} />}
    />
  );
}

function AppMenu() {
  const { activeTab, changeTab } = useNavigation();
  const [isResourcesMenuOpen, setIsResourcesMenuOpen] = useState(false);

  const onResourcesMenuClose = useCallback(
    () => setIsResourcesMenuOpen(false),
    [],
  );

  const onFixedRatesClick = useCallback(
    () => changeTab(Navigation.FIXED_RATES),
    [changeTab],
  );
  const onMintClick = useCallback(
    () => changeTab(Navigation.MINT),
    [changeTab],
  );
  const onTradeClick = useCallback(
    () => changeTab(Navigation.POOLS),
    [changeTab],
  );
  const onPortfolioClick = useCallback(
    () => changeTab(Navigation.PORTFOLIO),
    [changeTab],
  );
  const onResourcesClick = useCallback(
    () => setIsResourcesMenuOpen((isOpen) => !isOpen),
    [],
  );

  if (isResourcesMenuOpen) {
    return <ResourcesMenu onClose={onResourcesMenuClose} />;
  }

  return (
    <Menu large>
      <MenuItem
        active={activeTab === Navigation.FIXED_RATES}
        labelElement={<Icon icon={IconNames.CHEVRON_RIGHT} />}
        onClick={onFixedRatesClick}
        text={
          <span className={classNames(styles.menuItem)}>{t`Fixed Rates`}</span>
        }
      />
      <MenuItem
        active={activeTab === Navigation.MINT}
        labelElement={<Icon icon={IconNames.CHEVRON_RIGHT} />}
        onClick={onMintClick}
        text={
          <span className={classNames(styles.menuItem)}>{t`Mint & LP`}</span>
        }
      />
      <MenuItem
        active={activeTab === Navigation.POOLS}
        onClick={onTradeClick}
        labelElement={<Icon icon={IconNames.CHEVRON_RIGHT} />}
        text={<span className={classNames(styles.menuItem)}>{t`Pools`}</span>}
      />
      <MenuItem
        active={activeTab === Navigation.PORTFOLIO}
        onClick={onPortfolioClick}
        labelElement={<Icon icon={IconNames.CHEVRON_RIGHT} />}
        text={
          <span className={classNames(styles.menuItem)}>{t`Portfolio`}</span>
        }
      />
      <MenuItem
        shouldDismissPopover={false}
        onClick={onResourcesClick}
        labelElement={<Icon icon={IconNames.CHEVRON_RIGHT} />}
        text={
          <span className={classNames(styles.menuItem)}>{t`Resources`}</span>
        }
      ></MenuItem>
    </Menu>
  );
}
interface ResourcesMenuProps {
  onClose: () => void;
}

function ResourcesMenu({ onClose }: ResourcesMenuProps) {
  return (
    <Menu large>
      <MenuItem
        shouldDismissPopover={false}
        icon={<Icon icon={IconNames.CHEVRON_LEFT} />}
        text={
          <span
            className={classNames(styles.menuItem, tw("font-bold"))}
          >{t`Resources`}</span>
        }
        onClick={onClose}
      />
      <MenuItem
        icon={<Icon icon={IconNames.BLANK} />}
        href="https://element.fi"
        target="_blank"
        rel="noreferrer"
        text={t`About`}
      />
      <MenuItem
        icon={<Icon icon={IconNames.BLANK} />}
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
  );
}
