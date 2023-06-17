import React from 'react';
import styled from 'styled-components';
import StarClick from './StarClick';
import ReviewContent from './ReviewContent';
import ReviewEnroll from './ReviewEnroll';

type ReviewOption = 'enroll' | 'road';

interface ReviewType {
  option: ReviewOption;
}

const Review = ({ option }: ReviewType) => {
  //todo props로 닉네임 별점, 날짜 등등 받기

  const Content = option === 'enroll' ? ReviewEnroll : ReviewContent;
  return (
    <Container>
      <TitleBox>
        <NameStarBox>
          <Name>우리동네 맛집대장</Name>
          <StarClick />
        </NameStarBox>
        <Score>평균 평점: 1.2</Score>
      </TitleBox>
      <Content />
      <Date>2023-06-17</Date>
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

export default Review;
