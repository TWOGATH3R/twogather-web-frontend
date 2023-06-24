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

//영업시간 api props type정의
export type postOpenHourProps = {
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  isOpen: boolean;
  hasBreakTime: boolean;
  breakStartTime: string | null;
  breakEndTime: string | null;
};

//영업시간 api response type정의
export type postOpenHourResponse = {
  data: [
    {
      breakEndTime: string | null;
      breakStartTime: string | null;
      businessHourId: number;
      dayOfWeek: string;
      endTime: string | null;
      hasBreakTime: boolean;
      isOpen: boolean;
      startTime: string | null;
      storeId: number;
    }
  ];
};

//이미지 등록 api response type정의
export type postStoreImgResponse = {
  data: [
    {
      imageId: number;
      url: string;
    }
  ];
};

//영업시간 api props type정의
export type getOpenHourProps = {
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  isOpen: boolean;
  hasBreakTime: boolean;
  breakStartTime: string | null;
  breakEndTime: string | null;
};
