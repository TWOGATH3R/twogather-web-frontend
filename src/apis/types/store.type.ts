//가게등록 api props type정의
export type postEnrollShopInfoProps = {
  storeName: string;
  address: string;
  phone: string;
  businessNumber: string;
  businessName: string;
  businessStartDate: string;
  keywordIdList: (number | undefined)[];
  categoryId: number | undefined;
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

//메뉴리스트 가져오기 api response type정의
export type getMenuListResponse = {
  data: [
    {
      menuId: number;
      name: string;
      price: number;
    }
  ];
};

//리뷰 등록 api props type정의
export type postReviewProps = {
  consumerId: string | null;
  storeId: number;
  content: string;
  score: number;
};

//가게 사진 가져오기 api response type정의
export type getImgResponse = {
  data: [
    {
      imageId: number;
      url: string;
    }
  ];
};

//가게 리뷰리스트 가져오기 api response type정의
export type getStoreReviewResponse = {
  data: [
    {
      reviewId: number;
      content: string;
      score: number;
      createdDate: string;
      consumerName: string;
      consumerId: number;
      consumerAvgScore: number;
    }
  ];
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  isFirst: boolean;
  isLast: boolean;
};

//가게 댓글 대댓글 달기 api response type정의
export type postStoreReviewReplyResponse = {
  data: {
    commentId: number;
    content: string;
    isOwner: boolean;
    createDate: string;
  };
};

//카테고리 리스트 가져오기 api response type정의
export type getCategoriesResponse = {
  data: [
    {
      categoryId: number;
      name: string;
    }
  ];
};
