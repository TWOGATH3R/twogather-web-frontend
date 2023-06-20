import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

const FindId = () => {
  return (
    <FindIdContainer>
      <FindIdWrraper>
        <Title>아이디 찾기</Title>
        <Outlet />
      </FindIdWrraper>
    </FindIdContainer>
  );
};

const FindIdContainer = styled.div`
  padding-top: 8vh;
  height: calc(93vh - 8vh);
  font-family: "Inter";
  font-weight: 400;
`;
const FindIdWrraper = styled.div`
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
  padding-bottom: 50px;
  font-weight: 400;
  color: #686868;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
`;

export default FindId;
