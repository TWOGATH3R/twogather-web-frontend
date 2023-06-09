import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { getStoreList } from "../../apis/queries/mainQuery";
import { getStoreListResponse, searchProps } from "../../apis/types/main.type";
import Filter from "../common/Filter";
import Pagenation from "../common/Pagenation";
import { AiFillHeart } from "react-icons/ai";
import Exception from "../common/Exception";
import LodingSpinner from "../common/LodingSpinner";
import {
  Categories,
  City,
  PageNum,
  SearchText,
  Si,
  KeyWord,
} from "../../store/searchAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { AxiosError } from "axios";

const SearchResult = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  // const [page, setPage] = useState(searchParams.get("pagenum"));

  const [list, setList] = useState<getStoreListResponse>();

  const [sort, setSort] = useState<string>("MOST_REVIEWED,desc");

  const [pageNum, setPageNum] = useRecoilState<string>(PageNum);

  const searchText = useRecoilValue<string>(SearchText);
  const categories = useRecoilValue<string>(Categories);
  const city = useRecoilValue<string>(City);
  const si = useRecoilValue<string>(Si);
  const keyWord = useRecoilValue<string>(KeyWord);
  const info: searchProps = {
    category: categories === "모든 카테고리" ? "" : categories,
    search: keyWord,
    location: city === "전체 지역" ? "" : `${city} ${si}`,
    pagenum: searchParams.get("storeName") === searchText ? pageNum : "1",
    sort: sort,
    storeName: searchText,
  };
  //가게 검색 결과 리스트 query
  const { mutate: storeSearch, isLoading: loding } = useMutation(
    () => getStoreList(info),
    {
      onSuccess: (res) => {
        setList(res);
      },
      onError: (err: AxiosError<any>) => {
        alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
      },
    }
  );

  //onChange
  const pageOnChange = (page: number) => {
    setPageNum(String(page));
  };

  useEffect(() => {
    storeSearch();
    const URL = `/search?category=${
      info.category === "모든 카테고리" ? "" : info.category
    }&search=${info.search}&storeName=${info.storeName}&location=${
      info.location === "전체 지역" ? "" : info.location
    }&pagenum=${info.pagenum}&sort=${info.sort}`.replaceAll("null", "");
    navigate(URL);
  }, [pageNum, sort, searchParams]);

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
              <KeyWordItem># {searchParams.get("search")}</KeyWordItem>
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
            page={pageNum}
            pageOnChange={pageOnChange}
            totalCount={list.totalElements}
            itemsCountPerPage={6}
          />
        </>
      ) : (
        <Exception text={"가게검색 결과가"} />
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
    height: 4px;
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
const KeyWordItem = styled.li`
  margin: 0 5px;
  padding: 5px 10px;
  min-width: fit-content;
  background-color: #d9d9d9;
  border-radius: 10px;
  font-size: 0.7rem;
  cursor: pointer;
`;
const Category = styled(KeyWordItem)``;

const StoreList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  padding: 15px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  @media (max-width: 680px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const StoreItem = styled.li`
  width: 100%;
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
const StoreKeyWordItem = styled(KeyWordItem)`
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
