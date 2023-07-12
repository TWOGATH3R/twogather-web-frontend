import { api } from "../untils";
import jwt_decode from "jwt-decode";
import { setCookie } from "../../components/cookie/cookie";
import { jwtType, loginProps, loginResponse } from "../types/login.type";

//로그인
export const loginMutaionPostInfo = async ({
  id,
  pw,
}: loginProps): Promise<loginResponse> => {
  const res = await api.post(`/api/login `, {
    username: id,
    password: pw,
  });

  const { authorization, refreshtoken } = res.headers;
  const accessToken: string = authorization.split(" ")[1];
  const refreshToken: string = refreshtoken.split(" ")[1];
  setCookie("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);

  const jwt: jwtType = jwt_decode(accessToken);
  const { role } = jwt;
  localStorage.setItem("role", role);

  return res.data;
};
