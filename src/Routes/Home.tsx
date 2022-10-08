import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api";
import { IGetMovies } from "../api";
import { makePath } from "../imgePath";

const Main = styled.div`
  height: 200vh;
`;

const Loder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const Banner = styled.div<{ bgImge: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  height: 100vh;
  background-color: red;
  img {
    width: 100%;
  }
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bgImge});
  background-size: cover;
`;

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;

function Home() {
  const { isLoading, data } = useQuery<IGetMovies>(
    ["movies", "nowPlaying"],
    getMovies
  );

  return (
    <Main>
      {isLoading ? (
        <Loder>로딩 중...</Loder>
      ) : (
        <>
          <Banner bgImge={makePath(data?.results[1].backdrop_path || "")}>
            <Title>{data?.results[1].title}</Title>
            <Overview>{data?.results[1].overview}</Overview>
          </Banner>
        </>
      )}
    </Main>
  );
}

export default Home;
