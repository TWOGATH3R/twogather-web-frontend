import React from "react";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import styled from "styled-components";

interface childProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const StarClick = ({ count, setCount }: childProps) => {
  const starOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = e.target.defaultValue;
    setCount(Number(num) / 2);
  };

  const rating = [
    [1, 2],
    [3, 4],
    [5, 6],
    [7, 8],
    [9, 10],
  ];

  return (
    <>
      <StarClickContainer>
        {[...Array(10)].map((v, index) => (
          <input
            key={index}
            type="radio"
            id={`rating${index + 1}`}
            name="rating"
            value={index + 1}
            onChange={(e) => starOnChange(e)}
          />
        ))}
        {[...Array(5)].map((v, index) => (
          <StarBox key={index}>
            {count === index + 0.5 ? (
              <>
                <HalfStar />
                <label className="half" htmlFor={`rating${rating[index][0]}`} />
                <label className="half" htmlFor={`rating${rating[index][1]}`} />
              </>
            ) : count >= index + 1 ? (
              <>
                <FillStar />
                <label className="half" htmlFor={`rating${rating[index][0]}`} />
                <label className="half" htmlFor={`rating${rating[index][1]}`} />
              </>
            ) : (
              <>
                <Star />
                <label className="half" htmlFor={`rating${rating[index][0]}`} />
                <label className="half" htmlFor={`rating${rating[index][1]}`} />
              </>
            )}
          </StarBox>
        ))}
      </StarClickContainer>
    </>
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
const Star = styled(BsStar)`
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

export default StarClick;
