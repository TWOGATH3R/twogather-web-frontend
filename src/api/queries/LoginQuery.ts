import { api } from "../untils";
import jwt_decode from "jwt-decode";
import { setCookie } from "../../components/cookie/cookie";

//로그인
export const loginMutaionPostInfo = async (email: string, pw: string) => {
  const res = await api.post(`/api/login `, {
    email: email,
    password: pw,
  });
  const token = res.headers.authorization.split(" ")[1];
  setCookie("accessToken", token);
  const jwt: any = jwt_decode(token);
  const { role, username } = jwt;
  localStorage.setItem("role", role);
  localStorage.setItem("username", username);
  return res.data;
};
