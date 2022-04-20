import { SectionContainer } from "common/Container";
import { Flex } from "common/Container/styles";
import { First } from "components/Lore/First";
import { Second } from "components/Lore/Second";
import { GridContainer, LoreTitle } from "components/Lore/styles";
import { Third } from "components/Lore/Third";
import { COLORS } from "helpers/colorPalette";
import { devices } from "helpers/devices";
import Image from "next/image";
import { ReactElement } from "react";
import { useState } from "react";
import styled from "styled-components";

export const Lore = (): ReactElement => {
  const [isMeme, setIsMeme] = useState(false);

  return (
    <SectionContainer padding="4rem 0">
      <LoreTitle>The lore</LoreTitle>
      <Flex margin="-60px 0px 40px 0px" justify="center">
        <LoreButton onClick={() => setIsMeme(false)} margin="0px 40px 0px 0px">
          <ModeText active={!isMeme}>Original Version</ModeText>
        </LoreButton>
        <WarningContainer>
          <Image
            src="/assets/svg/icons8.png"
            height={25}
            width={25}
            alt="Meme warning icon"
          />
        </WarningContainer>
        <LoreButton onClick={() => setIsMeme(true)}>
          <ModeTextGlow active={isMeme}>Meme Version</ModeTextGlow>
        </LoreButton>
      </Flex>
      <GridContainer>
        <First isMeme={isMeme} />
        <Second isMeme={isMeme} />
        <Third isMeme={isMeme} />
      </GridContainer>
    </SectionContainer>
  );
};

const WarningContainer = styled.div`
  margin-right: 5px;
  margin-top: 4px;
`;

const ModeText = styled.div<{ active?: boolean }>`
  font-family: Defcon Zero;
  font-size: 20px;
  letter-spacing: 2px;
  color: ${({ active }) => (active ? COLORS.yellow : COLORS.white)};

  :hover {
    color: ${COLORS.yellow};
  }

  @media ${devices.tabletM} {
    font-size: 16px;
  }

  @media ${devices.mobileL} {
    font-size: 14px;
  }
`;

const ModeTextGlow = styled(ModeText)`
  animation-name: ${({ active }) => (!active ? "glowing" : "none")};
  animation-duration: 2.5s;
  animation-iteration-count: infinite;

  @keyframes glowing {
    0% {
      text-shadow: 0px 0px 0px ${COLORS.greenLight};
    }
    50% {
      text-shadow: 0px 0px 30px ${COLORS.greenLight};
    }
    100% {
      text-shadow: 0px 0px 0px ${COLORS.greenLight};
    }
  }
`;

const LoreButton = styled.button<{ margin?: string }>`
  background: none;
  padding: 0;

  margin: ${({ margin }) => margin};
`;
