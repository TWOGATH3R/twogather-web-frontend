import React from "react";
import { Outlet } from "react-router";
import styled from "styled-components";

const FindPw = () => {
  return (
    <FindPwContainer>
      <FindPwWrraper>
        <Title>비밀번호 찾기</Title>
        <Outlet />
      </FindPwWrraper>
    </FindPwContainer>
  );
};

const FindPwContainer = styled.div`
  padding-top: 8vh;
  height: calc(93vh - 8vh);
  font-family: "Inter";
  font-weight: 400;
`;
const FindPwWrraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  margin: 0 auto;
  box-sizing: border-box;
  width: 504px;
  height: 674px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
`;
const Title = styled.h1`
  padding-bottom: 60px;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
`;

export default FindPw;
