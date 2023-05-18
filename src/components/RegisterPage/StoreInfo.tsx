import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useMutation } from "react-query";
import { buisnessCheckMutaionPostInfo } from "../apis/queries/signUpQuery";
import { useLocation, useNavigate } from "react-router-dom";

const StoreInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const [ownerNumber, setOwnerNumber] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [businessDate, setBusinessDate] = useState<string>("");

  const { mutate: buisnessCheck, isLoading: buisnessCheckLoading } =
    useMutation(
      () =>
        buisnessCheckMutaionPostInfo(
          ownerNumber,
          ownerName,
          businessDate.replace(/-/g, "")
        ),
      {
        onSuccess: (res) => {
          console.log(res.data[0].status);
          if (!res.data[0].status)
            alert("사업자 조회 정보를 다시 확인해주세요");
        },
        onError: () => {
          console.log("error");
        },
      }
    );

  //onChange
  const ownerNumOnChange = (ownerNum: string) => {
    setOwnerNumber(ownerNum.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1"));
  };
  const ownerNameOnChange = (ownerName: string) => {
    setOwnerName(ownerName);
  };
  const datePattern = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
  const dateOnChange = (date: string) => {
    setBusinessDate(date);
  };

  //onClick
  const completeOnClick = () => {
    if (!ownerNumber || ownerNumber.length < 10)
      alert("사업자등록번호 10자를 입력해주세요");
    else if (!ownerName) alert("사업자이름을 입력해주세요");
    else if (!businessDate) alert("사업시작일을 입력해주세요");
    else if (!datePattern.test(businessDate))
      alert("사업시작일이 형식에 맞지 않습니다");
    else buisnessCheck();
  };

  return (
    <>
      <OwnerNumberInputBox>
        <OwnerNumberText>사업자등록번호</OwnerNumberText>
        <OwnerNumberInput
          value={ownerNumber}
          placeholder="0000000000"
          onChange={(e) => ownerNumOnChange(e.target.value)}
          maxLength={10}
        />
      </OwnerNumberInputBox>
      <OwnerNameInputBox>
        <OwnerNameText>사업자이름</OwnerNameText>
        <OwnerNameInput
          value={ownerName}
          placeholder="입력해주세요"
          onChange={(e) => ownerNameOnChange(e.target.value)}
        />
      </OwnerNameInputBox>
      <BusinessStartDayInputBox
        valid={businessDate.length > 0 ? datePattern.test(businessDate) : true}
      >
        <BusinessStartDayText>사업시작일</BusinessStartDayText>
        <BusinessStartDayInput
          value={businessDate}
          placeholder="yyyy-mm-dd"
          onChange={(e) => dateOnChange(e.target.value)}
          maxLength={10}
        />
      </BusinessStartDayInputBox>
      <CompleteBtn onClick={() => completeOnClick()}>완료</CompleteBtn>
    </>
  );
};

const OwnerNumberInputBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;
const OwnerNumberText = styled.h3`
  width: 30%;
  font-weight: 400;
`;
const OwnerNumberInput = styled.input`
  width: 45%;
  height: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const OwnerNameInputBox = styled(OwnerNumberInputBox)``;
const OwnerNameText = styled(OwnerNumberText)``;
const OwnerNameInput = styled(OwnerNumberInput)``;

const BusinessStartDayInputBox = styled(OwnerNumberInputBox)<{
  valid: boolean;
}>`
  ${(props) => {
    if (!props.valid) {
      return css`
        input {
          border-color: #ff3a3a;
        }
        &::after {
          content: "yyyy-mm-dd 형식에 맞게 입력해주세요.";
          position: absolute;
          top: 100%;
          left: 40%;
          font-size: ${({ theme }) => theme.fontSizes.small};
          color: #ff0000;
        }
      `;
    }
  }}
`;
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
