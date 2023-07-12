import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useMutation } from "@tanstack/react-query";
import { postInfo } from "../../apis/queries/findPwQuery";
import { AxiosError } from "axios";

const Verification = () => {
  const navigate = useNavigate();

  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { mutate: getTemporaryPw } = useMutation(() => postInfo(email, id), {
    onSuccess: (res) => {
      alert("임시 비밀번호가 이메일로 전송됬습니다");
      navigate("/login");
    },
    onError: (err: AxiosError<any>) => {
      alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
    },
  });

  //onChange
  const idPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,15}$/;
  const IdOnChange = (IdText: string) => {
    setId(IdText);
  };
  const emailPattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const emailOnChange = (emailText: string) => {
    setEmail(emailText);
  };

  //onClick
  const codeBtnOnClick = () => {
    if (!id) alert("아이디를 입력해주세요");
    else if (!email) alert("이메일을 입력해주세요");
    else if (!idPattern.test(id)) alert("아이디 양식에 맞게 입력해주세요.");
    else {
      getTemporaryPw();
    }
  };

  return (
    <>
      <IdBox valid={id.length > 0 ? idPattern.test(id) : true}>
        <IdInput
          value={id}
          placeholder="아이디"
          onChange={(e) => IdOnChange(e.target.value)}
        />
      </IdBox>
      <EmailBox valid={email.length > 0 ? emailPattern.test(email) : true}>
        <EmailInput
          value={email}
          placeholder="이메일"
          onChange={(e) => emailOnChange(e.target.value)}
        />
      </EmailBox>
      <ConfirmBtn onClick={() => codeBtnOnClick()}>
        임시 비밀번호 발급
      </ConfirmBtn>
    </>
  );
};

const EmailBox = styled.div<{ valid: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 45px;
  width: 100%;
  ${(props) => {
    if (!props.valid) {
      return css`
        input {
          border-color: #ff3a3a;
        }
        &::after {
          content: "이메일 형식에 맞게 입력해주세요.";
          position: absolute;
          top: calc(100% + 2px);
          left: 10%;
          font-size: 12px;
          color: #ff0000;
        }
      `;
    }
  }}
`;
const EmailInput = styled.input`
  padding: 15px 10px;
  width: 75%;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
const EmailSendBtn = styled.button`
  padding: 5px 10px;
  width: 110px;
  background: #2663ff;
  box-sizing: border-box;
  border: none;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

const ConfirmBtn = styled(EmailSendBtn)`
  margin-top: 100px;
  width: 200px;
  height: 55px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

const IdBox = styled(EmailBox)`
  ${(props) => {
    if (!props.valid) {
      return css`
        &::after {
          content: "영어,숫자를 포함 4~15자 이내로 입력해주세요.";
        }
      `;
    }
  }}
`;
const IdInput = styled(EmailInput)``;

export default Verification;
