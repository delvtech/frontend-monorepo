import { NavigationButtons } from "common/Button";
import {
  FormationItem,
  FormationSliderContainer,
  ImageContainer,
  Missing,
  Progress,
  RarityContainer,
  StyledSlider,
} from "components/Formation/FormationSlider/styles";
import { Data, Formation, WithChildren } from "helpers/types";
import Image from "next/image";
import { Key, ReactNode, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

interface RarityProps {
  rarity?: string;
}

const Rarity: React.FC<RarityProps> = ({ rarity }) => (
  <RarityContainer>
    0%
    <Progress>
      <Missing rarity={rarity} />
    </Progress>
    {rarity}%
  </RarityContainer>
);

interface FormationSliderProps {
  title: string;
  content: Array<Formation>;
  index?: Key;
}

export const FormationSlider: React.FC<FormationSliderProps> = ({
  title,
  content,
}) => {
  const slider = useRef<WithChildren<Slider>>(null);
  const [slideState, setSlideState] = useState({
    slidesToShow: 3,
  });

  useEffect(() => {
    const checkCurrentSlides = () =>
      setSlideState({
        slidesToShow:
          window.innerWidth > 1300 ? 3 : window.innerWidth > 767 ? 2 : 1,
      });

    checkCurrentSlides();
    window.addEventListener("resize", checkCurrentSlides, false);
  }, []);

  const sliderChildren =
    (slider.current?.props.children as Array<ReactNode>) &&
    (slider.current?.props.children as Array<ReactNode>).length;

  return (
    <FormationSliderContainer>
      <h3>{title}</h3>
      <StyledSlider ref={slider} {...settings}>
        {content.map((item: Data, index: number) => {
          return (
            <FormationItem key={index}>
              <ImageContainer>
                <Image
                  src={`/assets/png/Formation/${title}/${item.image}.png`}
                  alt={item.image}
                  layout="fill"
                  priority
                />
              </ImageContainer>
              <Rarity rarity={item.rarity} />
              <span>{item.description}</span>
            </FormationItem>
          );
        })}
      </StyledSlider>
      {sliderChildren > slideState.slidesToShow && (
        <NavigationButtons slider={slider} />
      )}
    </FormationSliderContainer>
  );
};

const settings = {
  draggable: false,
  swipe: false,
  arrows: false,
  speed: 500,
  centerMode: true,
  autoplay: true,
  autoplaySpeed: 3500,
  slidesToShow: 3,
  centerPadding: "0px",
  infinite: true,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 2,
        centerPadding: "-20px",
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        centerPadding: "0px",
      },
    },
  ],
};
