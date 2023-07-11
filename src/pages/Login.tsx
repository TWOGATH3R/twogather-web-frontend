import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { loginProps } from "../apis/types/login.type";
import { loginMutaionPostInfo } from "../apis/queries/LoginQuery";
import { useSetRecoilState } from "recoil";
import { Role } from "../store/userInfoAtom";
import { AxiosError } from "axios";

const Login = () => {
  const navigate = useNavigate();

  const setRole = useSetRecoilState(Role);

  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const info: loginProps = {
    id,
    pw,
  };
  const { mutate: login } = useMutation(() => loginMutaionPostInfo(info), {
    onSuccess: (res) => {
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("memberId", res.data.memberId);
      const role = localStorage.getItem("role");
      role && setRole(role);
      navigate("/");
    },
    onError: (err: AxiosError<any>) => {
      alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
    },
  });

  const idPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,15}$/;
  const idOnChange = (idText: string) => {
    setId(idText);
  };
  const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
  const pwOnChange = (pwText: string) => {
    setPw(pwText);
  };

  const loginBtnOnClick = () => {
    if (id.length === 0) alert("아이디를 입력해주세요");
    else if (pw.length === 0) alert("비밀번호를 입력해주세요");
    else if (!idPattern.test(id)) alert("아이디가 형식에 맞지 않습니다");
    else if (!pwPattern.test(pw)) alert("비밀번호가 형식에 맞지 않습니다");
    else login();
  };

  return (
    <LoginContainer>
      <LoginWrraper>
        <Title>로그인</Title>
        <IdInputBox valid={id.length > 0 ? idPattern.test(id) : true}>
          <IdInput
            value={id}
            placeholder="아이디"
            onChange={(e) => idOnChange(e.target.value)}
          />
        </IdInputBox>
        <PwInputBox valid={pw.length > 0 ? pwPattern.test(pw) : true}>
          <PwInput
            value={pw}
            placeholder="비밀번호"
            onChange={(e) => pwOnChange(e.target.value)}
            type={"password"}
          />
        </PwInputBox>
        <LoginBtn onClick={() => loginBtnOnClick()}>로그인</LoginBtn>
        <FindMeunBtnBox>
          <Link to={"/findId/verification"}>아이디 찾기</Link>
          <Link to={"/findPw/verification"}>비밀번호 찾기</Link>
        </FindMeunBtnBox>
        <SignUpBtnBox>
          <Link to={"/signUp/selectType"}>회원가입</Link>
        </SignUpBtnBox>
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

const IdInputBox = styled.div<{ valid: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 85%;
  color: #868686;
  ${(props) => {
    if (!props.valid) {
      return css`
        input {
          border-color: #ff3a3a;
        }
        &::after {
          content: "영어,숫자를 포함해서 4~15자 이내로 입력해주세요.";
          position: absolute;
          top: calc(100% + 2px);
          left: 0;
          font-size: ${({ theme }) => theme.fontSizes.small};
          color: #ff0000;
        }
      `;
    }
  }}
`;
const IdInput = styled.input`
  position: relative;
  padding: 15px 18px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
const PwInputBox = styled(IdInputBox)`
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
const SignUpBtnBox = styled.div`
  padding-top: 20px;
  a {
    text-decoration-line: underline;
    color: #ff4242;
  }
`;

export default Login;
