import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import styled, { css } from "styled-components";
import {
  putConsumerInfoChange,
  putOwnerInfoChange,
} from "../../apis/queries/myPageQuery";
import Swal from "sweetalert2";
import { useRecoilState, useRecoilValue } from "recoil";
import { Email, Id, Name } from "../../store/userInfoAtom";
import { role } from "../../apis/types/common.type";
import { userUpdateProps } from "../../apis/types/mypage.type";
import { AxiosError } from "axios";
import PopUp from "./PopUp";

const Info = () => {
  const nameDate = useRecoilValue(Name);
  const [emailDate, setEmailDate] = useRecoilState(Email);
  const IdDate = useRecoilValue(Id);

  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    setId(IdDate);
    setName(nameDate);
    setEmail(emailDate);
  }, [IdDate, emailDate, nameDate]);

  const info: userUpdateProps = {
    email: emailDate,
    username: id,
    name: name,
    memberId: localStorage.getItem("memberId"),
  };
  //고객 정보 업데이트 query
  const { mutate: consumerInfoChange } = useMutation(
    () => putConsumerInfoChange(info),
    {
      onSuccess: (res) => {
        Swal.fire({
          text: "정보수정 성공",
          icon: "success",
          confirmButtonColor: "#0075FF",
        });
      },
      onError: (err: any) => {
        alert(err.response.data.message);
      },
    }
  );
  //사업자 정보 업데이트 query
  const { mutate: ownerInfoChange } = useMutation(
    () => putOwnerInfoChange(info),
    {
      onSuccess: (res) => {
        console.log(res.data);
        Swal.fire({
          text: "정보수정 성공",
          icon: "success",
          confirmButtonColor: "#0075FF",
        });
      },
      onError: (err: AxiosError) => {
        console.log(err);
        console.log("사업자 정보 업데이트");
      },
    }
  );

  //onChange
  const idPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,15}$/;
  const idOnChange = (idText: string) => {
    setId(idText);
  };
  const emailOnChange = (emailText: string) => {
    setEmail(emailText);
  };
  const userNamePattern = /^[ㄱ-ㅎ가-힣a-zA-Z]{1,10}$/;
  const nameOnChange = (nameText: string) => {
    setName(nameText);
  };

  //onClick
  const saveBtnOnClick = () => {
    if (!id) alert("아이디를 입력해주세요");
    else if (!id) alert("이름을 입력해주세요");
    else if (!idPattern.test(id)) alert("아이디가 형식에 맞지 않습니다");
    else if (!userNamePattern.test(name)) alert("이름이 형식에 맞지 않습니다");
    else {
      if (localStorage.getItem("role") === role.ROLE_CONSUMER)
        consumerInfoChange();
      else ownerInfoChange();
    }
  };

  const [emailPopUp, setEmailPopUpBoolean] = useState<boolean>(true);

  return (
    <SignUpContainer>
      <PopUp
        email={email}
        setEmail={setEmail}
        emailOnChange={emailOnChange}
        setEmailDate={setEmailDate}
        verson={emailPopUp ? "이메일" : "비밀번호"}
        pw={pw}
        setPw={setPw}
      />
      <IdBox valid={id.length > 0 ? idPattern.test(id) : true}>
        <IdText>아이디</IdText>
        <IdInput
          defaultValue={id}
          onChange={(e) => idOnChange(e.target.value)}
        />
      </IdBox>
      <NameBox valid={name.length > 0 ? userNamePattern.test(name) : true}>
        <NameText>이름</NameText>
        <NameInput
          defaultValue={name}
          onChange={(e) => nameOnChange(e.target.value)}
        />
      </NameBox>
      <PwBox valid={true}>
        <PwText>비밀번호</PwText>
        <PwInput type="password" defaultValue={pw} />
        <PwBtn htmlFor="popup" onClick={() => setEmailPopUpBoolean(false)}>
          변경
        </PwBtn>
      </PwBox>
      <EmailBox valid={true}>
        <EmailText>이메일</EmailText>
        <EmailInput
          defaultValue={emailDate}
          onChange={(e) => emailOnChange(e.target.value)}
          disabled
        />
        <EmailBtn htmlFor="popup" onClick={() => setEmailPopUpBoolean(true)}>
          변경
        </EmailBtn>
      </EmailBox>
      <SaveBtn onClick={() => saveBtnOnClick()}>저장</SaveBtn>
    </SignUpContainer>
  );
};

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 90px 80px;
  margin: 0 auto;
  box-sizing: border-box;
  width: 580px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const SaveBtn = styled.button`
  margin-top: 20px;
  box-sizing: border-box;
  width: 187px;
  height: 55px;
  background: #2663ff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const IdBox = styled.div<{ valid: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  width: 100%;
  ${(props) => {
    if (!props.valid) {
      return css`
        input {
          border-color: #ff3a3a;
        }
        &::after {
          content: "영어,숫자를 포함해서 4~15자 이내로 입력해주세요.";
          position: absolute;
          top: 100%;
          left: 20%;
          font-size: 12px;
          color: #ff0000;
        }
      `;
    }
  }}
`;
const IdText = styled.h3`
  margin: 0;
  width: 20%;
  font-weight: 900;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;
const IdInput = styled.input`
  padding: 5px 3px;
  width: 80%;
  height: fit-content;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const EmailBox = styled(IdBox)`
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
const EmailText = styled(IdText)``;
const EmailInput = styled(IdInput)`
  width: calc(80% - 80px);
  background-color: #ececec;
`;
const EmailBtn = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 31.25px;
  background: #2663ff;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const PwBox = styled(EmailBox)`
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
const PwText = styled(EmailText)``;
const PwInput = styled(EmailInput)``;
const PwBtn = styled(EmailBtn)``;

const NameBox = styled(IdBox)``;
const NameText = styled(IdText)``;
const NameInput = styled(IdInput)``;

export default Info;
