import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api";
import { IGetMovies } from "../api";
import { makePath } from "../imgePath";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

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

//Banner
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

//Slider
const SlideBox = styled.div`
  top: -100px;
  height: 100%;
  position: relative;
`;

const Slide = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 10px;
  gap: 10px;
  height: 35%;
  width: 100%;
  position: absolute;
  padding: 0px 60px;
`;

const Item = styled(motion.div)<{ bgPoster: string }>`
  width: 100%;
  height: 100%;
  background-color: white;
  background-image: url(${(props) => props.bgPoster});
  background-position: center center;
  background-size: cover;
  cursor: pointer;

  &:first-child {
    transform-origin: left center;
  }
  &:last-child {
    transform-origin: right center;
  }
`;

const Info = styled(motion.div)`
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
`;

const Overlay = styled(motion.div)`
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
`;

const MovieTitle = styled.h1`
  font-size: 34px;
  padding: 12px 0px 24px 0px;
  text-align: center;
`;

const MovieOverview = styled.div`
  padding: 0px 16px;
`;

function Home() {
  const { isLoading, data } = useQuery<IGetMovies>(
    ["movies", "nowPlaying"],
    getMovies
  );
  console.log(data);

  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  const toggleExit = () => setExiting((current) => !current);
  const offset = 6;
  const indexUp = () => {
    if (data) {
      if (exiting) {
        return;
      }
      const totalMovie = data.results.length;
      const maxIndex = Math.floor(totalMovie / offset);
      toggleExit();
      setIndex((current) => (current === maxIndex - 1 ? 0 : current + 1));
    }
  };
  const navigate = useNavigate();

  const bigMovieInfo = useMatch("/movie/:id");

  //Click Event

  const boxClick = (moveiId: number) => {
    navigate(`/movie/${moveiId}`);
  };

  const overlayClick = () => {
    navigate("/");
  };

  const movieClick =
    bigMovieInfo?.params.id &&
    data?.results.find((movie) => movie.id + "" === bigMovieInfo.params.id);
  console.log(movieClick);

  //=======================Variants==========================================

  const slideVariant = {
    start: { x: window.outerWidth + 10 },
    end: { x: 0 },
    exit: { x: -window.outerWidth - 10 },
  };
  const boxVariant = {
    start: { scale: 1 },
    hover: {
      zIndex: 99,
      scale: 1.2,
      transition: { delay: 0.5, type: "tween" },
      y: -40,
    },
  };
  const infoVariant = {
    hover: {
      opacity: 1,
      zIndex: 99,
      transition: { delay: 0.5, type: "tween" },
    },
  };
  //===========================================================================
  return (
    <Main>
      {isLoading ? (
        <Loder>로딩 중...</Loder>
      ) : (
        <>
          <Banner
            onClick={indexUp}
            bgImge={makePath(
              data?.results[5].backdrop_path ||
                data?.results[5].poster_path ||
                ""
            )}
          >
            <Title>{data?.results[5].title}</Title>
            <Overview>{data?.results[5].overview}</Overview>
          </Banner>

          <SlideBox>
            <AnimatePresence initial={false} onExitComplete={toggleExit}>
              <Slide
                variants={slideVariant}
                initial="start"
                animate="end"
                exit="exit"
                transition={{ type: "tween", duration: 2 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((item) => (
                    <Item
                      onClick={() => boxClick(item.id)}
                      variants={boxVariant}
                      initial="start"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      key={item.id}
                      bgPoster={makePath(item.poster_path, "w300")}
                      layoutId={item.id + ""}
                    >
                      <Info variants={infoVariant}>{item.title}</Info>
                    </Item>
                  ))}
              </Slide>
            </AnimatePresence>
          </SlideBox>

          {bigMovieInfo ? (
            <AnimatePresence>
              <Overlay
                onClick={overlayClick}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <MovieBox style={{ top: 110 }} layoutId={bigMovieInfo.params.id}>
                {movieClick && (
                  <>
                    <MovieImg
                      src={makePath(movieClick.backdrop_path, "w500")}
                    />
                    <MovieTitle>{movieClick.title}</MovieTitle>
                    <MovieOverview>{movieClick.overview}</MovieOverview>
                  </>
                )}
              </MovieBox>
            </AnimatePresence>
          ) : null}
        </>
      )}
    </Main>
  );
}

export default Home;
