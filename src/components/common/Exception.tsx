import React from "react";
import styled from "styled-components";

interface infoType {
  verson: "리뷰" | "가게검색";
}
const Exception = ({ verson }: infoType) => {
  return (
    <Text>
      {verson === "리뷰"
        ? "남겨진 리뷰가 없습니다."
        : "검색하신 결과가 없습니다."}
    </Text>
  );
};

const Text = styled.h1`
  text-align: center;
`;

export default Exception;
