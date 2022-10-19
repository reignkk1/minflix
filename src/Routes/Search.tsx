import { type } from "../category";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { category } from "../category";
import { Slider } from "../Components/Slider";

import { Overlay } from "../Components/Overlay";

const SliderBox = styled.div`
  margin-top: 150px;
`;

const Keyword = styled.div`
  color: white;
  font-size: 24px;
  margin-bottom: 34px;
  padding-left: 55px;
`;

function Search() {
  const location = useLocation();

  const keyword = new URLSearchParams(location.search).get("keyword");

  return (
    <>
      <SliderBox>
        <Keyword>검색어 : {keyword}</Keyword>
        <Slider
          category={category.searchMovie}
          type={type.search}
          keyword={keyword}
        ></Slider>
      </SliderBox>
      <Overlay
        category={category.searchMovie}
        type={type.search}
        keyword={keyword}
      />
    </>
  );
}

export default Search;
