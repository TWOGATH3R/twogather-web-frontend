import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { emailCheckMutaionPostEmail } from "../../apis/queries/signUpQuery";
import { useMutation } from '@tanstack/react-query';

const Verification = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  //query
  const { mutate: emailCheck } = useMutation(
    () => emailCheckMutaionPostEmail(email),
    {
      onSuccess: (res) => {
        navigate("/findid/check", {
          state: {
            verificationCode: res.data.verificationCode,
            email: email,
            name: userName,
          },
        });
      },
    }
  );

  //onChange
  const emailPattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const emailOnChange = (emailText: string) => {
    setEmail(emailText);
  };
  const userNamePattern = /^[ㄱ-ㅎ가-힣a-zA-Z]{1,10}$/;
  const userNameOnChange = (userNameText: string) => {
    setUserName(userNameText);
  };

  //onClick
  const findBtnOnClick = () => {
    if (!userName) alert("사용자명을 입력해주세요");
    else if (!email) alert("이메일을 입력해주세요");
    else if (!userNamePattern.test(userName))
      alert("사용자명이 형식에 맞지 않습니다");
    else if (!emailPattern.test(email)) alert("이메일이 형식에 맞지 않습니다");
    else emailCheck();
  };

  return (
    <>
      <UserNameInputBox
        valid={userName.length > 0 ? userNamePattern.test(userName) : true}
      >
        <UserNameInput
          value={userName}
          placeholder="닉네임"
          onChange={(e) => userNameOnChange(e.target.value)}
        />
      </UserNameInputBox>
      <EmailInputBox valid={email.length > 0 ? emailPattern.test(email) : true}>
        <EmailInput
          value={email}
          placeholder="이메일"
          onChange={(e) => emailOnChange(e.target.value)}
        />
      </EmailInputBox>
      <LoginBtn onClick={() => findBtnOnClick()}>조회</LoginBtn>
    </>
  );
};

const UserNameInputBox = styled.div<{ valid: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  width: 80%;
  color: #868686;
  ${(props) => {
    if (!props.valid) {
      return css`
        input {
          border-color: #ff3a3a;
        }
        &::after {
          content: "영어or한글 10자 이내로 입력해주세요.";
          position: absolute;
          top: calc(100% + 3px);
          left: 0;
          font-size: 12px;
          color: #ff0000;
        }
      `;
    }
  }}
`;
const UserNameInput = styled.input`
  padding: 15px 18px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const EmailInputBox = styled(UserNameInputBox)`
  display: flex;
  flex-direction: column;
  width: 80%;
  color: #868686;
  ${(props) => {
    if (!props.valid) {
      return css`
        &::after {
          content: "이메일 형식에 맞게 입력해주세요.";
        }
      `;
    }
  }}
`;
const EmailInput = styled(UserNameInput)`
  padding: 15px 18px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const LoginBtn = styled.button`
  margin-top: 30px;
  box-sizing: border-box;
  width: 187px;
  height: 55px;
  background: #2663ff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

export default Verification;
