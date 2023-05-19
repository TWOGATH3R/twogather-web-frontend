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

export const emailCheckMutaionPostEmail = async (email: string) => {
  console.log("dd")
  const res = await api.post(`/api/email`, {
    email: email,
  });
  return res.data;
};