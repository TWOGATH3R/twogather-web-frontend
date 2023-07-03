import { getCookie } from "../../components/cookie/cookie";
import {
  getStoreReviewResponse,
  postReviewProps,
  postStoreReviewReplyResponse,
  putReplyProps,
} from "../types/review.type";
import { api } from "../untils";

//리뷰 등록 api
export const postReview = async (info: postReviewProps, storeId: number) => {
  const URL = `/api/stores/${storeId}/reviews`;

  const { data } = await api.post(URL, info, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
};

//가게 리뷰 대댓글 달기 api
export const postStoreReviewReply = async (
  storeId: string | null,
  reviewId: number,
  text: string
): Promise<postStoreReviewReplyResponse> => {
  const URL = `/api/stores/${storeId}/reviews/${reviewId}/comments`;

  const { data } = await api.post(
    URL,
    {
      content: text,
    },
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json,",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};

//가게 리뷰 List 가져오기 api
export const getStoreReview = async (
  storeId: string | null,
  pageNum: number,
  sort: string
): Promise<getStoreReviewResponse> => {
  const URL = `/api/stores/${storeId}/reviews?sort=${sort}&page=${
    pageNum - 1
  }&size=5`;
  const { data } = await api.get(URL);
  return data;
};

//가게 리뷰 삭제 api
export const deleteReview = async (storeId: string | null, reviewId: any) => {
  const URL = `/api/stores/${storeId}/reviews/${reviewId}`;

  const { data } = await api.delete(URL, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
};

//가게 리뷰 댓글 수정 api
export const putReply = async (info: putReplyProps) => {
  const URL = `/api/stores/${info.storeId}/reviews/${info.reviewId}/comments/${info.commentId}`;
  console.log(URL)

  const { data } = await api.put(
    URL,
    {
      content: info.content,
    },
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json,",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};
