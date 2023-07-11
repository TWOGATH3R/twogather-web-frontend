import React from "react";
import styled from "styled-components";
// import Button from "../common/Button";
import { useNavigate } from "react-router-dom";

type Props = {
  value: {
    storeId: number;
    storeName: string;
    address: string;
    phone: string;
    status: string;
    reasonForRejection: string;
    requestDate: string;
    storeImageUrl: string;
  };
};

export default function StoreItem({ value }: Props) {
  const navigate = useNavigate();

  const BtnOnClick = (storeId: number) => {
    navigate(`/editenrollshop/?storeId=${storeId}`);
  };
  const reapplyBtnOnClick = (storeId: number) => {
    navigate(`/editenrollshop/?storeId=${storeId}&role=reapply`);
  };
  return (
    <Container>
      <Image src={value.storeImageUrl} />
      <InfoItem>
        <Header>
          <Name>{value.storeName}</Name>
          <Status active={value.status === "DENIED"}>
            {value.status === "APPROVED"
              ? "승인"
              : value.status === "PENDING"
              ? "대기"
              : `거부 - ${value.reasonForRejection}`}
          </Status>
        </Header>
        <BottomBox>
          <BottomInfoBox>
            <InfoText>{value.phone}</InfoText>
            <InfoText>{value.address}</InfoText>
          </BottomInfoBox>
          <BottomButtonBox>
            {value.status === "DENIED" ? (
              <Button onClick={() => reapplyBtnOnClick(value.storeId)}>
                재신청
              </Button>
            ) : (
              <Button onClick={() => BtnOnClick(value.storeId)}>수정</Button>
            )}
            <Date>{value.requestDate}</Date>
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
const Image = styled.img`
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

const Status = styled.div<{ active: boolean }>`
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;
  color: #4d74ff;
  ${(props) => props.active && `color:red`}
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

const Button = styled.button`
  box-sizing: border-box;
  width: 97px;
  height: 30px;
  background: #4d74ff;
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  :hover {
    cursor: pointer;
  }
`;
