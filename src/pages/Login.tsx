import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const [id, setId] = useState<String>("");
  const [pw, setPw] = useState<String>("");

  return (
    <LoginContainer>
      <LoginWrraper>
        <Title>Login</Title>
        <IdInputBox>
          <Link to={"/findId"}>아이디 찾기</Link>
          <IdInput placeholder="email" />
        </IdInputBox>
        <PwInputBox>
          <Link to={"/findPw"}>비밀번호 찾기</Link>
          <PwInput placeholder="password" />
        </PwInputBox>
        <LoginBtn>로그인</LoginBtn>
        <RegisterBtnBox>
          <Link to={"/register"}>회원가입</Link>
        </RegisterBtnBox>
      </LoginWrraper>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  padding-top: 8vh;
  height: calc(93vh - 8vh);
  font-family: "Inter";
  font-weight: 400;
`;
const LoginWrraper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
  margin: 0 auto;
  box-sizing: border-box;
  width: 504px;
  height: 674px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
`;
const Title = styled.h1`
  padding-bottom: 30px;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
`;

const IdInputBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
  width: 85%;
  color: #868686;
  a {
    margin-bottom: 5px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizes.small};
    text-decoration-line: underline;
    color: #868686;
  }
`;
const IdInput = styled.input`
  padding: 15px 18px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
const PwInputBox = styled(IdInputBox)``;
const PwInput = styled(IdInput)``;

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
const RegisterBtnBox = styled.div`
  margin-top: 35%;
  a {
    text-decoration-line: underline;
    color: #ff4242;
  }
`;

export default Login;
