import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";

// API
import { getPlaying } from "../api";
import { IGetMovies } from "../api";

// Components
import { Slider } from "../Components/Slider";
import { Banner } from "../Components/Banner";
import { Overlay } from "../Components/Overlay";

// ======================================================================================================

// Style

const Main = styled.div`
  height: 100vh;
  overflow-x: hidden;
`;
const Loder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;
const SlideContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

// ======================================================================================================

function Home() {
  const { isLoading: playingLoding } = useQuery<IGetMovies>(
    ["movies", "nowPlaying"],
    getPlaying
  );

  return (
    <Main>
      {playingLoding ? (
        <Loder>로딩 중...</Loder>
      ) : (
        <>
          <Banner />
          <SlideContainer>
            <Slider />
          </SlideContainer>
          <Overlay />
        </>
      )}
    </Main>
  );
}

export default Home;
