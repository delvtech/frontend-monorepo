import styled from "styled-components";
import { devices } from "helpers/devices";
import { Section } from "common/Container/styles";
import {
  COLOR_BLACK,
  COLOR_BLACK_DARK,
  COLOR_TRANSPARENT,
  COLOR_WHITE,
  COLOR_WHITE_LIGHT,
} from "helpers/colorPalette";

const TabButtons = styled.div`
  font-size: 14px;
  font-family: "Defcon Zero";
  cursor: pointer;
  position: relative;
  padding: 12.5px 1rem;
  background-color: ${COLOR_TRANSPARENT};
  border: 3px solid ${COLOR_WHITE};
  margin: 2px 0;
  transition: 0.3s background-color;

  &:hover {
    background-color: ${COLOR_BLACK_DARK};
  }
`;

export const FormationContainer = styled.div`
  background-color: ${COLOR_BLACK};
  border: 3px solid ${COLOR_WHITE_LIGHT};
  padding: 90px 195px;

  h2 {
    font-size: 80px;
    margin-bottom: 70px;
  }

  @media (max-width: 1300px) {
    padding: 90px 145px;

    h2 {
      font-size: 55px;
    }
  }

  ${TabButtons} {
    padding: 12.5px 2rem;
    font-size: 1rem;
    height: 59px;
    margin-right: 33px;
  }

  @media ${devices.desktopM} {
    padding: 60px;

    .input-container {
      flex-direction: column;
      align-items: flex-start;

      ${TabButtons} {
        margin-top: 2rem;
      }
    }
  }

  @media ${devices.mobileL} {
    padding: 60px 20px;

    h2 {
      font-size: 30px;
      text-align: center;
    }
  }
`;

export const FormationSection = styled.div`
  ${Section} {
    grid-template-columns: minmax(0rem, auto) minmax(0, 82rem) minmax(
        0rem,
        auto
      );
  }
`;
