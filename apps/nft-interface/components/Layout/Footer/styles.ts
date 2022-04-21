import { StyledAnchor } from "common/ExternalLink";
import { COLOR_GREEN } from "helpers/colorPalette";
import { devices } from "helpers/devices";
import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1.25fr 1fr 1fr 1fr;
  grid-gap: 60px;
  gap: 60px;

  h4 {
    color: ${COLOR_GREEN};
    padding-bottom: 1.625rem;
  }

  ${StyledAnchor} {
    padding: 0.7125rem 0;

    p {
      font-size: 0.875rem;
    }
  }

  @media ${devices.desktopM} {
    margin-top: 4rem;
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${devices.mobileL} {
    grid-template-columns: repeat(1, auto);

    ${StyledAnchor} {
      justify-content: initial;
    }
  }
`;

export const LogoContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 210px;
  position: relative;

  @media ${devices.desktopM} {
    display: none;
  }
`;

export const LogoMobileContainer = styled.div`
  width: 100%;
  height: 100%;
  max-height: 210px;
  position: relative;
  display: none;

  @media ${devices.desktopM} {
    display: block;
  }
`;

export const Copyright = styled.div`
  margin-top: 5.75rem;
  p {
    font-family: "Defcon Zero";
    font-weight: 400;
  }
`;
