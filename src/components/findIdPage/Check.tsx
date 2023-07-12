import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { locationType } from "./type";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getMyId } from "../../apis/queries/findIdQuery";
import { getMyIdProps } from "../../apis/types/findId.type";

const Check = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verificationCode, email, name }: locationType = location.state;

  const [code, setCode] = useState<string>("");
  const [codeAnswer, setCodeAnswer] = useState<string>("");
  const [id, setId] = useState<string>("");

  const info: getMyIdProps = {
    email: email,
    name: name,
  };
  //query
  const { mutate: getId } = useMutation(() => getMyId(info), {
    onSuccess: (res) => {
      setId(res.data);
    },
  });

  //onClick
  const confirmBtnOnClick = () => {
    if (!code) alert("인증 코드를 입력해주세요");
    else if (code === codeAnswer) getId();
  };
  const loginBtnOnClick = () => {
    if (!code) alert("인증을 완료해주세요");
  };

  //onChange
  const codeOnChange = (value: string) => {
    setCode(value);
  };

  useEffect(() => {
    setCodeAnswer(verificationCode);
  }, []);

  return (
    <>
      <CodeInputBox>
        <CodeInput
          value={code}
          placeholder="인증코드"
          onChange={(e) => codeOnChange(e.target.value)}
        />
        <ConfirmBtn onClick={() => confirmBtnOnClick()}>인증</ConfirmBtn>
      </CodeInputBox>
      {id && (
        <SearchResultBox>
          <span>조회 결과</span>
          <SearchResult>{id}</SearchResult>
        </SearchResultBox>
      )}
      <LoginBtn onClick={() => navigate("/login")}>로그인</LoginBtn>
      <FingPwBtnBox>
        <Link to={"/findPw/verification"}>비밀번호 찾기</Link>
      </FingPwBtnBox>
    </>
  );
};

const CodeInputBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 50px;
  width: 80%;
  color: #868686;
`;
const CodeInput = styled.input`
  padding: 15px 18px;
  width: calc(100% - 135px);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
const ConfirmBtn = styled.button`
  box-sizing: border-box;
  width: 80px;
  height: 55px;
  background: #2663ff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
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
const FingPwBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  width: 85%;
  color: #868686;
  a {
    margin-bottom: 5px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: ${({ theme }) => theme.fontSizes.small};
    text-align: center;
    text-decoration-line: underline;
    color: #868686;
  }
`;

const SearchResultBox = styled.div`
  /* display: none; */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 120px;
  width: 100%;
  span {
    padding-bottom: 15px;
  }
`;
const SearchResult = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  text-decoration-line: underline;
  color: #ff6161;
`;

export default Check;
