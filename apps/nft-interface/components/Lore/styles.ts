import { Flex } from "common/Container/styles";
import { COLOR_BLACK_DARK, COLOR_WHITE_LIGHT } from "helpers/colorPalette";
import { devices } from "helpers/devices";
import Slider from "react-slick";
import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  gap: 60px;
`;

export const LoreContainer = styled(Flex)`
  padding: 65px 75px;
  background-color: #09282d;
  border: 3px solid ${COLOR_WHITE_LIGHT};
  align-items: ${({ align }) => align || "flex-start"};

  h2 {
    font-size: 24px;
    font-family: "Defcon Zero";
    line-height: 140%;
    font-weight: 400;
    text-align: start;
    margin: 0 0 2rem 0;
  }

  video {
    width: 100%;
    height: 100%;
  }

  p {
    margin: 2rem 0;
    text-align: start;
  }

  .slick-slide img {
    width: 100%;
  }

  .slick-dots,
  .slick-thumb {
    display: flex !important;
    justify-content: space-between;
    position: relative;
    bottom: 0;

    li {
      height: 100%;
      opacity: 0.6;
      transition: all 0.3s;
      margin: 0 15px 0 0;
    }

    li:last-of-type {
      margin: 0;
    }

    .slick-active {
      opacity: 1;
    }

    li,
    a {
      width: 100%;

      img {
        width: inherit;
      }
    }
  }

  .flex-div {
    flex: 1 1 0%;
    margin-right: 60px;
    width: 100%;
    height: 100%;
  }

  .max-width {
    width: 100%;
    max-width: 440px;
    margin-right: 0 !important;
    margin-left: auto;
  }

  @media ${devices.tabletL} {
    flex-direction: column;

    .flex-div {
      max-width: 100%;
    }

    .max-width {
      margin-top: 3rem;
    }

    img {
      width: 100%;
    }

    h2 {
      br {
        display: none;
      }
    }
  }

  @media ${devices.desktopL} {
    padding: 25px 2rem;

    .flex-div {
      margin-right: 30px;
    }
  }

  @media ${devices.tabletL} {
    padding: 25px 1rem;
  }
`;

export const StyledSlider = styled(Slider)`
  width: 100%;
  display: grid;
`;

export const VideoContainer = styled.div`
  width: 100%;
  background-color: ${COLOR_BLACK_DARK};

  flex: 1 1 0%;
  margin-right: 60px;

  @media ${devices.tabletL} {
    margin-right: 0px;
  }
`;

export const LoreTitle = styled.h2`
  margin-top: 0;
`;
