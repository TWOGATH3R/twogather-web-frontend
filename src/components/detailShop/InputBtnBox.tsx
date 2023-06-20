import React from 'react';
import styled from 'styled-components';

type Props = {};

const InputBtnBox = (props: Props) => {
  return (
    <Container>
      <Input rows={4} placeholder='리뷰를 작성해 주세요' />
      <SubmitButton>리뷰 작성</SubmitButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin: 10px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const SubmitButton = styled.button`
  width: 105px;
  background-color: #0038ff;
  color: white;
  height: 40px;
  border-width: 0px;
  border-radius: 2px;
  :hover {
    cursor: pointer;
  }
`;
const Input = styled.textarea`
  width: 100%;
  padding: 0 5px;
  border-width: 0px;
  margin-right: 10px;
  overflow: hidden;
  resize: none;
`;

export default InputBtnBox;
