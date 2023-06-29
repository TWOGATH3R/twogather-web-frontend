import React from "react";
import styled from "styled-components";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";

interface infoType {
    count:number
}
const Star = ({count}:infoType) => {

  return (
    <StarClickContainer>
      {[...Array(5)].map((v, index) => (
        <StarBox key={index}>
          {count === index + 0.5 ? (
            <>
              <HalfStar />
            </>
          ) : count >= index + 1 ? (
            <>
              <FillStar />
            </>
          ) : null}
        </StarBox>
      ))}
    </StarClickContainer>
  );
};

const StarClickContainer = styled.div`
  display: flex;
  input {
    display: none;
  }
`;
const StarBox = styled.div`
  position: relative;
  label {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    cursor: pointer;
    &:nth-child(3) {
      right: 0;
      background-color: transparent;
    }
    &:nth-child(2) {
      left: 0;
      background-color: transparent;
    }
  }
`;
const StarIcon = styled(BsStar)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.yellow};
`;
const HalfStar = styled(BsStarHalf)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.yellow};
`;
const FillStar = styled(BsStarFill)`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.yellow};
`;

export default Star;
