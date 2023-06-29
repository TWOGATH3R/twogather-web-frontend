import React, { useState } from "react";
import styled from "styled-components";
import StarClick from "./StarClick";
import { getCookie } from "../cookie/cookie";
import { useRecoilValue } from "recoil";
import { StoreId } from "../../store/storeDetailAtom";
import { postReviewProps } from "../../apis/types/store.type";
import { useMutation } from "@tanstack/react-query";
import { postReview } from "../../apis/queries/storeQuery";
import Swal from "sweetalert2";
import { role } from "../../apis/types/common.type";

const ReviewEnroll = () => {
  const date = new Date();
  const today = date.toISOString().split("T")[0];

  const storeId = useRecoilValue(StoreId);

  const [count, setCount] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const textOnChange = (value: string) => {
    setText(value);
  };

  const info: postReviewProps = {
    consumerId: localStorage.getItem("memberId"),
    storeId: storeId,
    content: text,
    score: count,
  };
  //query
  //리뷰등록 api
  const { mutate: saveReview } = useMutation(() => postReview(info, storeId), {
    onSuccess: (res) => {
      setCount(0);
      setText("");
      Swal.fire({
        text: "리뷰작성 완료",
        icon: "success",
        confirmButtonColor: "#0075FF",
      }).then((result) => {
        if (result.isConfirmed) window.location.reload();
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const enrollBtnOnClick = () => {
    if (getCookie("accessToken") === undefined) alert("로그인 후 이용해주세요");
    else if (localStorage.getItem("role") !== role.ROLE_CONSUMER)
      alert("일반 고객만 리뷰를 작성할 수 있습니다");
    else if (!text) alert("리뷰 내용을 작성해주세요");
    else if (count === 0) alert("별점을 매겨주세요");
    else saveReview();
  };
  const name = localStorage.getItem("name");

  return (
    <Container>
      <TitleBox>
        <NameStarBox>
          <NameText>{name}</NameText>
          <StarClick count={count} setCount={setCount} />
        </NameStarBox>
        <Score>평균 평점: 1.2</Score>
      </TitleBox>
      <Input
        value={text}
        rows={4}
        placeholder="리뷰를 작성해 주세요"
        onChange={(e) => textOnChange(e.target.value)}
      />
      <SubmitBtnBox>
        <DateBox>{today}</DateBox>
        <SubmitButton onClick={() => enrollBtnOnClick()}>
          리뷰 작성
        </SubmitButton>
      </SubmitBtnBox>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100% - 80px);
  padding: 20px 40px;
  border: 1px solid rgba(35, 35, 35, 0.1);
  border-radius: 2px;
`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const Score = styled.div`
  color: #a1a1a1;
  font-weight: bold;
  font-size: 0.75rem;
`;

const SubmitBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const SubmitButton = styled.button`
  width: 105px;
  background-color: #0038ff;
  color: white;
  height: 40px;
  outline: none;
  border: none;
  border-width: 0px;
  border-radius: 2px;
  :hover {
    cursor: pointer;
  }
`;
const Input = styled.textarea`
  outline: none;
  margin-top: 5px;
  padding: 10px 5px;
  width: 100%;
  border: 2px solid gray;
  border-radius: 5px;
  font-size: 1rem;
  margin-right: 10px;
  overflow: hidden;
  resize: none;
`;

const DateBox = styled.div`
  font-size: 0.75rem;
  color: #878787;
`;
const NameStarBox = styled.div`
  display: flex;
`;
const NameText = styled.div`
  margin-right: 10px;
  font-size: 1rem;
  text-decoration: underline;
  text-underline-offset: 3px;
`;

export default ReviewEnroll;
