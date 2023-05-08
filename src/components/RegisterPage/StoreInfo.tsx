import React from "react";
import styled from "styled-components";

const StoreInfo = () => {
  return (
    <>
      <OwnerNumberInputBox>
        <OwnerNumberText>사업자등록번호</OwnerNumberText>
        <OwnerNumberInput placeholder="입력해주세요" />
      </OwnerNumberInputBox>
      <OwnerNameInputBox>
        <OwnerNameText>사업자이름</OwnerNameText>
        <OwnerNameInput placeholder="입력해주세요" />
      </OwnerNameInputBox>
      <BusinessStartDayInputBox>
        <BusinessStartDayText>사업시작일</BusinessStartDayText>
        <BusinessStartDayInput placeholder="입력해주세요" />
      </BusinessStartDayInputBox>
      <CompleteBtn>완료</CompleteBtn>
    </>
  );
};

const OwnerNumberInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  width: 100%;
`;
const OwnerNumberText = styled.h3`
  width: 30%;
  font-weight: 400;
`;
const OwnerNumberInput = styled.input`
  width: 45%;
  height: fit-content;
`;

const OwnerNameInputBox = styled(OwnerNumberInputBox)``;
const OwnerNameText = styled(OwnerNumberText)``;
const OwnerNameInput = styled(OwnerNumberInput)``;

const BusinessStartDayInputBox = styled(OwnerNumberInputBox)``;
const BusinessStartDayText = styled(OwnerNumberText)``;
const BusinessStartDayInput = styled(OwnerNumberInput)``;


const CompleteBtn = styled.button`
  margin-top: 80px;
  width: 187px;
  height: 55px;
  background: #2663ff;
  box-sizing: border-box;
  border: none;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.white};
`;

export default StoreInfo;
