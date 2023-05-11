import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";

const EmailConfirm = () => {
  const navigate = useNavigate();
  const Param = useParams();

  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const emailPattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const emailOnChange = (emailText: string) => {
    setEmail(emailText);
  };

  //onClick
  const emailBtnOnClick = () => {
    if (email === "") alert("이메일을 입력해주세요");
    else if (!emailPattern.test(email)) alert("이메일이 형식에 맞지 않습니다");
  };
  const codeBtnOnClick = () => {
    if (code === "") alert("인증번호를 입력해주세요");
    else if (!code === null) alert("인증번호가 알맞지 않습니다");
  };
  const nextBtnOnClick = () => {
    navigate(`/register/${Param.RegisterType}/Privacy`);
  };

  return (
    <>
      <EmailBox valid={email.length > 0 ? emailPattern.test(email) : true}>
        <EmailInput
          placeholder="이메일"
          onChange={(e) => emailOnChange(e.target.value)}
        />
        <EmailSendBtn onClick={() => emailBtnOnClick()}>
          인증 메일 전송
        </EmailSendBtn>
      </EmailBox>
      <ConfirmBox valid={true}>
        <ConfirmInput placeholder="인증코드" />
        <ConfirmBtn onClick={() => codeBtnOnClick()}>인증</ConfirmBtn>
      </ConfirmBox>
      <NextBtn onClick={() => nextBtnOnClick()}>다음</NextBtn>
    </>
  );
};

const EmailBox = styled.div<{ valid: any }>`
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
          font-size: ${({ theme }) => theme.fontSizes.small};
          color: #ff0000;
        }
      `;
    }
  }}
`;
const EmailInput = styled.input`
  margin-right: 15px;
  width: 50%;
`;
const EmailSendBtn = styled.button`
  padding: 5px 10px;
  width: 110px;
  background: #2663ff;
  box-sizing: border-box;
  border: none;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.white};
`;

const ConfirmBox = styled(EmailBox)``;
const ConfirmInput = styled(EmailInput)``;
const ConfirmBtn = styled(EmailSendBtn)``;

const NextBtn = styled(EmailSendBtn)`
  margin-top: 190px;
  width: 187px;
  height: 55px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export default EmailConfirm;
