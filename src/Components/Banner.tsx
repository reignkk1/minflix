import styled from "styled-components";
import { motion } from "framer-motion";

// ======================================================================================================

const BannerContainer = styled.div<{ bgImge: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  height: 100vh;
  background-color: red;
  img {
    width: 100%;
  }
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgImge});
  background-size: cover;
  background-position: center center;
`;

const Title = styled(motion.div)`
  font-size: 50px;
  font-weight: 600;

  h1 {
    margin-bottom: 34px;
    text-align: center;
    color: ${(props) => props.theme.white.lighter};
  }
`;

interface IBanner {
  bgImge: string;
  firstTitle: string;
  secondTitle: string;
}

// ======================================================================================================

export function Banner({ bgImge, firstTitle, secondTitle }: IBanner) {
  return (
    <BannerContainer bgImge={bgImge}>
      <Title>
        <h1>{firstTitle}</h1>
        <h1>{secondTitle}</h1>
      </Title>
    </BannerContainer>
  );
}
