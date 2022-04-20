import { COLOR_WHITE_LIGHT } from "helpers/colorPalette";
import { devices } from "helpers/devices";
import styled from "styled-components";

export const ContentWrapper = styled.div`
  max-height: 100%;
  width: 100%;
  background-image: url("/assets/gif/hero_image.gif");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 640px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ContentCenter = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 70px;
  gap: 70px;

  h1 {
    display: flex;
    text-align: center;
  }

  @media ${devices.tabletM} {
    padding: 0 20px;
  }
`;

export const HeroWrapper = styled.div`
  background-color: #09282d;
  border: 3px solid ${COLOR_WHITE_LIGHT};
  padding: 72px 65px;

  @media ${devices.tabletM} {
    padding: 0;
  }
`;

export const HeroSectionContainer = styled.section`
  padding: 13.75rem 0 0 0;

  min-width: 360px;

  @media ${devices.tabletM} {
    padding: 6.75rem 0 0 0;
  }
`;

export const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  max-width: max-content;
  margin: 0 auto;

  @media ${devices.tabletM} {
    grid-template-columns: auto;
    grid-gap: 30px;
    gap: 30px;

    button {
      width: 100%;
      max-width: initial;
    }
  }
`;
