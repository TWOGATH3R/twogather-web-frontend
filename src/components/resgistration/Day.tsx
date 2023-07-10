import React from "react";
import styled from "styled-components";
import { IShopInputItem } from "../../apis/api";

type Props = {
  adminBoolean?: boolean;
  dayItem: IShopInputItem;
  index: number;
  onClickDay: (day: any, idx: number, index: number) => void;
};

export default function Day({
  adminBoolean,
  dayItem,
  index,
  onClickDay,
}: Props) {
  return (
    <ShopDayUl>
      {dayItem.week.map((day, idx) => (
        <React.Fragment key={idx}>
          {day.status === true ? (
            <ShopDayList
              style={{ backgroundColor: "#FFB5B5" }}
              onClick={() => adminBoolean && onClickDay(day, idx, index)}
            >
              {day.day}
            </ShopDayList>
          ) : (
            <ShopDayList
              onClick={() => adminBoolean && onClickDay(day, idx, index)}
            >
              {day.day}
            </ShopDayList>
          )}
        </React.Fragment>
      ))}
    </ShopDayUl>
  );
}
const ShopDayUl = styled.ul`
  width: 40%;
  display: flex;
  align-items: center;
  .active {
    background-color: #505bf0;
    color: #fff;
  }
`;
const ShopDayList = styled.li`
  list-style: none;
  border: 1px solid ${({ theme }) => theme.colors.subColor1};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  border-radius: 9999px;
  padding: 10px 12px;
  font-weight: bold;
  margin-right: 4%;
  cursor: pointer;
`;
