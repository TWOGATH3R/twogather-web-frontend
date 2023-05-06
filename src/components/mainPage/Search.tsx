import React, { useState } from "react";
import styled from "styled-components";

const Search = () => {
  const [categories, setCategories] = useState<string>("All categories");

  const date = new Date();
  const year = date.getFullYear();
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][date.getMonth()];
  const dayWeek = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur"][
    date.getDay()
  ];
  const days = date.getDate();

  const CategoriesMenuList = [
    "양식",
    "한식",
    "일식",
    "패스트푸드",
    "중식",
    "치킨",
    "아시아퓨전",
    "피자",
    "레스토랑",
    "분식",
    "카페",
    "기타",
  ];

  const categoriesOnClick = (value: string) => {
    setCategories(value);
  };

  return (
    <>
      <SearchContainer>
        <CategoriesInput id="categories" type="checkbox" />
        <BackgroundBox htmlFor="categories">
          <CategoriesList>
            {CategoriesMenuList.map((value) => (
              <CategoriesItem
                key={value}
                onClick={() => categoriesOnClick(value)}
              >
                <span>{value}</span> <span>&gt;</span>
              </CategoriesItem>
            ))}
          </CategoriesList>
        </BackgroundBox>
        <DateAndSearchBox>
          <DateBox>
            <DaysBox>{days}</DaysBox>
            <DayWeekYearMonthBox>
              <DayWeekBox>{dayWeek}day</DayWeekBox>
              <MonthAndYearBox>
                {month}, {year}
              </MonthAndYearBox>
            </DayWeekYearMonthBox>
          </DateBox>
          <SearchBox>
            <CategoriesBtn htmlFor="categories">{categories}</CategoriesBtn>
            <SearchInput placeholder="지역을 선택해주세요." />
            <SearchBtn>Search</SearchBtn>
          </SearchBox>
        </DateAndSearchBox>
        <KeyWordBox>
          <KeyWordList>
            <KeyWordItem># 분위기있는</KeyWordItem>
            <KeyWordItem># 럭셔리한</KeyWordItem>
            <KeyWordItem># 친절한</KeyWordItem>
            <KeyWordItem># 아기자기한</KeyWordItem>
          </KeyWordList>
        </KeyWordBox>
      </SearchContainer>
    </>
  );
};

const SearchContainer = styled.div`
  padding-top: 60px;
  width: 100%;
  height: fit-content;
`;
const DateAndSearchBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  width: 100%;
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
`;
const DaysBox = styled.div`
  padding-right: 15px;
  font-size: 4rem;
  font-weight: bold;
`;
const DayWeekYearMonthBox = styled.div`
  font-size: 1.5rem;
`;
const DayWeekBox = styled.div`
  text-align: center;
`;
const MonthAndYearBox = styled.div`
  color: #8f8f8f;
`;

const SearchBox = styled.div`
  width: calc(100% - 180px);
  height: 48px;
`;
const CategoriesInput = styled.input`
  display: none;
  &:checked {
    & + label {
      opacity: 1;
      visibility: visible;
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
  width: 100vw;
  height: 100%;
  background-color: rgb(216 216 216 / 48%);
`;
const CategoriesList = styled.ul`
  list-style: none;
  position: absolute;
  top: calc(50% - 7vh);
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  padding: 15px 20px;
  width: 250px;
  height: 350px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(0, 0, 0, 0.11);
  border-radius: 2px;
  color: #535353;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1px;
    height: 90%;
    background-color: #dedede;
  }
`;
const CategoriesItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 7px 10px;
  width: calc(50% - 20px);
  height: fit-content;
  border-bottom: 1px solid #dedede;
  cursor: pointer;
`;
const CategoriesBtn = styled.label`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 100%;
  background-color: #f8f8f8;
  border: none;
  border-radius: 2px;
  font-size: 1rem;
  cursor: pointer;
`;
const SearchInput = styled.input`
  outline: none;
  padding: 5px 10px;
  width: calc(100% - 230px);
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-left: none;
  border-right: none;
  border-radius: 2px;
  box-sizing: border-box;
  font-size: ${({theme})=>theme.fontSizes.base};
`;
const SearchBtn = styled.button`
  width: 100px;
  height: 100%;
  background: #0075ff;
  border: 1px solid #ffffff;
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  cursor: pointer;
`;

const KeyWordBox = styled.div``;
const KeyWordList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
`;
const KeyWordItem = styled.li`
  margin: 0 5px;
  padding: 3px 10px;
  background-color: #d9d9d9;
  border-radius: 10px;
  font-size: 0.7rem;
  cursor: pointer;
`;

export default Search;
