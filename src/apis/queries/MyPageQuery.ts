import { getCookie } from "../../components/cookie/cookie";
import { api } from "../untils";

type infoType = {
  email: string | null;
  username: string;
  name: string;
  memberId: string | null;
};
//고객 정보 업데이트하기
export const putConsumerInfoChange = async (info: infoType) => {
  console.log(info)
  const res = await api.put(
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
  return res.data;
};

//사업자 정보 업데이트하기
export const putOwnerInfoChange = async (info: infoType) => {
  const res = await api.put(
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
  return res.data;
};

//고객 정보 가져오기
export const getConsumerInfo = async (memberId: string | null) => {
  const res = await api.get(`/api/consumers/${memberId}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return res.data;
};

//사업자 정보 가져오기
export const getOwnerInfo = async (memberId: string | null) => {
  const res = await api.get(`/api/owners/${memberId}`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return res.data;
};
