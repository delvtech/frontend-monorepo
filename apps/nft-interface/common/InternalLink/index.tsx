/* eslint-disable */
import { COLOR_WHITE, COLOR_YELLOW } from "helpers/colorPalette";
import { devices } from "helpers/devices";
import { LinkProps, StringProps } from "helpers/types";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

export const InternalLink: React.FC<LinkProps> = ({
  href,
  children,
  onClick,
}) => {
  const router = useRouter();

  return (
    <Link href={href} passHref>
      <a onClick={onClick}>
        <StyledLink isActive={router.pathname === href}>
          <p>{children}</p>
        </StyledLink>
      </a>
    </Link>
  );
};

export const StyledLink = styled.div<StringProps>`
  p {
    display: block;
    position: relative;
    cursor: pointer;
    text-decoration: none;
    transition: color 250ms;
    max-width: max-content;
    color: ${({ isActive }) => (isActive ? COLOR_YELLOW : COLOR_WHITE)};
    font-family: "Defcon Zero";
    margin: 0.7125rem 0;

    &:before {
      content: "";
      position: absolute;
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
