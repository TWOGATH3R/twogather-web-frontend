import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StoreItem from "../components/stores/StoreItem";
import { getStores } from "../apis/queries/storeQuery";
import { useMutation } from "@tanstack/react-query";
import { getStoresResponse } from "../apis/types/store.type";
import Pagenation from "../components/common/Pagenation";

const Stores = () => {
  const [page, setPage] = useState(0);

  const [list, setList] = useState<getStoresResponse>();
  const memberId = localStorage.getItem("memberId");
  const { mutate: getList } = useMutation(() => getStores(memberId, page), {
    onSuccess: (res) => {
      setList(res);
      console.log(res);
    },
  });

  const pageOnChange = (page: any) => {
    setPage(page);
  };

  useEffect(() => {
    getList();
  }, [page]);

  return (
    <Container>
      <Title>나의 가게</Title>
      {list?.data.map((value, index) => (
        <StoreItem value={value} key={index}></StoreItem>
      ))}
      {list && (
        <Pagenation
          page={page}
          pageOnChange={pageOnChange}
          totalCount={list.totalElements}
        />
      )}
    </Container>
  );
};

export default Stores;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 100px auto;
  width: 1020px;
  height: 800px;
`;

const Title = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  height: 34px;
  margin: 10px;
`;

const PageNation = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
`;
