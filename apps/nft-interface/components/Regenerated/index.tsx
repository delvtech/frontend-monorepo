import { SectionContainer } from "common/Container";
import Image from "next/image";
import ElfGrid from "public/assets/png/Regeneration/ElfGrid.png";
import { ReactElement } from "react";
import styled from "styled-components";

export const Regenerated = (): ReactElement => (
  <SectionContainer padding="0">
    <h2>regenerated uniquely</h2>
    <ImageContainer>
      <Image src={ElfGrid} alt="regenerated uniquely" />
    </ImageContainer>
  </SectionContainer>
);

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
`;
