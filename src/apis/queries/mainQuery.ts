import { api } from "../untils";

//각 장르별 Top10 List 가져오기
export const getTop10List = async (type: string, count: string) => {
  const res = await api.get(`/api/stores/top/${type}/${count}`);
  return res.data;
};

//DB에 저장된 검색가능한 키워드 리스트 가져오기
export const getKeyWordList = async () => {
  const res = await api.get(`/api/keywords?count=6`);
  return res.data.data;
};

// type searchType = {
//   category: string | undefined;
//   search: string | undefined;
//   location: string | undefined;
//   pagenum: string | undefined;
//   sort: string | undefined;
// };
//가게 검색 기능 api
export const getStoreList = async (searchInfo: any) => {
  const res = await api.get(
    `/api/stores/search?category=${searchInfo.category}&search=${searchInfo.search}&location=${searchInfo.location}&page=${searchInfo.pagenum}&size=10&sort=${searchInfo.sort}`
  );
  return res.data.data;
};
