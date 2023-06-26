export interface GetMyStoreListProps {
  ownerId: number;
  page?: number;
  size?: number;
  sort?: SortType;
}

interface SortType {
  type: "TOP_RATED" | "MOST_REVIEWD" | "MOST_LIKEST_COUNT";
  order: "desc" | "asc";
}
interface StoreResponse {
  storeId: number;
  storeName: string;
  address: string;
  phone: string;
  isApproved: boolean;
  reasonForRejection: string;
  requestDate: string;
  storeImageUrl: string;
}
export interface GetMyStoreListResponse {
  data: StoreResponse[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface PostEnrollShopInfo {
  storeName: string;
  address: string;
  phone: string;
  businessNumber: string;
  businessName: string;
  businessStartDate: string;
  categoryId: Number;
  keywordIdList: number[];
}

export type GetStoreInfoProps = {
  storeId: number;
  storeName: string;
  address: string;
  phone: string;
  keywordList: KEYWORD[];
  categoryName: string;
};

export interface GetStoreInfoResponse {
  data: {
    storeId: number;
    storeName: string;
    address: string;
    phone: string;
    keywordList: KEYWORD[];
    likeCount: number;
    categoryName: string;
  };
}

export type KEYWORD =
  | "분위기 좋은"
  | "저렴한 가격"
  | "아이들과 오기 좋은"
  | "사진찍기 좋은"
  | "친절한"
  | "고급스러운"
  | "조용한"
  | "모임하기 좋은"
  | "특별한 날"
  | "단체 회식"
  | "데이트하기 좋은"
  | "뷰가 좋은"
  | "특별한 메뉴"
  | "멋진 인테리어"
  | "디저트가 맛있는"
  | "청결한 매장"
  | "방송에 나온 맛집";

export interface PutBusinessHoursProps {
  businessHourList: BusinessHourType[];
}

export interface PutBusinessHourListResponse extends BusinessHourType {
  businessHourtId: number;
  storeId: number;
}

export interface BusinessHourType {
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  isOpen: boolean;
  hasBreakTime: boolean;
  hasBreakStartTime?: string;
  breakEndTime?: string;
}
