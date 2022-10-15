import styled from "styled-components";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// File
import { getMovie, IGetMovies } from "../api";
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
const MovieTitle = styled.h1`
  font-size: 34px;
  padding: 12px 0px 24px 0px;
  text-align: center;
`;
const MovieOverview = styled.div`
  padding: 0px 16px;
`;

interface ICategory {
  category: string;
}
// ======================================================================================================

export function Overlay({ category }: ICategory) {
  const { data } = useQuery<IGetMovies>(["movies", category], () =>
    getMovie(category)
  );
  const navigate = useNavigate();
  const bigMovieInfo = useMatch(`/movie/${category}/:id`);

  const overlayClick = () => {
    navigate("/");
  };
  const movieClick =
    bigMovieInfo?.params.id &&
    data?.results.find((movie) => movie.id + "" === bigMovieInfo.params.id);

  const { scrollY } = useScroll();

  return bigMovieInfo ? (
    <AnimatePresence>
      <OverlayContainer
        onClick={overlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <MovieBox
        scrollY={scrollY.get()}
        layoutId={bigMovieInfo?.params.id + category}
      >
        {movieClick && (
          <>
            <MovieImg movieImg={makePath(movieClick.backdrop_path, "w500")} />
            <MovieTitle>{movieClick.title}</MovieTitle>
            <MovieOverview>{movieClick.overview}</MovieOverview>
          </>
        )}
      </MovieBox>
    </AnimatePresence>
  ) : null;
}
