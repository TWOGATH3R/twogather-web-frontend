import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FindId = () => {
  const [userName, setUserName] = useState<string>("");

  //onChange
  const userNameOnChange = (userNameText: string) => {
    setUserName(userNameText);
  };

  //onClick
  const findBtnOnClick = () => {
    if (!userName) alert("사용자명을 입력해주세요");
  };

  return (
    <FindIdContainer>
      <FindIdWrraper>
        <Title>아이디 찾기</Title>
        <UserNameInputBox>
          <UserNameInput
            value={userName}
            placeholder="사용자명"
            onChange={(e) => userNameOnChange(e.target.value)}
          />
        </UserNameInputBox>
        <SearchResultBox>
          <span>조회 결과</span>
          <SearchResult>fir*****@naver.com</SearchResult>
        </SearchResultBox>
        <LoginBtn onClick={() => findBtnOnClick()}>조회</LoginBtn>
        <FingPwBtnBox>
          <Link to={"/findPw/verification"}>비밀번호 찾기</Link>
        </FingPwBtnBox>
      </FindIdWrraper>
    </FindIdContainer>
  );
};

const FindIdContainer = styled.div`
  padding-top: 8vh;
  height: calc(93vh - 8vh);
  font-family: "Inter";
  font-weight: 400;
`;
const FindIdWrraper = styled.div`
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
  padding-bottom: 50px;
  font-weight: 400;
  color: #686868;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
`;

const UserNameInputBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
  width: 80%;
  color: #868686;
`;
const UserNameInput = styled.input`
  padding: 15px 18px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  outline: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const SearchResultBox = styled.div`
  display: none;
  /* display: flex; */
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

export default FindId;
