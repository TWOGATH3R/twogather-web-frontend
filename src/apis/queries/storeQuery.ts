import { api } from "../untils";
import { getCookie } from "../../components/cookie/cookie";

export const postEnrollShopInfo = async (storeInfo: any) => {
  console.log(getCookie("accessToken"));

  const res = await api.post(
    `/api/stores/ `,
    {
      storeName: storeInfo.shopName,
      address: storeInfo.shopAddress,
      phone: storeInfo.shopNumber,
      businessNumber: storeInfo.businessNumber,
      businessName: storeInfo.businessName,
      businessStartDate: storeInfo.startBusiness,
    },
    {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json,",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return res.data;
};

export const getEnrollShopCategory = async () => {
  const res = await api.post(`/api/stores `, {});
  return res.data;
};

export const postEnrollShopImageList = async (storeInfo: any) => {
  const res = await api.post(`/api/stores/1/images `, {
    imageId: "1",
    url: "",
  });
  return res.data;
};
