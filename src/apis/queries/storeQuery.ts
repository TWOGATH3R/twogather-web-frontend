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
      keywordList: storeInfo.keywordList,
      businessHourList: [
        {
          startTime: storeInfo.inputItems.startTime,
          endTime: storeInfo.inputItems.endTime,
          dayOfWeek: storeInfo.inputItems.week,
          isOpen: storeInfo.inputItems.week.status,
          hasBreakTime: storeInfo.inputItems.breakTimeCheckBox,
          breakStartTime: storeInfo.inputItems.startBreakTime,
          breakEndTime: storeInfo.inputItems.endBreakTime,
        },
      ],
      menuSaveList: [
        {
          name: storeInfo.shopMenuList.shopMenuName,
          price: storeInfo.shopMenuList.shopMenuPrice,
        },
      ],
      storeImageList: storeInfo.shopImages,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json,",
        Authorization: `Bearer ${getCookie("accessToken")}`,
      },
    }
  );
  return res.data;
};

export const getEnrollShopCategory = async () => {
  const res = await api.get(`/api/categories`, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  console.log(res);
  return res.data;
};

export const postEnrollShopImageList = async (storeInfo: any) => {
  const res = await api.post(`/api/stores/1/images `, {
    imageId: "1",
    url: "",
  });
  return res.data;
};
