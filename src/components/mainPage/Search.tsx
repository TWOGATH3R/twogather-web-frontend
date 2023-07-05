import React, { useState } from "react";
import styled, { css } from "styled-components";
import TodayDate from "./TodayDate";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getKeyWordList } from "../../apis/queries/mainQuery";
import PopUp from "./PopUp";
import { useRecoilState } from "recoil";
import {
  Categories,
  City,
  KeyWord,
  PageNum,
  SearchText,
  Si,
} from "../../store/searchAtom";
import KeyWordInput from "./KeyWordInput";

const Search = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useRecoilState<string>(SearchText);

  const [categories, setCategories] = useRecoilState<string>(Categories);
  const [categoriesBoolean, setCategoriesBoolean] = useState<boolean>(true);

  const [city, setCity] = useRecoilState<string>(City);
  const [si, setSi] = useRecoilState<string>(Si);

  const [keyWord, setKeyWord] = useRecoilState<string>(KeyWord);
  const [pageNum, setPageNum] = useRecoilState<string>(PageNum);

  //onClick
  const categoriesBtnOnClick = () => {
    setCategoriesBoolean(true);
  };
  const localBtnOnClick = () => {
    if (city === "전체 지역") setCity("서울");
    setCategoriesBoolean(false);
    setSi("종로구");
  };

  //onChange
  const searchOnChange = (value: string) => {
    setSearchText(value);
  };

  //onSubmit
  const searchOnSubmit = (e: any) => {
    e.preventDefault();
    setPageNum("0");
    navigate(
      `/search?category=${
        categories === "모든 카테고리" ? "" : categories
      }&search=${keyWord}&storeName=${searchText}&location=${
        city === "전체 지역" ? "" : city + " " + si
      }&pagenum=0&sort=TOP_RATED,desc`
    );
  };

  return (
    <>
      <SearchContainer>
        <CategoriesInput id="categories" type="checkbox" />
        <BackgroundBox htmlFor="categories"></BackgroundBox>
        <PopUp
          categoriesBoolean={categoriesBoolean}
          city={city}
          setCity={setCity}
          si={si}
          setSi={setSi}
          categories={categories}
          setCategories={setCategories}
        />
        <DateAndSearchBox>
          <TodayDate />
          <SearchBox onSubmit={(e) => searchOnSubmit(e)}>
            <LocalCategoryBtnBox>
              <CategoriesBtn
                htmlFor="categories"
                onClick={() => categoriesBtnOnClick()}
              >
                {categories}
                <p></p>
              </CategoriesBtn>
              <LocalBtn htmlFor="categories" onClick={() => localBtnOnClick()}>
                <span>
                  {city.replace(/ /g, "").length >= 5
                    ? city
                        .replace("특별", "")
                        .replace("광역", "")
                        .replace("자치", "")
                    : city}
                </span>
                {si}
                <p></p>
              </LocalBtn>
            </LocalCategoryBtnBox>
            <SearchInputBtnBox>
              <SearchInput
                value={searchText}
                placeholder="검색어를 입력해주세요."
                onChange={(e) => searchOnChange(e.target.value)}
              />
              <SearchBtn type="submit">Search</SearchBtn>
            </SearchInputBtnBox>
          </SearchBox>
        </DateAndSearchBox>
        <KeyWordInput keyWord={keyWord} setKeyWord={setKeyWord} />
      </SearchContainer>
    </>
  );
};

const LocalCategoryBtnBox = styled.div`
  width: fit-content;
  @media (max-width: 680px) {
    width: 100%;
    label {
      width: 50%;
    }
  }
`;
const SearchInputBtnBox = styled.div`
  width: calc(100% - 260px);
  @media (max-width: 680px) {
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  padding-top: 60px;
  width: 100%;
  height: fit-content;
  @media (max-width: 1080px) {
    padding-top: 30px;
  }
`;
const DateAndSearchBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  @media (max-width: 1080px) {
    flex-direction: column;
    padding-bottom: 15px;
  }
`;

const SearchBox = styled.form`
  display: flex;
  flex: 2.8;
  height: 55px;
  @media (max-width: 1080px) {
    width: 100%;
  }
  @media (max-width: 680px) {
    flex-direction: column;
  }
`;
const CategoriesInput = styled.input`
  display: none;
  &:checked {
    & + label {
      opacity: 1;
      visibility: visible;
      & + div {
        display: flex;
      }
    }
  }
`;
const BackgroundBox = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: rgb(216 216 216 / 48%);
`;

const SearchInput = styled.input`
  outline: none;
  padding: 5px 10px;
  width: calc(100% - 100px);
  height: 55px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  /* border-left: none; */
  border-right: none;
  border-radius: 2px;
  box-sizing: border-box;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
const SearchBtn = styled.button`
  width: 100px;
  height: 55px;
  background: #0075ff;
  border: 1px solid #0075ff;
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  cursor: pointer;
`;

const CategoriesBtn = styled.label`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 55px;
  background-color: #f8f8f8;
  box-sizing: border-box;
  border: 1px solid #e7e7e7f8;
  border-radius: 2px;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.small};
  cursor: pointer;
  p {
    margin-left: 4px;
    width: 0px;
    height: 0px;
    border-top: 9px solid #b5b5b5;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
`;
const LocalBtn = styled(CategoriesBtn)`
  width: 140px;
  span {
    margin-right: 5px;
  }
`;

export default Search;
