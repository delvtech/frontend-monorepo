import styled from "styled-components";
import { devices } from "helpers/devices";
import { AnimateSlideBurger } from "styles/globalStyles";
import { StringProps } from "helpers/types";
import { COLOR_BLACK } from "helpers/colorPalette";

export const BurgerSidebarWrapper = styled(AnimateSlideBurger)`
  width: 100%;
  height: 100%;
  display: block;
  top: 0;
  left: 0;
  position: absolute;
`;

export const BurgerSidebarOverlay = styled.div<StringProps>`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  position: fixed;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  z-index: 999;
  visibility: ${(p) => (p.shouldShow ? "visible" : "hidden")};
  transition: visibility 0.4s;
`;

export const BurgerSidebarContainer = styled.div<StringProps>`
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  background-color: ${COLOR_BLACK};
  background-image: url("/assets/svg/grid.svg");
  width: 100%;
  height: 100vh;
  padding: 4.0625rem 2rem 2rem;
  position: relative;
  overflow: hidden;

  @media ${devices.mobileL} {
    max-width: 100vw;
    padding: 2rem 1rem 1rem;
    overflow-y: auto;
  }
`;
