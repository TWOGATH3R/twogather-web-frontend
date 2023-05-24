import React, { useState } from "react";
import styled, { css } from "styled-components";

const PwChange = () => {
  const [newPw, setNewPw] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<string>("");
  const [codeConfirm, setCodeConfrim] = useState<boolean>(false);

  //onChange
  const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
  const newPwOnChange = (newPwText: string) => {
    setNewPw(newPwText);
  };
  const pwCheckOnChange = (pwCheckText: string) => {
    setPwCheck(pwCheckText);
  };

  //onClick
  const changeOnClick = () => {
    if (!newPw) alert("비밀번호를 입력해주세요");
    else if (!pwCheck) alert("비밀번호를 확인해주세요");
    else if (!pwPattern.test(newPw)) alert("비밀번호가 양식에 맞지 않습니다");
    else if (newPw !== pwCheck) alert("비밀번호가 일치하지 않습니다");
  };
  return (
    <>
      <NewPwBox valid={newPw.length > 0 ? pwPattern.test(newPw) : true}>
        <NewPwInput
          value={newPw}
          placeholder="새 비밀번호"
          onChange={(e) => newPwOnChange(e.target.value)}
        />
      </NewPwBox>
      <PwCheckBox valid={pwCheck.length > 0 ? pwCheck === newPw : true}>
        <PwCheckInput
          value={pwCheck}
          placeholder="비밀번호 확인"
          onChange={(e) => pwCheckOnChange(e.target.value)}
        />
      </PwCheckBox>
      <ChangeBtn onClick={() => changeOnClick()}>변경</ChangeBtn>
    </>
  );
};



const ConfirmBox = styled.div<{ valid: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 45px;
  width: 100%;
  ${(props) => {
    if (!props.valid) {
      return css`
        input {
          border-color: #ff3a3a;
        }
        &::after {
          content: "이메일 형식에 맞게 입력해주세요.";
          position: absolute;
          top: calc(100% + 2px);
          left: 10%;
          font-size: 12px;
          color: #ff0000;
        }
      `;
    }
  }}
`;
const ConfirmInput = styled.input`
  margin-right: 15px;
  padding: 15px 10px;
  width: 50%;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
const ConfirmBtn = styled.button`
  padding: 5px 10px;
  width: 110px;
  background: #2663ff;
  box-sizing: border-box;
  border: none;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const NewPwBox = styled(ConfirmBox)`
  ${(props) => {
    if (!props.valid) {
      return css`
        &::after {
          content: "영어,숫자를 포함 8~20자 이내로 입력해주세요.";
        }
      `;
    }
  }}
`;
const NewPwInput = styled(ConfirmInput)`
  margin-right: 125px;
`;

const PwCheckBox = styled(ConfirmBox)`
  ${(props) => {
    if (!props.valid) {
      return css`
        &::after {
          content: "일치하지 않습니다.";
        }
      `;
    }
  }}
`;
const PwCheckInput = styled(ConfirmInput)``;

const ChangeBtn = styled(ConfirmBtn)`
  margin-top: 20px;
  width: 187px;
  height: 55px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export default PwChange;
