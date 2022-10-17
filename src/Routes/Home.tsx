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
`;

const SlideContainer = styled.div`
  height: 100%;
`;

// ======================================================================================================

function Home() {
  return (
    <Main>
      <Banner
        bgImge={
          "https://assets.nflxext.com/ffe/siteui/vlv3/28b69a57-cadf-43d9-8a95-e5f2e11199de/4490a703-c009-4266-8f15-938d80811812/KR-ko-20221010-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        }
        firstTitle={"다양한 영화들이 당신을 기다립니다."}
        secondTitle={"영화 그 이상의 감동"}
      />
      <SlideContainer>
        <Slider category={category.nowPlaying} type={"movie"} />
        <Slider category={category.nowPopular} type={"movie"} />
        <Slider category={category.topRate} type={"movie"} />
      </SlideContainer>
      <Overlay category={category.nowPlaying} type={"movie"} />
      <Overlay category={category.nowPopular} type={"movie"} />
      <Overlay category={category.topRate} type={"movie"} />
    </Main>
  );
}

export default Home;
