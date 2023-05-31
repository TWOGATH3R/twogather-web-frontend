import { api } from "../untils";

export const postEnrollShopInfo = async (
  shopName: string,
  shopAddress: string,
  shopNumber: string
) => {
  const res = await api.post(`/api/stores/1 `, {
    storeName: shopName,
    address: shopAddress,
    phone: shopNumber,
  });
};
