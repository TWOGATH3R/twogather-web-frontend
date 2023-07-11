import React from "react";
import Pagination from "react-js-pagination";
import styled from "styled-components";

interface infoType {
  page: number | string | null;
  pageOnChange: (value: number) => void;
  totalCount: number;
}
const Pagenation = ({ page, pageOnChange, totalCount }: infoType) => {
  return (
    <PaginationBox>
      <Pagination
        activePage={Number(page)}
        itemsCountPerPage={5}
        totalItemsCount={totalCount}
        pageRangeDisplayed={5}
        prevPageText="‹"
        nextPageText="›"
        onChange={(page) => pageOnChange(page)}
      />
    </PaginationBox>
  );
};

const PaginationBox = styled.div`
  padding-bottom: 50px;
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

export default Pagenation;
