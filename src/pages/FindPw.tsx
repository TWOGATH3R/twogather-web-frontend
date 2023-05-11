import React from "react";
import styled from "styled-components";

const FindPw = () => {
  return (
    <FindPwContainer>
      <FindPwWrraper>
        <Title>비밀번호 찾기</Title>
        <EmailBox>
          <EmailInput placeholder="이메일" />
          <EmailSendBtn>인증 메일 전송</EmailSendBtn>
        </EmailBox>
        <ConfirmBox>
          <ConfirmInput placeholder="인증코드" />
          <ConfirmBtn>인증</ConfirmBtn>
        </ConfirmBox>
        <HideBox>
          <NewPwBox>
            <NewPwInput placeholder="새 비밀번호" />
          </NewPwBox>
          <PwCheckBox>
            <PwCheckInput placeholder="비밀번호 확인" />
          </PwCheckBox>
          <ChangeBtn>변경</ChangeBtn>
        </HideBox>
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

const EmailBox = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 45px;
  width: 100%;
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
const ConfirmInput = styled(EmailInput)``;
const ConfirmBtn = styled(EmailSendBtn)``;

const HideBox = styled.div`
  display: none;
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const NewPwBox = styled(EmailBox)``;
const NewPwInput = styled(EmailInput)`
  margin-right: 125px;
`;

const PwCheckBox = styled(NewPwBox)``;
const PwCheckInput = styled(NewPwInput)``;

const ChangeBtn = styled(EmailSendBtn)`
  margin-top: 20px;
  width: 187px;
  height: 55px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export default FindPw;
