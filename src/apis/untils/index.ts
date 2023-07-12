import axios from "axios";
import { getCookie, removeCookie } from "../../components/cookie/cookie";

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    accept: "application/json,",
  },
});

// 응답 인터셉터 추가하기
api.interceptors.response.use(
  function (response) {
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  async (error) => {
    // 응답 오류가 있는 작업 수행
    if (error.response.status === 401) {
      if (error.response.data.message === "잘못된 형식의 요청입니다") {
        // removeCookie();
        const refreshToken = await localStorage.getItem("refreshToken");

        api
          .get(`/api/consumers/8`, {
            headers: {
              Authorization: `Bearer ${getCookie("accessToken")}`,
              refreshToken: `Bearer ${refreshToken}`,
            },
          })
          .then((res) => {
            console.log(res);
          });
      }
    }
    return Promise.reject(error);
  }
);
