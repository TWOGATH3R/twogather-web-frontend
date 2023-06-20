import { api } from "../untils";
import jwt_decode from "jwt-decode";
import { setCookie } from "../../components/cookie/cookie";
import { loginProps, loginResponse } from "../types/login.type";

//로그인
export const loginMutaionPostInfo = async ({
  id,
  pw,
}: loginProps): Promise<loginResponse> => {
  const res = await api.post(`/api/login `, {
    username: id,
    password: pw,
  });
  const accessToken = res.headers.authorization.split(" ")[1];
  setCookie("accessToken", accessToken);
  const jwt: any = jwt_decode(accessToken);
  const { role } = jwt;
  //아직 리프레쉬 토큰 추출 미완
  localStorage.setItem("refreshToken", role);
  localStorage.setItem("role", role);
  return res.data;
};
