import { api } from "../untils";

//이메일 인증번호 보내기
export const emailCheckMutaionPostEmail = async (email: string) => {
  const res = await api.post(`/api/email`, {
    email: email,
  });
  console.log(res)
  return res.data;
};

type signUpInfo = {
  email: string;
  username: string;
  password: string;
  name: string;
};
//고객 회원가입
export const consumersMutaionPostInfo = async (info: signUpInfo) => {
  const res = await api.post(`/api/consumers`, {
    email: info.email,
    username: info.username,
    password: info.password,
    name: info.name,
  });
  return res.data;
};

//사업자 회원가입
export const storeOwnerMutaionPostInfo = async (info: signUpInfo) => {
  const res = await api.post(`/api/owners`, {
    email: info.email,
    username: info.username,
    password: info.password,
    name: info.name,
  });
  return res.data;
};
