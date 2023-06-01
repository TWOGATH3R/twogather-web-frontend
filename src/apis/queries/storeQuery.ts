import { api } from "../untils";

export const postEnrollShopInfo = async (storeInfo: any) => {
  const res = await api.post(`/api/stores/ `, {
    storeName: storeInfo.shopName,
    address: storeInfo.shopAddress,
    phone: storeInfo.shopNumber,
    busninessNumber: storeInfo.businessNumber,
    businessName: storeInfo.businessName,
    businessStartDate: storeInfo.startBusiness,
  });
  return res.data;
};

export const getEnrollShopCategory = async () => {
  const res = await api.post(`/api/stores/ `, {});
  return res.data;
};
