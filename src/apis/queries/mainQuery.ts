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
  return data;
};

//가게 검색 기능 api
export const getStoreList = async (
  info: searchProps
): Promise<getStoreListResponse> => {
  const { category, search, storeName, location, pagenum, sort } = info;
  const page = Number(pagenum) - 1;
  const size = 6;
  const query = [
    category && `category=${category}`,
    search && `search=${search}`,
    storeName && `storeName=${storeName}`,
    location && `location=${location}`,
    `page=${page}`,
    `size=${size}`,
    `sort=${sort}`,
  ].join("&");

  const { data } = await api.get(`/api/stores/search?${query}`);

  return data;
};
