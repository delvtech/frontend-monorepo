import { ContentWrapper } from "components/Entrance/styles";
import styled from "styled-components";

export const CollectionContainer = styled.div`
  align-items: center;
  display: grid;
  gap: 54px;
  max-width: 44rem;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  justify-content: center;

  h1,
  h2 {
    display: flex;
    justify-content: center;
  }

  ${ContentWrapper} {
    width: 100%;
    max-width: 100%;
    padding: 20px 28px;

    .text-transition_inner {
      font-size: 14px;
      font-family: "Rubik Regular";
    }
  }
`;

export const CollectionCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  padding: 12px;

  border: 0.5px solid;
  border-radius: 6px;
  border-color: rgba(255, 255, 255, 0.3);

  background-color: rgba(247, 255, 247, 0.07);
`;
