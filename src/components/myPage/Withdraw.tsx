import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import styled, { css } from 'styled-components';
import {
  consumerPwCheck,
  deleteConsumer,
} from '../../apis/queries/MyPageQuery';

const Withdraw = () => {
  const [pw, setPw] = useState<string>('');

  const memberId = localStorage.getItem('memberId');
  //고객 회원탈퇴
  const { mutate: consumerDelete } = useMutation(
    () => deleteConsumer(memberId),
    {
      onSuccess: res => {
        console.log(res);
      },
      onError: (err: any) => {
        alert(err.response.data.message);
      },
    },
  );
  //고객 비밀번호 확인
  const { mutate: pwCheckConsumer } = useMutation(() => consumerPwCheck(pw), {
    onSuccess: res => {
      console.log(res.isValid);
      if (res.isValid) consumerDelete();
    },
    onError: (err: any) => {
      alert(err.response.data.message);
    },
  });

  //onChange
  const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
  const pwOnChange = (pwText: string) => {
    setPw(pwText);
  };

  //onClick
  const WithdrawBtnOnClick = () => {
    pwCheckConsumer();
  };

  return (
    <WithdrawContainer>
      <PwBox valid={pw.length > 0 ? pwPattern.test(pw) : true}>
        <PwText>비밀번호</PwText>
        <PwInput
          type='password'
          value={pw}
          onChange={e => pwOnChange(e.target.value)}
        />
      </PwBox>
      <WithdrawBtn onClick={WithdrawBtnOnClick}>탈퇴하기</WithdrawBtn>
    </WithdrawContainer>
  );
};

const WithdrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 70px 70px 40px;
  margin: 0 auto;
  box-sizing: border-box;
  width: 580px;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const PwBox = styled.div<{ valid: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  width: 80%;
  ${props => {
    if (!props.valid) {
      return css`
        input {
          border-color: #ff3a3a;
        }
        &::after {
          content: '영어,숫자를 포함 8~20자 이내로 입력해주세요.';
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
const PwText = styled.h3`
  margin: 0;
  width: 20%;
  font-weight: 900;
  font-size: ${({ theme }) => theme.fontSizes.small};
`;
const PwInput = styled.input`
  padding: 5px 3px;
  width: 80%;
  height: fit-content;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-size: ${({ theme }) => theme.fontSizes.small};
`;

const WithdrawBtn = styled.button`
  margin-top: 40px;
  box-sizing: border-box;
  width: 167px;
  height: 55px;
  background: #2663ff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;

export default Withdraw;
