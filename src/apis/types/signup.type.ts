//고객,사업자 회원가입 api props type정의
export type userSignUpProps = {
  email: string;
  username: string;
  password: string;
  name: string;
};

//고객,사업자 회원가입 api response type정의
export type userSignUpResponse = {
  data: {
    memberId: number;
    email: string;
    username: string;
    name: string;
  };
};

//이메일 인증번호 보내기 api response type정의
export type emailCheckResponse = {
  data: {
    verificationCode: string;
  };
};
