import { LoreContainer, VideoContainer } from "components/Lore/styles";
import content from "components/Lore/content.json";

export const Second: React.FC<{ isMeme: boolean }> = ({ isMeme }) => (
  <LoreContainer align="center">
    <VideoContainer>
      {/* Ignoring this rule because the video does not have words in audio */}
      {/* eslint-disable jsx-a11y/media-has-caption  */}
      <video controls>
        <source src="/assets/video/Launch-clip.mp4" />
      </video>
    </VideoContainer>
    <div>
      <h2>
        {isMeme ? content.meme.partTwo.header : content.original.partTwo.header}
      </h2>
      {isMeme
        ? content.meme.partTwo.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        : content.original.partTwo.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
    </div>
  </LoreContainer>
);
