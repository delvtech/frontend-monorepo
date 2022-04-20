import { ContainerProps } from "helpers/types";
import {
  Container,
  Section,
  SectionWrapper,
  SectionCenter,
} from "common/Container/styles";

export const SectionContainer: React.FC<ContainerProps> = ({
  maxWidth,
  children,
  textAlign,
  padding,
  hasOverflow,
  id,
  justifyItems,
}) => (
  <Section
    padding={padding}
    hasOverflow={hasOverflow}
    id={id}
    justifyItems={justifyItems}
  >
    <SectionWrapper>
      <SectionCenter textAlign={textAlign} gridColumn="1/13">
        <Container maxWidth={maxWidth}>{children}</Container>
      </SectionCenter>
    </SectionWrapper>
  </Section>
);
