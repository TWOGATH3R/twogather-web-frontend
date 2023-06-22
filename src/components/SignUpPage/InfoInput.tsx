import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams, useLocation } from "react-router";
import styled, { css } from "styled-components";

import {
  consumersMutaionPostInfo,
  storeOwnerMutaionPostInfo,
} from "../../apis/queries/signUpQuery";
import { userSignUpProps } from "../../apis/types/signup.type";

const InfoInput = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();

  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<string>("");
  const [name, setName] = useState<string>("");

  const info: userSignUpProps = {
    email: location.state.email,
    username: id,
    password: pw,
    name: name,
  };
  //개인 회원가입 query
  const { mutate: consumersSignUp, isLoading: consumersSignUpLoading } =
    useMutation(() => consumersMutaionPostInfo(info), {
      onSuccess: (res) => {
        navigate("/login");
        alert("회원가입 성공");
      },
      onError: (err: any) => {
        alert(err.response.data.message);
      },
    });

  //사업자 회원가입 query
  const { mutate: storeOwnerSignUp, isLoading: storeOwnerSignUpLoading } =
    useMutation(() => storeOwnerMutaionPostInfo(info), {
      onSuccess: (res) => {
        navigate("/login");
        alert("회원가입 성공");
      },
      onError: (err: any) => {
        alert(err.response.data.message);
      },
    });

  //onChange
  const idOnChange = (idText: string) => {
    setId(idText);
  };
  const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
  const pwOnChange = (pwText: string) => {
    setPw(pwText);
  };
  const pwCheckOnChange = (pwCheckText: string) => {
    setPwCheck(pwCheckText);
  };
  const userNamePattern = /^[ㄱ-ㅎ가-힣a-zA-Z]{1,10}$/;
  const nameOnChange = (nameText: string) => {
    setName(nameText);
  };

  //onClick
  const nextBtnOnClick = () => {
    if (!pw) alert("비밀번호를 입력해주세요");
    else if (!pwPattern.test(pw)) alert("비밀번호가 양식에 맞지 않습니다");
    else if (!pwCheck) alert("비밀번호를 확인해주세요");
    else if (pw !== pwCheck) alert("비밀번호가 일치하지 않습니다");
    else if (!name) alert("이름을 입력해주세요");
    else if (!userNamePattern.test(name)) alert("이름이 양식에 맞지 않습니다");
    else if (param.signUpType === "customer") {
      //고객전용 회원가입 api 실행
      consumersSignUp();
    } else storeOwnerSignUp();
  };

  return (
    <>
      <NameInputBox valid={name.length > 0 ? userNamePattern.test(name) : true}>
        <NameText>이름</NameText>
        <NameInput
          value={name}
          placeholder="이름을 입력해주세요"
          onChange={(e) => nameOnChange(e.target.value)}
        />
      </NameInputBox>
      <IdCheckInputBox valid={true}>
        <IdCheckText>아이디</IdCheckText>
        <IdCheckInput
          value={id}
          placeholder="아이디"
          onChange={(e) => idOnChange(e.target.value)}
        />
      </IdCheckInputBox>
      <PwInputBox valid={pw.length > 0 ? pwPattern.test(pw) : true}>
        <PwText>비밀번호</PwText>
        <PwInput
          value={pw}
          placeholder="비밀번호"
          onChange={(e) => pwOnChange(e.target.value)}
          type="password"
        />
      </PwInputBox>
      <PwCheckInputBox valid={pwCheck.length > 0 ? pwCheck === pw : true}>
        <PwCheckText>비밀번호 확인</PwCheckText>
        <PwCheckInput
          value={pwCheck}
          placeholder="비밀번호 확인"
          onChange={(e) => pwCheckOnChange(e.target.value)}
          type="password"
        />
      </PwCheckInputBox>
      {param.signUpType === "storeowner" ? (
        <NextBtn onClick={() => nextBtnOnClick()}>다음</NextBtn>
      ) : (
        <CompleteBtn onClick={() => nextBtnOnClick()}>완료</CompleteBtn>
      )}
    </>
  );
};

const PwInputBox = styled.div<{ valid: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
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
          left: 40%;
          font-size: 12px;
          color: #ff0000;
        }
      `;
    }
  }}
`;
const PwText = styled.h3`
  width: 30%;
  font-weight: 400;
`;
const PwInput = styled.input`
  width: 45%;
  height: fit-content;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const IdCheckInputBox = styled(PwInputBox)`
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
const IdCheckText = styled(PwText)``;
const IdCheckInput = styled(PwInput)``;

const PwCheckInputBox = styled(PwInputBox)`
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
const PwCheckText = styled(PwText)``;
const PwCheckInput = styled(PwInput)``;

const NameInputBox = styled(PwInputBox)`
  ${(props) => {
    if (!props.valid) {
      return css`
        &::after {
          content: "영어or한글 10자 이내로 입력해주세요.";
        }
      `;
    }
  }}
`;
const NameText = styled(PwText)``;
const NameInput = styled(PwInput)``;

const NextBtn = styled.button`
  margin-top: 80px;
  width: 187px;
  height: 55px;
  background: #2663ff;
  box-sizing: border-box;
  border: none;
  border-radius: 20px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.white};
`;
const CompleteBtn = styled(NextBtn)``;

export default InfoInput;
