import { getMyIdProps, getMyIdResponse } from "../types/findId.type";
import { api } from "../untils";

//ID 찾기 api
export const getMyId = async ({
  email,
  name,
}: getMyIdProps): Promise<getMyIdResponse> => {
  const { data } = await api.post(`/api/members/my-id`, {
    email: email,
    name: name,
  });
  return data;
};
