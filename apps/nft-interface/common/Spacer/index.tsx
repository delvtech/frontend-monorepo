import styled from "styled-components";

export const Spacer = styled.div<{ size?: string }>`
  margin: ${({ size = "10px" }) => size}};
`;
