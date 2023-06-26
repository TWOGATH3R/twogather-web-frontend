import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import styled, { css } from "styled-components";
import {
  putConsumerInfoChange,
  putOwnerInfoChange,
} from "../../apis/queries/myPageQuery";

import sendMailImg from "../../assets/sendmail.svg";
import { emailCheckMutaionPostEmail } from "../../apis/queries/signUpQuery";
import Swal from "sweetalert2";
import { useRecoilState, useRecoilValue } from "recoil";
import { Email, Id, Name } from "../../store/userInfoAtom";
import { role } from "../../apis/types/common.type";
import { userUpdateProps } from "../../apis/types/mypage.type";
import { AxiosError } from "axios";

const Info = () => {
  const nameDate = useRecoilValue(Name);
  const [emailDate, setEmailDate] = useRecoilState(Email);
  const IdDate = useRecoilValue(Id);

  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    setId(IdDate);
    setName(nameDate);
    setEmail(emailDate);
  }, [IdDate, emailDate, nameDate]);

  const [codeAnswer, setCodeAnswer] = useState<string>("");
  const { mutate: emailCheck, isLoading: emailCheckLoading } = useMutation(
    () => emailCheckMutaionPostEmail(email),
    {
      onSuccess: (res) => {
        console.log(res);
        setCodeAnswer(res.data.verificationCode);
      },
      onError: (err: any) => {
        alert(err.response.data.message);
      },
    }
  );

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
  const codeOnChange = (codeText: string) => {
    setCode(codeText);
  };

  //onClick
  const emailBtnOnClick = () => {
    if (!email) alert("이메일을 입력해주세요");
    else if (!emailPattern.test(email)) alert("이메일이 형식에 맞지 않습니다");
    else {
      emailCheck();
      const emailBtn = document.querySelector(".emailBtn") as HTMLElement;
      emailBtn.innerText = "재전송";
      if (sendMailImg) {
        Swal.fire({
          text: "이메일로 인증코드를 발송했습니다.",
          imageUrl: `${sendMailImg}`,
          confirmButtonColor: "#0075FF",
        });
      }
    }
  };
  const saveBtnOnClick = () => {
    if (localStorage.getItem("role") === role.ROLE_CONSUMER)
      consumerInfoChange();
    else ownerInfoChange();
  };
  const codeBtnOnClick = () => {
    if (!code) alert("인증번호를 입력해주세요");
    else if (code !== codeAnswer) alert("인증번호가 알맞지 않습니다");
    else {
      alert("인증성공");
      const input = document.querySelector("#email-window") as HTMLInputElement;
      setEmailDate(email);
      input.checked = false;
      setCode("");
      setEmail("");
    }
  };
  const EmailWinodwXBtnOnClick = () => {
    setCode("");
    setEmail("");
  };

  return (
    <SignUpContainer>
      <EmailWindowInput id="email-window" type="checkbox" />
      <EmailWindow>
        <EmailWindowXBtnBox>
          <label
            htmlFor="email-window"
            onClick={() => EmailWinodwXBtnOnClick()}
          >
            X
          </label>
        </EmailWindowXBtnBox>
        <EmailWindowText>이메일 변경하기</EmailWindowText>
        <EmailChangeBox
          valid={email.length > 0 ? emailPattern.test(email) : true}
        >
          <EmailChangeText>이메일</EmailChangeText>
          <EmailChangeInput
            value={email}
            placeholder="이메일"
            onChange={(e) => emailOnChange(e.target.value)}
          />
          <EmailSendBtn className="emailBtn" onClick={() => emailBtnOnClick()}>
            메일 전송
          </EmailSendBtn>
        </EmailChangeBox>
        <ConfirmBox valid={true}>
          <ConfirmText>인증코드</ConfirmText>
          <ConfirmInput
            value={code}
            placeholder="인증코드"
            onChange={(e) => codeOnChange(e.target.value)}
          />
          <ConfirmBtn onClick={() => codeBtnOnClick()}>인증</ConfirmBtn>
        </ConfirmBox>
      </EmailWindow>
      <IdBox valid={id.length > 0 ? idPattern.test(id) : true}>
        <IdText>아이디</IdText>
        <IdInput value={id} onChange={(e) => idOnChange(e.target.value)} />
      </IdBox>
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
      <EmailBox valid={true}>
        <EmailText>이메일</EmailText>
        <EmailInput
          value={emailDate}
          onChange={(e) => emailOnChange(e.target.value)}
          disabled
        />
        <EmailBtn htmlFor="email-window">변경</EmailBtn>
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

const EmailWindowInput = styled.input`
  display: none;
  &:checked {
    & + div {
      display: block;
    }
  }
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

const EmailWindow = styled.div`
  position: absolute;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: none;
  padding: 20px 20px 40px 20px;
  width: 450px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;
const EmailWindowXBtnBox = styled.p`
  text-align: right;
  label {
    padding-right: 5px;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    cursor: pointer;
  }
`;
const EmailWindowText = styled.p`
  padding-bottom: 15px;
  text-decoration: underline;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;
const EmailChangeBox = styled(IdBox)`
  justify-content: space-between;
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
const EmailChangeText = styled(IdText)``;
const EmailChangeInput = styled(IdInput)`
  width: calc(80% - 80px);
`;
const EmailSendBtn = styled(EmailBtn)`
  width: 80px;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const ConfirmBox = styled(EmailChangeBox)``;
const ConfirmText = styled(IdText)``;
const ConfirmInput = styled(EmailChangeInput)``;
const ConfirmBtn = styled(EmailSendBtn)``;

const NameBox = styled(IdBox)``;
const NameText = styled(IdText)``;
const NameInput = styled(IdInput)``;

export default Info;
