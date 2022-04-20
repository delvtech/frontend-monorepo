import { SectionContainer } from "common/Container";
import { COLOR_WHITE_LIGHT } from "helpers/colorPalette";
import { devices } from "helpers/devices";
import { ReactElement } from "react";
import styled from "styled-components";

export const OurProcess = (): ReactElement => (
  <SectionContainer padding="0">
    <h2>our process</h2>
    <ContentWrapper>
      <p>
        The launch of the Elfiverse signifies our first series of generative
        portraits of Element elves gifted to our community to commemorate the
        launch of the Element DAO.
      </p>
      <p>
        Each ELF manifests as an array of regenerative pixels and is unique,
        with a non-fungible token (NFT) stored on the Ethereum mainnet that
        attests to that uniqueness.
      </p>
      <p>
        Each Element community member may hold one of these NFTs, where the
        identity they form in the community lies within.
      </p>
      <p>
        For this initial Elfiverse launch, each ELF falls into a faction, with
        different powers, capabilities and traits. May you take them into the
        Elfiverse and float through with other community members.
      </p>
    </ContentWrapper>
  </SectionContainer>
);

const ContentWrapper = styled.div`
  padding: 55px 75px;
  background-color: #09282d;
  border: 5px solid ${COLOR_WHITE_LIGHT};

  p {
    margin: 1rem 0;
    text-align: start;
    font-family: "Rubik Medium";
  }

  @media ${devices.tabletM} {
    padding: 55px 35px;
  }

  @media ${devices.mobileL} {
    padding: 55px 1rem;
  }
`;
