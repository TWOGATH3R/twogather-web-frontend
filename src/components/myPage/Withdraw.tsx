import React, { useState } from "react";
import styled, { css } from "styled-components";

const Withdraw = () => {
  const [pw, setPw] = useState<string>("");

  const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
  const pwOnChange = (pwText: string) => {
    setPw(pwText);
  };

  return (
    <WithdrawContainer>
      <PwBox valid={pw.length > 0 ? pwPattern.test(pw) : true}>
        <PwText>비밀번호</PwText>
        <PwInput
          type="password"
          value={pw}
          onChange={(e) => pwOnChange(e.target.value)}
        />
      </PwBox>
      <WithdrawBtn>탈퇴하기</WithdrawBtn>
    </WithdrawContainer>
  );
};

const WithdrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70px 70px 40px;
  margin: 0 auto;
  box-sizing: border-box;
  width: 580px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const PwBox = styled.div<{ valid: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  width: 80%;
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
const PwText = styled.h3`
  margin: 0;
  width: 20%;
  font-weight: 900;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;
const PwInput = styled.input`
  padding: 5px 3px;
  width: 80%;
  height: fit-content;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const WithdrawBtn = styled.button`
  margin-top: 40px;
  box-sizing: border-box;
  width: 167px;
  height: 55px;
  background: #2663ff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

export default Withdraw;
