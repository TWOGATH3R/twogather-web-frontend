import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const EmailConfirm = () => {
  const navigate = useNavigate();
  const Param = useParams();
  console.log(Param);
  return (
    <>
      <EmailBox>
        <EmailInput placeholder="이메일" />
        <EmailSendBtn>인증 메일 전송</EmailSendBtn>
      </EmailBox>
      <ConfirmBox>
        <ConfirmInput placeholder="인증코드" />
        <ConfirmBtn>인증</ConfirmBtn>
      </ConfirmBox>
      <NextBtn
        onClick={() => navigate(`/register/${Param.RegisterType}/Privacy`)}
      >
        다음
      </NextBtn>
    </>
  );
};

const EmailBox = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 45px;
  width: 100%;
`;
const EmailInput = styled.input`
  margin-right: 15px;
  width: 50%;
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

const ConfirmBox = styled(EmailBox)``;
const ConfirmInput = styled(EmailInput)``;
const ConfirmBtn = styled(EmailSendBtn)``;

const NextBtn = styled(EmailSendBtn)`
  margin-top: 190px;
  width: 187px;
  height: 55px;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export default EmailConfirm;
