import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const [id, setId] = useState<String>("");
  const [pw, setPw] = useState<String>("");

  return (
    <LoginContainer>
      <LoginWrraper>
        <Title>로그인</Title>
        <IdInputBox>
          <IdInput placeholder="이메일" />
        </IdInputBox>
        <PwInputBox>
          <PwInput placeholder="비밀번호" />
        </PwInputBox>
        <LoginBtn>로그인</LoginBtn>
        <FindMeunBtnBox>
          <Link to={"/findId"}>아이디 찾기</Link>
          <Link to={"/findPw"}>비밀번호 찾기</Link>
        </FindMeunBtnBox>
        <RegisterBtnBox>
          <Link to={"/register/selectType"}>회원가입</Link>
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

const FindMeunBtnBox = styled.div`
  margin-top: 35%;
  a {
    margin: 5px 10px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizes.small};
    text-decoration-line: underline;
    color: #868686;
  }
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
const RegisterBtnBox = styled.div`
  padding-top: 20px;
  a {
    text-decoration-line: underline;
    color: #ff4242;
  }
`;

export default Login;
