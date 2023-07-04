import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { getMyLikeList } from "../../apis/queries/myPageQuery";
import Pagenation from "../common/Pagenation";
import { getMyLikeListResponse } from "../../apis/types/mypage.type";

const Like = () => {
  const [page, setPage] = useState(1);

  const [likeList, setLikeList] = useState<getMyLikeListResponse>();
  const memberId = localStorage.getItem("memberId");
  const { mutate: getLikeList } = useMutation(() => getMyLikeList(memberId), {
    onSuccess: (res) => {
      setLikeList(res);
    },
  });

  const pageOnChange = (page: any) => {
    setPage(page);
  };

  useEffect(() => {
    getLikeList();
  }, [page]);

  return (
    <ReviewContainer>
      <ReviewList>
        {likeList?.data.map((value, index) => (
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
      {likeList && (
        <Pagenation
          page={page}
          pageOnChange={pageOnChange}
          totalCount={likeList.totalElements}
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
  @media (max-width: 680px) {
    margin: 0 auto 15px auto;
    width: 80%;
    a {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const StoreInfoReviewBox = styled.div``;

const StoreImgBox = styled.div`
  margin-right: 25px;
  width: 135px;
  min-width: 135px;
  height: 135px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  @media (max-width: 680px) {
    margin: 0;
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
  @media (max-width: 680px) {
    justify-content: center;
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
  width: 100%;
  @media (max-width: 680px) {
    justify-content: normal;
    padding-bottom: 5px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      width: 3px;
      height: 7px;
    }
    &::-webkit-scrollbar-thumb {
      width: 3px;
      border-radius: 5px;
      background-color: #b1b1b1;
    }
    &::-webkit-scrollbar-track {
      background-color: #ffffff;
    }
  }
`;
const KeyWordItem = styled.li`
  margin: 0 10px 0 0;
  padding: 3px 10px;
  min-width: fit-content;
  background-color: #d9d9d9;
  border-radius: 10px;
  font-size: 0.7rem;
  cursor: pointer;
`;

const FillHeart = styled(AiOutlineHeart)`
  color: ${({ theme }) => theme.colors.yellow};
  font-size: 1.6rem;
  cursor: pointer;
`;

export default Like;
