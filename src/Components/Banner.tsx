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
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9)),
    url(${(props) => props.bgImge});
  background-size: cover;
  background-position: center center;
`;

const Title = styled(motion.h1)`
  font-size: 50px;
  font-weight: 600;
`;

// ======================================================================================================

export function Banner() {
  return (
    <BannerContainer
      bgImge={
        "https://assets.nflxext.com/ffe/siteui/vlv3/28b69a57-cadf-43d9-8a95-e5f2e11199de/4490a703-c009-4266-8f15-938d80811812/KR-ko-20221010-popsignuptwoweeks-perspective_alpha_website_large.jpg"
      }
    >
      <Title>다양한 영화들을 만나보세요.</Title>
    </BannerContainer>
  );
}
