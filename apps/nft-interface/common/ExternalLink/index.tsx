import { COLOR_YELLOW } from "helpers/colorPalette";
import { devices } from "helpers/devices";
import { LinkProps, StringProps } from "helpers/types";
import styled from "styled-components";

export const ExternalLink: React.FC<LinkProps> = ({
  children,
  href,
  noUnderline,
}) => (
  <StyledLink href={href} target="_blank" rel="noreferrer">
    <StyledAnchor noUnderline={noUnderline}>
      <p>{children}</p>
    </StyledAnchor>
  </StyledLink>
);

const StyledLink = styled.a`
  cursor: initial;
`;

export const StyledAnchor = styled.div<StringProps>`
  p {
    display: block;
    position: relative;
    cursor: pointer;
    text-decoration: none;
    transition: all 250ms;
    max-width: max-content;
    font-family: "Defcon Zero";

    &:before {
      content: "";
      position: ${({ noUnderline }) => (noUnderline ? "initial" : "absolute")};
      left: 0px;
      right: 0px;
      bottom: -3px;
      height: 3px;
      background-color: ${COLOR_YELLOW};
      transition: transform 250ms ease-in-out;
      transform-origin: left;
      transform: scaleX(0);
    }

    &:hover {
      color: ${COLOR_YELLOW};
    }

    &:hover:before,
    &:focus:before {
      transform: scaleX(1);
    }
  }

  @media ${devices.mobileL} {
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;
