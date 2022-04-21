import { SectionContainer } from "common/Container";
import { WithChildren } from "helpers/types";
import { NextSeo } from "next-seo";
import { ContentPageContainer, ContentSection } from "./styles";

interface ContentPageProps {
  title?: string;
  padding?: string;
}

export const ContentPage: React.FC<WithChildren<ContentPageProps>> = ({
  title,
  children,
  padding,
}) => {
  return (
    <ContentSection>
      <SectionContainer padding={padding ?? "0"} textAlign="start">
        <NextSeo title={`Element ElfiVerse - ${title}`} />
        <ContentPageContainer>{children}</ContentPageContainer>
      </SectionContainer>
    </ContentSection>
  );
};
