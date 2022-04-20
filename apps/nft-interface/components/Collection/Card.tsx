import { Spacer } from "common/Spacer";
import { COLORS } from "helpers/colorPalette";
import { WithChildren } from "helpers/types";
import React from "react";
import styled from "styled-components";

const Card: React.FC<WithChildren<{ title: string }>> = ({
  title,
  children,
}) => (
  <CardContainer>
    <h3>{title}</h3>
    <Spacer size="4px" />
    <svg width="100%" height={1}>
      <line x1="0" y1="0" x2="1000" y2="0" stroke={COLORS.whiteLight} />
    </svg>
    {children}
    <Spacer size="4px" />
  </CardContainer>
);

const CardContainer = styled.div`
  background-color: rgba(247, 255, 247, 0.07);

  padding: 24px;
  margin: 5px;

  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: fit-content;
`;

export default Card;
