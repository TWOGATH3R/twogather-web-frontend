import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTop10List } from "../../apis/queries/mainQuery";

const ReviewTop10 = () => {
  const [storeList, setStoreList] = useState<Array<Object> | undefined>();

  const { mutate: Top10List } = useMutation(
    () => {
      const type: string = "MOST_REVIEWED";
      const count: string = storeList ? "10" : "3";
      return getTop10List(type, count);
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
    if (!storeList) Top10List();
  }, [Top10List]);

  return (
    <ReviewTopContainer>
      <Title>리뷰 많은 Top10</Title>
      <SeeMoreInput id="reviewtop" type="checkbox" />
      <ReviewTop10List>
        {Array.isArray(storeList)
          ? storeList.map((value: any, index: any) => (
              <ReviewTop10Item key={index}>
                <Link to={"/"}>
                  <StoreImgBox>
                    <StoreImg src="https://modo-phinf.pstatic.net/20190613_180/1560397211791mWzQc_JPEG/mosaUJSQm4.jpeg?type=w1100" />
                  </StoreImgBox>
                  <StoreNameAndGrade>
                    <StoreName>서초 고깃간</StoreName>
                    <StoreGrade>4.5</StoreGrade>
                  </StoreNameAndGrade>
                  <StoreAddress>전라남도 여수시</StoreAddress>
                </Link>
              </ReviewTop10Item>
            ))
          : null}
        <SeeMoreBtnBox className="seeMoreBtn">
          <SeeMoreBtn htmlFor="reviewtop" onClick={() => seeMoreBtnOnClick()}>
            &gt;<p>더보기</p>
          </SeeMoreBtn>
        </SeeMoreBtnBox>
      </ReviewTop10List>
    </ReviewTopContainer>
  );
};

const ReviewTopContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  color: #4a4a4a;
`;
const Title = styled.h3`
  margin: 0;
  padding: 0 0 15px 20px;
`;

const ReviewTop10List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const ReviewTop10Item = styled.li`
  width: calc(25% - 22.5px);
  margin-right: 30px;
  a {
    width: 100%;
    height: 100%;
    color: #4a4a4a;
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

const SeeMoreBtnBox = styled(ReviewTop10Item)`
  display: flex;
  justify-content: center;
  margin: 0;
`;
const SeeMoreInput = styled.input`
  display: none;
  &:checked {
    & + ul {
      justify-content: center;
    }
    & + ul > li {
      margin: 0 15px 30px 15px;
      width: calc(33.3333% - 30px);
    }
    & + ul > .seeMoreBtn {
      display: none;
    }
  }
`;
const SeeMoreBtn = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  height: fit-content;
  background-color: transparent;
  border: none;
  color: #666666;
  font-size: 5rem;
  font-weight: 400;
  cursor: pointer;
  P {
    color: ${({ theme }) => theme.colors.black};
    font-size: 0.8rem;
  }
`;

export default ReviewTop10;
