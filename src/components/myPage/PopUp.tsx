import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { emailCheckMutaionPostEmail } from "../../apis/queries/signUpQuery";
import Swal from "sweetalert2";
import sendMailImg from "../../assets/sendmail.svg";
import { putUserPw, userPwCheck } from "../../apis/queries/myPageQuery";
import { AxiosError } from "axios";

interface info {
  setEmailDate: (value: string) => void;
  verson: "비밀번호" | "이메일";
  pw: string;
  setPw: (value: string) => void;
}
const PopUp = ({ setEmailDate, verson, pw, setPw }: info) => {
  //email 인증,변경 state
  const emailPattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const [code, setCode] = useState<string>("");
  const [codeAnswer, setCodeAnswer] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  //pw 변경 state
  const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
  // const [pw, setPw] = useState<string>("");
  const [changePw, setChangePw] = useState<string>("");
  const [checkPw, setCheckPw] = useState<string>("");

  const [pwCheckBoolean, setPwCheckBoolean] = useState<boolean>(false);
  //email 확인 query
  const { mutate: emailCheck } = useMutation(
    () => emailCheckMutaionPostEmail(email),
    {
      onSuccess: (res) => {
        console.log(res);
        setCodeAnswer(res.data.verificationCode);
      },
      onError: (err: AxiosError<any>) => {
        alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
      },
    }
  );
  //비밀번호 확인 query
  const info = {
    pw,
    memberId: localStorage.getItem("memberId"),
  };
  const { mutate: pwCheck } = useMutation(() => userPwCheck(info), {
    onSuccess: (res) => {
      if (res.data.isValid) {
        setPwCheckBoolean(true);
        alert("획인완료");
      }
    },
    onError: (err: AxiosError<any>) => {
      alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
    },
  });
  //비밀번호 변경 query
  const { mutate: pwUpdate } = useMutation(() => putUserPw(info), {
    onSuccess: (res) => {
      alert("비밀번호 변경 완료");
      const input = document.querySelector("#popup") as HTMLInputElement;
      input.checked = false;
      setPw("");
      setChangePw("");
      setCheckPw("");
    },
    onError: (err: AxiosError<any>) => {
      alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
    },
  });

  //onChange
  const codeOnChange = (codeText: string) => {
    setCode(codeText);
  };
  const pwOnChange = (value: string) => {
    setPw(value);
  };
  const pwChangeOnChange = (value: string) => {
    setChangePw(value);
  };
  const pwCheckOnChange = (value: string) => {
    setCheckPw(value);
  };
  const emailOnChange = (value: string) => {
    setEmail(value);
  };

  //onClick
  const emailBtnOnClick = () => {
    if (!email) alert("이메일을 입력해주세요");
    else if (!emailPattern.test(email)) alert("이메일이 형식에 맞지 않습니다");
    else {
      emailCheck();
      const emailBtn = document.querySelector(".emailBtn") as HTMLElement;
      emailBtn.innerText = "재전송";
      Swal.fire({
        text: "이메일로 인증코드를 발송했습니다.",
        imageUrl: `${sendMailImg}`,
        confirmButtonColor: "#0075FF",
      });
    }
  };
  const codeBtnOnClick = () => {
    if (!code) alert("인증번호를 입력해주세요");
    else if (code !== codeAnswer) alert("인증번호가 알맞지 않습니다");
    else {
      alert("인증성공");
      const input = document.querySelector("#popup") as HTMLInputElement;
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
  const pwCheckOnClick = () => {
    if (!pw) alert("현재 비밀번호를 입력해주세요");
    else if (!pwPattern.test(pw)) alert("비밀번호를 양식에 맞춰주세요");
    else pwCheck();
  };
  const pwChangeBtnOnClick = () => {
    if (!pwCheckBoolean) alert("현재 비밀번호를 확인을 해주세요");
    else if (!changePw) alert("변경할 비밀번호를 입력해주세요");
    else if (!pwPattern.test(changePw)) alert("비밀번호를 양식에 맞춰주세요");
    else if (changePw !== checkPw) alert("비밀번호가 일치하지 않습니다");
    else pwUpdate();
  };

  const versonBoolean = verson === "이메일";

  return (
    <>
      <PopUpInput id="popup" type="checkbox" />
      <PopUpBox>
        <PopUpXBtnBox>
          <label htmlFor="popup" onClick={() => EmailWinodwXBtnOnClick()}>
            X
          </label>
        </PopUpXBtnBox>
        <PopUpText>{versonBoolean ? "이메일 변경" : "비밀번호 변경"}</PopUpText>
        {versonBoolean ? (
          <>
            <EmailChangeBox
              valid={email.length > 0 ? emailPattern.test(email) : true}
            >
              <EmailChangeText>이메일</EmailChangeText>
              <EmailChangeInput
                value={email}
                placeholder="이메일"
                onChange={(e) => emailOnChange(e.target.value)}
              />
              <EmailSendBtn
                className="emailBtn"
                onClick={() => emailBtnOnClick()}
              >
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
          </>
        ) : (
          <>
            <PwNowBox valid={pw.length > 0 ? pwPattern.test(pw) : true}>
              <PwText>현재 비밀번호</PwText>
              <PwInput
                type="password"
                value={pw}
                onChange={(e) => pwOnChange(e.target.value)}
              />
              <PwCheckBtn onClick={() => pwCheckOnClick()}>확인</PwCheckBtn>
            </PwNowBox>
            <PwNowBox
              valid={changePw.length > 0 ? pwPattern.test(changePw) : true}
            >
              <PwText>변경 비밀번호</PwText>
              <PwChangeInput
                type="password"
                value={changePw}
                onChange={(e) => pwChangeOnChange(e.target.value)}
              />
            </PwNowBox>
            <PwCheckBox
              valid={checkPw.length > 0 ? checkPw === changePw : true}
            >
              <PwText>비밀번호 확인</PwText>
              <PwChangeInput
                type="password"
                value={checkPw}
                onChange={(e) => pwCheckOnChange(e.target.value)}
              />
            </PwCheckBox>
            <PwChangeBtn onClick={() => pwChangeBtnOnClick()}>변경</PwChangeBtn>
          </>
        )}
      </PopUpBox>
    </>
  );
};

const PopUpInput = styled.input`
  display: none;
  &:checked {
    & + div {
      display: block;
    }
  }
`;

const PopUpBox = styled.div`
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
const PopUpXBtnBox = styled.p`
  text-align: right;
  label {
    padding-right: 5px;
    font-size: ${({ theme }) => theme.fontSizes.xxl};
    cursor: pointer;
  }
`;
const PopUpText = styled.p`
  padding-bottom: 15px;
  text-decoration: underline;
  font-size: ${({ theme }) => theme.fontSizes.xxl};
`;
const EmailChangeBox = styled.div<{ valid: boolean }>`
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
          content: "이메일 형식에 맞게 입력해주세요";
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
const EmailChangeText = styled.h3`
  margin: 0;
  width: 20%;
  font-weight: 900;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;
const EmailChangeInput = styled.input`
  padding: 5px 3px;
  width: calc(80% - 80px);
  height: fit-content;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: ${({ theme }) => theme.fontSizes.base};
`;
const EmailSendBtn = styled.label`
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

const ConfirmBox = styled(EmailChangeBox)``;
const ConfirmText = styled(EmailChangeText)``;
const ConfirmInput = styled(EmailChangeInput)``;
const ConfirmBtn = styled(EmailSendBtn)``;

const PwNowBox = styled(EmailChangeBox)`
  ${(props) => {
    if (!props.valid) {
      return css`
        &::after {
          content: "영어,숫자를 포함 8~20자 이내로 입력해주세요.";
          left: 23%;
        }
      `;
    }
  }}
`;
const PwText = styled(EmailChangeText)`
  width: 23%;
`;
const PwInput = styled(EmailChangeInput)`
  width: calc(77% - 80px);
`;
const PwCheckBtn = styled(EmailSendBtn)``;

const PwChangeInput = styled(PwInput)`
  width: 77%;
`;
const PwCheckBox = styled(PwNowBox)`
  ${(props) => {
    if (!props.valid) {
      return css`
        &::after {
          content: "일치하지 않습니다.";
          left: 23%;
        }
      `;
    }
  }}
`;

const PwChangeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 10px;
  width: 100px;
  background: #2663ff;
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

export default PopUp;
