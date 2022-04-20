import { Countdown } from "components/Countdown";
import { HeroSection } from "components/HeroSection";
import { Lore } from "components/Lore";
import { OurProcess } from "components/OurProcess";
import { Regenerated } from "components/Regenerated";
import { ReactElement } from "react";

const Home = (): ReactElement => (
  <>
    <HeroSection />
    <Countdown />
    <Regenerated />
    <OurProcess />
    <Lore />
  </>
);

export default Home;
