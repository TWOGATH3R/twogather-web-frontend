import {
  emailCheckResponse,
  userSignUpProps,
  userSignUpResponse,
} from "../types/signup.type";
import { api } from "../untils";

//이메일 인증번호 보내기
export const emailCheckMutaionPostEmail = async (
  email: string
): Promise<emailCheckResponse> => {
  const { data } = await api.post(`/api/email`, {
    email: email,
  });
  return data;
};

//고객 회원가입
export const consumersMutaionPostInfo = async (
  info: userSignUpProps
): Promise<userSignUpResponse> => {
  const { data } = await api.post(`/api/consumers`, {
    email: info.email,
    username: info.username,
    password: info.password,
    name: info.name,
  });
  return data;
};

//사업자 회원가입
export const storeOwnerMutaionPostInfo = async (
  info: userSignUpProps
): Promise<userSignUpResponse> => {
  const { data } = await api.post(`/api/owners`, {
    email: info.email,
    username: info.username,
    password: info.password,
    name: info.name,
  });
  return data;
};
