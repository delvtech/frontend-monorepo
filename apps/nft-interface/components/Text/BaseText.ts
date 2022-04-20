import { COLORS } from "helpers/colorPalette";
import styled from "styled-components";
import { FontProps } from "./types";

const BaseText = styled.text<FontProps>`
  font-size: ${({ size }) => size ?? "20px"};
  color: ${({ color }) => color && COLORS[color]};

  margin: ${({ margin }) => margin};
  &:hover {
    color: ${({ hoverColor }) => hoverColor && COLORS[hoverColor]};
  }
`;

export default BaseText;
