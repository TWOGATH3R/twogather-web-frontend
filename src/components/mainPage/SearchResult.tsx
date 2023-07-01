import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { getStoreList } from "../../apis/queries/mainQuery";
import { getStoreListResponse, searchProps } from "../../apis/types/main.type";
import Filter from "../common/Filter";
import Pagenation from "../common/Pagenation";
import { AiFillHeart } from "react-icons/ai";
import Exception from "../common/Exception";
import LodingSpinner from "../common/LodingSpinner";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(Number(searchParams.get("pagenum")));

  const [list, setList] = useState<getStoreListResponse>();

  const [sort, setSort] = useState<string>("MOST_REVIEWED,desc");

  const searchInfo: searchProps = {
    category:
      searchParams.get("category") === "" ? null : searchParams.get("category"),
    search:
      searchParams.get("search") === "" ? null : searchParams.get("search"),
    location:
      searchParams.get("location") === "" ? null : searchParams.get("location"),
    pagenum: page,
    sort: sort,
    storeName:
      searchParams.get("storeName") === ""
        ? null
        : searchParams.get("storeName"),
  };
  //가게 검색 결과 리스트 query
  const { mutate: storeSearch, isLoading: loding } = useMutation(
    () => getStoreList(searchInfo),
    {
      onSuccess: (res) => {
        setList(res);
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  const pageOnChange = (page: any) => {
    setPage(page);
  };

  useEffect(() => {
    storeSearch();
  }, [page, sort, searchParams]);

  const filter = [
    { text: "평점 높은순", sort: "TOP_RATED,desc" },
    { text: "평점 낮은순", sort: "TOP_RATED" },
    { text: "리뷰 많은순", sort: "MOST_REVIEWED,desc" },
    { text: "리뷰 적은순", sort: "MOST_REVIEWED" },
    { text: "좋아요 많은순", sort: "MOST_LIKES_COUNT,desc" },
    { text: "좋아요 적은순", sort: "MOST_LIKES_COUNT" },
  ];

  return (
    <SearchResultContainer>
      <Header>
        <LocalAndKeyWordBox>
          <LocalText>
            {searchParams.get("location") && searchParams.get("location")} 맛집
          </LocalText>
          <KeyWordList>
            {searchParams.get("search") && (
              <KeyWord># {searchParams.get("search")}</KeyWord>
            )}
            {searchParams.get("category") && (
              <Category>{searchParams.get("category")}</Category>
            )}
          </KeyWordList>
        </LocalAndKeyWordBox>
        <Filter filterList={filter} setSort={setSort} />
      </Header>
      {loding ? (
        <LodingSpinner />
      ) : list && list?.data.length >= 1 ? (
        <>
          <StoreList>
            {list &&
              list.data.map((value, index) => (
                <StoreItem key={index}>
                  <Link to={`/detailShop/?storeId=${value.storeId}`}>
                    <StoreImgBox>
                      <StoreImg src={value.storeImageUrl} />
                    </StoreImgBox>
                    <StoreNameAndGrade>
                      <StoreName>{value.storeName}</StoreName>
                      <StoreGrade>4.5</StoreGrade>
                    </StoreNameAndGrade>
                    <LikeCount>
                      <AiFillHeart />
                      {value.likeCount}
                    </LikeCount>
                    <StoreKeyWordList>
                      {value.keywordList.map((v, i) => (
                        <StoreKeyWordItem key={i}># {v}</StoreKeyWordItem>
                      ))}
                    </StoreKeyWordList>
                  </Link>
                </StoreItem>
              ))}
          </StoreList>
          <Pagenation
            page={page}
            pageOnChange={pageOnChange}
            totalCount={list.data.length}
          />
        </>
      ) : (
        <Exception verson={"가게검색"} />
      )}
    </SearchResultContainer>
  );
};

const SearchResultContainer = styled.div`
  padding-top: 60px;
  width: 100%;
  color: #4a4a4a;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const LocalAndKeyWordBox = styled.div`
  display: flex;
`;
const LocalText = styled.h3`
  margin: 0;
  padding: 0;
  text-decoration: underline;
`;
const KeyWordList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
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
`;
const KeyWord = styled.li`
  margin: 0 5px;
  padding: 5px 10px;
  min-width: fit-content;
  background-color: #d9d9d9;
  border-radius: 10px;
  font-size: 0.7rem;
  cursor: pointer;
`;
const Category = styled(KeyWord)``;

const StoreList = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;
const StoreItem = styled.li`
  width: calc(33.3333% - 30px);
  margin: 0 15px 25px 15px;
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
  padding: 15px 0 0 0;
`;
const StoreName = styled.span`
  padding-right: 10px;
  font-weight: 600;
`;
const StoreGrade = styled.span`
  font-weight: 600;
  color: #ff6262;
`;
const StoreKeyWordList = styled(KeyWordList)`
  justify-content: flex-start;
`;
const StoreKeyWordItem = styled(KeyWord)`
  margin: 0 5px 0 0;
`;

const LikeCount = styled.p`
  display: flex;
  align-items: center;
  padding: 5px 0;
  svg {
    margin-right: 5px;
    color: ${({ theme }) => theme.colors.yellow};
  }
`;

export default SearchResult;
