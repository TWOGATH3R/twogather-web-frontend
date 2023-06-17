import React from 'react';
import styled from 'styled-components';
import StarClick from './StarClick';

const ReviewEnroll = () => {
  return (
    <ReviewEnrollContainer>
      <Title>리뷰작성하기</Title>
      <EnrollBox>
        <NameStarBox>
          <Name>내닉네임</Name>
          <StarClick />
        </NameStarBox>
        <Score>평균 평점: 3.2</Score>
        {/* /버튼 +  input박스/ */}
        <SubmitBox>
          {/* input+날짜박스 */}
          <InputBtnBox>
            <Input rows={4} placeholder='리뷰를 작성해 주세요' />
            <SubmitButton>전송</SubmitButton>
          </InputBtnBox>
          <Date>2023-06-17</Date>
        </SubmitBox>
      </EnrollBox>
    </ReviewEnrollContainer>
  );
};

const ReviewEnrollContainer = styled.div`
  width: 100%;
`;
const Score = styled.div`
  margin: 0 auto;
  color: #a1a1a1;
  font-weight: bold;
  font-size: 0.75rem;
`;
const Title = styled.h2`
  color: #606060;
`;
const InputBtnBox = styled.div`
  display: flex;
  margin: 10px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const SubmitBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const SubmitButton = styled.button`
  width: 105px;
  background-color: #0038ff;
  color: white;
  height: 40px;
  border-width: 0px;
  border-radius: 2px;
`;
const Date = styled.div`
  font-size: 0.75rem;
  color: #878787;
`;
const EnrollBox = styled.div`
  height: 130px;
  padding: 20px 40px;
  border: 1px solid rgba(35, 35, 35, 0.1);
  border-radius: 2px;
`;
const NameStarBox = styled.div`
  display: flex;
`;
const Name = styled.div`
  margin-right: 10px;
  font-size: 1rem;
  text-decoration: underline;
  text-underline-offset: 4px;
`;
const Input = styled.textarea`
  width: 100%;
  padding: 0 5px;
  border-width: 0px;
  margin-right: 10px;
  overflow: hidden;
  resize: none;
`;
export default ReviewEnroll;
