export interface GetMyStoreListProps {
  ownerId: number;
  page?: number;
  size?: number;
  sort?: SortType;
}

interface SortType {
  type: 'TOP_RATED' | 'MOST_REVIEWD' | 'MOST_LIKEST_COUNT';
  order: 'desc' | 'asc';
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
