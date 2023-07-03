import React, { useState } from "react";
import styled from "styled-components";
import { BsArrowReturnRight } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import { putReply } from "../../apis/queries/reviewQuery";
import { useRecoilValue } from "recoil";
import { OwnerId, StoreId } from "../../store/storeDetailAtom";
import { BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";
import { MemberId } from "../../store/userInfoAtom";

interface infoType {
  commentContent: any;
  commentCreatedDate: any;
  commentId: any;
  reviewId: any;
}
const ReviewReply = ({
  commentId,
  reviewId,
  commentContent,
  commentCreatedDate,
}: infoType) => {
  const [updateMode, setUpdateMode] = useState(false);

  const ownerId = useRecoilValue(OwnerId);
  const memberId = useRecoilValue(MemberId);

  const storeId = useRecoilValue(StoreId);
  const [text, setText] = useState<string>(commentContent);

  const info = {
    storeId,
    reviewId,
    commentId,
    content: text,
  };
  const { mutate: updateReply } = useMutation(() => putReply(info), {
    onSuccess: (res) => {
      console.log(res);
      Swal.fire({
        text: "수정 완료",
        icon: "success",
        confirmButtonColor: "#0075FF",
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const textOnChange = (value: string) => {
    setText(value);
  };

  const updateModeBtnOnClick = () => {
    console.log("fsf");
    setUpdateMode(!updateMode);
    setText(commentContent);
  };
  const updateBtnOnClick = () => {
    updateReply();
  };

  return (
    <Container>
      <ArrowIcon />
      <ReplyBox>
        <TitleBox>
          <NameStarBox>
            <NameText>사장님</NameText>
            {ownerId === memberId && (
              <UpdateModeBtn onClick={() => updateModeBtnOnClick()} />
            )}
          </NameStarBox>
        </TitleBox>
        <Input
          value={text}
          disabled={!updateMode}
          onChange={(e) => textOnChange(e.target.value)}
          active={updateMode}
        />
        <SubmitBtnBox>
          <DateBox>{commentCreatedDate}</DateBox>
          {updateMode && (
            <UpdateBtn onClick={() => updateBtnOnClick()}>수정</UpdateBtn>
          )}
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
const UpdateBtn = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
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
const Input = styled.textarea<{ active: boolean }>`
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

const UpdateModeBtn = styled(BsPencilSquare)`
  font-size: 1.3rem;
  cursor: pointer;
`;

const DateBox = styled.div`
  font-size: 0.75rem;
  color: #878787;
`;
const NameStarBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const NameText = styled.div`
  margin-right: 10px;
  font-size: 1rem;
  text-decoration: underline;
  text-underline-offset: 3px;
  color: red;
`;

export default ReviewReply;