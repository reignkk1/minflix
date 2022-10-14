import styled from "styled-components";

// Components
import { Slider } from "../Components/Slider";
import { Banner } from "../Components/Banner";
import { Overlay } from "../Components/Overlay";
import { category } from "../category";

// ======================================================================================================

// Style

const Main = styled.div`
  height: 100vh;
  overflow-x: hidden;
`;

const SlideContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

// ======================================================================================================

function Home() {
  return (
    <Main>
      <>
        <Banner />
        <SlideContainer>
          <Slider category={category.nowPlaying} />
          <Slider category={category.nowPopular} />
        </SlideContainer>
        <Overlay category={category.nowPlaying} />
        <Overlay category={category.nowPopular} />
      </>
    </Main>
  );
}

export default Home;
