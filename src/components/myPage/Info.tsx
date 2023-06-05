import React, { useState } from "react";
import { useMutation } from "react-query";
import styled, { css } from "styled-components";
import { putInfoChange } from "../../apis/queries/MyPageQuery";

const Info = () => {
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const info = {
    email: email,
    username: id,
    password: pw,
    name: name,
    memberId: localStorage.getItem("memberId")
  };
  const { mutate: infoChange } = useMutation(() => putInfoChange(info), {
    onSuccess: (res) => {
      alert("수정 성공")
    },
    onError: (err: any) => {
      alert(err.response.data.message);
    },
  });

  //onChange
  const idPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,15}$/;
  const idOnChange = (idText: string) => {
    setId(idText);
  };
  const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
  const pwOnChange = (pwText: string) => {
    setPw(pwText);
  };
  const emailPattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const emailOnChange = (emailText: string) => {
    setEmail(emailText);
  };
  const nameOnChange = (nameText: string) => {
    setName(nameText);
  };

  //onClick
  const saveBtnOnClick = () => {
    if (localStorage.getItem("role") === "ROLE_CONSUMER") infoChange();
    else console.log("사업자 전용 함수자리");
  };

  return (
    <SignUpContainer>
      <IdBox valid={id.length > 0 ? idPattern.test(id) : true}>
        <IdText>아이디</IdText>
        <IdInput value={id} onChange={(e) => idOnChange(e.target.value)} />
      </IdBox>
      <EmailBox valid={email.length > 0 ? emailPattern.test(email) : true}>
        <EmailText>이메일</EmailText>
        <EmailInput
          value={email}
          onChange={(e) => emailOnChange(e.target.value)}
        />
      </EmailBox>
      <NameBox valid={true}>
        <NameText>이름</NameText>
        <NameInput
          value={name}
          onChange={(e) => nameOnChange(e.target.value)}
        />
      </NameBox>
      <PwBox valid={pw.length > 0 ? pwPattern.test(pw) : true}>
        <PwText>비밀번호</PwText>
        <PwInput
          type="password"
          value={pw}
          onChange={(e) => pwOnChange(e.target.value)}
        />
      </PwBox>
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
  font-size: ${({ theme }) => theme.fontSizes.small};
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
const EmailInput = styled(IdInput)``;

const NameBox = styled(IdBox)``;
const NameText = styled(IdText)``;
const NameInput = styled(IdInput)``;

const PwBox = styled(IdBox)`
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
const PwText = styled(IdText)``;
const PwInput = styled(IdInput)``;

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

export default Info;
