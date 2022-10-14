import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// File
import { getPlaying, IGetMovies } from "../api";
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
`;
const MovieBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 40vw;
  height: 80vh;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 25px;
  overflow: hidden;
  left: 0;
  right: 0;
  margin: 0 auto;
`;
const MovieImg = styled.img`
  width: 100%;
  height: 50%;
`;
const MovieTitle = styled.h1`
  font-size: 34px;
  padding: 12px 0px 24px 0px;
  text-align: center;
`;
const MovieOverview = styled.div`
  padding: 0px 16px;
`;

// ======================================================================================================

export function Overlay() {
  const { data: nowPlaying } = useQuery<IGetMovies>(
    ["movies", "nowPlaying"],
    getPlaying
  );
  const navigate = useNavigate();
  const bigMovieInfo = useMatch("/movie/:id");

  const overlayClick = () => {
    navigate("/");
  };
  const movieClick =
    bigMovieInfo?.params.id &&
    nowPlaying?.results.find(
      (movie) => movie.id + "" === bigMovieInfo.params.id
    );

  return bigMovieInfo ? (
    <AnimatePresence>
      <OverlayContainer
        onClick={overlayClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <MovieBox style={{ top: 110 }} layoutId={bigMovieInfo?.params.id}>
        {movieClick && (
          <>
            <MovieImg src={makePath(movieClick.backdrop_path, "w500")} />
            <MovieTitle>{movieClick.title}</MovieTitle>
            <MovieOverview>{movieClick.overview}</MovieOverview>
          </>
        )}
      </MovieBox>
    </AnimatePresence>
  ) : null;
}
