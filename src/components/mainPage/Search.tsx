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

  return (
    <SearchContainer>
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
          <CategoriesBtn>{categories}</CategoriesBtn>
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
const CategoriesBtn = styled.button`
  padding: 15px 10px;
  width: 130px;
  height: 100%;
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
