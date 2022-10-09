import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../api";
import { IGetMovies } from "../api";
import { makePath } from "../imgePath";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Main = styled.div`
  height: 200vh;
  overflow-x: hidden;
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

const SlideBox = styled.div`
  top: -100px;
  height: 20%;
  position: relative;
`;

const Slide = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-bottom: 10px;
  gap: 20px;
  height: 100%;
  width: 100%;
  position: absolute;
`;

const Item = styled(motion.div)<{ bgPoster: string }>`
  width: 100%;
  height: 100%;
  background-color: white;
  background-image: url(${(props) => props.bgPoster});
  background-position: center center;
  background-size: cover;
`;

function Home() {
  const { isLoading, data } = useQuery<IGetMovies>(
    ["movies", "nowPlaying"],
    getMovies
  );
  console.log(data);
  const offset = 6;

  const [index, setIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  const toggleExit = () => setExiting((current) => !current);
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

  const slideVariant = {
    start: { x: window.outerWidth + 10 },
    end: { x: 0 },
    exit: { x: -window.outerWidth - 10 },
  };

  return (
    <Main>
      {isLoading ? (
        <Loder>로딩 중...</Loder>
      ) : (
        <>
          <Banner
            onClick={indexUp}
            bgImge={makePath(data?.results[5].backdrop_path || "")}
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
                transition={{ type: "tween", duration: 1.5 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((item) => (
                    <Item
                      key={item.id}
                      bgPoster={makePath(item.poster_path, "w400")}
                    />
                  ))}
              </Slide>
            </AnimatePresence>
          </SlideBox>
        </>
      )}
    </Main>
  );
}

export default Home;
