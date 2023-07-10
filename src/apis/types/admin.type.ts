export type getPendingListResponse = {
  data: [
    {
      storeId: number;
      storeName: string;
      address: string;
      phone: string;
      status: string;
      reasonForRejection: string;
      requestDate: string;
      storeImageUrl: string;
    }
  ];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  isFirst: boolean;
  isLast: boolean;
};
