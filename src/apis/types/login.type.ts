//로그인 api props type정의
export type loginProps = {
  id: string;
  pw: string;
};

//가게 검색 api response type정의
export type loginResponse = {
  data: {
    memberId: string;
    name: string;
  };
};

//로그인 후 jwt type 정의
export type jwtType = {
  exp: number;
  id: number;
  role: string;
  sub: string;
};
