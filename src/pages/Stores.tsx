import React from 'react';
import styled from 'styled-components';
import StoreItem from '../components/stores/StoreItem';

type Props = {};

const Stores = (props: Props) => {
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
