import {
  getKeyWordListResponse,
  getStoreListResponse,
  getTop10ListProps,
  getTop10ListResponse,
  searchProps,
} from "../types/main.type";
import { api } from "../untils";

//각 장르별 Top10 List 가져오기
export const getTop10List = async ({
  type,
  count,
}: getTop10ListProps): Promise<getTop10ListResponse> => {
  const { data } = await api.get(`/api/stores/top/${type}/${count}`);
  return data;
};

//DB에 저장된 검색가능한 키워드 리스트 가져오기
export const getKeyWordList = async (): Promise<getKeyWordListResponse> => {
  const { data } = await api.get(`/api/keywords?count=6`);
  return data.data;
};

//가게 검색 기능 api
export const getStoreList = async (
  searchInfo: searchProps
): Promise<getStoreListResponse> => {
  const { data } = await api.get(
    `/api/stores/search?category=${searchInfo.category}&search=${searchInfo.search}&location=${searchInfo.location}&page=${searchInfo.pagenum}&size=10&sort=${searchInfo.sort}`
  );
  return data.data;
};
