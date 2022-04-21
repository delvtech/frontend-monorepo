import { devices } from "helpers/devices";
import { StringProps } from "helpers/types";
import styled from "styled-components";

export const Container = styled.div<StringProps>`
  position: relative;
  width: auto;
  max-width: ${({ maxWidth }) => maxWidth || "82rem"};
  margin: 0 auto;
`;

export const Flex = styled.div<{
  align?: string;
  justify?: string;
  direction?: string;
  width?: string;
  height?: string;
  margin?: string;
}>`
  display: flex;
  align-items: center;
  text-align: ${({ align }) => align};
  justify-content: ${({ justify }) => (justify ? justify : "space-between")};
  flex-direction: ${({ direction }) => direction};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin: ${({ margin }) => margin};
`;

export const HeaderWrapper = styled.div`
  position: relative;
  width: auto;
  margin-right: auto;
  margin-left: auto;
`;

export const FlexWrap = styled.div<StringProps>`
  display: flex;
  justify-content: ${({ justify }) => justify || "space-between"};
  flex-wrap: wrap;
`;

export const Section = styled("section")<StringProps>`
  display: grid;
  grid-template-columns: minmax(4rem, auto) minmax(0, 82rem) minmax(4rem, auto);
  grid-gap: calc(12rem * 0.75) 0;
  gap: calc(12rem * 0.75) 0;
  padding: ${({ padding }) => padding || "10rem 0"};
  overflow: ${({ hasOverflow }) => (!hasOverflow ? "hidden" : "initial")};
  justify-items: ${({ justifyItems }) => justifyItems};

  min-width: 350px;

  @media ${devices.tabletL} {
    grid-template-columns:
      minmax(2rem, auto) minmax(0, 82rem)
      minmax(2rem, auto);
  }

  @media ${devices.tabletM} {
    padding: ${({ padding }) => padding / 1.5 || "4.5rem 0"};
  }

  @media ${devices.mobileL} {
    display: grid;
    grid-template-columns:
      minmax(1rem, auto) minmax(0, 82rem)
      minmax(1rem, auto);
    grid-gap: 3rem 0;
    gap: 3rem 0;
  }
`;

export const SectionWrapper = styled.div`
  display: grid;
  grid-column: 2;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 3rem;
  gap: 3rem;
  grid-auto-flow: dense;

  @media ${devices.tabletM} {
    grid-template-columns: none;
    grid-gap: 0;
    gap: 0;
  }
`;

export const SectionCenter = styled.div<StringProps>`
  text-align: ${({ textAlign }) => textAlign || "center"};
  grid-column: ${({ gridColumn }) => gridColumn || "3 / 11"};
`;
