import React, { useState } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Review = () => {
  const [page, setPage] = useState(1);
  const pageOnChange = (page: any) => {
    setPage(page);
  };
  
  return (
    <ReviewContainer>
      <FilterBox>
        <FilterSelect>
          <option>최신순</option>
          <option>오래된순</option>
          <option>별점 높은순</option>
          <option>별점 낮은순</option>
        </FilterSelect>
      </FilterBox>
      <ReviewList>
        <ReviewItem>
          <Link to={""}>
            <StoreImgBox>
              <img src="data:image/jpeg;base64,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" />
            </StoreImgBox>
            <StoreInfoReviewBox>
              <StoreInfoBox>
                <StoreName>네코네코야</StoreName>
                <StoreAddress>서울시 용산2가동 남산공원길 126 1층</StoreAddress>
              </StoreInfoBox>
              <WriteReviewBox>
                <UserNameStartBox>
                  <UserName>김민지</UserName>
                  <StarList>
                    <StarItem></StarItem>
                  </StarList>
                </UserNameStartBox>
                <ReviewText>
                  맛있고 분위기가 좋아요. 다음에 또 와보고 싶어요!
                </ReviewText>
                <ReviewDate>2022-03-01</ReviewDate>
              </WriteReviewBox>
            </StoreInfoReviewBox>
          </Link>
        </ReviewItem>
      </ReviewList>
      <PaginationBox>
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={60}
          pageRangeDisplayed={5}
          prevPageText="‹"
          nextPageText="›"
          onChange={(page) => pageOnChange(page)}
        />
      </PaginationBox>
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
const FilterSelect = styled.select`
  outline: none;
  padding: 5px;
  background: #0075ff;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
`;

const ReviewList = styled.ul`
  list-style: none;
`;
const ReviewItem = styled.li`
  display: flex;
  box-sizing: border-box;
  margin-bottom: 15px;
  width: 890px;
  height: 178px;
  border: 2px solid #e6e6e6;
  a {
    display: flex;
    padding: 20px 8px;
    width: 100%;
    height: calc(100% - 40px);
    color: ${({ theme }) => theme.colors.black};
  }
`;

const StoreInfoReviewBox = styled.div``;

const StoreImgBox = styled.div`
  margin-right: 15px;
  height: 100%;
  aspect-ratio: 1 / 1;
  img {
    width: 100%;
    height: 100%;
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
`;
const UserName = styled.span`
  text-decoration: underline;
  font-size: 13px;
  font-weight: bolder;
`;
const StarList = styled.ul`
  list-style: none;
`;
const StarItem = styled.li``;
const ReviewText = styled.p`
  padding: 7px 0;
  font-weight: bolder;
`;
const ReviewDate = styled.p`
  color: #878787;
  font-weight: bolder;
`;

const PaginationBox = styled.div`
  a {
    color: black;
  }
  ul {
    display: flex;
    list-style: none;
    li {
      padding: 3px 10px;
    }
  }
  ul.pagination li.active a {
    color: red;
  }
`;

export default Review;
