import { api } from "../untils";

//각 장르별 Top10 List 가져오기
export const getTop10List = async () => {
  const res = await api.get(`/api/stores/top/TOP_RATED/10`);
  return res.data;
};
