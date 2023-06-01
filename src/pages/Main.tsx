import React from "react";
import styled from "styled-components";
import Search from "../components/mainPage/Search";
import ReviewTop10 from "../components/mainPage/ReviewTop10";
import GradeTop10 from "../components/mainPage/GradeTop10";
import LikeTop10 from "../components/mainPage/LikeTop10";

const Main = () => {
  return (
    <MainContainer>
      <Search />
      <ReviewTop10 />
      <GradeTop10 />
      <LikeTop10 />
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
