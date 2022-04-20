import { Flex } from "common/Container/styles";
import { COLOR_BLACK, COLOR_WHITE } from "helpers/colorPalette";
import { devices } from "helpers/devices";
import { StringProps } from "helpers/types";
import Slider from "react-slick";
import styled from "styled-components";

export const FormationSliderContainer = styled.div`
  margin: 80px 0;

  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    font-family: "Defcon Zero";
  }

  @media ${devices.mobileL} {
    h3 {
      text-align: center;
    }
  } ;
`;

export const RarityContainer = styled(Flex)`
  font-family: "Defcon Zero";
  font-size: 14px;
  margin: 20px 0 35px 0;
`;

export const FormationItem = styled.div`
  width: 235px !important;
  height: 100%;
`;

export const ImageContainer = styled.div`
  width: 230px;
  height: 230px;
  position: relative;
`;

export const Progress = styled.div`
  background: ${COLOR_WHITE};
  height: 11px;
  width: 100%;
  margin: 0 6px;
  border: 3px solid ${COLOR_WHITE};
  position: relative;
`;

export const Missing = styled.div<StringProps>`
  background: ${COLOR_BLACK};
  position: absolute;
  right: 0;
  height: 6px;
  width: ${({ rarity }) => rarity && `calc(100% - (100% * ${rarity} / 100))`};
`;

export const StyledSlider = styled(Slider)`
  display: grid;
  width: 99%;
  margin: 60px auto;

  span {
    font-family: "Defcon Zero Condensed Italic";
    font-size: 12px;
  }

  @media (max-width: 1300px) {
    text-align: center;
  }
`;
