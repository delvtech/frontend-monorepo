import { Section } from "common/Container/styles";
import {
  COLOR_GREEN_LIGHT,
  COLOR_TRANSPARENT,
  COLOR_WHITE_LIGHT,
} from "helpers/colorPalette";
import { devices } from "helpers/devices";
import styled from "styled-components";

export const ContentSection = styled.section<{ padding?: string }>`
  padding: ${({ padding }) => padding ?? "13.75rem 0 0 0"};

  ${Section} {
    padding: 0;
  }
`;

export const ContentPageContainer = styled.div<{
  padding?: string;
}>`
  padding: ${({ padding }) => padding ?? "100px 125px 235px 125px"};
  background-color: #09282d;
  border: 3px solid ${COLOR_WHITE_LIGHT};

  br {
    display: block;
    content: "";
    margin-bottom: 25px;
  }

  p {
    font-size: 20px;
    font-family: "Rubik";
    font-weight: 400;
  }

  mark {
    color: ${COLOR_GREEN_LIGHT};
    background: ${COLOR_TRANSPARENT};
  }

  h1 {
    font-family: "Defcon Zero";
    font-size: 50px;
    margin-bottom: 55px;
  }

  h2 {
    margin: 40px 0;
    font-size: 40px;
    font-weight: 400;
    font-family: "Defcon Zero Condensed";
  }

  @media ${devices.tabletL} {
    padding: 80px 65px 155px 65px;

    h1 {
      font-size: 55px;
    }

    h2 {
      font-size: 30px;
    }
  }

  @media ${devices.mobileL} {
    padding: 60px 1rem 125px 1rem;

    h1 {
      font-size: 35px;
    }

    h2 {
      font-size: 25px;
    }
  } ;
`;
