import { PrimaryButton } from "common/Button/styles";
import { SectionContainer } from "common/Container";
import { InternalLink } from "common/InternalLink";
import {
  ContentWrapper,
  DesktopHeader,
  EntranceContainer,
  EntranceSection,
  MobileHeader,
} from "components/Entrance/styles";
import DefconZero from "components/Text/DefconZero";
import React from "react";
import { ReactElement } from "react";

const handleClick = (): void => localStorage.setItem("hasEntered", "true");

export const Entrance = (): ReactElement => (
  <EntranceSection>
    <SectionContainer padding="0">
      <EntranceContainer>
        <DesktopHeader>
          <h1>
            wander <mark>into the</mark> elfiverse
          </h1>
        </DesktopHeader>
        <MobileHeader>
          <h1>wander into the elfiverse</h1>
        </MobileHeader>
        <ContentWrapper padding="10px">
          <p>
            The <DefconZero size="1rem">ELFIVerse</DefconZero> <br />
            is your place online with Element.
          </p>
        </ContentWrapper>
        <InternalLink href="/home" noUnderline onClick={handleClick}>
          <PrimaryButton>Enter world</PrimaryButton>
        </InternalLink>
      </EntranceContainer>
    </SectionContainer>
  </EntranceSection>
);
