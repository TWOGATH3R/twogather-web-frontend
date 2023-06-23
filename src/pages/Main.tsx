import React from "react";
import styled from "styled-components";
import Search from "../components/mainPage/Search";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <MainContainer>
      <Search />
      <Outlet />
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding-bottom: 6vh;
  width: 1080px;
  @media (max-width: 1080px) {
    width: 85%;
  }
`;

export default Main;
