import React from "react";
import styled from "styled-components";
import StarClick from "./StarClick";

const ReviewEnroll = () => {
  return (
    <Container>
      <TitleBox>
        <NameStarBox>
          <Name>우리동네 맛집대장</Name>
          <StarClick />
        </NameStarBox>
        <Score>평균 평점: 1.2</Score>
      </TitleBox>
      <Input rows={4} placeholder="리뷰를 작성해 주세요" />
      <SubmitBtnBox>
        <Date>2023-06-17</Date>
        <SubmitButton>리뷰 작성</SubmitButton>
      </SubmitBtnBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 20px 40px;
  border: 1px solid rgba(35, 35, 35, 0.1);
  border-radius: 2px;
`;
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

const SubmitBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SubmitButton = styled.button`
  width: 105px;
  background-color: #0038ff;
  color: white;
  height: 40px;
  outline: none;
  border: none;
  border-width: 0px;
  border-radius: 2px;
  :hover {
    cursor: pointer;
  }
`;
const Input = styled.textarea`
  outline: none;
  margin-top: 5px;
  padding: 10px 5px;
  width: 100%;
  border: 2px solid gray;
  border-radius: 5px;
  margin-right: 10px;
  overflow: hidden;
  resize: none;
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

export default ReviewEnroll;
