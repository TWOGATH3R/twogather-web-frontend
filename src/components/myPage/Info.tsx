import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import styled, { css } from "styled-components";
import {
  getConsumerInfo,
  getOwnerInfo,
  putConsumerInfoChange,
  putOwnerInfoChange,
} from "../../apis/queries/MyPageQuery";
import { useRecoilState } from "recoil";
import { Name } from "../../store/userInfoAtom";

const Info = () => {
  const [nameDate,setNameDate] = useRecoilState(Name);

  const [id, setId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

  const info = {
    email: email,
    username: id,
    name: name,
    memberId: localStorage.getItem("memberId"),
  };
  //고객 정보 업데이트 query
  const { mutate: consumerInfoChange } = useMutation(
    () => putConsumerInfoChange(info),
    {
      onSuccess: (res) => {
        alert("수정 성공");
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
        alert("수정 성공");
      },
      onError: (err: any) => {
        alert(err.response.data.message);
      },
    }
  );
  //고객 정보 가져오기 query
  const { mutate: consumerInfoGet } = useMutation(
    () => getConsumerInfo(info.memberId),
    {
      onSuccess: (res) => {
        console.log(res);
        setNameDate(res.data.name);
        setEmail(res.data.email);
        setName(res.data.name);
        setId(res.data.username);
      },
      onError: (err: any) => {
        alert(err.response.data.message);
      },
    }
  );
  //사업자 정보 가져오기 query
  const { mutate: ownerInfoGet } = useMutation(
    () => getOwnerInfo(info.memberId),
    {
      onSuccess: (res) => {
        console.log(res);
        setEmail(res.data.email);
        setName(res.data.name);
        setId(res.data.username);
      },
      onError: (err: any) => {
        alert(err.response.data.message);
      },
    }
  );

  //onChange
  const idPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,15}$/;
  const idOnChange = (idText: string) => {
    setId(idText);
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
    if (localStorage.getItem("role") === "ROLE_CONSUMER") consumerInfoChange();
    else ownerInfoChange();
  };

  useEffect(() => {
    if (localStorage.getItem("role") === "ROLE_CONSUMER") consumerInfoGet();
    else ownerInfoGet();
  }, []);

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
