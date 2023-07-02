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
  info: searchProps
): Promise<getStoreListResponse> => {
  const URL = `/api/stores/search?${
    info.category && `category=${info.category}&`
  }${info.search && `search=${info.search}&`}${
    info.storeName && `storeName=${info.storeName}&`
  }${info.location && `location=${info.location}&`}page=${
    Number(info.pagenum) - 1
  }&size=6&sort=${info.sort}`.replaceAll("null", "");

  const { data } = await api.get(URL);

  return data;
};
