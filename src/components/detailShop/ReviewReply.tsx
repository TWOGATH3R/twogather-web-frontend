import React, { useState } from "react";
import styled from "styled-components";
import { BsArrowReturnRight } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import { getStoreReview, putReply } from "../../apis/queries/reviewQuery";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  OwnerId,
  Page,
  ReviewList,
  Sort,
  StoreId,
} from "../../store/storeDetailAtom";
import { BsPencilSquare } from "react-icons/bs";
import Swal from "sweetalert2";
import { AxiosError } from "axios";

interface infoType {
  commentContent: string;
  commentCreatedDate: string;
  commentId: number;
  reviewId: number;
}
const ReviewReply = ({
  commentId,
  reviewId,
  commentContent,
  commentCreatedDate,
}: infoType) => {
  const [updateMode, setUpdateMode] = useState(false);

  const ownerId = useRecoilValue(OwnerId);
  const memberId = localStorage.getItem("memberId");

  const storeId = useRecoilValue(StoreId);
  const [text, setText] = useState<string>(commentContent);

  const page = useRecoilValue(Page);
  const setList = useSetRecoilState(ReviewList);
  const sort = useRecoilValue(Sort);
  //가게 리뷰 리스트 가져오기
  const { mutate: getReviewList } = useMutation(
    () => getStoreReview(String(storeId), page, sort),
    {
      onSuccess: (res) => {
        setList(res);
      },
    }
  );

  //리뷰 대댓글 수정 api
  const info = {
    storeId,
    reviewId,
    commentId,
    content: text,
  };
  const { mutate: updateReply } = useMutation(() => putReply(info), {
    onSuccess: (res) => {
      Swal.fire({
        text: "수정 완료",
        icon: "success",
        confirmButtonColor: "#0075FF",
      }).then((result) => {
        if (result.isConfirmed) {
          getReviewList();
          setUpdateMode(!updateMode);
        }
      });
    },
    onError: (err: AxiosError<any>) => {
      alert(err.response?.data.message || "알 수 없는 에러가 발생했습니다.");
    },
  });

  const textOnChange = (value: string) => {
    setText(value);
  };

  const updateModeBtnOnClick = () => {
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
            {ownerId === Number(memberId) && (
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
