//고객,사업자 정보 업데이트 api props type정의
export type userUpdateProps = {
  email: string | null;
  username: string;
  name: string;
  memberId: string | null;
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
