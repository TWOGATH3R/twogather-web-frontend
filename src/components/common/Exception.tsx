import React from "react";
import styled from "styled-components";

interface infoType {
  text: string;
}
const Exception = ({ text }: infoType) => {
  return <Text>{text + "가 없습니다."}</Text>;
};

const Text = styled.h1`
  text-align: center;
`;

export default Exception;
