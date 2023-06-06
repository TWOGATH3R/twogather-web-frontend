import { getCookie } from "../../components/cookie/cookie";
import { api } from "../untils";

type infoType = {
  email: string;
  username: string;
  password: string;
  name: string;
  memberId: string | null;
};
//고객 정보 업데이트하기
export const putConsumerInfoChange = async (info: infoType) => {
  console.log(info.memberId);
  const res = await api.put(
    `/api/consumers/${info.memberId}`,
    {
      email: info.email,
      username: info.username,
      password: info.password,
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
    console.log(info.memberId);
    const res = await api.put(
      `/api/consumers/${info.memberId}`,
      {
        email: info.email,
        username: info.username,
        password: info.password,
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
