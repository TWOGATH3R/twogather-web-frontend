import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  color?: string;
  bgColor?: string;
}

const Button = ({
  children,
  onClick,
  color = 'white',
  bgColor = '#4d74ff',
}: Props) => {
  return (
    <MyButton color={color} bgColor={bgColor}>
      {children}
    </MyButton>
  );
};
export default Button;

const MyButton = styled.button<{ color: string; bgColor: string }>`
  box-sizing: border-box;
  width: 97px;
  height: 30px;
  background: ${props => props.bgColor};
  color: ${props => props.color};
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  :hover {
    cursor: pointer;
  }
`;
