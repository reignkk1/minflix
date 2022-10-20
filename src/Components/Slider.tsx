import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// File
import { getMovie, getSearchMovie, getTv } from "../api";
import { makePath } from "../imgePath";
import { IGetMovies } from "../type";

// ======================================================================================================

//Style

const Loder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
`;

const SlideBox = styled.div`
  height: 500px;
  position: relative;
  top: -20px;
  border-top: 5px solid #292929;
  padding: 20px 0px;
`;

const SliderTitle = styled.h1`
  padding: 0 60px;
  margin-bottom: 50px;
  font-size: 34px;
  font-weight: 600;
  color: white;
`;

const Slide = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  width: 100%;
  position: absolute;
  padding: 0px 60px;
`;

const Item = styled(motion.div)`
  height: 360px;
  img {
    width: 100%;
    height: 100%;
  }
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

interface ISlider {
  category: string;
  type: string;
  keyword?: any;
}
// ======================================================================================================

export function Slider({ category, type, keyword }: ISlider) {
  const { isLoading, data } = useQuery<IGetMovies>(
    ["movies", category + keyword],
    type === "movie"
      ? () => getMovie(category)
      : type === "tv"
      ? () => getTv(category)
      : () => getSearchMovie(keyword)
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
    if (data) {
      if (exiting) {
        return;
      }
      const totalMovie = data?.results.length;
      const maxIndex = Math.floor(totalMovie / offset);
      setIndexIncrease(true);
      toggleExit();
      setIndex((current) => (current === maxIndex - 1 ? 0 : current + 1));
    }
  };
  const indexDown = () => {
    if (data) {
      if (exiting) {
        return;
      }
      const totalMovie = data?.results.length;
      const maxIndex = Math.floor(totalMovie / offset);
      setIndexIncrease(false);
      toggleExit();
      setIndex((current) =>
        current === 0 ? (current = maxIndex - 1) : current - 1
      );
    }
  };

  // Click 이벤트

  const boxClick = (moveiId: number, category: string) => {
    navigate(`/${type}/${category}/${moveiId}`);
  };

  const searchBoxClick = (moveiId: number) => {
    navigate(`/${type}/${moveiId}?keyword=${keyword}`);
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
      transition: { delay: 0.5, type: "tween" },
    },
  };

  return isLoading ? (
    <Loder>로딩 중...</Loder>
  ) : (
    <SlideBox>
      <SliderTitle>
        {category === "now_playing"
          ? "현재 상영중"
          : category === "popular"
          ? "인기 있는"
          : category === "top_rated"
          ? "평점 높은"
          : null}
      </SliderTitle>
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
          {data?.results
            .slice(offset * index, offset * index + offset)
            .map((item) => (
              <Item
                onClick={
                  type === "search"
                    ? () => searchBoxClick(item.id)
                    : () => boxClick(item.id, category)
                }
                variants={boxVariant}
                initial="start"
                whileHover="hover"
                transition={{ type: "tween" }}
                key={item.id + category}
                layoutId={item.id + category}
              >
                <img
                  alt="포스터"
                  src={makePath(item.poster_path, "w300")}
                ></img>
                <Info variants={infoVariant}>
                  {type === "movie" || type === "search"
                    ? item.title
                    : item.name}
                </Info>
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
