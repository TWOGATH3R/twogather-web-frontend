import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled, { css } from "styled-components";
import { getKeyWordList } from "../../apis/queries/mainQuery";
import { getKeyWordListType } from "../../apis/types/main.type";

interface infoType {
  keyWord: string;
  setKeyWord: (value: string) => void;
}
const KeyWordInput = ({ keyWord, setKeyWord }: infoType) => {
  //DB에 저장된 검색가능한 키워드 리스트 가져오기
  const { data: keyWordList } = useQuery(["keyWordList"], getKeyWordList);

  const keyWordOnClick = (value: string) => {
    if (value === keyWord) setKeyWord("");
    else setKeyWord(value);
  };

  return (
    <KeyWordBox>
      <KeyWordList>
        {keyWordList &&
          keyWordList.data.map((value: getKeyWordListType, index: number) => (
            <KeyWordItem
              active={keyWord === value.name}
              onClick={() => keyWordOnClick(value.name)}
              key={value.keywordId}
            >
              # {value.name}
            </KeyWordItem>
          ))}
      </KeyWordList>
    </KeyWordBox>
  );
};

const KeyWordBox = styled.div`
  overflow: hidden;
`;
const KeyWordList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  width: 100%;
  @media (max-width: 680px) {
    justify-content: normal;
    padding-bottom: 5px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      width: 3px;
      height: 7px;
    }
    &::-webkit-scrollbar-thumb {
      width: 3px;
      border-radius: 5px;
      background-color: #b1b1b1;
    }
    &::-webkit-scrollbar-track {
      background-color: #ffffff;
    }
  }
`;
const KeyWordItem = styled.li<{ active: boolean }>`
  margin: 0 5px;
  padding: 5px 10px;
  min-width: fit-content;
  height: 100%;
  background-color: #d9d9d9;
  border-radius: 10px;
  text-align: center;
  font-size: 0.7rem;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      background-color: #0075ff;
      color: ${({ theme }) => theme.colors.white};
    `}
`;

export default KeyWordInput;
