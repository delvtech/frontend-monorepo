import { LoreContainer } from "components/Lore/styles";
import Image from "next/image";
import content from "components/Lore/content.json";

export const Third: React.FC<{ isMeme: boolean }> = ({ isMeme }) => (
  <LoreContainer>
    <div className="flex-div">
      <h2>
        {isMeme
          ? content.meme.partThree.header
          : content.original.partThree.header}
      </h2>
      {isMeme
        ? content.meme.partThree.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        : content.original.partThree.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
    </div>
    <div className="flex-div max-width">
      <Image
        src="/assets/png/Lore/Third/third.png"
        alt="third"
        height={440}
        width={440}
        quality={100}
      />
    </div>
  </LoreContainer>
);
