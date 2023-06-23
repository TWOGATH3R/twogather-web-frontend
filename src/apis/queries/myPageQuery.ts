import { getCookie } from "../../components/cookie/cookie";
import {
  userGetInfoResponse,
  userPwCheckProps,
  userUpdateProps,
  userUpdateResponse,
} from "../types/mypage.type";
import { api } from "../untils";

//고객 정보 업데이트하기
export const putConsumerInfoChange = async (
  info: userUpdateProps
): Promise<userUpdateResponse> => {
  const { data } = await api.put(
    `/api/consumers/${info.memberId}`,
    {
      email: info.email,
      username: info.username,
      name: info.name,
    },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accept: "application/json,",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};

//사업자 정보 업데이트하기
export const putOwnerInfoChange = async (
  info: userUpdateProps
): Promise<userUpdateResponse> => {
  const { data } = await api.put(
    `/api/owners/${info.memberId}`,
    {
      email: info.email,
      username: info.username,
      name: info.name,
    },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accept: "application/json,",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};

//고객 정보 가져오기
export const getConsumerInfo = async (
  memberId: string | null
): Promise<userGetInfoResponse> => {
  const { data } = await api.get(`/api/consumers/${memberId}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
};

//사업자 정보 가져오기
export const getOwnerInfo = async (
  memberId: string | null
): Promise<userGetInfoResponse> => {
  const { data } = await api.get(`/api/owners/${memberId}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
};

//고객 탈퇴
export const deleteConsumer = async (memberId: string | null) => {
  const { data } = await api.delete(`/api/consumers/${memberId}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
};

//사업자 탈퇴
export const deleteOwner = async (memberId: string | null) => {
  const { data } = await api.delete(`/api/Owner/${memberId}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return data;
};

//고객 비밀번호 확인
export const userPwCheck = async ({ pw, memberId }: userPwCheckProps) => {
  const { data } = await api.post(
    `/api/members/${memberId}/verify-password`,
    {
      password: pw,
    },
    {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        accept: "application/json,",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};