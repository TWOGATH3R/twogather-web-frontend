import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getUserReview } from "../../apis/queries/reviewQuery";
import LodingSpinner from "../common/LodingSpinner";
import { getUserReviewResponse } from "../../apis/types/review.type";
import Filter from "../common/Filter";
import Pagenation from "../common/Pagenation";
import Star from "../detailShop/Star";

const Review = () => {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("createdDate,desc");

  const memberId = localStorage.getItem("memberId");
  const [list, setList] = useState<getUserReviewResponse>();
  const { mutate: getReviewList, isLoading: loding } = useMutation(
    () => getUserReview(memberId, page, sort),
    {
      onSuccess: (res) => {
        console.log(res);
        setList(res);
      },
      onError: (err) => {},
    }
  );

  const pageOnChange = (page: any) => {
    setPage(page);
  };

  const filter = [
    { text: "최신순", sort: "createdDate,desc" },
    { text: "오래된순", sort: "createdDate" },
    { text: "별점 높은순", sort: "score,desc" },
    { text: "별점 낮은순", sort: "score" },
  ];

  useEffect(() => {
    getReviewList();
  }, [page, sort]);

  return (
    <ReviewContainer>
      <FilterBox>
        <Filter filterList={filter} setSort={setSort} />
      </FilterBox>
      {loding ? (
        <LodingSpinner />
      ) : (
        <ReviewList>
          {list?.data.map((value, index) => (
            <ReviewItem key={index}>
              <Link to={`/detailShop/?storeId=${value.storeId}`}>
                <StoreImgBox>
                  <img src={value.url} alt={value.url} />
                </StoreImgBox>
                <StoreInfoReviewBox>
                  <StoreInfoBox>
                    <StoreName>{value.storeName}</StoreName>
                    <StoreAddress>{value.storeAddress}</StoreAddress>
                  </StoreInfoBox>
                  <WriteReviewBox>
                    <UserNameStartBox>
                      <UserName>{value.consumerName}</UserName>
                      <Star count={value.score} />
                    </UserNameStartBox>
                    <ReviewText>{value.content}</ReviewText>
                    <ReviewDate>{value.createdDate}</ReviewDate>
                  </WriteReviewBox>
                </StoreInfoReviewBox>
              </Link>
            </ReviewItem>
          ))}
        </ReviewList>
      )}
      {list && (
        <Pagenation
          page={page}
          pageOnChange={pageOnChange}
          totalCount={list.totalElements}
        />
      )}
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const FilterBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  padding: 0 0 15px;
`;

const ReviewList = styled.ul`
  list-style: none;
  width: 100%;
`;
const ReviewItem = styled.li`
  display: flex;
  box-sizing: border-box;
  margin-bottom: 15px;
  width: 100%;
  border: 2px solid #e6e6e6;
  a {
    display: flex;
    padding: 20px 8px;
    width: 100%;
    height: calc(100% - 40px);
    color: ${({ theme }) => theme.colors.black};
  }
`;

const StoreInfoReviewBox = styled.div`
  width: calc(100% - 135px);
`;

const StoreImgBox = styled.div`
  margin-right: 15px;
  width: 135px;
  height: 100%;
  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
  }
`;
const StoreInfoBox = styled.div`
  margin-bottom: 10px;
`;
const StoreName = styled.h3`
  margin: 0;
`;
const StoreAddress = styled.span`
  color: #797979;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const WriteReviewBox = styled.div`
  padding-left: 10px;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;
const UserNameStartBox = styled.div`
  display: flex;
  align-items: center;
  svg {
    font-size: 1rem;
  }
`;
const UserName = styled.span`
  text-decoration: underline;
  font-size: 13px;
  font-weight: bolder;
`;
const ReviewText = styled.p`
  padding: 7px 0;
  font-weight: bolder;
`;
const ReviewDate = styled.p`
  color: #878787;
  font-weight: bolder;
`;

export default Review;
