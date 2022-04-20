import { BurgerSidebar } from "common/Modal/BurgerSidebar";
import { MenuItem } from "components/Layout/Header";
import { SocialLinks } from "components/Layout/Header";
import { Flex } from "common/Container/styles";
import { COLOR_WHITE_LIGHT } from "helpers/colorPalette";
import { BurgerMenuProps } from "helpers/types";
import {
  BurgerMenuContainer,
  NavigationPrimary,
} from "components/Layout/Header/BurgerMenu/style";
import { ReactElement } from "react";

export const BurgerMenu = ({
  sidebarVisibility,
  changeSidebarVisibility,
}: BurgerMenuProps): ReactElement => {
  return (
    <BurgerMenuContainer>
      <div
        onClick={changeSidebarVisibility}
        onKeyDown={changeSidebarVisibility}
        role="button"
        tabIndex={0}
      >
        <svg
          width="32"
          height="19"
          viewBox="0 0 32 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="3" fill={COLOR_WHITE_LIGHT} />
          <rect y="6" width="32" height="3" fill={COLOR_WHITE_LIGHT} />
          <rect y="12" width="32" height="3" fill={COLOR_WHITE_LIGHT} />
        </svg>
      </div>
      <BurgerSidebar
        open={sidebarVisibility}
        handleClose={changeSidebarVisibility}
      >
        <Flex>
          <div />
          <div
            onClick={changeSidebarVisibility}
            onKeyDown={changeSidebarVisibility}
            role="button"
            tabIndex={0}
          >
            <svg
              width="32"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z"
                fill={COLOR_WHITE_LIGHT}
              />
            </svg>
          </div>
        </Flex>
        <NavigationPrimary>
          <MenuItem onClose={changeSidebarVisibility} />
        </NavigationPrimary>
        <SocialLinks />
      </BurgerSidebar>
    </BurgerMenuContainer>
  );
};
