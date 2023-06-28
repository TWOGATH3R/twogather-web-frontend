import React, { useState } from "react";
import styled from "styled-components";
import Pagenation from "../common/Pagenation";
import { useQuery } from "@tanstack/react-query";
import { getStoreReview } from "../../apis/queries/storeQuery";
import { useSearchParams } from "react-router-dom";

const Reviews = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);

  const storeId = searchParams.get("storeId");
  const { data: list } = useQuery(["storeReviewList"], () =>
    getStoreReview(storeId, page)
  );

  const pageOnChange = (page: any) => {
    setPage(page);
    console.log(page);
  };

  return (
    <>
      {Array.isArray(list)
        ? list.map((value: any, index) => (
            <Container key={index}>
              <TitleBox>
                <NameStarBox>
                  <Name>{value.consumerName}</Name>
                </NameStarBox>
                <Score>평균 평점: {value.consumerAvgScore}</Score>
              </TitleBox>
              <ReivewContent>{value.content}</ReivewContent>
              <DateReviewBtnBox>
                <Date>{value.createdDate}</Date>
                <span>답글</span>
              </DateReviewBtnBox>
            </Container>
          ))
        : null}
      <Pagenation page={page} pageOnChange={pageOnChange} />
    </>
  );
};

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const Score = styled.div`
  color: #a1a1a1;
  font-weight: bold;
  font-size: 0.75rem;
`;

const Date = styled.div`
  font-size: 0.75rem;
  color: #878787;
`;
const NameStarBox = styled.div`
  display: flex;
`;
const Name = styled.div`
  margin-right: 10px;
  font-size: 1rem;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

const Container = styled.div`
  margin-bottom: 15px;
  width: 100%;
  padding: 20px 40px;
  border: 1px solid rgba(35, 35, 35, 0.1);
  border-radius: 2px;
`;

const ReivewContent = styled.div`
  width: 100%;
  margin: 10px 0;
  padding: 0;
  border-width: 0px;
  margin-right: 10px;
  overflow: hidden;
  resize: none;
  :focus-visible {
    outline: none;
  }
`;

const DateReviewBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Reviews;
