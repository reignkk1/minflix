import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getTv, IGetTv } from "../api";
import { category } from "../category";
import { Banner } from "../Components/Banner";
import { Overlay } from "../Components/Overlay";
import { Slider } from "../Components/Slider";
import { makePath } from "../imgePath";

const Main = styled.div`
  height: 100vh;
`;

const SlideContainer = styled.div`
  height: 100%;
`;

function Tv() {
  const { isLoading, data } = useQuery<IGetTv>(["tv", "banner"], () =>
    getTv("popular")
  );

  return (
    <Main>
      <Banner
        bgImge={
          isLoading ? "로딩 중.." : makePath(data!.results[1].backdrop_path)
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
