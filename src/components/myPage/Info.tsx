import React from "react";
import styled, { css } from "styled-components";

const Info = () => {
  return (
    <SignUpContainer>
      <IdBox valid={false}>
        <IdText>아이디</IdText>
        <IdInput />
      </IdBox>
      <EmailBox valid={true}>
        <EmailText>이메일</EmailText>
        <EmailInput />
      </EmailBox>
      <NameBox valid={true}>
        <NameText>이름</NameText>
        <NameInput />
      </NameBox>
      <PwBox valid={true}>
        <PwText>비밀번호</PwText>
        <PwInput />
      </PwBox>
      <PhoneBox valid={true}>
        <PhoneText>전화번호</PhoneText>
        <PhoneInput />
      </PhoneBox>
      <SaveBtn>저장</SaveBtn>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 90px 80px;
  margin: 0 auto;
  box-sizing: border-box;
  width: 580px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const IdBox = styled.div<{ valid: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  width: 100%;
  ${(props) => {
    if (!props.valid) {
      return css`
        input {
          border-color: #ff3a3a;
        }
        &::after {
          content: "영어,숫자를 포함 8~20자 이내로 입력해주세요.";
          position: absolute;
          top: 100%;
          left: 20%;
          font-size: 12px;
          color: #ff0000;
        }
      `;
    }
  }}
`;
const IdText = styled.h3`
  margin: 0;
  width: 20%;
  font-weight: 900;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;
const IdInput = styled.input`
  padding: 5px 3px;
  width: 80%;
  height: fit-content;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const EmailBox = styled(IdBox)``;
const EmailText = styled(IdText)``;
const EmailInput = styled(IdInput)``;

const NameBox = styled(IdBox)``;
const NameText = styled(IdText)``;
const NameInput = styled(IdInput)``;

const PwBox = styled(IdBox)``;
const PwText = styled(IdText)``;
const PwInput = styled(IdInput)``;

const PhoneBox = styled(IdBox)``;
const PhoneText = styled(IdText)``;
const PhoneInput = styled(IdInput)``;

const SaveBtn = styled.button`
  margin-top: 20px;
  box-sizing: border-box;
  width: 187px;
  height: 55px;
  background: #2663ff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

export default Info;
