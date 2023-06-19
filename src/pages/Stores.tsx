import React from 'react';
import styled from 'styled-components';
import StoreItem from '../components/stores/StoreItem';
import { getMyStoreList } from '../apis/queries/storeQuery';
import { GetMyStoreListProps } from '../apis/queries/type';
import { useQuery } from '@tanstack/react-query';

type Props = {};

const Stores = (props: Props) => {
  const MyStoreListProps: GetMyStoreListProps = {
    ownerId: 9,
  };
  //todo 페이지 네이션 구현하기
  const { data } = useQuery(['myRoom'], () => getMyStoreList(MyStoreListProps));
  console.log(data);

  const arr = [0, 1];

  return (
    <Container>
      <Title>나의 가게</Title>
      {arr.map(key => (
        <StoreItem key={key}></StoreItem>
      ))}
      <PageNation>1 2 3 4 5</PageNation>
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
