import React from "react";
import styled from "styled-components";
import Search from "../components/mainPage/Search";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <MainContainer>
      <Search />
      <Outlet/>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 1080px;
`;

export default Main;
