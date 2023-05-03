import React from "react";
import styled from "styled-components";

const Main = () => {
  return (
    <MainContainer>
      <GBox>dfsd</GBox>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 95vh;
  background-color: red;
`;
const GBox = styled.div`
  padding: 0 10%;
  width:100%;
  background-color: aqua;
`;

export default Main;
