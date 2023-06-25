import React from "react";
import styled from "styled-components";
import StarClick from "./StarClick";

const Reviews = () => {
  return (
    <Container>
      <TitleBox>
        <NameStarBox>
          <Name>우리동네 맛집대장</Name>
        </NameStarBox>
        <Score>평균 평점: 1.2</Score>
      </TitleBox>
      <ReivewContent>
        "당근케이크 평가는 이쯤 하고 커피에 대한 평가를 해보자면 커피의 가격도
        일반적인 프랜차이즈나 개인 카페에서 책정한 가격에 비해 훨씬
        비쌌다.가격표를 보니 그저 황당한 마음에 금가루라도 뿌렸나 싶은 생각이
        들더라. 그래도 아메리카노는 만들기 쉬우니까… 얼추 가격값은 하겠지
        싶었는데 아뿔싸, 나의 오만방자함이었다… 핵노맛.나는 산미가 나는 커피를
        싫어하는 편인데, 세시셀라 커피는 산미가 너무 심해서 먹는 내내 ‘이게
        7,000원이라고?’하는 생각을 했던 것 같다. 또 먹고 싶진 않다." "당근케이크
        평가는 이쯤 하고 커피에 대한 평가를 해보자면 커피의 가격도 일반적인
        프랜차이즈나 개인 카페에서 책정한 가격에 비해 훨씬 비쌌다.가격표를 보니
        그저 황당한 마음에 금가루라도 뿌렸나 싶은 생각이 들더라. 그래도
        아메리카노는 만들기 쉬우니까… 얼추 가격값은 하겠지 싶었는데 아뿔싸, 나의
        오만방자함이었다… 핵노맛.나는 산미가 나는 커피를 싫어하는 편인데,
        세시셀라 커피는 산미가 너무 심해서 먹는 내내 ‘이게 7,000원이라고?’하는
        생각을 했던 것 같다. 또 먹고 싶진 않다." "당근케이크 평가는 이쯤 하고
        커피에 대한 평가를 해보자면 커피의 가격도 일반적인 프랜차이즈나 개인
        카페에서 책정한 가격에 비해 훨씬 비쌌다.가격표를 보니 그저 황당한 마음에
        금가루라도 뿌렸나 싶은 생각이 들더라. 그래도 아메리카노는 만들기
        쉬우니까… 얼추 가격값은 하겠지 싶었는데 아뿔싸, 나의 오만방자함이었다…
        핵노맛.나는 산미가 나는 커피를 싫어하는 편인데, 세시셀라 커피는 산미가
        너무 심해서 먹는 내내 ‘이게 7,000원이라고?’하는 생각을 했던 것 같다. 또
        먹고 싶진 않다."
      </ReivewContent>
      <Date>2022-03-01</Date>
    </Container>
  );
};

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const Score = styled.div`
  color: #a1a1a1;
  font-weight: bold;
  font-size: 0.75rem;
`;

const Date = styled.div`
  font-size: 0.75rem;
  color: #878787;
`;
const NameStarBox = styled.div`
  display: flex;
`;
const Name = styled.div`
  margin-right: 10px;
  font-size: 1rem;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

const Container = styled.div`
  width: 100%;
  padding: 20px 40px;
  border: 1px solid rgba(35, 35, 35, 0.1);
  border-radius: 2px;
`;

const ReivewContent = styled.div`
  width: 100%;
  margin: 10px 0;
  padding: 0;
  border-width: 0px;
  margin-right: 10px;
  overflow: hidden;
  resize: none;
  :focus-visible {
    outline: none;
  }
`;

export default Reviews;
