import { SectionContainer } from "common/Container";
import { ExternalLink } from "common/ExternalLink";
import {
  Copyright,
  GridContainer,
  LogoContainer,
  LogoMobileContainer,
} from "components/Layout/Footer/styles";
import Image from "next/image";
import Logo from "public/assets/svg/logo.svg";
import { ReactElement } from "react";
import { Fade } from "react-awesome-reveal";
import {
  ELEMENT_GOV_URL,
  COUNCIL_DOC_URL,
  COUNCIL_URL,
  DISCORD_URL,
  PRIVACY_POLICY_URL,
  TOS_URL,
  TWITTER_URL,
} from "src/urls";

export const Footer = (): ReactElement => {
  return (
    <SectionContainer textAlign="start" padding="5rem 0">
      <Fade triggerOnce>
        <LogoMobileContainer>
          <Image
            src={Logo}
            alt=""
            layout="fixed"
            height="120px"
            width="272px"
          />
        </LogoMobileContainer>
        <GridContainer>
          <LogoContainer>
            <Image
              src={Logo}
              alt=""
              layout="fixed"
              height="120px"
              width="272px"
            />
          </LogoContainer>
          <div>
            <h4>Home</h4>
            <ExternalLink href="/formation">Formation</ExternalLink>
            <ExternalLink href="/mint">Minting</ExternalLink>
            <ExternalLink href="/rollout-release">
              The rollout release
            </ExternalLink>
            <ExternalLink href="/rollout-release">The Collection</ExternalLink>
          </div>
          <div>
            <h4>Governance</h4>
            <ExternalLink href={ELEMENT_GOV_URL}>
              Element Governance
            </ExternalLink>
            <ExternalLink href={COUNCIL_DOC_URL}>Documentation</ExternalLink>
            <ExternalLink href={COUNCIL_URL}>Council Framework</ExternalLink>
          </div>
          <div>
            <h4>Social</h4>
            <ExternalLink href={DISCORD_URL}>Discord</ExternalLink>
            <ExternalLink href={TWITTER_URL}>Twitter</ExternalLink>
          </div>
          <div>
            <h4>Legal</h4>
            <ExternalLink href={TOS_URL}>Terms of Service</ExternalLink>
            <ExternalLink href={PRIVACY_POLICY_URL}>
              Privacy Policy
            </ExternalLink>
          </div>
        </GridContainer>
      </Fade>
      <Fade triggerOnce>
        <Copyright>
          <p>©2022 ElementFi. All rights reserved</p>
        </Copyright>
      </Fade>
    </SectionContainer>
  );
};
