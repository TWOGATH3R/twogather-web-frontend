import React from "react";
import styled, { keyframes } from "styled-components";

const LodingSpinner = () => {
  return (
    <Container>
      <Spinner>
        {[...Array(20)].map((v, i) => (
          <Item num={i + 1} key={i}></Item>
        ))}
      </Spinner>
    </Container>
  );
};

const animate = keyframes`
    0%{
        transform: scale(1);
    }80%,100%{
        transform: scale(0);
    }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Spinner = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`;
const Item = styled.span<{ num: number }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  ${(props) => props.num && `transform: rotate(calc(18deg * ${props.num}))`};
  &::after {
    content: "";
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    width: 15px;
    height: 15px;
    background-color: #b3b3b3;
    border-radius: 50%;
    animation: ${animate} 2s linear infinite;
    animation-delay: ${(props) => props.num && `calc(0.1s * ${props.num})`};
  }
`;

export default LodingSpinner;
