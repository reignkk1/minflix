import styled from "styled-components";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// File
import {
  getMovie,
  getMovieDetail,
  getMovieVideo,
  getSearchMovie,
  getTv,
  getTvDetail,
  getTvVideo,
  IGetDetail,
  IGetMovies,
  IGetVideo,
} from "../api";
import { makePath } from "../imgePath";

// ======================================================================================================

//Style

const OverlayContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 1;
`;
const MovieBox = styled(motion.div)<{ scrollY: number }>`
  position: absolute;
  width: 40vw;
  height: 80vh;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 25px;
  overflow: hidden;
  top: ${(props) => props.scrollY + 50}px;
  left: 0;
  right: 0;
  margin: 0 auto;
  z-index: 2;
`;
const MovieImg = styled.div<{ movieImg: string }>`
  width: 100%;
  height: 50%;
  background-image: url(${(props) => props.movieImg});
  background-position: center center;
  background-size: cover;
`;

const MovieInfo = styled.div`
  padding: 24px;
`;
const MovieTitle = styled.h1`
  font-size: 34px;
  padding: 12px 0px 24px 0px;
`;
const MovieGenres = styled.div`
  margin-bottom: 5px;
`;
const MovieDate = styled.div`
  margin-bottom: 5px;
`;
const MovieTimeLine = styled.div`
  margin-bottom: 5px;
`;
const MovieTagLine = styled.div`
  margin-bottom: 5px;
`;

interface IOverlay {
  category: string;
  type: string;
  keyword?: string | null;
}
// ======================================================================================================

export function Overlay({ category, type, keyword }: IOverlay) {
  const bigMovieInfo = useMatch(`/${type}/${category}/:id`);
  const searchMovieInfo = useMatch(`/${type}/:id`);

  const { data } = useQuery<IGetMovies>(
    [type, category + keyword],
    type === "movie"
      ? () => getMovie(category)
      : type === "tv"
      ? () => getTv(category)
      : () => getSearchMovie(keyword!)
  );

  const { data: detail } = useQuery<IGetDetail>(
    [`${type}Detail`, bigMovieInfo?.params.id || searchMovieInfo?.params.id],
    type === "movie"
      ? () => getMovieDetail(bigMovieInfo?.params.id)
      : type === "tv"
      ? () => getTvDetail(bigMovieInfo?.params.id)
      : () => getMovieDetail(searchMovieInfo?.params.id)
  );

  const { data: video } = useQuery<IGetVideo>(
    [`${type}Video`, bigMovieInfo?.params.id || searchMovieInfo?.params.id],
    type === "movie"
      ? () => getMovieVideo(bigMovieInfo?.params.id)
      : type === "tv"
      ? () => getTvVideo(bigMovieInfo?.params.id)
      : () => getMovieVideo(searchMovieInfo?.params.id)
  );

  const navigate = useNavigate();
  const overlayClick = () => {
    type === "movie"
      ? navigate("/")
      : type === "tv"
      ? navigate("/tv")
      : navigate(`/search?keyword=${keyword}`);
  };
  const movieClick =
    (bigMovieInfo?.params.id || searchMovieInfo?.params.id) &&
    data?.results.find(
      (movie) =>
        movie.id + "" ===
        (bigMovieInfo?.params.id || searchMovieInfo?.params.id)
    );

  const { scrollY } = useScroll();

  return bigMovieInfo || searchMovieInfo ? (
    <AnimatePresence>
      <OverlayContainer
        onClick={overlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <MovieBox
        key={
          type === "search"
            ? searchMovieInfo?.params.id + category
            : bigMovieInfo?.params.id + category
        }
        scrollY={scrollY.get()}
        layoutId={
          type === "search"
            ? searchMovieInfo?.params.id + category
            : bigMovieInfo?.params.id + category
        }
      >
        {movieClick && (
          <>
            {video?.results[0] ? (
              <iframe
                width="100%"
                height="400px"
                src={`https://www.youtube-nocookie.com/embed/${video?.results[0].key}?controls=1`}
                title="YouTube video player"
              ></iframe>
            ) : (
              <MovieImg
                movieImg={makePath(
                  movieClick.backdrop_path || movieClick.poster_path,
                  "w500"
                )}
              />
            )}

            <MovieInfo>
              <MovieTitle>
                {type === "movie"
                  ? movieClick.title
                  : type === "tv"
                  ? movieClick.name
                  : movieClick.title}
              </MovieTitle>
              <MovieGenres>
                장르 :{" "}
                {detail?.genres.map((gen) => (
                  <span key={gen.name}>{gen.name + " "}</span>
                ))}
              </MovieGenres>
              <MovieDate>
                개봉일 :{" "}
                {type === "movie"
                  ? movieClick.release_date
                  : type === "tv"
                  ? movieClick.first_air_date
                  : movieClick.release_date}
              </MovieDate>
              <MovieTimeLine>
                {type === "movie" ? `${detail?.runtime} 분` : null}
              </MovieTimeLine>
              <MovieTagLine>
                {type === "movie" ? detail?.tagline : detail?.overview}
              </MovieTagLine>
            </MovieInfo>
          </>
        )}
      </MovieBox>
    </AnimatePresence>
  ) : null;
}
