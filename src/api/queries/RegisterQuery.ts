import axios from "axios";
import { api } from "../untils";

//사업자 정보가 일치하는지 확인
export const buisnessCheckMutaionPostInfo = async (
  number: string,
  name: string,
  date: string
) => {
  const serviceKey = process.env.REACT_APP_SERVICEKEY;
  const res = await axios.post(
    `http://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${serviceKey}`,
    {
      businesses: [
        {
          b_no: number,
          start_dt: date,
          p_nm: name,
        },
      ],
    }
  );
  return res.data;
};

//이메일 인증번호 보내기
export const emailCheckMutaionPostEmail = async (email: string) => {
  const res = await api.post(`/api/email`, {
    email: email,
  });
  return res.data;
};

//고객 회원가입
type consumersInfo = {
  email: string;
  password: string;
  name: string;
};
export const consumersMutaionPostInfo = async (info: consumersInfo) => {
  const res = await api.post(`/api/consumers`, {
    email: info.email,
    password: info.password,
    name: info.name,
  });
  return res.data;
};

//사업자 회원가입
type storeOwnerInfo = {
  email: string;
  password: string;
  name: string;
  businessNumber: string;
  businessName: string;
  businessStartDate: string;
};
export const storeOwnerMutaionPostInfo = async (info: storeOwnerInfo) => {
  const res = await api.post(`/api/owners`, {
    email: info.email,
    password: info.password,
    name: info.name,
    businessNumber: info.businessNumber,
    businessName: info.businessName,
    businessStartDate: info.businessStartDate,
  });
  return res.data;
};
