import { useRef } from "react";
import { CSSTransition } from "react-transition-group";
import { handleCloseOutside } from "helpers/handleCloseOutside";
import {
  BurgerSidebarContainer,
  BurgerSidebarWrapper,
  BurgerSidebarOverlay,
} from "common/Modal/styles";
import { BurgerSidebarProps } from "helpers/types";
import { PageHideOuterScroll } from "styles/globalStyles";
import React from "react";

export const BurgerSidebar: React.FC<BurgerSidebarProps> = ({
  open,
  children,
  handleClose,
}) => {
  const TIMEOUT = 450;
  const wrapperRef = useRef(null);
  handleCloseOutside(wrapperRef, handleClose);

  return (
    <BurgerSidebarOverlay shouldShow={open}>
      <PageHideOuterScroll shouldHide={open} />
      <CSSTransition
        in={open}
        classNames="burgerslide-transition"
        unmountOnExit
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        <BurgerSidebarWrapper>
          <BurgerSidebarContainer ref={wrapperRef}>
            {children}
          </BurgerSidebarContainer>
        </BurgerSidebarWrapper>
      </CSSTransition>
    </BurgerSidebarOverlay>
  );
};
