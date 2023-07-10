import { getCookie } from "../../components/cookie/cookie";
import { getPendingListResponse } from "../types/admin.type";
import { api } from "../untils";

//관리자의 type별 가게 리스트 가져오기 api
export const getPendingList = async (
  type: string,
  page: string | null
): Promise<getPendingListResponse> => {
  const { data } = await api.get(
    `/api/admin/stores/${type}?page=${Number(page)-1}&size=5`,
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json,",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};

//가게 거부 사유 등록 api
export const patchDeniedReason = async (storeId: number, text: string) => {
  const { data } = await api.patch(
    `/api/admin/stores/reject/${storeId}`,
    { reason: text },
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json,",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};

//가게 승인 api
export const patchApproveStore = async (storeId: number) => {
  const { data } = await api.patch(
    `/api/admin/stores/approve/${storeId}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json,",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return data;
};
