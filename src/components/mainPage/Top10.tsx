import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import styled from "styled-components";
import { getTop10List } from "../../apis/queries/mainQuery";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { Top10Type } from "./type";
import { getTop10ListProps } from "../../apis/types/main.type";
import { AiFillHeart } from "react-icons/ai";

const Top10 = ({ title, type }: Top10Type) => {
  const [storeList, setStoreList] = useState<Array<Object> | undefined>();

  const listLength: boolean | undefined = storeList && storeList?.length <= 3;
  const { mutate: Top10List } = useMutation(
    () => {
      const count: string = listLength ? "10" : "3";
      const info: getTop10ListProps = {
        type: type,
        count: count,
      };
      return getTop10List(info);
    },
    {
      onSuccess: (res) => {
        setStoreList(res.data);
      },
    }
  );

  //onClick
  const seeMoreBtnOnClick = () => {
    Top10List();
  };

  useEffect(() => {
    Top10List();
  }, []);

  return (
    <GradeTopContainer>
      <Title>
        {title === "리뷰" ? "리뷰 많은 Top10" : `${title} 높은 Top10`}{" "}
      </Title>
      <SeeMoreInput id="gradetop" type="checkbox" />
      <GradeTop10List>
        {Array.isArray(storeList)
          ? storeList.map((value: any, index: any) => (
              <GradeTop10Item key={index}>
                <Link to={`/detailShop/?storeId=${value.storeId}`}>
                  <StoreImgBox>
                    <StoreImg src={value.storeImageUrl} />
                  </StoreImgBox>
                  <StoreNameAndGrade>
                    <StoreName>{value.storeName}</StoreName>
                    <StoreGrade>{value.avgScore}</StoreGrade>
                  </StoreNameAndGrade>
                  <StoreAddress>{value.address}</StoreAddress>
                  <LikeCount>
                    <AiFillHeart />
                    {value.likeCount}
                  </LikeCount>
                </Link>
              </GradeTop10Item>
            ))
          : null}
      </GradeTop10List>
      <SeeMoreBtn htmlFor="reviewtop" onClick={() => seeMoreBtnOnClick()}>
        {listLength ? (
          <>
            <IoIosArrowDown />
            <p>펼치기</p>
          </>
        ) : (
          <>
            <IoIosArrowUp />
            <p>접기</p>
          </>
        )}
      </SeeMoreBtn>
    </GradeTopContainer>
  );
};

const GradeTopContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  color: #4a4a4a;
`;
const Title = styled.h3`
  margin: 0;
  padding: 0 0 15px 20px;
`;

const GradeTop10List = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  padding: 15px 10px 10px 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 680px) {
    grid-template-columns: 1fr;
    padding: 15px 30px;
  }
`;
const GradeTop10Item = styled.li`
  a {
    width: 100%;
    height: 100%;
    color: #4a4a4a;
  }
  @media (max-width: 680px) {
    margin-bottom: 15px;
  }
`;
const StoreImgBox = styled.div`
  width: 100%;
  aspect-ratio: 16 / 11;
  overflow: hidden;
`;
const StoreImg = styled.img`
  width: 100%;
  height: 100%;
  transition: all 0.5s ease-in;
  &:hover {
    scale: 1.12;
  }
`;
const StoreNameAndGrade = styled.div`
  display: flex;
  padding-top: 15px;
`;
const StoreName = styled.span`
  padding-right: 10px;
  font-weight: 600;
`;
const StoreGrade = styled.span`
  font-weight: 600;
  color: #ff6262;
`;
const StoreAddress = styled(StoreName)`
  font-size: 0.8rem;
  font-weight: 400;
`;
const LikeCount = styled.p`
  display: flex;
  align-items: center;
  svg {
    margin-right: 5px;
    color: ${({ theme }) => theme.colors.yellow};
  }
`;

const SeeMoreInput = styled.input`
  display: none;
`;
const SeeMoreBtn = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  height: fit-content;
  background-color: transparent;
  border: none;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-top: none;
  color: #666666;
  font-size: 1.3rem;
  font-weight: 400;
  cursor: pointer;
  P {
    color: ${({ theme }) => theme.colors.black};
    font-size: 1rem;
  }
`;

export default Top10;
