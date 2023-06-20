import React from 'react';
import styled from 'styled-components';
import StarClick from './StarClick';
import InputBtnBox from './InputBtnBox';

const ReviewEnroll = () => {
  return <InputBtnBox />;
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

// const SubmitBox = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

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
