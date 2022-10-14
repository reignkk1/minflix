import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getPlaying, IGetMovies } from "../api";
import { makePath } from "../imgePath";

const BannerContainer = styled.div<{ bgImge: string }>`
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
  background-position: center center;
`;

const Title = styled.h1`
  font-size: 50px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;

export function Banner() {
  const { data: nowPlaying } = useQuery<IGetMovies>(
    ["movies", "nowPlaying"],
    getPlaying
  );
  return (
    <BannerContainer
      bgImge={makePath(
        nowPlaying?.results[5].backdrop_path ||
          nowPlaying?.results[5].poster_path ||
          ""
      )}
    >
      <Title>{nowPlaying?.results[5].title}</Title>
      <Overview>{nowPlaying?.results[5].overview}</Overview>
    </BannerContainer>
  );
}
