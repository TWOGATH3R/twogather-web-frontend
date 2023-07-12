import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Pagenation from "../common/Pagenation";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  OwnerId,
  ReviewList,
  Sort,
  TotalReviewCount,
} from "../../store/storeDetailAtom";
import ReveiwReplyEnroll from "./ReveiwReplyEnroll";
import Star from "./Star";
import Filter from "../common/Filter";
import Exception from "../common/Exception";
import LodingSpinner from "../common/LodingSpinner";
import { deleteReview, getStoreReview } from "../../apis/queries/reviewQuery";
import {
  getStoreReviewDataResponse,
  getStoreReviewResponse,
} from "../../apis/types/review.type";
import Swal from "sweetalert2";
import ReviewReply from "./ReviewReply";

const Reviews = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const ownerId = useRecoilValue(OwnerId);
  const memberId = localStorage.getItem("memberId");

  const setTotalCount = useSetRecoilState(TotalReviewCount);

  const [page, setPage] = useState(1);

  const [targetReviewNum, setTargetReviewNum] = useState<number>();

  const [list, setList] = useRecoilState<getStoreReviewResponse>(ReviewList);
  const [sort, setSort] = useRecoilState(Sort);
  const storeId = searchParams.get("storeId");
  //가게 리뷰 리스트 가져오기
  const { mutate: getReviewList, isLoading: loding } = useMutation(
    () => getStoreReview(storeId, page, sort),
    {
      onSuccess: (res) => {
        setList(res);
        setTotalCount(res.totalElements);
      },
    }
  );
  //리뷰 삭제
  const { mutate: reviewDelete } = useMutation(
    (reviewId: number) => deleteReview(storeId, reviewId),
    {
      onSuccess: (res) => {
        window.location.reload();
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const pageOnChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    getReviewList();
  }, [page, sort]);

  const replyBtnOnClick = (index: number) => {
    setTargetReviewNum(index);
  };
  const deleteBtnOnClick = (reviewId: number) => {
    Swal.fire({
      title: "댓글을 삭제하겠습니까?",
      confirmButtonColor: "#0075FF",
      cancelButtonColor: "#738598",
      showCancelButton: true,
      confirmButtonText: "네",
      cancelButtonText: "아니요",
      padding: "3em",
    }).then((result) => {
      if (result.isConfirmed) {
        reviewDelete(reviewId);
      }
    });
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
        list.data.map((value: getStoreReviewDataResponse, index) => (
          <div key={index}>
            <Container>
              <TitleBox>
                <NameStarBox>
                  <Name>{value.consumerName}</Name>
                  <Star count={value.score} />
                  {Number(memberId) === value.consumerId ? (
                    <DeleteBtn onClick={() => deleteBtnOnClick(value.reviewId)}>
                      X
                    </DeleteBtn>
                  ) : null}
                </NameStarBox>
                <Score>평균 평점: {value.consumerAvgScore}</Score>
              </TitleBox>
              <ReivewContent>{value.content}</ReivewContent>
              <DateReviewBtnBox>
                <Date>{value.createdDate}</Date>
                {Number(memberId) === ownerId ? (
                  <span onClick={() => replyBtnOnClick(index)}>답글</span>
                ) : null}
              </DateReviewBtnBox>
            </Container>
            {value.comment.content && (
              <ReviewReply
                commentContent={value.comment.content}
                commentCreatedDate={value.comment.createdDate}
                commentId={value.comment.commentId}
                reviewId={value.reviewId}
              />
            )}
            {targetReviewNum === index && (
              <ReveiwReplyEnroll reviewId={value.reviewId} />
            )}
          </div>
        ))
      ) : (
        <Exception text={"리뷰"} />
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

const DeleteBtn = styled.span`
  margin: 0 0 0 auto;
  cursor: pointer;
`;

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
