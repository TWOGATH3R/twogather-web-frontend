import axios from "axios";
import { removeCookie } from "../../components/cookie/cookie";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// 응답 인터셉터 추가하기
api.interceptors.response.use(
  function (response) {
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  function (error) {
    // 응답 오류가 있는 작업 수행
    if (error.response.status === 401) {
      if (error.response.data.message === "토큰이 유효하지 않습니다") {
        removeCookie();
      }
    }
    return Promise.reject(error);
  }
);
