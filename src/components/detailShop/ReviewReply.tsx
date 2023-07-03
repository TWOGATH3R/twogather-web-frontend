import React from "react";
import styled from "styled-components";
import { BsArrowReturnRight } from "react-icons/bs";

interface infoType {
  commentContent: any;
  commentCreatedDate: any;
}
const ReviewReply = ({ commentContent, commentCreatedDate }: infoType) => {
  return (
    <Container>
      <ArrowIcon />
      <ReplyBox>
        <TitleBox>
          <NameStarBox>
            <NameText>사장님</NameText>
          </NameStarBox>
        </TitleBox>
        <Input value={commentContent} disabled />
        <SubmitBtnBox>
          <DateBox>{commentCreatedDate}</DateBox>
          <UpdateBtn>수정</UpdateBtn>
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
const UpdateBtn = styled.button`
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
  border: none;
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

export default ReviewReply;
