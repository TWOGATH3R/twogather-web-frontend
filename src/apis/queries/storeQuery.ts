import { api } from "../untils";
import { getCookie } from "../../components/cookie/cookie";
import {
  GetMyStoreListProps,
  GetMyStoreListResponse,
  GetStoreInfoResponse,
  PutBusinessHourListResponse,
} from "./type";
import {
  getMenuListResponse,
  postEnrollShopInfoProps,
  postEnrollShopInfoResponse,
  postMenuListProps,
  postMenuListResponse,
  postOpenHourProps,
  postOpenHourResponse,
  postStoreImgResponse,
} from "../types/store.type";

//가게 등록 api
export const postEnrollShopInfo = async (
  storeInfo: postEnrollShopInfoProps
): Promise<postEnrollShopInfoResponse> => {
  const { data } = await api.post(
    `/api/stores`,
    {
      storeName: storeInfo.storeName,
      address: storeInfo.address,
      phone: storeInfo.phone,
      businessNumber: storeInfo.businessNumber,
      businessName: storeInfo.businessName,
      businessStartDate: storeInfo.businessStartDate,
      keywordIdList: storeInfo.keywordIdList,
      categoryId: storeInfo.categoryId,
    },
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

export const getEnrollShopCategory = async () => {
  const res = await api.get(`/api/categories`, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });
  return res.data;
};

export const postEnrollShopImageList = async (storeInfo: any) => {
  const res = await api.post(`/api/stores/1/images `, {
    imageId: "1",
    url: "",
  });
  return res.data;
};

//가게정보 가져오기 api
export const getStoreOne = async (
  storeId: number
): Promise<GetStoreInfoResponse> => {
  const URL = `api/stores/${storeId}`;
  const { data } = await api.get(URL);
  return data;
};

//가게 영업시간 가져오기 api
export const getOpenHour = async (storeId: number) => {
  const URL = `/api/stores/${storeId}/business-hours`;
  const { data } = await api.get(URL);
  return data;
};

//가게 메뉴리스트 가져오기 api
export const getMenuList = async (storeId: number):Promise<getMenuListResponse> => {
  const URL = `/api/stores/${storeId}/menus`;
  const { data } = await api.get(URL);
  return data;
};

//Get /api/my/stores/?ownerId=1&page=1&size=2&sort=reviewsCount,desc
export const getMyStoreList = async ({
  ownerId,
  page = 1,
  size = 1,
  sort = { type: "MOST_REVIEWD", order: "desc" },
}: GetMyStoreListProps): Promise<GetMyStoreListResponse> => {
  //todo 임시로 reviewCounts 추후 변경할 것
  const URL = `api/my/stores/?ownerId=${ownerId}&page=${page}&size=${size}&sort=${"reviewsCount"},${
    sort?.order
  }`;
  const { data } = await api.get(URL, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  console.log(data);
  return data;
};

//putConsumerInfoChange /api/stores/{storeId}/business-hours
export const putBusinessHourtList = async ({
  storeId,
}: {
  storeId: number;
}): Promise<PutBusinessHourListResponse> => {
  const URL = `api/stores${storeId}/business-hours`;

  const { data } = await api.put(URL, {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json,",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  console.log(data);
  return data;
};

//가게등록시 사진 등록 api
export const postStoreImg = async (
  shopImages: any[],
  storeId: string
): Promise<postStoreImgResponse> => {
  const form = new FormData();
  shopImages.forEach((value, index) => {
    form.append("storeImageList", shopImages[index]);
  });

  const { data } = await api.post(`/api/stores/${storeId}/images`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getCookie("accessToken")}`,
    },
  });

  return data;
};

//가게등록시 메뉴 등록 api
export const postMenuList = async (
  shopMenuList: postMenuListProps[],
  storeId: string
): Promise<postMenuListResponse> => {
  const list = shopMenuList.map((value) => {
    return {
      name: value.shopMenuName,
      price: value.shopMenuPrice,
    };
  });
  const URL = `/api/stores/${storeId}/menus`;

  const { data } = await api.post(
    URL,
    {
      menuSaveList: list,
    },
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

//가게등록시 영업시간 등록 api
export const postOpenHour = async (
  dayOfWeek: postOpenHourProps[],
  storeId: string
): Promise<postOpenHourResponse> => {
  const URL = `/api/stores/${storeId}/business-hours`;

  const { data } = await api.post(
    URL,
    {
      businessHourList: dayOfWeek,
    },
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
