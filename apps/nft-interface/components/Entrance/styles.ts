import { Section } from "common/Container/styles";
import { StyledLink } from "common/InternalLink";
import {
  COLOR_GREEN_DARKEST,
  COLOR_TRANSPARENT,
  COLOR_WHITE,
  COLOR_WHITE_LIGHT,
} from "helpers/colorPalette";
import { devices } from "helpers/devices";
import styled from "styled-components";

export const EntranceSection = styled.div`
  padding: 10rem 0 6rem 0;

  ${Section} {
    padding: 0;
  }
`;

export const EntranceContainer = styled.div`
  padding: 10.625rem 70px;
  display: grid;
  grid-template-columns: auto;
  gap: 60px;
  background-color: #09282d;
  border: 3px solid ${COLOR_WHITE_LIGHT};

  h1 {
    display: flex;
    justify-content: center;
  }

  @media ${devices.mobileL} {
    padding: 6.25rem 20px;
  }

  ${StyledLink} {
    max-width: max-content;
    margin: 0 auto;
  }
`;

export const ContentWrapper = styled.div<{ padding?: string }>`
  padding: ${({ padding }) => padding ?? "20px 1rem"};
  background-color: ${COLOR_GREEN_DARKEST};
  border: 1px solid ${COLOR_WHITE_LIGHT};
  color: ${COLOR_WHITE};
  max-width: 24rem;
  width: 100%;
  margin: 0 auto;

  @media ${devices.tabletL} {
    br {
      display: none;
    }
  }
`;

export const DesktopHeader = styled.div`
  display: block;
  mark {
    font-size: 32px;
    background-color: ${COLOR_TRANSPARENT};
    color: ${COLOR_WHITE_LIGHT};
  }

  @media ${devices.macBookPro} {
    display: none;
  } ;
`;

export const MobileHeader = styled.div`
  display: none;

  @media ${devices.macBookPro} {
    display: block;
  } ;
`;
