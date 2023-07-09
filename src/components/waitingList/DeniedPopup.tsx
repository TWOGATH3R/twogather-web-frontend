import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import { patchDeniedReason } from "../../apis/queries/adminQuery";
import Swal from "sweetalert2";

interface infoType {
  storeId: number;
}
const DeniedPopup = ({ storeId }: infoType) => {
  const [text, setText] = useState<string>("");

  const { mutate: sendText } = useMutation(
    () => patchDeniedReason(storeId, text),
    {
      onSuccess: (res) => {
        const background = document.querySelector(
          "#denied"
        ) as HTMLInputElement;
        background.checked = false;
      },
    }
  );

  const sendBtnOnClick = () => {
    if (!text) alert("사유를 입력해주세요.");
    else {
      Swal.fire({
        title: "거부 하시겠습니까?",
        confirmButtonColor: "#0075FF",
        cancelButtonColor: "#738598",
        showCancelButton: true,
        confirmButtonText: "예",
        cancelButtonText: "취소",
        padding: "3em",
      }).then((result) => {
        if (result.isConfirmed) {
          sendText();
        }
      });
    }
  };

  const textOnChange = (value: string) => {
    setText(value);
  };

  return (
    <Background htmlFor="denied">
      <PopupContainer>
        <Title>거부사유</Title>
        <InputBox
          value={text}
          placeholder="사유를 입력해주세요."
          onChange={(e) => textOnChange(e.target.value)}
        />
        <BtnBox>
          <CloseBtn htmlFor="denied">취소</CloseBtn>
          <SendBtn onClick={() => sendBtnOnClick()}>전송</SendBtn>
        </BtnBox>
      </PopupContainer>
    </Background>
  );
};

const Background = styled.label`
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  min-height: 100vh;
  background-color: #3f3f3f34;
`;
const PopupContainer = styled.div`
  position: sticky;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 300px;
  height: 250px;
  background-color: #ffffff;
`;
const Title = styled.h3``;
const InputBox = styled.textarea`
  box-sizing: border-box;
  margin-top: 5px;
  padding: 5px;
  width: 100%;
  height: 50%;
  border: 2px solid #0000004b;
  font-size: 1rem;
  outline: none;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: small;
`;
const SendBtn = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 70px;
  height: 30px;
  background: #4d74ff;
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  :hover {
    cursor: pointer;
  }
`;
const CloseBtn = styled(SendBtn)`
  box-sizing: border-box;
  margin-right: 15px;
  width: 70px;
  height: 30px;
  background: #4d74ff;
  color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  :hover {
    cursor: pointer;
  }
`;

export default DeniedPopup;
