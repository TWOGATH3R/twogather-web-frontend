import React, { useState } from "react";
import styled, { css } from "styled-components";

const FindPw = () => {
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [timer, setTimer] = useState<string>("");
  const [newPw, setNewPw] = useState<string>("");
  const [pwCheck, setPwCheck] = useState<string>("");
  const [codeConfirm, setCodeConfrim] = useState<boolean>(false);

  //onChange
  const emailPattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const emailOnChange = (emailText: string) => {
    setEmail(emailText);
  };
  const codeOnChange = (codeText: string) => {
    setCode(codeText);
  };
  const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
  const newPwOnChange = (newPwText: string) => {
    setNewPw(newPwText);
  };
  const pwCheckOnChange = (pwCheckText: string) => {
    setPwCheck(pwCheckText);
  };

  //onClick
  const emailBtnOnClick = () => {
    if (!email) alert("이메일을 입력해주세요");
    else if (!emailPattern.test(email)) alert("이메일이 형식에 맞지 않습니다");
    else timerInterval();
  };
  const codeBtnOnClick = () => {
    if (!email) alert("이메일을 입력해주세요");
    else if (!code) alert("인증번호를 입력해주세요");
    else if (!code === null) alert("인증번호가 알맞지 않습니다");
    else {
      alert("인증완료");
      setCodeConfrim(true);
    }
  };
  const changeOnClick = () => {
    if (!newPw) alert("비밀번호를 입력해주세요");
    else if (!pwCheck) alert("비밀번호를 확인해주세요");
    else if (!pwPattern.test(newPw)) alert("비밀번호가 양식에 맞지 않습니다");
    else if (newPw !== pwCheck) alert("비밀번호가 일치하지 않습니다");
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
    <FindPwContainer>
      <FindPwWrraper>
        <Title>비밀번호 찾기</Title>
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
        {codeConfirm && (
          <>
            <NewPwBox valid={newPw.length > 0 ? pwPattern.test(newPw) : true}>
              <NewPwInput
                value={newPw}
                placeholder="새 비밀번호"
                onChange={(e) => newPwOnChange(e.target.value)}
              />
            </NewPwBox>
            <PwCheckBox valid={pwCheck.length > 0 ? pwCheck === newPw : true}>
              <PwCheckInput
                value={pwCheck}
                placeholder="비밀번호 확인"
                onChange={(e) => pwCheckOnChange(e.target.value)}
              />
            </PwCheckBox>
            <ChangeBtn onClick={() => changeOnClick()}>변경</ChangeBtn>
          </>
        )}
      </FindPwWrraper>
    </FindPwContainer>
  );
};

const FindPwContainer = styled.div`
  padding-top: 8vh;
  height: calc(93vh - 8vh);
  font-family: "Inter";
  font-weight: 400;
`;
const FindPwWrraper = styled.div`
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
  padding-bottom: 60px;
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
`;

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
  margin-right: 15px;
  padding: 15px 10px;
  width: 50%;
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

const ConfirmBox = styled(EmailBox)``;
const TimerBox = styled.div`
  position: absolute;
  top: 100%;
  left: calc(10% + 10px);
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: #ff0000;
`;
const ConfirmInput = styled(EmailInput)``;
const ConfirmBtn = styled(EmailSendBtn)``;

const NewPwBox = styled(EmailBox)`
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
const NewPwInput = styled(EmailInput)`
  margin-right: 125px;
`;

const PwCheckBox = styled(NewPwBox)`
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
const PwCheckInput = styled(NewPwInput)``;

const ChangeBtn = styled(EmailSendBtn)`
  margin-top: 20px;
  width: 187px;
  height: 55px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export default FindPw;
