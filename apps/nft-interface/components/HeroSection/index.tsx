import { PrimaryButton } from "common/Button/styles";
import { SectionContainer } from "common/Container";
import { DesktopHeader, MobileHeader } from "components/Entrance/styles";
import {
  ButtonWrapper,
  ContentCenter,
  ContentWrapper,
  HeroSectionContainer,
  HeroWrapper,
} from "components/HeroSection/styles";
import Link from "next/link";
import { ReactElement } from "react";
import { Fade } from "react-awesome-reveal";
import { isFeatureEnabled } from "src/features";

export const HeroSection = (): ReactElement => {
  return (
    <HeroSectionContainer>
      <SectionContainer padding="0" textAlign="start" hasOverflow>
        <Fade triggerOnce>
          <HeroWrapper>
            <ContentWrapper>
              <ContentCenter>
                <DesktopHeader>
                  <h1>
                    wander <mark>to the</mark> elfiverse
                  </h1>
                </DesktopHeader>
                <MobileHeader>
                  <h1>wander to the elfiverse</h1>
                </MobileHeader>
                {!isFeatureEnabled("preLaunch") && (
                  <ButtonWrapper>
                    <Link passHref href="/mint">
                      <PrimaryButton as="a">Start minting</PrimaryButton>
                    </Link>
                  </ButtonWrapper>
                )}
              </ContentCenter>
            </ContentWrapper>
          </HeroWrapper>
        </Fade>
      </SectionContainer>
    </HeroSectionContainer>
  );
};
