import React from "react";
import styled from "styled-components";

const TodayDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month: string = [
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
  const dayWeek: string = [
    "Sun",
    "Mon",
    "Tues",
    "Wednes",
    "Thurs",
    "Fri",
    "Satur",
  ][date.getDay()];
  const days = date.getDate();

  return (
    <DateBox id="dateBox">
      <DaysBox>{days}</DaysBox>
      <DayWeekYearMonthBox>
        <DayWeekBox>{dayWeek}day</DayWeekBox>
        <MonthAndYearBox>
          {month}, {year}
        </MonthAndYearBox>
      </DayWeekYearMonthBox>
    </DateBox>
  );
};

const DateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
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

export default TodayDate;
