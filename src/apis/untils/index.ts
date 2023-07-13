import axios from "axios";
import { removeCookie, setCookie } from "../../components/cookie/cookie";

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
    console.log(error);
    const { config } = error;
    // 응답 오류가 있는 작업 수행
    if (error.response.status === 401) {
      if (error.response.data.message === "인증에 실패하였습니다")
        removeCookie();
      else {
        const refreshToken = await localStorage.getItem("refreshToken");

        const { headers } = await api.get(`/api/access-token`, {
          headers: {
            RefreshToken: `Bearer ${refreshToken}`,
          },
        });

        const newAccessToken = headers.authorization.split(" ")[1];
        setCookie("accessToken", newAccessToken);
        config.headers.Authorization = `Bearer ${newAccessToken}`;

        return axios(config);
      }
    }
    return Promise.reject(error);
  }
);
