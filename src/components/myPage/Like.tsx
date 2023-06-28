import React, { useState } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { getMyLikeList } from "../../apis/queries/myPageQuery";
import Pagenation from "../common/Pagenation";

const Like = () => {
  const [page, setPage] = useState(1);

  const memberId = localStorage.getItem("memberId");
  const { data: LikeList } = useQuery(["getLikeList"], () =>
    getMyLikeList(memberId)
  );

  const pageOnChange = (page: any) => {
    setPage(page);
    console.log(page);
  };
  
  return (
    <ReviewContainer>
      <ReviewList>
        {LikeList?.data.map((value, index) => (
          <ReviewItem key={index}>
            <Link to={`/detailShop/?storeId=${value.storeId}`}>
              <StoreImgBox>
                <img src={value.storeImageUrl} alt={value.storeImageUrl} />
              </StoreImgBox>
              <StoreInfoReviewBox>
                <StoreInfoBox>
                  <StoreName>
                    {value.storeName} <FillHeart />
                  </StoreName>
                  <StoreAddress>{value.address}</StoreAddress>
                  <KeyWordList>
                    {value.keywordList.map((value: any) => (
                      <KeyWordItem key={value}># {value}</KeyWordItem>
                    ))}
                  </KeyWordList>
                </StoreInfoBox>
              </StoreInfoReviewBox>
            </Link>
          </ReviewItem>
        ))}
      </ReviewList>
      {LikeList && (
        <Pagenation
          page={page}
          pageOnChange={pageOnChange}
          totalCount={LikeList.totalElements}
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
  margin-right: 45px;
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
  display: flex;
  margin: 0;
  padding-bottom: 25px;
  svg {
    margin-left: 8px;
  }
`;
const StoreAddress = styled.span`
  color: #797979;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const KeyWordList = styled.ul`
  list-style: none;
  display: flex;
  padding-top: 10px;
`;
const KeyWordItem = styled.li`
  margin: 0 10px 0 0;
  padding: 3px 10px;
  background-color: #d9d9d9;
  border-radius: 10px;
  font-size: 0.7rem;
  cursor: pointer;
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

const FillHeart = styled(AiOutlineHeart)`
  color: ${({ theme }) => theme.colors.yellow};
  font-size: 1.6rem;
  cursor: pointer;
`;

export default Like;
