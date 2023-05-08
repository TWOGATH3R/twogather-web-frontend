import React from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";

const InfoInput = () => {
  const navigate = useNavigate();
  const param = useParams();

  return (
    <>
      <PwInputBox>
        <PwText>password</PwText>
        <PwInput placeholder="비밀번호" />
      </PwInputBox>
      <PwCheckInputBox>
        <PwCheckText>password</PwCheckText>
        <PwCheckInput placeholder="비밀번호 확인" />
      </PwCheckInputBox>
      <NameInputBox>
        <NameText>name</NameText>
        <NameInput placeholder="입력해주세요" />
      </NameInputBox>
      <PhoneInputBox>
        <PhoneText>phone</PhoneText>
        <PhoneInput placeholder="입력해주세요" />
      </PhoneInputBox>
      {param.RegisterType === "storeowner" ? (
        <NextBtn onClick={() => navigate(`/register/:RegisterType/storeInfo`)}>
          다음
        </NextBtn>
      ) : (
        <CompleteBtn>완료</CompleteBtn>
      )}
    </>
  );
};

const PwInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  width: 100%;
`;
const PwText = styled.h3`
  width: 30%;
  font-weight: 400;
`;
const PwInput = styled.input`
  width: 45%;
  height: fit-content;
`;

const PwCheckInputBox = styled(PwInputBox)``;
const PwCheckText = styled(PwText)``;
const PwCheckInput = styled(PwInput)``;

const NameInputBox = styled(PwInputBox)``;
const NameText = styled(PwText)``;
const NameInput = styled(PwInput)``;

const PhoneInputBox = styled(PwInputBox)``;
const PhoneText = styled(PwText)``;
const PhoneInput = styled(PwInput)``;

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
