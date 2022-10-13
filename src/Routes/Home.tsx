import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getPlaying, getPopular } from "../api";
import { IGetMovies } from "../api";
import { makePath } from "../imgePath";
import { motion, AnimatePresence } from "framer-motion";
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

//=============================== Banner =========================================
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

//=============================== Slider ========================================
const SlideContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const SliderTitle = styled.h1`
  padding: 0 60px;
  margin-bottom: 50px;
  font-size: 34px;
  font-weight: 600;
  color: white;
`;

const SlideBox = styled.div`
  height: 50%;
`;

const Slide = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
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
  height: 50px;
  background-color: rgba(0, 0, 0, 0.8);
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

const ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70%;
  padding: 0px 6px;
`;

const Btn = styled.button`
  color: white;
  background: none;
  font-size: 36px;
  cursor: pointer;
  z-index: 2;
  border: none;
`;

function Home() {
  // 첫번째 슬라이더

  const { isLoading: playingLoding, data: nowPlaying } = useQuery<IGetMovies>(
    ["movies", "nowPlaying"],
    getPlaying
  );
  const [index, setIndex] = useState(0);

  // 두번째 슬라이더

  const { isLoading: popularLoding, data: nowPopular } = useQuery<IGetMovies>(
    ["movies", "nowPopular"],
    getPopular
  );
  const [index2, setIndex2] = useState(0);

  // 인덱스 증가 여부
  const [indexIncrease, setIndexIncrease] = useState(false);

  // 슬라이더 사라지는 중 여부 true or false
  const [exiting, setExiting] = useState(false);
  const toggleExit = () => setExiting((current) => !current);

  const navigate = useNavigate();

  const bigMovieInfo = useMatch("/movie/:id");

  // 인덱스 당 영화 갯수
  const offset = 6;

  // ================================== 인덱스 증가/감소 =========================================

  // 첫번째 슬라이더
  const indexUp = () => {
    if (nowPlaying) {
      if (exiting) {
        return;
      }
      const totalMovie = nowPlaying.results.length;
      const maxIndex = Math.floor(totalMovie / offset);
      setIndexIncrease(true);
      toggleExit();
      setIndex((current) => (current === maxIndex - 1 ? 0 : current + 1));
    }
  };
  const indexDown = () => {
    if (nowPlaying) {
      if (exiting) {
        return;
      }
      const totalMovie = nowPlaying?.results.length;
      const maxIndex = Math.floor(totalMovie / offset);
      setIndexIncrease(false);
      toggleExit();
      setIndex((current) =>
        current === 0 ? (current = maxIndex - 1) : current - 1
      );
    }
  };

  // 두번째 슬라이더
  const indexUp2 = () => {
    if (nowPopular) {
      if (exiting) {
        return;
      }
      const totalMovie = nowPopular.results.length;
      const maxIndex = Math.floor(totalMovie / offset);
      setIndexIncrease(true);
      toggleExit();
      setIndex2((current) => (current === maxIndex - 1 ? 0 : current + 1));
    }
  };
  const indexDown2 = () => {
    if (nowPopular) {
      if (exiting) {
        return;
      }
      const totalMovie = nowPopular.results.length;
      const maxIndex = Math.floor(totalMovie / offset);
      setIndexIncrease(false);
      toggleExit();
      setIndex2((current) =>
        current === 0 ? (current = maxIndex - 1) : current - 1
      );
    }
  };

  //==================================== 클릭 이벤트 =====================================

  const boxClick = (moveiId: number) => {
    navigate(`/movie/${moveiId}`);
  };

  const overlayClick = () => {
    navigate("/");
  };

  const movieClick =
    bigMovieInfo?.params.id &&
    nowPlaying?.results.find(
      (movie) => movie.id + "" === bigMovieInfo.params.id
    );

  //================================ 애니메이션 ==========================================

  const slideVariant = {
    start: (indexIncrease: boolean) => ({
      x: indexIncrease ? window.outerWidth + 10 : -window.outerWidth - 10,
    }),

    end: { x: 0 },

    exit: (indexIncrease: boolean) => ({
      x: indexIncrease ? -window.outerWidth - 10 : window.outerWidth + 10,
    }),
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
      {playingLoding ? (
        <Loder>로딩 중...</Loder>
      ) : (
        <>
          <Banner
            bgImge={makePath(
              nowPlaying?.results[5].backdrop_path ||
                nowPlaying?.results[5].poster_path ||
                ""
            )}
          >
            <Title>{nowPlaying?.results[5].title}</Title>
            <Overview>{nowPlaying?.results[5].overview}</Overview>
          </Banner>
          <SlideContainer>
            {
              /* 첫번째 슬라이드 박스 */

              <SlideBox>
                <SliderTitle>현재 상영중</SliderTitle>
                <AnimatePresence
                  custom={indexIncrease}
                  initial={false}
                  onExitComplete={toggleExit}
                >
                  <Slide
                    custom={indexIncrease}
                    variants={slideVariant}
                    initial="start"
                    animate="end"
                    exit="exit"
                    transition={{ type: "tween", duration: 2 }}
                    key={index}
                  >
                    {nowPlaying?.results
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
                <ButtonBox>
                  <Btn onClick={indexUp}>◀</Btn>
                  <Btn onClick={indexDown}>▶</Btn>
                </ButtonBox>
              </SlideBox>
            }

            {
              /* 두번째 슬라이드 박스 */

              <SlideBox>
                <SliderTitle>가장 인기있는</SliderTitle>
                <AnimatePresence
                  custom={indexIncrease}
                  initial={false}
                  onExitComplete={toggleExit}
                >
                  <Slide
                    custom={indexIncrease}
                    key={index2}
                    variants={slideVariant}
                    initial="start"
                    animate="end"
                    exit="exit"
                    transition={{ duration: 2 }}
                  >
                    {nowPopular?.results
                      .slice(offset * index2, offset * index2 + offset)
                      .map((movie) => (
                        <Item
                          key={movie.id}
                          bgPoster={makePath(movie.poster_path)}
                        ></Item>
                      ))}
                  </Slide>
                </AnimatePresence>
                <ButtonBox>
                  <Btn onClick={indexUp2}>◀</Btn>
                  <Btn onClick={indexDown2}>▶</Btn>
                </ButtonBox>
              </SlideBox>
            }
          </SlideContainer>

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
