import React, { useState } from "react";
import styled from "styled-components";
import { BsArrowReturnRight } from "react-icons/bs";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postStoreReviewReply } from "../../apis/queries/reviewQuery";

interface infoType {
  reviewId: number;
}
const ReveiwReplyEnroll = ({ reviewId }: infoType) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const storeId = searchParams.get("storeId");

  const date = new Date();
  const today = date.toISOString().split("T")[0];

  const [text, setText] = useState<string>("");

  const { mutate: saveReply } = useMutation(
    () => postStoreReviewReply(storeId, reviewId, text),
    {
      onError: (err) => {
        console.log(err);
      },
    }
  );

  //onChange
  const textOnChange = (value: string) => {
    setText(value);
  };

  //onClick
  const replyBtnOnClick = () => {
    if (!text) alert("댓글 내용을 입력해주세요");
    else saveReply();
  };

  return (
    <Container>
      <ArrowIcon />
      <ReplyBox>
        <TitleBox>
          <NameStarBox>
            <NameText>사장님</NameText>
          </NameStarBox>
        </TitleBox>
        <Input
          value={text}
          rows={4}
          placeholder="리뷰를 작성해 주세요"
          onChange={(e) => textOnChange(e.target.value)}
        />
        <SubmitBtnBox>
          <DateBox>{today}</DateBox>
          <SubmitButton onClick={() => replyBtnOnClick()}>
            리뷰 작성
          </SubmitButton>
        </SubmitBtnBox>
      </ReplyBox>
    </Container>
  );
};

const ArrowIcon = styled(BsArrowReturnRight)`
  padding-left: 50px;
  font-size: 5rem;
  color: rgba(48, 48, 48, 0.281);
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
`;

const ReplyBox = styled.div`
  width: 80%;
  padding: 20px 40px;
  border: 1px solid rgba(35, 35, 35, 0.1);
  border-radius: 2px;
`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  color: red;
`;

export default ReveiwReplyEnroll;
