import { SectionContainer } from "common/Container";
import { Collection } from "components/Collection/Collection";
import { NextSeo } from "next-seo";
import React from "react";
import { getMintHistory } from "src/elfiverse/getMintHistory";
import { DayCount } from "src/types";
import { getCurrentMintCount } from "src/util/getCurrentMintCount";

interface CollectionPageProps {
  mintHistory: Array<DayCount>;
  mintCount: number;
}

export const CollectionPage: React.FC<CollectionPageProps> = ({
  mintHistory,
  mintCount,
}) => (
  <SectionContainer padding="8rem 0">
    <NextSeo title={`Element ElfiVerse - Collection`} />
    <Collection mintHistory={mintHistory} mintCount={mintCount} />
  </SectionContainer>
);

export async function getStaticProps(): Promise<{
  props: {
    mintCount: number;
    mintHistory: {
      date: string;
      count: number;
    }[];
  };
  revalidate: number;
}> {
  const mintCount = await getCurrentMintCount();
  const mintHistory = await getMintHistory();

  return {
    props: {
      mintCount,
      mintHistory,
    },
    revalidate: 60, // seconds
  };
}

export default CollectionPage;
