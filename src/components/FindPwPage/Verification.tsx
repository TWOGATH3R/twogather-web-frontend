import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const Verification = () => {
  const navigate = useNavigate();

  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  //onChange
  const IdOnChange = (IdText: string) => {
    setId(IdText);
  };
  const emailPattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const emailOnChange = (emailText: string) => {
    setEmail(emailText);
  };
  const codeOnChange = (codeText: string) => {
    setCode(codeText);
  };

  //onClick
  const emailBtnOnClick = () => {
    if (!email) alert("이메일을 입력해주세요");
    else if (!emailPattern.test(email)) alert("이메일이 형식에 맞지 않습니다");
  };
  const codeBtnOnClick = () => {
    if(!id) alert("아이디를 입력해주세요");
    else if (!email) alert("이메일을 입력해주세요");
    else if (!code) alert("인증번호를 입력해주세요");
    else if (!code === null) alert("인증번호가 알맞지 않습니다");
    else {
      alert("인증완료");
      navigate("/findPw/pwChange");
    }
  };

  return (
    <>
      <IdBox valid={true}>
        <IdInput
          value={id}
          placeholder="아이디"
          onChange={(e) => IdOnChange(e.target.value)}
        />
      </IdBox>
      <EmailBox valid={email.length > 0 ? emailPattern.test(email) : true}>
        <EmailInput
          value={email}
          placeholder="이메일"
          onChange={(e) => emailOnChange(e.target.value)}
        />
        <EmailSendBtn onClick={() => emailBtnOnClick()}>
          인증 메일 전송
        </EmailSendBtn>
      </EmailBox>
      <ConfirmBox valid={true}>
        <ConfirmInput
          value={code}
          placeholder="인증코드"
          onChange={(e) => codeOnChange(e.target.value)}
        />
      </ConfirmBox>
      <ConfirmBtn onClick={() => codeBtnOnClick()}>인증</ConfirmBtn>
    </>
  );
};

const EmailBox = styled.div<{ valid: boolean }>`
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
const EmailInput = styled.input`
  margin-right: 15px;
  padding: 15px 10px;
  width: 50%;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
const EmailSendBtn = styled.button`
  padding: 5px 10px;
  width: 110px;
  background: #2663ff;
  box-sizing: border-box;
  border: none;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const ConfirmBox = styled(EmailBox)``;
const ConfirmInput = styled(EmailInput)`
  margin-left: 15px;
  width: calc(50% + 125px);
`;
const ConfirmBtn = styled(EmailSendBtn)`
  margin-top: 100px;
  width: 187px;
  height: 55px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const IdBox = styled(ConfirmBox)``;
const IdInput = styled(ConfirmInput)``;

export default Verification;
