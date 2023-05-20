import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { emailCheckMutaionPostEmail } from "../../api/queries/RegisterQuery";

const EmailConfirm = () => {
  const navigate = useNavigate();
  const Param = useParams();

  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [timer, setTimer] = useState<string>("");
  const [codeConfirm, setCodeConfrim] = useState<boolean>(false);

  const [codeAnswer, setCodeAnswer] = useState<string>("");
  const { mutate: emailCheck, isLoading: emailCheckLoading } = useMutation(
    () => emailCheckMutaionPostEmail(email),
    {
      onSuccess: (res) => {
        setCodeAnswer(res.data.verificationCode);
        alert("이메일에 전송된 인증코드를 확인해주세요");
      },
      onError: (err) => {
        console.log(err);
      },
    }
  );

  //onChange
  const emailPattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const emailOnChange = (emailText: string) => {
    setEmail(emailText);
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
      timerInterval();
    }
  };
  const codeBtnOnClick = () => {
    if (!code) alert("인증번호를 입력해주세요");
    else if (code !== codeAnswer) alert("인증번호가 알맞지 않습니다");
    else {
      alert("인증완료");
      setCodeConfrim(true);
    }
  };
  const nextBtnOnClick = () => {
    if (!email) alert("이메일을 입력해주세요");
    else if (!emailPattern.test(email)) alert("이메일 형식을 맞춰주세요");
    else if (!code) alert("인증번호를 입력해주세요");
    else if (!codeConfirm) alert("인증번호 확인을 완료해주세요");
    else
      navigate(`/register/${Param.RegisterType}/Privacy`, {
        state: {
          email: email,
        },
      });
  };

  //인증코드 유효 타이머
  const timerInterval = () => {
    var time: any = 600;
    var min: any = 0;
    var sec: any = 0;

    var x = setInterval(() => {
      min = time / 60;
      sec = time % 60;
      setTimer(`${Math.floor(min)}분${sec}초`);
      time--;
      if (time < 0) {
        clearInterval(x);
        setTimer(`시간초과`);
      }
    }, 1000);
  };

  return (
    <>
      <EmailBox valid={email.length > 0 ? emailPattern.test(email) : true}>
        <EmailInput
          value={email}
          placeholder="이메일"
          onChange={(e) => emailOnChange(e.target.value)}
        />
        <EmailSendBtn onClick={() => emailBtnOnClick()}>
          인증 메일 전송
        </EmailSendBtn>
      </EmailBox>
      <ConfirmBox valid={true}>
        <ConfirmInput
          value={code}
          placeholder="인증코드"
          onChange={(e) => codeOnChange(e.target.value)}
        />
        <ConfirmBtn onClick={() => codeBtnOnClick()}>인증</ConfirmBtn>
        {timer && <TimerBox>{timer}</TimerBox>}
      </ConfirmBox>
      <NextBtn onClick={() => nextBtnOnClick()}>다음</NextBtn>
    </>
  );
};

const EmailBox = styled.div<{ valid: any }>`
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
          font-size: ${({ theme }) => theme.fontSizes.small};
          color: #ff0000;
        }
      `;
    }
  }}
`;
const EmailInput = styled.input`
  margin-right: 15px;
  width: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;
const EmailSendBtn = styled.button`
  padding: 5px 10px;
  width: 110px;
  background: #2663ff;
  box-sizing: border-box;
  border: none;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.white};
`;

const ConfirmBox = styled(EmailBox)`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 45px;
  width: 100%;
`;
const TimerBox = styled.div`
  position: absolute;
  top: 100%;
  left: calc(10% + 10px);
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: #ff0000;
`;
const ConfirmInput = styled(EmailInput)``;
const ConfirmBtn = styled(EmailSendBtn)``;

const NextBtn = styled(EmailSendBtn)`
  margin-top: 190px;
  width: 187px;
  height: 55px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export default EmailConfirm;
