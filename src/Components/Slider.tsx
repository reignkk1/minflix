import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// File
import { getPlaying, IGetMovies } from "../api";
import { makePath } from "../imgePath";

// ======================================================================================================

//Style

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

// ======================================================================================================

export function Slider() {
  const { data: nowPlaying } = useQuery<IGetMovies>(
    ["movies", "nowPlaying"],
    getPlaying
  );
  const [index, setIndex] = useState(0);

  // 인덱스 증가 여부
  const [indexIncrease, setIndexIncrease] = useState(false);

  // 슬라이더 사라지는 중 여부 true or false
  const [exiting, setExiting] = useState(false);
  const toggleExit = () => setExiting((current) => !current);

  const navigate = useNavigate();

  // 인덱스 당 영화 갯수
  const offset = 6;

  // 인덱스 증가 / 감소

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

  // Click 이벤트

  const boxClick = (moveiId: number) => {
    navigate(`/movie/${moveiId}`);
  };

  // 애니메이션 Variants

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

  return (
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
  );
}