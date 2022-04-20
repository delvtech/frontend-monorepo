import { ContentWrapper } from "components/Entrance/styles";
import { COLOR_GREEN_LIGHT } from "helpers/colorPalette";
import { devices } from "helpers/devices";
import styled from "styled-components";

export const MintContainer = styled.div`
  align-items: center;
  display: grid;
  gap: 40px;
  max-width: 44rem;
  text-align: center;
  width: 100%;
  margin: 0 auto;

  h1,
  h2 {
    display: flex;
    justify-content: center;
  }

  h1 {
    margin: 0;
    font-size: 3.75rem;

    @media ${devices.tabletL} {
      font-size: 2.75rem;
    }

    @media ${devices.tabletM} {
      font-size: 2rem;
    }
  }

  ${ContentWrapper} {
    width: 100%;
    max-width: 100%;
    padding: 20px 28px;

    .text-transition_inner {
      font-size: 14px;
      font-family: "Rubik Regular";
    }

    @media ${devices.tabletM} {
      padding: 20px 1rem;
    }
  }
`;

export const ProgressContainer = styled.div`
  h2 {
    color: ${COLOR_GREEN_LIGHT};
    font-family: "Defcon Zero";
    font-size: 18px;
    margin: 0;
  }
`;
