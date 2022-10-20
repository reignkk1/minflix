import styled from "styled-components";

// File
import { category } from "../category";
import { Banner } from "../Components/Banner";
import { Overlay } from "../Components/Overlay";
import { Slider } from "../Components/Slider";

// ======================================================================================================

const Main = styled.div`
  height: 100vh;
`;

const SlideContainer = styled.div`
  height: 100%;
`;

function Tv() {
  return (
    <Main>
      <Banner
        bgImge={
          "https://cdn.pixabay.com/photo/2022/02/21/06/17/tablet-7025862_960_720.jpg"
        }
        firstTitle={"세상의 모든 즐거움, TV 안에 있습니다."}
        secondTitle={"TV 프로그램, 드라마 그리고 수많은 콘텐츠"}
      ></Banner>
      <SlideContainer>
        <Slider category={category.nowPopular} type={"tv"} />
        <Slider category={category.topRate} type={"tv"} />
      </SlideContainer>

      <Overlay category={category.nowPopular} type={"tv"} />
      <Overlay category={category.topRate} type={"tv"} />
    </Main>
  );
}

export default Tv;
