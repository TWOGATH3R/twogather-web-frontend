import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { Link, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useMutation } from "react-query";
import { getStoreList } from "../../apis/queries/mainQuery";

const SearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);

  const storeList = [1, 2, 3, 4, 5, 6];

  const searchInfo = {
    category: searchParams.get("category"),
    search: searchParams.get("search"),
    location: searchParams.get("location"),
    pagenum: searchParams.get("pagenum"),
    sort: searchParams.get("sort"),
  };
  //가게 검색 결과 리스트 query
  const { mutate: storeSearch } = useMutation(() => getStoreList(searchInfo), {
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const pageOnChange = (page: any) => {
    setPage(page);
  };

  useEffect(() => {
    storeSearch();
  }, [storeSearch]);

  return (
    <SearchResultContainer>
      <Header>
        <LocalAndKeyWordBox>
          <LocalText>서울시 강남구 맛집</LocalText>
          <KeyWordList>
            <KeyWord># 분위기 좋은</KeyWord>
            <Category>양식</Category>
          </KeyWordList>
        </LocalAndKeyWordBox>
        <FilterBox>
          <FilterSelect>
            <option>리뷰 많은순</option>
            <option>평점 높은순</option>
            <option>찜 많은순</option>
          </FilterSelect>
        </FilterBox>
      </Header>
      <StoreList>
        {storeList &&
          storeList.map((value) => (
            <StoreItem key={value}>
              <Link to={"/"}>
                <StoreImgBox>
                  <StoreImg src="https://modo-phinf.pstatic.net/20190613_180/1560397211791mWzQc_JPEG/mosaUJSQm4.jpeg?type=w1100" />
                </StoreImgBox>
                <StoreNameAndGrade>
                  <StoreName>서초 고깃간</StoreName>
                  <StoreGrade>4.5</StoreGrade>
                </StoreNameAndGrade>
                <StoreKeyWordList>
                  <StoreKeyWordItem># 데이트 하기 좋은</StoreKeyWordItem>
                  <StoreKeyWordItem># 저렴한</StoreKeyWordItem>
                  <StoreKeyWordItem># 분위기 좋은</StoreKeyWordItem>
                </StoreKeyWordList>
              </Link>
            </StoreItem>
          ))}
      </StoreList>
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
`;
const KeyWord = styled.li`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #d9d9d9;
  border-radius: 10px;
  font-size: 0.7rem;
  cursor: pointer;
`;
const Category = styled(KeyWord)``;

const FilterBox = styled.div``;
const FilterSelect = styled.select`
  outline: none;
  padding: 5px;
  background: #0075ff;
  border: none;
  border-radius: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.white};
`;

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
  padding: 15px 0 10px 0;
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

const PaginationBox = styled.div`
  margin-top: 10px;
  a {
    color: black;
  }
  ul {
    display: flex;
    justify-content: center;
    list-style: none;
    li {
      padding: 3px 10px;
    }
  }
  ul.pagination li.active a {
    color: red;
  }
`;

export default SearchResult;
