<div align="center">
  <h1 color:green>MINFLIX</h1>
  
  <a href="https://reignkk1.github.io/minflix/">[바로가기]</a>
  
  
</div>


<hr/>

## Front-end

 `styled-components` `react-router-dom` `framer-motion` `react-query`

<hr/>

## Page

> 1. 무비차트

- 현재 상영중인 영화, 인기있는 영화, 평점높은 영화를 실시간으로 보여줍니다.

<img width="75%" src="https://user-images.githubusercontent.com/87847136/197381386-23f58c6b-b798-4691-b2a1-37c7f14ea2e9.gif"/>

> 2. Tv 드라마

- 현재 방영중인 TV, 드라마와 평점높은 드라마를 실시간으로 보여줍니다.

<img width="75%" src="https://user-images.githubusercontent.com/87847136/197381885-eb2e419d-2fff-47a1-8c96-8be16e9fe26f.gif"/>

> 3. 검색

- 제목을 입력하여 원하는 영화를 검색합니다.
- 입력한 제목에 포함된 키워드는 모두 검색됩니다.

<img src="https://user-images.githubusercontent.com/87847136/197381912-41e12529-6d41-4bfd-a685-5c6203841191.gif"/>

<hr/>

## 리뷰

- `fetch`를 사용하여 API서버로 부터 영화 정보들을 가져오는 함수

<img src="https://user-images.githubusercontent.com/87847136/197382258-1763b5f1-36ad-4cac-9508-eeea8047a050.png"/>

- `react-query` 영화정보들을 가져와 data변수에 담습니다.

<img  src="https://user-images.githubusercontent.com/87847136/197382704-dbe9ab55-c9ad-4070-b314-84a58d341a35.png"/>

- 화면에 보여지는 인덱스 영화를 6개씩 보여줍니다.

<img src="https://user-images.githubusercontent.com/87847136/197382946-8725f7a5-130c-4f53-b442-75fa26cf50da.png"/>

- 영화는 6개씩 보여줘야 하기 때문에 API로 부터 가져온 영화정보 data 어레이를 `splice`를 사용하여 6개씩 나눠 줍니다.
- `map`을 사용하여 어레이 안에 있는 각각의 영화Item을 보여줍니다.
- index 증가/감소 할 때 마다 Slider 컴포넌트 Key 값이 바뀌므로 기존 컴포넌트는 지워지고 새로운 컴포넌트가 생성됩니다.

<img src="https://user-images.githubusercontent.com/87847136/197382957-4fd51f9b-e981-4657-ae6f-9075bf5d3f9f.png"/>

- `framer-motion`을 사용하여 인덱스가 증가/감소하면 X축을 기준으로 왼쪽/오른쪽으로 나타나거나 사라집니다.

<img src="https://user-images.githubusercontent.com/87847136/197383738-f1fa29d7-9199-47c1-94f6-1eb005d09041.png"/>


