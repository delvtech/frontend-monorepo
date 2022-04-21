import { SectionContainer } from "common/Container";
import { ContentWrapper, CountdownDate } from "components/Countdown/styles";
import { ReactElement } from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import { releaseDate } from "src/constants";

export const Countdown = (): ReactElement => (
  <SectionContainer padding="10rem 0 5rem 0" maxWidth="38.5rem">
    <ContentWrapper>
      <Fade triggerOnce>
        <h3>First drop hits</h3>
        <Zoom triggerOnce>
          <CountdownDate>{releaseDate.format("MMMM Do YYYY")}</CountdownDate>
        </Zoom>
      </Fade>
    </ContentWrapper>
  </SectionContainer>
);
