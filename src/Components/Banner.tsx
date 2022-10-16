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

// ======================================================================================================

export function Banner() {
  return (
    <BannerContainer
      bgImge={
        "https://assets.nflxext.com/ffe/siteui/vlv3/28b69a57-cadf-43d9-8a95-e5f2e11199de/4490a703-c009-4266-8f15-938d80811812/KR-ko-20221010-popsignuptwoweeks-perspective_alpha_website_large.jpg"
      }
    >
      <Title>
        <h1>다양한 영화들이 당신을 기다립니다.</h1>
        <h1>영화 그 이상의 감동</h1>
      </Title>
    </BannerContainer>
  );
}
