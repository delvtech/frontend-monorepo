import {
  COLORS,
  COLOR_GREEN_DARKEST,
  COLOR_GREEN_LIGHT,
  COLOR_WHITE_LIGHT,
} from "helpers/colorPalette";
import { devices } from "helpers/devices";
import styled from "styled-components";

export const ButtonsContainer = styled.div`
  margin: 2rem auto;
  width: 130px;

  svg {
    rect,
    path {
      transition: 0.3s all;
    }

    &:hover {
      rect {
        fill: ${COLOR_GREEN_DARKEST};
      }
      path {
        fill: ${COLOR_GREEN_LIGHT};
      }
    }
    cursor: pointer;
  }
`;

export interface PrimaryButtonContainerProps {
  hasBorder?: boolean;
}

export const PrimaryButton = styled.button<PrimaryButtonContainerProps>`
  background-color: ${COLOR_GREEN_DARKEST};
  color: ${COLOR_GREEN_LIGHT};
  padding: 17px 60px;
  font-size: 18px;
  font-family: "Defcon Zero";
  max-width: max-content;
  margin: 0 auto;
  position: relative;
  border: ${({ hasBorder }) => hasBorder && `1px solid ${COLOR_GREEN_LIGHT}`};
  &:before {
    content: "";
    position: absolute;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    top: calc(2px / -1);
    left: calc(2px / -1);
    background: linear-gradient(
        to right,
        ${COLOR_WHITE_LIGHT} 0%,
        ${COLOR_WHITE_LIGHT} 100%
      ),
      linear-gradient(to top, ${COLOR_WHITE_LIGHT} 50%, transparent 50%),
      linear-gradient(to top, ${COLOR_WHITE_LIGHT} 50%, transparent 50%),
      linear-gradient(
        to right,
        ${COLOR_WHITE_LIGHT} 0%,
        ${COLOR_WHITE_LIGHT} 100%
      ),
      linear-gradient(
        to left,
        ${COLOR_WHITE_LIGHT} 0%,
        ${COLOR_WHITE_LIGHT} 100%
      );
    background-size: 100% 2px, 2px 200%, 2px 200%, 0% 2px, 0% 2px;
    background-position: 50% 100%, 0% 0%, 100% 0%, 100% 0%, 0% 0%;
    background-repeat: no-repeat, no-repeat;
    transition: transform 0.2s ease-in-out, background-position 0.2s ease-in-out,
      background-size 0.3s ease-in-out;
    transform: scaleX(0) rotate(0deg);
    transition-delay: 0.4s, 0.2s, 0s;
  }
  &:hover:before {
    background-size: 200% 2px, 2px 400%, 2px 400%, 55% 2px, 55% 2px;
    background-position: 50% 100%, 0% 100%, 100% 100%, 100% 0%, 0% 0%;
    transform: scaleX(1) rotate(0deg);
    transition-delay: 0s, 0.2s, 0.4s;
  }
  @media ${devices.mobileL} {
    padding: 17px 50px;
  }
`;

/**
 * Button Variants
 */
export enum ButtonVariant {
  PRIMARY = "primary",
}

/**
 * Button sizes
 */
export enum ButtonSize {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  AUTO = "AUTO",
}

const buttonSizes: Record<ButtonSize, string> = {
  [ButtonSize.SMALL]: "40px",
  [ButtonSize.MEDIUM]: "50px",
  [ButtonSize.LARGE]: "60px",
  [ButtonSize.AUTO]: "auto",
};

/**
 * Style helpers
 */
const getBorder = (variant: ButtonVariant): string => {
  switch (variant) {
    case ButtonVariant.PRIMARY:
      return COLORS.greenLight;
    default:
      return COLORS.transparent;
  }
};

const getBackground = (variant: ButtonVariant): string => {
  switch (variant) {
    case ButtonVariant.PRIMARY:
      return COLORS.black;
    default:
      return COLORS.transparent;
  }
};

export const getHeight = (size: ButtonSize): string => buttonSizes[size];

export interface ButtonStyles {
  size?: ButtonSize;
  variant?: ButtonVariant;
  sidePadding?: string;
}

export const Button = styled.button<ButtonStyles>`
  padding: 0px ${({ sidePadding = "10px" }) => sidePadding} 0px
    ${({ sidePadding = "10px" }) => sidePadding};
  width: max-content;
  height: ${({ size = ButtonSize.SMALL }) => getHeight(size)};
  background-color: ${({ variant = ButtonVariant.PRIMARY }) =>
    getBackground(variant)};
  border: 1px solid
    ${({ variant = ButtonVariant.PRIMARY }) => getBorder(variant)};
  font-family: "Defcon Zero";
  font-size: ${({}) => "14px"};
  color: ${({}) => "white"};

  &:hover {
    background-color: ${COLORS.greenDarkest};
  }
`;

export const PaddedButton = styled.button`
  background: ${COLORS.blackDark};
  border: 1px solid ${COLORS.greenLight};
  padding: 50px;
  max-height: 150px;
  width: 225px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${COLORS.greenDarkest};
  }
`;
