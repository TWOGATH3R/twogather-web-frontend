import { api } from "../untils";

//임시 비밀번호 발급
export const postInfo = async (email: string, id: string) => {
  const { data } = await api.post(`/api/email/password`, {
    email: email,
    username: id,
  });
  return data;
};
