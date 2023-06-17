import React from "react";
import styled from "styled-components";
import StarClick from "./StarClick";

const ReviewEnroll = () => {
  return (
    <ReviewEnrollContainer>
      <Title>리뷰작성하기</Title>
      <EnrollBox>
        <NameStarBox>
          <Name>내닉네임</Name>
          <StarClick />
        </NameStarBox>
      </EnrollBox>
    </ReviewEnrollContainer>
  );
};

const ReviewEnrollContainer = styled.div``;
const Title = styled.h2`
  color: #606060;
`;

const EnrollBox = styled.div`
  padding: 20px 40px;
  border: 1px solid rgba(35, 35, 35, 0.1);
  border-radius: 2px;
`;
const NameStarBox = styled.div`
  display: flex;
`;
const Name = styled.span`
  margin-right: 10px;
  text-decoration: underline;
`;

export default ReviewEnroll;
