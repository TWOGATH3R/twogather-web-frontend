//가게등록 api props type정의
export type postEnrollShopInfoProps = {
  storeName: string;
  address: string;
  phone: string;
  businessNumber: string;
  businessName: string;
  businessStartDate: string;
  keywordIdList: number[];
  categoryId: number;
};

//가게등록 api response type정의
export type postEnrollShopInfoResponse = {
  data: {
    storeId: number;
    storeName: string;
    address: string;
    phone: string;
    businessNumber: string;
    businessName: string;
    businessStartDate: string;
    keywordIdList: string[];
    categoryId: number;
  };
};

//메뉴등록 api props type정의
export type postMenuListProps = {
  id: number;
  shopMenuName: string;
  shopMenuPrice: string;
};

//메뉴등록 api response type정의
export type postMenuListResponse = {
  data: [
    {
      menuId: number;
      name: string;
      price: number;
    }
  ];
};

