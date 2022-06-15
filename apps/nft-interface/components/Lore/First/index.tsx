import { LoreContainer, StyledSlider } from "components/Lore/styles";
import Image from "next/image";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import content from "components/Lore/content.json";

export const First: React.FC<{ isMeme: boolean }> = ({ isMeme }) => (
  <LoreContainer>
    <div>
      <h2>
        {isMeme ? content.meme.partOne.header : content.original.partOne.header}
      </h2>
      {isMeme
        ? content.meme.partOne.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))
        : content.original.partOne.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
    </div>
    <div>
      <StyledSlider {...settings}>
        <div>
          <Image
            src="/assets/png/Lore/First/01.png"
            alt="first"
            height={100}
            width={110}
            layout="responsive"
            quality={100}
          />
        </div>
        <div>
          <Image
            src="/assets/png/Lore/First/02.png"
            alt="second"
            height={100}
            width={110}
            layout="responsive"
            quality={100}
          />
        </div>
        <div>
          <Image
            src={`/assets/png/Lore/First/03.png`}
            alt="third"
            height={100}
            width={110}
            layout="responsive"
            quality={100}
          />
        </div>
        <div>
          <Image
            src={`/assets/png/Lore/First/04.png`}
            alt="fourth"
            height={100}
            width={110}
            layout="responsive"
            quality={100}
          />
        </div>
        <div>
          <Image
            src={`/assets/png/Lore/First/05.png`}
            alt="fifth"
            height={100}
            width={109}
            layout="responsive"
            quality={100}
          />
        </div>
      </StyledSlider>
    </div>
  </LoreContainer>
);

const settings = {
  customPaging: (i: number) => (
    <Image
      src={`/assets/png/Lore/First/0${i + 1}.png`}
      alt="current"
      height={100}
      width={109}
    />
  ),
  dots: true,
  dotsClass: "slick-dots slick-thumb",
  infinite: true,
  arrows: false,
  speed: 500,
  autoplaySpeed: 3500,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
};
