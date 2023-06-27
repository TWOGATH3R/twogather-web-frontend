//고객,사업자 정보 업데이트 api props type정의
export type userUpdateProps = {
  email: string | null;
  username: string;
  name: string;
  memberId: string | null;
  pw: string;
};

//고객,사업자 정보 업데이트 api response type정의
export type userUpdateResponse = {
  data: {
    memberId: number;
    email: string;
    username: string;
    name: string;
  };
};

//고객,사업자 비밀번호 확인 api props type정의
export type userPwCheckProps = {
  pw: string;
  memberId: string | null;
};

//고객,사업자 정보 가져오기 api response type정의
export type userGetInfoResponse = {
  data: {
    memberId: number;
    email: string;
    username: string;
    name: string;
  };
};

//내가 좋아요 누른 list 정보 가져오기 api response type정의
export type getMyLikeListResponse = {
  currentPage: number;
  data: [
    {
      address: string;
      keywordList: string[];
      phone: string;
      storeId: number;
      storeImageUrl: string;
      storeName: string;
    }
  ];
  isFirst: boolean;
  isLast: boolean;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};
