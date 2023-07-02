//각 장르별 Top10 가져오기 api props type정의
export type getTop10ListProps = {
  type: string;
  count: string;
};

//각 장르별 Top10 가져오기 api response type 정의
type getTop10ListResponseType = {
  storeId: number;
  storeName: string;
  address: string;
  avgScore: number;
  storeImageUrl: string;
};
export type getTop10ListResponse = {
  data: [getTop10ListResponseType];
};

//keyword 리스트 가져오기 api response type 정의
type getKeyWordListType = {
  keywordId: number;
  name: string;
};
export type getKeyWordListResponse = {
  map(arg0: (value: any) => any): unknown;
  data: [getKeyWordListType];
};

//가게 검색 api response type정의
type getStoreListType = {
  storeId: number;
  storeName: string;
  address: string;
  avgScore: number;
  keywordList: string[];
  storeImageUrl: string;
  likeCount: number;
};
export type getStoreListResponse = {
  data: [getStoreListType];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  isFirst: boolean;
  isLast: boolean;
};

//가게 검색 api props type정의
export type searchProps = {
  category: string | null;
  search: string | null;
  location: string | null;
  pagenum: string | null;
  sort: string | null;
  storeName: string | null;
};
