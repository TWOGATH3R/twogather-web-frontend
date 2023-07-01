import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Pagenation from "../common/Pagenation";
import { useMutation } from "@tanstack/react-query";
import { getStoreReview } from "../../apis/queries/storeQuery";
import { useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { TotalReviewCount } from "../../store/storeDetailAtom";
import { getStoreReviewResponse } from "../../apis/types/store.type";
import ReveiwReplyEnroll from "./ReveiwReplyEnroll";
import Star from "./Star";
import Filter from "../common/Filter";
import Exception from "../common/Exception";
import LodingSpinner from "../common/LodingSpinner";

const Reviews = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setTotalCount = useSetRecoilState(TotalReviewCount);

  const [page, setPage] = useState(0);

  const [targetReviewNum, setTargetReviewNum] = useState<number>();

  const [list, setList] = useState<getStoreReviewResponse>();
  const [sort, setSort] = useState<string>("createdDate,desc");
  const storeId = searchParams.get("storeId");
  const { mutate: getReviewList, isLoading: loding } = useMutation(
    () => getStoreReview(storeId, page, sort),
    {
      onSuccess: (res) => {
        setList(res);
        setTotalCount(res.totalElements);
      },
    }
  );

  const pageOnChange = (page: any) => {
    setPage(page);
  };

  useEffect(() => {
    getReviewList();
  }, [page, sort]);

  const replyBtnOnClick = (index: number) => {
    setTargetReviewNum(index);
  };

  const filter = [
    { text: "최신순", sort: "createdDate,desc" },
    { text: "오래된순", sort: "createdDate" },
    { text: "별점 높은순", sort: "score,desc" },
    { text: "별점 낮은순", sort: "score" },
  ];

  return (
    <>
      <Title>
        리뷰 ({list?.totalElements})
        <Filter filterList={filter} setSort={setSort} />
      </Title>
      {loding ? (
        <LodingSpinner />
      ) : list && list?.data.length >= 1 ? (
        list.data.map((value: any, index) => (
          <div key={index}>
            <Container>
              <TitleBox>
                <NameStarBox>
                  <Name>{value.consumerName}</Name>
                  <Star count={value.score} />
                </NameStarBox>
                <Score>평균 평점: {value.consumerAvgScore}</Score>
              </TitleBox>
              <ReivewContent>{value.content}</ReivewContent>
              <DateReviewBtnBox>
                <Date>{value.createdDate}</Date>
                <span onClick={() => replyBtnOnClick(index)}>답글</span>
              </DateReviewBtnBox>
            </Container>
            {targetReviewNum === index ? (
              <ReveiwReplyEnroll reviewId={value.reviewId} />
            ) : null}
          </div>
        ))
      ) : (
        <Exception verson={"리뷰"} />
      )}

      {list && (
        <Pagenation
          page={page}
          pageOnChange={pageOnChange}
          totalCount={list.totalElements}
        />
      )}
    </>
  );
};

const Title = styled.h2`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  color: #606060;
`;

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
  width: calc(100% - 80px);
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
