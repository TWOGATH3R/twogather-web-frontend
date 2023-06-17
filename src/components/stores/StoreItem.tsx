import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';

type Props = {};

export default function StoreItem({}: Props) {
  return (
    <Container>
      <Image>image</Image>
      <InfoItem>
        <Header>
          <Name>보세쥬르</Name>
          <Status>승인</Status>
        </Header>
        <BottomBox>
          <BottomInfoBox>
            <InfoText>02-321-2222</InfoText>
            <InfoText>서울시 용산2가동 남산공원길 126 1층</InfoText>
          </BottomInfoBox>
          <BottomButtonBox>
            <Button onClick={() => {}}>수정</Button>
            <Date>2022.03.22</Date>
          </BottomButtonBox>
        </BottomBox>
      </InfoItem>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 33px 41px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  margin-bottom: 53px;
`;

//todo img 태그로 변경할 것
const Image = styled.div`
  background-color: yellow;
  margin-right: 28px;
  width: 310px;
  height: 195px;
`;
const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const Name = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
`;

const Status = styled.div`
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: #4d74ff;
`;
const InfoText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;

const Date = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  color: #4d4d4d;
`;
const BottomBox = styled.div`
  display: flex;
  height: 50%;
  justify-content: space-between;
  flex-direction: column;
`;

const BottomInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const BottomButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

const PageNation = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
`;
