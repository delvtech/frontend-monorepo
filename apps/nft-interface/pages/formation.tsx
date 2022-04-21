import { SectionContainer } from "common/Container";
import { Formation } from "components/Formation";
import { NextSeo } from "next-seo";
import { ReactElement } from "react";

const FormationPage = (): ReactElement => (
  <SectionContainer padding="8rem 0">
    <NextSeo title="Element ElfiVerse - Formation" />
    <Formation />
  </SectionContainer>
);

export default FormationPage;
