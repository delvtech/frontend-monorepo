import styled from "styled-components";
import { devices } from "helpers/devices";
import { StringProps } from "helpers/types";
import { COLOR_BLACK, COLOR_YELLOW } from "helpers/colorPalette";
import { Flex } from "common/Container/styles";
import { StyledLink } from "common/InternalLink";
import { StyledAnchor } from "common/ExternalLink";

export const FixedHeader = styled.header<StringProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 4.0625rem 0 0 0;
  z-index: 10;
  background-color: ${COLOR_BLACK};
  background-image: url("/assets/svg/grid.svg");
  background-size: auto;

  img {
    cursor: pointer;
  }

  section {
    padding: 0;
  }

  @media ${devices.mobileL} {
    padding: 2rem 0 0 0;
  }
`;

export const MenuItemWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, max-content);
  gap: 48px;
  grid-gap: 48px;

  p {
    font-size: 1rem;
  }

  @media ${devices.desktopL} {
    grid-template-columns: auto;

    ${StyledLink}, ${StyledAnchor} {
      justify-content: flex-start;
    }
  }
`;

export const SVGContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 15px;
  grid-gap: 15px;

  svg {
    cursor: pointer;
    path {
      transition: 0.3s all;
    }

    &:hover {
      path {
        fill: ${COLOR_YELLOW};
      }
    }
  }

  @media ${devices.tabletL} {
    gap: 35px;
    grid-gap: 35px;
  }
`;

export const MenuItemContainer = styled(Flex)`
  @media ${devices.desktopL} {
    display: none;
  }
`;

export const MobileMenuContainer = styled(Flex)`
  display: none;
  justify-content: flex-start;

  @media ${devices.desktopL} {
    display: flex;
    width: 100%;
  }
`;
